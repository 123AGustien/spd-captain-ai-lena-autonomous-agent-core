/**
 * SPD v13.1 — FX RESILIENCE MODULE
 *
 * Foreign Exchange domain assessment.
 *
 * Input:
 *   fx = FX stress value, 0–100
 *
 * Output:
 *   deterministic FX assessment
 */

export function fxModule(fx) {

  const value = Number(fx);

  if (!Number.isFinite(value)) {
    return "FX INPUT INVALID";
  }

  if (value >= 70) {
    return "FX HIGH STRESS — STABILIZATION REQUIRED";
  }

  if (value >= 40) {
    return "FX MEDIUM STRESS — STABILIZATION MONITORING";
  }

  return "FX STABLE";
}