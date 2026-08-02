/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FINAL HARDENED FIN + BHR + INTENSITY BRIDGE VERSION
 *
 * File:
 * domainIntegration.js
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * ============================================================
 *
 * AUTHORITY MODEL:
 *
 * Domain Engines         → Advisory
 * Domain Validation      → Verification
 * Domain Decision Bridge → Translation
 * Golden Rule Engine     → Authority
 * Captain AI Lena        → Final Decision
 *
 * ============================================================
 *
 * FLOW:
 *
 * COCKPIT SCENARIO BUTTON
 *          ↓
 * SCENARIO ENGINE
 *          ↓
 * SCENARIO AUTHENTICITY CHECK
 *          ↓
 * DOMAIN RULE ENGINE
 *          ↓
 * DOMAIN VALIDATION
 *          ↓
 * DOMAIN DECISION BRIDGE
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *          ↓
 * MEMORY CORE
 *          ↓
 * AUDIT RECORD
 *
 * ============================================================
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
 * IMPORTS
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


import {
    evaluateFINScenario
}
from "./FIN/fin-rule-engine.js";


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

    active:
    true
},



BHR:
{
    name:
    "Business & Human Rights",

    engine:
    "BHR/bhr-rule-engine.js",

    active:
    true
},



DC:
{
    name:
    "Data Centre",

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
    "Infrastructure",

    active:
    false
},



ENG:
{
    name:
    "Energy",

    active:
    false
}


};







/**
 * ============================================================
 * DOMAIN ROUTER
 *
 * INTENSITY BRIDGE
 * ============================================================
 */


function executeDomainEngine(

    scenarioData,

    state

){


switch(

scenarioData.domain

)

{


case "FIN":


return evaluateFINScenario({

    scenario:
    scenarioData.type,


    state:
    {
        ...state,

        intensity:
        state.intensity ?? 50
    },


    intensity:
    state.intensity ?? 50


});







case "BHR":


return bhrRuleEngine({

    scenario:
    scenarioData.type,


    ...state,


    intensity:
    state.intensity ?? 50


});







default:


return null;


}


}








/**
 * ============================================================
 * DECISION CONTEXT FUSION
 *
 * INTENSITY INCLUDED
 * ============================================================
 */


export function buildDecisionContext(

    domainResult = {},

    bridgeResult = {},

    scenarioData = {},

    state = {}

)

{


return {


domain:

scenarioData.domain

??

domainResult.domain

??

"UNKNOWN",





scenario:

scenarioData.type

??

domainResult.scenario

??

"UNKNOWN",





intensity:

Number(

state.intensity ??

domainResult.intensity ??

50

),





intensityFactor:

Number(

state.intensityFactor ??

0

),





rulesApplied:

domainResult.rulesApplied

??

[],





assessment:

domainResult.assessment

??

"ASSESSMENT COMPLETE",





risk:

domainResult.risk

??

"LOW",





riskScore:

Number(

domainResult.riskScore

??

domainResult.domainStress

??

domainResult.assessment?.financialStress

??

0

),





decision:

bridgeResult.decision

??

"MONITOR",





action:

bridgeResult.action

??

"CONTINUE MONITORING",





advisory:

true,





goldenRuleAuthority:

true,





captainAILenaAuthority:

true,





deterministic:

true,





machineLearning:

false,





randomness:

false,





timestamp:

new Date().toISOString()


};


}