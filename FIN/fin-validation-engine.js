/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * HARDENED FIN + BHR WIRING VERSION
 *
 * File:
 * domainIntegration.js
 *
 *
 * ARCHITECTURE:
 *
 * COCKPIT SCENARIO BUTTON
 *          ↓
 * SCENARIO ENGINE
 *          ↓
 * AUTHENTICITY VALIDATION
 *          ↓
 * DOMAIN RULE ENGINE
 *          ↓
 * DOMAIN VALIDATION ENGINE
 *          ↓
 * DOMAIN DECISION BRIDGE
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *          ↓
 * ACTION ENGINE
 *          ↓
 * MEMORY CORE
 *          ↓
 * AUDIT RECORD
 *
 *
 * AUTHORITY:
 *
 * Domain Engines:
 * Advisory
 *
 * Domain Validation:
 * Verification
 *
 * Golden Rule Engine:
 * Final Validation Authority
 *
 * Captain AI Lena:
 * Final Decision Authority
 *
 *
 * Properties:
 *
 * Deterministic
 * No randomness
 * No machine learning
 *
 * ============================================================
 */


/**
 * ============================================================
 * CORE IMPORTS
 * ============================================================
 */


import {

    scenarioEngine

}

from "./scenarioEngine.js";



import {

    validateScenarioAuthenticity,

    getScenarioAuthenticity

}

from "./scenarioAuthenticity.js";



import {

    domainDecisionBridge

}

from "./domainDecisionBridge.js";



/**
 * ============================================================
 * FIN DOMAIN ENGINE
 *
 * SPD v13.1 Financial Resilience
 * ============================================================
 */


import {

    finRuleEngine

}

from "./FIN/fin-rule-engine.js";



/**
 * ============================================================
 * BHR DOMAIN ENGINE
 *
 * SPD v13.1 Business & Human Rights
 * ============================================================
 */


import {

    bhrRuleEngine

}

from "./BHR/bhr-rule-engine.js";





/**
 * ============================================================
 * DOMAIN REGISTRY
 * ============================================================
 */


export const DOMAIN_REGISTRY = {


FIN:

{

    name:

    "Financial Resilience",


    engine:

    "FIN/fin-rule-engine.js",


    validation:

    "FIN/fin-validation-engine.js",


    active:

    true


},



BHR:

{

    name:

    "Business & Human Rights",


    engine:

    "BHR/bhr-rule-engine.js",


    validation:

    "BHR/bhr-validation-engine.js",


    active:

    true


},



DC:

{

    name:

    "Data Centre Resilience",


    active:

    false


},



CYB:

{

    name:

    "Cyber Resilience",


    active:

    false


},



INF:

{

    name:

    "Infrastructure Resilience",


    active:

    false


},



ENG:

{

    name:

    "Energy Resilience",


    active:

    false


}


};





/**
 * ============================================================
 * DOMAIN ENGINE ROUTER
 * ============================================================
 */


function executeDomainEngine(

    scenarioData,

    state

){


let result = null;




switch(

scenarioData.domain

){



case "FIN":


result =

finRuleEngine(

{


scenario:

scenarioData.type,


state,


...state


}

);


break;





case "BHR":


result =

bhrRuleEngine(

{


scenario:

scenarioData.type,


...state


}

);


break;





default:


result = null;


}





return result;


}