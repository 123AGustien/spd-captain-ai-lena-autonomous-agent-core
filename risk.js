export function riskModule(cyb, energy, fx) {
  const cyberRisk = Number(cyb) || 0;
  const energyRisk = 100 - (Number(energy) || 0);
  const fxRisk = Math.abs(Number(fx) || 0);

  const riskScore =
    (cyberRisk * 0.4) +
    (energyRisk * 0.3) +
    (fxRisk * 0.3);

  if (riskScore >= 70) return "HIGH RISK";
  if (riskScore >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}
