/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FINAL HARDENED VERSION
 *
 * Captain AI Lena Autonomous Agent Core
 *
 *
 * Purpose:
 *
 * Central gateway connecting:
 *
 * Scenario Engine
 *        ↓
 * Scenario Authenticity Validation
 *        ↓
 * Domain Rule Engines
 *        ↓
 * Domain Decision Bridge
 *        ↓
 * Decision Context Fusion
 *        ↓
 * Golden Rule Engine
 *        ↓
 * Captain AI Lena Decision Core
 *
 *
 * Active Domains:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 *
 *
 * Principle:
 *
 * Domain engines advise.
 *
 * Domain bridge translates.
 *
 * Golden Rule Engine remains authoritative.
 *
 * Captain AI Lena remains final decision authority.
 *
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


// FIN RULE ENGINE

import {
    evaluateFINScenario
} from "./FIN/fin-rule-engine.js";


// BHR RULE ENGINE

import {
    evaluateBHRScenario
} from "./BHR/bhr-rule-engine.js";





/**
 * ============================================================
 * DOMAIN REGISTRY
 * ============================================================
 */


export const DOMAIN_REGISTRY = {


    FIN: {

        name:
            "Financial Resilience",

        active:
            true

    },


    BHR: {

        name:
            "Business & Human Rights",

        active:
            true

    },


    DC: {

        name:
            "Data Centre",

        active:
            false

    },


    CYB: {

        name:
            "Cyber",

        active:
            false

    },


    INF: {

        name:
            "Infrastructure",

        active:
            false

    },


    ENG: {

        name:
            "Energy",

        active:
            false

    }


};








/**
 * ============================================================
 * VERIFY DOMAIN INPUT
 * ============================================================
 */


export function verifyDomainInput(

    scenario

){


const scenarioData =

    scenarioEngine(

        scenario

    );



return {


    valid:

        Boolean(
            scenarioData
        ),


    scenario:

        scenarioData?.type
        ??
        "UNKNOWN",


    domain:

        scenarioData?.domain
        ??
        "UNKNOWN",


    status:

        "DOMAIN INPUT VERIFIED"


};


}









/**
 * ============================================================
 * DECISION CONTEXT FUSION
 *
 * Converts domain intelligence into
 * Golden Rule Engine input.
 *
 * ============================================================
 */


export function buildDecisionContext(

    domainResult = {},

    bridgeResult = {},

    scenarioData = {}

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



    advisory:

        true,


    goldenRuleAuthority:

        true,


    captainAILenaAuthority:

        true,


    deterministic:

        true,


    machineLearning:

        false


};


}









/**
 * ============================================================
 * DOMAIN EXECUTION ROUTER
 * ============================================================
 */


export function executeDomainRule(

    scenario,

    state = {}

){



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






let domainResult;







// ============================================================
// FIN DOMAIN
// ============================================================


if(

scenarioData.domain === "FIN"

)

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









// ============================================================
// BHR DOMAIN
// ============================================================


else if(

scenarioData.domain === "BHR"

)

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

        scenarioData.domain,


    scenario:

        scenarioData.type


};


}









// ============================================================
// DOMAIN DECISION BRIDGE
// ============================================================


const bridgeResult =


    domainDecisionBridge(

        domainResult

    );








// ============================================================
// GOLDEN RULE DECISION CONTEXT
// ============================================================


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



    goldenRuleAuthority:

        true,



    captainAILenaAuthority:

        true,



    deterministic:

        true,



    machineLearning:

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

){


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
 * DOMAIN STATUS
 * ============================================================
 */


export function getDomainStatus(){


return {


    module:

        "SPD v13.1 DOMAIN INTEGRATION LAYER",



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



    deterministic:

        true,



    machineLearning:

        false,



    status:

        "READY"


};

}








export default {


    executeDomainRule,

    verifyDomainInput,

    buildDecisionContext,

    validateDecisionContext,

    getDomainStatus


};