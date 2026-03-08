import rockingChairImg from '@/assets/rocking-chair-clean.png';

const DustParticle = ({ delay, left, size }: { delay: string; left: string; size: number }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: size, height: size,
      background: 'hsla(36, 50%, 88%, 0.4)',
      left, top: `${Math.random() * 80 + 10}%`,
      animation: `dust-float ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: delay,
    }}
  />
);

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: `
        repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.03) 120px, rgba(0,0,0,0.03) 122px),
        repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.02) 4px, rgba(0,0,0,0.02) 5px),
        linear-gradient(180deg, hsl(24 50% 13%) 0%, hsl(24 42% 16%) 50%, hsl(16 48% 13%) 100%)
      `,
    }}>
      {/* Wood panel walls */}
      <div className="absolute inset-0" style={{
        background: `
          repeating-linear-gradient(90deg, 
            transparent 0px, transparent 80px, 
            rgba(0,0,0,0.08) 80px, rgba(0,0,0,0.08) 82px,
            transparent 82px, transparent 160px
          ),
          repeating-linear-gradient(0deg,
            transparent 0px, transparent 2px,
            rgba(139,90,43,0.04) 2px, rgba(139,90,43,0.04) 3px
          )
        `,
      }} />

      {/* Warm ambient light from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20" style={{
        background: 'radial-gradient(ellipse, hsl(33 78% 47%), transparent 70%)',
      }} />

      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        animation: 'grain 0.5s steps(1) infinite',
      }} />

      {/* Dust particles */}
      <DustParticle delay="0s" left="20%" size={3} />
      <DustParticle delay="1.5s" left="45%" size={2} />
      <DustParticle delay="0.8s" left="70%" size={4} />
      <DustParticle delay="2.2s" left="85%" size={2} />
      <DustParticle delay="3s" left="35%" size={3} />

      {/* Rocking chair image */}
      <div className="absolute bottom-4 left-8 z-10" style={{
        animation: 'rock 3s ease-in-out infinite',
        transformOrigin: 'bottom center',
      }}>
        <img
          src={rockingChairImg}
          alt="Rocking chair"
          className="w-40 sm:w-48 md:w-56 h-auto drop-shadow-2xl"
        />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
};

export default Index;
