import MediaImage from "../../../shared/components/MediaImage"
import PhoneDeviceFrame from "../../../shared/components/PhoneDeviceFrame"

interface ScreenshotItemProps {
  readonly src: string
  readonly alt?: string
  readonly isMobileApp?: boolean
}

export default function ScreenshotItem({
  src,
  alt = "Screenshot",
  isMobileApp = false,
}: ScreenshotItemProps) {
  if (isMobileApp) {
    return (
      <PhoneDeviceFrame size="sm" className="w-full">
        <MediaImage
          src={src}
          alt={alt}
          frame="phone"
          className="w-full bg-black"
        />
      </PhoneDeviceFrame>
    )
  }

  return (
    <MediaImage
      src={src}
      alt={alt}
      frame="desktop"
      className="rounded-xl border border-white/10"
    />
  )
}
