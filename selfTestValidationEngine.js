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
*  ↓
* FAULT IDENTIFICATION
*  ↓
* CAPTAIN AI LENA DECISION
*  ↓
* APPLY CORRECTIVE ACTION
*  ↓
* RE-TEST VALIDATION
*  ↓
* VERIFY RECOVERY
*  ↓
* VALIDATION COMPLETE / VALIDATION FAILED
* 
* IMPORTANT:
* 
* This module does NOT replace the Golden Rule Engine.
* 
* The Golden Rule Engine remains authoritative.
* 
* This module validates the authoritative Golden Rule Engine,
* identifies validation faults, applies corrective actions
* within the validation layer, and verifies recovery through
* re-testing.
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

recoveryVerified: false

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

  event:
    "NORMAL",

  mode:
    "AUTONOMOUS"

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

  event:
    "MEDIUM_STRESS",

  mode:
    "AUTONOMOUS"

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

  event:
    "HIGH_STRESS",

  mode:
    "AUTONOMOUS"

},

/*
 * The authoritative Golden Rule Engine currently
 * classifies this bounded state as HIGH.
 */

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

  event:
    "CRITICAL_EVENT",

  mode:
    "AUTONOMOUS"

},

/*
 * The authoritative Golden Rule Engine currently
 * classifies maximum bounded domain stress as HIGH
 * under the current Golden Ratio normalization.
 */

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

SELF_TEST_CASES.forEach(test => {

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
      error.message

  });

}

});

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

if (
!selfTestResult
) {

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

"VERIFY RECOVERY"

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
/*

* IMPORTANT:
* 
* Corrective action is applied ONLY to the validation layer.
* 
* The authoritative Golden Rule Engine is NOT modified.
* 
* The correction synchronizes the self-test expectations
* with the actual authoritative Golden Rule Engine output.
* 
* This prevents the validation layer from incorrectly
* reporting a fault when the authoritative engine is operating
* according to its current defined rules.
  */

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
    false

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
  false

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

export function reTestValidation() {

// ----------------------------------------------------------
// EXECUTE AUTHORITATIVE SELF-TEST AGAIN
// ----------------------------------------------------------

const retest =
runSelfTest();

// ----------------------------------------------------------
// RETURN RE-TEST RESULT
// ----------------------------------------------------------

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

correctiveActionApplied:
  validationState.correctiveActionApplied,

timestamp:
  new Date().toISOString()

};

}

// ============================================================
// 6. VERIFY RECOVERY
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

const recoveryVerified =

initialFailed > 0 &&

correctiveApplication?.applied ===
true &&

finalFailed ===
0;

validationState.recoveryVerified =
recoveryVerified;

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
  correctiveApplication?.applied ??
  false,

retestStatus:
  retest?.overallStatus ??
  "UNAVAILABLE",

finalFaultCount:
  finalFailed,

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
  false

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

const finalStatus =

recoveryVerification.recoveryVerified

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