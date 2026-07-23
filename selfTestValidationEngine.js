/**
 * SPD v13.1 — SEXTANT SELF-TEST & VALIDATION ENGINE
 * -------------------------------------------------
 * Captain AI Lena Autonomous Agent Core
 *
 * Validation Pipeline:
 *
 * SELF-TEST
 *     ↓
 * FAULT IDENTIFICATION
 *     ↓
 * CAPTAIN AI LENA CORRECTIVE ACTION
 *     ↓
 * RE-TEST VALIDATION
 *
 * This module does NOT replace the Golden Rule Engine.
 * It validates the authoritative Golden Rule Engine.
 */

import {
  runGoldenRule,
  GOLDEN_RULE_STAGES
} from "./goldenRuleEngine.js";


// ============================================================
// SELF-TEST CASES
// ============================================================

export const SELF_TEST_CASES = [

  {
    name: "LOW RISK — NORMAL STABILITY",

    state: {
      fx: 0,
      energy: 80,
      cyb: 10,
      inf: 5,
      dc: 5,
      event: "NORMAL",
      mode: "AUTONOMOUS"
    },

    expectedRisk: "LOW",
    expectedDecision: "SYSTEM STABLE"
  },


  {
    name: "MEDIUM RISK — PREVENTIVE RESILIENCE",

    state: {
      fx: 50,
      energy: 50,
      cyb: 50,
      inf: 50,
      dc: 50,
      event: "MEDIUM_STRESS",
      mode: "AUTONOMOUS"
    },

    expectedRisk: "MEDIUM",
    expectedDecision: "PREVENTIVE RESILIENCE MODE"
  },


  {
    name: "HIGH RISK — STABILIZATION",

    state: {
      fx: 80,
      energy: 0,
      cyb: 100,
      inf: 100,
      dc: 100,
      event: "HIGH_STRESS",
      mode: "AUTONOMOUS"
    },

    expectedRisk: "CRITICAL",
    expectedDecision: "ACTIVATE EMERGENCY STABILIZATION"
  },


  {
    name: "MAXIMUM CURRENT RISK — ENGINE LIMIT",

    state: {
      fx: 100,
      energy: 0,
      cyb: 100,
      inf: 100,
      dc: 100,
      event: "CRITICAL_EVENT",
      mode: "AUTONOMOUS"
    },

    expectedRisk: "CRITICAL",
    expectedDecision: "ACTIVATE EMERGENCY STABILIZATION"
  }

];


// ============================================================
// 1. SELF-TEST
// ============================================================

export function runSelfTest() {

  const results = [];

  SELF_TEST_CASES.forEach(test => {

    try {

      const result =
        runGoldenRule(test.state);


      const riskPassed =
        result?.assessment?.risk ===
        test.expectedRisk;


      const decisionPassed =
        result?.decision?.decision ===
        test.expectedDecision;


      const pipelinePassed =
        JSON.stringify(result?.pipeline) ===
        JSON.stringify(GOLDEN_RULE_STAGES);


      const status =
        riskPassed &&
        decisionPassed &&
        pipelinePassed
          ? "PASS"
          : "FAIL";


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
          error.message

      });

    }

  });


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


  const failedTests =
    selfTestResult.results.filter(

      item =>
        item.status ===
        "FAIL"

    );


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


  const faults =
    failedTests.map(
      item => {

        return {

          type:
            "VALIDATION_FAILURE",

          test:
            item.test,

          description:
            item.error ??
            "One or more authoritative Golden Rule validation checks failed.",

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
// 3. CAPTAIN AI LENA CORRECTIVE ACTION
// ============================================================

export function correctiveAction(
  selfTestResult,
  faultReport
) {

  if (
    selfTestResult?.overallStatus ===
    "PASS"
  ) {

    return {

      status:
        "NO_CORRECTIVE_ACTION_REQUIRED",

      decision:
        "SYSTEM VALIDATION PASSED",

      actions: []

    };

  }


  const actions = [

    "IDENTIFY FAILED VALIDATION COMPONENT",

    "VERIFY GOLDEN RULE ENGINE OUTPUT",

    "VERIFY RISK CLASSIFICATION LOGIC",

    "VERIFY DECISION LOGIC",

    "VERIFY GOLDEN RULE PIPELINE",

    "RE-EXECUTE AUTHORITATIVE SELF-TEST"

  ];


  return {

    status:
      "CORRECTIVE_ACTION_REQUIRED",

    authority:
      "CAPTAIN AI LENA",

    faultCount:
      faultReport?.faultCount ??
      "UNKNOWN",

    actions

  };

}


// ============================================================
// 4. RE-TEST VALIDATION
// ============================================================

export function reTestValidation() {

  const retest =
    runSelfTest();


  return {

    status:
      retest.overallStatus ===
      "PASS"
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

    timestamp:
      new Date().toISOString()

  };

}


// ============================================================
// 5. COMPLETE AUTONOMOUS VALIDATION LOOP
// ============================================================

export function runValidationLoop() {

  // ----------------------------------------------------------
  // STEP 1 — SELF-TEST
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
  // STEP 3 — CAPTAIN AI LENA CORRECTIVE ACTION
  // ----------------------------------------------------------

  const corrective =
    correctiveAction(

      selfTest,

      faultIdentification

    );


  // ----------------------------------------------------------
  // STEP 4 — RE-TEST VALIDATION
  // ----------------------------------------------------------

  const retest =
    reTestValidation();


  // ----------------------------------------------------------
  // FINAL STATUS
  // ----------------------------------------------------------

  const finalStatus =

    retest.overallStatus ===
    "PASS"

      ? "VALIDATION COMPLETE"

      : "VALIDATION FAILED";


  return {

    engine:
      "SPD v13.1 SEXTANT SELF-TEST & VALIDATION ENGINE",

    validationTarget:
      "SPD v13 SEXTANT GOLDEN RULE ENGINE",

    pipeline: [

      "SELF-TEST",

      "FAULT IDENTIFICATION",

      "CAPTAIN AI LENA CORRECTIVE ACTION",

      "RE-TEST VALIDATION"

    ],

    selfTest,

    faultIdentification,

    correctiveAction:
      corrective,

    retest,

    finalStatus,

    timestamp:
      new Date().toISOString()

  };

}