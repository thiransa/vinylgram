// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import ShareModal from "@/components/ShareModal";
import vinylPlayer from "@/assets/vinyl-player.png";
import tonearm from "@/assets/tonearm.png";
import cd1 from "@/assets/cd1.png";
import cd2 from "@/assets/cd2.png";
import cd3 from "@/assets/cd3.png";
import cd4 from "@/assets/cd4.png";
import cd5 from "@/assets/cd5.png";
import cd6 from "@/assets/cd6.png";
import cd7 from "@/assets/cd7.png";

const cds = [cd1, cd2, cd3, cd4, cd5, cd6, cd7];

const ARM_REST_ANGLE = 10;
const ARM_PLAY_ANGLE = 30;
const ARM_PLAY_THRESHOLD = 25;

const Player = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCd = location.state?.selectedCd as number | undefined;
  const cdImage = selectedCd !== undefined ? cds[selectedCd] : null;

  // Audio state
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [armAngle, setArmAngle] = useState(ARM_REST_ANGLE);
  const [shareOpen, setShareOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number>(0);
  const armAngleRef = useRef(ARM_REST_ANGLE);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  // Upload handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  // Record handler
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      console.error("Microphone access denied");
    }
  };

  // Tonearm drag - use document-level listeners for reliability
  const tonearmRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartAngleRef.current = armAngleRef.current;
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - dragStartYRef.current;
      const newAngle = Math.max(ARM_REST_ANGLE, Math.min(ARM_PLAY_ANGLE, dragStartAngleRef.current + deltaY * 0.15));
      armAngleRef.current = newAngle;
      setArmAngle(newAngle);
    };
    const handleUp = () => {
      isDraggingRef.current = false;
    };
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    return () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
    };
  }, []);

  // Play/pause based on arm threshold
  useEffect(() => {
    if (!audioRef.current) return;
    if (audioUrl && armAngle >= ARM_PLAY_THRESHOLD && !isPlaying) {
      // Need user gesture - play may fail without one, but we already have pointer interaction
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {});
      }
    } else if (armAngle < ARM_PLAY_THRESHOLD && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [armAngle, audioUrl, isPlaying]);

  // CD rotation animation (~33rpm)
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
      return;
    }
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const dt = time - lastTimeRef.current;
        rotationRef.current = (rotationRef.current + dt * 0.198) % 360; // 33rpm
        setRotation(rotationRef.current);
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative">
      <h1
        className="text-4xl font-bold text-card absolute top-4"
        style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
      >
        Vinylgram
      </h1>

      <div className="relative">
        <img
          src={vinylPlayer}
          alt="Vinyl player"
          className="w-[800px] h-auto"
        />
        {cdImage && (
          <img
            src={cdImage}
            alt="Selected vinyl"
            className="absolute w-[280px] h-[280px] object-contain rounded-full"
            style={{
              top: '50%',
              left: 'calc(42% + 26px)',
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          />
        )}
        {/* Tonearm pivot point - head stays fixed, arm rotates */}
        <div
          ref={tonearmRef}
          className="absolute"
          style={{
            top: '9%',
            right: '21%',
            width: '150px',
            transformOrigin: 'top center',
            transform: `rotate(${armAngle}deg)`,
          }}
        >
          <img
            src={tonearm}
            alt="Tone arm"
            className="w-full h-auto cursor-grab active:cursor-grabbing select-none touch-none"
            draggable={false}
            onPointerDown={handlePointerDown}
          />
        </div>
      </div>

      {/* Audio controls */}
      <div className="flex gap-4 mt-6">
        <label
          className="px-6 py-2 rounded-none text-sm font-semibold uppercase tracking-wider border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card cursor-pointer transition-all duration-200"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Upload Song
          <input
            type="file"
            accept=".mp3,.wav,.m4a,audio/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
        <button
          onClick={toggleRecording}
          className={`px-6 py-2 rounded-none text-sm font-semibold uppercase tracking-wider border-2 transition-all duration-200 ${
            isRecording
              ? "border-red-600 bg-red-600 text-white"
              : "border-card bg-card text-card-foreground hover:bg-transparent hover:text-card"
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {isRecording ? "⏹ Stop Recording" : "🎙 Record Voice"}
        </button>
      </div>

      {audioUrl && (
        <p className="mt-2 text-xs text-card/60" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Audio loaded — drag the tonearm onto the record to play
        </p>
      )}

      <audio ref={audioRef} src={audioUrl || undefined} />

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-12 py-3 rounded-none text-lg font-semibold uppercase tracking-wider transition-all duration-200 border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card cursor-pointer"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Back
        </button>
        <button
          onClick={() => {
            if (!audioUrl) {
              toast("Add a song or voice message first!", { style: { fontFamily: "'Nunito', sans-serif", background: "hsl(35 45% 80%)", color: "hsl(24 40% 18%)", border: "2px solid hsl(24 40% 18%)" } });
              return;
            }
            setShareOpen(true);
          }}
          className="px-12 py-3 rounded-none text-lg font-semibold uppercase tracking-wider transition-all duration-200 border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card cursor-pointer"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Share This Vinyl
        </button>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default Player;
