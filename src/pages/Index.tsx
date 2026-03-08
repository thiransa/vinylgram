import vinylRecord from "@/assets/vinyl-record.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center pt-6">
      <img src={vinylRecord} alt="Vinyl record" className="w-52 h-52 object-contain" />
    </div>
  );
};

export default Index;
