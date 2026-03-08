import vinylRecord from "@/assets/vinyl-record.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-2">
      <img src={vinylRecord} alt="Vinyl record" className="w-36 h-36 object-contain" />
      <h1 className="mt-4 text-6xl font-bold text-card" style={{ fontFamily: "'Pacifico', cursive" }}>Vinylgram</h1>
    </div>
  );
};

export default Index;
