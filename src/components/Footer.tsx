export default function Footer() {
  const footerLinks = {
    Product: ['Dashboard', 'Features', 'Pricing', 'FAQ'],
    Resources: ['Documentation', 'Roadmap', 'Support', 'Changelog'],
    Socials: ['GitHub', 'LinkedIn', 'Portfolio'],
  };

  return (
    <footer className="bg-game-dark border-t border-[#3E354A] pt-16 pb-8 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Бренд */}
        <div className="col-span-1">
          <h2 className="font-pixel text-[40px] text-game-purple mb-2">GAMEPULSE</h2>
          <p className="text-game-grey text-[16px] mb-4">Track. Progress. Level Up.</p>
          <p className="text-game-grey text-[16px] leading-relaxed max-w-[280px]">
            GamePulse transforms gaming sessions into meaningful progress through XP, achievements, analytics, and habit tracking.
          </p>
        </div>

        {/* Ссылки */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-white text-[24px] font-bold mb-6">{title}</h3>
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link} className="text-white text-[24px] cursor-pointer hover:text-game-purple transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between text-game-grey text-[16px] pt-8 border-t border-[#3E354A]">
        <p>© 2026 GamePulse. All rights reserved.</p>
        <p>Built by Nicole 💜</p>
      </div>
    </footer>
  );
}