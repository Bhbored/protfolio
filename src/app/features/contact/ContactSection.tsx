import ContactFlipCard from "./components/ContactFlipCard"
import ContactInfoCard from "./components/ContactInfoCard"
import LanguagesCard from "./components/LanguagesCard"

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-384 mx-auto">
        {/* Headline */}
        <div className="mb-12 md:mb-16">
          <div className="space-y-0">
            {[
              { text: "LET'S BUILD", color: "text-white", delay: "100ms" },
              { text: "SOMETHING", color: "text-primary", delay: "200ms" },
              { text: "GREAT", color: "text-secondary", delay: "300ms" },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h1
                  className={`font-headline font-bold text-[48px] md:text-[64px] lg:text-[80px] leading-[0.9] tracking-tight ${line.color} uppercase animate-fade-in-up`}
                  style={{ animationDelay: line.delay, animationFillMode: "both", opacity: 0 }}
                >
                  {line.text}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Two columns */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 lg:gap-16">
          <div className="w-full md:w-1/2 max-w-lg animate-fade-in-up" style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}>
            <ContactFlipCard />
          </div>
          <div className="w-full md:w-1/2 max-w-lg flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: "500ms", animationFillMode: "both", opacity: 0 }}>
            <ContactInfoCard />
            <LanguagesCard />
          </div>
        </div>
      </div>
    </section>
  )
}
