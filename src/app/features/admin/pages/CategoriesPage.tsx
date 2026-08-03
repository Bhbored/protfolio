import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"
import { createCategory, deleteCategory, skillKeys, updateCategory } from "../admin.service"
import { skillQueries } from "../../skills/skills.service"
import PaginationControls from "../components/PaginationControls"
import type { SkillCategory } from "../../../shared/types"

const PAGE_SIZE = 10

export default function CategoriesPage() {
  const queryClient = useQueryClient()
  const { data: categories = [] } = useQuery(skillQueries.categories())
  const { data: skills = [] } = useQuery(skillQueries.list())
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<SkillCategory | null>(null)
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState("")
  const invalidate = () => queryClient.invalidateQueries({ queryKey: skillKeys.all })
  const create = useMutation({ mutationFn: () => createCategory({ category: newName }), onSuccess: () => { invalidate(); setAdding(false); setNewName(""); setPage(Math.max(1, Math.ceil((categories.length + 1) / PAGE_SIZE))) } })
  const update = useMutation({ mutationFn: (category: SkillCategory) => updateCategory(category.id, { category: category.category }), onSuccess: () => { invalidate(); setEditingId(null); setDraft(null) } })
  const remove = useMutation({ mutationFn: deleteCategory, onSuccess: () => { invalidate(); if (categories.length - 1 <= (page - 1) * PAGE_SIZE && page > 1) setPage(page - 1) } })
  const rows = categories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return <div className="space-y-6">
    <div className="flex items-center justify-between gap-4"><div><h1 className="font-headline text-2xl font-bold">Skill categories</h1><p className="mt-1 text-sm text-on-surface-variant">Organize skills into groups.</p></div><button type="button" onClick={() => setAdding(true)} className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-linear-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-on-primary"><Plus className="size-4" />Add category</button></div>
    {adding ? <form onSubmit={(event) => { event.preventDefault(); if (newName.trim()) create.mutate() }} className="rounded-xl border border-white/10 bg-surface-container-high p-4"><label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Category name<input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} className="mt-2 bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" /></label><div className="mt-4 flex gap-2"><button disabled={create.isPending} className="rounded-md bg-linear-to-r from-primary to-secondary px-4 py-2 text-sm text-on-primary">Save</button><button type="button" onClick={() => setAdding(false)} className="rounded-md bg-surface-container-high border border-outline-variant/30 px-4 py-2 text-sm">Cancel</button></div></form> : null}
    <section className="overflow-hidden rounded-xl border border-white/10 bg-surface-container-high"><div className="overflow-x-auto"><table className="w-full min-w-[540px] text-left"><thead><tr className="border-b border-white/10"><th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">ID</th><th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Category name</th><th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Skills</th><th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Actions</th></tr></thead><tbody>
      {rows.map((category) => { const editing = editingId === category.id; return <tr key={category.id} className="border-b border-white/5 hover:bg-white/[0.03]"><td className="max-w-28 truncate px-4 py-3 font-mono text-xs text-on-surface-variant" title={category.id}>{category.id}</td><td className="px-4 py-3">{editing ? <input value={draft?.category ?? ""} onChange={(event) => setDraft((current) => current ? { ...current, category: event.target.value } : current)} className="bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none w-full text-on-surface" /> : category.category}</td><td className="px-4 py-3 tabular-nums">{skills.filter((skill) => skill.skill_category_id === category.id).length}</td><td className="px-4 py-3"><div className="flex gap-1">{editing ? <><button type="button" aria-label="Save category" onClick={() => draft && update.mutate(draft)} className="size-8 cursor-pointer text-primary"><Check className="mx-auto size-4" /></button><button type="button" aria-label="Cancel editing" onClick={() => { setEditingId(null); setDraft(null) }} className="size-8 cursor-pointer"><X className="mx-auto size-4" /></button></> : <><button type="button" aria-label={`Edit ${category.category}`} onClick={() => { setEditingId(category.id); setDraft(category) }} className="size-8 cursor-pointer text-primary"><Pencil className="mx-auto size-4" /></button><button type="button" aria-label={`Delete ${category.category}`} onClick={() => { if (window.confirm(`Delete ${category.category}?`)) remove.mutate(category.id) }} className="size-8 cursor-pointer text-error"><Trash2 className="mx-auto size-4" /></button></>}</div></td></tr> })}
      {rows.length === 0 ? <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-on-surface-variant">No categories yet.</td></tr> : null}
    </tbody></table></div><div className="px-4"><PaginationControls currentPage={page} pageSize={PAGE_SIZE} totalItems={categories.length} onPageChange={setPage} /></div></section>
  </div>
}
