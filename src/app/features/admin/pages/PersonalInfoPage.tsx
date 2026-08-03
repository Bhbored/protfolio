/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Plus, Trash2, Upload } from "lucide-react"
import { createPersonalInfo, personalInfoKeys, updatePersonalInfo } from "../admin.service"
import { EMPTY_PERSONAL_INFO, personalInfoQueries } from "../../landing/personal-info.service"
import type { Language, PersonalInfo, ProficiencyLevel } from "../../../shared/types"
import { ProficiencyLevel as Levels } from "../../../shared/types"
import { useUploadImage } from "../../../../hooks/use-upload"

const proficiencyLabels: Record<ProficiencyLevel, string> = {
  [Levels.Elementary]: "Elementary",
  [Levels.Intermediate]: "Intermediate",
  [Levels.Advanced]: "Advanced",
  [Levels.Native]: "Native",
}

export default function PersonalInfoPage() {
  const queryClient = useQueryClient()
  const { data } = useQuery(personalInfoQueries.detail())
  const [form, setForm] = useState<PersonalInfo>(EMPTY_PERSONAL_INFO)
  const upload = useUploadImage()

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const save = useMutation({
    mutationFn: () => {
      const { id, ...payload } = form
      return id ? updatePersonalInfo(id, payload) : createPersonalInfo(payload)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: personalInfoKeys.all }),
  })

  const update = <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) =>
    setForm((current) => ({ ...current, [key]: value }))
  const updateLanguage = (index: number, patch: Partial<Language>) =>
    update("languages", form.languages.map((language, i) => i === index ? { ...language, ...patch } : language))

  return (
    <form onSubmit={(event) => { event.preventDefault(); save.mutate() }} className="space-y-6">
      <section className="rounded-xl border border-white/10 bg-surface-container-high p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div><h1 className="font-headline text-2xl font-bold">Personal information</h1><p className="mt-1 text-sm text-on-surface-variant">Manage the details shown on your portfolio.</p></div>
          <button disabled={save.isPending} className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-linear-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50"><Check className="size-4" />{save.isPending ? "Saving…" : "Save"}</button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {(["name", "title", "headline", "email", "phone", "location"] as const).map((field) => (
            <label key={field} className="space-y-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">{field.replaceAll("_", " ")}
              <input type={field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => update(field, event.target.value)} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" />
            </label>
          ))}
          <label className="space-y-2 font-label text-xs uppercase tracking-widest text-on-surface-variant md:col-span-2">Summary
            <textarea value={form.summary} onChange={(event) => update("summary", event.target.value)} rows={4} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" />
          </label>
          <div className="space-y-2"><label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Profile image</label>
            <div className="flex gap-3"><input value={form.profile_image} onChange={(event) => update("profile_image", event.target.value)} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" />
              <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-surface-container-high border border-outline-variant/30 px-3 text-primary"><Upload className="size-4" /><input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload.mutate({ file, projectFolder: "profile" }, { onSuccess: (url) => update("profile_image", url) }) }} /></label>
            </div>
            {form.profile_image ? <img src={form.profile_image} alt="Profile preview" className="mt-3 size-20 rounded-full object-cover" /> : null}
          </div>
          <label className="flex items-center gap-3 self-end text-sm text-on-surface"><input type="checkbox" checked={form.is_available_for_work} onChange={(event) => update("is_available_for_work", event.target.checked)} className="size-4 accent-primary" />Available for work</label>
        </div>
      </section>
      <section className="rounded-xl border border-white/10 bg-surface-container-high p-6">
        <h2 className="font-headline text-lg font-bold">Social links</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">{(["github", "linkedin"] as const).map((field) => <label key={field} className="space-y-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">{field}<input value={form.social[field]} onChange={(event) => update("social", { ...form.social, [field]: event.target.value })} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" /></label>)}</div>
      </section>
      <section className="rounded-xl border border-white/10 bg-surface-container-high p-6">
        <div className="flex items-center justify-between"><h2 className="font-headline text-lg font-bold">Languages</h2><button type="button" onClick={() => update("languages", [...form.languages, { name: "", proficiency: Levels.Elementary }])} className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-surface-container-high border border-outline-variant/30 px-3 py-2 text-xs text-primary"><Plus className="size-4" />Add language</button></div>
        <div className="mt-4 space-y-3">{form.languages.map((language, index) => <div key={`${language.name}-${index}`} className="grid gap-3 sm:grid-cols-[1fr_180px_auto]"><input value={language.name} onChange={(event) => updateLanguage(index, { name: event.target.value })} placeholder="Language" className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" /><select value={language.proficiency} onChange={(event) => updateLanguage(index, { proficiency: Number(event.target.value) as ProficiencyLevel })} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface">{Object.entries(proficiencyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button type="button" aria-label={`Remove ${language.name || "language"}`} onClick={() => update("languages", form.languages.filter((_, i) => i !== index))} className="size-10 cursor-pointer text-error"><Trash2 className="mx-auto size-4" /></button></div>)}</div>
      </section>
    </form>
  )
}
