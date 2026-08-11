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
 *
 * Purpose:
 * Provides the authoritative gateway between the
 * existing cockpit/scenario controls and registered
 * domain rule engines.
 *
 * The cockpit remains the primary user interface.
 * No separate FIN or BHR screen is required.
 */


/* =========================================================
   DOMAIN ENGINE IMPORTS
========================================================= */

import * as FINRuleEngine
  from "./domains/FIN/finRuleEngine.js";

import * as BHRRuleEngine
  from "./domains/BHR/bhrRuleEngine.js";


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

  FX: {
    id: "FX",
    name: "Foreign Exchange",
    status: "PLANNED"
  },

  DC: {
    id: "DC",
    name: "Data Centre",
    status: "PLANNED"
  },

  CYB: {
    id: "CYB",
    name: "Cyber",
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

/*
 * Only physically available domain engines
 * exposing evaluate() are registered.
 */

const DOMAIN_ENGINES = {

  FIN:
    FINRuleEngine,

  BHR:
    BHRRuleEngine

};


/* =========================================================
   SCENARIO → DOMAIN MAPPING
========================================================= */

const SCENARIO_DOMAIN_MAP = {

  /* FINANCIAL RESILIENCE */

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


  /* BUSINESS & HUMAN RIGHTS */

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
    "BHR"

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

    const result =
      engine.evaluate(

        verification.verifiedState,

        {

          ...context,

          domain:
            domainId

        }

      );


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


  const finReady =
    finStatus.engineRegistered &&
    finStatus.evaluateAvailable;

  const bhrReady =
    bhrStatus.engineRegistered &&
    bhrStatus.evaluateAvailable;


  return {

    status:
      finReady && bhrReady
        ? "READY"
        : "PARTIAL",

    FIN:
      finStatus,

    BHR:
      bhrStatus,

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