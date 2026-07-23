/**
 * ============================================================
 * SPD V13 — FX MODULE
 * ============================================================
 *
 * Deterministic Foreign Exchange Stability Evaluation.
 *
 * FX input represents financial / economic stress.
 *
 * Rules:
 * FX > 10  → FX STABILIZATION REQUIRED
 * FX < 0   → FX UNDERFLOW WARNING
 * Otherwise → FX STABLE
 * ============================================================
 */

export function fxModule(fx) {

  const safeFx = Number(fx ?? 0);

  if (safeFx > 10) {
    return "FX STABILIZATION REQUIRED";
  }

  if (safeFx < 0) {
    return "FX UNDERFLOW WARNING";
  }

  return "FX STABLE";
}