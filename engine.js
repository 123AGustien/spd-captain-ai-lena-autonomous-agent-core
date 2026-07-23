import { captainAILena } from "./captainAILena.js";
import { GOLDEN_RATIO } from "./constants/math.constants.js";

export function runEngine(state) {

  // =========================
  // SPD V13 EXECUTION ENGINE
  // =========================
  // DATA → ALGORITHMS → COMPUTE
  //
  // This layer is responsible for:
  // 1. Receiving system state
  // 2. Preserving original input for audit
  // 3. Applying deterministic normalization
  // 4. Passing normalized state to Captain AI Lena
  // 5. Returning a complete execution record
  //
  // The engine does not redefine decision rules.
  // Captain AI Lena remains the decision authority.
  // =========================

  // =========================
  // INPUT VALIDATION
  // =========================

  if (!state || typeof state !== "object") {
    throw new Error("SPD ENGINE ERROR: Invalid system state");
  }

  // =========================
  // SAFE NORMALIZATION LAYER
  // =========================
  // Normalization is transparent and deterministic.
  // Original input remains unchanged.
  // =========================

  const normalizedState = {
    ...state,
    energy: Number(state.energy ?? 0) / GOLDEN_RATIO,
    fx: Number(state.fx ?? 0) / GOLDEN_RATIO
  };

  // =========================
  // CORE COMPUTE EXECUTION
  // =========================

  const result = captainAILena(normalizedState);

  // =========================
  // EXECUTION RESPONSE
  // =========================

  return {
    timestamp: new Date().toISOString(),

    // Original client/system input
    input: state,

    // Normalized state used by compute layer
    normalizedInput: normalizedState,

    // Captain AI Lena decision output
    output: result,

    // Deterministic execution metadata
    constants: {
      GOLDEN_RATIO
    },

    // Execution status
    status: "EXECUTED"
  };
}