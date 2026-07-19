export function riskModule(cyb, energy, fx) {
  const riskScore =
    (Number(cyb) * 0.4) +
    ((100 - Number(energy)) * 0.3) +
    (Math.abs(Number(fx)) * 0.3);

  if (riskScore >= 70) return "HIGH RISK";
  if (riskScore >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}