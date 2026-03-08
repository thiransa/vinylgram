import vinylRecord from "@/assets/vinyl-record.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center pt-2">
      <img src={vinylRecord} alt="Vinyl record" className="w-36 h-36 object-contain" />
    </div>
  );
};

export default Index;
