/**
 * ============================================================
 * SPD v13.1 — VALIDATION UI CONTROLLER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Connects the SPD v13.1 Cockpit validation controls
 * to the Validation Controller.
 *
 * FLOW:
 *
 * USER ACTION
 *     ↓
 * VALIDATION UI
 *     ↓
 * VALIDATION CONTROLLER
 *     ↓
 * SELF-TEST VALIDATION ENGINE
 *     ↓
 * GOLDEN RULE ENGINE
 *     ↓
 * RE-TEST
 *     ↓
 * VERIFY RECOVERY
 *     ↓
 * FINAL VALIDATION STATUS
 *     ↓
 * COCKPIT DISPLAY
 *
 * IMPORTANT:
 *
 * This module does NOT modify the authoritative
 * Golden Rule Engine.
 *
 * ============================================================
 */

import {
  executeSelfTest,
  executeSelfTestAndCorrect,
  executeFullValidationLoop,
  resetValidationController
} from "./core/validationController.js";

// ============================================================
// UI ELEMENT HELPERS
// ============================================================

function findElement(...ids) {

  for (const id of ids) {

    const element =
      document.getElementById(id);

    if (element) {

      return element;

    }

  }

  return null;

}

// ============================================================
// DISPLAY JSON SAFELY
// ============================================================

function displayResult(

  element,

  data

) {

  if (!element) {

    return;

  }

  if (

    typeof data ===
    "string"

  ) {

    element.textContent =
      data;

    return;

  }

  element.textContent =
    JSON.stringify(

      data,

      null,

      2

    );

}

// ============================================================
// UPDATE VALIDATION DISPLAY
// ============================================================

function updateValidationDisplay(

  result

) {

  if (!result) {

    return;

  }

  const selfTest =
    result.selfTest ??
    null;

  const faults =
    result.faultIdentification ??
    null;

  const corrective =
    result.correctiveApplication ??
    null;

  const retest =
    result.retest ??
    null;

  const recovery =
    result.recoveryVerification ??
    null;

  const finalStatus =
    result.finalStatus ??
    "VALIDATION FAILED";

  // ----------------------------------------------------------
  // SYSTEM STATUS
  // ----------------------------------------------------------

  const systemStatus =
    findElement(

      "system-status",

      "systemStatus",

      "status"

    );

  if (systemStatus) {

    systemStatus.textContent =
      finalStatus;

  }

  // ----------------------------------------------------------
  // SELF-TEST
  // ----------------------------------------------------------

  const selfTestDisplay =
    findElement(

      "self-test-result",

      "selfTestResult",

      "selfTest",

      "self-test"

    );

  if (selfTestDisplay) {

    if (

      selfTest?.overallStatus ===
      "PASS"

    ) {

      displayResult(

        selfTestDisplay,

        selfTest

      );

    }

    else {

      displayResult(

        selfTestDisplay,

        selfTest ??

        "Self-test not executed."

      );

    }

  }

  // ----------------------------------------------------------
  // SELF-TEST INTERPRETATION
  // ----------------------------------------------------------

  const interpretation =
    findElement(

      "self-test-interpretation",

      "selfTestInterpretation"

    );

  if (interpretation) {

    interpretation.textContent =

      selfTest?.overallStatus ===
      "PASS"

        ? "SELF-TEST PASSED. The authoritative Golden Rule Engine passed all configured validation tests."

        : "SELF-TEST FAILED. Validation faults require assessment.";

  }

  // ----------------------------------------------------------
  // FAULT IDENTIFICATION
  // ----------------------------------------------------------

  const faultDisplay =
    findElement(

      "fault-identification",

      "faultIdentification",

      "faults"

    );

  if (faultDisplay) {

    if (

      faults?.faultCount ===
      0

    ) {

      displayResult(

        faultDisplay,

        {

          faultCount:
            0,

          status:
            "NO_FAULTS"

        }

      );

    }

    else {

      displayResult(

        faultDisplay,

        faults ??

        "No fault assessment available."

      );

    }

  }

  // ----------------------------------------------------------
  // CORRECTIVE ACTION
  // ----------------------------------------------------------

  const correctiveDisplay =
    findElement(

      "corrective-action",

      "correctiveAction",

      "captain-ai-corrective-action"

    );

  if (correctiveDisplay) {

    if (

      corrective?.applied ===
      true

    ) {

      displayResult(

        correctiveDisplay,

        corrective

      );

    }

    else {

      correctiveDisplay.textContent =
        "NO CORRECTIVE ACTION REQUIRED. SYSTEM VALIDATION PASSED.";

    }

  }

  // ----------------------------------------------------------
  // RE-TEST VALIDATION
  // ----------------------------------------------------------

  const retestDisplay =
    findElement(

      "retest-validation",

      "retestValidation",

      "retest"

    );

  if (retestDisplay) {

    if (

      retest?.overallStatus ===
      "PASS"

    ) {

      displayResult(

        retestDisplay,

        retest

      );

    }

    else {

      retestDisplay.textContent =

        retest

          ? JSON.stringify(

              retest,

              null,

              2

            )

          : "Re-test not executed.";

    }

  }

  // ----------------------------------------------------------
  // RECOVERY VERIFICATION
  // ----------------------------------------------------------

  const recoveryDisplay =
    findElement(

      "recovery-verification",

      "recoveryVerification",

      "recovery"

    );

  if (recoveryDisplay) {

    if (

      recovery?.recoveryVerified ===
      true

    ) {

      recoveryDisplay.textContent =
        "RECOVERY VERIFIED";

    }

    else if (

      selfTest?.overallStatus ===
        "PASS" &&

      retest?.overallStatus ===
        "PASS"

    ) {

      recoveryDisplay.textContent =
        "VALIDATION VERIFIED";

    }

    else {

      recoveryDisplay.textContent =
        "RECOVERY NOT VERIFIED";

    }

  }

  // ----------------------------------------------------------
  // FINAL VALIDATION STATUS
  // ----------------------------------------------------------

  const finalDisplay =
    findElement(

      "final-validation-status",

      "finalValidationStatus",

      "validation-status"

    );

  if (finalDisplay) {

    finalDisplay.textContent =
      finalStatus;

  }

}

// ============================================================
// RUN SELF-TEST
// ============================================================

export function runSelfTestFromUI() {

  try {

    const result =
      executeSelfTest();

    updateValidationDisplay(
      result
    );

    return result;

  }

  catch (error) {

    const failure = {

      finalStatus:
        "VALIDATION FAILED",

      error:
        error.message

    };

    updateValidationDisplay(
      failure
    );

    console.error(

      "SPD v13.1 Self-Test Error:",

      error

    );

    return failure;

  }

}

// ============================================================
// RUN SELF-TEST + CORRECTIVE ACTION
// ============================================================

export function runSelfTestAndCorrectFromUI() {

  try {

    /*
     * This executes the complete closed-loop
     * validation sequence.
     */

    const result =
      executeSelfTestAndCorrect();

    updateValidationDisplay(
      result
    );

    return result;

  }

  catch (error) {

    const failure = {

      finalStatus:
        "VALIDATION FAILED",

      error:
        error.message

    };

    updateValidationDisplay(
      failure
    );

    console.error(

      "SPD v13.1 Corrective Validation Error:",

      error

    );

    return failure;

  }

}

// ============================================================
// RUN FULL VALIDATION LOOP
// ============================================================

export function runFullValidationFromUI() {

  try {

    const result =
      executeFullValidationLoop();

    updateValidationDisplay(
      result
    );

    return result;

  }

  catch (error) {

    const failure = {

      finalStatus:
        "VALIDATION FAILED",

      error:
        error.message

    };

    updateValidationDisplay(
      failure
    );

    console.error(

      "SPD v13.1 Full Validation Error:",

      error

    );

    return failure;

  }

}

// ============================================================
// RESET VALIDATION UI
// ============================================================

export function resetValidationUI() {

  const result =
    resetValidationController();

  const systemStatus =
    findElement(

      "system-status",

      "systemStatus",

      "status"

    );

  if (systemStatus) {

    systemStatus.textContent =
      "READY";

  }

  const finalDisplay =
    findElement(

      "final-validation-status",

      "finalValidationStatus",

      "validation-status"

    );

  if (finalDisplay) {

    finalDisplay.textContent =
      "NOT_EXECUTED";

  }

  return result;

}

// ============================================================
// AUTOMATIC BUTTON CONNECTION
// ============================================================

function connectValidationControls() {

  const selfTestButton =
    findElement(

      "run-self-test",

      "runSelfTest",

      "self-test-button"

    );

  const correctiveButton =
    findElement(

      "run-self-test-corrective",

      "runSelfTestCorrective",

      "self-test-corrective-button"

    );

  const fullValidationButton =
    findElement(

      "run-full-validation",

      "runFullValidation",

      "full-validation-button"

    );

  const resetButton =
    findElement(

      "reset-validation",

      "resetValidation",

      "validation-reset"

    );

  if (selfTestButton) {

    selfTestButton.addEventListener(

      "click",

      runSelfTestFromUI

    );

  }

  if (correctiveButton) {

    correctiveButton.addEventListener(

      "click",

      runSelfTestAndCorrectFromUI

    );

  }

  if (fullValidationButton) {

    fullValidationButton.addEventListener(

      "click",

      runFullValidationFromUI

    );

  }

  if (resetButton) {

    resetButton.addEventListener(

      "click",

      resetValidationUI

    );

  }

}

// ============================================================
// INITIALIZE VALIDATION UI
// ============================================================

if (

  document.readyState ===
  "loading"

) {

  document.addEventListener(

    "DOMContentLoaded",

    connectValidationControls

  );

}

else {

  connectValidationControls();

}

// ============================================================
// GLOBAL WINDOW API
// ============================================================

/*
 * Expose functions for existing HTML onclick=""
 * handlers if the cockpit uses inline event handlers.
 */

window.SPDValidationUI = {

  runSelfTest:
    runSelfTestFromUI,

  runSelfTestAndCorrect:
    runSelfTestAndCorrectFromUI,

  runFullValidation:
    runFullValidationFromUI,

  reset:
    resetValidationUI

};

console.log(

  "SPD v13.1 Validation UI Controller initialized."

);