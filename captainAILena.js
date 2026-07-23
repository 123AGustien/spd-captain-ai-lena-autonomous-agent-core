import {
  fxModule
} from "./fx.js";

import {
  energyModule
} from "./energy.js";

import {
  riskModule
} from "./risk.js";

import {
  scenarioEngine
} from "./scenarioEngine.js";

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
 * Backend decision engine is authoritative.
 * Frontend cockpit only displays system output.
 * ============================================================
 */

export function captainAILena(state = {}) {

  // ==========================================================
  // 1. OBSERVE
  // ==========================================================

  const observedState = normalizeState(state);

  // ==========================================================
  // 2. VERIFY
  // ==========================================================

  const verifiedState = verifyState(observedState);

  // ==========================================================
  // 3. ASSESS — ALGORITHM LAYER
  // ==========================================================

  const fx = fxModule(verifiedState.fx);

  const energy = energyModule(
    verifiedState.energy
  );

  const risk = riskModule(
    verifiedState.cyb,
    verifiedState.energy,
    verifiedState.fx
  );

  const scenario = scenarioEngine(
    verifiedState.event
  );

  // ==========================================================
  // 4. ASSESSMENT CONTEXT
  // ==========================================================

  const context = {

    ...verifiedState,

    modules: {
      fx,
      energy,
      risk
    },

    scenario

  };

  // ==========================================================
  // 5. DECIDE
  // ==========================================================

  const decision = decide(context);

  // ==========================================================
  // 6. ACT
  // ==========================================================

  const action = executeAction(
    decision
  );

  // ==========================================================
  // 7. UPDATE
  // ==========================================================

  const updatedState = {

    ...verifiedState,

    decision,

    action

  };

  // ==========================================================
  // 8. AUTONOMOUS AGENT OUTPUT
  // ==========================================================

  return {

    timestamp:
      new Date().toISOString(),

    agent:
      "CAPTAIN AI LENA",

    engine:
      "SPD V13 DETERMINISTIC AUTONOMOUS AGENT CORE",

    mode:
      verifiedState.mode,

    loop: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ],

    input:
      verifiedState,

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

    status:
      "EXECUTED"

  };

}


/**
 * ============================================================
 * INPUT NORMALIZATION
 * ============================================================
 */

function normalizeState(state) {

  return {

    fx:
      Number(state?.fx ?? 0),

    energy:
      Number(state?.energy ?? 50),

    cyb:
      Number(state?.cyb ?? 50),

    inf:
      Number(state?.inf ?? 0),

    dc:
      Number(state?.dc ?? 0),

    event:
      state?.event ?? "NORMAL",

    mode:
      state?.mode ?? "AUTONOMOUS",

    time:
      state?.time ??
      new Date().toISOString()

  };

}


/**
 * ============================================================
 * VERIFY
 * ============================================================
 *
 * Ensures the state entering the decision engine is valid.
 * Does not alter decision rules.
 * ============================================================
 */

function verifyState(state) {

  return {

    ...state,

    fx:
      Number.isFinite(state.fx)
        ? state.fx
        : 0,

    energy:
      Number.isFinite(state.energy)
        ? state.energy
        : 50,

    cyb:
      Number.isFinite(state.cyb)
        ? state.cyb
        : 50,

    inf:
      Number.isFinite(state.inf)
        ? state.inf
        : 0,

    dc:
      Number.isFinite(state.dc)
        ? state.dc
        : 0

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

  if (
    scenario?.type === "FX_SHOCK"
  ) {

    return "FX SHOCK RESPONSE ACTIVE";

  }


  if (
    scenario?.type === "ENERGY_CRISIS"
  ) {

    return "ENERGY RESERVE MODE ACTIVE";

  }


  if (
    scenario?.type === "CYBER_ATTACK"
  ) {

    return "CYBER DEFENSE MODE ACTIVE";

  }


  if (
    scenario?.type === "INFRA_FAILURE"
  ) {

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
 * operational action state for cockpit and audit layers.
 * ============================================================
 */

function executeAction(decision) {

  switch (decision) {

    case "ACTIVATE STABILIZATION MODE":

      return {

        mode:
          "STABILIZATION",

        command:
          "STABILIZE SYSTEM",

        status:
          "ACTIVE"

      };


    case "REDUCE SYSTEM LOAD":

      return {

        mode:
          "ENERGY PROTECTION",

        command:
          "REDUCE SYSTEM LOAD",

        status:
          "ACTIVE"

      };


    case "FX CORRECTION ACTIVE":

      return {

        mode:
          "FX CORRECTION",

        command:
          "ACTIVATE FX CORRECTION",

        status:
          "ACTIVE"

      };


    case "FX SHOCK RESPONSE ACTIVE":

      return {

        mode:
          "SCENARIO RESPONSE",

        command:
          "ACTIVATE FX SHOCK RESPONSE",

        status:
          "ACTIVE"

      };


    case "ENERGY RESERVE MODE ACTIVE":

      return {

        mode:
          "ENERGY RESERVE",

        command:
          "PRESERVE ENERGY RESERVES",

        status:
          "ACTIVE"

      };


    case "CYBER DEFENSE MODE ACTIVE":

      return {

        mode:
          "CYBER DEFENSE",

        command:
          "PROTECT SYSTEM INTEGRITY",

        status:
          "ACTIVE"

      };


    case "INFRASTRUCTURE RECOVERY MODE":

      return {

        mode:
          "INFRASTRUCTURE RECOVERY",

        command:
          "INITIATE RECOVERY RESPONSE",

        status:
          "ACTIVE"

      };


    default:

      return {

        mode:
          "NORMAL",

        command:
          "MONITOR SYSTEM",

        status:
          "STABLE"

      };

  }

}