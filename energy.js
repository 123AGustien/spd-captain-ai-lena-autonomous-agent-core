 /**
  * ============================================================
  * SPD V13 — ENERGY MODULE
  * ============================================================
  *
  * Deterministic Energy Stability Evaluation.
  *
  * Energy is represented as a percentage from 0 to 100.
  *
  * Rules:
  * Energy < 30  → LOW ENERGY MODE
  * Energy < 70  → MODERATE ENERGY MODE
  * Otherwise    → ENERGY STABLE
  * ============================================================
  */

export function energyModule(energy) {

  const safeEnergy = Number(energy ?? 50);

  if (safeEnergy < 30) {
    return "LOW ENERGY MODE";
  }

  if (safeEnergy < 70) {
    return "MODERATE ENERGY MODE";
  }

  return "ENERGY STABLE";
}