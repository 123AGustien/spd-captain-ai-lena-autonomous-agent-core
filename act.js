import { state } from "../state.js";

export function ACT(decision) {
  state.lastDecision = decision;

  switch (decision) {
    case "IDLE":
      state.risk = "LOW";
      state.mode = "IDLE";
      break;

    case "LOW_ACTION":
      state.ENERGY += 1;
      state.risk = "LOW";
      state.mode = "MONITOR";
      break;

    case "MEDIUM_ACTION":
      state.FX += 1;
      state.ENERGY += 1;
      state.risk = "MEDIUM";
      state.mode = "ADJUST";
      break;

    case "HIGH_ACTION":
      state.CYB += 1;
      state.INF += 1;
      state.risk = "HIGH";
      state.mode = "INTERVENTION";
      break;
  }
}