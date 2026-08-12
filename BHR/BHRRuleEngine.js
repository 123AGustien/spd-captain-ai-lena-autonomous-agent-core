/**
 * SPD v13.1 — BHR DOMAIN RULE ENGINE
 *
 * Business & Human Rights Resilience
 *
 * Domain Integration
 *      ↓
 * BHR Rule Engine
 *      ↓
 * Assessment
 *      ↓
 * Risk / Resilience
 *      ↓
 * Decision Support
 *      ↓
 * Audit
 *
 * Principle:
 * The engine provides deterministic decision support.
 * It does not replace human authority.
 */


/* =========================================================
   BHR CONSTANTS
========================================================= */

const BHR_CONSTANTS = {

  MEDIUM_THRESHOLD: 40,

  HIGH_THRESHOLD: 70,

  MAX_SCORE: 100,

  MIN_SCORE: 0

};


/* =========================================================
   CLAMP VALUE
========================================================= */

function clamp(
  value,
  min = BHR_CONSTANTS.MIN_SCORE,
  max = BHR_CONSTANTS.MAX_SCORE
) {

  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return min;
  }

  return Math.min(
    max,
    Math.max(
      min,
      numeric
    )
  );

}


/* =========================================================
   NORMALIZE INPUT
========================================================= */

function normalizeInput(
  state = {}
) {

  return {

    labour:
      clamp(
        state.labour ??
        state.labor ??
        0
      ),

    humanRights:
      clamp(
        state.humanRights ??
        state.human_rights ??
        0
      ),

    supplyChain:
      clamp(
        state.supplyChain ??
        state.supply_chain ??
        0
      ),

    community:
      clamp(
        state.community ??
        0
      ),

    governance:
      clamp(
        state.governance ??
        0
      ),

    environment:
      clamp(
        state.environment ??
        0
      ),

    intensity:
      clamp(
        state.intensity ??
        0
      )

  };

}


/* =========================================================
   CALCULATE BHR STRESS
========================================================= */

function calculateBHRStress(
  state
) {

  /*
   * Deterministic weighted BHR model.
   *
   * Human rights and labour indicators
   * carry the highest weighting.
   */

  const baseStress =

    (
      state.labour *
      0.20
    ) +

    (
      state.humanRights *
      0.25
    ) +

    (
      state.supplyChain *
      0.15
    ) +

    (
      state.community *
      0.15
    ) +

    (
      state.governance *
      0.15
    ) +

    (
      state.environment *
      0.10
    );


  /*
   * Scenario intensity modifier.
   */

  const intensityFactor =
    1 +
    (
      state.intensity /
      100
    );


  return {

    baseStress:
      clamp(
        baseStress
      ),

    intensityFactor,

    stress:
      clamp(
        baseStress *
        intensityFactor
      )

  };

}


/* =========================================================
   CLASSIFY RISK
========================================================= */

function classifyRisk(
  stress
) {

  if (
    stress <
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    return "LOW";

  }

  if (
    stress <
    BHR_CONSTANTS.HIGH_THRESHOLD
  ) {

    return "MEDIUM";

  }

  return "HIGH";

}


/* =========================================================
   CALCULATE RESILIENCE
========================================================= */

function calculateResilience(
  stress
) {

  return clamp(
    100 -
    stress
  );

}


/* =========================================================
   DETERMINE DECISION
========================================================= */

function determineDecision(
  risk
) {

  switch (risk) {

    case "LOW":

      return {

        action:
          "MAINTAIN_MONITORING",

        priority:
          "NORMAL",

        humanAuthorization:
          "NOT_REQUIRED_FOR_MONITORING"

      };


    case "MEDIUM":

      return {

        action:
          "INITIATE_BHR_MITIGATION_REVIEW",

        priority:
          "ELEVATED",

        humanAuthorization:
          "REQUIRED_BEFORE_EXECUTION"

      };


    case "HIGH":

      return {

        action:
          "ESCALATE_BHR_RISK_AND_MAINTAIN_SAFE_STATE",

        priority:
          "CRITICAL",

        humanAuthorization:
          "REQUIRED_BEFORE_EXECUTION"

      };


    default:

      return {

        action:
          "MAINTAIN_SAFE_STATE",

        priority:
          "UNKNOWN",

        humanAuthorization:
          "REQUIRED"

      };

  }

}


/* =========================================================
   BHR PRINCIPLE CHECK
========================================================= */

function evaluateHumanRightsPrinciples(
  state
) {

  const concerns = [];


  if (
    state.labour >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "LABOUR_RISK"
    );

  }


  if (
    state.humanRights >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "HUMAN_RIGHTS_RISK"
    );

  }


  if (
    state.supplyChain >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "SUPPLY_CHAIN_RISK"
    );

  }


  if (
    state.community >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "COMMUNITY_IMPACT_RISK"
    );

  }


  if (
    state.governance >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "GOVERNANCE_RISK"
    );

  }


  if (
    state.environment >=
    BHR_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "ENVIRONMENTAL_RISK"
    );

  }


  return {

    concerns,

    concernCount:
      concerns.length,

    status:
      concerns.length === 0
        ? "NO_SIGNIFICANT_BHR_CONCERNS"
        : "BHR_CONCERNS_IDENTIFIED"

  };

}


/* =========================================================
   BHR EVALUATION
========================================================= */

function evaluate(
  state = {},
  context = {}
) {

  const normalizedState =
    normalizeInput(
      state
    );


  const stressResult =
    calculateBHRStress(
      normalizedState
    );


  const risk =
    classifyRisk(
      stressResult.stress
    );


  const resilienceScore =
    calculateResilience(
      stressResult.stress
    );


  const principles =
    evaluateHumanRightsPrinciples(
      normalizedState
    );


  const decision =
    determineDecision(
      risk
    );


  return {

    success:
      true,

    domain:
      "BHR",

    domainName:
      "Business & Human Rights Resilience",

    scenario:
      context.scenario ??
      "BHR_ASSESSMENT",

    intensity:
      normalizedState.intensity,

    input:
      normalizedState,

    assessment: {

      baseStress:
        stressResult.baseStress,

      intensityFactor:
        stressResult.intensityFactor,

      stress:
        stressResult.stress,

      resilienceScore,

      risk

    },

    humanRightsPrinciples:
      principles,

    decision,

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      decision.humanAuthorization ===
      "NOT_REQUIRED_FOR_MONITORING"
        ? "MONITORING_ONLY"
        : "HUMAN_AUTHORIZATION_REQUIRED",

    context,

    timestamp:
      new Date().toISOString(),

    status:
      "BHR_EVALUATION_COMPLETE"

  };

}


/* =========================================================
   SELF-CHECK
========================================================= */

function verifyBHREngine() {

  const test =
    evaluate({

      labour: 0,

      humanRights: 0,

      supplyChain: 0,

      community: 0,

      governance: 0,

      environment: 0,

      intensity: 0

    });


  return {

    domain:
      "BHR",

    status:
      test.success &&
      test.assessment.risk === "LOW"
        ? "READY"
        : "NOT_READY",

    testRisk:
      test.assessment.risk,

    testResilienceScore:
      test.assessment.resilienceScore,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  BHR_CONSTANTS,

  clamp,

  normalizeInput,

  calculateBHRStress,

  classifyRisk,

  calculateResilience,

  determineDecision,

  evaluateHumanRightsPrinciples,

  evaluate,

  verifyBHREngine

};
