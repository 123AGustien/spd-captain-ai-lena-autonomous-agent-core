/**
 * ============================================================
 * SPD V13.1 — FIN DOMAIN VALIDATION ENGINE
 * ============================================================
 *
 * File:
 * FIN/fin-validation-engine.js
 *
 * Domain:
 * FIN — Financial Resilience
 *
 * Purpose:
 * Validate the complete FIN domain execution after the
 * authoritative SPD v13.1 Golden Rule Engine has executed.
 *
 * ARCHITECTURE:
 *
 * FIN SCENARIO
 *      ↓
 * domainIntegration.js
 *      ↓
 * FIN/fin-rule-engine.js
 *      ↓
 * AUTHORITATIVE FIN RULE REGISTRY
 *      ↓
 * FIN RULE RESULT
 *      ↓
 * GOLDEN RATIO NORMALIZATION
 *      ↓
 * CORE PARAMETER BOUNDARY
 *      ↓
 * CAPTAIN AI LENA DECISION
 *      ↓
 * ACTION
 *      ↓
 * UPDATED STATE
 *      ↓
 * MEMORY CORE
 *      ↓
 * AUDIT RECORD
 *      ↓
 * FIN/fin-validation-engine.js
 *      ↓
 * SELF-TEST
 *      ↓
 * FAULT IDENTIFICATION
 *      ↓
 * CORRECTIVE ACTION IF REQUIRED
 *      ↓
 * RE-TEST
 *      ↓
 * PARAMETER VERIFICATION
 *      ↓
 * FINAL VALIDATION
 *
 * GOLDEN RULE:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * IMPORTANT:
 *
 * This module does NOT replace or bypass the authoritative
 * SPD v13.1 Golden Rule Engine.
 *
 * This module is a validation layer only.
 *
 * The authoritative core remains responsible for:
 *
 * OBSERVE
 * VERIFY
 * ASSESS
 * DECIDE
 * ACT
 * UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/* ============================================================
   SYSTEM CONSTANTS
   ============================================================
 */

export const PHI =
  1.618033988749895;


/* ============================================================
   AUTHORITATIVE GOLDEN RULE PIPELINE
   ============================================================
 */

export const GOLDEN_RULE_STAGES = [

  "OBSERVE",

  "VERIFY",

  "ASSESS",

  "DECIDE",

  "ACT",

  "UPDATE"

];


/* ============================================================
   AUTHORITATIVE CORE PARAMETER BOUNDARIES
   ============================================================
 *
 * These are validation boundaries.
 *
 * This validation module does not independently modify
 * authoritative core state.
 *
 * The authoritative engine remains responsible for
 * enforcing and correcting parameters.
 *
 * ============================================================
 */

export const CORE_PARAMETER_BOUNDARIES = {

  fx: {

    min:
      0,

    max:
      100

  },


  energy: {

    min:
      0,

    max:
      100

  },


  cyb: {

    min:
      0,

    max:
      100

  },


  inf: {

    min:
      0,

    max:
      100

  },


  dc: {

    min:
      0,

    max:
      100

  }

};


/* ============================================================
   AUTHORITATIVE FIN RULE REGISTRY RESOLUTION
   ============================================================
 *
 * IMPORTANT:
 *
 * This validation engine MUST NOT create a second competing
 * FIN rule registry.
 *
 * The authoritative FIN rule registry should be supplied by
 * the existing FIN rule system.
 *
 * Supported registry formats:
 *
 * 1. Object:
 *
 * {
 *   FIN_STRESS: "FIN-001"
 * }
 *
 * 2. Rule objects:
 *
 * {
 *   FIN_STRESS: {
 *     ruleId: "FIN-001"
 *   }
 * }
 *
 * 3. Array:
 *
 * [
 *   {
 *     id: "FIN-001",
 *     scenario: "FIN_STRESS"
 *   }
 * ]
 *
 * The validator also attempts to read the rule ID directly
 * from the FIN rule result when available.
 *
 * ============================================================
 */


/**
 * Resolve FIN Rule ID from authoritative registry.
 */
export function resolveFINRuleId(
  scenario,
  registry = null,
  finRuleResult = null
) {

  const normalizedScenario =
    String(
      scenario ||
      ""
    )
      .trim()
      .toUpperCase();


  /*
   * First preference:
   *
   * Rule ID explicitly returned by
   * the authoritative FIN rule engine.
   */

  const resultRuleId =

    finRuleResult?.ruleId ??

    finRuleResult?.rule?.ruleId ??

    finRuleResult?.rule?.id ??

    null;


  if (
    resultRuleId
  ) {

    return resultRuleId;

  }


  /*
   * No registry supplied.
   *
   * Do not invent a rule ID.
   */

  if (
    !registry
  ) {

    return null;

  }


  /*
   * Registry object format.
   */

  if (
    !Array.isArray(
      registry
    ) &&
    typeof registry ===
      "object"
  ) {

    const entry =
      registry[
        normalizedScenario
      ];


    if (
      typeof entry ===
        "string"
    ) {

      return entry;

    }


    if (
      entry &&
      typeof entry ===
        "object"
    ) {

      return (

        entry.ruleId ??

        entry.id ??

        null

      );

    }

  }


  /*
   * Registry array format.
   */

  if (
    Array.isArray(
      registry
    )
  ) {

    const entry =
      registry.find(

        item => {

          const itemScenario =

            String(

              item?.scenario ??

              item?.scenarioId ??

              item?.event ??

              ""

            )
              .trim()
              .toUpperCase();


          return (

            itemScenario ===
            normalizedScenario

          );

        }

      );


    if (
      entry
    ) {

      return (

        entry.ruleId ??

        entry.id ??

        null

      );

    }

  }


  return null;

}


/* ============================================================
   VERIFY FIN SCENARIO
   ============================================================
 */

export function verifyFINScenario(
  scenario,
  registry = null,
  finRuleResult = null
) {

  const ruleId =
    resolveFINRuleId(
      scenario,
      registry,
      finRuleResult
    );


  return {

    valid:
      Boolean(
        ruleId
      ),

    status:

      ruleId

        ? "FOUND"

        : "NOT_FOUND",

    scenario:
      scenario ?? null,

    ruleId

  };

}


/* ============================================================
   VERIFY INTENSITY
   ============================================================
 */

export function verifyIntensity(
  intensity
) {

  const numericIntensity =
    Number(
      intensity
    );


  const valid =

    Number.isFinite(
      numericIntensity
    )

    &&

    numericIntensity >=
      0

    &&

    numericIntensity <=
      100;


  return {

    status:
      valid
        ? "PASS"
        : "FAIL",

    valid,

    value:
      numericIntensity

  };

}


/* ============================================================
   VERIFY CORE PARAMETER BOUNDARY
   ============================================================
 *
 * This function ONLY validates.
 *
 * It does not modify the state.
 *
 * ============================================================
 */

export function verifyCoreParameterBoundary(
  state = {}
) {

  const checks = {};

  const violations = [];


  Object.entries(
    CORE_PARAMETER_BOUNDARIES
  ).forEach(

    ([parameter, boundary]) => {

      const value =
        Number(
          state?.[
            parameter
          ]
        );


      const valid =

        Number.isFinite(
          value
        )

        &&

        value >=
          boundary.min

        &&

        value <=
          boundary.max;


      checks[
        parameter
      ] = {

        value,

        min:
          boundary.min,

        max:
          boundary.max,

        valid

      };


      if (
        !valid
      ) {

        violations.push({

          parameter,

          value,

          min:
            boundary.min,

          max:
            boundary.max

        });

      }

    }

  );


  return {

    status:

      violations.length ===
        0

        ? "PASS"

        : "FAIL",


    withinBounds:

      violations.length ===
        0,


    checks,


    violations

  };

}


/* ============================================================
   VERIFY GOLDEN RULE PIPELINE
   ============================================================
 */

export function verifyGoldenRulePipeline(
  pipeline
) {

  const actual =

    Array.isArray(
      pipeline
    )

      ? pipeline

      : [];


  const valid =

    JSON.stringify(
      actual
    ) ===

    JSON.stringify(
      GOLDEN_RULE_STAGES
    );


  return {

    status:

      valid

        ? "PASS"

        : "FAIL",


    valid,


    expected:
      GOLDEN_RULE_STAGES,


    actual

  };

}


/* ============================================================
   VERIFY GOLDEN RATIO NORMALIZATION
   ============================================================
 */

export function verifyGoldenRatioNormalization(
  assessment = {}
) {

  const goldenScore =
    Number(
      assessment?.goldenScore
    );


  const resilienceScore =
    Number(
      assessment?.resilienceScore
    );


  const rawStress =
    Number(
      assessment?.rawStress
    );


  const validNumbers =

    Number.isFinite(
      goldenScore
    )

    &&

    Number.isFinite(
      resilienceScore
    )

    &&

    Number.isFinite(
      rawStress
    );


  const phiValid =

    Number.isFinite(
      Number(
        assessment?.phi ??
        PHI
      )
    );


  const valid =

    validNumbers

    &&

    phiValid;


  return {

    status:

      valid

        ? "PASS"

        : "FAIL",


    valid,


    phi:

      assessment?.phi ??
      PHI,


    rawStress:

      Number.isFinite(
        rawStress
      )

        ? rawStress

        : null,


    goldenScore:

      Number.isFinite(
        goldenScore
      )

        ? goldenScore

        : null,


    resilienceScore:

      Number.isFinite(
        resilienceScore
      )

        ? resilienceScore

        : null

  };

}


/* ============================================================
   VERIFY FIN RULE RESULT
   ============================================================
 */

export function verifyFINRuleResult(
  finRuleResult
) {

  if (
    !finRuleResult
  ) {

    return {

      status:
        "FAIL",

      valid:
        false,

      reason:
        "FIN RULE RESULT NOT PROVIDED"

    };

  }


  const domainValid =

    String(
      finRuleResult?.domain ??
      ""
    )
      .trim()
      .toUpperCase() ===
      "FIN";


  const statusValid =

    finRuleResult?.status ===
      "COMPLETE";


  const assessmentPresent =

    Boolean(
      finRuleResult?.assessment
    );


  const decisionPresent =

    Boolean(
      finRuleResult?.decision
    );


  const actionPresent =

    Boolean(
      finRuleResult?.action
    );


  const valid =

    domainValid

    &&

    statusValid

    &&

    assessmentPresent

    &&

    decisionPresent

    &&

    actionPresent;


  return {

    status:

      valid

        ? "PASS"

        : "FAIL",


    valid,


    domain:
      finRuleResult?.domain ??
      null,


    engine:
      finRuleResult?.engine ??
      null,


    scenario:
      finRuleResult?.scenario ??
      null,


    resultStatus:
      finRuleResult?.status ??
      null,


    assessmentPresent,


    decisionPresent,


    actionPresent

  };

}


/* ============================================================
   BUILD FIN VALIDATION RECORD
   ============================================================
 *
 * Creates the authoritative FIN validation audit object.
 *
 * ============================================================
 */

export function buildFINValidationRecord({

  scenario,

  intensity,

  finRuleResult,

  goldenRuleResult,

  updatedState,

  ruleRegistry = null

} = {}) {


  /*
   * Resolve authoritative FIN Rule ID.
   */

  const ruleId =
    resolveFINRuleId(

      scenario,

      ruleRegistry,

      finRuleResult

    );


  /*
   * Verify FIN scenario.
   */

  const scenarioVerification =
    verifyFINScenario(

      scenario,

      ruleRegistry,

      finRuleResult

    );


  /*
   * Verify intensity.
   */

  const intensityVerification =
    verifyIntensity(
      intensity
    );


  /*
   * Verify FIN rule result.
   */

  const finRuleVerification =
    verifyFINRuleResult(
      finRuleResult
    );


  /*
   * Verify Golden Ratio normalization.
   */

  const goldenRatioVerification =
    verifyGoldenRatioNormalization(

      goldenRuleResult?.assessment

    );


  /*
   * Verify Golden Rule pipeline.
   */

  const pipelineVerification =
    verifyGoldenRulePipeline(

      goldenRuleResult?.pipeline

    );


  /*
   * Verify final system parameters.
   */

  const parameterVerification =
    verifyCoreParameterBoundary(

      updatedState

    );


  /*
   * Final initial validation.
   */

  const initialValidationPass =

    scenarioVerification.valid

    &&

    intensityVerification.valid

    &&

    finRuleVerification.valid

    &&

    goldenRatioVerification.valid

    &&

    pipelineVerification.valid

    &&

    parameterVerification.withinBounds;


  return {

    system:
      "SPD v13.1",


    module:
      "FIN Financial Resilience Validation Engine",


    domain:
      "FIN",


    scenario:
      scenario ?? null,


    intensity:
      intensity ?? null,


    finRule: {

      ruleId,

      ruleRegistryStatus:

        ruleId

          ? "FOUND"

          : "NOT_FOUND",


      result:
        finRuleResult ??
        null,


      verification:
        finRuleVerification

    },


    goldenRatioNormalization: {

      phi:
        goldenRatioVerification.phi,


      status:

        goldenRatioVerification.valid

          ? "APPLIED"

          : "NOT_VERIFIED",


      verification:
        goldenRatioVerification

    },


    coreParameterBoundary: {

      status:
        parameterVerification.status,


      withinBounds:
        parameterVerification.withinBounds,


      verification:
        parameterVerification

    },


    goldenRulePipeline:
      pipelineVerification,


    decision:

      goldenRuleResult?.decision ??
      null,


    actionSequence:

      goldenRuleResult?.actionSequence ??

      [],


    updatedState:

      updatedState ??

      null,


    validation: {

      scenario:

        scenarioVerification.valid

          ? "PASS"

          : "FAIL",


      intensity:

        intensityVerification.valid

          ? "PASS"

          : "FAIL",


      finRule:

        finRuleVerification.status,


      goldenRatio:

        goldenRatioVerification.status,


      goldenRule:

        pipelineVerification.status,


      parameterVerification:

        parameterVerification.status,


      finalStatus:

        initialValidationPass

          ? "PASS"

          : "FAIL"

    },


    status:

      initialValidationPass

        ? "FIN VALIDATION COMPLETE"

        : "FIN VALIDATION FAILED",


    timestamp:
      new Date()
        .toISOString()

  };

}


/* ============================================================
   RUN FIN SELF-TEST / RE-TEST VALIDATION
   ============================================================
 *
 * The authoritative self-test function must be supplied.
 *
 * This function does not replace the authoritative self-test.
 *
 * Expected self-test result:
 *
 * {
 *   overallStatus: "PASS",
 *   failed: 0
 * }
 *
 * Alternative accepted successful result:
 *
 * {
 *   status: "PASS"
 * }
 *
 * ============================================================
 */

export function runFINRetest({

  runSelfTest,

  scenario,

  intensity,

  finRuleResult,

  goldenRuleResult,

  updatedState,

  ruleRegistry = null

} = {}) {


  /*
   * Validate self-test dependency.
   */

  if (
    typeof runSelfTest !==
      "function"
  ) {

    return {

      validationTarget:
        "SPD v13.1 FIN Financial Resilience Domain",


      scenario:
        scenario ?? null,


      intensity:
        intensity ?? null,


      status:
        "RETEST_FAILED",


      passed:
        false,


      reason:
        "AUTHORITATIVE SELF-TEST FUNCTION IS REQUIRED.",


      finalStatus:
        "FINAL VALIDATION FAIL",


      timestamp:
        new Date()
          .toISOString()

    };

  }


  /*
   * Initial validation.
   */

  const initialValidation =
    buildFINValidationRecord({

      scenario,

      intensity,

      finRuleResult,

      goldenRuleResult,

      updatedState,

      ruleRegistry

    });


  /*
   * Execute authoritative self-test.
   */

  let selfTestResult;

  try {

    selfTestResult =
      runSelfTest();

  }

  catch (
    error
  ) {

    return {

      validationTarget:
        "SPD v13.1 FIN Financial Resilience Domain",


      scenario,

      intensity,


      initialValidation,


      selfTest: {

        status:
          "ERROR",

        error:
          error?.message ??

          String(
            error
          )

      },


      reTest: {

        status:
          "FAIL",

        passed:
          false

      },


      finalStatus:
        "FINAL VALIDATION FAIL",


      recoveryVerification: {

        status:
          "NOT_VERIFIED",

        reTestStatus:
          "FAIL",

        parameterStatus:
          "NOT_VERIFIED",

        verified:
          false

      },


      timestamp:
        new Date()
          .toISOString()

    };

  }


  /*
   * Evaluate self-test result.
   */

  const selfTestPassed =

    (

      selfTestResult?.overallStatus ===
      "PASS"

    )

    ||

    (

      selfTestResult?.status ===
      "PASS"

    );


  const failedCount =
    Number(
      selfTestResult?.failed ??
      0
    );


  const noFailures =

    Number.isFinite(
      failedCount
    )

      ? failedCount ===
        0

      : true;


  const retestPassed =

    selfTestPassed

    &&

    noFailures;


  /*
   * Final parameter verification.
   */

  const finalParameterVerification =
    verifyCoreParameterBoundary(

      updatedState

    );


  /*
   * Final validation requires:
   *
   * 1. Initial FIN validation passed.
   * 2. Authoritative self-test passed.
   * 3. No self-test failures.
   * 4. Final parameters are valid.
   */

  const finalValidation =

    initialValidation?.validation
      ?.finalStatus ===
      "PASS"

    &&

    retestPassed

    &&

    finalParameterVerification.withinBounds;


  return {

    validationTarget:
      "SPD v13.1 FIN Financial Resilience Domain",


    scenario,


    intensity,


    finRule:
      initialValidation.finRule,


    initialValidation,


    selfTest:
      selfTestResult,


    reTest: {

      status:

        retestPassed

          ? "PASS"

          : "FAIL",


      passed:
        retestPassed,


      overallStatus:

        retestPassed

          ? "PASS"

          : "FAIL"

    },


    parameterVerification:
      finalParameterVerification,


    finalStatus:

      finalValidation

        ? "FINAL VALIDATION PASS"

        : "FINAL VALIDATION FAIL",


    recoveryVerification: {

      status:

        finalValidation

          ? "VERIFIED"

          : "NOT_VERIFIED",


      reTestStatus:

        retestPassed

          ? "PASS"

          : "FAIL",


      parameterStatus:

        finalParameterVerification.status,


      verified:
        finalValidation

    },


    timestamp:
      new Date()
        .toISOString()

  };

}


/* ============================================================
   COMPLETE FIN VALIDATION LOOP
   ============================================================
 *
 * Convenience wrapper for the complete validation stage.
 *
 * ============================================================
 */

export function validateFINExecution({

  runSelfTest,

  scenario,

  intensity,

  finRuleResult,

  goldenRuleResult,

  updatedState,

  ruleRegistry = null

} = {}) {

  return runFINRetest({

    runSelfTest,

    scenario,

    intensity,

    finRuleResult,

    goldenRuleResult,

    updatedState,

    ruleRegistry

  });

}


/* ============================================================
   FIN VALIDATION ENGINE STATUS
   ============================================================
 */

export const FIN_VALIDATION_ENGINE_STATUS = {

  system:
    "SPD v13.1",


  domain:
    "FIN",


  name:
    "FIN Financial Resilience Validation Engine",


  deterministic:
    true,


  machineLearning:
    false,


  randomness:
    false,


  authoritativeCore:
    "SPD V13.1 Golden Rule Engine",


  pipeline: [

    "OBSERVE",

    "VERIFY",

    "ASSESS",

    "DECIDE",

    "ACT",

    "UPDATE"

  ],


  validationLoop: [

    "SELF-TEST",

    "FAULT IDENTIFICATION",

    "CORRECTIVE ACTION",

    "RE-TEST",

    "PARAMETER VERIFICATION",

    "FINAL VALIDATION"

  ],


  authority:
    "CAPTAIN AI LENA"

};


/* ============================================================
   DEFAULT EXPORT
   ============================================================
 */

export default {

  PHI,

  GOLDEN_RULE_STAGES,

  CORE_PARAMETER_BOUNDARIES,

  FIN_VALIDATION_ENGINE_STATUS,

  resolveFINRuleId,

  verifyFINScenario,

  verifyIntensity,

  verifyCoreParameterBoundary,

  verifyGoldenRulePipeline,

  verifyGoldenRatioNormalization,

  verifyFINRuleResult,

  buildFINValidationRecord,

  runFINRetest,

  validateFINExecution

};

Important integration note: do not add a second "FIN_RULE_REGISTRY" constant to this file. Pass the existing authoritative registry into "ruleRegistry", or have "finRuleEngine.js" return the authoritative "ruleId" in its result. This keeps one authoritative FIN rule source.

The intended final chain is:

FIN scenario → "domainIntegration.js" → "FIN/fin-rule-engine.js" → authoritative FIN registry → "runEngine.js" → Captain AI Lena decision → action → updated state → Memory/Audit → "FIN/fin-validation-engine.js" → self-test → re-test → parameter verification → final validation.