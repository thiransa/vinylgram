import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import cover1 from "@/assets/cover1.png";
import cover2 from "@/assets/cover2.png";
import cover3 from "@/assets/cover3.png";
import cover4 from "@/assets/cover4.png";

const covers = [cover1, cover2, cover3, cover4];

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  audioUrl?: string | null;
  selectedCd?: number;
}

const ShareModal = ({ open, onClose, audioUrl, selectedCd }: ShareModalProps) => {
  const [message, setMessage] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [selectedCover, setSelectedCover] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (!shareUrl || !navigator.share) return;
    await navigator.share({
      title: trackTitle || "A vinyl just for you 🎶",
      text: message || "Check out this vinyl I made for you!",
      url: shareUrl,
    });
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { useCORS: true, backgroundColor: null });
    const link = document.createElement("a");
    link.download = "vinyl-card.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    if (!audioUrl) return;
    setIsUploading(true);
    setError(null);

    try {
      // Fetch audio blob from object URL
      const audioResponse = await fetch(audioUrl);
      const audioBlob = await audioResponse.blob();
      const audioExt = audioBlob.type.includes("webm") ? "webm" : "mp3";
      const audioFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${audioExt}`;

      // Upload audio
      const { error: audioError } = await supabase.storage
        .from("vinyl-audio")
        .upload(audioFileName, audioBlob, { contentType: audioBlob.type });

      if (audioError) throw audioError;

      const { data: audioUrlData } = supabase.storage
        .from("vinyl-audio")
        .getPublicUrl(audioFileName);

      // Generate slug
      const slug = Math.random().toString(36).slice(2, 8);

      // Insert share record
      const { error: insertError } = await supabase.from("vinyl_shares").insert({
        slug,
        track_title: trackTitle || "Untitled",
        artist_name: artistName || "Anonymous",
        personal_message: message,
        vinyl_color: selectedCd ?? 0,
        cover_style: selectedCover,
        audio_url: audioUrlData.publicUrl,
        label_image_url: null,
      });

      if (insertError) throw insertError;

      const url = `${window.location.origin}/v/${slug}`;
      setShareUrl(url);
    } catch (err) {
      console.error("Share error:", err);
      setError("Something went wrong pressing your vinyl — try again");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="relative bg-accent w-full sm:w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-lg sm:rounded-sm border-2 border-card p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 text-card hover:opacity-70">
          <X size={20} />
        </button>

        <h2
          className="text-2xl text-card mb-4 text-center"
          style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
        >
          Share This Vinyl
        </h2>

        {/* Track info inputs */}
        <div className="mb-3">
          <input
            value={trackTitle}
            onChange={(e) => setTrackTitle(e.target.value)}
            placeholder="Track title"
            className="w-full p-3 text-sm bg-background border-2 border-card text-card rounded-none focus:outline-none focus:ring-1 focus:ring-card"
          />
        </div>
        <div className="mb-3">
          <input
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Artist / your name"
            className="w-full p-3 text-sm bg-background border-2 border-card text-card rounded-none focus:outline-none focus:ring-1 focus:ring-card"
          />
        </div>

        {/* Message input */}
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 150))}
            placeholder="Hey, I made this vinyl just for you..."
            className="w-full h-20 p-3 text-sm bg-background border-2 border-card text-card resize-none rounded-none focus:outline-none focus:ring-1 focus:ring-card"
          />
          <p className="text-xs text-card/50 text-right mt-1">{message.length}/150</p>
        </div>

        {/* Cover selector */}
        <p className="text-xs text-card/70 uppercase tracking-wider mb-2">Choose a cover</p>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
          {covers.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Cover ${i + 1}`}
              onClick={() => setSelectedCover(i)}
              className={`w-20 h-20 object-cover cursor-pointer flex-shrink-0 border-2 transition-all ${
                selectedCover === i ? "border-card scale-105" : "border-transparent opacity-60"
              }`}
            />
          ))}
        </div>

        {/* Preview card */}
        <div
          ref={previewRef}
          className="bg-background border-2 border-card p-4 mb-4"
        >
          <img
            src={covers[selectedCover]}
            alt="Selected cover"
            className="w-full h-40 object-cover mb-3"
          />
          <p
            className="text-lg text-card text-center"
            style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}
          >
            {trackTitle || "A vinyl just for you 🎶"}
          </p>
          {artistName && (
            <p className="text-sm text-card/70 text-center mt-1">by {artistName}</p>
          )}
          {message && (
            <p className="text-sm text-card/80 text-center mt-2 italic">"{message}"</p>
          )}
        </div>

        {/* Upload / Loading state */}
        {isUploading && (
          <div className="text-center py-4 mb-4 border-2 border-card bg-background">
            <p className="text-card text-sm animate-pulse" style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}>
              Pressing your vinyl... 🎵
            </p>
          </div>
        )}

        {error && (
          <p className="text-destructive text-sm text-center mb-3">{error}</p>
        )}

        {/* Share actions */}
        <div className="flex flex-col gap-2">
          {!shareUrl ? (
            <button
              onClick={handleShare}
              disabled={isUploading}
              className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card transition-all disabled:opacity-50"
            >
              {isUploading ? "Pressing..." : "Press & Share 💿"}
            </button>
          ) : (
            <>
              <div className="bg-background border-2 border-card p-3 text-center mb-2">
                <p className="text-xs text-card/50 uppercase tracking-wider mb-1">Your vinyl link</p>
                <p className="text-sm text-card font-semibold break-all">{shareUrl}</p>
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card transition-all"
              >
                {copied ? "Copied! ✅" : "Copy Link"}
              </button>
              {typeof navigator.share === "function" && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-transparent text-card hover:bg-card hover:text-card-foreground transition-all"
                >
                  Share via...
                </button>
              )}
            </>
          )}
          <button
            onClick={handleDownload}
            className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-transparent text-card hover:bg-card hover:text-card-foreground transition-all"
          >
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
