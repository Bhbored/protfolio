import type { ReactNode } from "react"

interface PhoneDeviceFrameProps {
  readonly children: ReactNode
  readonly className?: string
  readonly size?: "sm" | "md" | "lg"
}

const padClass = {
  sm: "rounded-[1.35rem] p-[5px]",
  md: "rounded-[1.75rem] p-1.5",
  lg: "rounded-[2rem] p-2",
} as const

const screenClass = {
  sm: "rounded-[1.05rem]",
  md: "rounded-[1.35rem]",
  lg: "rounded-[1.55rem]",
} as const

export default function PhoneDeviceFrame({
  children,
  className = "",
  size = "md",
}: PhoneDeviceFrameProps) {
  return (
    <div
      className={`relative bg-zinc-950 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] ${padClass[size]} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
      <div className={`relative overflow-hidden bg-black ${screenClass[size]}`}>
        {children}
      </div>
    </div>
  )
}
