/**
 * ============================================================
 * SPD V13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Provide a single integration gateway between:
 *
 * COCKPIT / SCENARIO BUTTONS
 *          ↓
 * DOMAIN RULE ENGINES
 *          ↓
 * CAPTAIN AI LENA AGENT CORE
 *
 * Active Domain:
 *
 * FIN  — Financial Resilience
 *
 * Planned Domains:
 *
 * FX   — Foreign Exchange
 * DC   — Data Centre
 * CYB  — Cyber Resilience
 * INF  — Infrastructure
 * ENG  — Energy
 * OPS  — Operations
 * SC   — Scenario Control
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/* ============================================================
   FIN DOMAIN RULE ENGINE
   ============================================================
 *
 * Authoritative FIN domain rule engine.
 *
 * File:
 * ./FIN/fin-rule-engine.js
 *
 * ============================================================
 */

import {
  finRuleEngine
} from "./FIN/fin-rule-engine.js";


/* ============================================================
   DOMAIN REGISTRY
   ============================================================
 */

const DOMAIN_REGISTRY = {

  FIN: {
    name:
      "Financial Resilience",

    status:
      "ACTIVE",

    engine:
      "FIN_RULE_ENGINE"
  },

  FX: {
    name:
      "Foreign Exchange",

    status:
      "PLANNED",

    engine:
      "FX_RULE_ENGINE"
  },

  DC: {
    name:
      "Data Centre",

    status:
      "PLANNED",

    engine:
      "DC_RULE_ENGINE"
  },

  CYB: {
    name:
      "Cyber Resilience",

    status:
      "PLANNED",

    engine:
      "CYB_RULE_ENGINE"
  },

  INF: {
    name:
      "Infrastructure",

    status:
      "PLANNED",

    engine:
      "INF_RULE_ENGINE"
  },

  ENG: {
    name:
      "Energy",

    status:
      "PLANNED",

    engine:
      "ENG_RULE_ENGINE"
  },

  OPS: {
    name:
      "Operations",

    status:
      "PLANNED",

    engine:
      "OPS_RULE_ENGINE"
  },

  SC: {
    name:
      "Scenario Control",

    status:
      "ACTIVE",

    engine:
      "SCENARIO_ENGINE"
  }

};


/* ============================================================
   DOMAIN ENGINE REGISTRY
   ============================================================
 *
 * FIN is registered directly to the authoritative
 * FIN domain rule engine.
 *
 * Future domains can be added here as their rule engines
 * become available.
 *
 * ============================================================
 */

const DOMAIN_ENGINES = {

  FIN:
    finRuleEngine

};


/* ============================================================
   REGISTER DOMAIN ENGINE
   ============================================================
 */

export function registerDomainEngine(
  domain,
  engine
) {

  const normalizedDomain =
    String(
      domain || ""
    )
      .trim()
      .toUpperCase();


  if (
    !normalizedDomain
  ) {

    throw new Error(
      "DOMAIN INTEGRATION ERROR: DOMAIN ID REQUIRED"
    );

  }


  if (
    typeof engine !== "function"
  ) {

    throw new Error(
      "DOMAIN INTEGRATION ERROR: ENGINE MUST BE A FUNCTION"
    );

  }


  DOMAIN_ENGINES[
    normalizedDomain
  ] =
    engine;


  return {

    domain:
      normalizedDomain,

    status:
      "ENGINE_REGISTERED"

  };

}


/* ============================================================
   GET DOMAIN STATUS
   ============================================================
 */

export function getDomainStatus(
  domain
) {

  const normalizedDomain =
    String(
      domain || ""
    )
      .trim()
      .toUpperCase();


  const config =
    DOMAIN_REGISTRY[
      normalizedDomain
    ];


  const engine =
    DOMAIN_ENGINES[
      normalizedDomain
    ];


  return {

    domain:
      normalizedDomain,

    name:
      config?.name ??
      "UNKNOWN DOMAIN",

    configured:
      Boolean(
        config
      ),

    engineRegistered:
      Boolean(
        engine
      ),

    status:
      engine

        ? "ACTIVE"

        : (
            config?.status ??
            "UNAVAILABLE"
          )

  };

}


/* ============================================================
   EXECUTE DOMAIN RULE
   ============================================================
 *
 * Main gateway used by the cockpit.
 *
 * Example:
 *
 * executeDomainRule(
 *
 *   "FIN",
 *
 *   {
 *     scenario:
 *       "FIN_STRESS",
 *
 *     intensity:
 *       50,
 *
 *     state:
 *       {
 *         fx: 12,
 *         energy: 25,
 *         cyb: 40,
 *         inf: 10,
 *         dc: 20
 *       }
 *
 *   }
 *
 * );
 *
 * ============================================================
 */

export function executeDomainRule(
  domain,
  input = {}
) {

  const normalizedDomain =
    String(
      domain || ""
    )
      .trim()
      .toUpperCase();


  const engine =
    DOMAIN_ENGINES[
      normalizedDomain
    ];


  const domainConfig =
    DOMAIN_REGISTRY[
      normalizedDomain
    ];


  /* ==========================================================
     DOMAIN VALIDATION
     ========================================================== */

  if (
    !domainConfig
  ) {

    return {

      domain:
        normalizedDomain,

      status:
        "UNKNOWN_DOMAIN",

      decision:
        "NO DOMAIN RULE AVAILABLE",

      action:
        "MONITOR SYSTEM"

    };

  }


  /* ==========================================================
     ENGINE VALIDATION
     ========================================================== */

  if (
    !engine
  ) {

    return {

      domain:
        normalizedDomain,

      name:
        domainConfig.name,

      status:
        "ENGINE_NOT_REGISTERED",

      decision:
        "DOMAIN ENGINE NOT AVAILABLE",

      action:
        "MONITOR SYSTEM"

    };

  }


  /* ==========================================================
     OBSERVE
     ========================================================== */

  const observedInput = {

    ...input,

    domain:
      normalizedDomain,

    domainName:
      domainConfig.name,

    timestamp:
      new Date()
        .toISOString()

  };


  try {

    /* ========================================================
       VERIFY
       ======================================================== */

    const verifiedInput =
      verifyDomainInput(
        observedInput
      );


    /* ========================================================
       ASSESS
       ======================================================== */

    const ruleResult =
      engine(
        verifiedInput
      );


    /* ========================================================
       UPDATE
       ======================================================== */

    return {

      domain:
        normalizedDomain,

      domainName:
        domainConfig.name,

      engine:
        domainConfig.engine,

      loop: [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "ACT",

        "UPDATE"

      ],

      input:
        verifiedInput,

      result:
        ruleResult,

      status:
        "EXECUTED",

      timestamp:
        new Date()
          .toISOString()

    };

  }

  catch (
    error
  ) {

    return {

      domain:
        normalizedDomain,

      domainName:
        domainConfig.name,

      status:
        "DOMAIN_ENGINE_ERROR",

      error:
        error?.message ??
        String(
          error
        ),

      decision:
        "NO DECISION — ENGINE ERROR",

      action:
        "HOLD AND MONITOR",

      timestamp:
        new Date()
          .toISOString()

    };

  }

}


/* ============================================================
   VERIFY DOMAIN INPUT
   ============================================================
 *
 * Normalizes scenario intensity and ensures the domain
 * engine receives a deterministic state object.
 *
 * IMPORTANT:
 *
 * The intensity value is preserved and passed to the FIN
 * rule engine.
 *
 * This prevents the cockpit intensity control from being
 * silently replaced with zero.
 *
 * ============================================================
 */

function verifyDomainInput(
  input
) {

  const rawIntensity =
    Number(
      input?.intensity
    );


  const intensity =
    Number.isFinite(
      rawIntensity
    )

      ? Math.max(
          0,
          Math.min(
            100,
            rawIntensity
          )
        )

      : 0;


  const sourceState =
    input?.state ??
    input;


  return {

    ...input,

    intensity:

      intensity,

    intensityFactor:

      intensity / 100,

    scenario:

      input?.scenario ??
      input?.event ??
      "FIN_STRESS",

    event:

      input?.event ??
      input?.scenario ??
      "FIN_STRESS",

    state: {

      fx:
        Number(
          sourceState?.fx ??
          0
        ),

      energy:
        Number(
          sourceState?.energy ??
          50
        ),

      cyb:
        Number(
          sourceState?.cyb ??
          0
        ),

      inf:
        Number(
          sourceState?.inf ??
          0
        ),

      dc:
        Number(
          sourceState?.dc ??
          0
        )

    },

    mode:

      input?.mode ??
      "AUTONOMOUS"

  };

}


/* ============================================================
   GET ALL DOMAIN STATUS
   ============================================================
 */

export function getAllDomainStatus() {

  return Object.keys(
    DOMAIN_REGISTRY
  ).map(

    domain =>

      getDomainStatus(
        domain
      )

  );

}


/* ============================================================
   DOMAIN INTEGRATION CONSTANTS
   ============================================================
 */

export const DOMAIN_IDS = [

  "FIN",

  "FX",

  "DC",

  "CYB",

  "INF",

  "ENG",

  "OPS",

  "SC"

];


export const DOMAIN_INTEGRATION_STATUS = {

  engine:
    "SPD V13.1 DOMAIN INTEGRATION LAYER",

  architecture:
    "COCKPIT → DOMAIN INTEGRATION → DOMAIN RULE ENGINE → CAPTAIN AI LENA",

  activeDomains: [

    "FIN"

  ],

  plannedDomains: [

    "FX",

    "DC",

    "CYB",

    "INF",

    "ENG",

    "OPS"

  ],

  pipeline: [

    "OBSERVE",

    "VERIFY",

    "ASSESS",

    "DECIDE",

    "ACT",

    "UPDATE"

  ],

  deterministic:
    true,

  machineLearning:
    false,

  randomness:
    false

};


/* ============================================================
   DEFAULT EXPORT
   ============================================================
 */

export default {

  registerDomainEngine,

  executeDomainRule,

  getDomainStatus,

  getAllDomainStatus,

  DOMAIN_IDS,

  DOMAIN_REGISTRY,

  DOMAIN_INTEGRATION_STATUS

};