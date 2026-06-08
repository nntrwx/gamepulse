import { ArrowUpRight } from 'lucide-react';

const links = [
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export default function NavigationLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/10 border border-white/20 text-slate-300 hover:text-white hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm"
        >
          {/* Вернули стрелочку */}
          <ArrowUpRight size={16} className="text-slate-400" />
          <span className="font-light text-sm md:text-base">{link.name}</span>
        </a>
      ))}
    </div>
  );
}