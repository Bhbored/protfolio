const DELAY_STEPS = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 900, 950, 1000, 1100, 1200, 1400, 1600, 1800,
] as const

type DelayMs = (typeof DELAY_STEPS)[number]

function nearestDelay(ms: number): DelayMs {
  const clamped = Math.max(0, Math.min(ms, 1800))
  return DELAY_STEPS.reduce((best, step) =>
    Math.abs(step - clamped) < Math.abs(best - clamped) ? step : best,
  )
}

export function animDelay(ms: number): `anim-d-${DelayMs}` {
  return `anim-d-${nearestDelay(ms)}`
}

export function animStagger(
  index: number,
  step = 150,
  base = 0,
): `anim-d-${DelayMs}` {
  return animDelay(base + index * step)
}
