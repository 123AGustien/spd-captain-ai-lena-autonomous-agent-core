/**
 * ============================================================
 * SPD V13 — RISK MODULE
 * ============================================================
 *
 * Evaluates combined system stress from:
 *
 * CYB  → Cyber / system integrity
 * ENERGY → Available energy
 * FX → Financial / economic stress
 *
 * Deterministic rule-based evaluation.
 * ============================================================
 */

export function riskModule(cyb, energy, fx) {

  const safeCyb = Number(cyb ?? 50);
  const safeEnergy = Number(energy ?? 50);
  const safeFx = Number(fx ?? 0);

  let riskScore = 0;

  // ==========================================================
  // CYBER / SYSTEM INTEGRITY
  // ==========================================================

  if (safeCyb < 50) {
    riskScore++;
  }

  // ==========================================================
  // ENERGY STRESS
  // ==========================================================

  if (safeEnergy < 30) {
    riskScore++;
  }

  // ==========================================================
  // FX STRESS
  // ==========================================================

  if (safeFx > 10) {
    riskScore++;
  }

  // ==========================================================
  // RISK CLASSIFICATION
  // ==========================================================

  if (riskScore >= 2) {
    return "HIGH RISK";
  }

  if (riskScore === 1) {
    return "MEDIUM RISK";
  }

  return "LOW RISK";
}