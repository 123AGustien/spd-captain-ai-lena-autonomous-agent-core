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

  FX_SHOCK:
    "FIN",

  BOND_OUTFLOW:
    "FIN",

  LIQUIDITY_CRISIS:
    "FIN",

  BANKING_STRESS:
    "FIN",

  INFLATION_SHOCK:
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

  DATA_BREACH:
    "CYB",

  CREDENTIAL_LEAK:
    "CYB",

  DATA_BREACH_CREDENTIAL_LEAK:
    "CYB",

  DDOS:
    "CYB",

  DDoS:
    "CYB",

  INSIDER_THREAT:
    "CYB",

  API_ABUSE:
    "CYB",

  TOKEN_MISUSE:
    "CYB",

  API_ABUSE_TOKEN_MISUSE:
    "CYB",

  SUPPLY_CHAIN_CYBER_COMPROMISE:
    "CYB",

  CLOUD_MISCONFIGURATION:
    "CYB",

  IDENTITY_PROVIDER_OUTAGE:
    "CYB",

  AUTHENTICATION_FAILURE:
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

    const scenario =
      state.scenario ||
      context.scenario;


    if (!scenario) {

      return {

        success:
          false,

        domain:
          domainId,

        error:
          "SCENARIO_REQUIRED"

      };

    }


    /*
     * Domain engines use:
     *
     * evaluate(
     *   scenario,
     *   input
     * )
     *
     * The verified state is therefore supplied
     * as the domain input object.
     */

    const result =
      engine.evaluate(
        scenario,
        verification.verifiedState
      );


    return {

      success:
        true,

      domain:
        domainId,

      scenario,

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

  const domains = [
    "FIN",
    "BHR",
    "DC",
    "CYB"
  ];


  const statuses = {};

  domains.forEach(
    domainId => {

      statuses[domainId] =
        getDomainStatus(
          domainId
        );

    }
  );


  const allReady =
    domains.every(
      domainId =>
        statuses[domainId]
          .engineRegistered &&
        statuses[domainId]
          .evaluateAvailable
    );


  return {

    status:
      allReady
        ? "READY"
        : "PARTIAL",

    FIN:
      statuses.FIN,

    BHR:
      statuses.BHR,

    DC:
      statuses.DC,

    CYB:
      statuses.CYB,

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