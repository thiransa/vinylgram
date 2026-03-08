// @ts-ignore
import "@fontsource-variable/bitcount-prop-double";
import vinylRecord from "@/assets/vinyl-record.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-2">
      <img src={vinylRecord} alt="Vinyl record" className="w-36 h-36 object-contain" />
      <h1 className="mt-4 text-8xl font-bold text-card" style={{ fontFamily: "'Bitcount Prop Double Variable', sans-serif" }}>Vinylgram</h1>
      <p className="mt-2 text-xl text-card" style={{ fontFamily: "'Nunito', sans-serif" }}>press play on your feelings</p>
      <button className="mt-6 px-8 py-3 border-2 border-card bg-transparent text-card rounded-none text-lg font-semibold uppercase tracking-wider hover:bg-card hover:text-card-foreground transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Get Started
      </button>
    </div>
  );
};

export default Index;
