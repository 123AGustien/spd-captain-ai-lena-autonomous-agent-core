/**
 * ============================================================
 * SPD V13.1 — FIN DOMAIN RULE ENGINE
 * ============================================================
 *
 * File:
 * FIN/fin-rule-engine.js
 *
 * Domain:
 * FIN — Financial Resilience
 *
 * Purpose:
 * Provide deterministic financial-domain assessment for
 * the SPD v13.1 Captain AI Lena Autonomous Agent Core.
 *
 * Architecture:
 *
 * COCKPIT SCENARIO
 *       ↓
 * domainIntegration.js
 *       ↓
 * FIN RULE ENGINE
 *       ↓
 * FIN RULE REGISTRY / SCENARIO RULES
 *       ↓
 * FIN ASSESSMENT
 *       ↓
 * AUTHORITATIVE CORE ENGINE
 *       ↓
 * CAPTAIN AI LENA DECISION
 *       ↓
 * ACTION
 *       ↓
 * UPDATE / RE-TEST
 *
 * Supported scenarios:
 *
 * FIN_STRESS
 * BANKING_STRESS
 * LIQUIDITY_CRISIS
 * CREDIT_STRESS
 * SOVEREIGN_DEBT
 *
 * Deterministic execution.
 * No machine learning.
 * No randomness.
 *
 * IMPORTANT:
 *
 * The FIN engine provides domain-specific assessment,
 * decision recommendation, and action guidance.
 *
 * It does NOT replace the authoritative Captain AI Lena
 * decision core located in the SPD v13.1 core engine.
 *
 * ============================================================
 */


/**
 * ============================================================
 * FIN SCENARIO DEFINITIONS
 * ============================================================
 */

const FIN_SCENARIOS = {

  FIN_STRESS: {

    id:
      "FIN_STRESS",

    category:
      "FINANCIAL_SYSTEM_STRESS",

    description:
      "General financial system stress affecting interconnected financial conditions."

  },


  BANKING_STRESS: {

    id:
      "BANKING_STRESS",

    category:
      "BANKING_SYSTEM_STABILITY",

    description:
      "Stress affecting banking-sector stability and potential systemic contagion."

  },


  LIQUIDITY_CRISIS: {

    id:
      "LIQUIDITY_CRISIS",

    category:
      "LIQUIDITY_RESILIENCE",

    description:
      "Reduced liquidity availability and increased funding pressure."

  },


  CREDIT_STRESS: {

    id:
      "CREDIT_STRESS",

    category:
      "CREDIT_RESILIENCE",

    description:
      "Deterioration in credit conditions and increased default pressure."

  },


  SOVEREIGN_DEBT: {

    id:
      "SOVEREIGN_DEBT",

    category:
      "SOVEREIGN_FINANCIAL_RESILIENCE",

    description:
      "Sovereign debt stress and potential financial-system transmission effects."

  }

};


/**
 * ============================================================
 * MAIN FIN RULE ENGINE
 * ============================================================
 */

export function finRuleEngine(
  input = {}
) {

  const state =
    normalizeFINState(
      input
    );


  const scenario =
    FIN_SCENARIOS[
      state.scenario
    ] ||
    FIN_SCENARIOS.FIN_STRESS;


  const assessment =
    assessFinancialRisk(
      state,
      scenario
    );


  const decision =
    determineFINDecision(
      assessment
    );


  const action =
    determineFINAction(
      decision
    );


  return {

    domain:
      "FIN",

    engine:
      "SPD V13.1 FINANCIAL RESILIENCE RULE ENGINE",

    scenario:
      scenario.id,

    category:
      scenario.category,

    intensity:
      state.intensity,

    intensityFactor:
      state.intensityFactor,

    description:
      scenario.description,

    input:
      state,

    assessment,

    decision,

    action,

    status:
      "COMPLETE"

  };

}


/**
 * ============================================================
 * INPUT NORMALIZATION
 * ============================================================
 *
 * Supports:
 *
 * 1. Nested state:
 *
 * {
 *   scenario: "FIN_STRESS",
 *   intensity: 40,
 *   state: {
 *     fx: 12,
 *     energy: 25,
 *     cyb: 40,
 *     inf: 10,
 *     dc: 20
 *   }
 * }
 *
 * 2. Direct state:
 *
 * {
 *   scenario: "FIN_STRESS",
 *   intensity: 40,
 *   fx: 12,
 *   energy: 25,
 *   cyb: 40,
 *   inf: 10,
 *   dc: 20
 * }
 *
 * This ensures compatibility with:
 *
 * domainIntegration.js
 *
 * and direct FIN engine testing.
 *
 * ============================================================
 */

function normalizeFINState(
  input
) {

  const intensity =
    clamp(
      Number(
        input?.intensity ??
        50
      ),
      0,
      100
    );


  /*
   * Prefer the nested state object supplied by
   * domainIntegration.js.
   *
   * Fall back to input itself for direct execution.
   */

  const sourceState =
    input?.state ??
    input;


  return {

    scenario:
      normalizeScenario(
        input?.scenario ??
        input?.event ??
        "FIN_STRESS"
      ),


    intensity,


    intensityFactor:
      intensity / 100,


    fx:
      normalizeMetric(
        sourceState?.fx
      ),


    energy:
      normalizeMetric(
        sourceState?.energy,
        50
      ),


    cyb:
      normalizeMetric(
        sourceState?.cyb
      ),


    inf:
      normalizeMetric(
        sourceState?.inf
      ),


    dc:
      normalizeMetric(
        sourceState?.dc
      ),


    mode:
      input?.mode ??
      "AUTONOMOUS",


    time:
      input?.time ??
      new Date().toISOString()

  };

}


/**
 * ============================================================
 * SCENARIO NORMALIZATION
 * ============================================================
 */

function normalizeScenario(
  scenario
) {

  const normalized =
    String(
      scenario ||
      "FIN_STRESS"
    )
      .trim()
      .toUpperCase();


  const aliases = {

    FIN_STRESS:
      "FIN_STRESS",

    FINANCIAL_STRESS:
      "FIN_STRESS",

    BANKING_STRESS:
      "BANKING_STRESS",

    BANK_STRESS:
      "BANKING_STRESS",

    LIQUIDITY_CRISIS:
      "LIQUIDITY_CRISIS",

    LIQUIDITY_STRESS:
      "LIQUIDITY_CRISIS",

    CREDIT_STRESS:
      "CREDIT_STRESS",

    CREDIT_CRISIS:
      "CREDIT_STRESS",

    SOVEREIGN_DEBT:
      "SOVEREIGN_DEBT",

    DEBT_STRESS:
      "SOVEREIGN_DEBT"

  };


  return (

    aliases[
      normalized
    ] ??

    "FIN_STRESS"

  );

}


/**
 * ============================================================
 * FINANCIAL RISK ASSESSMENT
 * ============================================================
 *
 * Financial domain stress is calculated independently
 * from the authoritative core engine.
 *
 * Intensity is applied to the domain-specific base stress.
 *
 * Therefore:
 *
 * intensity = 0
 * → financialStress = 0
 *
 * intensity = 50
 * → 50% of base financial stress
 *
 * intensity = 100
 * → 100% of base financial stress
 *
 * ============================================================
 */

function assessFinancialRisk(
  state,
  scenario
) {

  let baseStress =
    0;


  switch (
    scenario.id
  ) {


    /**
     * ========================================================
     * BANKING STRESS
     * ========================================================
     */

    case "BANKING_STRESS":

      baseStress =
        (

          state.fx *
          0.20

          +

          state.inf *
          0.15

          +

          state.dc *
          0.10

          +

          state.cyb *
          0.10

          +

          (
            100 -
            state.energy
          ) *
          0.10

        );

      break;


    /**
     * ========================================================
     * LIQUIDITY CRISIS
     * ========================================================
     */

    case "LIQUIDITY_CRISIS":

      baseStress =
        (

          state.fx *
          0.20

          +

          state.inf *
          0.10

          +

          state.dc *
          0.10

          +

          state.cyb *
          0.05

          +

          (
            100 -
            state.energy
          ) *
          0.20

        );

      break;


    /**
     * ========================================================
     * CREDIT STRESS
     * ========================================================
     */

    case "CREDIT_STRESS":

      baseStress =
        (

          state.fx *
          0.15

          +

          state.inf *
          0.20

          +

          state.dc *
          0.10

          +

          state.cyb *
          0.10

          +

          (
            100 -
            state.energy
          ) *
          0.10

        );

      break;


    /**
     * ========================================================
     * SOVEREIGN DEBT
     * ========================================================
     */

    case "SOVEREIGN_DEBT":

      baseStress =
        (

          state.fx *
          0.25

          +

          state.inf *
          0.20

          +

          state.dc *
          0.10

          +

          state.cyb *
          0.05

          +

          (
            100 -
            state.energy
          ) *
          0.10

        );

      break;


    /**
     * ========================================================
     * GENERAL FINANCIAL STRESS
     * ========================================================
     */

    case "FIN_STRESS":

    default:

      baseStress =
        (

          state.fx *
          0.20

          +

          state.inf *
          0.15

          +

          state.dc *
          0.10

          +

          state.cyb *
          0.10

          +

          (
            100 -
            state.energy
          ) *
          0.15

        );

      break;

  }


  /*
   * Apply scenario intensity.
   */

  const intensityAdjustedStress =
    baseStress *
    state.intensityFactor;


  /*
   * Prevent stress from exceeding 100.
   */

  const financialStress =
    Math.min(
      100,
      Math.max(
        0,
        intensityAdjustedStress
      )
    );


  /*
   * Calculate resilience.
   */

  const resilienceScore =
    Math.max(
      0,
      100 -
      financialStress
    );


  /*
   * Classify financial risk.
   */

  const risk =
    classifyFINRisk(
      financialStress
    );


  return {

    baseStress,

    financialStress,

    resilienceScore,

    risk,

    intensity:
      state.intensity,

    intensityFactor:
      state.intensityFactor,

    scenario:
      scenario.id

  };

}


/**
 * ============================================================
 * FINANCIAL RISK CLASSIFICATION
 * ============================================================
 */

function classifyFINRisk(
  financialStress
) {

  if (
    financialStress <
    30
  ) {

    return "LOW";

  }


  if (
    financialStress <
    50
  ) {

    return "MEDIUM";

  }


  return "HIGH";

}


/**
 * ============================================================
 * FIN DECISION LAYER
 * ============================================================
 *
 * This provides a domain-level recommendation.
 *
 * Captain AI Lena remains the authoritative final
 * decision authority.
 *
 * ============================================================
 */

function determineFINDecision(
  assessment
) {

  switch (
    assessment.risk
  ) {


    case "HIGH":

      return {

        mode:
          "FINANCIAL_STABILIZATION",

        decision:
          "ACTIVATE FINANCIAL STABILIZATION MODE"

      };


    case "MEDIUM":

      return {

        mode:
          "FINANCIAL_PREVENTION",

        decision:
          "ACTIVATE PREVENTIVE FINANCIAL RESILIENCE MODE"

      };


    case "LOW":

    default:

      return {

        mode:
          "FINANCIAL_MONITORING",

        decision:
          "CONTINUE FINANCIAL RESILIENCE MONITORING"

      };

  }

}


/**
 * ============================================================
 * FIN ACTION LAYER
 * ============================================================
 *
 * Converts the domain recommendation into an operational
 * action sequence.
 *
 * ============================================================
 */

function determineFINAction(
  decision
) {

  switch (
    decision.mode
  ) {


    /**
     * ========================================================
     * FINANCIAL STABILIZATION
     * ========================================================
     */

    case "FINANCIAL_STABILIZATION":

      return {

        command:
          "STABILIZE FINANCIAL SYSTEM",

        actions: [

          "CONFIRM FINANCIAL SYSTEM STATE",

          "ASSESS BANKING AND LIQUIDITY CONDITIONS",

          "ACTIVATE FINANCIAL STABILIZATION MEASURES",

          "MONITOR SYSTEMIC CONTAGION RISK"

        ],

        status:
          "ACTIVE"

      };


    /**
     * ========================================================
     * FINANCIAL PREVENTION
     * ========================================================
     */

    case "FINANCIAL_PREVENTION":

      return {

        command:
          "ACTIVATE PREVENTIVE FINANCIAL RESILIENCE",

        actions: [

          "CONFIRM FINANCIAL SYSTEM STATE",

          "MONITOR BANKING AND CREDIT CONDITIONS",

          "STRENGTHEN LIQUIDITY RESERVES",

          "MONITOR SYSTEM RESPONSE"

        ],

        status:
          "ACTIVE"

      };


    /**
     * ========================================================
     * FINANCIAL MONITORING
     * ========================================================
     */

    case "FINANCIAL_MONITORING":

    default:

      return {

        command:
          "MONITOR FINANCIAL SYSTEM",

        actions: [

          "CONFIRM FINANCIAL SYSTEM STATE",

          "CONTINUE FINANCIAL RESILIENCE MONITORING",

          "MONITOR SYSTEM RESPONSE"

        ],

        status:
          "ACTIVE"

      };

  }

}


/**
 * ============================================================
 * NUMERIC METRIC NORMALIZATION
 * ============================================================
 *
 * All system metrics are constrained to 0–100.
 *
 * ============================================================
 */

function normalizeMetric(
  value,
  defaultValue = 0
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

    return defaultValue;

  }


  return clamp(
    numericValue,
    0,
    100
  );

}


/**
 * ============================================================
 * CLAMP
 * ============================================================
 */

function clamp(
  value,
  minimum,
  maximum
) {

  return Math.max(

    minimum,

    Math.min(
      maximum,
      value
    )

  );

}


/**
 * ============================================================
 * FIN ENGINE TEST HELPER
 * ============================================================
 *
 * Provides a deterministic diagnostic test for direct
 * FIN engine execution.
 *
 * This does not replace the authoritative SPD v13.1
 * self-test engine.
 *
 * ============================================================
 */

export function testFINRuleEngine() {

  const testState = {

    scenario:
      "FIN_STRESS",

    intensity:
      100,

    state: {

      fx:
        12,

      energy:
        25,

      cyb:
        40,

      inf:
        10,

      dc:
        20

    },

    mode:
      "AUTONOMOUS"

  };


  const result =
    finRuleEngine(
      testState
    );


  return {

    engine:
      "SPD V13.1 FINANCIAL RESILIENCE RULE ENGINE",

    test:
      "FIN_STRESS_100_PERCENT",

    status:
      result.status,

    scenario:
      result.scenario,

    intensity:
      result.intensity,

    intensityFactor:
      result.intensityFactor,

    assessment:
      result.assessment,

    decision:
      result.decision,

    action:
      result.action

  };

}


/**
 * ============================================================
 * FIN ENGINE STATUS
 * ============================================================
 */

export const FIN_ENGINE_STATUS = {

  domain:
    "FIN",

  name:
    "Financial Resilience",

  engine:
    "SPD V13.1 FINANCIAL RESILIENCE RULE ENGINE",

  deterministic:
    true,

  machineLearning:
    false,

  randomness:
    false,

  supportedScenarios: [

    "FIN_STRESS",

    "BANKING_STRESS",

    "LIQUIDITY_CRISIS",

    "CREDIT_STRESS",

    "SOVEREIGN_DEBT"

  ],

  pipeline: [

    "OBSERVE",

    "VERIFY",

    "ASSESS",

    "DECIDE",

    "ACT",

    "UPDATE"

  ],

  authority:
    "CAPTAIN AI LENA"

};


/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {

  finRuleEngine,

  testFINRuleEngine,

  FIN_ENGINE_STATUS

};