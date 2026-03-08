import vinylRecord from "@/assets/vinyl-record.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center pt-16">
      <img src={vinylRecord} alt="Vinyl record" className="w-80 h-80 object-contain" />
    </div>
  );
};

export default Index;
