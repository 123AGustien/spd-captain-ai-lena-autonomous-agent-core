/**
 * SPD v13.1 — CYB Rule Engine
 *
 * Cyber Resilience Domain
 *
 * Rules:
 * CYB-001 Malware / Ransomware Event
 * CYB-002 Data Breach & Credential Leak
 * CYB-003 Distributed Denial of Service (DDoS)
 * CYB-004 Insider Threat Event
 * CYB-005 Ransomware / System Encryption Event
 * CYB-006 API Abuse & Token Misuse
 * CYB-007 Supply Chain Cyber Compromise
 * CYB-008 Cloud Misconfiguration Exposure
 * CYB-009 Identity Provider Outage / Authentication Failure
 * CYB-010 Multi-Vector Coordinated Cyber Attack
 *
 * Purpose:
 * Deterministic cyber resilience simulation and assessment.
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * No autonomous recovery execution is permitted.
 */

const PHI = 1.61803398875;


/* -------------------------------------------------------
 * RULE REGISTRY
 * ----------------------------------------------------- */

const RULES = {

  "CYB-001": {
    id: "CYB-001",
    name: "Malware / Ransomware Event",
    category: "MALWARE",
    scenario: "MALWARE_EVENT"
  },

  "CYB-002": {
    id: "CYB-002",
    name: "Data Breach & Credential Leak",
    category: "DATA_BREACH",
    scenario: "DATA_BREACH"
  },

  "CYB-003": {
    id: "CYB-003",
    name: "Distributed Denial of Service",
    category: "NETWORK_ATTACK",
    scenario: "DDOS_ATTACK"
  },

  "CYB-004": {
    id: "CYB-004",
    name: "Insider Threat Event",
    category: "INSIDER_THREAT",
    scenario: "INSIDER_THREAT"
  },

  "CYB-005": {
    id: "CYB-005",
    name: "Ransomware / System Encryption Event",
    category: "RANSOMWARE",
    scenario: "RANSOMWARE_EVENT"
  },

  "CYB-006": {
    id: "CYB-006",
    name: "API Abuse & Token Misuse",
    category: "API_SECURITY",
    scenario: "API_ABUSE"
  },

  "CYB-007": {
    id: "CYB-007",
    name: "Supply Chain Cyber Compromise",
    category: "SUPPLY_CHAIN",
    scenario: "SUPPLY_CHAIN_COMPROMISE"
  },

  "CYB-008": {
    id: "CYB-008",
    name: "Cloud Misconfiguration Exposure",
    category: "CLOUD_SECURITY",
    scenario: "CLOUD_MISCONFIGURATION"
  },

  "CYB-009": {
    id: "CYB-009",
    name: "Identity Provider Outage / Authentication Failure",
    category: "IDENTITY_ACCESS",
    scenario: "IDENTITY_OUTAGE"
  },

  "CYB-010": {
    id: "CYB-010",
    name: "Multi-Vector Coordinated Cyber Attack",
    category: "COORDINATED_ATTACK",
    scenario: "MULTI_VECTOR_ATTACK"
  }

};


/* -------------------------------------------------------
 * SCENARIO MAP
 * ----------------------------------------------------- */

const SCENARIO_MAP = {

  MALWARE_EVENT: "CYB-001",

  DATA_BREACH: "CYB-002",

  DDOS_ATTACK: "CYB-003",

  INSIDER_THREAT: "CYB-004",

  RANSOMWARE_EVENT: "CYB-005",

  API_ABUSE: "CYB-006",

  SUPPLY_CHAIN_COMPROMISE: "CYB-007",

  CLOUD_MISCONFIGURATION: "CYB-008",

  IDENTITY_OUTAGE: "CYB-009",

  MULTI_VECTOR_ATTACK: "CYB-010"

};


/* -------------------------------------------------------
 * SAFE NUMBER
 * ----------------------------------------------------- */

function safeNumber(value, fallback = 0) {

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(100, number)
  );

}


/* -------------------------------------------------------
 * SCENARIO RESOLUTION
 * ----------------------------------------------------- */

function resolveRule(scenario) {

  const ruleId = SCENARIO_MAP[scenario];

  if (!ruleId) {

    return {
      success: false,
      error: "CYB_SCENARIO_NOT_REGISTERED"
    };

  }

  return {
    success: true,
    ruleId,
    rule: RULES[ruleId]
  };

}


/* -------------------------------------------------------
 * DOMAIN STATUS
 * ----------------------------------------------------- */

function getStatus() {

  return {

    id: "CYB",

    name: "Cyber Resilience",

    status: "ACTIVE",

    engineRegistered: true,

    ruleCount: Object.keys(RULES).length,

    rules: Object.keys(RULES),

    scenarios: Object.keys(SCENARIO_MAP),

    executionAuthority: "HUMAN_OPERATOR",

    humanAuthorizationRequired: true,

    autonomousExecution: false

  };

}


/* -------------------------------------------------------
 * STRESS CALCULATION
 * ----------------------------------------------------- */

function calculateStress(scenario, input = {}) {

  const intensity =
    safeNumber(input.intensity, 0);

  let stress = intensity;

  switch (scenario) {

    case "MALWARE_EVENT":

      stress = (
        safeNumber(input.infectionRate) +
        safeNumber(input.systemImpact) +
        safeNumber(input.detectionDelay) +
        safeNumber(input.containmentFailure) +
        intensity
      ) / 5;

      break;


    case "DATA_BREACH":

      stress = (
        safeNumber(input.credentialExposure) +
        safeNumber(input.dataSeverity) +
        safeNumber(input.unauthorizedAccess) +
        safeNumber(input.exfiltrationVolume) +
        safeNumber(input.identityFailure) +
        intensity
      ) / 6;

      break;


    case "DDOS_ATTACK":

      stress = (
        safeNumber(input.trafficSpike) +
        safeNumber(input.packetLoss) +
        safeNumber(input.latency) +
        safeNumber(input.serviceDegradation) +
        safeNumber(input.mitigationStrain) +
        intensity
      ) / 6;

      break;


    case "INSIDER_THREAT":

      stress = (
        safeNumber(input.privilegedActivity) +
        safeNumber(input.dataAccess) +
        safeNumber(input.configurationChange) +
        safeNumber(input.exfiltrationRisk) +
        safeNumber(input.auditIrregularity) +
        intensity
      ) / 6;

      break;


    case "RANSOMWARE_EVENT":

      stress = (
        safeNumber(input.systemEncryption) +
        safeNumber(input.serviceImpact) +
        safeNumber(input.backupRisk) +
        safeNumber(input.containmentFailure) +
        safeNumber(input.recoveryDelay) +
        intensity
      ) / 6;

      break;


    case "API_ABUSE":

      stress = (
        safeNumber(input.requestVolume) +
        safeNumber(input.authenticationFailure) +
        safeNumber(input.tokenMisuse) +
        safeNumber(input.endpointOverload) +
        safeNumber(input.serviceDegradation) +
        intensity
      ) / 6;

      break;


    case "SUPPLY_CHAIN_COMPROMISE":

      stress = (
        safeNumber(input.dependencyRisk) +
        safeNumber(input.integrityFailure) +
        safeNumber(input.vendorRisk) +
        safeNumber(input.pipelineAnomaly) +
        safeNumber(input.systemPropagation) +
        intensity
      ) / 6;

      break;


    case "CLOUD_MISCONFIGURATION":

      stress = (
        safeNumber(input.publicExposure) +
        safeNumber(input.iamRisk) +
        safeNumber(input.configurationDrift) +
        safeNumber(input.dataExposure) +
        safeNumber(input.accessAnomaly) +
        intensity
      ) / 6;

      break;


    case "IDENTITY_OUTAGE":

      stress = (
        safeNumber(input.loginFailure) +
        safeNumber(input.tokenFailure) +
        safeNumber(input.sessionFailure) +
        safeNumber(input.authenticationDowntime) +
        safeNumber(input.serviceDependency) +
        intensity
      ) / 6;

      break;


    case "MULTI_VECTOR_ATTACK":

      stress = (
        safeNumber(input.networkAttack) +
        safeNumber(input.credentialCompromise) +
        safeNumber(input.malwareImpact) +
        safeNumber(input.apiAbuse) +
        safeNumber(input.supplyChainRisk) +
        safeNumber(input.infrastructureImpact) +
        intensity
      ) / 7;

      break;


    default:

      stress = intensity;

  }

  return Math.max(
    0,
    Math.min(100, stress)
  );

}


/* -------------------------------------------------------
 * RISK CLASSIFICATION
 * ----------------------------------------------------- */

function classifyRisk(stress) {

  if (stress < 25) {
    return "GREEN";
  }

  if (stress < 50) {
    return "YELLOW";
  }

  if (stress < 75) {
    return "ORANGE";
  }

  return "RED";

}


/* -------------------------------------------------------
 * RESILIENCE SCORE
 * ----------------------------------------------------- */

function calculateResilience(stress) {

  const goldenScore =
    stress * (1 / PHI);

  return Math.max(
    0,
    Math.min(
      100,
      100 - goldenScore
    )
  );

}


/* -------------------------------------------------------
 * CASCADE GENERATION
 * ----------------------------------------------------- */

function generateCascade(scenario, risk) {

  const cascades = {

    MALWARE_EVENT: [
      "Malware Detection",
      "System Compromise",
      "Service Degradation",
      "Infrastructure Stress",
      "Operational Disruption"
    ],

    DATA_BREACH: [
      "Credential Leak",
      "Unauthorized Access",
      "System Manipulation",
      "Service Integrity Degradation",
      "Cross-Domain Risk"
    ],

    DDOS_ATTACK: [
      "Traffic Flood",
      "Network Congestion",
      "Service Degradation",
      "Partial Outage",
      "Infrastructure Stress"
    ],

    INSIDER_THREAT: [
      "Insider Action",
      "Data Manipulation / Exfiltration",
      "System Integrity Degradation",
      "Operational Disruption",
      "Cross-Domain Risk"
    ],

    RANSOMWARE_EVENT: [
      "Ransomware Event",
      "System Encryption",
      "Service Outage",
      "Recovery Dependency",
      "Operational Disruption"
    ],

    API_ABUSE: [
      "API Abuse",
      "Service Overload",
      "Performance Degradation",
      "Partial Outage",
      "Infrastructure Stress"
    ],

    SUPPLY_CHAIN_COMPROMISE: [
      "Supply Chain Compromise",
      "System Infiltration",
      "Service Degradation",
      "Infrastructure Risk",
      "Cross-Domain Systemic Risk"
    ],

    CLOUD_MISCONFIGURATION: [
      "Cloud Exposure",
      "Data Leakage",
      "Service Integrity Risk",
      "Operational Impact",
      "Cross-Domain Systemic Risk"
    ],

    IDENTITY_OUTAGE: [
      "Identity Outage",
      "System Access Failure",
      "Infrastructure Lockout",
      "Service Disruption",
      "Cross-Domain Systemic Risk"
    ],

    MULTI_VECTOR_ATTACK: [
      "Multi-Vector Attack",
      "Multi-System Stress",
      "Infrastructure Breakdown",
      "System-Wide Failure Risk",
      "Cross-Domain Systemic Crisis"
    ]

  };

  return {

    risk,

    cascade:
      cascades[scenario] ||
      ["No cascade defined"],

    crossDomainImpact: [
      "CYB",
      "DC",
      "INF",
      "FIN"
    ]

  };

}


/* -------------------------------------------------------
 * CONTINGENCY ACTIONS
 * ----------------------------------------------------- */

function getContingencyActions(scenario) {

  const actions = {

    MALWARE_EVENT: [
      "Isolate affected systems",
      "Activate incident response",
      "Validate endpoint integrity",
      "Preserve forensic evidence",
      "Monitor system recovery"
    ],

    DATA_BREACH: [
      "Revoke compromised credentials",
      "Force credential rotation",
      "Isolate affected systems",
      "Audit privileged access",
      "Escalate incident response"
    ],

    DDOS_ATTACK: [
      "Activate DDoS mitigation",
      "Apply rate limiting",
      "Redirect traffic through mitigation layers",
      "Monitor service health",
      "Protect critical endpoints"
    ],

    INSIDER_THREAT: [
      "Restrict suspicious access",
      "Isolate affected accounts",
      "Preserve audit logs",
      "Conduct forensic investigation",
      "Escalate security governance"
    ],

    RANSOMWARE_EVENT: [
      "Isolate affected systems",
      "Protect backup infrastructure",
      "Activate disaster recovery procedures",
      "Validate system integrity",
      "Prioritise critical services"
    ],

    API_ABUSE: [
      "Revoke compromised tokens",
      "Enforce strict rate limiting",
      "Monitor endpoint anomalies",
      "Disable compromised integrations",
      "Audit API access logs"
    ],

    SUPPLY_CHAIN_COMPROMISE: [
      "Disable affected dependencies",
      "Roll back to verified versions",
      "Audit external integrations",
      "Validate package integrity",
      "Monitor update pipelines"
    ],

    CLOUD_MISCONFIGURATION: [
      "Restrict public access",
      "Audit IAM permissions",
      "Correct security configuration",
      "Rotate exposed credentials",
      "Enable enhanced monitoring"
    ],

    IDENTITY_OUTAGE: [
      "Activate backup identity provider",
      "Restore authentication services",
      "Validate token issuance",
      "Monitor authentication failures",
      "Escalate to IAM operations"
    ],

    MULTI_VECTOR_ATTACK: [
      "Activate full incident response",
      "Segment affected systems",
      "Prioritise critical infrastructure",
      "Preserve forensic telemetry",
      "Engage disaster recovery"
    ]

  };

  return actions[scenario] || [];

}


/* -------------------------------------------------------
 * MAIN EVALUATION
 * ----------------------------------------------------- */

function evaluate(scenario, input = {}) {

  const resolution =
    resolveRule(scenario);

  if (!resolution.success) {
    return resolution;
  }

  const stress =
    calculateStress(
      scenario,
      input
    );

  const goldenScore =
    stress * (1 / PHI);

  const resilienceScore =
    calculateResilience(stress);

  const risk =
    classifyRisk(stress);

  const cascade =
    generateCascade(
      scenario,
      risk
    );

  const contingencyActions =
    getContingencyActions(
      scenario
    );

  const timestamp =
    new Date().toISOString();

  return {

    success: true,

    domain: "CYB",

    scenario,

    rule: resolution.rule,

    assessment: {

      stress,

      goldenScore,

      resilienceScore,

      risk

    },

    cascade,

    contingencyActions,

    decision: {

      recommendation:
        risk === "GREEN"
          ? "MAINTAIN_NORMAL_OPERATION"
          : "INITIATE_RESILIENCE_RESPONSE",

      executionAuthority:
        "HUMAN_OPERATOR",

      executionStatus:
        "HUMAN_AUTHORIZATION_REQUIRED"

    },

    governance: {

      humanAuthorizationRequired: true,

      autonomousExecution: false,

      executionAuthority:
        "HUMAN_OPERATOR"

    },

    audit: {

      engine: "CYBRuleEngine",

      domain: "CYB",

      ruleId: resolution.ruleId,

      scenario,

      risk,

      stress,

      resilienceScore,

      timestamp

    }

  };

}


/* -------------------------------------------------------
 * EXPORT
 * ----------------------------------------------------- */

module.exports = {

  PHI,

  RULES,

  SCENARIO_MAP,

  getStatus,

  resolveRule,

  evaluate,

  classifyRisk,

  calculateStress,

  calculateResilience,

  generateCascade,

  getContingencyActions

};