/**
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * COCKPIT
 *    ↓
 * DOMAIN INTEGRATION
 *    ↓
 * AUTHORITATIVE DOMAIN RULE ENGINE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE PIPELINE
 *    ↓
 * RESULT / MEMORY / AUDIT
 *
 * ACTIVE DOMAINS
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 * INF — Infrastructure Resilience
 *
 * IMPORTANT:
 * This integration layer accepts domain engines that expose
 * either:
 *
 *   getScenarioMap()
 *   SCENARIO_MAP
 *
 * and either:
 *
 *   getRules()
 *   RULES
 *
 * The authoritative domain engine remains responsible for
 * domain-specific evaluation.
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
  from "./FIN/FINRuleEngine.js";

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

const DOMAIN_ENGINE_REGISTRY = {

  FIN: FINRuleEngine,
  BHR: BHRRuleEngine,
  DC: DCRuleEngine,
  CYB: CYBRuleEngine,
  INF: INFRuleEngine

};


/* =========================================================
   DOMAIN ENGINE ACCESSOR
========================================================= */

export function getDomainEngine(domainId) {

  const engine = DOMAIN_ENGINE_REGISTRY[domainId];

  if (!engine) {
    throw new Error(
      `No active domain engine registered for domain: ${domainId}`
    );
  }

  return engine;
}


/* =========================================================
   DOMAIN REGISTRY ACCESSOR
========================================================= */

export function getDomainDefinition(domainId) {

  return DOMAIN_REGISTRY[domainId] || null;

}


/* =========================================================
   ACTIVE DOMAIN CHECK
========================================================= */

export function isDomainActive(domainId) {

  const domain = DOMAIN_REGISTRY[domainId];

  return Boolean(
    domain &&
    domain.status === "ACTIVE" &&
    DOMAIN_ENGINE_REGISTRY[domainId]
  );

}


/* =========================================================
   REGISTERED ACTIVE DOMAINS
========================================================= */

export function getActiveDomains() {

  return Object.keys(DOMAIN_ENGINE_REGISTRY);

}

 
  ======================================================
   DOMAIN ENGINE REGISTRY
========================================================= */


 FINRuleEngine
  from "./FIN/FINRuleEngine.js";

import * as BHRRuleEngine
  from "./BHR/BHRRuleEngine.js";

import * as DCRuleEngine
  from "./DC/DCRuleEngine.js";

import * as CYBRuleEngine
  from "./CYB/CYBRuleEngine.js";

import * as INFRuleEngine
  from "./INF/INFRuleEngine.js"
  ====================================
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
     FIN
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
     BHR
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
     DC
  ------------------------------------------------------- */

  INFRASTRUCTURE_STRESS:
    "DC",

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
     CYB
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
   ENGINE SCENARIO MAP COMPATIBILITY
========================================================= */

/**
 * Supports both engine styles:
 *
 * 1. engine.getScenarioMap()
 *
 * 2. engine.SCENARIO_MAP
 */
function getEngineScenarioMap(
  engine
) {

  if (
    !engine
  ) {

    return null;

  }


  if (
    typeof engine.getScenarioMap ===
    "function"
  ) {

    try {

      const map =
        engine.getScenarioMap();

      if (
        map &&
        typeof map === "object"
      ) {

        return map;

      }

    }

    catch (error) {

      /* Fall through to exported map. */

    }

  }


  if (
    engine.SCENARIO_MAP &&
    typeof engine.SCENARIO_MAP === "object"
  ) {

    return engine.SCENARIO_MAP;

  }


  return null;

}


/* =========================================================
   ENGINE RULE REGISTRY COMPATIBILITY
========================================================= */

/**
 * Supports both engine styles:
 *
 * 1. engine.getRules()
 *
 * 2. engine.RULES
 */
function getEngineRules(
  engine
) {

  if (
    !engine
  ) {

    return null;

  }


  if (
    typeof engine.getRules ===
    "function"
  ) {

    try {

      const rules =
        engine.getRules();

      if (
        rules &&
        typeof rules === "object"
      ) {

        return rules;

      }

    }

    catch (error) {

      /* Fall through to exported RULES. */

    }

  }


  if (
    engine.RULES &&
    typeof engine.RULES === "object"
  ) {

    return engine.RULES;

  }


  return null;

}


/* =========================================================
   REGISTER ENGINE SCENARIOS
========================================================= */

function registerEngineScenarios(
  domainId,
  engine
) {

  const scenarioMap =
    getEngineScenarioMap(
      engine
    );


  if (
    !scenarioMap
  ) {

    return {

      registered:
        false,

      scenarioCount:
        0

    };

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


  return {

    registered:
      true,

    scenarioCount:
      Object.keys(
        scenarioMap
      ).length

  };

}


/* =========================================================
   REGISTER ALL AUTHORITATIVE ENGINE SCENARIOS
========================================================= */

Object.entries(
  DOMAIN_ENGINES
).forEach(
  ([domainId, engine]) => {

    registerEngineScenarios(
      domainId,
      engine
    );

  }
);


/* =========================================================
   MAP SCENARIO
========================================================= */

function mapScenario(
  scenario
) {

  if (
    !scenario
  ) {

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


  const scenarioRegistration =
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

    scenarioRegistration,

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


  if (
    !domain
  ) {

    return {

      domain:
        domainId,

      status:
        "UNKNOWN",

      engineRegistered:
        false,

      evaluateAvailable:
        false,

      scenarioMapAvailable:
        false,

      ruleRegistryAvailable:
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
      Boolean(
        engine
      ),

    evaluateAvailable:
      Boolean(
        engine &&
        typeof engine.evaluate ===
        "function"
      ),

    scenarioMapAvailable:
      Boolean(
        getEngineScenarioMap(
          engine
        )
      ),

    ruleRegistryAvailable:
      Boolean(
        getEngineRules(
          engine
        )
      ),

    scenarioCount:
      Object.keys(
        getEngineScenarioMap(
          engine
        ) || {}
      ).length,

    ruleCount:
      Object.keys(
        getEngineRules(
          engine
        ) || {}
      ).length

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


  if (
    !engine
  ) {

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


  const verifiedState =
    verification.verifiedState;


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

          verifiedState.scenario,

          verifiedState

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

          verifiedState,

          {

            ...context,

            scenario:
              verifiedState.scenario,

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

          verifiedState.scenario,

          verifiedState

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

      const status =
        getDomainStatus(
          domain.id
        );


      return {

        id:
          domain.id,

        name:
          domain.name,

        status:
          domain.status,

        engineRegistered:
          status.engineRegistered,

        evaluateAvailable:
          status.evaluateAvailable,

        scenarioMapAvailable:
          status.scenarioMapAvailable,

        ruleRegistryAvailable:
          status.ruleRegistryAvailable,

        scenarioCount:
          status.scenarioCount,

        ruleCount:
          status.ruleCount

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

  const scenarioMap =
    getEngineScenarioMap(
      engine
    );


  if (
    !scenarioMap
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


  if (
    !domain
  ) {

    return {

      success:
        false,

      domain:
        null,

      error:
        "NO_DOMAIN_MAPPED_TO_SCENARIO",

      scenario:
        state.scenario ||
        null

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
      ] = {

        engineRegistered:
          status.engineRegistered,

        evaluateAvailable:
          status.evaluateAvailable,

        scenarioMapAvailable:
          status.scenarioMapAvailable,

        ruleRegistryAvailable:
          status.ruleRegistryAvailable,

        ready:
          status.engineRegistered &&
          status.evaluateAvailable

      };

    }
  );


  return {

    test:
      "DOMAIN_REGISTRATION",

    passed:
      Object.values(
        results
      ).every(
        value =>
          value.ready === true
      ),

    results

  };

}


/* =========================================================
   SELF-TEST — SCENARIO RESOLUTION
========================================================= */

function selfTestScenarioResolution() {

  const tests = {

    /* FIN */

    LIQUIDITY_CRISIS:
      "FIN",

    /* BHR */

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

    /* DC */

    INFRASTRUCTURE_STRESS:
      "DC",

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

    /* CYB */

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
        value =>
          value === true
      ),

    results

  };

}


/* =========================================================
   SELF-TEST — DC EXECUTION
========================================================= */

function selfTestDCExecution() {

  const scenarios = [

    "COOLING_FAILURE",

    "POWER_INSTABILITY",

    "NETWORK_CONGESTION",

    "COMPUTE_LOAD_SPIKE",

    "BLACKOUT_RECOVERY",

    "COOLING_RECOVERY_FAILURE",

    "NETWORK_HARDWARE_FAILURE",

    "STORAGE_DEGRADATION",

    "COOLING_LOAD_SATURATION",

    "MULTI_SYSTEM_CASCADE"

  ];


  const results =
    {};


  scenarios.forEach(
    scenario => {

      const result =
        executeScenarioDomain(

          {

            scenario,

            intensity:
              50,

            dc:
              50,

            inf:
              50,

            energy:
              50,

            temperature:
              50,

            cooling:
              50,

            thermal:
              50

          },

          {

            source:
              "SPD_V13_1_DC_SELF_TEST",

            test:
              true

          }

        );


      results[
        scenario
      ] = {

        success:
          result?.success === true,

        domain:
          result?.domain ||
          null,

        engine:
          result?.result?.engine ||
          null

      };

    }
  );


  return {

    test:
      "DC_EXECUTION",

    passed:
      Object.values(
        results
      ).every(
        result =>
          result.success === true &&
          result.domain === "DC"
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


  const dcExecution =
    selfTestDCExecution();


  const passed =
    registration.passed &&
    resolution.passed &&
    integration.status === "READY" &&
    dcExecution.passed;


  return {

    status:
      passed
        ? "PASS"
        : "FAIL",

    registration,

    resolution,

    integration,

    dcExecution,

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

  getEngineScenarioMap,

  getEngineRules,

  getEngineScenarioCount,

  verifyDomainIntegration,

  selfTestDomainRegistration,

  selfTestScenarioResolution,

  selfTestDCExecution,

  selfTest

};
