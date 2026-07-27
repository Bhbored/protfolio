export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 animate-fade-in-up">
      <span className="font-headline text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">
        Scroll to Explore
      </span>
      <div className="relative w-5 h-8 md:w-6 md:h-10 border border-white/10 rounded-full flex justify-center">
        <div className="w-1 h-2 bg-primary-container rounded-full mt-2 animate-bounce" />
        <div className="absolute inset-0 bg-primary-container/20 blur-md rounded-full animate-pulse" />
      </div>
    </div>
  )
}
