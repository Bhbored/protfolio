import { Mail } from "lucide-react"
import { useLanding } from "../../../providers/LandingProvider"

function PhoneIcon({ className }: { readonly className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function PinIcon({ className }: { readonly className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

const contactItems = [
  { icon: Mail, label: "Email", getValue: (info: { Email: string }) => info.Email, getHref: (info: { Email: string }) => `mailto:${info.Email}` },
  { icon: PhoneIcon, label: "Phone", getValue: (info: { Phone: string }) => info.Phone, getHref: (info: { Phone: string }) => `tel:${info.Phone}` },
  { icon: PinIcon, label: "Location", getValue: (info: { Location: string }) => info.Location, getHref: () => null },
]

export default function ContactInfoCard() {
  const { personalInfo: info } = useLanding()

  return (
    <div className="bg-surface-container-high rounded-xl border border-white/10 p-6 md:p-8">
      <h3 className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-headline text-lg font-bold uppercase tracking-tight mb-6">
        Contact Information
      </h3>
      <div className="space-y-5">
        {contactItems.map((item) => {
          const value = item.getValue(info as never)
          const href = item.getHref(info as never)
          return (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary mb-1">{item.label}</p>
                {href ? (
                  <a href={href} className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline">{value}</a>
                ) : (
                  <p className="font-body text-sm text-on-surface-variant">{value}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
        {info.Social.Github && (
          <a href={info.Social.Github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          </a>
        )}
        {info.Social.Linkedin && (
          <a href={info.Social.Linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
        )}
      </div>
    </div>
  )
}
