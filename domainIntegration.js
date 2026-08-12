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
 * Active Domains:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
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
 * No autonomous recovery execution is permitted.
 */


/* =========================================================
   DOMAIN ENGINE IMPORTS
========================================================= */

import * as FINRuleEngine
  from "./domains/FIN/finRuleEngine.js";

import * as BHRRuleEngine
  from "./domains/BHR/bhrRuleEngine.js";

import * as DCRuleEngine
  from "./domains/DC/DCRuleEngine.js";

import * as CYBRuleEngine
  from "./domains/CYB/CYBRuleEngine.js";


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

  FX: {
    id: "FX",
    name: "Foreign Exchange",
    status: "PLANNED"
  },

  INF: {
    id: "INF",
    name: "Infrastructure",
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
    CYBRuleEngine

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

  BHR_STRESS:
    "BHR",

  LABOUR_RIGHTS:
    "BHR",

  HUMAN_RIGHTS_EVENT:
    "BHR",

  SUPPLY_CHAIN_HUMAN_RIGHTS:
    "BHR",

  COMMUNITY_IMPACT:
    "BHR",

  GOVERNANCE_RISK:
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
    !DOMAIN_REGISTRY[domainId]
  ) {

    throw new Error(
      "DOMAIN_NOT_REGISTERED"
    );

  }

  DOMAIN_ENGINES[
    domainId
  ] = engine;

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
  state,
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

    /*
     * DC and CYB engines use the scenario
     * as the primary evaluation selector.
     *
     * The state object remains the authoritative
     * indicator/input payload.
     */

    if (
      domainId === "DC" ||
      domainId === "CYB"
    ) {

      result =
        engine.evaluate(

          verification.verifiedState.scenario,

          verification.verifiedState

        );

    }

    else {

      result =
        engine.evaluate(

          verification.verifiedState,

          {

            ...context,

            domain:
              domainId

          }

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
          )

      };

    }
  );

}


/* =========================================================
   DOMAIN INTEGRATION SELF-CHECK
========================================================= */

function verifyDomainIntegration() {

  const finStatus =
    getDomainStatus(
      "FIN"
    );

  const bhrStatus =
    getDomainStatus(
      "BHR"
    );

  const dcStatus =
    getDomainStatus(
      "DC"
    );

  const cybStatus =
    getDomainStatus(
      "CYB"
    );

  const finReady =
    finStatus.engineRegistered &&
    finStatus.evaluateAvailable;

  const bhrReady =
    bhrStatus.engineRegistered &&
    bhrStatus.evaluateAvailable;

  const dcReady =
    dcStatus.engineRegistered &&
    dcStatus.evaluateAvailable;

  const cybReady =
    cybStatus.engineRegistered &&
    cybStatus.evaluateAvailable;

  return {

    status:
      finReady &&
      bhrReady &&
      dcReady &&
      cybReady
        ? "READY"
        : "PARTIAL",

    FIN:
      finStatus,

    BHR:
      bhrStatus,

    DC:
      dcStatus,

    CYB:
      cybStatus,

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
   DOMAIN RESOLUTION
========================================================= */

function resolveDomain(
  state = {}
) {

  if (
    state.domain &&
    DOMAIN_REGISTRY[
      state.domain
    ]
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
   DOMAIN EXECUTION FROM SCENARIO
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
   EXPORTS
========================================================= */

export {

  DOMAIN_REGISTRY,

  DOMAIN_ENGINES,

  SCENARIO_DOMAIN_MAP,

  registerDomainEngine,

  mapScenario,

  resolveDomain,

  getDomainStatus,

  verifyDomainInput,

  executeDomainRule,

  executeScenarioDomain,

  listDomains,

  verifyDomainIntegration

};