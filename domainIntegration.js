/**
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Existing Cockpit
 *      ↓
 * Domain Integration
 *      ↓
 * BHR Rule Engine
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
 * Current active domain:
 * BHR — Business & Human Rights Resilience
 *
 * FIN is NOT registered because no FIN rule-engine
 * file currently exists in the project.
 *
 * The existing cockpit remains the user interface.
 * No separate BHR screen is required.
 */

import * as BHRRuleEngine
  from "./domains/BHR/bhrRuleEngine.js";


/* =========================================================
   DOMAIN REGISTRY
========================================================= */

const DOMAIN_REGISTRY = {

  FIN: {
    id: "FIN",
    name: "Financial Resilience",
    status: "PLANNED"
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

  BHR: BHRRuleEngine

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

  DOMAIN_ENGINES[domainId] =
    engine;

  return {

    domain:
      domainId,

    registered:
      true

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
    typeof engine.evaluate !== "function"
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


  return engine.evaluate(

    verification.verifiedState,

    {

      ...context,

      domain:
        domainId

    }

  );

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
   DOMAIN INTEGRATION SELF-CHECK
========================================================= */

function verifyDomainIntegration() {

  const bhrStatus =
    getDomainStatus(
      "BHR"
    );


  return {

    status:
      bhrStatus.engineRegistered
        ? "READY"
        : "NOT_READY",

    BHR:
      bhrStatus,

    registeredEngines:
      Object.keys(
        DOMAIN_ENGINES
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

  verifyDomainIntegration

};