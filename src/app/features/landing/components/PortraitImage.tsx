interface PortraitImageProps {
  readonly url: string
}

export default function PortraitImage({ url }: PortraitImageProps) {
  return (
    <img
      alt="Developer portrait"
      src={url}
      className="w-full h-full object-cover object-[center_20%] md:object-[center_25%] portrait-mask brightness-100 group-hover:brightness-105 transition-all duration-700 group-hover:scale-105"
    />
  )
}
