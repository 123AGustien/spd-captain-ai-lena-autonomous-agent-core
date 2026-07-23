/**
 * ============================================================
 * SPD V13 — FIN DOMAIN RULE ENGINE
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
 * the SPD v13 Captain AI Lena Autonomous Agent Core.
 *
 * Architecture:
 *
 * COCKPIT SCENARIO
 *       ↓
 * domainIntegration.js
 *       ↓
 * FIN RULE ENGINE
 *       ↓
 * FIN RULE REGISTRY
 *       ↓
 * FIN ASSESSMENT
 *       ↓
 * CAPTAIN AI LENA DECISION CORE
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
 * The FIN engine does not replace the Captain AI Lena
 * decision core. It provides domain-specific assessment
 * and recommendations to the authoritative decision layer.
 * ============================================================
 */


/**
 * ============================================================
 * FIN SCENARIO DEFINITIONS
 * ============================================================
 */

const FIN_SCENARIOS = {

  FIN_STRESS: {
    id: "FIN_STRESS",
    category: "FINANCIAL_SYSTEM_STRESS",
    description:
      "General financial system stress affecting interconnected financial conditions."
  },

  BANKING_STRESS: {
    id: "BANKING_STRESS",
    category: "BANKING_SYSTEM_STABILITY",
    description:
      "Stress affecting banking-sector stability and potential systemic contagion."
  },

  LIQUIDITY_CRISIS: {
    id: "LIQUIDITY_CRISIS",
    category: "LIQUIDITY_RESILIENCE",
    description:
      "Reduced liquidity availability and increased funding pressure."
  },

  CREDIT_STRESS: {
    id: "CREDIT_STRESS",
    category: "CREDIT_RESILIENCE",
    description:
      "Deterioration in credit conditions and increased default pressure."
  },

  SOVEREIGN_DEBT: {
    id: "SOVEREIGN_DEBT",
    category: "SOVEREIGN_FINANCIAL_RESILIENCE",
    description:
      "Sovereign debt stress and potential financial-system transmission effects."
  }

};


/**
 * ============================================================
 * MAIN FIN RULE ENGINE
 * ============================================================
 */

export function finRuleEngine(input = {}) {

  const state = normalizeFINState(input);

  const scenario =
    FIN_SCENARIOS[state.scenario] ||
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
      "SPD V13 FINANCIAL RESILIENCE RULE ENGINE",

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
 */

function normalizeFINState(input) {

  const intensity =
    clamp(
      Number(input?.intensity ?? 50),
      0,
      100
    );

  return {

    scenario:
      input?.scenario ??
      "FIN_STRESS",

    intensity,

    intensityFactor:
      intensity / 100,

    fx:
      normalizeMetric(input?.fx),

    energy:
      normalizeMetric(input?.energy, 50),

    cyb:
      normalizeMetric(input?.cyb),

    inf:
      normalizeMetric(input?.inf),

    dc:
      normalizeMetric(input?.dc),

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
 * FINANCIAL RISK ASSESSMENT
 * ============================================================
 *
 * Financial domain stress is calculated independently from
 * the core engine.
 *
 * The result is returned to Captain AI Lena for final
 * deterministic decision processing.
 * ============================================================
 */

function assessFinancialRisk(
  state,
  scenario
) {

  let baseStress = 0;

  switch (scenario.id) {

    case "BANKING_STRESS":

      baseStress =
        (
          state.fx * 0.20 +
          state.inf * 0.15 +
          state.dc * 0.10 +
          state.cyb * 0.10 +
          (100 - state.energy) * 0.10
        );

      break;


    case "LIQUIDITY_CRISIS":

      baseStress =
        (
          state.fx * 0.20 +
          state.inf * 0.10 +
          state.dc * 0.10 +
          state.cyb * 0.05 +
          (100 - state.energy) * 0.20
        );

      break;


    case "CREDIT_STRESS":

      baseStress =
        (
          state.fx * 0.15 +
          state.inf * 0.20 +
          state.dc * 0.10 +
          state.cyb * 0.10 +
          (100 - state.energy) * 0.10
        );

      break;


    case "SOVEREIGN_DEBT":

      baseStress =
        (
          state.fx * 0.25 +
          state.inf * 0.20 +
          state.dc * 0.10 +
          state.cyb * 0.05 +
          (100 - state.energy) * 0.10
        );

      break;


    case "FIN_STRESS":

    default:

      baseStress =
        (
          state.fx * 0.20 +
          state.inf * 0.15 +
          state.dc * 0.10 +
          state.cyb * 0.10 +
          (100 - state.energy) * 0.15
        );

      break;

  }


  const intensityAdjustedStress =
    baseStress *
    state.intensityFactor;


  const financialStress =
    Math.min(
      100,
      intensityAdjustedStress
    );


  const resilienceScore =
    Math.max(
      0,
      100 - financialStress
    );


  const risk =
    classifyFINRisk(
      financialStress
    );


  return {

    financialStress,

    resilienceScore,

    risk,

    intensity:
      state.intensity,

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
    financialStress < 30
  ) {

    return "LOW";

  }


  if (
    financialStress < 50
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
 * This provides a domain recommendation.
 *
 * Captain AI Lena remains the authoritative final
 * decision authority.
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
          "FINANCIAL STABILIZATION",

        decision:
          "ACTIVATE FINANCIAL STABILIZATION MODE"

      };


    case "MEDIUM":

      return {

        mode:
          "FINANCIAL PREVENTION",

        decision:
          "ACTIVATE PREVENTIVE FINANCIAL RESILIENCE MODE"

      };


    case "LOW":

    default:

      return {

        mode:
          "FINANCIAL MONITORING",

        decision:
          "CONTINUE FINANCIAL RESILIENCE MONITORING"

      };

  }

}


/**
 * ============================================================
 * FIN ACTION LAYER
 * ============================================================
 */

function determineFINAction(
  decision
) {

  switch (
    decision.mode
  ) {

    case "FINANCIAL STABILIZATION":

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


    case "FINANCIAL PREVENTION":

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


    case "FINANCIAL MONITORING":

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
          "