import { useLanding } from "../../../providers/LandingProvider"
import { resolveMediaUrl } from "../../../../lib/media-url"

export default function PortraitImage() {
  const { personalInfo } = useLanding()
  const src = resolveMediaUrl(personalInfo.profile_image)

  if (!src) {
    return (
      <div
        className="flex size-full items-center justify-center bg-surface-container-high text-on-surface-variant"
        aria-label="No profile image"
      />
    )
  }

  return (
    <img
      alt={`${personalInfo.name || "Developer"} portrait`}
      src={src}
      className="w-full h-full object-cover object-[center_20%] md:object-[center_25%] portrait-mask brightness-100 group-hover:brightness-105 transition-all duration-700 group-hover:scale-105"
    />
  )
}
