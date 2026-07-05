import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

/**
 * CAPTAIN AI LENA CORE ENGINE (ALIGNED VERSION)
 * Deterministic Observe → Decide → Act model
 */
export function captainAILena(state) {

  // =========================
  // 1. SAFE INPUT NORMALIZATION
  // =========================
  const safeState = {
    fx: state?.fx ?? 0,
    energy: state?.energy ?? 50,
    cyb: state?.cyb ?? 50,
    event: state?.event ?? "NORMAL",
    dc: state?.dc ?? 0,
    inf: state?.inf ?? 0
  };

  // =========================
  // 2. MODULE LAYER
  // =========================
  const fx = fxModule(safeState.fx);
  const energy = energyModule(safeState.energy);
  const risk = riskModule(
    safeState.cyb,
    safeState.energy,
    safeState.fx
  );

  // =========================
  // 3. SCENARIO ENGINE
  // =========================
  const scenario = scenarioEngine(safeState.event);

  // =========================
  // 4. ENRICHED STATE
  // =========================
  const context = {
    ...safeState,
    fx,
    energy,
    risk,
    scenario
  };

  // =========================
  // 5. DECISION ENGINE
  // =========================
  const decision = decide(context);

  // =========================
  // 6. OUTPUT PACKAGE (COCKPIT READY)
  // =========================
  return {
    timestamp: new Date().toISOString(),
    input: safeState,

    modules: {
      fx,
      energy,
      risk
    },

    scenario,

    decision,

    systemState: {
      fx,
      energy,
      risk,
      scenarioType: scenario?.type || "NORMAL"
    },

    status: "EXECUTED"
  };
}

/**
 * DECISION CORE (PURE RULE ENGINE)
 */
function decide(state) {

  const { risk, energy, fx, scenario } = state;

  // =========================
  // 1. CRITICAL SAFETY OVERRIDE
  // =========================
  if (risk === "CRITICAL" || risk === "HIGH RISK") {
    return "ACTIVATE STABILIZATION MODE";
  }

  // =========================
  // 2. ENERGY PROTECTION LAYER
  // =========================
  if (
    energy?.level === "LOW" ||
    energy?.value < 30 ||
    energy?.status === "LOW ENERGY MODE"
  ) {
    return "REDUCE SYSTEM LOAD";
  }

  // =========================
  // 3. FX STABILITY LAYER
  // =========================
  if (fx?.status === "UNSTABLE") {
    return "FX CORRECTION ACTIVE";
  }

  // =========================
  // 4. SCENARIO OVERRIDE LAYER
  // =========================
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

  // =========================
  // 5. DEFAULT STATE
  // =========================
  return "SYSTEM STABLE";
}
