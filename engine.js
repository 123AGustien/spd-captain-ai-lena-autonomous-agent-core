import { captainAILena } from "./captainAILena.js";
import { runGoldenRule } from "./goldenRuleEngine.js";

export function runEngine(state = {}) {

  // ============================================================
  // 1. INPUT NORMALIZATION
  // Preserve original system state.
  // No decision logic is applied here.
  // ============================================================

  const normalizedState = {
    fx: Number(state.fx ?? 0),
    energy: Number(state.energy ?? 100),
    cyb: Number(state.cyb ?? 0),
    inf: Number(state.inf ?? 0),
    dc: Number(state.dc ?? 0),
    event: state.event ?? "NORMAL",
    time: state.time ?? new Date().toISOString(),
    mode: state.mode ?? "AUTONOMOUS"
  };

  // ============================================================
  // 2. CAPTAIN AI LENA COMPUTE
  // Existing modular decision layer.
  // ============================================================

  const captainResult = captainAILena(normalizedState);

  // ============================================================
  // 3. SEXTANT GOLDEN RULE PIPELINE
  // OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
  // ============================================================

  const goldenRuleResult = runGoldenRule(normalizedState);

  // ============================================================
  // 4. UNIFIED SPD OUTPUT
  // ============================================================

  return {
    engine: "SPD v13 CAPTAIN AI LENA AUTONOMOUS AGENT CORE",

    timestamp: new Date().toISOString(),

    input: state,

    normalizedInput: normalizedState,

    captainAI: captainResult,

    goldenRule: goldenRuleResult,

    status: "EXECUTED"
  };
}