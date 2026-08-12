/**
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Existing Cockpit
 *      ↓
 * Domain Integration
 *      ↓
 * Authoritative Domain Rule Engine
 *      ↓
 * Captain AI Lena Decision Core
 *      ↓
 * Golden Rule Pipeline
 *      ↓
 * Result / Memory / Audit
 *
 * ACTIVE DOMAINS
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 * INF — Infrastructure Resilience
 *
 * Purpose:
 * Provides the authoritative gateway between the
 * existing cockpit/scenario controls and registered
 * domain rule engines.
 *
 * The cockpit remains the primary user interface.
 * No separate domain screen is required.
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * Autonomous execution is disabled.
 */


/* =========================================================
   DOMAIN ENGINE IMPORTS
========================================================= */

import * as FINRuleEngine
  from "./FIN/finRuleEngine.js";

import * as BHRRuleEngine
  from "./BHR/BHRRuleEngine.js";

import * as DCRuleEngine
  from "./DC/DCRuleEngine.js";

import * as CYBRuleEngine
  from "./CYB/CYBRuleEngine.js";

import * as INFRuleEngine
  from "./INF/INFRuleEngine.js";


/* =========================================================
   DOMAIN REGISTRY
========================================================= */

const DOMAIN_REGISTRY = {

  FIN: {
    id: "FIN",
    name: "Financial Resilience",
    status: "ACTIVE"
  },

  BHR: {
    id: "BHR",
    name: "Business & Human Rights Resilience",
    status: "ACTIVE"
  },

  DC: {
    id: "DC",
    name: "Data Centre Resilience",
    status: "ACTIVE"
  },

  CYB: {
    id: "CYB",
    name: "Cyber Resilience",
    status: "ACTIVE"
  },

  INF: {
    id: "INF",
    name: "Infrastructure Resilience",
    status: "ACTIVE"
  },

  FX: {
    id: "FX",
    name: "Foreign Exchange",
    status: "PLANNED"
  },

  ENG: {
    id: "ENG",
    name: "Energy",
    status: "PLANNED"
  },

  OPS: {
    id: "OPS",
    name: "Operations",
    status: "PLANNED"
  }

};


/* =========================================================
   DOMAIN ENGINE REGISTRY
========================================================= */

const DOMAIN_ENGINES = {

  FIN:
    FINRuleEngine,

  BHR:
    BHRRuleEngine,

  DC:
    DCRuleEngine,

  CYB:
    CYBRuleEngine,

  INF:
    INFRuleEngine

};


/* =========================================================
   BHR SCENARIO REGISTRY
========================================================= */

const BHR_SCENARIOS = {

  HUMAN_RIGHTS_DUE_DILIGENCE:
    "BHR-001",

  FORCED_LABOUR:
    "BHR-002",

  CHILD_LABOUR:
    "BHR-003",

  DISCRIMINATION:
    "BHR-004",

  OCCUPATIONAL_HEALTH_AND_SAFETY:
    "BHR-005",

  MODERN_SLAVERY:
    "BHR-006",

  COMMUNITY_IMPACT:
    "BHR-007",

  INDIGENOUS_RIGHTS:
    "BHR-008",

  SUPPLY_CHAIN_RISK:
    "BHR-009",

  GRIEVANCE_MECHANISM:
    "BHR-010"

};


/* =========================================================
   SCENARIO → DOMAIN MAPPING
========================================================= */

const SCENARIO_DOMAIN_MAP = {

  /* -------------------------------------------------------
     FINANCIAL RESILIENCE
  ------------------------------------------------------- */

  FIN_STRESS:
    "FIN",

  BANKING_STRESS:
    "FIN",

  LIQUIDITY_CRISIS:
    "FIN",

  CREDIT_STRESS:
    "FIN",

  SOVEREIGN_DEBT:
    "FIN",


  /* -------------------------------------------------------
     BUSINESS & HUMAN RIGHTS
  ------------------------------------------------------- */

  HUMAN_RIGHTS_DUE_DILIGENCE:
    "BHR",

  FORCED_LABOUR:
    "BHR",

  CHILD_LABOUR:
    "BHR",

  DISCRIMINATION:
    "BHR",

  OCCUPATIONAL_HEALTH_AND_SAFETY:
    "BHR",

  MODERN_SLAVERY:
    "BHR",

  COMMUNITY_IMPACT:
    "BHR",

  INDIGENOUS_RIGHTS:
    "BHR",

  SUPPLY_CHAIN_RISK:
    "BHR",

  GRIEVANCE_MECHANISM:
    "BHR",


  /* -------------------------------------------------------
     DATA CENTRE RESILIENCE
  ------------------------------------------------------- */

  COOLING_FAILURE:
    "DC",

  POWER_INSTABILITY:
    "DC",

  NETWORK_CONGESTION:
    "DC",

  COMPUTE_LOAD_SPIKE:
    "DC",

  BLACKOUT_RECOVERY:
    "DC",

  COOLING_RECOVERY_FAILURE:
    "DC",

  NETWORK_HARDWARE_FAILURE:
    "DC",

  STORAGE_DEGRADATION:
    "DC",

  COOLING_LOAD_SATURATION:
    "DC",

  MULTI_SYSTEM_CASCADE:
    "DC",


  /* -------------------------------------------------------
     CYBER RESILIENCE
  ------------------------------------------------------- */

  DATA_BREACH_CREDENTIAL_LEAK:
    "CYB",

  DDOS:
    "CYB",

  INSIDER_THREAT:
    "CYB",

  API_ABUSE_TOKEN_MISUSE:
    "CYB",

  SUPPLY_CHAIN_CYBER_COMPROMISE:
    "CYB",

  CLOUD_MISCONFIGURATION_EXPOSURE:
    "CYB",

  IDENTITY_PROVIDER_OUTAGE:
    "CYB",

  MULTI_VECTOR_COORDINATED_CYBER_ATTACK:
    "CYB"

};


/* =========================================================
   INF SCENARIOS
 *
 * INFRuleEngine remains authoritative.
 *
 * Its own SCENARIO_MAP is used rather than inventing
 * duplicate scenario names here.
========================================================= */

function registerEngineScenarios(
  domainId,
  engine
) {

  if (
    !engine ||
    typeof engine.getScenarioMap !==
    "function"
  ) {

    return;

  }

  const scenarioMap =
    engine.getScenarioMap();

  if (
    !scenarioMap ||
    typeof scenarioMap !== "object"
  ) {

    return;

  }

  Object.keys(
    scenarioMap
  ).forEach(
    scenario => {

      SCENARIO_DOMAIN_MAP[
        scenario
      ] = domainId;

    }
  );

}


/* =========================================================
   REGISTER AUTHORITATIVE ENGINE SCENARIOS
========================================================= */

registerEngineScenarios(
  "INF",
  INFRuleEngine
);


/* =========================================================
   MAP SCENARIO
========================================================= */

function mapScenario(
  scenario
) {

  if (!scenario) {

    return null;

  }

  return (
    SCENARIO_DOMAIN_MAP[
      scenario
    ] ||
    null
  );

}


/* =========================================================
   REGISTER DOMAIN ENGINE
========================================================= */

function registerDomainEngine(
  domainId,
  engine
) {

  if (
    !domainId ||
    !engine
  ) {

    throw new Error(
      "DOMAIN_ENGINE_REGISTRATION_INVALID"
    );

  }

  if (
    typeof engine.evaluate !==
    "function"
  ) {

    throw new Error(
      "DOMAIN_ENGINE_EVALUATE_FUNCTION_REQUIRED"
    );

  }

  if (
    !DOMAIN_REGISTRY[
      domainId
    ]
  ) {

    throw new Error(
      "DOMAIN_NOT_REGISTERED"
    );

  }

  DOMAIN_ENGINES[
    domainId
  ] = engine;

  registerEngineScenarios(
    domainId,
    engine
  );

  return {

    domain:
      domainId,

    registered:
      true,

    engineEvaluate:
      true,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   GET DOMAIN STATUS
========================================================= */

function getDomainStatus(
  domainId
) {

  const domain =
    DOMAIN_REGISTRY[
      domainId
    ];

  if (!domain) {

    return {

      domain:
        domainId,

      status:
        "UNKNOWN",

      engineRegistered:
        false,

      evaluateAvailable:
        false

    };

  }

  const engine =
    DOMAIN_ENGINES[
      domainId
    ];

  return {

    ...domain,

    engineRegistered:
      Boolean(engine),

    evaluateAvailable:
      Boolean(
        engine &&
        typeof engine.evaluate ===
        "function"
      ),

    scenarioMapAvailable:
      Boolean(
        engine &&
        typeof engine.getScenarioMap ===
        "function"
      ),

    ruleRegistryAvailable:
      Boolean(
        engine &&
        typeof engine.getRules ===
        "function"
      )

  };

}


/* =========================================================
   VERIFY DOMAIN INPUT
========================================================= */

function verifyDomainInput(
  domainId,
  state = {}
) {

  if (
    !DOMAIN_REGISTRY[
      domainId
    ]
  ) {

    return {

      valid:
        false,

      reason:
        "UNKNOWN_DOMAIN",

      domain:
        domainId

    };

  }

  if (
    !state ||
    typeof state !== "object" ||
    Array.isArray(state)
  ) {

    return {

      valid:
        false,

      reason:
        "INVALID_STATE",

      domain:
        domainId

    };

  }

  return {

    valid:
      true,

    domain:
      domainId,

    verifiedState:
      {
        ...state
      }

  };

}


/* =========================================================
   EXECUTE DOMAIN RULE
========================================================= */

function executeDomainRule(
  domainId,
  state = {},
  context = {}
) {

  const verification =
    verifyDomainInput(
      domainId,
      state
    );

  if (
    !verification.valid
  ) {

    return {

      success:
        false,

      domain:
        domainId,

      error:
        verification.reason

    };

  }

  const engine =
    DOMAIN_ENGINES[
      domainId
    ];

  if (!engine) {

    return {

      success:
        false,

      domain:
        domainId,

      error:
        "DOMAIN_ENGINE_NOT_REGISTERED"

    };

  }

  if (
    typeof engine.evaluate !==
    "function"
  ) {

    return {

      success:
        false,

      domain:
        domainId,

      error:
        "DOMAIN_ENGINE_EVALUATE_FUNCTION_NOT_AVAILABLE"

    };

  }

  try {

    let result;


    /* -----------------------------------------------------
       FIN
       ----------------------------------------------------- */

    if (
      domainId === "FIN"
    ) {

      result =
        engine.evaluate(

          verification.verifiedState.scenario,

          verification.verifiedState

        );

    }


    /* -----------------------------------------------------
       BHR
       ----------------------------------------------------- */

    else if (
      domainId === "BHR"
    ) {

      result =
        engine.evaluate(

          verification.verifiedState,

          {

            ...context,

            scenario:
              verification.verifiedState.scenario,

            domain:
              domainId

          }

        );

    }


    /* -----------------------------------------------------
       DC / CYB / INF
       ----------------------------------------------------- */

    else {

      result =
        engine.evaluate(

          verification.verifiedState.scenario,

          verification.verifiedState

        );

    }


    return {

      success:
        true,

      domain:
        domainId,

      result

    };

  }

  catch (error) {

    return {

      success:
        false,

      domain:
        domainId,

      error:
        "DOMAIN_ENGINE_EXECUTION_ERROR",

      message:
        error.message

    };

  }

}


/* =========================================================
   LIST DOMAINS
========================================================= */

function listDomains() {

  return Object.values(
    DOMAIN_REGISTRY
  ).map(
    domain => {

      const engine =
        DOMAIN_ENGINES[
          domain.id
        ];

      return {

        id:
          domain.id,

        name:
          domain.name,

        status:
          domain.status,

        engineRegistered:
          Boolean(engine),

        evaluateAvailable:
          Boolean(
            engine &&
            typeof engine.evaluate ===
            "function"
          ),

        scenarioCount:
          getEngineScenarioCount(
            engine
          )

      };

    }
  );

}


/* =========================================================
   GET ENGINE SCENARIO COUNT
========================================================= */

function getEngineScenarioCount(
  engine
) {

  if (
    !engine ||
    typeof engine.getScenarioMap !==
    "function"
  ) {

    return 0;

  }

  const scenarioMap =
    engine.getScenarioMap();

  if (
    !scenarioMap ||
    typeof scenarioMap !==
    "object"
  ) {

    return 0;

  }

  return Object.keys(
    scenarioMap
  ).length;

}


/* =========================================================
   VERIFY DOMAIN INTEGRATION
========================================================= */

function verifyDomainIntegration() {

  const activeDomains = [
    "FIN",
    "BHR",
    "DC",
    "CYB",
    "INF"
  ];

  const statuses =
    {};

  let allReady =
    true;

  activeDomains.forEach(
    domainId => {

      const status =
        getDomainStatus(
          domainId
        );

      statuses[
        domainId
      ] = status;

      if (
        !status.engineRegistered ||
        !status.evaluateAvailable
      ) {

        allReady =
          false;

      }

    }
  );


  return {

    status:
      allReady
        ? "READY"
        : "PARTIAL",

    activeDomains,

    domains:
      statuses,

    registeredEngines:
      Object.keys(
        DOMAIN_ENGINES
      ),

    scenarioMappings:
      Object.keys(
        SCENARIO_DOMAIN_MAP
      ).length,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   RESOLVE DOMAIN
========================================================= */

function resolveDomain(
  state = {}
) {

  if (
    state.domain &&
    DOMAIN_REGISTRY[
      state.domain
    ] &&
    DOMAIN_REGISTRY[
      state.domain
    ].status === "ACTIVE"
  ) {

    return state.domain;

  }

  if (
    state.scenario
  ) {

    return mapScenario(
      state.scenario
    );

  }

  return null;

}


/* =========================================================
   EXECUTE SCENARIO DOMAIN
========================================================= */

function executeScenarioDomain(
  state = {},
  context = {}
) {

  const domain =
    resolveDomain(
      state
    );

  if (!domain) {

    return {

      success:
        false,

      domain:
        null,

      error:
        "NO_DOMAIN_MAPPED_TO_SCENARIO"

    };

  }

  return executeDomainRule(

    domain,

    state,

    {

      ...context,

      scenario:
        state.scenario,

      resolvedDomain:
        domain

    }

  );

}


/* =========================================================
   SELF-TEST — DOMAIN REGISTRATION
========================================================= */

function selfTestDomainRegistration() {

  const results =
    {};

  [
    "FIN",
    "BHR",
    "DC",
    "CYB",
    "INF"
  ].forEach(
    domainId => {

      const status =
        getDomainStatus(
          domainId
        );

      results[
        domainId
      ] =
        status.engineRegistered &&
        status.evaluateAvailable;

    }
  );

  return {

    test:
      "DOMAIN_REGISTRATION",

    passed:
      Object.values(
        results
      ).every(
        value => value === true
      ),

    results

  };

}


/* =========================================================
   SELF-TEST — SCENARIO RESOLUTION
========================================================= */

function selfTestScenarioResolution() {

  const tests = {

    LIQUIDITY_CRISIS:
      "FIN",

    HUMAN_RIGHTS_DUE_DILIGENCE:
      "BHR",

    FORCED_LABOUR:
      "BHR",

    CHILD_LABOUR:
      "BHR",

    DISCRIMINATION:
      "BHR",

    OCCUPATIONAL_HEALTH_AND_SAFETY:
      "BHR",

    MODERN_SLAVERY:
      "BHR",

    COMMUNITY_IMPACT:
      "BHR",

    INDIGENOUS_RIGHTS:
      "BHR",

    SUPPLY_CHAIN_RISK:
      "BHR",

    GRIEVANCE_MECHANISM:
      "BHR"

  };

  const results =
    {};

  Object.entries(
    tests
  ).forEach(
    ([scenario, expectedDomain]) => {

      results[
        scenario
      ] =
        mapScenario(
          scenario
        ) === expectedDomain;

    }
  );

  return {

    test:
      "SCENARIO_RESOLUTION",

    passed:
      Object.values(
        results
      ).every(
        value => value === true
      ),

    results

  };

}


/* =========================================================
   FULL SYSTEM SELF-TEST
========================================================= */

function selfTest() {

  const registration =
    selfTestDomainRegistration();

  const resolution =
    selfTestScenarioResolution();

  const integration =
    verifyDomainIntegration();

  const passed =
    registration.passed &&
    resolution.passed &&
    integration.status ===
      "READY";

  return {

    status:
      passed
        ? "PASS"
        : "FAIL",

    registration,

    resolution,

    integration,

    governance: {

      humanOperator:
        true,

      autonomousExecution:
        false,

      humanAuthorizationRequired:
        true

    },

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  DOMAIN_REGISTRY,

  DOMAIN_ENGINES,

  BHR_SCENARIOS,

  SCENARIO_DOMAIN_MAP,

  registerDomainEngine,

  mapScenario,

  resolveDomain,

  getDomainStatus,

  verifyDomainInput,

  executeDomainRule,

  executeScenarioDomain,

  listDomains,

  verifyDomainIntegration,

  selfTestDomainRegistration,

  selfTestScenarioResolution,

  selfTest

};