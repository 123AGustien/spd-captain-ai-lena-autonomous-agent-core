import { captainAILena } from "./captainAILena.js";
import { GOLDEN_RATIO } from "./constants/math.constants.js";

export function runEngine(state) {
  
  // =========================
  // SAFE NORMALIZATION LAYER
  // (Does NOT modify rules or decision logic)
  // =========================

  const normalizedState = {
    ...state,
    energy: state.energy / GOLDEN_RATIO,
    fx: state.fx / GOLDEN_RATIO
  };

  // =========================
  // CORE EXECUTION ENGINE
  // =========================

  const result = captainAILena(normalizedState);

  // =========================
  // RESPONSE WRAPPER LAYER
  // =========================

  return {
    timestamp: new Date().toISOString(),

    // original input (unchanged for audit)
    input: state,

    // transformed input (for transparency/debugging)
    normalizedInput: normalizedState,

    // system output
    output: result,

    // execution metadata
    constants: {
      GOLDEN_RATIO
    },

    status: "EXECUTED"
  };
}
