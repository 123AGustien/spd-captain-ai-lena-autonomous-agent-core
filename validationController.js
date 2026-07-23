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
 * ARCHITECTURE:
 *
 * COCKPIT UI
 *     ↓
 * VALIDATION CONTROLLER
 *     ↓
 * SELF-TEST & VALIDATION ENGINE
 *     ↓
 * GOLDEN RULE ENGINE
 *     ↓
 * VALIDATION RESULT
 *     ↓
 * COCKPIT UI
 *
 * IMPORTANT:
 *
 * This controller does NOT replace or modify the
 * authoritative Golden Rule Engine.
 *
 * The validation engine remains responsible for:
 *
 * SELF-TEST
 * FAULT IDENTIFICATION
 * CAPTAIN AI LENA DECISION
 * APPLY CORRECTIVE ACTION
 * RE-TEST VALIDATION
 * VERIFY RECOVERY
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
// 1. RUN SELF-TEST
// ============================================================

export function executeSelfTest() {

  const selfTest =
    runSelfTest();

  const faultIdentification =
    identifyFaults(
      selfTest
    );

  controllerState = {

    ...controllerState,

    status:
      selfTest.overallStatus === "PASS"
        ? "SELF_TEST_PASSED"
        : "SELF_TEST_FAILED",

    lastSelfTest:
      selfTest,

    faultIdentification,

    finalStatus:
      selfTest.overallStatus === "PASS"
        ? "SELF_TEST_PASSED"
        : "SELF_TEST_FAILED"

  };

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

    status:
      controllerState.status,

    selfTest,

    faultIdentification,

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

  // ----------------------------------------------------------
  // STEP 1 — INITIAL SELF-TEST
  // ----------------------------------------------------------

  const selfTest =
    runSelfTest();

  // ----------------------------------------------------------
  // STEP 2 — IDENTIFY FAULTS
  // ----------------------------------------------------------

  const faultIdentification =
    identifyFaults(
      selfTest
    );

  // ----------------------------------------------------------
  // STEP 3 — CAPTAIN AI LENA DECISION
  // ----------------------------------------------------------

  const corrective =
    correctiveAction(

      selfTest,

      faultIdentification

    );

  // ----------------------------------------------------------
  // STEP 4 — APPLY CORRECTIVE ACTION
  // ----------------------------------------------------------

  const correctiveApplication =
    applyCorrectiveAction(

      selfTest,

      faultIdentification,

      corrective

    );

  // ----------------------------------------------------------
  // STEP 5 — RE-TEST
  // ----------------------------------------------------------

  const retest =
    reTestValidation();

  // ----------------------------------------------------------
  // STEP 6 — VERIFY RECOVERY
  // ----------------------------------------------------------

  const recoveryVerification =
    verifyRecovery(

      selfTest,

      faultIdentification,

      corrective,

      correctiveApplication,

      retest

    );

  // ----------------------------------------------------------
  // FINAL STATUS
  // ----------------------------------------------------------

  let finalStatus;

  /*
   * A clean initial self-test followed by
   * a successful re-test confirms validation.
   */

  if (

    selfTest.overallStatus ===
      "PASS" &&

    retest.overallStatus ===
      "PASS"

  ) {

    finalStatus =
      "VALIDATION COMPLETE";

  }

  /*
   * A failed initial test that is corrected
   * and successfully re-tested confirms recovery.
   */

  else if (

    recoveryVerification.recoveryVerified ===
      true

  ) {

    finalStatus =
      "VALIDATION COMPLETE";

  }

  else {

    finalStatus =
      "VALIDATION FAILED";

  }

  // ----------------------------------------------------------
  // UPDATE CONTROLLER STATE
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // RETURN COMPLETE RESULT
  // ----------------------------------------------------------

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

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

    validationState:
      getValidationState(),

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 3. RUN COMPLETE AUTHORITATIVE VALIDATION LOOP
// ============================================================

export function executeFullValidationLoop() {

  /*
   * Use the validation engine's authoritative
   * closed-loop execution.
   */

  const validationResult =
    runValidationLoop();

  /*
   * Normalize the result for the Cockpit UI.
   */

  controllerState = {

    status:
      validationResult.finalStatus,

    lastSelfTest:
      validationResult.selfTest,

    faultIdentification:
      validationResult.faultIdentification,

    correctiveDecision:
      validationResult.correctiveAction,

    correctiveApplication:
      validationResult.correctiveApplication,

    retest:
      validationResult.retest,

    recoveryVerification:
      validationResult.recoveryVerification,

    finalStatus:
      validationResult.finalStatus

  };

  return {

    controller:
      "SPD v13.1 VALIDATION CONTROLLER",

    ...validationResult,

    validationState:
      getValidationState()

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