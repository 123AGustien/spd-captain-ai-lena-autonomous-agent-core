export function DECIDE(obs) {
  const score =
    obs.FX +
    obs.ENERGY +
    obs.CYB +
    obs.INF;

  if (score === 0) return "IDLE";
  if (score <= 2) return "LOW_ACTION";
  if (score <= 3) return "MEDIUM_ACTION";
  return "HIGH_ACTION";
}