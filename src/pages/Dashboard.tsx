// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import cd1 from "@/assets/cd1.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <h1 className="text-4xl font-bold text-card text-center pt-4" style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}>Vinylgram</h1>
      <p className="text-lg text-card text-center mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>Please select a vinyl record</p>
      <img src={cd1} alt="Vinyl record" className="w-48 h-48 object-contain mt-8" />
    </div>
  );
};

export default Dashboard;
