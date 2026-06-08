const faqData = [
  {
    q: "Is GamePulse free to use?",
    a: "Yes. GamePulse offers a free plan with core tracking features and optional premium upgrades for advanced analytics and customization."
  },
  {
    q: "Can I track multiple games?",
    a: "Absolutely. Track all your favorite games from a single dashboard and monitor your progress across your entire library."
  },
  {
    q: "Do I need a Steam account?",
    a: "No. GamePulse works independently and is designed to support multiple gaming platforms and launchers."
  },
  {
    q: "Is my gaming data secure?",
    a: "Your data remains private and protected. We prioritize transparency, security, and user control."
  },
  {
    q: "Can I customize my profile?",
    a: "Yes. Premium plans include profile customization options, themes, badges, and visual enhancements."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="max-w-[1140px] mx-auto py-20 px-4">
      <h2 className="text-[64px] font-bold text-white mb-6">FAQ</h2>
      
      <div className="flex flex-col">
        {faqData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="w-full h-[1px] bg-[#3E354A] my-6"></div>
            
            <h3 className="text-[24px] mb-4">
              <span className="font-pixel font-bold text-game-purple">Q: </span>
              <span className="font-normal text-white">{item.q}</span>
            </h3>
            
            <div className="w-full h-[1px] bg-[#3E354A] my-2"></div>

            <p className="text-[24px] mb-10">
              <span className="font-pixel font-bold text-[#FFEA00]">A: </span>
              <span className="font-normal text-white">{item.a}</span>
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}