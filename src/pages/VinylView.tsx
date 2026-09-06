// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import { useParams, Link } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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

interface VinylShare {
  slug: string;
  track_title: string;
  artist_name: string;
  personal_message: string;
  vinyl_color: number;
  cover_style: number;
  audio_url: string;
  label_image_url: string | null;
}

const VinylView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vinyl, setVinyl] = useState<VinylShare | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [armAngle, setArmAngle] = useState(ARM_REST_ANGLE);
  const [rotation, setRotation] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number>(0);

  // Fetch vinyl data
  useEffect(() => {
    const fetchVinyl = async () => {
      if (!slug) { setNotFound(true); setLoading(false); return; }
      const { data, error } = await supabase
        .from("vinyl_shares")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setVinyl(data);
      }
      setLoading(false);
    };
    fetchVinyl();
  }, [slug]);

  // Play/pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current || !vinyl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setArmAngle(ARM_REST_ANGLE);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setArmAngle(ARM_PLAY_ANGLE);
      }).catch(() => {});
    }
  }, [isPlaying, vinyl]);

  // CD rotation animation
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
      return;
    }
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const dt = time - lastTimeRef.current;
        rotationRef.current = (rotationRef.current + dt * 0.198) % 360;
        setRotation(rotationRef.current);
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);

  // Audio ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      setIsPlaying(false);
      setArmAngle(ARM_REST_ANGLE);
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [vinyl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p
          className="text-2xl text-card animate-pulse"
          style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
        >
          Loading your vinyl... 🎵
        </p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <p
          className="text-3xl text-card text-center mb-4"
          style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
        >
          This vinyl has expired or doesn't exist 💿
        </p>
        <p className="text-card/60 text-center mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Maybe it was a limited edition pressing...
        </p>
        <Link
          to="/"
          className="px-8 py-3 border-2 border-card bg-transparent text-card rounded-none text-base font-semibold uppercase tracking-wider hover:bg-card hover:text-card-foreground transition-colors"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Make Your Own
        </Link>
      </div>
    );
  }

  const cdImage = cds[vinyl!.vinyl_color] || cds[0];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 py-8">
      <h1
        className="text-[28px] md:text-[32px] lg:text-4xl font-bold text-card mb-2"
        style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
      >
        Vinylgram
      </h1>

      {/* Track info */}
      <p
        className="text-xl md:text-2xl text-card text-center"
        style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
      >
        {vinyl!.track_title}
      </p>
      <p className="text-sm text-card/70 text-center mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        by {vinyl!.artist_name}
      </p>

      {/* Vinyl player */}
      <div className="relative w-[92vw] md:w-[380px] lg:w-[600px]">
        <img src={vinylPlayer} alt="Vinyl player" className="w-full h-auto" />
        <img
          src={cdImage}
          alt="Vinyl record"
          className="absolute w-[53%] h-[53%] object-contain rounded-full left-[calc(42%+25px)] max-[768px]:left-[45.4%]"
          style={{
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
        <div
          className="absolute"
          style={{
            top: 'calc(9% + 70px)',
            right: 'calc(21% + 20px)',
            width: '18.75%',
            transformOrigin: 'top center',
            transform: `rotate(${armAngle}deg)`,
            transition: 'transform 0.5s ease',
          }}
        >
          <img src={tonearm} alt="Tone arm" className="w-full h-auto select-none" draggable={false} />
        </div>
      </div>

      {/* Play button */}
      <button
        onClick={togglePlay}
        className="mt-4 px-8 py-3 border-2 border-card bg-card text-card-foreground rounded-none text-base font-semibold uppercase tracking-wider hover:bg-transparent hover:text-card transition-colors"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>

      {/* Personal message */}
      {vinyl!.personal_message && (
        <div
          className="mt-6 w-full max-w-md bg-accent border-2 border-card p-6 relative"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <p className="text-card text-center italic text-lg leading-relaxed">
            "{vinyl!.personal_message}"
          </p>
          <p className="text-card/50 text-right mt-4 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
            — {vinyl!.artist_name}
          </p>
        </div>
      )}

      {/* Credit */}
      <Link
        to="/"
        className="mt-8 text-xs text-card/40 hover:text-card/70 transition-colors"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Made with Love 🌹
      </Link>

      <audio ref={audioRef} src={vinyl!.audio_url} />
    </div>
  );
};

export default VinylView;
