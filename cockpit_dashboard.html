import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

export function captainAILena(state) {
  const fx = fxModule(state.fx);
  const energy = energyModule(state.energy);
  const risk = riskModule(state.cyb, state.energy, state.fx);

  return {
    fx,
    energy,
    risk,
    scenario: scenarioEngine(state.event),
    decision: decide(risk, energy, fx)
  };
}

function decide(risk, energy, fx) {
  if (risk === "HIGH RISK") return "ACTIVATE STABILIZATION MODE";
  if (energy === "LOW ENERGY MODE") return "REDUCE SYSTEM LOAD";
  if (fx.includes("STABILIZATION")) return "FX CORRECTION ACTIVE";
  return "SYSTEM STABLE";
}
