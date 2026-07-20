/**
 * SPD v13 — CAPTAIN AI LENA
 * -------------------------
 * Autonomous orchestration layer.
 *
 * Architecture:
 * DATA → ALGORITHMS → COMPUTE
 *
 * Captain AI Lena coordinates:
 * FX
 * ENERGY
 * RISK DIAGNOSTICS
 * SCENARIO
 *
 * The SEXTANT GOLDEN RULE ENGINE remains
 * the SINGLE AUTHORITATIVE deterministic
 * assessment and decision layer.
 *
 * IMPORTANT:
 * Domain modules may provide supporting diagnostics,
 * but they must NOT override or compete with the
 * authoritative Golden Rule risk classification.
 *
 * Authoritative flow:
 *
 * DATA
 *   ↓
 * DOMAIN MODULES
 *   ↓
 * SEXTANT GOLDEN RULE ENGINE
 *   ↓
 * CAPTAIN AI LENA
 *   ↓
 * SYSTEM OUTPUT
 */

// ============================================================
// DOMAIN MODULES
// ============================================================

import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

import {
  runGoldenRule
} from "./goldenRuleEngine.js";


// ============================================================
// CAPTAIN AI LENA
// ============================================================

export function captainAILena(state = {}) {

  // ==========================================================
  // 1. RUN DOMAIN MODULES
  //
  // These modules provide supporting domain information
  // and diagnostics.
  //
  // They do NOT define the authoritative system risk.
  // ==========================================================

  const fx = fxModule(
    state.fx
  );

  const energy = energyModule(
    state.energy
  );

  const riskDiagnostics = riskModule(
    state.cyb,
    state.energy,
    state.fx
  );

  const scenario = scenarioEngine(
    state.event
  );


  // ==========================================================
  // 2. RUN AUTHORITATIVE GOLDEN RULE ENGINE
  //
  // OBSERVE
  // VERIFY
  // ASSESS
  // DECIDE
  // ACT
  // UPDATE
  //
  // The Golden Rule Engine is the SINGLE SOURCE OF TRUTH
  // for:
  //
  // - System assessment
  // - Golden Score
  // - Resilience Score
  // - Risk classification
  // - Decision
  // - Action
  // - Action sequence
  // - Updated state
  // ==========================================================

  const goldenRule =
    runGoldenRule(state);


  // ==========================================================
  // 3. AUTHORITATIVE RISK
  //
  // IMPORTANT:
  //
  // Do NOT use riskDiagnostics.risk as the final
  // Captain AI Lena risk classification.
  //
  // The authoritative risk comes directly from:
  //
  // goldenRule.assessment.risk
  //
  // This prevents competing risk calculations.
  // ==========================================================

  const authoritativeRisk =
    goldenRule.assessment?.risk ?? "UNKNOWN";


  // ==========================================================
  // 4. RETURN UNIFIED CAPTAIN AI LENA OUTPUT
  // ==========================================================

  return {

    agent:
      "CAPTAIN AI LENA",

    // Domain diagnostic outputs
    fx,

    energy,

    // Supporting diagnostic information only.
    // This is NOT the authoritative risk classification.
    riskDiagnostics,

    scenario,

    // ========================================================
    // AUTHORITATIVE GOLDEN RULE OUTPUT
    // ========================================================

    risk:
      authoritativeRisk,

    decision:
      goldenRule.decision,

    actionSequence:
      goldenRule.actionSequence,

    assessment:
      goldenRule.assessment,

    updatedState:
      goldenRule.updatedState,

    pipeline:
      goldenRule.pipeline,

    status:
      goldenRule.status

  };

}