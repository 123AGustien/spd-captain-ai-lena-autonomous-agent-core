// =========================
// 🧠 CAPTAIN AI LENA — SINGLE FILE ENGINE
// =========================

// -------------------------
// CONSTANTS
// -------------------------
const GOLDEN_RATIO = 1.61803398875;

// -------------------------
// CORE AI FUNCTION
// -------------------------
function captainAILena(state) {
  const score = state.energy + state.fx;

  if (score === 0) {
    return { mode: "IDLE", risk: "LOW" };
  }

  if (score < 2) {
    return { mode: "MONITOR", risk: "LOW" };
  }

  if (score < 5) {
    return { mode: "ADJUST", risk: "MEDIUM" };
  }

  return { mode: "INTERVENTION", risk: "HIGH" };
}

// -------------------------
// ENGINE FUNCTION
// -------------------------
export function runEngine(state) {

  // SAFE NORMALIZATION LAYER
  const normalizedState = {
    ...state,
    energy: state.energy / GOLDEN_RATIO,
    fx: state.fx / GOLDEN_RATIO
  };

  // CORE EXECUTION
  const result = captainAILena(normalizedState);

  // RESPONSE WRAPPER
  return {
    timestamp: new Date().toISOString(),

    input: state,

    normalizedInput: normalizedState,

    output: result,

    constants: {
      GOLDEN_RATIO
    },

    status: "EXECUTED"
  };
}