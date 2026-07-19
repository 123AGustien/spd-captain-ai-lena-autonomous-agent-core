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
 * RISK
 * SCENARIO
 *
 * The SEXTANT GOLDEN RULE ENGINE remains
 * the authoritative deterministic decision layer.
 */

import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";
import { runGoldenRule } from "./goldenRuleEngine.js";

// ============================================================
// CAPTAIN AI LENA
// ============================================================

export function captainAILena(state = {}) {

  // ==========================================================
  // 1. RUN DOMAIN MODULES
  // ==========================================================

  const fx = fxModule(state.fx);

  const energy = energyModule(state.energy);

  const risk = riskModule(
    state.cyb,
    state.energy,
    state.fx
  );

  const scenario = scenarioEngine(
    state.event
  );

  // ==========================================================
  // 2. RUN AUTHORITATIVE GOLDEN RULE ENGINE
  // OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
  // ==========================================================

  const goldenRule = runGoldenRule(state);

  // ==========================================================
  // 3. RETURN UNIFIED CAPTAIN AI LENA OUTPUT
  // ==========================================================

  return {

    agent: "CAPTAIN AI LENA",

    fx,

    energy,

    risk,

    scenario,

    decision: goldenRule.decision,

    actionSequence: goldenRule.actionSequence,

    assessment: goldenRule.assessment,

    updatedState: goldenRule.updatedState,

    pipeline: goldenRule.pipeline,

    status: goldenRule.status

  };
}