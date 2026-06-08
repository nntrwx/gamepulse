import NavigationLinks from './NavigationLinks';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <div className="absolute top-1/4 -z-10 w-96 h-96 bg-game-purple/20 blur-[250px] rounded-full animate-pulse" />
      
      <div className="mb-0 px-6 py-3 font-pixel font-bold text-[24px] text-game-purple tracking-widest backdrop-blur-sm">
  The Future of Gaming Stats
</div>
      
      <h1 className="text-[64px] font-black tracking-tighter mb-6 bg-[#FFFFFF] bg-clip-text text-transparent">
  Level Up Your Gaming Journey
</h1>
      
      <p className="text-xl text-game-grey mb-10 max-w-lg">
        Track your playtime, achievements, XP progression, and gaming habits in one beautiful dashboard built for players who love seeing their growth.
      </p>
      
      <button className="mb-10 bg-game-purple hover:bg-purple-700 transition-all text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(109,40,217,0.4)] hover:shadow-[0_0_40px_rgba(109,40,217,0.6)] cursor-pointer">
        Start Tracking Free
      </button>

      <NavigationLinks />
      
    </section>
  );
}