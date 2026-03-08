// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cd1 from "@/assets/cd1.png";
import cd2 from "@/assets/cd2.png";
import cd3 from "@/assets/cd3.png";
import cd4 from "@/assets/cd4.png";
import cd5 from "@/assets/cd5.png";
import cd6 from "@/assets/cd6.png";
import cd7 from "@/assets/cd7.png";

const cds = [cd1, cd2, cd3, cd4, cd5];
const cdsRow2 = [cd6, cd7];

const Dashboard = () => {
  const [selectedCd, setSelectedCd] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    setSelectedCd(selectedCd === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <h1 className="text-4xl font-bold text-card text-center pt-4" style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}>Vinylgram</h1>
      <p className="text-lg text-card text-center mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>Please select a vinyl record</p>
      <div className="flex gap-16 mt-16 self-start ml-28">
        {cds.map((cd, i) => (
          <img
            key={i}
            src={cd}
            alt={`Vinyl record ${i + 1}`}
            onClick={() => handleSelect(i)}
            className={`w-48 h-48 object-contain cursor-pointer transition-transform duration-200 ${
              selectedCd === i ? "-translate-y-4 scale-105 drop-shadow-lg" : "hover:scale-105"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-16 mt-8 self-start" style={{ marginLeft: 'calc(7rem + 12rem + 4rem + 6rem)' }}>
        {cdsRow2.map((cd, i) => {
          const index = i + 5;
          return (
            <img
              key={index}
              src={cd}
              alt={`Vinyl record ${index + 1}`}
              onClick={() => handleSelect(index)}
              className={`w-48 h-48 object-contain cursor-pointer transition-transform duration-200 ${
                selectedCd === index ? "-translate-y-4 scale-105 drop-shadow-lg" : "hover:scale-105"
              }`}
            />
          );
        })}
      </div>
      <button
        disabled={selectedCd === null}
        className={`mt-12 px-12 py-3 rounded-none text-lg font-semibold uppercase tracking-wider transition-all duration-200 border-2 ${
          selectedCd !== null
            ? "border-card bg-card text-card-foreground hover:bg-transparent hover:text-card cursor-pointer"
            : "border-card/30 bg-card/30 text-card-foreground/50 cursor-not-allowed"
        }`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
        onClick={() => selectedCd !== null && navigate("/player", { state: { selectedCd } })}
      >
        Next
      </button>
    </div>
  );
};

export default Dashboard;
