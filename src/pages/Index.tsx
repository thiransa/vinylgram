// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import vinylRecord from "@/assets/vinyl-record.png";
import cover4 from "@/assets/cover4-2.png";

import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-2">
      <img src={vinylRecord} alt="Vinyl record" className="w-36 h-36 object-contain" />
      <h1 className="mt-4 text-8xl font-bold text-card" style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}>Vinylgram</h1>
      <p className="mt-2 text-xl text-card" style={{ fontFamily: "'Nunito', sans-serif" }}>press play on your feelings</p>
      <button onClick={() => navigate("/login")} className="mt-6 px-8 py-3 border-2 border-card bg-transparent text-card rounded-none text-lg font-semibold uppercase tracking-wider hover:bg-card hover:text-card-foreground transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Get Started
      </button>

      {/* Album cover with rotating CD */}
      <div className="mt-8 relative" style={{ width: 500, height: 350 }}>
        <img
          src={cover4}
          alt="Album cover with CD"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Rotating CD disc overlaid on the CD portion of the image */}
        <div
          className="absolute rounded-full"
          style={{
            width: 270,
            height: 270,
            top: '50%',
            right: 30,
            transform: 'translateY(-50%)',
            animation: 'spin-cd 4s linear infinite',
            background: 'conic-gradient(from 0deg, hsl(280 20% 75%), hsl(200 15% 82%), hsl(280 20% 68%), hsl(220 15% 80%), hsl(280 20% 75%))',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.15)',
          }}
        >
          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-card flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-card-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;