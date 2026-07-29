import { useLanding } from "../../../providers/LandingProvider"
import { getProficiencyText } from "../../../../lib/proficiency"

export default function LanguagesCard() {
  const { personalInfo: info } = useLanding()

  return (
    <div className="bg-surface-container-high rounded-xl border border-white/10 p-6 md:p-8 grow">
      <h3 className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-headline text-lg font-bold uppercase tracking-tight mb-6">
        Languages
      </h3>
      <div className="space-y-4">
        {info.Languages.map((lang) => (
          <div key={lang.Name} className="flex justify-between items-start">
            <p className="font-body text-sm text-on-surface-variant font-medium">{lang.Name}</p>
            <p className="font-label text-xs text-primary uppercase tracking-wider">{getProficiencyText(lang.Proficiency)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
