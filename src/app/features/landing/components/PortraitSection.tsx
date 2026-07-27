interface PortraitSectionProps {
  readonly portraitUrl: string;
}

export default function PortraitSection({ portraitUrl }: PortraitSectionProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pt-12 md:pt-0 px-4 md:px-0">
      <div className="relative w-full h-full group max-w-md mx-auto md:max-w-none overflow-hidden rounded-2xl md:rounded-3xl border-2 border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-700 hover:border-primary-container/30">
        <img
          alt="Developer portrait"
          src={portraitUrl}
          className="w-full h-full object-cover object-[center_20%] md:object-[center_25%] portrait-mask brightness-100 group-hover:brightness-105 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none bg-linear-to-b from-transparent from-60% to-background/40 opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
      </div>
    </div>
  );
}
