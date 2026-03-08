import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { X } from "lucide-react";
import cover1 from "@/assets/cover1.png";
import cover2 from "@/assets/cover2.png";
import cover3 from "@/assets/cover3.png";
import cover4 from "@/assets/cover4.png";

const covers = [cover1, cover2, cover3, cover4];
const MOCK_URL = "vinylgram.foryou/vinyl/abc123";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ShareModalProps) => {
  const [message, setMessage] = useState("");
  const [selectedCover, setSelectedCover] = useState(0);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`https://${MOCK_URL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "A vinyl just for you 🎶",
        text: message || "Check out this vinyl I made for you!",
        url: `https://${MOCK_URL}`,
      });
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { useCORS: true, backgroundColor: null });
    const link = document.createElement("a");
    link.download = "vinyl-card.png";
    link.href = canvas.toDataURL();
    link.click();
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
            A vinyl just for you 🎶
          </p>
          {message && (
            <p className="text-sm text-card/80 text-center mt-2 italic">"{message}"</p>
          )}
          <p className="text-[10px] text-card/40 text-center mt-3">{MOCK_URL}</p>
        </div>

        {/* Share actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopyLink}
            className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card transition-all"
          >
            {copied ? "✓ Copied!" : "Copy Link"}
          </button>
          {typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2 text-sm font-semibold uppercase tracking-wider border-2 border-card bg-transparent text-card hover:bg-card hover:text-card-foreground transition-all"
            >
              Share via...
            </button>
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
