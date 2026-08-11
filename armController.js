/**
 * SPD v13.1 — ARM Controller
 *
 * ARM interface controller.
 *
 * IMPORTANT:
 * - Does NOT redefine Captain AI Lena decision logic.
 * - Does NOT modify Golden Rule logic.
 * - Does NOT modify GOLDEN_RATIO.
 * - Uses the existing engine as the authoritative execution core.
 */

import { runEngine } from "./engine.js";

let systemTestPassed = false;
let systemArmed = false;


/**
 * RUN SYSTEM TEST
 *
 * Verifies that the existing engine responds with
 * the expected deterministic structure.
 */
export function runSystemTest() {

  systemTestPassed = false;

  const testState = {
    fx: 10,
    energy: 50,
    cyb: 50,
    inf: 0,
    dc: 0,
    event: "NORMAL",
    mode: "TEST"
  };

  try {

    const result = runEngine(testState);

    const passed =
      result &&
      result.status === "EXECUTED" &&
      result.output &&
      result.output.assessment &&
      result.output.decision &&
      result.output.status === "COMPLETE";

    systemTestPassed = Boolean(passed);

    return {
      test: "SYSTEM_TEST",
      status: systemTestPassed ? "PASS" : "FAIL",
      result
    };

  } catch (error) {

    return {
      test: "SYSTEM_TEST",
      status: "FAIL",
      error: error.message
    };
  }
}


/**
 * RUN TEST
 *
 * Executes a deterministic test through the
 * existing Captain AI Lena engine.
 */
export function runTest() {

  const state = {
    fx: 10,
    energy: 50,
    cyb: 50,
    inf: 0,
    dc: 0,
    event: "NORMAL",
    mode: "TEST"
  };

  try {

    const result = runEngine(state);

    return {
      test: "ENGINE_TEST",
      status: "COMPLETE",
      result
    };

  } catch (error) {

    return {
      test: "ENGINE_TEST",
      status: "FAIL",
      error: error.message
    };
  }
}


/**
 * ARM SYSTEM
 *
 * ARM is permitted only after a successful
 * system test.
 */
export function armSystem() {

  if (!systemTestPassed) {

    return {
      status: "BLOCKED",
      reason: "SYSTEM TEST REQUIRED"
    };
  }

  systemArmed = true;

  return {
    status: "ARMED",
    authorization: "AUTHORIZED"
  };
}


/**
 * DISARM SYSTEM
 */
export function disarmSystem() {

  systemArmed = false;

  return {
    status: "DISARMED",
    authorization: "BLOCKED"
  };
}


/**
 * Current ARM state.
 */
export function getArmStatus() {

  return {
    systemTestPassed,
    systemArmed,
    execution: systemArmed
      ? "ARMED"
      : "BLOCKED"
  };
}