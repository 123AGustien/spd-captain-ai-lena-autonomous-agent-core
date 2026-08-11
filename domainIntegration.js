/**
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Existing Cockpit
 *      ↓
 * Domain Integration
 *      ↓
 * FIN / BHR Rule Engines
 *      ↓
 * Captain AI Lena
 *      ↓
 * Golden Rule Pipeline
 *      ↓
 * Result / Audit
 *
 * Purpose:
 * Provides the authoritative gateway between the
 * existing cockpit/scenario controls and registered
 * domain rule engines.
 *
 * ACTIVE DOMAINS:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 *
 * The existing cockpit remains the user interface.
 * No separate FIN or BHR screen is required.
 *
 * Execution principle:
 * AI provides deterministic decision support.
 * Human operator remains the final authority.
 */


/* =========================================================
   DOMAIN RULE ENGINE IMPORTS
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
 * Only domain engines that physically exist
 * and expose evaluate() are registered here.
 */

const DOMAIN_ENGINES = {

  FIN:
    FINRuleEngine,

  BHR:
    BHRRuleEngine

};


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

  DOMAIN_ENGINES[domainId] =
    engine;

  return {

    domain:
      domainId,

    registered:
      true,

    status:
      DOMAIN_REGISTRY[domainId]
        ? DOMAIN_REGISTRY[domainId].status
        : "UNREGISTERED_DOMAIN"

  };

}


/* =========================================================
   GET DOMAIN STATUS
========================================================= */

function getDomainStatus(
  domainId
) {

  const domain =
    DOMAIN_REGISTRY[domainId];

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

  return {

    ...domain,

    engineRegistered:
      Boolean(
        DOMAIN_ENGINES[domainId]
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
    !DOMAIN_REGISTRY[domainId]
  ) {

    return {

      valid:
        false,

      reason:
        "UNKNOWN_DOMAIN"

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
        "INVALID_STATE"

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
    DOMAIN_ENGINES[domainId];


  if (
    !engine ||
    typeof engine.evaluate !==
      "function"
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

      ...result,

      integration: {

        gateway:
          "SPD v13.1 DOMAIN INTEGRATION",

        domain:
          domainId,

        verified:
          true,

        engineRegistered:
          true

      }

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
    domain => ({

      id:
        domain.id,

      name:
        domain.name,

      status:
        domain.status,

      engineRegistered:
        Boolean(
          DOMAIN_ENGINES[
            domain.id
          ]
        )

    })
  );

}


/* =========================================================
   VERIFY FIN ENGINE
========================================================= */

function verifyFINIntegration() {

  const status =
    getDomainStatus(
      "FIN"
    );


  let engineSelfCheck =
    null;


  if (
    FINRuleEngine &&
    typeof FINRuleEngine
      .verifyFINEngine ===
      "function"
  ) {

    engineSelfCheck =
      FINRuleEngine
        .verifyFINEngine();

  }


  return {

    domain:
      "FIN",

    status:
      status.engineRegistered &&
      (
        !engineSelfCheck ||
        engineSelfCheck.status ===
          "READY"
      )
        ? "READY"
        : "NOT_READY",

    domainStatus:
      status,

    engineSelfCheck,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   VERIFY BHR ENGINE
========================================================= */

function verifyBHRIntegration() {

  const status =
    getDomainStatus(
      "BHR"
    );


  let engineSelfCheck =
    null;


  if (
    BHRRuleEngine &&
    typeof BHRRuleEngine
      .verifyBHREngine ===
      "function"
  ) {

    engineSelfCheck =
      BHRRuleEngine
        .verifyBHREngine();

  }


  return {

    domain:
      "BHR",

    status:
      status.engineRegistered &&
      (
        !engineSelfCheck ||
        engineSelfCheck.status ===
          "READY"
      )
        ? "READY"
        : "NOT_READY",

    domainStatus:
      status,

    engineSelfCheck,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   DOMAIN INTEGRATION SELF-CHECK
========================================================= */

function verifyDomainIntegration() {

  const fin =
    verifyFINIntegration();

  const bhr =
    verifyBHRIntegration();


  const ready =
    fin.status === "READY" &&
    bhr.status === "READY";


  return {

    status:
      ready
        ? "READY"
        : "NOT_READY",

    FIN:
      fin,

    BHR:
      bhr,

    registeredEngines:
      Object.keys(
        DOMAIN_ENGINES
      ),

    activeDomains:
      Object.values(
        DOMAIN_REGISTRY
      )
      .filter(
        domain =>
          domain.status ===
          "ACTIVE"
      )
      .map(
        domain =>
          domain.id
      ),

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

  registerDomainEngine,

  getDomainStatus,

  verifyDomainInput,

  executeDomainRule,

  listDomains,

  verifyFINIntegration,

  verifyBHRIntegration,

  verifyDomainIntegration

};