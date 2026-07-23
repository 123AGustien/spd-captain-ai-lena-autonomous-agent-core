import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenarioEngine.js";

/**
 * ============================================================
 * SPD V13 — CAPTAIN AI LENA AUTONOMOUS AGENT CORE
 * ============================================================
 *
 * DATA → ALGORITHMS → COMPUTE
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic rule-based execution.
 * No machine learning.
 * No randomness.
 *
 * The backend decision engine is authoritative.
 * The cockpit only displays the resulting system state.
 * ============================================================
 */

export function captainAILena(state) {

  // ==========================================================
  // 1. SAFE INPUT NORMALIZATION
  // ==========================================================

  const safeState = {
    fx: Number(state?.fx ?? 0),
    energy: Number(state?.energy ?? 50),
    cyb: Number(state?.cyb ?? 50),
    inf: Number(state?.inf ?? 0),
    dc: Number(state?.dc ?? 0),
    event: state?.event ?? "NORMAL",
    mode: state?.mode ?? "AUTONOMOUS",
    time: state?.time ?? new Date().toISOString()
  };

  // ==========================================================
  // 2. OBSERVE
  // ==========================================================

  const observedState = {
    ...safeState
  };

  // ==========================================================
  // 3. ALGORITHM LAYER
  // ==========================================================

  const fx = fxModule(observedState.fx);

  const energy = energyModule(
    observedState.energy
  );

  const risk = riskModule(
    observedState.cyb,
    observedState.energy,
    observedState.fx
  );

  // ==========================================================
  // 4. SCENARIO ANALYSIS
  // ==========================================================

  const scenario = scenarioEngine(
    observedState.event
  );

  // ==========================================================
  // 5. VERIFIED CONTEXT
  // ==========================================================

  const context = {
    ...observedState,

    modules: {
      fx,
      energy,
      risk
    },

    scenario
  };

  // ==========================================================
  // 6. DECISION
  // ==========================================================

  const decision = decide(context);

  // ==========================================================
  // 7. ACTION
  // ==========================================================

  const action = executeAction(
    decision
  );

  // ==========================================================
  // 8. UPDATE
  // ==========================================================

  const updatedState = {
    ...observedState,
    decision,
    action
  };

  // ==========================================================
  // 9. AUTONOMOUS AGENT OUTPUT
  // ==========================================================

  return {

    timestamp: new Date().toISOString(),

    agent: "CAPTAIN AI LENA",

    mode: observedState.mode,

    loop: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ],

    input: observedState,

    modules: {
      fx,
      energy,
      risk
    },

    scenario,

    decision,

    action,

    systemState: {
      fx,
      energy,
      risk,
      scenarioType:
        scenario?.type ?? "NORMAL"
    },

    updatedState,

    status: "EXECUTED",

    engine: "SPD V13 DETERMINISTIC AUTONOMOUS AGENT CORE"

  };
}


/**
 * ============================================================
 * SPD V13 — DECISION CORE
 * ============================================================
 *
 * Priority order:
 *
 * 1. CRITICAL / HIGH RISK
 * 2. ENERGY PROTECTION
 * 3. FX STABILITY
 * 4. SCENARIO RESPONSE
 * 5. NORMAL OPERATION
 *
 * Higher-priority safety conditions always take precedence.
 * ============================================================
 */

function decide(state) {

  const {
    risk,
    energy,
    fx,
    scenario
  } = state;

  // ==========================================================
  // PRIORITY 1 — CRITICAL SAFETY OVERRIDE
  // ==========================================================

  if (
    risk === "CRITICAL" ||
    risk === "HIGH RISK"
  ) {
    return "ACTIVATE STABILIZATION MODE";
  }

  // ==========================================================
  // PRIORITY 2 — ENERGY PROTECTION
  // ==========================================================

  if (
    energy === "LOW ENERGY MODE" ||
    energy?.level === "LOW" ||
    energy?.status === "LOW ENERGY MODE" ||
    energy?.value < 30
  ) {
    return "REDUCE SYSTEM LOAD";
  }

  // ==========================================================
  // PRIORITY 3 — FX STABILITY
  // ==========================================================

  if (
    fx?.status === "UNSTABLE" ||
    (
      typeof fx === "string" &&
      fx.includes("STABILIZATION")
    )
  ) {
    return "FX CORRECTION ACTIVE";
  }

  // ==========================================================
  // PRIORITY 4 — SCENARIO RESPONSE
  // ==========================================================

  if (scenario?.type === "FX_SHOCK") {
    return "FX SHOCK RESPONSE ACTIVE";
  }

  if (scenario?.type === "ENERGY_CRISIS") {
    return "ENERGY RESERVE MODE ACTIVE";
  }

  if (scenario?.type === "CYBER_ATTACK") {
    return "CYBER DEFENSE MODE ACTIVE";
  }

  if (scenario?.type === "INFRA_FAILURE") {
    return "INFRASTRUCTURE RECOVERY MODE";
  }

  // ==========================================================
  // PRIORITY 5 — NORMAL OPERATION
  // ==========================================================

  return "SYSTEM STABLE";
}


/**
 * ============================================================
 * ACTION EXECUTION LAYER
 * ============================================================
 *
 * Converts the deterministic decision into an explicit
 * operational action state for the cockpit and audit layer.
 * ============================================================
 */

function executeAction(decision) {

  switch (decision) {

    case "ACTIVATE STABILIZATION MODE":
      return {
        mode: "STABILIZATION",
        command: "STABILIZE SYSTEM",
        status: "ACTIVE"
      };

    case "REDUCE SYSTEM LOAD":
      return {
        mode: "ENERGY PROTECTION",
        command: "REDUCE SYSTEM LOAD",
        status: "ACTIVE"
      };

    case "FX CORRECTION ACTIVE":
      return {
        mode: "FX CORRECTION",
        command: "ACTIVATE FX CORRECTION",
        status: "ACTIVE"
      };

    case "FX SHOCK RESPONSE ACTIVE":
      return {
        mode: "SCENARIO RESPONSE",
        command: "ACTIVATE FX SHOCK RESPONSE",
        status: "ACTIVE"
      };

    case "ENERGY RESERVE MODE ACTIVE":
      return {
        mode: "ENERGY RESERVE",
        command: "PRESERVE ENERGY RESERVES",
        status: "ACTIVE"
      };

    case "CYBER DEFENSE MODE ACTIVE":
      return {
        mode: "CYBER DEFENSE",
        command: "PROTECT SYSTEM INTEGRITY",
        status: "ACTIVE"
      };

    case "INFRASTRUCTURE RECOVERY MODE":
      return {
        mode: "INFRASTRUCTURE RECOVERY",
        command: "INITIATE RECOVERY RESPONSE",
        status: "ACTIVE"
      };

    default:
      return {
        mode: "NORMAL",
        command: "MONITOR SYSTEM",
        status: "STABLE"
      };
  }
}