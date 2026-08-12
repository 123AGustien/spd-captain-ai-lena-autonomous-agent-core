/**
 * SPD v13.1 — INF Rule Engine
 *
 * Infrastructure Resilience Domain
 *
 * Rules:
 * INF-001 Regional Network Outage
 * INF-002 DNS Infrastructure Failure
 * INF-003 ISP Backbone Congestion
 * INF-004 Power Grid Instability
 * INF-005 Data Centre Interconnect Failure
 * INF-006 Cloud Region Outage
 * INF-007 Load Balancer Failure
 * INF-008 Certificate Authority / TLS Failure
 * INF-009 Edge Network Node Failure
 * INF-010 Multi-Layer Infrastructure Collapse
 *
 * Purpose:
 * Deterministically resolve and evaluate infrastructure
 * resilience scenarios using the governed Sextant Rule Library.
 *
 * Governance:
 * - AI provides decision support
 * - Human operator retains execution authority
 * - Human authorization is mandatory
 * - Autonomous execution is disabled
 * - Evaluation is deterministic
 * - All evaluations generate an audit record
 */

const INFRuleEngine = (() => {

  /* =======================================================
   * DOMAIN CONFIGURATION
   * ======================================================= */

  const DOMAIN = "INF";
  const STATUS = "ACTIVE";
  const VERSION = "1.1";

  const PHI = 1.61803398875;


  /* =======================================================
   * GOVERNANCE CONSTANTS
   * ======================================================= */

  const EXECUTION_AUTHORITY = "HUMAN_OPERATOR";

  const EXECUTION_STATUS =
    "HUMAN_AUTHORIZATION_REQUIRED";


  /* =======================================================
   * GOVERNED RULE REGISTRY
   * ======================================================= */

  const RULES = {

    "INF-001": {
      id: "INF-001",
      scenario: "REGIONAL_NETWORK_OUTAGE",
      name: "Regional Network Outage",
      category: "NETWORK"
    },

    "INF-002": {
      id: "INF-002",
      scenario: "DNS_FAILURE",
      name: "DNS Infrastructure Failure",
      category: "DNS"
    },

    "INF-003": {
      id: "INF-003",
      scenario: "ISP_CONGESTION",
      name: "ISP Backbone Congestion",
      category: "NETWORK"
    },

    "INF-004": {
      id: "INF-004",
      scenario: "POWER_GRID_INSTABILITY",
      name: "Power Grid Instability",
      category: "POWER"
    },

    "INF-005": {
      id: "INF-005",
      scenario: "DCI_FAILURE",
      name: "Data Centre Interconnect Failure",
      category: "DATA_CENTRE"
    },

    "INF-006": {
      id: "INF-006",
      scenario: "CLOUD_REGION_OUTAGE",
      name: "Cloud Region Outage",
      category: "CLOUD"
    },

    "INF-007": {
      id: "INF-007",
      scenario: "LOAD_BALANCER_FAILURE",
      name: "Load Balancer Failure",
      category: "APPLICATION_INFRASTRUCTURE"
    },

    "INF-008": {
      id: "INF-008",
      scenario: "TLS_PKI_FAILURE",
      name: "Certificate Authority / TLS Failure",
      category: "SECURITY_INFRASTRUCTURE"
    },

    "INF-009": {
      id: "INF-009",
      scenario: "EDGE_NODE_FAILURE",
      name: "Edge Network Node Failure",
      category: "EDGE"
    },

    "INF-010": {
      id: "INF-010",
      scenario: "MULTI_LAYER_COLLAPSE",
      name: "Multi-Layer Infrastructure Collapse",
      category: "SYSTEMIC"
    }

  };


  /* =======================================================
   * SCENARIO MAP
   * ======================================================= */

  const SCENARIO_MAP = {

    REGIONAL_NETWORK_OUTAGE: "INF-001",

    DNS_FAILURE: "INF-002",

    ISP_CONGESTION: "INF-003",

    POWER_GRID_INSTABILITY: "INF-004",

    DCI_FAILURE: "INF-005",

    CLOUD_REGION_OUTAGE: "INF-006",

    LOAD_BALANCER_FAILURE: "INF-007",

    TLS_PKI_FAILURE: "INF-008",

    EDGE_NODE_FAILURE: "INF-009",

    MULTI_LAYER_COLLAPSE: "INF-010"

  };


  /* =======================================================
   * SAFE NUMBER
   * ======================================================= */

  function safeNumber(
    value,
    fallback = 0
  ) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return fallback;
    }

    return Math.max(
      0,
      Math.min(100, number)
    );

  }


  /* =======================================================
   * RISK CLASSIFICATION
   *
   * 0–29   GREEN
   * 30–49  YELLOW
   * 50–69  ORANGE
   * 70–100 RED
   * ======================================================= */

  function classifyRisk(stress) {

    const value =
      safeNumber(stress);

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


  /* =======================================================
   * SCENARIO INPUT DEFINITIONS
   * ======================================================= */

  const SCENARIO_INPUTS = {

    "INF-001": [
      "network",
      "dns",
      "intensity"
    ],

    "INF-002": [
      "dns",
      "network",
      "intensity"
    ],

    "INF-003": [
      "network",
      "intensity"
    ],

    "INF-004": [
      "power",
      "intensity"
    ],

    "INF-005": [
      "dci",
      "network",
      "intensity"
    ],

    "INF-006": [
      "cloud",
      "dci",
      "intensity"
    ],

    "INF-007": [
      "loadBalancer",
      "network",
      "intensity"
    ],

    "INF-008": [
      "tls",
      "network",
      "intensity"
    ],

    "INF-009": [
      "edge",
      "network",
      "intensity"
    ],

    "INF-010": [
      "network",
      "dns",
      "power",
      "cloud",
      "loadBalancer",
      "tls",
      "edge",
      "dci",
      "system",
      "intensity"
    ]

  };


  /* =======================================================
   * STRESS CALCULATION
   *
   * Scenario-specific deterministic calculation.
   * Only defined inputs for the selected rule are used.
   * Values are bounded 0–100.
   * ======================================================= */

  function calculateStress(
    input = {},
    ruleId = null
  ) {

    const fields =
      SCENARIO_INPUTS[ruleId] ||
      Object.keys(input);

    const values = fields
      .map(
        field =>
          safeNumber(
            input[field],
            0
          )
      );

    if (values.length === 0) {
      return 0;
    }

    const total =
      values.reduce(
        (sum, value) =>
          sum + value,
        0
      );

    return Number(
      (
        total /
        values.length
      ).toFixed(3)
    );

  }


  /* =======================================================
   * GOLDEN SCORE
   * ======================================================= */

  function calculateGoldenScore(
    stress
  ) {

    return Number(
      (
        safeNumber(stress) *
        (1 / PHI)
      ).toFixed(6)
    );

  }


  /* =======================================================
   * RESILIENCE SCORE
   *
   * SPD Golden Rule resilience model:
   *
   * Golden Score = Stress × (1 / PHI)
   *
   * Resilience =
   * 100 − Golden Score
   * ======================================================= */

  function calculateResilience(
    stress
  ) {

    const goldenScore =
      calculateGoldenScore(
        stress
      );

    return Number(
      Math.max(
        0,
        Math.min(
          100,
          100 - goldenScore
        )
      ).toFixed(6)
    );

  }


  /* =======================================================
   * CASCADE GENERATION
   * ======================================================= */

  function generateCascade(
    ruleId,
    risk
  ) {

    const cascades = {

      "INF-001": [
        "Network Instability",
        "Service Degradation",
        "Inter-System Communication Failure",
        "Operational Impact"
      ],

      "INF-002": [
        "DNS Instability",
        "Service Access Disruption",
        "Application Reachability Issues",
        "Operational Impact"
      ],

      "INF-003": [
        "Backbone Congestion",
        "Network Latency Increase",
        "Service Degradation",
        "Operational Impact"
      ],

      "INF-004": [
        "Power Instability",
        "Cooling Stress",
        "Compute Degradation",
        "Service Disruption"
      ],

      "INF-005": [
        "DCI Instability",
        "Replication Delay",
        "Service Inconsistency",
        "Operational Impact"
      ],

      "INF-006": [
        "Region Failure",
        "Service Collapse",
        "Cross-Region Failover Stress",
        "Cross-Domain Systemic Risk"
      ],

      "INF-007": [
        "Load Balancer Failure",
        "Traffic Collapse",
        "Infrastructure Overload",
        "Cross-Domain Systemic Risk"
      ],

      "INF-008": [
        "PKI Failure",
        "Secure Infrastructure Disruption",
        "Service Access Failure",
        "Cross-Domain Systemic Risk"
      ],

      "INF-009": [
        "Edge Failure",
        "Central Load Increase",
        "Latency Escalation",
        "Service Degradation"
      ],

      "INF-010": [
        "Infrastructure Collapse",
        "Service System Failure",
        "Cross-Domain Systemic Crisis",
        "Financial & Operational Breakdown"
      ]

    };

    return {

      severity:
        risk,

      cascade:
        risk === "GREEN"
          ? []
          : (
              cascades[ruleId] ||
              []
            ),

      crossDomainImpact: [
        "INF",
        "DC",
        "CYB",
        "FIN"
      ]

    };

  }


  /* =======================================================
   * CONTINGENCY ACTIONS
   * ======================================================= */

  function generateActions(
    ruleId,
    risk
  ) {

    if (risk === "GREEN") {

      return [
        "Continue normal monitoring"
      ];

    }

    const actions = {

      "INF-001": [
        "Activate redundant network paths",
        "Failover to secondary regions",
        "Validate DNS integrity",
        "Monitor routing stability"
      ],

      "INF-002": [
        "Validate authoritative DNS zones",
        "Activate redundant DNS providers",
        "Monitor resolver health",
        "Validate service accessibility"
      ],

      "INF-003": [
        "Reroute traffic",
        "Reduce non-critical bandwidth",
        "Enable traffic prioritisation",
        "Escalate to ISP operations"
      ],

      "INF-004": [
        "Verify backup power readiness",
        "Monitor UPS and generator status",
        "Reduce non-critical load",
        "Coordinate infrastructure response"
      ],

      "INF-005": [
        "Validate replication integrity",
        "Protect single-primary operation",
        "Monitor data consistency",
        "Prepare disaster recovery failover"
      ],

      "INF-006": [
        "Prepare controlled multi-region failover",
        "Validate backup-region readiness",
        "Verify data replication",
        "Escalate to cloud provider"
      ],

      "INF-007": [
        "Activate redundant load balancer",
        "Validate routing configuration",
        "Monitor backend health",
        "Isolate overloaded services"
      ],

      "INF-008": [
        "Validate certificate status",
        "Restore trust-chain integrity",
        "Monitor TLS failures",
        "Escalate to security infrastructure"
      ],

      "INF-009": [
        "Reroute traffic from failed edge nodes",
        "Validate cache integrity",
        "Monitor central capacity",
        "Prepare regional failover"
      ],

      "INF-010": [
        "Activate disaster recovery mode",
        "Prioritise critical infrastructure",
        "Isolate failing subsystems",
        "Coordinate cross-domain response",
        "Escalate to highest operational authority"
      ]

    };

    return (
      actions[ruleId] ||
      [
        "Increase monitoring",
        "Assess infrastructure resilience",
        "Escalate according to governance procedures"
      ]
    );

  }


  /* =======================================================
   * RULE RESOLUTION
   * ======================================================= */

  function resolveRule(
    scenario
  ) {

    const ruleId =
      SCENARIO_MAP[
        scenario
      ];

    if (!ruleId) {

      return {

        success: false,

        error:
          "INF_SCENARIO_NOT_REGISTERED",

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


  /* =======================================================
   * MAIN RULE EVALUATION
   *
   * Golden Rule:
   *
   * OBSERVE
   * VERIFY
   * ASSESS
   * DECIDE
   * ACT
   * UPDATE
   *
   * "ACT" remains gated by HUMAN_OPERATOR.
   * ======================================================= */

  function evaluate(
    scenario,
    input = {}
  ) {

    /* -----------------------------------------------------
     * OBSERVE / RESOLVE
     * --------------------------------------------------- */

    const resolved =
      resolveRule(
        scenario
      );

    if (!resolved.success) {
      return resolved;
    }


    /* -----------------------------------------------------
     * VERIFY
     * --------------------------------------------------- */

    const verifiedInput = {

      ...input

    };


    /* -----------------------------------------------------
     * ASSESS
     * --------------------------------------------------- */

    const stress =
      calculateStress(
        verifiedInput,
        resolved.ruleId
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


    /* -----------------------------------------------------
     * CASCADE
     * --------------------------------------------------- */

    const cascade =
      generateCascade(
        resolved.ruleId,
        risk
      );


    /* -----------------------------------------------------
     * CONTINGENCY
     * --------------------------------------------------- */

    const actions =
      generateActions(
        resolved.ruleId,
        risk
      );


    /* -----------------------------------------------------
     * DECISION
     * --------------------------------------------------- */

    const recommendation =
      risk === "GREEN"
        ? "MAINTAIN_NORMAL_OPERATION"
        : "INITIATE_RESILIENCE_RESPONSE";


    /* -----------------------------------------------------
     * AUDIT
     * --------------------------------------------------- */

    const timestamp =
      new Date().toISOString();


    /* -----------------------------------------------------
     * RESULT
     * --------------------------------------------------- */

    return {

      success: true,

      domain:
        DOMAIN,

      version:
        VERSION,

      scenario,

      rule:
        resolved.rule,

      verifiedInput,

      assessment: {

        stress,

        goldenScore,

        resilienceScore,

        risk

      },

      cascade,

      contingencyActions:
        actions,

      decision: {

        recommendation,

        recommendedAction:
          actions[0],

        executionAuthority:
          EXECUTION_AUTHORITY,

        executionStatus:
          EXECUTION_STATUS

      },

      governance: {

        humanAuthorizationRequired:
          true,

        autonomousExecution:
          false,

        executionAuthority:
          EXECUTION_AUTHORITY,

        policy:
          "NO_ACTION_EXECUTED_WITHOUT_HUMAN_AUTHORIZATION"

      },

      audit: {

        engine:
          "INFRuleEngine",

        domain:
          DOMAIN,

        version:
          VERSION,

        ruleId:
          resolved.ruleId,

        scenario,

        risk,

        stress,

        goldenScore,

        resilienceScore,

        timestamp

      }

    };

  }


  /* =======================================================
   * DOMAIN STATUS
   * ======================================================= */

  function getStatus() {

    return {

      id:
        DOMAIN,

      name:
        "Infrastructure Resilience",

      status:
        STATUS,

      version:
        VERSION,

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

      executionAuthority:
        EXECUTION_AUTHORITY,

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false

    };

  }


  /* =======================================================
   * ENGINE SELF-CHECK
   * ======================================================= */

  function verifyEngine() {

    const status =
      getStatus();

    const rulesValid =
      status.ruleCount === 10;

    const mappingsValid =
      Object.keys(
        SCENARIO_MAP
      ).length === 10;

    const ruleDefinitionsValid =
      Object.entries(
        SCENARIO_MAP
      ).every(
        ([scenario, ruleId]) =>
          RULES[ruleId] &&
          RULES[ruleId].scenario ===
            scenario
      );

    return {

      domain:
        DOMAIN,

      status:
        rulesValid &&
        mappingsValid &&
        ruleDefinitionsValid
          ? "READY"
          : "FAULT",

      rulesValid,

      mappingsValid,

      ruleDefinitionsValid,

      ruleCount:
        Object.keys(
          RULES
        ).length,

      scenarioCount:
        Object.keys(
          SCENARIO_MAP
        ).length,

      governance: {

        humanAuthorizationRequired:
          true,

        autonomousExecution:
          false

      },

      timestamp:
        new Date().toISOString()

    };

  }


  /* =======================================================
   * PUBLIC API
   * ======================================================= */

  return {

    PHI,

    getStatus,

    verifyEngine,

    resolveRule,

    evaluate,

    classifyRisk,

    calculateStress,

    calculateGoldenScore,

    calculateResilience,

    generateCascade,

    generateActions,

    getRules: () =>
      ({
        ...RULES
      }),

    getScenarioMap: () =>
      ({
        ...SCENARIO_MAP
      })

  };

})();


/* =========================================================
 * COMMONJS EXPORT
 * ========================================================= */

module.exports =
  INFRuleEngine;