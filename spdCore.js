/**
 * SPD v13 — CORE ORCHESTRATOR
 * ---------------------------
 * Authoritative execution coordinator.
 *
 * Architecture:
 * DATA → ALGORITHMS → COMPUTE
 *
 * Flow:
 * Client Input
 *     ↓
 * Backend Processing
 *     ↓
 * Decision Engine
 *     ↓
 * System Output
 *     ↓
 * Frontend Display
 *
 * This module coordinates the SPD algorithm modules.
 * It does not redefine their internal decision logic.
 */

import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

/**
 * Run the SPD Core computation pipeline.
 *
 * @param {Object} state - Structured system state.
 * @returns {Object} Deterministic SPD computation result.
 */
export function runSPDCore(state = {}) {

  const normalizedState = {
    fx: Number(state.fx ?? 0),
    energy: Number(state.energy ?? 100),
    cyb: Number(state.cyb ?? 0),
    inf: Number(state.inf ?? 0),
    dc: Number(state.dc ?? 0),
    event: state.event ?? "NORMAL",
    time: state.time ?? new Date().toISOString(),
    mode: state.mode ?? "AUTONOMOUS"
  };

  // ==========================================================
  // ALGORITHM LAYER
  // ==========================================================

  const fx = fxModule(normalizedState.fx);

  const energy = energyModule(
    normalizedState.energy
  );

  const risk = riskModule(
    normalizedState.cyb,
    normalizedState.energy,
    normalizedState.fx
  );

  const scenario = scenarioEngine(
    normalizedState.event
  );

  // ==========================================================
  // COMPUTE / DECISION LAYER
  // ==========================================================

  const decision = captainDecision(
    fx,
    energy,
    risk,
    scenario
  );

  // ==========================================================
  // SYSTEM OUTPUT
  // ==========================================================

  return {
    input: normalizedState,

    algorithms: {
      fx,
      energy,
      risk,
      scenario
    },

    decision,

    pipeline: [
      "DATA",
      "ALGORITHMS",
      "COMPUTE",
      "OUTPUT"
    ],

    timestamp: new Date().toISOString()
  };
}

/**
 * Deterministic Captain AI Lena decision priority.
 *
 * Priority:
 * 1. High systemic risk
 * 2. Low energy
 * 3. FX instability
 * 4. Scenario correction
 * 5. Stable operation
 */
function captainDecision(
  fx,
  energy,
  risk,
  scenario
) {

  if (risk === "HIGH RISK") {
    return {
      status: "HIGH RISK",
      decision: "ACTIVATE STABILIZATION MODE",
      action: "REDUCE SYSTEM EXPOSURE AND APPLY MITIGATION"
    };
  }

  if (energy === "LOW ENERGY MODE") {
    return {
      status: "ENERGY WARNING",
      decision: "ENERGY PROTECTION MODE",
      action: "REDUCE SYSTEM LOAD"
    };
  }

  if (
    typeof fx === "string" &&
    fx.includes("STABILIZATION")
  ) {
    return {
      status: "FX WARNING",
      decision: "FX CORRECTION ACTIVE",
      action: "REDUCE FX EXPOSURE AND MONITOR LIQUIDITY"
    };
  }

  if (
    scenario === "activate correction path"
  ) {
    return {
      status: "SCENARIO RESPONSE",
      decision: "SCENARIO RESPONSE ACTIVE",
      action: "APPLY SCENARIO MITIGATION"
    };
  }

  return {
    status: "STABLE",
    decision: "SYSTEM STABLE",
    action: "NORMAL OPERATIONS CONTINUE"
  };
}
