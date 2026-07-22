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
 * Integrated Rules:
 * FIN-003 — Liquidity Stress
 * FIN-004 — Banking Stress
 */

const FIN_RULE_ENGINE_VERSION = "1.1.0";


/**
 * ============================================================
 * FIN RULE REGISTRY
 * ============================================================
 *
 * The registry maps executable rule IDs to their
 * operational evaluation functions.
 */

const FIN_RULE_REGISTRY = {
  "FIN-003": evaluateFIN003,
  "FIN-004": evaluateFIN004
};


/**
 * ============================================================
 * FIN-003 — LIQUIDITY STRESS
 * ============================================================
 *
 * Evaluates financial-system liquidity stress using
 * deterministic system-state indicators.
 *
 * Expected input:
 *
 * {
 *   fx: Number,
 *   energy: Number,
 *   cyb: Number,
 *   inf: Number,
 *   dc: Number,
 *   liquidity: Number,
 *   confidence: Number,
 *   fundingStress: Number,
 *   marketLiquidity: Number
 * }
 *
 * Values:
 * 0–100
 *
 * Risk Levels:
 *
 * GREEN  = Normal liquidity conditions
 * YELLOW = Early liquidity tightening
 * ORANGE = Significant liquidity stress
 * RED    = Severe liquidity disruption
 */

function evaluateFIN003(state = {}) {

  /*
   * Core system indicators
   */

  const fx = Number(state.fx || 0);
  const energy = Number(state.energy || 0);
  const cyb = Number(state.cyb || 0);
  const inf = Number(state.inf || 0);
  const dc = Number(state.dc || 0);

  /*
   * Financial liquidity indicators
   */

  const liquidity = Number(state.liquidity || 0);
  const confidence = Number(state.confidence || 0);
  const fundingStress = Number(state.fundingStress || 0);
  const marketLiquidity = Number(state.marketLiquidity || 0);


  /*
   * Primary liquidity stress
   *
   * Liquidity stress is primarily influenced by:
   *
   * - Liquidity pressure
   * - Funding stress
   * - Market liquidity deterioration
   * - Confidence deterioration
   */

  const liquidityPressure = liquidity;

  const fundingPressure = fundingStress;

  const marketLiquidityPressure = marketLiquidity;

  const confidencePressure = 100 - confidence;


  /*
   * Primary financial stress score
   */

  const primaryStress =
    (liquidityPressure * 0.30) +
    (fundingPressure * 0.25) +
    (marketLiquidityPressure * 0.25) +
    (confidencePressure * 0.20);


  /*
   * Secondary cross-domain cascade stress
   *
   * FIN
   * ↓
   * INF
   * ↓
   * CYB
   * ↓
   * DC
   * ↓
   * ENERGY
   */

  const cascadeStress =
    (inf * 0.25) +
    (cyb * 0.25) +
    (dc * 0.25) +
    ((100 - energy) * 0.25);


  /*
   * FX can increase financial-market pressure.
   */

  const fxStress = fx;


  /*
   * Final deterministic FIN-003 stress score.
   */

  const finalStress =
    (primaryStress * 0.70) +
    (cascadeStress * 0.20) +
    (fxStress * 0.10);


  /*
   * Risk classification
   *
   * GREEN  = < 25
   * YELLOW  = 25–49.99
   * ORANGE  = 50–69.99
   * RED     = >= 70
   */

  let riskLevel = "GREEN";

  if (finalStress >= 70) {

    riskLevel = "RED";

  } else if (finalStress >= 50) {

    riskLevel = "ORANGE";

  } else if (finalStress >= 25) {

    riskLevel = "YELLOW";

  }


  /*
   * Determine whether FIN-003 is triggered.
   */

  const triggered =
    finalStress >= 25 ||
    liquidity >= 40 ||
    fundingStress >= 40 ||
    marketLiquidity >= 40;


  /*
   * Cascade identification.
   */

  const cascadePath = [];

  if (liquidity >= 40) {

    cascadePath.push("LIQ");

  }

  if (fundingStress >= 40) {

    cascadePath.push("FUNDING");

  }

  if (marketLiquidity >= 40) {

    cascadePath.push("MARKET");

  }

  if (confidence <= 60) {

    cascadePath.push("CONFIDENCE");

  }

  if (fx >= 40) {

    cascadePath.push("FX");

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
   * Captain AI Lena decision logic.
   */

  let decision =
    "MONITOR LIQUIDITY CONDITIONS";


  if (riskLevel === "YELLOW") {

    decision =
      "INCREASE LIQUIDITY MONITORING";

  }


  if (riskLevel === "ORANGE") {

    decision =
      "ACTIVATE LIQUIDITY CONTINGENCY PREPARATION";

  }


  if (riskLevel === "RED") {

    decision =
      "ACTIVATE EMERGENCY LIQUIDITY MANAGEMENT";

  }


  /*
   * Action sequence.
   */

  const actions = [];


  /*
   * GREEN
   */

  if (riskLevel === "GREEN") {

    actions.push(
      "Continue monitoring liquidity conditions."
    );

    actions.push(
      "Maintain normal funding and cash-flow monitoring."
    );

  }


  /*
   * YELLOW
   */

  else if (riskLevel === "YELLOW") {

    actions.push(
      "Increase liquidity monitoring frequency."
    );

    actions.push(
      "Review interbank funding conditions."
    );

    actions.push(
      "Monitor funding spreads and cash reserve levels."
    );

    actions.push(
      "Assess early signs of market confidence deterioration."
    );

  }


  /*
   * ORANGE
   */

  else if (riskLevel === "ORANGE") {

    actions.push(
      "Prepare liquidity contingency measures."
    );

    actions.push(
      "Strengthen monitoring of funding sources."
    );

    actions.push(
      "Assess cash-flow resilience and available reserves."
    );

    actions.push(
      "Evaluate potential credit tightening."
    );

    actions.push(
      "Monitor systemic contagion pathways."
    );

  }


  /*
   * RED
   */

  else {

    actions.push(
      "Activate emergency liquidity management procedures."
    );

    actions.push(
      "Protect critical liquidity and operational reserves."
    );

    actions.push(
      "Assess systemic banking-sector stress."
    );

    actions.push(
      "Monitor credit-market disruption."
    );

    actions.push(
      "Escalate systemic financial instability risk."
    );

    actions.push(
      "Prepare contingency and recovery pathways."
    );

  }


  /*
   * Return deterministic FIN-003 result.
   */

  return {

    ruleId: "FIN-003",

    ruleName: "Liquidity Stress",

    domain: "FIN",

    category: "Liquidity Risk",

    engineVersion: FIN_RULE_ENGINE_VERSION,

    triggered,

    riskLevel,

    stressScore:
      Number(finalStress.toFixed(2)),

    indicators: {

      liquidityPressure,

      fundingPressure,

      marketLiquidityPressure,

      confidencePressure,

      fxPressure: fx,

      infrastructurePressure: inf,

      cyberPressure: cyb,

      dataCentrePressure: dc,

      energyPressure: 100 - energy

    },

    cascadePath,

    decision,

    actions,

    affectedDomains: [

      "FIN",

      "INF",

      "CYB",

      "DC"

    ],

    pipeline: [

      "OBSERVE",

      "VERIFY",

      "ASSESS",

      "DECIDE",

      "ACT",

      "UPDATE"

    ],

    status: triggered
      ? "FIN-003 ACTIVE"
      : "FIN-003 MONITORING"

  };

}


/**
 * ============================================================
 * FIN-004 — BANKING STRESS
 * ============================================================
 *
 * Evaluates banking-sector stress using deterministic
 * system-state indicators.
 *
 * Expected input:
 *
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
 */

function evaluateFIN004(state = {}) {

  const fx =
    Number(state.fx || 0);

  const energy =
    Number(state.energy || 0);

  const cyb =
    Number(state.cyb || 0);

  const inf =
    Number(state.inf || 0);

  const dc =
    Number(state.dc || 0);

  const liquidity =
    Number(state.liquidity || 0);

  const bankingStress =
    Number(state.bankingStress || 0);

  const confidence =
    Number(state.confidence || 0);


  /*
   * Banking stress components.
   */

  const fxPressure =
    fx;

  const liquidityPressure =
    liquidity;

  const bankingPressure =
    bankingStress;

  const confidencePressure =
    100 - confidence;


  /*
   * Deterministic FIN-004 stress score.
   */

  const primaryStress =
    (fxPressure * 0.20) +
    (liquidityPressure * 0.30) +
    (bankingPressure * 0.30) +
    (confidencePressure * 0.20);


  /*
   * Secondary cascade indicators.
   */

  const cascadeStress =
    (cyb * 0.25) +
    (inf * 0.25) +
    (dc * 0.25) +
    ((100 - energy) * 0.25);


  /*
   * Final deterministic stress.
   */

  const finalStress =
    (primaryStress * 0.70) +
    (cascadeStress * 0.30);


  /*
   * Risk classification.
   */

  let riskLevel =
    "LOW";


  if (finalStress >= 70) {

    riskLevel =
      "HIGH";

  }

  else if (finalStress >= 40) {

    riskLevel =
      "MEDIUM";

  }


  /*
   * Determine whether FIN-004 is triggered.
   */

  const triggered =
    finalStress >= 40 ||
    bankingStress >= 40 ||
    liquidity >= 40;


  /*
   * Cascade identification.
   */

  const cascadePath = [];


  if (fx >= 40) {

    cascadePath.push(
      "FX"
    );

  }


  if (liquidity >= 40) {

    cascadePath.push(
      "LIQ"
    );

  }


  if (bankingStress >= 40) {

    cascadePath.push(
      "BANK"
    );

  }


  if (inf >= 40) {

    cascadePath.push(
      "INF"
    );

  }


  if (cyb >= 40) {

    cascadePath.push(
      "CYB"
    );

  }


  if (dc >= 40) {

    cascadePath.push(
      "DC"
    );

  }


  /*
   * Captain AI Lena decision logic.
   */

  let decision =
    "MONITOR BANKING SYSTEM";


  if (riskLevel === "MEDIUM") {

    decision =
      "ACTIVATE PREVENTIVE BANKING RESILIENCE MODE";

  }


  if (riskLevel === "HIGH") {

    decision =
      "ACTIVATE BANKING STABILIZATION MODE";

  }


  /*
   * Action sequence.
   */

  const actions = [];


  if (riskLevel === "LOW") {

    actions.push(
      "Continue monitoring banking-sector indicators."
    );

    actions.push(
      "Verify liquidity and confidence conditions."
    );

  }


  else if (riskLevel === "MEDIUM") {

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

  }


  else {

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
   * Return deterministic FIN-004 result.
   */

  return {

    ruleId:
      "FIN-004",

    ruleName:
      "Banking Stress",

    domain:
      "FIN",

    category:
      "Banking System Stability",

    engineVersion:
      FIN_RULE_ENGINE_VERSION,

    triggered,

    riskLevel,

    stressScore:
      Number(finalStress.toFixed(2)),

    indicators: {

      fxPressure,

      liquidityPressure,

      bankingPressure,

      confidencePressure,

      cyberPressure:
        cyb,

      infrastructurePressure:
        inf,

      dataCentrePressure:
        dc,

      energyPressure:
        100 - energy

    },

    cascadePath,

    decision,

    actions,

    affectedDomains: [

      "FIN",

      "INF",

      "CYB",

      "DC"

    ],

    pipeline: [

      "OBSERVE",

      "VERIFY",

      "ASSESS",

      "DECIDE",

      "ACT",

      "UPDATE"

    ],

    status:
      triggered
        ? "FIN-004 ACTIVE"
        : "FIN-004 MONITORING"

  };

}


/**
 * ============================================================
 * EXECUTE FIN RULE
 * ============================================================
 *
 * Example:
 *
 * runFINRule("FIN-003", {
 *   fx: 30,
 *   energy: 70,
 *   cyb: 20,
 *   inf: 20,
 *   dc: 20,
 *   liquidity: 60,
 *   confidence: 50,
 *   fundingStress: 55,
 *   marketLiquidity: 50
 * });
 *
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

function runFINRule(
  ruleId,
  state = {}
) {

  const rule =
    FIN_RULE_REGISTRY[ruleId];


  if (!rule) {

    return {

      success:
        false,

      error:
        `FIN rule ${ruleId} not found.`,

      availableRules:
        Object.keys(
          FIN_RULE_REGISTRY
        )

    };

  }


  const result =
    rule(state);


  return {

    success:
      true,

    result

  };

}


/**
 * ============================================================
 * GET AVAILABLE FIN RULES
 * ============================================================
 */

function getAvailableFINRules() {

  return Object.keys(
    FIN_RULE_REGISTRY
  );

}


/**
 * ============================================================
 * BROWSER-COMPATIBLE GLOBAL API
 * ============================================================
 */

if (
  typeof window !== "undefined"
) {

  window.FINRuleEngine = {

    version:
      FIN_RULE_ENGINE_VERSION,

    registry:
      FIN_RULE_REGISTRY,

    run:
      runFINRule,

    evaluateFIN003,

    evaluateFIN004,

    getAvailableRules:
      getAvailableFINRules

  };

}


/**
 * ============================================================
 * NODE.JS COMPATIBILITY
 * ============================================================
 */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports = {

    FIN_RULE_ENGINE_VERSION,

    FIN_RULE_REGISTRY,

    evaluateFIN003,

    evaluateFIN004,

    runFINRule,

    getAvailableFINRules

  };

}