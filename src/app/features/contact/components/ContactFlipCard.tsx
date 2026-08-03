import { useState } from "react";
import { Zap, Calendar, Code, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";

const perks = [
  {
    icon: Zap,
    title: "Quick Response",
    desc: "I typically respond within 24 hours",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    desc: "Available for remote work and flexible hours",
  },
  {
    icon: Code,
    title: "Project Types",
    desc: "Mobile & Web apps, cross-platform development, consulting",
  },
];

export default function ContactFlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full min-h-125 md:min-h-150"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full min-h-125 md:min-h-150 transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* Front */}
        <div
          className="bg-surface-container-high rounded-xl border border-white/10 p-6 md:p-8 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
          }}
        >
          <h3 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4">
            Let's Work Together!
          </h3>
          <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-8">
            I'm currently available for freelance work and open to discussing
            new projects, collaborations, or opportunities to be part of your
            vision.
          </p>
          <div className="space-y-8 grow flex flex-col justify-center mb-8">
            {perks.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-label text-sm font-bold text-primary uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="w-full h-14 bg-linear-to-r from-primary to-secondary flex items-center justify-center gap-3 font-headline font-bold text-background uppercase tracking-tight hover:scale-102 active:scale-95 transition-all duration-300 mt-auto"
          >
            SEND ME AN EMAIL <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Back */}
        <div
          className="bg-surface-container-high rounded-xl border border-white/10 p-6 md:p-8 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
          }}
        >
          <h3 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-6">
            Send Me A Message
          </h3>
          <ContactForm />
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="mt-4 w-full py-3 text-center text-xs font-label text-on-surface-variant/50 hover:text-primary transition-colors tracking-widest uppercase border border-white/10 rounded-lg hover:border-primary/50"
          >
            ← BACK TO INFO
          </button>
        </div>
      </div>
    </div>
  );
}
