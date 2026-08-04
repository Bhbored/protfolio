import { useLanding } from "../../../providers/LandingProvider"
import MediaImage from "../../../shared/components/MediaImage"

export default function PortraitImage() {
  const { personalInfo } = useLanding()

  return (
    <MediaImage
      src={personalInfo.profile_image}
      alt={`${personalInfo.name || "Developer"} portrait`}
      frame="none"
      loading="eager"
      className="size-full bg-surface-container-high"
      imageClassName="object-[center_20%] md:object-[center_25%] portrait-mask brightness-100 group-hover:brightness-105 transition-all duration-700 group-hover:scale-105"
      fallback={
        <div
          className="absolute inset-0 flex size-full items-center justify-center bg-surface-container-high text-on-surface-variant"
          aria-label="No profile image"
        />
      }
    />
  )
}
