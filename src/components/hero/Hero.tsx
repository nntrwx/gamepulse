export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden pt-20">
      <div 
        className="absolute top-1/4 -z-10 w-64 h-64 md:w-96 md:h-96 rounded-full animate-pulse" 
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 70%)',
          willChange: 'transform, opacity'
        }}
      />
      
      <div className="mb-4 px-4 py-2 font-pixel font-bold text-[16px] md:text-[24px] text-game-purple tracking-widest bg-white/5 backdrop-blur-sm rounded-full">
        The Future of Gaming Stats
      </div>
      
      {/* Адаптивный размер текста */}
      <h1 className="text-[40px] md:text-[64px] font-black tracking-tighter mb-6 bg-[#FFFFFF] bg-clip-text text-transparent leading-tight">
        Level Up Your Gaming Journey
      </h1>
      
      <p className="text-base md:text-xl text-game-grey mb-10 max-w-lg">
        Track your playtime, achievements, XP progression, and gaming habits in one beautiful dashboard.
      </p>
      
      <button className="bg-game-purple hover:bg-purple-700 transition-all text-white px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-glow-purple cursor-pointer">
        Start Tracking Free
      </button>
    </section>
  );
}