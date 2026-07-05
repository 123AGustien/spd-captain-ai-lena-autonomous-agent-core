import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

/**
 * CAPTAIN AI LENA CORE ENGINE
 * Deterministic rule-based decision system
 */
export function captainAILena(state) {
  // =========================
  // 1. SAFE INPUT NORMALIZATION
  // =========================
  const safeState = {
    fx: state?.fx ?? 0,
    energy: state?.energy ?? 50,
    cyb: state?.cyb ?? 50,
    event: state?.event ?? "NORMAL"
  };

  // =========================
  // 2. MODULE PROCESSING LAYER
  // =========================
  const fx = fxModule(safeState.fx);
  const energy = energyModule(safeState.energy);
  const risk = riskModule(safeState.cyb, safeState.energy, safeState.fx);

  // =========================
  // 3. SCENARIO ENGINE LAYER
  // =========================
  const scenario = scenarioEngine(safeState.event);

  // =========================
  // 4. ENRICHED STATE (SYSTEM VIEW)
  // =========================
  const enrichedState = {
    ...safeState,
    fx,
    energy,
    risk,
    scenario
  };

  // =========================
  // 5. DECISION ENGINE
  // =========================
  const decision = decide(enrichedState);

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
    status: "EXECUTED"
  };
}

/**
 * DECISION CORE (RULE-BASED ONLY)
 */
function decide(state) {
  const { risk, energy, fx } = state;

  // HIGH PRIORITY SAFETY RULE
  if (risk === "HIGH RISK") {
    return "ACTIVATE STABILIZATION MODE";
  }

  // ENERGY PROTECTION RULE
  if (energy === "LOW ENERGY MODE" || energy < 30) {
    return "REDUCE SYSTEM LOAD";
  }

  // FX STABILITY RULE
  if (typeof fx === "string" && fx.includes("STABILIZATION")) {
    return "FX CORRECTION ACTIVE";
  }

  // SCENARIO-DRIVEN OVERRIDE (optional extension point)
  if (state.scenario === "FX_SHOCK") {
    return "FX SHOCK RESPONSE ACTIVE";
  }

  if (state.scenario === "ENERGY_CRISIS") {
    return "ENERGY RESERVE MODE ACTIVE";
  }

  // DEFAULT STATE
  return "SYSTEM STABLE";
}