/**
 * SPD v13.1 — BHR RULE ENGINE
 *
 * Business & Human Rights Resilience Domain
 *
 * Rules:
 * BHR-001 Labour Rights
 * BHR-002 Human Rights Event
 * BHR-003 Supply Chain Human Rights
 * BHR-004 Community Impact
 * BHR-005 Governance Risk
 * BHR-006 Environmental Human Rights Impact
 * BHR-007 Forced Labour Risk
 * BHR-008 Child Labour Risk
 * BHR-009 Indigenous Community Impact
 * BHR-010 Multi-Domain Human Rights Crisis
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * Autonomous execution is disabled.
 */

const DOMAIN = "BHR";
const STATUS = "ACTIVE";
const VERSION = "1.0";

const MEDIUM_THRESHOLD = 40;
const HIGH_THRESHOLD = 70;


/* =========================================================
   RULE REGISTRY
========================================================= */

const RULES = {

  "BHR-001": {
    id: "BHR-001",
    scenario: "LABOUR_RIGHTS",
    name: "Labour Rights Risk"
  },

  "BHR-002": {
    id: "BHR-002",
    scenario: "HUMAN_RIGHTS_EVENT",
    name: "Human Rights Event"
  },

  "BHR-003": {
    id: "BHR-003",
    scenario: "SUPPLY_CHAIN_HUMAN_RIGHTS",
    name: "Supply Chain Human Rights Risk"
  },

  "BHR-004": {
    id: "BHR-004",
    scenario: "COMMUNITY_IMPACT",
    name: "Community Impact"
  },

  "BHR-005": {
    id: "BHR-005",
    scenario: "GOVERNANCE_RISK",
    name: "Governance Risk"
  },

  "BHR-006": {
    id: "BHR-006",
    scenario: "ENVIRONMENTAL_HUMAN_RIGHTS_IMPACT",
    name: "Environmental Human Rights Impact"
  },

  "BHR-007": {
    id: "BHR-007",
    scenario: "FORCED_LABOUR_RISK",
    name: "Forced Labour Risk"
  },

  "BHR-008": {
    id: "BHR-008",
    scenario: "CHILD_LABOUR_RISK",
    name: "Child Labour Risk"
  },

  "BHR-009": {
    id: "BHR-009",
    scenario: "INDIGENOUS_COMMUNITY_IMPACT",
    name: "Indigenous Community Impact"
  },

  "BHR-010": {
    id: "BHR-010",
    scenario: "MULTI_DOMAIN_HUMAN_RIGHTS_CRISIS",
    name: "Multi-Domain Human Rights Crisis"
  }

};


/* =========================================================
   SCENARIO MAP
========================================================= */

const SCENARIO_MAP = {

  LABOUR_RIGHTS: "BHR-001",

  HUMAN_RIGHTS_EVENT: "BHR-002",

  SUPPLY_CHAIN_HUMAN_RIGHTS: "BHR-003",

  COMMUNITY_IMPACT: "BHR-004",

  GOVERNANCE_RISK: "BHR-005",

  ENVIRONMENTAL_HUMAN_RIGHTS_IMPACT:
    "BHR-006",

  FORCED_LABOUR_RISK:
    "BHR-007",

  CHILD_LABOUR_RISK:
    "BHR-008",

  INDIGENOUS_COMMUNITY_IMPACT:
    "BHR-009",

  MULTI_DOMAIN_HUMAN_RIGHTS_CRISIS:
    "BHR-010"

};


/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value) {

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      number
    )
  );

}


/* =========================================================
   RULE RESOLUTION
========================================================= */

function resolveRule(scenario) {

  const ruleId =
    SCENARIO_MAP[scenario];

  if (!ruleId) {

    return {

      success: false,

      error:
        "BHR_SCENARIO_NOT_REGISTERED",

      scenario

    };

  }

  return {

    success: true,

    ruleId,

    rule:
      RULES[ruleId]

  };

}


/* =========================================================
   DOMAIN STATUS
========================================================= */

function getStatus() {

  return {

    id: DOMAIN,

    name:
      "Business & Human Rights Resilience",

    status: STATUS,

    version: VERSION,

    engineRegistered: true,

    ruleCount:
      Object.keys(RULES).length,

    rules:
      Object.keys(RULES),

    scenarios:
      Object.keys(SCENARIO_MAP),

    executionAuthority:
      "HUMAN_OPERATOR",

    humanAuthorizationRequired:
      true,

    autonomousExecution:
      false

  };

}


/* =========================================================
   STRESS CALCULATION
========================================================= */

function calculateStress(
  scenario,
  input = {}
) {

  const intensity =
    safeNumber(
      input.intensity
    );

  let stress = intensity;

  switch (scenario) {

    case "LABOUR_RIGHTS":

      stress = (
        safeNumber(input.labour) +
        safeNumber(input.governance) +
        safeNumber(input.community) +
        intensity
      ) / 4;

      break;


    case "HUMAN_RIGHTS_EVENT":

      stress = (
        safeNumber(input.humanRights) +
        safeNumber(input.labour) +
        safeNumber(input.community) +
        safeNumber(input.governance) +
        intensity
      ) / 5;

      break;


    case "SUPPLY_CHAIN_HUMAN_RIGHTS":

      stress = (
        safeNumber(input.supplyChain) +
        safeNumber(input.humanRights) +
        safeNumber(input.labour) +
        safeNumber(input.governance) +
        intensity
      ) / 5;

      break;


    case "COMMUNITY_IMPACT":

      stress = (
        safeNumber(input.community) +
        safeNumber(input.humanRights) +
        safeNumber(input.environment) +
        safeNumber(input.governance) +
        intensity
      ) / 5;

      break;


    case "GOVERNANCE_RISK":

      stress = (
        safeNumber(input.governance) +
        safeNumber(input.humanRights) +
        safeNumber(input.labour) +
        safeNumber(input.supplyChain) +
        intensity
      ) / 5;

      break;


    case "ENVIRONMENTAL_HUMAN_RIGHTS_IMPACT":

      stress = (
        safeNumber(input.environment) +
        safeNumber(input.community) +
        safeNumber(input.humanRights) +
        safeNumber(input.supplyChain) +
        intensity
      ) / 5;

      break;


    case "FORCED_LABOUR_RISK":

      stress = (
        safeNumber(input.forcedLabour) +
        safeNumber(input.labour) +
        safeNumber(input.humanRights) +
        safeNumber(input.supplyChain) +
        intensity
      ) / 5;

      break;


    case "CHILD_LABOUR_RISK":

      stress = (
        safeNumber(input.childLabour) +
        safeNumber(input.labour) +
        safeNumber(input.humanRights) +
        safeNumber(input.supplyChain) +
        intensity
      ) / 5;

      break;


    case "INDIGENOUS_COMMUNITY_IMPACT":

      stress = (
        safeNumber(input.indigenousRights) +
        safeNumber(input.community) +
        safeNumber(input.humanRights) +
        safeNumber(input.environment) +
        intensity
      ) / 5;

      break;


    case "MULTI_DOMAIN_HUMAN_RIGHTS_CRISIS":

      stress = (
        safeNumber(input.labour) +
        safeNumber(input.humanRights) +
        safeNumber(input.supplyChain) +
        safeNumber(input.community) +
        safeNumber(input.governance) +
        safeNumber(input.environment) +
        intensity
      ) / 7;

      break;


    default:

      stress = intensity;

  }

  return Number(
    Math.max(
      0,
      Math.min(
        100,
        stress
      )
    ).toFixed(3)
  );

}


/* =========================================================
   RISK CLASSIFICATION
========================================================= */

function classifyRisk(stress) {

  if (
    stress < MEDIUM_THRESHOLD
  ) {

    return "LOW";

  }

  if (
    stress < HIGH_THRESHOLD
  ) {

    return "MEDIUM";

  }

  return "HIGH";

}


/* =========================================================
   RESILIENCE SCORE
========================================================= */

function calculateResilience(stress) {

  return Number(
    Math.max(
      0,
      Math.min(
        100,
        100 - stress
      )
    ).toFixed(3)
  );

}


/* =========================================================
   CASCADE GENERATION
========================================================= */

function generateCascade(
  scenario,
  risk
) {

  const cascades = {

    LABOUR_RIGHTS: [
      "Labour Rights Concern",
      "Workforce Impact",
      "Operational Disruption",
      "Governance Risk"
    ],

    HUMAN_RIGHTS_EVENT: [
      "Human Rights Impact",
      "Affected Stakeholders",
      "Operational Risk",
      "Reputational Risk"
    ],

    SUPPLY_CHAIN_HUMAN_RIGHTS: [
      "Supplier Risk",
      "Human Rights Exposure",
      "Supply Chain Disruption",
      "Cross-Domain Risk"
    ],

    COMMUNITY_IMPACT: [
      "Community Impact",
      "Stakeholder Conflict",
      "Operational Disruption",
      "Reputational Risk"
    ],

    GOVERNANCE_RISK: [
      "Governance Failure",
      "Due-Diligence Weakness",
      "Compliance Exposure",
      "Systemic Governance Risk"
    ],

    ENVIRONMENTAL_HUMAN_RIGHTS_IMPACT: [
      "Environmental Impact",
      "Community Exposure",
      "Human Rights Risk",
      "Cross-Domain Risk"
    ],

    FORCED_LABOUR_RISK: [
      "Forced Labour Indicators",
      "Worker Harm",
      "Supply Chain Exposure",
      "Severe Human Rights Risk"
    ],

    CHILD_LABOUR_RISK: [
      "Child Labour Indicators",
      "Child Rights Impact",
      "Supply Chain Exposure",
      "Severe Human Rights Risk"
    ],

    INDIGENOUS_COMMUNITY_IMPACT: [
      "Community Rights Impact",
      "Indigenous Rights Concern",
      "Environmental / Social Impact",
      "Cross-Domain Risk"
    ],

    MULTI_DOMAIN_HUMAN_RIGHTS_CRISIS: [
      "Multiple Human Rights Impacts",
      "Stakeholder Harm",
      "Supply Chain / Operational Disruption",
      "Systemic BHR Crisis"
    ]

  };

  return {

    severity: risk,

    cascade:
      risk === "LOW"
        ? []
        : (
          cascades[scenario] ||
          []
        ),

    crossDomainImpact: [
      "BHR",
      "FIN",
      "INF",
      "CYB",
      "DC"
    ]

  };

}


/* =========================================================
   CONTINGENCY ACTIONS
========================================================= */

function getContingencyActions(
  scenario,
  risk
) {

  if (
    risk === "LOW"
  ) {

    return [
      "Continue BHR monitoring",
      "Maintain routine due diligence"
    ];

  }

  const actions = {

    LABOUR_RIGHTS: [
      "Review labour conditions",
      "Protect affected workers",
      "Conduct enhanced due diligence",
      "Escalate to responsible management"
    ],

    HUMAN_RIGHTS_EVENT: [
      "Assess affected stakeholders",
      "Protect human rights",
      "Initiate enhanced due diligence",
      "Escalate to appropriate authority"
    ],

    SUPPLY_CHAIN_HUMAN_RIGHTS: [
      "Review affected suppliers",
      "Conduct supply-chain due diligence",
      "Protect affected stakeholders",
      "Escalate supplier remediation"
    ],

    COMMUNITY_IMPACT: [
      "Assess community impact",
      "Engage affected stakeholders",
      "Implement mitigation measures",
      "Escalate community-risk governance"
    ],

    GOVERNANCE_RISK: [
      "Review governance controls",
      "Initiate enhanced due diligence",
      "Document control deficiencies",
      "Escalate governance risk"
    ],

    ENVIRONMENTAL_HUMAN_RIGHTS_IMPACT: [
      "Assess environmental impact",
      "Protect affected communities",
      "Initiate remediation review",
      "Escalate environmental and human-rights risk"
    ],

    FORCED_LABOUR_RISK: [
      "Protect potentially affected workers",
      "Suspend affected-risk activity for review",
      "Conduct enhanced supply-chain due diligence",
      "Escalate severe human-rights risk"
    ],

    CHILD_LABOUR_RISK: [
      "Protect potentially affected children",
      "Conduct immediate due diligence",
      "Review affected supply-chain activity",
      "Escalate child-rights risk"
    ],

    INDIGENOUS_COMMUNITY_IMPACT: [
      "Assess community rights impact",
      "Engage affected stakeholders",
      "Review environmental and social impacts",
      "Escalate community-rights governance"
    ],

    MULTI_DOMAIN_HUMAN_RIGHTS_CRISIS: [
      "Activate enhanced BHR response",
      "Protect affected stakeholders",
      "Coordinate cross-domain assessment",
      "Initiate remediation review",
      "Escalate to highest appropriate authority"
    ]

  };

  return (
    actions[scenario] ||
    [
      "Increase BHR monitoring",
      "Conduct enhanced due diligence",
      "Escalate according to governance procedures"
    ]
  );

}


/* =========================================================
   HUMAN RIGHTS PRINCIPLE CHECK
========================================================= */

function evaluateHumanRightsPrinciples(
  input = {}
) {

  const concerns = [];

  if (
    safeNumber(input.labour) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("LABOUR_RISK");
  }

  if (
    safeNumber(input.humanRights) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("HUMAN_RIGHTS_RISK");
  }

  if (
    safeNumber(input.supplyChain) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("SUPPLY_CHAIN_RISK");
  }

  if (
    safeNumber(input.community) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("COMMUNITY_IMPACT_RISK");
  }

  if (
    safeNumber(input.governance) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("GOVERNANCE_RISK");
  }

  if (
    safeNumber(input.environment) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("ENVIRONMENTAL_RISK");
  }

  if (
    safeNumber(input.forcedLabour) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("FORCED_LABOUR_RISK");
  }

  if (
    safeNumber(input.childLabour) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("CHILD_LABOUR_RISK");
  }

  if (
    safeNumber(input.indigenousRights) >=
    MEDIUM_THRESHOLD
  ) {
    concerns.push("INDIGENOUS_RIGHTS_RISK");
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
   MAIN EVALUATION
========================================================= */

function evaluate(
  scenario,
  input = {},
  context = {}
) {

  const resolution =
    resolveRule(scenario);

  if (
    !resolution.success
  ) {

    return resolution;

  }

  const stress =
    calculateStress(
      scenario,
      input
    );

  const risk =
    classifyRisk(
      stress
    );

  const resilienceScore =
    calculateResilience(
      stress
    );

  const cascade =
    generateCascade(
      scenario,
      risk
    );

  const contingencyActions =
    getContingencyActions(
      scenario,
      risk
    );

  const principles =
    evaluateHumanRightsPrinciples(
      input
    );

  const timestamp =
    new Date().toISOString();

  return {

    success: true,

    domain: DOMAIN,

    domainName:
      "Business & Human Rights Resilience",

    scenario,

    rule:
      resolution.rule,

    assessment: {

      stress,

      resilienceScore,

      risk

    },

    cascade,

    contingencyActions,

    humanRightsPrinciples:
      principles,

    decision: {

      recommendation:
        risk === "LOW"
          ? "MAINTAIN_MONITORING"
          : "INITIATE_BHR_RESILIENCE_RESPONSE",

      executionAuthority:
        "HUMAN_OPERATOR",

      executionStatus:
        "HUMAN_AUTHORIZATION_REQUIRED"

    },

    governance: {

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false,

      executionAuthority:
        "HUMAN_OPERATOR"

    },

    audit: {

      engine:
        "BHRRuleEngine",

      domain:
        DOMAIN,

      ruleId:
        resolution.ruleId,

      scenario,

      risk,

      stress,

      resilienceScore,

      timestamp

    },

    context

  };

}


/* =========================================================
   SELF CHECK
========================================================= */

function verifyBHREngine() {

  const result =
    evaluate(
      "LABOUR_RIGHTS",
      {
        labour: 0,
        humanRights: 0,
        supplyChain: 0,
        community: 0,
        governance: 0,
        environment: 0,
        intensity: 0
      }
    );

  return {

    domain: DOMAIN,

    status:
      result.success &&
      result.assessment.risk === "LOW"
        ? "READY"
        : "NOT_READY",

    ruleCount:
      Object.keys(RULES).length,

    testRisk:
      result.assessment.risk,

    testResilienceScore:
      result.assessment.resilienceScore,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {

  DOMAIN,

  STATUS,

  VERSION,

  RULES,

  SCENARIO_MAP,

  getStatus,

  resolveRule,

  calculateStress,

  classifyRisk,

  calculateResilience,

  generateCascade,

  getContingencyActions,

  evaluateHumanRightsPrinciples,

  evaluate,

  verifyBHREngine

};