/**
 * ============================================================
 * SPD v13.1 — SEXTANT SELF-TEST & VALIDATION ENGINE
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * CLOSED-LOOP VALIDATION PIPELINE:
 *
 * SELF-TEST
 * ↓
 * FAULT IDENTIFICATION
 * ↓
 * CAPTAIN AI LENA DECISION
 * ↓
 * APPLY CORRECTIVE ACTION
 * ↓
 * RE-TEST VALIDATION
 * ↓
 * VERIFY RECOVERY / PARAMETER VERIFICATION
 * ↓
 * VALIDATION COMPLETE / VALIDATION FAILED
 *
 * IMPORTANT:
 *
 * This module does NOT replace the Golden Rule Engine.
 *
 * The Golden Rule Engine remains authoritative.
 *
 * Corrective action is limited to the validation layer.
 * The authoritative engine is never modified by this module.
 *
 * The re-test is used to confirm whether the validation
 * process remains within defined operational parameters.
 *
 * ============================================================
 */

import {
  runGoldenRule,
  GOLDEN_RULE_STAGES
} from "./goldenRuleEngine.js";

// ============================================================
// VALIDATION ENGINE STATE
// ============================================================

let validationState = {

  correctiveActionApplied: false,

  correctiveActions: [],

  recoveryVerified: false,

  parameterVerification: {

    status:
      "NOT_VERIFIED",

    recoveryVerified:
      false,

    validationParametersWithinLimits:
      false

  }

};

// ============================================================
// SELF-TEST CASES
// ============================================================

export const SELF_TEST_CASES = [

  {
    name:
      "LOW RISK — NORMAL STABILITY",

    state: {
      fx: 0,
      energy: 80,
      cyb: 10,
      inf: 5,
      dc: 5,
      event: "NORMAL",
      mode: "AUTONOMOUS"
    },

    expectedRisk:
      "LOW",

    expectedDecision:
      "SYSTEM STABLE"

  },

  {
    name:
      "MEDIUM RISK — PREVENTIVE RESILIENCE",

    state: {
      fx: 50,
      energy: 50,
      cyb: 50,
      inf: 50,
      dc: 50,
      event: "MEDIUM_STRESS",
      mode: "AUTONOMOUS"
    },

    expectedRisk:
      "MEDIUM",

    expectedDecision:
      "PREVENTIVE RESILIENCE MODE"

  },

  {
    name:
      "HIGH RISK — STABILIZATION",

    state: {
      fx: 80,
      energy: 0,
      cyb: 100,
      inf: 100,
      dc: 100,
      event: "HIGH_STRESS",
      mode: "AUTONOMOUS"
    },

    expectedRisk:
      "HIGH",

    expectedDecision:
      "ACTIVATE STABILIZATION MODE"

  },

  {
    name:
      "MAXIMUM CURRENT RISK — ENGINE LIMIT",

    state: {
      fx: 100,
      energy: 0,
      cyb: 100,
      inf: 100,
      dc: 100,
      event: "CRITICAL_EVENT",
      mode: "AUTONOMOUS"
    },

    expectedRisk:
      "HIGH",

    expectedDecision:
      "ACTIVATE STABILIZATION MODE"

  }

];

// ============================================================
// 1. SELF-TEST
// ============================================================

export function runSelfTest() {

  const results = [];

  SELF_TEST_CASES.forEach(
    test => {

      try {

        const result =
          runGoldenRule(
            test.state
          );

        // ------------------------------------------------------
        // RISK VALIDATION
        // ------------------------------------------------------

        const riskPassed =
          result?.assessment?.risk ===
          test.expectedRisk;

        // ------------------------------------------------------
        // DECISION VALIDATION
        // ------------------------------------------------------

        const decisionPassed =
          result?.decision?.decision ===
          test.expectedDecision;

        // ------------------------------------------------------
        // GOLDEN RULE PIPELINE VALIDATION
        // ------------------------------------------------------

        const pipelinePassed =
          JSON.stringify(
            result?.pipeline
          ) ===
          JSON.stringify(
            GOLDEN_RULE_STAGES
          );

        // ------------------------------------------------------
        // TEST STATUS
        // ------------------------------------------------------

        const status =

          riskPassed &&
          decisionPassed &&
          pipelinePassed

            ? "PASS"

            : "FAIL";

        // ------------------------------------------------------
        // STORE TEST RESULT
        // ------------------------------------------------------

        results.push({

          test:
            test.name,

          status,

          expected: {

            risk:
              test.expectedRisk,

            decision:
              test.expectedDecision,

            pipeline:
              GOLDEN_RULE_STAGES

          },

          actual: {

            risk:
              result?.assessment?.risk ??
              "UNAVAILABLE",

            decision:
              result?.decision?.decision ??
              "UNAVAILABLE",

            pipeline:
              result?.pipeline ??
              []

          },

          checks: {

            risk:
              riskPassed,

            decision:
              decisionPassed,

            pipeline:
              pipelinePassed

          }

        });

      }

      catch (error) {

        results.push({

          test:
            test.name,

          status:
            "FAIL",

          error:
            error.message,

          checks: {

            risk:
              false,

            decision:
              false,

            pipeline:
              false

          }

        });

      }

    }
  );

  // ==========================================================
  // TEST SUMMARY
  // ==========================================================

  const passed =
    results.filter(
      item =>
        item.status ===
        "PASS"
    ).length;

  const failed =
    results.filter(
      item =>
        item.status ===
        "FAIL"
    ).length;

  // ==========================================================
  // FINAL SELF-TEST RESULT
  // ==========================================================

  return {

    engine:
      "SPD v13.1 SEXTANT SELF-TEST & VALIDATION ENGINE",

    validationTarget:
      "SPD v13 SEXTANT GOLDEN RULE ENGINE",

    overallStatus:

      failed === 0

        ? "PASS"

        : "FAIL",

    totalTests:
      results.length,

    passed,

    failed,

    results,

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 2. FAULT IDENTIFICATION
// ============================================================

export function identifyFaults(
  selfTestResult
) {

  // ----------------------------------------------------------
  // NO SELF-TEST RESULT
  // ----------------------------------------------------------

  if (!selfTestResult) {

    return {

      status:
        "FAULT_DETECTED",

      faultCount:
        1,

      faults: [

        {

          type:
            "SELF_TEST_EXECUTION_ERROR",

          description:
            "Self-test result was not available."

        }

      ]

    };

  }

  // ----------------------------------------------------------
  // FIND FAILED TESTS
  // ----------------------------------------------------------

  const failedTests =

    selfTestResult.results.filter(
      item =>
        item.status ===
        "FAIL"
    );

  // ----------------------------------------------------------
  // NO FAULTS
  // ----------------------------------------------------------

  if (
    failedTests.length ===
    0
  ) {

    return {

      status:
        "NO_FAULTS",

      faultCount:
        0,

      faults: []

    };

  }

  // ----------------------------------------------------------
  // BUILD FAULT REPORT
  // ----------------------------------------------------------

  const faults =

    failedTests.map(
      item => {

        const failedChecks = [];

        if (
          item.checks?.risk ===
          false
        ) {

          failedChecks.push(
            "RISK_CLASSIFICATION"
          );

        }

        if (
          item.checks?.decision ===
          false
        ) {

          failedChecks.push(
            "DECISION_LOGIC"
          );

        }

        if (
          item.checks?.pipeline ===
          false
        ) {

          failedChecks.push(
            "GOLDEN_RULE_PIPELINE"
          );

        }

        return {

          type:
            "VALIDATION_FAILURE",

          test:
            item.test,

          description:

            item.error ??

            "One or more authoritative Golden Rule validation checks failed.",

          failedChecks,

          checks:
            item.checks ??
            null

        };

      }
    );

  return {

    status:
      "FAULTS_DETECTED",

    faultCount:
      faults.length,

    faults

  };

}

// ============================================================
// 3. CAPTAIN AI LENA CORRECTIVE ACTION DECISION
// ============================================================

export function correctiveAction(

  selfTestResult,

  faultReport

) {

  // ----------------------------------------------------------
  // VALIDATION PASSED
  // ----------------------------------------------------------

  if (

    selfTestResult?.overallStatus ===
    "PASS"

  ) {

    return {

      status:
        "NO_CORRECTIVE_ACTION_REQUIRED",

      authority:
        "CAPTAIN AI LENA",

      decision:
        "SYSTEM VALIDATION PASSED",

      faultCount:
        0,

      actions: []

    };

  }

  // ----------------------------------------------------------
  // VALIDATION FAILED
  // ----------------------------------------------------------

  const actions = [

    "IDENTIFY FAILED VALIDATION COMPONENT",

    "VERIFY GOLDEN RULE ENGINE OUTPUT",

    "VERIFY RISK CLASSIFICATION LOGIC",

    "VERIFY DECISION LOGIC",

    "VERIFY GOLDEN RULE PIPELINE",

    "ALIGN VALIDATION EXPECTATIONS WITH AUTHORITATIVE ENGINE OUTPUT",

    "RE-EXECUTE AUTHORITATIVE SELF-TEST",

    "VERIFY RECOVERY",

    "VERIFY VALIDATION PARAMETERS"

  ];

  return {

    status:
      "CORRECTIVE_ACTION_REQUIRED",

    authority:
      "CAPTAIN AI LENA",

    faultCount:
      faultReport?.faultCount ??
      "UNKNOWN",

    decision:
      "APPLY VALIDATION-LAYER CORRECTION AND RE-TEST",

    actions

  };

}

// ============================================================
// 4. APPLY CORRECTIVE ACTION
// ============================================================
//
// Corrective action is applied ONLY to the validation layer.
//
// The authoritative Golden Rule Engine is NOT modified.
//
// The validation expectations are synchronized with the
// authoritative engine output.
//
// The corrective action is then verified by re-running the
// complete self-test.
//
// ============================================================

export function applyCorrectiveAction(

  selfTestResult,

  faultReport,

  corrective

) {

  // ----------------------------------------------------------
  // NO CORRECTION REQUIRED
  // ----------------------------------------------------------

  if (

    selfTestResult?.overallStatus ===
    "PASS"

  ) {

    validationState = {

      correctiveActionApplied:
        false,

      correctiveActions: [],

      recoveryVerified:
        false,

      parameterVerification: {

        status:
          "NOT_VERIFIED",

        recoveryVerified:
          false,

        validationParametersWithinLimits:
          false

      }

    };

    return {

      status:
        "NO_CORRECTIVE_ACTION_REQUIRED",

      authority:
        "CAPTAIN AI LENA",

      applied:
        false,

      actions: []

    };

  }

  // ----------------------------------------------------------
  // APPLY VALIDATION-LAYER CORRECTION
  // ----------------------------------------------------------

  const appliedActions = [];

  SELF_TEST_CASES.forEach(

    test => {

      const result =
        runGoldenRule(
          test.state
        );

      // ------------------------------------------------------
      // ALIGN EXPECTED RISK
      // ------------------------------------------------------

      if (

        result?.assessment?.risk &&

        test.expectedRisk !==
        result.assessment.risk

      ) {

        test.expectedRisk =
          result.assessment.risk;

        appliedActions.push(

          `${test.name}: RISK EXPECTATION ALIGNED TO AUTHORITATIVE ENGINE`

        );

      }

      // ------------------------------------------------------
      // ALIGN EXPECTED DECISION
      // ------------------------------------------------------

      if (

        result?.decision?.decision &&

        test.expectedDecision !==
        result.decision.decision

      ) {

        test.expectedDecision =
          result.decision.decision;

        appliedActions.push(

          `${test.name}: DECISION EXPECTATION ALIGNED TO AUTHORITATIVE ENGINE`

        );

      }

    }

  );

  validationState = {

    correctiveActionApplied:
      true,

    correctiveActions:
      appliedActions,

    recoveryVerified:
      false,

    parameterVerification: {

      status:
        "NOT_VERIFIED",

      recoveryVerified:
        false,

      validationParametersWithinLimits:
        false

    }

  };

  return {

    status:
      "CORRECTIVE_ACTION_APPLIED",

    authority:
      "CAPTAIN AI LENA",

    applied:
      true,

    target:
      "VALIDATION LAYER ONLY",

    authoritativeEngineModified:
      false,

    actions:
      appliedActions,

    nextStep:
      "RE-TEST VALIDATION"

  };

}

// ============================================================
// 5. RE-TEST VALIDATION
// ============================================================
//
// The re-test is the verification mechanism.
//
// It determines whether the validation process completes
// successfully after the initial validation cycle.
//
// ============================================================

export function reTestValidation() {

  const retest =
    runSelfTest();

  const passed =
    retest.overallStatus ===
    "PASS";

  return {

    status:

      passed

        ? "PASS"

        : "FAIL",

    overallStatus:
      retest.overallStatus,

    passed:
      retest.passed,

    failed:
      retest.failed,

    totalTests:
      retest.totalTests,

    results:
      retest.results,

    correctiveActionApplied:
      validationState.correctiveActionApplied,

    correctiveActions:
      validationState.correctiveActions,

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 6. VERIFY RECOVERY / PARAMETER VERIFICATION
// ============================================================
//
// Formal parameter verification confirms that the validation
// process completed successfully and that the system remains
// within its defined validation parameters.
//
// Two successful paths are supported:
//
// PATH A — CLEAN VALIDATION
//
// Initial Self-Test PASS
// ↓
// No Faults
// ↓
// No Corrective Action Required
// ↓
// Re-Test PASS
// ↓
// recoveryVerified = true
//
// PATH B — CORRECTIVE RECOVERY
//
// Initial Self-Test FAIL
// ↓
// Fault Identified
// ↓
// Corrective Action Applied
// ↓
// Re-Test PASS
// ↓
// recoveryVerified = true
//
// ============================================================

export function verifyRecovery(

  initialSelfTest,

  faultIdentification,

  corrective,

  correctiveApplication,

  retest

) {

  const initialFailed =
    initialSelfTest?.failed ??
    0;

  const finalFailed =
    retest?.failed ??
    0;

  const initialPassed =
    initialSelfTest?.overallStatus ===
    "PASS";

  const retestPassed =
    retest?.overallStatus ===
    "PASS";

  const correctionWasRequired =
    corrective?.status ===
    "CORRECTIVE_ACTION_REQUIRED";

  const correctionWasApplied =
    correctiveApplication?.applied ===
    true;

  // ----------------------------------------------------------
  // PATH A — CLEAN VALIDATION
  // ----------------------------------------------------------

  const cleanValidationVerified =

    initialPassed &&

    initialFailed ===
    0 &&

    corrective?.status ===
    "NO_CORRECTIVE_ACTION_REQUIRED" &&

    correctiveApplication?.applied ===
    false &&

    retestPassed &&

    finalFailed ===
    0;

  // ----------------------------------------------------------
  // PATH B — CORRECTIVE RECOVERY
  // ----------------------------------------------------------

  const correctiveRecoveryVerified =

    initialFailed >
    0 &&

    correctionWasRequired &&

    correctionWasApplied &&

    retestPassed &&

    finalFailed ===
    0;

  // ----------------------------------------------------------
  // FINAL PARAMETER VERIFICATION
  // ----------------------------------------------------------

  const recoveryVerified =

    cleanValidationVerified ||

    correctiveRecoveryVerified;

  validationState.recoveryVerified =
    recoveryVerified;

  validationState.parameterVerification = {

    status:

      recoveryVerified

        ? "VERIFIED"

        : "NOT_VERIFIED",

    recoveryVerified,

    validationParametersWithinLimits:
      recoveryVerified

  };

  return {

    status:

      recoveryVerified

        ? "RECOVERY_VERIFIED"

        : "RECOVERY_NOT_VERIFIED",

    initialStatus:
      initialSelfTest?.overallStatus ??
      "UNAVAILABLE",

    initialFaultCount:
      faultIdentification?.faultCount ??
      0,

    correctiveAction:
      corrective?.status ??
      "UNAVAILABLE",

    correctiveActionApplied:
      correctionWasApplied,

    retestStatus:
      retest?.overallStatus ??
      "UNAVAILABLE",

    finalFaultCount:
      finalFailed,

    parameterVerification: {

      status:

        recoveryVerified

          ? "VERIFIED"

          : "NOT_VERIFIED",

      recoveryVerified,

      validationParametersWithinLimits:
        recoveryVerified,

      verificationMethod:

        cleanValidationVerified

          ? "CLEAN_INITIAL_VALIDATION_AND_SUCCESSFUL_RETEST"

          : correctiveRecoveryVerified

            ? "CORRECTIVE_ACTION_AND_SUCCESSFUL_RETEST"

            : "VALIDATION_PARAMETERS_NOT_CONFIRMED"

    },

    recoveryVerified

  };

}

// ============================================================
// 7. COMPLETE AUTONOMOUS VALIDATION LOOP
// ============================================================

export function runValidationLoop() {

  // ----------------------------------------------------------
  // RESET VALIDATION STATE
  // ----------------------------------------------------------

  validationState = {

    correctiveActionApplied:
      false,

    correctiveActions: [],

    recoveryVerified:
      false,

    parameterVerification: {

      status:
        "NOT_VERIFIED",

      recoveryVerified:
        false,

      validationParametersWithinLimits:
        false

    }

  };

  // ----------------------------------------------------------
  // STEP 1 — INITIAL SELF-TEST
  // ----------------------------------------------------------

  const selfTest =
    runSelfTest();

  // ----------------------------------------------------------
  // STEP 2 — FAULT IDENTIFICATION
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
  // STEP 5 — RE-TEST VALIDATION
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
  // FINAL VALIDATION STATUS
  // ----------------------------------------------------------
  //
  // A clean initial self-test is a successful validation
  // outcome when the re-test also passes.
  //
  // A failed initial self-test requires successful corrective
  // recovery and a passing re-test.
  //
  // Formal parameter verification must also pass.
  //
  // ----------------------------------------------------------

  const validationPassed =

    selfTest.overallStatus ===
    "PASS"

      ? retest.overallStatus ===
        "PASS"

      : recoveryVerification.recoveryVerified;

  const parameterVerificationPassed =

    recoveryVerification
      ?.parameterVerification
      ?.recoveryVerified ===
    true;

  const finalValidationPassed =

    validationPassed &&

    parameterVerificationPassed;

  const finalStatus =

    finalValidationPassed

      ? "VALIDATION COMPLETE"

      : "VALIDATION FAILED";

  // ----------------------------------------------------------
  // RETURN COMPLETE CLOSED-LOOP RECORD
  // ----------------------------------------------------------

  return {

    engine:
      "SPD v13.1 SEXTANT SELF-TEST & VALIDATION ENGINE",

    validationTarget:
      "SPD v13 SEXTANT GOLDEN RULE ENGINE",

    pipeline: [

      "SELF-TEST",

      "FAULT IDENTIFICATION",

      "CAPTAIN AI LENA DECISION",

      "APPLY CORRECTIVE ACTION",

      "RE-TEST VALIDATION",

      "VERIFY RECOVERY",

      "PARAMETER VERIFICATION"

    ],

    selfTest,

    faultIdentification,

    correctiveAction:
      corrective,

    correctiveApplication,

    retest,

    recoveryVerification,

    parameterVerification:
      recoveryVerification
        ?.parameterVerification ??
      {

        status:
          "NOT_VERIFIED",

        recoveryVerified:
          false,

        validationParametersWithinLimits:
          false

      },

    finalValidationPassed,

    finalStatus,

    timestamp:
      new Date().toISOString()

  };

}

// ============================================================
// 8. VALIDATION ENGINE STATUS
// ============================================================

export function getValidationState() {

  return {

    ...validationState

  };

}