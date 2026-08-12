/**
 * SPD v13.1 — CYB RULE ENGINE
 *
 * Cyber Resilience Domain
 *
 * Architecture:
 *
 * COCKPIT
 *    ↓
 * DOMAIN INTEGRATION
 *    ↓
 * CYB RULE ENGINE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE PIPELINE
 *    ↓
 * RESULT / MEMORY / AUDIT
 *
 * Rules:
 *
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
 * Deterministic cyber resilience simulation,
 * assessment, cascade analysis and contingency
 * decision support.
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * No autonomous recovery execution is permitted.
 *
 * Module:
 * ES MODULE
 *
 * Compatible with:
 * domainIntegration.js
 * coreExecutionEngine.js
 * index.html <script type="module">
 */


/* =========================================================
   CONSTANTS
========================================================= */

const PHI =
  1.61803398875;


/* =========================================================
   RULE REGISTRY
========================================================= */

const RULES = {

  "CYB-001": {

    id:
      "CYB-001",

    name:
      "Malware / Ransomware Event",

    category:
      "MALWARE",

    scenario:
      "MALWARE_EVENT"

  },


  "CYB-002": {

    id:
      "CYB-002",

    name:
      "Data Breach & Credential Leak",

    category:
      "DATA_BREACH",

    scenario:
      "DATA_BREACH"

  },


  "CYB-003": {

    id:
      "CYB-003",

    name:
      "Distributed Denial of Service",

    category:
      "NETWORK_ATTACK",

    scenario:
      "DDOS_ATTACK"

  },


  "CYB-004": {

    id:
      "CYB-004",

    name:
      "Insider Threat Event",

    category:
      "INSIDER_THREAT",

    scenario:
      "INSIDER_THREAT"

  },


  "CYB-005": {

    id:
      "CYB-005",

    name:
      "Ransomware / System Encryption Event",

    category:
      "RANSOMWARE",

    scenario:
      "RANSOMWARE_EVENT"

  },


  "CYB-006": {

    id:
      "CYB-006",

    name:
      "API Abuse & Token Misuse",

    category:
      "API_SECURITY",

    scenario:
      "API_ABUSE"

  },


  "CYB-007": {

    id:
      "CYB-007",

    name:
      "Supply Chain Cyber Compromise",

    category:
      "SUPPLY_CHAIN",

    scenario:
      "SUPPLY_CHAIN_COMPROMISE"

  },


  "CYB-008": {

    id:
      "CYB-008",

    name:
      "Cloud Misconfiguration Exposure",

    category:
      "CLOUD_SECURITY",

    scenario:
      "CLOUD_MISCONFIGURATION"

  },


  "CYB-009": {

    id:
      "CYB-009",

    name:
      "Identity Provider Outage / Authentication Failure",

    category:
      "IDENTITY_ACCESS",

    scenario:
      "IDENTITY_OUTAGE"

  },


  "CYB-010": {

    id:
      "CYB-010",

    name:
      "Multi-Vector Coordinated Cyber Attack",

    category:
      "COORDINATED_ATTACK",

    scenario:
      "MULTI_VECTOR_ATTACK"

  }

};


/* =========================================================
   SCENARIO MAP
========================================================= */

const SCENARIO_MAP = {

  MALWARE_EVENT:
    "CYB-001",

  DATA_BREACH:
    "CYB-002",

  DDOS_ATTACK:
    "CYB-003",

  INSIDER_THREAT:
    "CYB-004",

  RANSOMWARE_EVENT:
    "CYB-005",

  API_ABUSE:
    "CYB-006",

  SUPPLY_CHAIN_COMPROMISE:
    "CYB-007",

  CLOUD_MISCONFIGURATION:
    "CYB-008",

  IDENTITY_OUTAGE:
    "CYB-009",

  MULTI_VECTOR_ATTACK:
    "CYB-010"

};


/* =========================================================
   COCKPIT SCENARIO ALIASES
 *
 * These aliases allow the existing cockpit /
 * Domain Integration Layer scenario names to
 * resolve correctly without breaking the
 * authoritative CYB scenario names above.
========================================================= */

const SCENARIO_ALIASES = {

  CYBER_EVENT:
    "MALWARE_EVENT",

  DATA_BREACH_CREDENTIAL_LEAK:
    "DATA_BREACH",

  DDOS:
    "DDOS_ATTACK",

  API_ABUSE_TOKEN_MISUSE:
    "API_ABUSE",

  SUPPLY_CHAIN_CYBER_COMPROMISE:
    "SUPPLY_CHAIN_COMPROMISE",

  CLOUD_MISCONFIGURATION_EXPOSURE:
    "CLOUD_MISCONFIGURATION",

  IDENTITY_PROVIDER_OUTAGE:
    "IDENTITY_OUTAGE",

  MULTI_VECTOR_COORDINATED_CYBER_ATTACK:
    "MULTI_VECTOR_ATTACK"

};


/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(
  value,
  fallback = 0
) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return fallback;

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
   SCENARIO NORMALIZATION
========================================================= */

function normalizeScenario(
  scenario
) {

  if (!scenario) {

    return null;

  }


  if (
    SCENARIO_MAP[scenario]
  ) {

    return scenario;

  }


  return (
    SCENARIO_ALIASES[
      scenario
    ] ||
    null
  );

}


/* =========================================================
   SCENARIO RESOLUTION
========================================================= */

function resolveRule(
  scenario
) {

  const normalizedScenario =
    normalizeScenario(
      scenario
    );


  if (
    !normalizedScenario
  ) {

    return {

      success:
        false,

      error:
        "CYB_SCENARIO_NOT_REGISTERED",

      scenario,

      normalizedScenario:
        null

    };

  }


  const ruleId =
    SCENARIO_MAP[
      normalizedScenario
    ];


  if (!ruleId) {

    return {

      success:
        false,

      error:
        "CYB_RULE_NOT_REGISTERED",

      scenario:
        normalizedScenario,

      ruleId

    };

  }


  const rule =
    RULES[ruleId];


  if (!rule) {

    return {

      success:
        false,

      error:
        "CYB_RULE_NOT_REGISTERED",

      scenario:
        normalizedScenario,

      ruleId

    };

  }


  return {

    success:
      true,

    scenario:
      normalizedScenario,

    originalScenario:
      scenario,

    ruleId,

    rule

  };

}


/* =========================================================
   DOMAIN STATUS
========================================================= */

function getStatus() {

  return {

    id:
      "CYB",

    name:
      "Cyber Resilience",

    status:
      "ACTIVE",

    engine:
      "CYBRuleEngine",

    engineRegistered:
      true,

    evaluateAvailable:
      true,

    ruleCount:
      Object.keys(
        RULES
      ).length,

    rules:
      Object.keys(
        RULES
      ),

    scenarios:
      Object.keys(
        SCENARIO_MAP
      ),

    scenarioAliases:
      Object.keys(
        SCENARIO_ALIASES
      ),

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

  const normalizedScenario =
    normalizeScenario(
      scenario
    );


  const intensity =
    safeNumber(
      input.intensity,
      0
    );


  let stress =
    intensity;


  switch (
    normalizedScenario
  ) {


    /* -----------------------------------------------------
       CYB-001
       MALWARE EVENT
    ----------------------------------------------------- */

    case "MALWARE_EVENT":

      stress = (

        safeNumber(
          input.infectionRate
        ) +

        safeNumber(
          input.systemImpact
        ) +

        safeNumber(
          input.detectionDelay
        ) +

        safeNumber(
          input.containmentFailure
        ) +

        intensity

      ) / 5;

      break;


    /* -----------------------------------------------------
       CYB-002
       DATA BREACH
    ----------------------------------------------------- */

    case "DATA_BREACH":

      stress = (

        safeNumber(
          input.credentialExposure
        ) +

        safeNumber(
          input.dataSeverity
        ) +

        safeNumber(
          input.unauthorizedAccess
        ) +

        safeNumber(
          input.exfiltrationVolume
        ) +

        safeNumber(
          input.identityFailure
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-003
       DDOS
    ----------------------------------------------------- */

    case "DDOS_ATTACK":

      stress = (

        safeNumber(
          input.trafficSpike
        ) +

        safeNumber(
          input.packetLoss
        ) +

        safeNumber(
          input.latency
        ) +

        safeNumber(
          input.serviceDegradation
        ) +

        safeNumber(
          input.mitigationStrain
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-004
       INSIDER THREAT
    ----------------------------------------------------- */

    case "INSIDER_THREAT":

      stress = (

        safeNumber(
          input.privilegedActivity
        ) +

        safeNumber(
          input.dataAccess
        ) +

        safeNumber(
          input.configurationChange
        ) +

        safeNumber(
          input.exfiltrationRisk
        ) +

        safeNumber(
          input.auditIrregularity
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-005
       RANSOMWARE
    ----------------------------------------------------- */

    case "RANSOMWARE_EVENT":

      stress = (

        safeNumber(
          input.systemEncryption
        ) +

        safeNumber(
          input.serviceImpact
        ) +

        safeNumber(
          input.backupRisk
        ) +

        safeNumber(
          input.containmentFailure
        ) +

        safeNumber(
          input.recoveryDelay
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-006
       API ABUSE
    ----------------------------------------------------- */

    case "API_ABUSE":

      stress = (

        safeNumber(
          input.requestVolume
        ) +

        safeNumber(
          input.authenticationFailure
        ) +

        safeNumber(
          input.tokenMisuse
        ) +

        safeNumber(
          input.endpointOverload
        ) +

        safeNumber(
          input.serviceDegradation
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-007
       SUPPLY CHAIN COMPROMISE
    ----------------------------------------------------- */

    case "SUPPLY_CHAIN_COMPROMISE":

      stress = (

        safeNumber(
          input.dependencyRisk
        ) +

        safeNumber(
          input.integrityFailure
        ) +

        safeNumber(
          input.vendorRisk
        ) +

        safeNumber(
          input.pipelineAnomaly
        ) +

        safeNumber(
          input.systemPropagation
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-008
       CLOUD MISCONFIGURATION
    ----------------------------------------------------- */

    case "CLOUD_MISCONFIGURATION":

      stress = (

        safeNumber(
          input.publicExposure
        ) +

        safeNumber(
          input.iamRisk
        ) +

        safeNumber(
          input.configurationDrift
        ) +

        safeNumber(
          input.dataExposure
        ) +

        safeNumber(
          input.accessAnomaly
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-009
       IDENTITY OUTAGE
    ----------------------------------------------------- */

    case "IDENTITY_OUTAGE":

      stress = (

        safeNumber(
          input.loginFailure
        ) +

        safeNumber(
          input.tokenFailure
        ) +

        safeNumber(
          input.sessionFailure
        ) +

        safeNumber(
          input.authenticationDowntime
        ) +

        safeNumber(
          input.serviceDependency
        ) +

        intensity

      ) / 6;

      break;


    /* -----------------------------------------------------
       CYB-010
       MULTI-VECTOR ATTACK
    ----------------------------------------------------- */

    case "MULTI_VECTOR_ATTACK":

      stress = (

        safeNumber(
          input.networkAttack
        ) +

        safeNumber(
          input.credentialCompromise
        ) +

        safeNumber(
          input.malwareImpact
        ) +

        safeNumber(
          input.apiAbuse
        ) +

        safeNumber(
          input.supplyChainRisk
        ) +

        safeNumber(
          input.infrastructureImpact
        ) +

        intensity

      ) / 7;

      break;


    /* -----------------------------------------------------
       DEFAULT
    ----------------------------------------------------- */

    default:

      stress =
        intensity;

  }


  return Math.max(

    0,

    Math.min(
      100,
      stress
    )

  );

}


/* =========================================================
   RISK CLASSIFICATION
========================================================= */

function classifyRisk(
  stress
) {

  const value =
    safeNumber(
      stress,
      0
    );


  if (
    value < 25
  ) {

    return "GREEN";

  }


  if (
    value < 50
  ) {

    return "YELLOW";

  }


  if (
    value < 75
  ) {

    return "ORANGE";

  }


  return "RED";

}


/* =========================================================
   GOLDEN SCORE
========================================================= */

function calculateGoldenScore(
  stress
) {

  const safeStress =
    safeNumber(
      stress,
      0
    );


  return (
    safeStress *
    (1 / PHI)
  );

}


/* =========================================================
   RESILIENCE SCORE
========================================================= */

function calculateResilience(
  stress
) {

  const goldenScore =
    calculateGoldenScore(
      stress
    );


  return Math.max(

    0,

    Math.min(

      100,

      100 -
      goldenScore

    )

  );

}


/* =========================================================
   CASCADE GENERATION
========================================================= */

function generateCascade(
  scenario,
  risk
) {

  const normalizedScenario =
    normalizeScenario(
      scenario
    );


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
      cascades[
        normalizedScenario
      ] ||
      [
        "No cascade defined"
      ],

    crossDomainImpact: [

      "CYB",

      "DC",

      "INF",

      "FIN"

    ]

  };

}


/* =========================================================
   CONTINGENCY ACTIONS
========================================================= */

function getContingencyActions(
  scenario
) {

  const normalizedScenario =
    normalizeScenario(
      scenario
    );


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


  return (

    actions[
      normalizedScenario
    ] ||

    []

  );

}


/* =========================================================
   DECISION GENERATION
========================================================= */

function generateDecision(
  risk
) {

  return {

    recommendation:

      risk === "GREEN"

        ? "MAINTAIN_NORMAL_OPERATION"

        : "INITIATE_RESILIENCE_RESPONSE",

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      "HUMAN_AUTHORIZATION_REQUIRED",

    autonomousExecution:
      false

  };

}


/* =========================================================
   GOVERNANCE
========================================================= */

function buildGovernance() {

  return {

    humanAuthorizationRequired:
      true,

    autonomousExecution:
      false,

    executionAuthority:
      "HUMAN_OPERATOR",

    aiRole:
      "DECISION_SUPPORT_ONLY"

  };

}


/* =========================================================
   MAIN EVALUATION
========================================================= */

function evaluate(
  scenario,
  input = {}
) {

  const resolution =
    resolveRule(
      scenario
    );


  if (
    !resolution.success
  ) {

    return resolution;

  }


  const normalizedScenario =
    resolution.scenario;


  const stress =
    calculateStress(

      normalizedScenario,

      input

    );


  const goldenScore =
    calculateGoldenScore(
      stress
    );


  const resilienceScore =
    calculateResilience(
      stress
    );


  const risk =
    classifyRisk(
      stress
    );


  const cascade =
    generateCascade(

      normalizedScenario,

      risk

    );


  const contingencyActions =
    getContingencyActions(

      normalizedScenario

    );


  const decision =
    generateDecision(
      risk
    );


  const governance =
    buildGovernance();


  const timestamp =
    new Date().toISOString();


  return {

    success:
      true,

    domain:
      "CYB",

    engine:
      "CYBRuleEngine",

    scenario:
      normalizedScenario,

    originalScenario:
      scenario,

    rule:
      resolution.rule,

    assessment: {

      stress,

      goldenScore,

      resilienceScore,

      risk

    },

    cascade,

    contingencyActions,

    decision,

    governance,

    audit: {

      engine:
        "CYBRuleEngine",

      domain:
        "CYB",

      ruleId:
        resolution.ruleId,

      scenario:
        normalizedScenario,

      originalScenario:
        scenario,

      risk,

      stress,

      goldenScore,

      resilienceScore,

      timestamp

    }

  };

}


/* =========================================================
   ENGINE SELF-CHECK
========================================================= */

function verifyCYBEngine() {

  try {

    const testState = {

      scenario:
        "MALWARE_EVENT",

      intensity:
        0,

      infectionRate:
        0,

      systemImpact:
        0,

      detectionDelay:
        0,

      containmentFailure:
        0

    };


    const result =
      evaluate(

        testState.scenario,

        testState

      );


    const pass =

      result &&

      result.success === true &&

      result.domain ===
        "CYB" &&

      result.engine ===
        "CYBRuleEngine" &&

      result.assessment &&

      typeof result.assessment.stress ===
        "number" &&

      typeof result.assessment.resilienceScore ===
        "number" &&

      result.decision &&
      result.decision.executionAuthority ===
        "HUMAN_OPERATOR" &&

      result.governance &&
      result.governance.autonomousExecution ===
        false;


    return {

      engine:
        "CYBRuleEngine",

      domain:
        "CYB",

      status:
        pass
          ? "PASS"
          : "FAIL",

      testScenario:
        "MALWARE_EVENT",

      result:
        pass
          ? "CYB_ENGINE_OPERATIONAL"
          : "CYB_ENGINE_VALIDATION_FAILED",

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      engine:
        "CYBRuleEngine",

      domain:
        "CYB",

      status:
        "FAIL",

      error:
        error.message,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   ES MODULE EXPORTS
========================================================= */

export {

  PHI,

  RULES,

  SCENARIO_MAP,

  SCENARIO_ALIASES,

  getStatus,

  normalizeScenario,

  resolveRule,

  evaluate,

  verifyCYBEngine,

  classifyRisk,

  calculateStress,

  calculateGoldenScore,

  calculateResilience,

  generateCascade,

  getContingencyActions,

  generateDecision,

  buildGovernance

};