import ContactFlipCard from "./components/ContactFlipCard"
import ContactInfoCard from "./components/ContactInfoCard"
import LanguagesCard from "./components/LanguagesCard"

const headline = [
  { text: "LET'S BUILD", color: "text-white", delay: "anim-d-100" },
  { text: "SOMETHING", color: "text-primary", delay: "anim-d-200" },
  { text: "GREAT", color: "text-secondary", delay: "anim-d-300" },
] as const

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-384">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div className="space-y-0">
            {headline.map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h2
                  className={`animate-fade-in-up font-headline text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-[64px] lg:text-[80px] ${line.color} ${line.delay}`}
                >
                  {line.text}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-6 sm:gap-8 md:flex-row md:gap-12 lg:gap-16">
          <div className="anim-d-400 w-full max-w-lg animate-fade-in-up md:w-1/2">
            <ContactFlipCard />
          </div>
          <div className="anim-d-500 flex w-full max-w-lg flex-col gap-5 animate-fade-in-up sm:gap-6 md:w-1/2">
            <ContactInfoCard />
            <LanguagesCard />
          </div>
        </div>
      </div>
    </section>
  )
}
