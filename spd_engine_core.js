import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

export function runSPDCore(state) {

  const fx = fxModule(state.fx);
  const energy = energyModule(state.energy);
  const risk = riskModule(state.cyb, state.energy, state.fx);
  const scenario = scenarioEngine(state.event);

  const decision = captainDecision(fx, energy, risk, scenario);

  return {
    input: state,
    fx,
    energy,
    risk,
    scenario,
    decision,
    timestamp: new
 Date().toISOString()
  };
}

function captainDecision(fx, energy, risk, scenario) {

  if (risk === "HIGH RISK") {
    return "ACTIVATE STABILIZATION MODE";
  }

  if (energy === "LOW ENERGY MODE") {
    return "REDUCE SYSTEM LOAD";
  }

  if (fx.includes("STABILIZATION")) {
    return "FX CORRECTION ACTIVE";
  }

  if (scenario === "activate correction path") {
    return "SCENARIO RESPONSE ACTIVE";
  }

  return "SYSTEM STABLE";
}