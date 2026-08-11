/**
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Cockpit
 *    ↓
 * Domain Integration
 *    ↓
 * FIN Rule Engine
 *    ↓
 * Golden Rule Engine
 *    ↓
 * Result / Audit
 *
 * Purpose:
 * Provides the authoritative gateway between the
 * cockpit/scenario controls and registered domain
 * rule engines.
 *
 * Design Principle:
 * The frontend does not contain domain decision logic.
 * Domain engines provide domain-specific interpretation.
 * The Golden Rule Engine remains the authoritative
 * deterministic decision layer.
 */

import * as FINRuleEngine from "./domains/FIN/finRuleEngine.js";


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
 * Only ACTIVE domain engines are registered here.
 *
 * FIN is currently wired to:
 *
 * ./domains/FIN/finRuleEngine.js
 *
 * BHR remains registered as an ACTIVE domain in the
 * architecture but is not imported here until its
 * authoritative engine path is confirmed.
 */

const DOMAIN_ENGINES = {

  FIN: FINRuleEngine

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

  /*
   * Verify that the requested domain
   * exists in the authoritative registry.
   */

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


  /*
   * Verify that system state exists
   * and is represented as an object.
   */

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


  /*
   * Preserve the supplied state without
   * introducing domain decision logic.
   */

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

  /*
   * STEP 1
   * Verify domain input.
   */

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


  /*
   * STEP 2
   * Retrieve registered domain engine.
   */

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


  /*
   * STEP 3
   * Execute the authoritative domain
   * rule engine.
   *
   * The domain engine is responsible for
   * selecting the applicable domain rule.
   *
   * The Golden Rule Engine remains the
   * authoritative deterministic decision layer.
   */

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

  const finStatus =
    getDomainStatus(
      "FIN"
    );

  return {

    status:
      finStatus.engineRegistered
        ? "READY"
        : "NOT_READY",

    FIN:
      finStatus,

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