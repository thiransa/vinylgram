import { useState } from "react";
import { useNavigate } from "react-router-dom";
import vinylRecord from "@/assets/vinyl-record.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <img src={vinylRecord} alt="Vinyl record" className="w-24 h-24 object-contain mb-6" />
      <h2 className="text-3xl font-bold text-card mb-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Enter your email
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 border-2 border-card bg-transparent text-card placeholder:text-card/50 rounded-none text-lg focus:outline-none focus:border-primary"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        />
        <p className="mt-4 text-sm text-card/60 text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Press Enter to continue
        </p>
      </form>
    </div>
  );
};

export default Login;
