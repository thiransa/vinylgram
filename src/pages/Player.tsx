// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import { useLocation, useNavigate } from "react-router-dom";
import vinylPlayer from "@/assets/vinyl-player.png";
import cd1 from "@/assets/cd1.png";
import cd2 from "@/assets/cd2.png";
import cd3 from "@/assets/cd3.png";
import cd4 from "@/assets/cd4.png";
import cd5 from "@/assets/cd5.png";
import cd6 from "@/assets/cd6.png";
import cd7 from "@/assets/cd7.png";

const cds = [cd1, cd2, cd3, cd4, cd5, cd6, cd7];

const Player = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCd = location.state?.selectedCd as number | undefined;

  const cdImage = selectedCd !== undefined ? cds[selectedCd] : null;

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
          className="w-[500px] h-auto"
        />
        {cdImage && (
          <img
            src={cdImage}
            alt="Selected vinyl"
            className="absolute w-[330px] h-[330px] object-contain rounded-full"
            style={{
              top: '47%',
              left: '36%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 px-12 py-3 rounded-none text-lg font-semibold uppercase tracking-wider transition-all duration-200 border-2 border-card bg-card text-card-foreground hover:bg-transparent hover:text-card cursor-pointer"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Back
      </button>
    </div>
  );
};

export default Player;
