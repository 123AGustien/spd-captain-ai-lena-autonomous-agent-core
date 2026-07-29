/**
 * ============================================================
 * SPD V13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Single integration gateway between:
 *
 * COCKPIT / SCENARIO BUTTONS
 *          ↓
 * DOMAIN RULE ENGINES
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 * Active Domains:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/* ============================================================
   DOMAIN RULE ENGINE IMPORTS
   ============================================================
 */


/*
 * FIN Domain
 */

import {
    finRuleEngine
} from "./FIN/fin-rule-engine.js";


/*
 * BHR Domain
 */

import {
    bhrRuleEngine
} from "./BHR/bhr-rule-engine.js";



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


    BHR: {

        name:
            "Business & Human Rights",

        status:
            "ACTIVE",

        engine:
            "BHR_RULE_ENGINE"

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
 */

const DOMAIN_ENGINES = {


    FIN:

        finRuleEngine,


    BHR:

        bhrRuleEngine


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

        String(domain || "")

            .trim()

            .toUpperCase();



    if (!normalizedDomain) {

        throw new Error(
            "DOMAIN INTEGRATION ERROR: DOMAIN ID REQUIRED"
        );

    }



    if (typeof engine !== "function") {

        throw new Error(
            "DOMAIN INTEGRATION ERROR: ENGINE MUST BE FUNCTION"
        );

    }



    DOMAIN_ENGINES[normalizedDomain] = engine;



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

        String(domain || "")

            .trim()

            .toUpperCase();



    const config =

        DOMAIN_REGISTRY[normalizedDomain];



    const engine =

        DOMAIN_ENGINES[normalizedDomain];



    return {

        domain:
            normalizedDomain,


        name:

            config?.name ??
            "UNKNOWN DOMAIN",


        configured:

            Boolean(config),


        engineRegistered:

            Boolean(engine),


        status:

            engine

                ? "ACTIVE"

                : (
                    config?.status ??
                    "UNAVAILABLE"
                )

    };


}
/**
 * ============================================================
 * SPD V13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Single integration gateway between:
 *
 * COCKPIT / SCENARIO BUTTONS
 *          ↓
 * DOMAIN RULE ENGINES
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 * Active Domain:
 *
 * BHR — Business & Human Rights
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/* ============================================================
   BHR DOMAIN RULE ENGINE
   ============================================================
 *
 * Authoritative BHR domain rule engine.
 *
 * File:
 * ./BHR/bhr-rule-engine.js
 *
 * ============================================================
 */

import {
  bhrRuleEngine
} from "./BHR/bhr-rule-engine.js";


/* ============================================================
   BHR SCENARIO REGISTRY
   ============================================================
 */

import {
  getBHRScenario,
  listBHRScenarios
} from "./BHR/bhr-scenario-registry.js";


/* ============================================================
   DOMAIN REGISTRY
   ============================================================
 */

const DOMAIN_REGISTRY = {

  BHR: {

    name:
      "Business & Human Rights",

    status:
      "ACTIVE",

    engine:
      "BHR_RULE_ENGINE"

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
 */

const DOMAIN_ENGINES = {

  BHR:
    bhrRuleEngine

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
      .