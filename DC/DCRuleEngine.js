/**
 * SPD v13.1 — DC Rule Engine
 *
 * Data Centre Resilience Domain
 *
 * Rules:
 * DC-000 Infrastructure Stress
 * DC-001 Cooling Failure
 * DC-002 Power Instability
 * DC-003 Network Congestion
 * DC-004 Compute Load Spike
 * DC-005 Blackout Recovery
 * DC-006 Cooling Recovery Failure
 * DC-007 Network Hardware Failure
 * DC-008 Storage System Degradation
 * DC-009 Cooling Load Saturation
 * DC-010 Multi-System Cascade Failure
 *
 * Purpose:
 * Deterministic simulation and resilience assessment.
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
 * index.html <script type="module">
 */

const PHI = 1.61803398875;


/* =========================================================
   RULE REGISTRY
========================================================= */

const RULES = {

  "DC-000": {
    id: "DC-000",
    name: "Infrastructure Stress",
    category: "INFRASTRUCTURE_RESILIENCE",
    scenario: "INFRASTRUCTURE_STRESS"
  },

  "DC-001": {
    id: "DC-001",
    name: "Cooling Failure",
    category: "THERMAL_INFRASTRUCTURE",
    scenario: "COOLING_FAILURE"
  },

  "DC-002": {
    id: "DC-002",
    name: "Power Instability",
    category: "POWER_INFRASTRUCTURE",
    scenario: "POWER_INSTABILITY"
  },

  "DC-003": {
    id: "DC-003",
    name: "Network Congestion",
    category: "NETWORK_PERFORMANCE",
    scenario: "NETWORK_CONGESTION"
  },

  "DC-004": {
    id: "DC-004",
    name: "Compute Load Spike",
    category: "COMPUTE_WORKLOAD",
    scenario: "COMPUTE_LOAD_SPIKE"
  },

  "DC-005": {
    id: "DC-005",
    name: "Blackout Recovery",
    category: "POWER_RECOVERY",
    scenario: "BLACKOUT_RECOVERY"
  },

  "DC-006": {
    id: "DC-006",
    name: "Cooling Recovery Failure",
    category: "THERMAL_RECOVERY",
    scenario: "COOLING_RECOVERY_FAILURE"
  },

  "DC-007": {
    id: "DC-007",
    name: "Network Hardware Failure",
    category: "NETWORK_INFRASTRUCTURE",
    scenario: "NETWORK_HARDWARE_FAILURE"
  },

  "DC-008": {
    id: "DC-008",
    name: "Storage System Degradation",
    category: "STORAGE_INFRASTRUCTURE",
    scenario: "STORAGE_DEGRADATION"
  },

  "DC-009": {
    id: "DC-009",
    name: "Cooling Load Saturation",
    category: "THERMAL_CAPACITY",
    scenario: "COOLING_LOAD_SATURATION"
  },

  "DC-010": {
    id: "DC-010",
    name: "Multi-System Cascade Failure",
    category: "SYSTEM_CASCADE",
    scenario: "MULTI_SYSTEM_CASCADE"
  }

};


/* =========================================================
   SCENARIO MAP
========================================================= */

const SCENARIO_MAP = {

  INFRASTRUCTURE_STRESS: "DC-000",

  COOLING_FAILURE: "DC-001",

  POWER_INSTABILITY: "DC-002",

  NETWORK_CONGESTION: "DC-003",

  COMPUTE_LOAD_SPIKE: "DC-004",

  BLACKOUT_RECOVERY: "DC-005",

  COOLING_RECOVERY_FAILURE: "DC-006",

  NETWORK_HARDWARE_FAILURE: "DC-007",

  STORAGE_DEGRADATION: "DC-008",

  COOLING_LOAD_SATURATION: "DC-009",

  MULTI_SYSTEM_CASCADE: "DC-010"

};


/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value, fallback = 0) {

  const number = Number(value);

  if (!Number.isFinite(number)) {

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
   SCENARIO RESOLUTION
========================================================= */

function resolveRule(scenario) {

  const ruleId =
    SCENARIO_MAP[scenario];

  if (!ruleId) {

    return {

      success: false,

      error:
        "DC_SCENARIO_NOT_REGISTERED",

      scenario

    };

  }

  const rule =
    RULES[ruleId];

  if (!rule) {

    return {

      success: false,

      error:
        "DC_RULE_NOT_REGISTERED",

      scenario,

      ruleId

    };

  }

  return {

    success: true,

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
      "DC",

    name:
      "Data Centre Resilience",

    status:
      "ACTIVE",

    engine:
      "DCRuleEngine",

    engineRegistered:
      true,

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
   INDICATOR EXTRACTION / STRESS CALCULATION
========================================================= */

function calculateStress(
  scenario,
  input = {}
) {

  const intensity =
    safeNumber(
      input.intensity,
      0
    );

  let stress =
    intensity;


  switch (scenario) {


    /* -----------------------------------------------------
       DC-000
    ----------------------------------------------------- */

    case "INFRASTRUCTURE_STRESS":

      stress =
        (
          safeNumber(input.dc) +
          safeNumber(input.inf) +
          safeNumber(input.energy) +
          safeNumber(input.cyb) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-001
    ----------------------------------------------------- */

    case "COOLING_FAILURE":

      stress =
        (
          safeNumber(input.temperature) +
          safeNumber(input.cooling) +
          safeNumber(input.thermal) +
          intensity
        ) / 4;

      break;


    /* -----------------------------------------------------
       DC-002
    ----------------------------------------------------- */

    case "POWER_INSTABILITY":

      stress =
        (
          safeNumber(input.voltage) +
          safeNumber(input.frequency) +
          safeNumber(input.upsLoad) +
          safeNumber(input.generatorRisk) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-003
    ----------------------------------------------------- */

    case "NETWORK_CONGESTION":

      stress =
        (
          safeNumber(input.bandwidth) +
          safeNumber(input.latency) +
          safeNumber(input.packetLoss) +
          safeNumber(input.routerLoad) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-004
    ----------------------------------------------------- */

    case "COMPUTE_LOAD_SPIKE":

      stress =
        (
          safeNumber(input.cpu) +
          safeNumber(input.memory) +
          safeNumber(input.storageIO) +
          safeNumber(input.queueDepth) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-005
    ----------------------------------------------------- */

    case "BLACKOUT_RECOVERY":

      stress =
        (
          safeNumber(input.powerLoss) +
          safeNumber(input.generatorFailure) +
          safeNumber(input.upsStress) +
          safeNumber(input.recoveryDelay) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-006
    ----------------------------------------------------- */

    case "COOLING_RECOVERY_FAILURE":

      stress =
        (
          safeNumber(input.temperature) +
          safeNumber(input.hotspots) +
          safeNumber(input.coolingInstability) +
          safeNumber(input.throttling) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-007
    ----------------------------------------------------- */

    case "NETWORK_HARDWARE_FAILURE":

      stress =
        (
          safeNumber(input.deviceFailure) +
          safeNumber(input.packetLoss) +
          safeNumber(input.segmentation) +
          safeNumber(input.routingInstability) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-008
    ----------------------------------------------------- */

    case "STORAGE_DEGRADATION":

      stress =
        (
          safeNumber(input.latency) +
          safeNumber(input.iops) +
          safeNumber(input.diskFailure) +
          safeNumber(input.replicationLag) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-009
    ----------------------------------------------------- */

    case "COOLING_LOAD_SATURATION":

      stress =
        (
          safeNumber(input.coolingUtilisation) +
          safeNumber(input.thermalHeadroom) +
          safeNumber(input.hotspots) +
          safeNumber(input.chillerLoad) +
          intensity
        ) / 5;

      break;


    /* -----------------------------------------------------
       DC-010
    ----------------------------------------------------- */

    case "MULTI_SYSTEM_CASCADE":

      stress =
        (
          safeNumber(input.power) +
          safeNumber(input.cooling) +
          safeNumber(input.network) +
          safeNumber(input.compute) +
          safeNumber(input.storage) +
          intensity
        ) / 6;

      break;


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

function classifyRisk(stress) {

  const value =
    safeNumber(
      stress,
      0
    );


  if (value < 25) {

    return "GREEN";

  }


  if (value < 50) {

    return "YELLOW";

  }


  if (value < 75) {

    return "ORANGE";

  }


  return "RED";

}


/* =========================================================
   RESILIENCE SCORE
========================================================= */

function calculateResilience(stress) {

  const safeStress =
    safeNumber(
      stress,
      0
    );

  const goldenScore =
    safeStress *
    (1 / PHI);

  return Math.max(
    0,
    Math.min(
      100,
      100 - goldenScore
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

  const cascades = {


    INFRASTRUCTURE_STRESS: [

      "Infrastructure Stress",

      "Cross-System Operational Strain",

      "Reduced Resilience Margin",

      "Potential Service Degradation",

      "Potential Cross-Domain Cascade"

    ],


    COOLING_FAILURE: [

      "Cooling Failure",

      "Temperature Rise",

      "Server Throttling",

      "Performance Degradation",

      "Potential Hardware Shutdown"

    ],


    POWER_INSTABILITY: [

      "Power Instability",

      "UPS Dependency",

      "Reduced Power Margin",

      "Operational Stress",

      "Service Disruption"

    ],


    NETWORK_CONGESTION: [

      "Network Congestion",

      "Application Slowdown",

      "Service Degradation",

      "Operational Stress"

    ],


    COMPUTE_LOAD_SPIKE: [

      "Compute Load Spike",

      "Resource Saturation",

      "Performance Degradation",

      "Service Latency Increase"

    ],


    BLACKOUT_RECOVERY: [

      "Blackout Event",

      "Infrastructure Stress",

      "Service Instability",

      "Data Synchronisation Risk",

      "Service Recovery"

    ],


    COOLING_RECOVERY_FAILURE: [

      "Cooling Recovery Instability",

      "Performance Throttling",

      "Workload Imbalance",

      "Service Degradation"

    ],


    NETWORK_HARDWARE_FAILURE: [

      "Network Hardware Failure",

      "Network Instability",

      "Service Latency",

      "Application Degradation",

      "Service Outage"

    ],


    STORAGE_DEGRADATION: [

      "Storage Degradation",

      "Application Slowdown",

      "Data Access Delays",

      "Service Performance Impact"

    ],


    COOLING_LOAD_SATURATION: [

      "Cooling Saturation",

      "Thermal Buildup",

      "Compute Throttling",

      "Service Performance Degradation"

    ],


    MULTI_SYSTEM_CASCADE: [

      "Multi-System Failure",

      "Cross-Domain Stress",

      "Infrastructure Instability",

      "Service Outage",

      "Data Loss Risk",

      "Cross-Domain Systemic Crisis"

    ]

  };


  const cascade =
    cascades[scenario] ||
    ["No cascade defined"];


  return {

    risk,

    cascade,

    crossDomainImpact: [

      "DC",

      "INF",

      "CYB",

      "FIN"

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

  const actions = {


    INFRASTRUCTURE_STRESS: [

      "Monitor infrastructure health",

      "Verify DC and INF resilience indicators",

      "Prioritise critical infrastructure",

      "Reduce non-essential system load",

      "Assess cross-domain cascade risk"

    ],


    COOLING_FAILURE: [

      "Activate backup cooling systems",

      "Reduce compute workload",

      "Shift critical services",

      "Notify operations team",

      "Monitor thermal thresholds"

    ],


    POWER_INSTABILITY: [

      "Monitor electrical systems continuously",

      "Verify UPS capacity and battery health",

      "Test generator readiness",

      "Reduce non-essential electrical loads",

      "Prioritise critical services"

    ],


    NETWORK_CONGESTION: [

      "Monitor network performance",

      "Optimise routing",

      "Prioritise critical services",

      "Increase bandwidth where available",

      "Assess cascading impacts"

    ],


    COMPUTE_LOAD_SPIKE: [

      "Monitor compute utilisation",

      "Enable autoscaling",

      "Prioritise critical workloads",

      "Shed non-essential processing",

      "Review capacity"

    ],


    BLACKOUT_RECOVERY: [

      "Activate disaster recovery procedures",

      "Validate system integrity",

      "Prioritise critical services",

      "Monitor generator and UPS",

      "Review RTO and RPO"

    ],


    COOLING_RECOVERY_FAILURE: [

      "Monitor thermal stability",

      "Rebalance workloads",

      "Inspect cooling recalibration",

      "Activate additional cooling",

      "Escalate persistent instability"

    ],


    NETWORK_HARDWARE_FAILURE: [

      "Activate redundant network paths",

      "Isolate failed devices",

      "Restore routing stability",

      "Prioritise critical traffic",

      "Monitor segmentation"

    ],


    STORAGE_DEGRADATION: [

      "Monitor storage health",

      "Replace failing components",

      "Balance I/O workloads",

      "Validate data integrity",

      "Maintain backup and replication"

    ],


    COOLING_LOAD_SATURATION: [

      "Monitor thermal headroom",

      "Reduce non-critical compute",

      "Optimise cooling efficiency",

      "Redistribute workloads",

      "Activate auxiliary cooling"

    ],


    MULTI_SYSTEM_CASCADE: [

      "Activate full-system monitoring",

      "Prioritise critical infrastructure",

      "Isolate failing subsystems",

      "Engage disaster recovery",

      "Coordinate cross-domain response"

    ]

  };


  return actions[scenario] || [];

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


  if (!resolution.success) {

    return resolution;

  }


  const stress =
    calculateStress(
      scenario,
      input
    );


  const goldenScore =
    stress *
    (1 / PHI);


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
      scenario,
      risk
    );


  const contingencyActions =
    getContingencyActions(
      scenario,
      risk
    );


  const timestamp =
    new Date().toISOString();


  return {

    success:
      true,

    domain:
      "DC",

    engine:
      "DCRuleEngine",

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

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false,

      executionAuthority:
        "HUMAN_OPERATOR"

    },

    audit: {

      engine:
        "DCRuleEngine",

      domain:
        "DC",

      ruleId:
        resolution.ruleId,

      scenario,

      risk,

      stress,

      resilienceScore,

      timestamp

    }

  };

}


/* =========================================================
   ES MODULE EXPORTS
========================================================= */

export {

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