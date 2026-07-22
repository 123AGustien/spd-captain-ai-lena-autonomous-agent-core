/**
 * SPD v13.1 — FINANCIAL RULE ENGINE
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 * Connect FIN domain rules to the deterministic agent pipeline.
 *
 * Pipeline:
 * DATA
 *   ↓
 * ALGORITHMS
 *   ↓
 * COMPUTE
 *   ↓
 * OBSERVE
 *   ↓
 * VERIFY
 *   ↓
 * ASSESS
 *   ↓
 * DECIDE
 *   ↓
 * ACT
 *   ↓
 * UPDATE
 *
 * Current integrated rule:
 * FIN-004 — Banking Stress
 */

const FIN_RULE_ENGINE_VERSION = "1.0.0";

/**
 * FIN Rule Registry
 *
 * The registry maps executable rule IDs to their
 * operational evaluation functions.
 */
const FIN_RULE_REGISTRY = {
  "FIN-004": evaluateFIN004
};

/**
 * FIN-004 — Banking Stress
 *
 * Evaluates banking-sector stress using deterministic
 * system-state indicators.
 *
 * Expected input:
 * {
 *   fx: Number,
 *   energy: Number,
 *   cyb: Number,
 *   inf: Number,
 *   dc: Number,
 *   liquidity: Number,
 *   bankingStress: Number,
 *   confidence: Number
 * }
 *
 * Values:
 * 0–100
 *
 * Returns:
 * {
 *   ruleId,
 *   ruleName,
 *   domain,
 *   triggered,
 *   riskLevel,
 *   indicators,
 *   cascadePath,
 *   decision,
 *   actions
 * }
 */
function evaluateFIN004(state = {}) {

  const fx = Number(state.fx || 0);
  const energy = Number(state.energy || 0);
  const cyb = Number(state.cyb || 0);
  const inf = Number(state.inf || 0);
  const dc = Number(state.dc || 0);

  const liquidity = Number(state.liquidity || 0);
  const bankingStress = Number(state.bankingStress || 0);
  const confidence = Number(state.confidence || 0);

  /*
   * Banking stress components
   */

  const fxPressure = fx;

  const liquidityPressure = liquidity;

  const bankingPressure = bankingStress;

  const confidencePressure = 100 - confidence;

  /*
   * Deterministic FIN-004 stress score
   *
   * Banking stress is primarily influenced by:
   * FX pressure
   * Liquidity pressure
   * Banking-sector stress
   * Confidence deterioration
   *
   * Secondary cascade indicators:
   * Cyber
   * Infrastructure
   * Data-centre
   * Energy
   */

  const primaryStress =
    (fxPressure * 0.20) +
    (liquidityPressure * 0.30) +
    (bankingPressure * 0.30) +
    (confidencePressure * 0.20);

  const cascadeStress =
    (cyb * 0.25) +
    (inf * 0.25) +
    (dc * 0.25) +
    ((100 - energy) * 0.25);

  const finalStress =
    (primaryStress * 0.70) +
    (cascadeStress * 0.30);

  /*
   * Risk classification
   */

  let riskLevel = "LOW";

  if (finalStress >= 70) {
    riskLevel = "HIGH";
  } else if (finalStress >= 40) {
    riskLevel = "MEDIUM";
  }

  /*
   * Determine whether FIN-004 is triggered.
   */

  const triggered =
    finalStress >= 40 ||
    bankingStress >= 40 ||
    liquidity >= 40;

  /*
   * Cascade identification
   */

  const cascadePath = [];

  if (fx >= 40) {
    cascadePath.push("FX");
  }

  if (liquidity >= 40) {
    cascadePath.push("LIQ");
  }

  if (bankingStress >= 40) {
    cascadePath.push("BANK");
  }

  if (inf >= 40) {
    cascadePath.push("INF");
  }

  if (cyb >= 40) {
    cascadePath.push("CYB");
  }

  if (dc >= 40) {
    cascadePath.push("DC");
  }

  /*
   * Captain AI Lena decision logic
   */

  let decision = "MONITOR BANKING SYSTEM";

  if (riskLevel === "MEDIUM") {
    decision =
      "ACTIVATE PREVENTIVE BANKING RESILIENCE MODE";
  }

  if (riskLevel === "HIGH") {
    decision =
      "ACTIVATE BANKING STABILIZATION MODE";
  }

  /*
   * Action sequence
   */

  const actions = [];

  if (riskLevel === "LOW") {

    actions.push(
      "Continue monitoring banking-sector indicators."
    );

    actions.push(
      "Verify liquidity and confidence conditions."
    );

  } else if (riskLevel === "MEDIUM") {

    actions.push(
      "Increase banking-system monitoring frequency."
    );

    actions.push(
      "Verify liquidity reserves and funding conditions."
    );

    actions.push(
      "Monitor FX pressure and confidence deterioration."
    );

    actions.push(
      "Assess potential cascade into infrastructure and cyber domains."
    );

  } else {

    actions.push(
      "Activate banking stabilization procedures."
    );

    actions.push(
      "Protect critical liquidity and operational reserves."
    );

    actions.push(
      "Monitor systemic contagion pathways."
    );

    actions.push(
      "Restrict unnecessary system load where required."
    );

    actions.push(
      "Prepare contingency and recovery pathways."
    );
  }

  /*
   * Return deterministic FIN-004 result
   */

  return {

    ruleId: "FIN-004",

    ruleName: "Banking Stress",

    domain: "FIN",

    engineVersion: FIN_RULE_ENGINE_VERSION,

    triggered,

    riskLevel,

    stressScore: Number(finalStress.toFixed(2)),

    indicators: {

      fxPressure,

      liquidityPressure,

      bankingPressure,

      confidencePressure,

      cyberPressure: cyb,

      infrastructurePressure: inf,

      dataCentrePressure: dc,

      energyPressure: 100 - energy

    },

    cascadePath,

    decision,

    actions,

    pipeline: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ],

    status: triggered
      ? "FIN-004 ACTIVE"
      : "FIN-004 MONITORING"

  };
}


/**
 * Execute a FIN rule by rule ID.
 *
 * Example:
 *
 * runFINRule("FIN-004", {
 *   fx: 60,
 *   energy: 50,
 *   cyb: 20,
 *   inf: 30,
 *   dc: 20,
 *   liquidity: 70,
 *   bankingStress: 65,
 *   confidence: 40
 * });
 */
function runFINRule(ruleId, state = {}) {

  const rule = FIN_RULE_REGISTRY[ruleId];

  if (!rule) {

    return {

      success: false,

      error: `FIN rule ${ruleId} not found.`,

      availableRules:
        Object.keys(FIN_RULE_REGISTRY)

    };

  }

  const result = rule(state);

  return {

    success: true,

    result

  };

}


/**
 * Get all available FIN rules.
 */
function getAvailableFINRules() {

  return Object.keys(FIN_RULE_REGISTRY);

}


/**
 * Export API
 *
 * Browser-compatible global API.
 */

if (typeof window !== "undefined") {

  window.FINRuleEngine = {

    version: FIN_RULE_ENGINE_VERSION,

    registry: FIN_RULE_REGISTRY,

    run: runFINRule,

    evaluateFIN004,

    getAvailableRules:
      getAvailableFINRules

  };

}


/**
 * Node.js compatibility.
 */

if (typeof module !== "undefined" &&
    module.exports) {

  module.exports = {

    FIN_RULE_ENGINE_VERSION,

    FIN_RULE_REGISTRY,

    evaluateFIN004,

    runFINRule,

    getAvailableFINRules

  };

}