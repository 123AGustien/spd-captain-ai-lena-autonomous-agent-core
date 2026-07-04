export function energyModule(energy) {
  if (energy < 30) return "LOW ENERGY MODE";
  if (energy < 70) return "MODERATE ENERGY MODE";
  return "ENERGY STABLE";
}
