import { useState, type SyntheticEvent } from "react"
import { Send } from "lucide-react"
import { useLanding } from "../../../providers/LandingProvider"

interface ContactFormState {
  name: string
  subject: string
  message: string
}

interface FieldError {
  name?: string
  subject?: string
  message?: string
}

const initialForm: ContactFormState = { name: "", subject: "", message: "" }

const limits = { name: 20, subject: 40, message: 500 }

export default function ContactForm() {
  const { personalInfo: info } = useLanding()
  const [form, setForm] = useState<ContactFormState>(initialForm)
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validateField = (value: string, label: string, max: number): string | undefined => {
    if (!value.trim()) return `${label} is required`
    if (value.length > max) return `${label} can't exceed ${max} characters`
    return undefined
  }

  const validate = (): boolean => {
    const next: FieldError = {
      name: validateField(form.name, "Name", limits.name),
      subject: validateField(form.subject, "Subject", limits.subject),
      message: validateField(form.message, "Message", limits.message),
    }
    setErrors(next)
    return Object.values(next).every((e) => e === undefined)
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const subject = form.subject
    const body = `Hello, my name is ${form.name} and I would like to get in touch with you.\n${form.message}`
    const mailto = `mailto:${info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setTimeout(() => {
      window.location.href = mailto
      setForm(initialForm)
      setSubmitting(false)
    }, 100)
  }

  const fields: {
    field: keyof ContactFormState
    label: string
    placeholder: string
    type: "input" | "textarea"
    rows?: number
  }[] = [
    { field: "name", label: "Name", placeholder: "Name", type: "input" },
    { field: "subject", label: "Subject", placeholder: "Subject", type: "input" },
    { field: "message", label: "Message", placeholder: "Message", type: "textarea", rows: 4 },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 grow flex flex-col" noValidate>
      {fields.map((f) => (
        <div key={f.field} className="relative grow">
          {f.type === "input" ? (
            <input
              type="text"
              value={form[f.field]}
              onChange={(e) => updateField(f.field, e.target.value)}
              placeholder={f.placeholder}
              className="peer w-full bg-transparent border-0 border-b border-outline-variant py-3 text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all duration-300 placeholder-transparent"
            />
          ) : (
            <textarea
              value={form[f.field]}
              onChange={(e) => updateField(f.field, e.target.value)}
              placeholder={f.placeholder}
              rows={f.rows}
              className="peer w-full bg-transparent border-0 border-b border-outline-variant py-3 text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all duration-300 placeholder-transparent resize-none"
            />
          )}
          <label
            className={`absolute left-0 top-3 font-label text-on-surface uppercase tracking-widest text-xs pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary ${form[f.field] ? "-translate-y-8 scale-75 text-primary" : ""}`}
          >
            {f.label}
          </label>
          {errors[f.field] && (
            <p className="block text-xs text-red-500 mt-1 font-label tracking-wider">
              {errors[f.field]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-14 bg-linear-to-r from-primary to-secondary flex items-center justify-center gap-3 font-headline font-bold text-background uppercase tracking-tight hover:scale-102 active:scale-95 transition-all duration-300 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "SENDING..." : "SEND MESSAGE"}
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
