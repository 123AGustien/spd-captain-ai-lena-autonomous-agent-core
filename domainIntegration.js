/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FINAL HARDENED FIN + BHR + INTENSITY BRIDGE VERSION
 *
 * File:
 * domainIntegration.js
 *
 * AUTHORITY MODEL:
 *
 * Domain Engines        → Advisory
 * Domain Validation     → Verification
 * Domain Decision Bridge→ Translation
 * Golden Rule Engine    → Authority
 * Captain AI Lena       → Final Decision
 *
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
 * ============================================================
 */


function executeDomainEngine(

    scenarioData,

    state

){


switch(

scenarioData.domain

){


case "FIN":

return evaluateFINScenario({

    scenario:
    scenarioData.type,

    state,

    intensity:
    state.intensity ?? 0

});





case "BHR":

return bhrRuleEngine({

    scenario:
    scenarioData.type,

    ...state,

    intensity:
    state.intensity ?? 0

});





default:

return null;


}


}







/**
 * ============================================================
 * DECISION CONTEXT FUSION
 *
 * INTENSITY BRIDGE INCLUDED
 * ============================================================
 */


export function buildDecisionContext(

    domainResult = {},

    bridgeResult = {},

    scenarioData = {},

    state = {}

){


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

state.intensity

??

0,



intensityFactor:

state.intensityFactor

??

0,



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








/**
 * ============================================================
 * EXECUTE DOMAIN RULE
 * ============================================================
 */


export function executeDomainRule(

    scenario,

    state = {}

){



if(

state.intensity !== undefined

&&

(

state.intensity < 0

||

state.intensity > 100

)

)

{

return {

status:
"INVALID INTENSITY",

intensity:
state.intensity

};

}






const scenarioData =

scenarioEngine(

scenario

);





if(!scenarioData)

{

return {

status:
"INVALID_SCENARIO"

};

}





const authenticity =

validateScenarioAuthenticity(

scenarioData.type

);





if(

authenticity.registered !== true

)

{

return {

status:
"SCENARIO AUTHENTICITY FAILED",

scenario:
scenarioData.type

};

}






const domainResult =

executeDomainEngine(

scenarioData,

state

);





if(!domainResult)

{

return {

status:
"DOMAIN ENGINE NOT AVAILABLE",

domain:
scenarioData.domain

};

}






const bridgeResult =

domainDecisionBridge({

    ...domainResult,

    domain:
    scenarioData.domain,

    scenario:
    scenarioData.type,

    intensity:
    state.intensity ?? 0,

    goldenRuleAuthority:
    true

});






if(

bridgeResult.goldenRuleAuthority !== true

||

bridgeResult.captainAILenaAuthority !== true

)

{

return {

status:
"BRIDGE AUTHORITY FAILURE"

};

}







const decisionContext =

buildDecisionContext(

domainResult,

bridgeResult,

scenarioData,

state

);






return {


scenarioProfile:

getScenarioAuthenticity(

scenarioData.type

),



scenario:

scenarioData.type,



domain:

scenarioData.domain,



intensity:

state.intensity ?? 0,



intensityFactor:

state.intensityFactor ?? 0,



domainResult,



bridgeResult,



decisionContext,



goldenRule:

{

authority:

true,


pipeline:

[
"OBSERVE",
"VERIFY",
"ASSESS",
"DECIDE",
"ACT",
"UPDATE"
]

},




captainAILena:

{

authority:

true,


decision:

bridgeResult.decision,


action:

bridgeResult.action

},



auditReady:

true,



deterministic:

true,



machineLearning:

false,



randomness:

false,



status:

"DOMAIN INTEGRATION COMPLETE"


};


}








/**
 * ============================================================
 * VALIDATE DECISION CONTEXT
 * ============================================================
 */


export function validateDecisionContext(

context = {}

)

{


const valid =


Boolean(context.domain)

&&

Boolean(context.scenario)

&&

Boolean(context.assessment)

&&

context.goldenRuleAuthority === true

&&

context.captainAILenaAuthority === true;





return {


valid,


status:

valid

?

"DOMAIN CONTEXT VERIFIED"

:

"DOMAIN CONTEXT INVALID",



authority:

"CAPTAIN AI LENA DECISION CORE",



goldenRuleAuthority:

true


};


}








/**
 * ============================================================
 * DOMAIN STATUS
 * ============================================================
 */


export function getDomainStatus()

{


return {


module:

"SPD v13.1 DOMAIN INTEGRATION LAYER",



version:

"FINAL HARDENED FIN + BHR + INTENSITY",



activeDomains:

[
"FIN",
"BHR"
],



futureDomains:

[
"DC",
"CYB",
"INF",
"ENG"
],



pipeline:

[

"SCENARIO_ENGINE",

"AUTHENTICITY_VALIDATION",

"DOMAIN_RULE_ENGINE",

"DOMAIN_VALIDATION",

"DOMAIN_DECISION_BRIDGE",

"GOLDEN_RULE_ENGINE",

"CAPTAIN_AI_LENA",

"ACTION_ENGINE",

"MEMORY_CORE",

"AUDIT_RECORD",

"RE_TEST_VALIDATION"

],



authority:

"GOLDEN RULE ENGINE",



finalDecision:

"CAPTAIN AI LENA DECISION CORE",



PHI:

1.618033988749895,



goldenRule:

[
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

false,



status:

"READY"


};

}








/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */


export default {


executeDomainRule,

buildDecisionContext,

validateDecisionContext,

getDomainStatus,

DOMAIN_REGISTRY


};