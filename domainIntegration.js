/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 * Captain AI Lena Autonomous Agent Core
 *
 * UI
 *  ↓
 * DOMAIN INTEGRATION
 *  ↓
 * DOMAIN RULE ENGINE
 *  ↓
 * GOLDEN RULE ENGINE
 *  ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 * Golden Rule Engine remains authoritative.
 * ============================================================
 */


import {

  runGoldenRule

} from "./goldenRuleEngine.js";



/* ============================================================
   DOMAIN REGISTRY
============================================================ */

export const DOMAIN_REGISTRY = {

  CORE:{
    id:"CORE",
    status:"ACTIVE"
  },

  FIN:{
    id:"FIN",
    status:"ACTIVE"
  },

  BHR:{
    id:"BHR",
    status:"ACTIVE"
  },

  DC:{
    id:"DC",
    status:"PLANNED"
  },

  CYB:{
    id:"CYB",
    status:"PLANNED"
  },

  INF:{
    id:"INF",
    status:"PLANNED"
  }

};



/* ============================================================
   DOMAIN ENGINE STORAGE
============================================================ */

const DOMAIN_ENGINES = {};



/* ============================================================
   REGISTER ENGINE
============================================================ */

export function registerDomainEngine(
  domain,
  engine
){

  if(typeof engine === "function"){

    DOMAIN_ENGINES[domain]=engine;

  }

}



/* ============================================================
   INPUT VALIDATION
============================================================ */

export function verifyDomainInput(state){

  return (

    state &&

    typeof state.scenario === "string"

  );

}



/* ============================================================
   LOAD FIN ENGINE
============================================================ */

async function loadFINEngine(){

try{

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
"FIN ENGINE UNAVAILABLE",
error.message
);

}

}



/* ============================================================
   LOAD BHR ENGINE
============================================================ */

async function loadBHREngine(){

try{

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
"BHR ENGINE UNAVAILABLE",
error.message
);

}

}



/* ============================================================
   SCENARIO DOMAIN MAP
============================================================ */

const SCENARIO_DOMAIN_MAP = {


FIN_STRESS:"FIN",

BANKING_STRESS:"FIN",

LIQUIDITY_CRISIS:"FIN",

CREDIT_STRESS:"FIN",

SOVEREIGN_DEBT:"FIN",



BHR_COMPLIANCE_STRESS:"BHR",

BHR_WORKER_SAFETY_EVENT:"BHR",

BHR_SUPPLY_CHAIN_RISK:"BHR",

BHR_COMMUNITY_IMPACT:"BHR",

BHR_GOVERNANCE:"BHR"


};



/* ============================================================
   GET DOMAIN
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
   DECISION CONTEXT BUILDER
============================================================ */

export function buildDecisionContext(

domainResult,

metadata={}

){

return {

domainResult,

metadata,

authority:

"GOLDEN RULE ENGINE",

decisionCore:

"CAPTAIN AI LENA"

};

}



/* ============================================================
   DECISION VALIDATION
============================================================ */

export function validateDecisionContext(
context
){

return {

status:

context && context.authority ===

"GOLDEN RULE ENGINE"

?

"VALID"

:

"INVALID",

checked:

true

};

}



/* ============================================================
   DOMAIN STATUS
============================================================ */

export function getDomainStatus(){

return {

registry:

DOMAIN_REGISTRY,


loadedEngines:

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


if(!verifyDomainInput(state)){

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



let domainResult;



if(typeof engine === "function"){


domainResult =

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


}
else{


domainResult={

status:
"NO_DOMAIN_ENGINE",

domain

};

}



/* ============================================================
   GOLDEN RULE AUTHORITY
============================================================ */


const goldenResult =

runGoldenRule(

state

);



return {


domain,


status:

"DOMAIN_EXECUTION_COMPLETE",



domainResult,


goldenResult,


captainAILena:{

decision:

goldenResult.decision,

action:

goldenResult.actionSequence

}


};


}



/* ============================================================
   READY
============================================================ */

console.log(
"SPD v13.1 DOMAIN INTEGRATION LAYER READY"
);