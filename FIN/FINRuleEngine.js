FINRuleEngine.js

/**
 * SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
 * FINRuleEngine
 *
 * Financial Resilience Domain Rule Engine
 *
 * Purpose:
 * Maps FIN scenarios to governed FIN rules and produces
 * deterministic simulation assessments for the SPD v13.1
 * Captain AI Lena decision-support pipeline.
 *
 * Execution authority:
 * HUMAN_OPERATOR
 *
 * The engine provides decision support only.
 * It does not independently execute recovery actions.
 */

const FIN_RULES = {
  "FIN-001": {
    id: "FIN-001",
    name: "FX Stress",
    scenario: "FX_SHOCK",
    category: "Foreign Exchange",
    file: "FIN/FIN-001.md"
  },

  "FIN-002": {
    id: "FIN-002",
    name: "Bond Outflow Stress",
    scenario: "BOND_OUTFLOW",
    category: "Sovereign Bond Market",
    file: "FIN/FIN-002.md"
  },

  "FIN-003": {
    id: "FIN-003",
    name: "Liquidity Stress",
    scenario: "LIQUIDITY_CRISIS",
    category: "Liquidity Risk",
    file: "FIN/FIN-003.md"
  },

  "FIN-004": {
    id: "FIN-004",
    name: "Banking Stress",
    scenario: "BANKING_STRESS",
    category: "Banking System Stability",
    file: "FIN/FIN-004.md"
  },

  "FIN-005": {
    id: "FIN-005",
    name: "Inflation Shock",
    scenario: "INFLATION_SHOCK",
    category: "Inflation Risk",
    file: "FIN/FIN-005.md"
  }
};


/*
 * Scenario aliases.
 *
 * These allow the cockpit to use different scenario names
 * while maintaining one authoritative FIN rule mapping.
 */

const FIN_SCENARIO_MAP = {
  FX_SHOCK: "FIN-001",
  FIN_STRESS: "FIN-001",

  BOND_OUTFLOW: "FIN-002",
  BOND_MARKET_STRESS: "FIN-002",

  LIQUIDITY_CRISIS: "FIN-003",
  LIQUIDITY_STRESS: "FIN-003",

  BANKING_STRESS: "FIN-004",
  BANKING_CRISIS: "FIN-004",

  INFLATION_SHOCK: "FIN-005",
  INFLATION_STRESS: "FIN-005"
};


/*
 * Clamp numeric inputs to the deterministic
 * 0–100 simulation range.
 */

function clamp(value, minimum = 0, maximum = 100) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return minimum;
  }

  return Math.max(minimum, Math.min(maximum, number));
}


/*
 * Resolve a cockpit scenario to its governed FIN rule.
 */

function resolveFINRule(scenario) {

  const normalizedScenario = String(scenario || "")
    .trim()
    .toUpperCase();

  const ruleId = FIN_SCENARIO_MAP[normalizedScenario];

  if (!ruleId) {
    return {
      success: false,
      domain: "FIN",
      error: "FIN_SCENARIO_NOT_REGISTERED",
      scenario: normalizedScenario
    };
  }

  return {
    success: true,
    domain: "FIN",
    ruleId,
    rule: FIN_RULES[ruleId]
  };
}


/*
 * Determine deterministic risk level.
 *
 * 0–29   GREEN
 * 30–49  YELLOW
 * 50–69  ORANGE
 * 70–100 RED
 */

function classifyRisk(stress) {

  const value = clamp(stress);

  if (value < 30) {
    return "GREEN";
  }

  if (value < 50) {
    return "YELLOW";
  }

  if (value < 70) {
    return "ORANGE";
  }

  return "RED";
}


/*
 * Convert risk into a resilience score.
 */

function calculateResilience(stress) {

  return Math.max(
    0,
    Number((100 - clamp(stress)).toFixed(6))
  );
}


/*
 * Calculate deterministic FIN stress.
 *
 * Scenario-specific indicators are weighted according
 * to their relevance to the selected financial scenario.
 */

function calculateFINStress(scenario, input = {}) {

  const normalizedScenario = String(scenario || "")
    .trim()
    .toUpperCase();

  const intensity = clamp(input.intensity, 0, 100);

  let baseStress = 0;

  switch (normalizedScenario) {

    case "FX_SHOCK":
    case "FIN_STRESS":

      baseStress =
        clamp(input.fx) * 0.40 +
        clamp(input.liquidity) * 0.15 +
        clamp(input.market) * 0.15 +
        clamp(input.sovereignDebt) * 0.10 +
        clamp(input.credit) * 0.10 +
        clamp(input.banking) * 0.10;

      break;


    case "BOND_OUTFLOW":
    case "BOND_MARKET_STRESS":

      baseStress =
        clamp(input.sovereignDebt) * 0.35 +
        clamp(input.market) * 0.25 +
        clamp(input.liquidity) * 0.20 +
        clamp(input.credit) * 0.10 +
        clamp(input.fx) * 0.10;

      break;


    case "LIQUIDITY_CRISIS":
    case "LIQUIDITY_STRESS":

      baseStress =
        clamp(input.liquidity) * 0.45 +
        clamp(input.banking) * 0.20 +
        clamp(input.credit) * 0.15 +
        clamp(input.market) * 0.10 +
        clamp(input.sovereignDebt) * 0.05 +
        clamp(input.fx) * 0.05;

      break;


    case "BANKING_STRESS":
    case "BANKING_CRISIS":

      baseStress =
        clamp(input.banking) * 0.40 +
        clamp(input.liquidity) * 0.20 +
        clamp(input.credit) * 0.15 +
        clamp(input.market) * 0.10 +
        clamp(input.sovereignDebt) * 0.10 +
        clamp(input.fx) * 0.05;

      break;


    case "INFLATION_SHOCK":
    case "INFLATION_STRESS":

      baseStress =
        clamp(input.inflation) * 0.40 +
        clamp(input.fx) * 0.15 +
        clamp(input.market) * 0.10 +
        clamp(input.credit) * 0.10 +
        clamp(input.liquidity) * 0.10 +
        clamp(input.energy) * 0.15;

      break;


    default:

      baseStress =
        clamp(input.fx) * 0.20 +
        clamp(input.liquidity) * 0.20 +
        clamp(input.banking) * 0.15 +
        clamp(input.credit) * 0.15 +
        clamp(input.sovereignDebt) * 0.10 +
        clamp(input.market) * 0.10 +
        clamp(input.inflation) * 0.05 +
        clamp(input.energy) * 0.05;
  }


  /*
   * Intensity modifies the scenario stress.
   *
   * 50% intensity = 1.0 multiplier
   * 100% intensity = 1.5 multiplier
   */

  const intensityFactor =
    Number((0.5 + intensity / 100).toFixed(6));

  const stress =
    Number((baseStress * intensityFactor).toFixed(6));

  return {
    baseStress: Number(baseStress.toFixed(6)),
    intensity,
    intensityFactor,
    stress,
    resilienceScore: calculateResilience(stress),
    risk: classifyRisk(stress)
  };
}


/*
 * Generate deterministic cascade information.
 */

function generateCascade(scenario, risk) {

  if (risk === "GREEN") {
    return {
      cascade: [],
      affectedDomains: ["FIN"],
      status: "NO_SIGNIFICANT_CASCADE"
    };
  }

  switch (scenario) {

    case "FX_SHOCK":
    case "FIN_STRESS":

      return {
        cascade: [
          "FX_STRESS",
          "INFLATION_PRESSURE",
          "INTEREST_RATE_PRESSURE",
          "LIQUIDITY_TIGHTENING",
          "FINANCIAL_MARKET_STRESS"
        ],
        affectedDomains: ["FIN", "INF", "CYB", "DC"],
        status: "CASCADE_IDENTIFIED"
      };


    case "BOND_OUTFLOW":
    case "BOND_MARKET_STRESS":

      return {
        cascade: [
          "BOND_OUTFLOW",
          "HIGHER_BORROWING_COSTS",
          "LIQUIDITY_TIGHTENING",
          "FINANCIAL_MARKET_STRESS"
        ],
        affectedDomains: ["FIN", "INF", "CYB", "DC"],
        status: "CASCADE_IDENTIFIED"
      };


    case "LIQUIDITY_CRISIS":
    case "LIQUIDITY_STRESS":

      return {
        cascade: [
          "LIQUIDITY_STRESS",
          "FUNDING_CONSTRAINTS",
          "CREDIT_TIGHTENING",
          "FINANCIAL_MARKET_PRESSURE"
        ],
        affectedDomains: ["FIN", "INF", "CYB", "DC"],
        status: "CASCADE_IDENTIFIED"
      };


    case "BANKING_STRESS":
    case "BANKING_CRISIS":

      return {
        cascade: [
          "BANKING_STRESS",
          "CREDIT_TIGHTENING",
          "REDUCED_LENDING",
          "ECONOMIC_SLOWDOWN"
        ],
        affectedDomains: ["FIN", "INF", "CYB", "DC"],
        status: "CASCADE_IDENTIFIED"
      };


    case "INFLATION_SHOCK":
    case "INFLATION_STRESS":

      return {
        cascade: [
          "INFLATION_SHOCK",
          "INTEREST_RATE_PRESSURE",
          "REDUCED_CONSUMER_SPENDING",
          "ECONOMIC_SLOWDOWN"
        ],
        affectedDomains: ["FIN", "INF", "CYB", "DC"],
        status: "CASCADE_IDENTIFIED"
      };


    default:

      return {
        cascade: [],
        affectedDomains: ["FIN"],
        status: "NO_DEFINED_CASCADE"
      };
  }
}


/*
 * Generate deterministic contingency recommendations.
 *
 * These are recommendations only.
 */

function generateContingencyActions(risk) {

  switch (risk) {

    case "GREEN":

      return [
        "MONITOR_FINANCIAL_CONDITIONS"
      ];


    case "YELLOW":

      return [
        "INCREASE_MONITORING_FREQUENCY",
        "REVIEW_FINANCIAL_INDICATORS",
        "REVIEW_LIQUIDITY_CONDITIONS"
      ];


    case "ORANGE":

      return [
        "PREPARE_CONTINGENCY_MEASURES",
        "STRENGTHEN_FINANCIAL_MONITORING",
        "ASSESS_SYSTEMIC_RISK",
        "INCREASE_REPORTING_FREQUENCY"
      ];


    case "RED":

      return [
        "ESCALATE_TO_INSTITUTIONAL_RISK_MANAGEMENT",
        "ACTIVATE_EMERGENCY_RESPONSE_PROCEDURES",
        "ASSESS_SYSTEMIC_FINANCIAL_RISK",
        "INCREASE_REPORTING_FREQUENCY"
      ];


    default:

      return [
        "MONITOR_FINANCIAL_CONDITIONS"
      ];
  }
}


/*
 * Generate decision-support recommendation.
 */

function generateDecision(risk) {

  switch (risk) {

    case "GREEN":

      return {
        action: "MAINTAIN_FINANCIAL_MONITORING",
        priority: "NORMAL"
      };


    case "YELLOW":

      return {
        action: "INCREASE_FINANCIAL_MONITORING",
        priority: "ELEVATED"
      };


    case "ORANGE":

      return {
        action: "PREPARE_FINANCIAL_CONTINGENCY",
        priority: "HIGH"
      };


    case "RED":

      return {
        action: "ESCALATE_FINANCIAL_STABILITY_RESPONSE",
        priority: "CRITICAL"
      };


    default:

      return {
        action: "MAINTAIN_FINANCIAL_MONITORING",
        priority: "NORMAL"
      };
  }
}


/*
 * Main FIN evaluation function.
 */

function evaluateFINScenario(scenario, input = {}) {

  const ruleResolution = resolveFINRule(scenario);

  if (!ruleResolution.success) {
    return ruleResolution;
  }

  const rule = ruleResolution.rule;

  const assessment =
    calculateFINStress(scenario, input);

  const cascade =
    generateCascade(
      scenario,
      assessment.risk
    );

  const contingencyActions =
    generateContingencyActions(
      assessment.risk
    );

  const decision =
    generateDecision(
      assessment.risk
    );

  return {

    success: true,

    domain: "FIN",

    domainName: "Financial Resilience",

    rule: {
      id: rule.id,
      name: rule.name,
      version: "1.0",
      category: rule.category,
      file: rule.file
    },

    scenario,

    intensity: assessment.intensity,

    assessment,

    cascade,

    contingencyActions,

    decision: {
      ...decision,
      executionAuthority: "HUMAN_OPERATOR",
      executionStatus:
        "HUMAN_AUTHORIZATION_REQUIRED"
    },

    governance: {
      ruleControlled: true,
      deterministic: true,
      autonomousExecution: false,
      humanAuthorizationRequired: true
    },

    audit: {
      source: "SPD v13.1 COCKPIT",
      engine: "FINRuleEngine",
      ruleId: rule.id,
      domain: "FIN",
      scenario,
      timestamp: new Date().toISOString()
    },

    status: "FIN_EVALUATION_COMPLETE"
  };
}


/*
 * Domain registration interface.
 */

function getFINDomainStatus() {

  return {
    id: "FIN",
    name: "Financial Resilience",
    status: "ACTIVE",
    engineRegistered: true,
    evaluateAvailable: true,
    ruleCount: Object.keys(FIN_RULES).length,
    rules: Object.keys(FIN_RULES)
  };
}


/*
 * Public API.
 */

const FINRuleEngine = {

  domain: "FIN",

  name: "Financial Resilience",

  version: "1.0",

  rules: FIN_RULES,

  scenarioMap: FIN_SCENARIO_MAP,

  resolveRule: resolveFINRule,

  evaluate: evaluateFINScenario,

  getStatus: getFINDomainStatus

};


/*
 * Browser / module compatibility.
 */

if (typeof window !== "undefined") {
  window.FINRuleEngine = FINRuleEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FINRuleEngine;
}

File purpose

This file gives the SPD system a deterministic interface:

FIN scenario
     ↓
FINRuleEngine
     ↓
FIN-001 ... FIN-005
     ↓
Assessment
     ↓
Risk
     ↓
Cascade
     ↓
Contingency
     ↓
Captain AI Lena
     ↓
Human Authorization
     ↓
Audit + Memory

Important: this is the engine layer. We should not connect it to the cockpit yet until we test the engine independently. That prevents a bad mapping or calculation from contaminating the live simulator.

Next we should create "FIN/FINRuleEngine.test.js" and test all five rules automatically before wiring it into "domainIntegration.js".