/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FINAL HARDENED RELEASE
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Authority:
 *
 * Domain Engines → Advisory
 * Domain Bridge → Translation
 * Golden Rule Engine → Authority
 * Captain AI Lena → Final Decision
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


import {
    scenarioEngine
} from "./scenarioEngine.js";


import {
    validateScenarioAuthenticity,
    getScenarioAuthenticity
} from "./scenarioAuthenticity.js";


import {
    domainDecisionBridge
} from "./domainDecisionBridge.js";


import {
    evaluateFINScenario
} from "./FIN/fin-rule-engine.js";


import {
    evaluateBHRScenario
} from "./BHR/bhr-rule-engine.js";





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

active:true

},



BHR:
{

name:
"Business & Human Rights",

engine:
"BHR/bhr-rule-engine.js",

active:true

},



DC:
{

name:
"Data Centre",

active:false

},



CYB:
{

name:
"Cyber",

active:false

},



INF:
{

name:
"Infrastructure",

active:false

},



ENG:
{

name:
"Energy",

active:false

}


};







/**
 * ============================================================
 * DECISION CONTEXT FUSION
 * ============================================================
 */


export function buildDecisionContext(

domainResult = {},

bridgeResult = {},

scenarioData = {}

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



domainRisk:

domainResult.risk

??

"LOW",



domainStress:

Number(

domainResult.domainStress

??

domainResult.financialStress

??

0

),



domainDecision:

bridgeResult.decision

??

bridgeResult.domainDecision

??

"MONITOR",



domainAction:

bridgeResult.action

??

"CONTINUE MONITORING",



advisory:true,


goldenRuleAuthority:true,


captainAILenaAuthority:true,


deterministic:true,


machineLearning:false,


randomness:false,


timestamp:

new Date().toISOString()


};


}







/**
 * ============================================================
 * DOMAIN EXECUTION ROUTER
 * ============================================================
 */


export function executeDomainRule(

scenario,

state={}

)

{


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





if(authenticity.registered !== true)

{

return {

status:
"SCENARIO AUTHENTICITY FAILED",

scenario:
scenarioData.type

};

}





let domainResult;





if(scenarioData.domain === "FIN")

{


domainResult =

evaluateFINScenario(

{

scenario:
scenarioData.type,

state

}

);


}



else if(scenarioData.domain === "BHR")

{


domainResult =

evaluateBHRScenario(

{

scenario:
scenarioData.type,

state

}

);


}



else

{


return {

status:
"DOMAIN ENGINE NOT ACTIVE",

domain:
scenarioData.domain

};

}





if(!domainResult)

{

return {

status:
"DOMAIN RESULT INVALID"

};

}





const bridgeResult =

domainDecisionBridge(

domainResult

);






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

scenarioData

);






return {


authenticity,


scenarioProfile:

getScenarioAuthenticity(

scenarioData.type

),



domainResult,


bridgeResult,


decisionContext,



nextStage:

"GOLDEN_RULE_ENGINE",



goldenRuleAuthority:true,


captainAILenaAuthority:true,


deterministic:true,


machineLearning:false,


randomness:false,


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

context={}

)

{


const valid =


Boolean(context.domain)

&&

Boolean(context.scenario)

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

"CAPTAIN AI LENA DECISION CORE"

};


}







/**
 * ============================================================
 * STATUS
 * ============================================================
 */


export function getDomainStatus()

{


return {


module:

"SPD v13.1 DOMAIN INTEGRATION LAYER",



version:

"FINAL HARDENED",



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

"DOMAIN_DECISION_BRIDGE",

"DECISION_CONTEXT_FUSION",

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



deterministic:true,


machineLearning:false,


randomness:false,


status:

"READY"


};

}







export default {


executeDomainRule,

buildDecisionContext,

validateDecisionContext,

getDomainStatus


};