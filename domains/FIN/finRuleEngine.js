/**
 * SPD v13.1 — FIN DOMAIN RULE ENGINE
 *
 * Financial Resilience
 *
 * Domain Integration
 *      ↓
 * FIN Rule Engine
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
 * The engine provides deterministic financial
 * resilience decision support.
 *
 * It does not replace human authority.
 */


/* =========================================================
   FIN CONSTANTS
========================================================= */

const FIN_CONSTANTS = {

  MEDIUM_THRESHOLD: 40,

  HIGH_THRESHOLD: 70,

  MAX_SCORE: 100,

  MIN_SCORE: 0

};


/* =========================================================
   CLAMP
========================================================= */

function clamp(
  value,
  min = FIN_CONSTANTS.MIN_SCORE,
  max = FIN_CONSTANTS.MAX_SCORE
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

    fx: clamp(
      state.fx ??
      0
    ),

    liquidity: clamp(
      state.liquidity ??
      0
    ),

    banking: clamp(
      state.banking ??
      0
    ),

    credit: clamp(
      state.credit ??
      0
    ),

    sovereignDebt: clamp(
      state.sovereignDebt ??
      state.sovereign_debt ??
      0
    ),

    market: clamp(
      state.market ??
      0
    ),

    intensity: clamp(
      state.intensity ??
      0
    )

  };

}


/* =========================================================
   MAP SCENARIO
========================================================= */

function mapScenario(
  scenario
) {

  switch (scenario) {

    case "FIN_STRESS":
      return "FIN_STRESS";

    case "BANKING_STRESS":
      return "BANKING_STRESS";

    case "LIQUIDITY_CRISIS":
      return "LIQUIDITY_CRISIS";

    case "CREDIT_STRESS":
      return "CREDIT_STRESS";

    case "SOVEREIGN_DEBT":
      return "SOVEREIGN_DEBT";

    default:
      return "FIN_ASSESSMENT";

  }

}


/* =========================================================
   CALCULATE FINANCIAL STRESS
========================================================= */

function calculateFINStress(
  state
) {

  /*
   * Deterministic weighted financial model.
   *
   * Liquidity and banking conditions receive
   * elevated weighting because they can rapidly
   * propagate through the financial system.
   */

  const baseStress =

    (
      state.fx *
      0.15
    ) +

    (
      state.liquidity *
      0.25
    ) +

    (
      state.banking *
      0.20
    ) +

    (
      state.credit *
      0.15
    ) +

    (
      state.sovereignDebt *
      0.15
    ) +

    (
      state.market *
      0.10
    );


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
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    return "LOW";

  }

  if (
    stress <
    FIN_CONSTANTS.HIGH_THRESHOLD
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
  risk,
  scenario
) {

  switch (risk) {

    case "LOW":

      return {

        action:
          "MAINTAIN_FINANCIAL_MONITORING",

        priority:
          "NORMAL",

        humanAuthorization:
          "NOT_REQUIRED_FOR_MONITORING"

      };


    case "MEDIUM":

      return {

        action:
          "INITIATE_FINANCIAL_MITIGATION_REVIEW",

        priority:
          "ELEVATED",

        humanAuthorization:
          "REQUIRED_BEFORE_EXECUTION"

      };


    case "HIGH":

      return {

        action:
          "ESCALATE_FINANCIAL_RISK_AND_MAINTAIN_SAFE_STATE",

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
   FINANCIAL PRINCIPLE CHECK
========================================================= */

function evaluateFinancialIndicators(
  state
) {

  const concerns = [];


  if (
    state.fx >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "FX_RISK"
    );

  }


  if (
    state.liquidity >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "LIQUIDITY_RISK"
    );

  }


  if (
    state.banking >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "BANKING_RISK"
    );

  }


  if (
    state.credit >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "CREDIT_RISK"
    );

  }


  if (
    state.sovereignDebt >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "SOVEREIGN_DEBT_RISK"
    );

  }


  if (
    state.market >=
    FIN_CONSTANTS.MEDIUM_THRESHOLD
  ) {

    concerns.push(
      "MARKET_RISK"
    );

  }


  return {

    concerns,

    concernCount:
      concerns.length,

    status:
      concerns.length === 0
        ? "NO_SIGNIFICANT_FINANCIAL_CONCERNS"
        : "FINANCIAL_CONCERNS_IDENTIFIED"

  };

}


/* =========================================================
   FIN EVALUATION
========================================================= */

function evaluate(
  state = {},
  context = {}
) {

  const normalizedState =
    normalizeInput(
      state
    );


  const scenario =
    mapScenario(
      context.scenario ??
      state.scenario
    );


  const stressResult =
    calculateFINStress(
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


  const indicators =
    evaluateFinancialIndicators(
      normalizedState
    );


  const decision =
    determineDecision(
      risk,
      scenario
    );


  return {

    success:
      true,

    domain:
      "FIN",

    domainName:
      "Financial Resilience",

    scenario,

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

    financialIndicators:
      indicators,

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
      "FIN_EVALUATION_COMPLETE"

  };

}


/* =========================================================
   SELF-CHECK
========================================================= */

function verifyFINEngine() {

  const test =
    evaluate({

      fx: 0,

      liquidity: 0,

      banking: 0,

      credit: 0,

      sovereignDebt: 0,

      market: 0,

      intensity: 0

    });


  return {

    domain:
      "FIN",

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

  FIN_CONSTANTS,

  clamp,

  normalizeInput,

  mapScenario,

  calculateFINStress,

  classifyRisk,

  calculateResilience,

  determineDecision,

  evaluateFinancialIndicators,

  evaluate,

  verifyFINEngine

};