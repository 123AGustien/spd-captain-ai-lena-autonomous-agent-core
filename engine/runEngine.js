/**
 * ============================================================
 * SPD V13.1 — AUTHORITATIVE ENGINE RUNNER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Execute the complete authoritative resilience loop:
 *
 * FIN RULE
 *     ↓
 * GOLDEN RATIO NORMALIZATION
 *     ↓
 * CORE PARAMETER BOUNDARY
 *     ↓
 * CAPTAIN AI LENA DECISION
 *     ↓
 * ACTION
 *     ↓
 * RE-TEST
 *     ↓
 * PARAMETER VERIFICATION
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Validation Loop:
 *
 * SELF-TEST
 *     ↓
 * FAULT IDENTIFICATION
 *     ↓
 * CAPTAIN AI LENA DECISION
 *     ↓
 * CORRECTIVE ACTION
 *     ↓
 * RE-TEST VALIDATION
 *     ↓
 * PARAMETER VERIFICATION
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


export const GOLDEN_RULE_STAGES = [

  "OBSERVE",

  "VERIFY",

  "ASSESS",

  "DECIDE",

  "ACT",

  "UPDATE"

];


/* ============================================================
   CORE PARAMETER BOUNDARIES
   ============================================================
 *
 * All domain rules must remain inside these boundaries.
 *
 * Domain rules may identify and assess risk.
 * Domain rules cannot bypass the authoritative core.
 *
 * ============================================================
 */

export const CORE_PARAMETER_BOUNDARY = {

  fx: {
    min: 0,
    max: 100
  },

  energy: {
    min: 0,
    max: 100
  },

  cyb: {
    min: 0,
    max: 100
  },

  inf: {
    min: 0,
    max: 100
  },

  dc: {
    min: 0,
    max: 100
  }

};


/* ============================================================
   CLAMP PARAMETER
   ============================================================
 */

function clampParameter(
  value,
  min,
  max
) {

  const numericValue =
    Number(
      value
    );


  if (
    !Number.isFinite(
      numericValue
    )
  ) {

    return min;

  }


  return Math.max(

    min,

    Math.min(
      max,
      numericValue
    )

  );

}


/* ============================================================
   VERIFY CORE PARAMETERS
   ============================================================
 *
 * Ensures that all system parameters remain inside the
 * authoritative core boundary.
 *
 * ============================================================
 */

export function verifyCoreParameters(
  state = {}
) {

  const verifiedState = {

    fx:
      clampParameter(
        state.fx,
        CORE_PARAMETER_BOUNDARY.fx.min,
        CORE_PARAMETER_BOUNDARY.fx.max
      ),

    energy:
      clampParameter(
        state.energy,
        CORE_PARAMETER_BOUNDARY.energy.min,
        CORE_PARAMETER_BOUNDARY.energy.max
      ),

    cyb:
      clampParameter(
        state.cyb,
        CORE_PARAMETER_BOUNDARY.cyb.min,
        CORE_PARAMETER_BOUNDARY.cyb.max
      ),

    inf:
      clampParameter(
        state.inf,
        CORE_PARAMETER_BOUNDARY.inf.min,
        CORE_PARAMETER_BOUNDARY.inf.max
      ),

    dc:
      clampParameter(
        state.dc,
        CORE_PARAMETER_BOUNDARY.dc.min,
        CORE_PARAMETER_BOUNDARY.dc.max
      )

  };


  const violations = [];


  Object.keys(
    CORE_PARAMETER_BOUNDARY
  ).forEach(

    parameter => {

      const original =
        Number(
          state[
            parameter
          ]
        );


      if (
        Number.isFinite(
          original
        ) &&
        original !==
        verifiedState[
          parameter
        ]
      ) {

        violations.push({

          parameter,

          original,

          corrected:
            verifiedState[
              parameter
            ],

          boundary:
            CORE_PARAMETER_BOUNDARY[
              parameter
            ]

        });

      }

    }

  );


  return {

    verified:
      violations.length === 0,

    boundaryStatus:

      violations.length === 0

        ? "WITHIN_CORE_PARAMETERS"

        : "PARAMETER_BOUNDARY_CORRECTED",

    violations,

    state:
      verifiedState

  };

}


/* ============================================================
   GOLDEN RATIO NORMALIZATION
   ============================================================
 */

export function normalizeGoldenRatio(
  rawStress
) {

  const numericStress =
    Number(
      rawStress
    );


  const safeStress =

    Number.isFinite(
      numericStress
    )

      ? Math.max(
          0,
          numericStress
        )

      : 0;


  const goldenScore =
    safeStress *
    (
      1 /
      PHI
    );


  const resilienceScore =
    Math.max(
      0,
      100 -
      goldenScore
    );


  return {

    rawStress:
      safeStress,

    goldenScore,

    resilienceScore,

    phi:
      PHI

  };

}


/* ============================================================
   RISK CLASSIFICATION
   ============================================================
 */

export function classifyRisk(
  resilienceScore
) {

  const score =
    Number(
      resilienceScore
    );


  if (
    score >= 70
  ) {

    return "LOW";

  }


  if (
    score >= 50
  ) {

    return "MEDIUM";

  }


  return "HIGH";

}


/* ============================================================
   CAPTAIN AI LENA DECISION
   ============================================================
 *
 * The decision layer remains authoritative.
 *
 * Domain-specific rules provide assessment.
 * The core engine determines the final operational response.
 *
 * ============================================================
 */

export function determineCaptainLenaDecision(
  assessment,
  state = {}
) {

  const resilienceScore =
    Number(
      assessment?.resilienceScore ??
      0
    );


  const risk =
    assessment?.risk ??
    classifyRisk(
      resilienceScore
    );


  /*
   * Energy protection remains a core boundary condition.
   */

  if (
    Number(
      state.energy
    ) < 35
  ) {

    return {

      decision:
        "ENERGY PROTECTION MODE",

      action:
        "REDUCE SYSTEM LOAD AND PRESERVE ENERGY RESERVES"

    };

  }


  if (
    risk ===
    "HIGH"
  ) {

    return {

      decision:
        "ACTIVATE STABILIZATION MODE",

      action:
        "STABILIZE SYSTEM AND CONTAIN RISK"

    };

  }


  if (
    risk ===
    "MEDIUM"
  ) {

    return {

      decision:
        "PREVENTIVE RESILIENCE MODE",

      action:
        "APPLY PREVENTIVE RESILIENCE MEASURES"

    };

  }


  return {

    decision:
      "SYSTEM STABLE",

    action:
      "CONTINUE MONITORING"

  };

}


/* ============================================================
   EXECUTE AUTHORITATIVE ENGINE
   ============================================================
 *
 * This is the main runner.
 *
 * ============================================================
 */

export function runEngine(
  input = {}
) {

  const observedState = {

    ...(input.state ?? {}),

    event:
      input.event ??
      input.scenario ??
      "SYSTEM_MONITORING",

    scenario:
      input.scenario ??
      input.event ??
      "SYSTEM_MONITORING",

    mode:
      input.mode ??
      "AUTONOMOUS",

    intensity:
      Number(
        input.intensity ??
        0
      ),

    timestamp:
      new Date()
        .toISOString()

  };


  /* ==========================================================
     OBSERVE
     ========================================================== */


  /* ==========================================================
     VERIFY
     ========================================================== */

  const parameterVerification =
    verifyCoreParameters(
      observedState
    );


  const verifiedState = {

    ...parameterVerification.state,

    event:
      observedState.event,

    scenario:
      observedState.scenario,

    mode:
      observedState.mode,

    intensity:
      observedState.intensity,

    timestamp:
      observedState.timestamp

  };


  /* ==========================================================
     ASSESS
     ==========================================================
   *
   * Core deterministic stress calculation.
   *
   * Domain rule results can be supplied through:
   *
   * input.domainRuleResult
   *
   * but cannot bypass the core normalization layer.
   *
   * ==========================================================
   */

  const domainRuleResult =
    input.domainRuleResult ??
    null;


  const rawStress =

    Number(
      domainRuleResult?.rawStress
    );


  const calculatedRawStress =

    Number.isFinite(
      rawStress
    )

      ? rawStress

      : (

          verifiedState.fx *
          0.20

          +

          (
            100 -
            verifiedState.energy
          ) *
          0.20

          +

          verifiedState.cyb *
          0.20

          +

          verifiedState.inf *
          0.15

          +

          verifiedState.dc *
          0.15

        );


  const normalized =
    normalizeGoldenRatio(
      calculatedRawStress
    );


  const risk =
    classifyRisk(
      normalized.resilienceScore
    );


  const assessment = {

    ...normalized,

    risk

  };


  /* ==========================================================
     DECIDE
     ==========================================================
   */

  const decision =
    determineCaptainLenaDecision(
      assessment,
      verifiedState
    );


  /* ==========================================================
     ACT
     ==========================================================
   */

  const actionSequence = [

    "CONFIRM SYSTEM STATE",

    "APPLY SELECTED MITIGATION",

    decision.action,

    "MONITOR SYSTEM RESPONSE"

  ];


  /* ==========================================================
     UPDATE
     ==========================================================
   */

  const updatedState = {

    ...verifiedState,

    lastDecision:
      decision.decision,

    lastAction:
      decision.action,

    updatedAt:
      new Date()
        .toISOString()

  };


  return {

    system:
      "SPD V13.1",

    engine:
      "SPD V13 SEXTANT GOLDEN RULE ENGINE",

    pipeline:
      GOLDEN_RULE_STAGES,

    observedState,

    verifiedState,

    domainRuleResult,

    assessment,

    decision,

    actionSequence,

    updatedState,

    parameterVerification: {

      status:
        parameterVerification.boundaryStatus,

      verified:
        parameterVerification.verified,

      violations:
        parameterVerification.violations

    },

    status:
      "COMPLETE",

    timestamp:
      new Date()
        .toISOString()

  };

}


/* ============================================================
   RE-TEST VALIDATION
   ============================================================
 *
 * Executes the engine again using the updated state.
 *
 * The re-test confirms:
 *
 * 1. Engine remains executable.
 * 2. Parameters remain within boundaries.
 * 3. Golden Ratio normalization remains valid.
 * 4. Risk classification remains deterministic.
 * 5. Captain AI Lena decision remains valid.
 *
 * ============================================================
 */

export function runRetest(
  initialResult
) {

  if (
    !initialResult
  ) {

    return {

      status:
        "RETEST_FAILED",

      passed:
        false,

      reason:
        "NO INITIAL ENGINE RESULT"

    };

  }


  const retestResult =
    runEngine({

      state:
        initialResult.updatedState,

      event:
        initialResult.updatedState.event,

      scenario:
        initialResult.updatedState.scenario,

      intensity:
        initialResult.updatedState.intensity,

      mode:
        initialResult.updatedState.mode,

      domainRuleResult:
        initialResult.domainRuleResult

    });


  const parameterVerification =
    verifyCoreParameters(
      retestResult.updatedState
    );


  const passed =

    retestResult.status ===
      "COMPLETE"

    &&

    parameterVerification.verified

    &&

    Array.isArray(
      retestResult.pipeline
    )

    &&

    retestResult.pipeline.length ===
      GOLDEN_RULE_STAGES.length;


  return {

    status:

      passed

        ? "PASS"

        : "FAIL",

    passed,

    engineStatus:
      retestResult.status,

    risk:
      retestResult.assessment.risk,

    resilienceScore:
      retestResult.assessment.resilienceScore,

    decision:
      retestResult.decision,

    parameterVerification,

    result:
      retestResult,

    timestamp:
      new Date()
        .toISOString()

  };

}


/* ============================================================
   COMPLETE RESILIENCE LOOP
   ============================================================
 *
 * FIN RULE
 * ↓
 * GOLDEN RATIO NORMALIZATION
 * ↓
 * CORE PARAMETER BOUNDARY
 * ↓
 * CAPTAIN AI LENA DECISION
 * ↓
 * ACTION
 * ↓
 * RE-TEST
 * ↓
 * PARAMETER VERIFICATION
 *
 * ============================================================
 */

export function runResilienceLoop(
  input = {}
) {

  const initialResult =
    runEngine(
      input
    );


  const retest =
    runRetest(
      initialResult
    );


  const finalParameterVerification =
    verifyCoreParameters(
      retest?.result?.updatedState ??
      initialResult.updatedState
    );


  const finalStatus =

    retest.status ===
      "PASS"

    &&

    finalParameterVerification.verified

      ? "VALIDATION COMPLETE"

      : "VALIDATION FAILED";


  return {

    ...initialResult,

    retest: {

      status:
        retest.status,

      passed:
        retest.passed,

      risk:
        retest.risk,

      resilienceScore:
        retest.resilienceScore,

      decision:
        retest.decision,

      parameterVerification:
        retest.parameterVerification,

      timestamp:
        retest.timestamp

    },

    finalParameterVerification,

    finalStatus,

    resilienceLoop: [

      "FIN RULE",

      "GOLDEN RATIO NORMALIZATION",

      "CORE PARAMETER BOUNDARY",

      "CAPTAIN AI LENA DECISION",

      "ACTION",

      "RE-TEST",

      "PARAMETER VERIFICATION"

    ]

  };

}


/* ============================================================
   DEFAULT EXPORT
   ============================================================
 */

export default {

  PHI,

  GOLDEN_RULE_STAGES,

  CORE_PARAMETER_BOUNDARY,

  verifyCoreParameters,

  normalizeGoldenRatio,

  classifyRisk,

  determineCaptainLenaDecision,

  runEngine,

  runRetest,

  runResilienceLoop

};