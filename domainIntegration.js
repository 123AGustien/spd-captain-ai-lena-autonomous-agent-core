/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 * UI Scenario Button
 *        ↓
 * Domain Integration
 *        ↓
 * Domain Rule Engine
 *        ↓
 * Golden Rule Engine
 *        ↓
 * Captain AI Lena Decision Core
 *
 * Golden Rule Engine remains authoritative.
 * ============================================================
 */


/* ============================================================
   DOMAIN REGISTRY
============================================================ */

export const DOMAIN_REGISTRY = {

  CORE: {
    id: "CORE",
    status: "ACTIVE"
  },

  FIN: {
    id: "FIN",
    status: "ACTIVE"
  },

  BHR: {
    id: "BHR",
    status: "ACTIVE"
  },

  DC: {
    id: "DC",
    status: "PLANNED"
  },

  CYB: {
    id: "CYB",
    status: "PLANNED"
  },

  INF: {
    id: "INF",
    status: "PLANNED"
  }

};


/* ============================================================
   DOMAIN ENGINE STORAGE
============================================================ */

const DOMAIN_ENGINES = {};


/* ============================================================
   REGISTER DOMAIN ENGINE
============================================================ */

export function registerDomainEngine(
  domain,
  engine
){

  DOMAIN_ENGINES[domain] = engine;

}


/* ============================================================
   VERIFY DOMAIN INPUT
============================================================ */

export function verifyDomainInput(
  state
){

  return (

    state &&

    typeof state.scenario === "string"

  );

}


/* ============================================================
   LOAD FIN ENGINE
============================================================ */

async function loadFINEngine(){

  try {

    const module =
      await import(
        "./FIN/fin-rule-engine.js"
      );


    registerDomainEngine(
      "FIN",
      module.finRuleEngine
    );


  }

  catch(error){

    console.warn(
      "FIN engine unavailable",
      error.message
    );

  }

}


/* ============================================================
   LOAD BHR ENGINE
============================================================ */

async function loadBHREngine(){

  try {

    const module =
      await import(
        "./BHR/bhr-rule-engine.js"
      );


    registerDomainEngine(
      "BHR",
      module.bhrRuleEngine
    );


  }

  catch(error){

    console.warn(
      "BHR engine unavailable",
      error.message
    );

  }

}


/* ============================================================
   SCENARIO DOMAIN MAP
============================================================ */

const SCENARIO_DOMAIN_MAP = {


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


  BHR_COMPLIANCE_STRESS:
    "BHR",

  BHR_WORKER_SAFETY_EVENT:
    "BHR",

  BHR_SUPPLY_CHAIN_RISK:
    "BHR",

  BHR_COMMUNITY_IMPACT:
    "BHR",

  BHR_GOVERNANCE:
    "BHR"


};


/* ============================================================
   GET DOMAIN FROM SCENARIO
============================================================ */

export function getScenarioDomain(
  scenario
){

  return (

    SCENARIO_DOMAIN_MAP[scenario]

    ||

    "CORE"

  );

}


/* ============================================================
   GET DOMAIN STATUS
============================================================ */

export function getDomainStatus(){

  return {

    registry:
      DOMAIN_REGISTRY,

    engines:
      Object.keys(
        DOMAIN_ENGINES
      )

  };

}


/* ============================================================
   EXECUTE DOMAIN RULE
============================================================ */

export async function executeDomainRule(

  scenario,

  state

){


  if(
    !verifyDomainInput(state)
  ){

    return {

      status:
        "INVALID_DOMAIN_INPUT"

    };

  }


  await loadFINEngine();

  await loadBHREngine();


  const domain =
    getScenarioDomain(
      scenario
    );


  const engine =
    DOMAIN_ENGINES[domain];


  if(
    typeof engine !== "function"
  ){

    return {

      domain,

      status:
        "NO_DOMAIN_ENGINE",

      message:
        "Scenario routed to domain but engine unavailable."

    };

  }


  try {


    const result =
      engine({

        scenario,

        state,

        intensity:
          state.intensity,

        mode:
          state.mode,

        time:
          state.time

      });


    return {

      domain,

      status:
        "DOMAIN_EXECUTION_COMPLETE",

      result

    };


  }

  catch(error){


    return {

      domain,

      status:
        "DOMAIN_EXECUTION_ERROR",

      message:
        error.message

    };


  }


}


/* ============================================================
   INITIAL STATUS
============================================================ */

console.log(
  "SPD v13.1 Domain Integration Layer Loaded"
);