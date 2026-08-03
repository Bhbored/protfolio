import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import { STALE_TIME, throwIfError } from "../../shared/api/supabase-utils"
import type { Certificate, Skill } from "../../shared/types"

export const certificateKeys = {
  all: ["certificates"] as const,
  list: () => [...certificateKeys.all, "list"] as const,
}

function normalizeCertificate(
  row: Omit<Certificate, "top_skills">,
): Omit<Certificate, "top_skills"> {
  return {
    ...row,
    year: row.year ?? "",
    link: row.link ?? null,
  }
}

export async function fetchCertificates(): Promise<
  Omit<Certificate, "top_skills">[]
> {
  const result = await supabase.from("certificates").select("*")
  const rows = await throwIfError(result, "certificates")
  return ((rows ?? []) as Omit<Certificate, "top_skills">[]).map(
    normalizeCertificate,
  )
}

export function getTop3SkillsByCertificateId(
  skills: Skill[],
  certificateId: string,
): Skill[] {
  return skills
    .filter((s) => s.certificate_id === certificateId)
    .sort((a, b) => b.mastery_level - a.mastery_level)
    .slice(0, 3)
}

export function withCertificateTopSkills(
  certificates: Omit<Certificate, "top_skills">[],
  skills: Skill[],
): Certificate[] {
  return certificates.map((cert) => ({
    ...cert,
    top_skills: getTop3SkillsByCertificateId(skills, cert.id),
  }))
}

export const certificateQueries = {
  list: () =>
    queryOptions({
      queryKey: certificateKeys.list(),
      queryFn: fetchCertificates,
      staleTime: STALE_TIME,
    }),
}
