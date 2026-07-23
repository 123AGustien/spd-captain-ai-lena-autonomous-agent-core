/**
 * ============================================================
 * SPD v13.1 — VALIDATION CONTROLLER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Connects the SPD v13.1 Cockpit UI to the
 * SEXTANT Self-Test & Validation Engine.
 *
 * AUTHORITATIVE FLOW:
 *
 * COCKPIT UI
 *     ↓
 * VALIDATION CONTROLLER
 *     ↓
 * SELF-TEST & VALIDATION ENGINE
 *     ↓
 * GOLDEN RULE ENGINE
 *     ↓
 * RE-TEST VALIDATION
 *     ↓
 * VERIFY RECOVERY
 *     ↓
 * FINAL VALIDATION STATUS
 *     ↓
 * COCKPIT UI
 *
 * IMPORTANT:
 *
 * This controller does NOT replace or modify the
 * authoritative Golden Rule Engine.
 *
 * The Golden Rule Engine remains authoritative.
 *
 * The validation layer only validates the engine,
 * identifies validation faults, applies corrections
 * within the validation layer, and verifies recovery.
 *
 * ============================================================
 */

import {
  runSelfTest,
  identifyFaults,
  correctiveAction,
  applyCorrectiveAction,
  reTestValidation,
  verifyRecovery,
  runValidationLoop,
  getValidationState
} from "./selfTestValidationEngine.js";

// ============================================================
// CONTROLLER STATE
// ============================================================

let controllerState = {

  status:
    "READY",

  lastSelfTest:
    null,

  faultIdentification:
    null,

  correctiveDecision:
    null,

  correctiveApplication:
    null,

  retest:
    null,

  recoveryVerification:
    null,

  finalStatus:
    "NOT_EXECUTED"

};

// ============================================================
// INTERNAL STATE UPDATE
// ============================================================

function updateControllerState(

  selfTest,

  faultIdentification,

  corrective,

  correctiveApplication,

  retest,

  recoveryVerification,

  finalStatus

) {

  controllerState = {

    status:
      finalStatus,

    lastSelfTest:
      selfTest,

    faultIdentification,

    correctiveDecision:
      corrective,

    correctiveApplication,

    retest,

    recoveryVerification,

    finalStatus

  };

}

// ============================================================
// 1. RUN SELF-TEST ONLY
// ============================================================

export function executeSelfTest() {

  const selfTest =
    runSelfTest();

  const faultIdentification =
    identifyFaults(
      selfTest
    );

  const finalStatus =

    selfTest.overallStatus ===
      "PASS"

      ? "SELF_TEST_PASSED"

      : "SELF_TEST_FAILED";

  controllerState = {

    ...controllerState,

    status:
      finalStatus,

    lastSelfTest:
      selfTest,

    faultIdentification,

    finalStatus

  };

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

    status:
      finalStatus,

    selfTest,

    faultIdentification,

    /*
     * Re-test is intentionally not executed
     * by the self-test-only command.
     */

    retest:
      null,

    recoveryVerification:
      null,

    finalStatus,

    validationState:
      getValidationState(),

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 2. RUN SELF-TEST + CORRECTIVE ACTION
// ============================================================

export function executeSelfTestAndCorrect() {

  /*
   * The complete validation loop is authoritative
   * for the combined Self-Test + Corrective Action
   * cockpit control.
   *
   * This guarantees that the UI does not stop at:
   *
   * SELF-TEST PASSED
   *
   * and instead continues through:
   *
   * SELF-TEST
   * ↓
   * FAULT IDENTIFICATION
   * ↓
   * CAPTAIN AI LENA DECISION
   * ↓
   * CORRECTIVE ACTION
   * ↓
   * RE-TEST
   * ↓
   * VERIFY RECOVERY
   * ↓
   * FINAL STATUS
   */

  return executeFullValidationLoop();

}

// ============================================================
// 3. RUN COMPLETE AUTHORITATIVE VALIDATION LOOP
// ============================================================

export function executeFullValidationLoop() {

  /*
   * Execute the closed-loop validation engine.
   *
   * The Golden Rule Engine itself remains untouched.
   */

  const validationResult =
    runValidationLoop();

  /*
   * Normalize the complete result
   * for Cockpit UI consumption.
   */

  const selfTest =
    validationResult.selfTest ??
    null;

  const faultIdentification =
    validationResult.faultIdentification ??
    null;

  const corrective =
    validationResult.correctiveAction ??
    null;

  const correctiveApplication =
    validationResult.correctiveApplication ??
    null;

  const retest =
    validationResult.retest ??
    null;

  const recoveryVerification =
    validationResult.recoveryVerification ??
    null;

  /*
   * The validation engine's final status
   * is authoritative for the validation layer.
   */

  const finalStatus =

    validationResult.finalStatus ??
    "VALIDATION FAILED";

  // ----------------------------------------------------------
  // UPDATE CONTROLLER STATE
  // ----------------------------------------------------------

  updateControllerState(

    selfTest,

    faultIdentification,

    corrective,

    correctiveApplication,

    retest,

    recoveryVerification,

    finalStatus

  );

  // ----------------------------------------------------------
  // RETURN COMPLETE COCKPIT VALIDATION RECORD
  // ----------------------------------------------------------

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

    status:
      finalStatus,

    pipeline: [

      "SELF-TEST",

      "FAULT IDENTIFICATION",

      "CAPTAIN AI LENA DECISION",

      "APPLY CORRECTIVE ACTION",

      "RE-TEST VALIDATION",

      "VERIFY RECOVERY"

    ],

    selfTest,

    faultIdentification,

    correctiveAction:
      corrective,

    correctiveApplication,

    retest,

    recoveryVerification,

    finalStatus,

    /*
     * Explicit UI-friendly status fields.
     */

    uiStatus: {

      selfTest:

        selfTest?.overallStatus ===
          "PASS"

          ? "SELF-TEST PASSED"

          : "SELF-TEST FAILED",

      faultIdentification:

        faultIdentification?.faultCount ===
          0

          ? "NO_FAULTS"

          : "FAULTS_DETECTED",

      correctiveAction:

        correctiveApplication?.applied ===
          true

          ? "CORRECTIVE ACTION APPLIED"

          : "NO CORRECTIVE ACTION REQUIRED",

      reTest:

        retest?.overallStatus ===
          "PASS"

          ? "RE-TEST PASSED"

          : "RE-TEST FAILED",

      recovery:

        recoveryVerification?.recoveryVerified ===
          true

          ? "RECOVERY VERIFIED"

          : (

              selfTest?.overallStatus ===
                "PASS" &&

              retest?.overallStatus ===
                "PASS"

            )

              ? "VALIDATION VERIFIED"

              : "RECOVERY NOT VERIFIED",

      final:

        finalStatus

    },

    validationState:
      getValidationState(),

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 4. GET CURRENT VALIDATION STATUS
// ============================================================

export function getControllerState() {

  return {

    ...controllerState,

    validationState:
      getValidationState()

  };

}

// ============================================================
// 5. RESET CONTROLLER DISPLAY STATE
// ============================================================

export function resetValidationController() {

  controllerState = {

    status:
      "READY",

    lastSelfTest:
      null,

    faultIdentification:
      null,

    correctiveDecision:
      null,

    correctiveApplication:
      null,

    retest:
      null,

    recoveryVerification:
      null,

    finalStatus:
      "NOT_EXECUTED"

  };

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

    status:
      "READY",

    finalStatus:
      "NOT_EXECUTED",

    message:
      "Validation controller reset. Awaiting validation execution.",

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// DEFAULT CONTROLLER API
// ============================================================

export default {

  executeSelfTest,

  executeSelfTestAndCorrect,

  executeFullValidationLoop,

  getControllerState,

  resetValidationController

};