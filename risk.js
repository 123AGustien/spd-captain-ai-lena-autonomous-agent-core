export function riskModule(cyb, energy, fx) {

  const cyber = Number(cyb);
  const power = Number(energy);
  const foreignExchange = Number(fx);

  const rawStress = (
    cyber +
    power +
    foreignExchange
  ) / 3;

  if (rawStress >= 70) {
    return "HIGH RISK";
  }

  if (rawStress >= 40) {
    return "MEDIUM RISK";
  }

  return "LOW RISK";
}