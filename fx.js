export function riskModule(cyb, energy, fx) {
  const stress = (cyb + (100 - energy) + fx) / 3;

  if (stress >= 70) return "HIGH RISK";
  if (stress >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}