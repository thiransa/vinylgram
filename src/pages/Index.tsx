const RecordSleeve = ({ color, rotation, top, left, width, height }: { color: string; rotation: string; top: string; left: string; width: string; height: string }) => (
  <div
    className="absolute rounded-sm shadow-lg"
    style={{
      background: color,
      transform: `rotate(${rotation})`,
      top, left, width, height,
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 4px 4px 12px rgba(0,0,0,0.5)',
    }}
  >
    <div className="absolute inset-3 rounded-full border-2 opacity-20" style={{ borderColor: 'rgba(245,230,200,0.3)' }} />
    <div className="absolute inset-[30%] rounded-full opacity-15" style={{ background: 'rgba(0,0,0,0.3)' }} />
  </div>
);

const RockingChair = () => (
  <div className="absolute bottom-8 left-8 z-10" style={{ animation: 'rock 3s ease-in-out infinite', transformOrigin: 'bottom center' }}>
    {/* Chair back */}
    <div className="relative">
      <div className="w-20 h-28 rounded-t-lg" style={{
        background: 'linear-gradient(135deg, hsl(24 40% 22%), hsl(24 35% 16%))',
        boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.3), inset 3px 0 8px rgba(0,0,0,0.1)',
      }}>
        {/* Slats */}
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute w-[3px] rounded-full" style={{
            background: 'hsl(24 30% 14%)',
            height: '70%', top: '10%',
            left: `${25 + i * 25}%`,
          }} />
        ))}
      </div>
      {/* Seat */}
      <div className="w-24 h-5 -ml-2 rounded-sm" style={{
        background: 'linear-gradient(180deg, hsl(24 40% 24%), hsl(24 35% 18%))',
        boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
      }} />
      {/* Front legs */}
      <div className="flex justify-between w-24 -ml-2">
        <div className="w-[4px] h-14 rounded-b" style={{ background: 'hsl(24 35% 18%)', transform: 'rotate(5deg)' }} />
        <div className="w-[4px] h-14 rounded-b" style={{ background: 'hsl(24 35% 18%)', transform: 'rotate(-5deg)' }} />
      </div>
      {/* Rockers */}
      <div className="absolute -bottom-1 -left-4 w-28 h-3 rounded-[50%]" style={{
        background: 'hsl(24 35% 15%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }} />
      {/* Arms */}
      <div className="absolute top-12 -left-3 w-3 h-16 rounded-full" style={{ background: 'hsl(24 38% 20%)' }} />
      <div className="absolute top-12 -right-5 w-3 h-16 rounded-full" style={{ background: 'hsl(24 38% 20%)' }} />
    </div>
  </div>
);

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

      {/* Record sleeves on walls */}
      <RecordSleeve color="linear-gradient(135deg, #8B4513, #654321)" rotation="-5deg" top="15%" left="5%" width="100px" height="100px" />
      <RecordSleeve color="linear-gradient(135deg, #1a1a2e, #16213e)" rotation="3deg" top="10%" left="20%" width="110px" height="110px" />
      <RecordSleeve color="linear-gradient(135deg, #800020, #4a0012)" rotation="-2deg" top="18%" left="38%" width="95px" height="95px" />
      <RecordSleeve color="linear-gradient(135deg, #2d4a22, #1a2e14)" rotation="7deg" top="8%" left="55%" width="105px" height="105px" />
      <RecordSleeve color="linear-gradient(135deg, #4a3728, #2e221a)" rotation="-4deg" top="14%" left="72%" width="100px" height="100px" />
      <RecordSleeve color="linear-gradient(135deg, #1a1a3e, #0e0e28)" rotation="2deg" top="12%" left="88%" width="90px" height="90px" />

      {/* Shelf line */}
      <div className="absolute w-full h-3 top-[32%]" style={{
        background: 'linear-gradient(180deg, hsl(24 35% 18%), hsl(24 30% 12%))',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5), 0 1px 0 rgba(139,90,43,0.2)',
      }} />

      {/* Second row of records */}
      <RecordSleeve color="linear-gradient(135deg, #D4821A, #a86514)" rotation="-3deg" top="35%" left="8%" width="85px" height="85px" />
      <RecordSleeve color="linear-gradient(135deg, #5c2d2d, #3a1c1c)" rotation="5deg" top="37%" left="25%" width="95px" height="95px" />
      <RecordSleeve color="linear-gradient(135deg, #3d3d1a, #2a2a12)" rotation="-1deg" top="34%" left="60%" width="90px" height="90px" />
      <RecordSleeve color="linear-gradient(135deg, #2C1810, #1a0e0a)" rotation="4deg" top="36%" left="78%" width="100px" height="100px" />

      {/* Second shelf */}
      <div className="absolute w-full h-3 top-[52%]" style={{
        background: 'linear-gradient(180deg, hsl(24 35% 18%), hsl(24 30% 12%))',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5), 0 1px 0 rgba(139,90,43,0.2)',
      }} />

      {/* Title */}
      <div className="relative z-20 flex flex-col items-center pt-[55%] sm:pt-[45%] md:pt-[38%]">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[0.25em] text-secondary"
          style={{
            textShadow: '0 0 40px rgba(212,130,26,0.4), 0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          VINYLGRAM
        </h1>
        <div className="mt-3 h-[1px] w-48 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <p className="mt-4 text-sm tracking-[0.5em] uppercase text-muted-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
          Share the sound · Keep the soul
        </p>
      </div>

      {/* Rocking chair */}
      <RockingChair />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
};

export default Index;
