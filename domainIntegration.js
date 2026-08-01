/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FINAL HARDENED RELEASE VERSION
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
 *        ↓
 * Action Engine
 *        ↓
 * Memory Core
 *        ↓
 * Audit Record
 *        ↓
 * Re-Test Validation
 *
 *
 * Active Domains:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 *
 *
 * Authority Chain:
 *
 * Domain Engines advise.
 *
 * Domain Bridge translates.
 *
 * Golden Rule Engine verifies.
 *
 * Captain AI Lena decides.
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

        active:
        true,

        bridge:
        true

    },



    BHR:
    {

        name:
        "Business & Human Rights",

        engine:
        "BHR/bhr-rule-engine.js",

        active:
        true,

        bridge:
        true

    },



    DC:
    {

        name:
        "Data Centre Resilience",

        active:
        false,

        planned:
        true

    },



    CYB:
    {

        name:
        "Cyber Resilience",

        active:
        false,

        planned:
        true

    },



    INF:
    {

        name:
        "Infrastructure Resilience",

        active:
        false,

        planned:
        true

    },



    ENG:
    {

        name:
        "Energy Resilience",

        active:
        false,

        planned:
        true

    }


};







/**
 * ============================================================
 * VERIFY DOMAIN INPUT
 * ============================================================
 */


export function verifyDomainInput(

    scenario

)

{


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



    registered:

        scenarioData
        ?
        true
        :
        false,



    status:

        scenarioData

        ?

        "DOMAIN INPUT VERIFIED"

        :

        "DOMAIN INPUT INVALID"


};


}







/**
 * ============================================================
 * BUILD DECISION CONTEXT
 *
 * Domain intelligence → Golden Rule Engine
 *
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



    advisory:

        true,



    goldenRuleAuthority:

        true,



    captainAILenaAuthority:

        true,



    deterministic:

        true,



    machineLearning:

        /**
 * ============================================================
 * DOMAIN EXECUTION ROUTER
 *
 * Scenario → Domain Engine → Bridge → Decision Context
 *
 * ============================================================
 */


export function executeDomainRule(

    scenario,

    state = {}

)

{


const scenarioData =

    scenarioEngine(

        scenario

    );





// ============================================================
// SCENARIO VALIDATION
// ============================================================


if(!scenarioData)

{


return {


    status:

        "INVALID_SCENARIO",



    authority:

        "CAPTAIN AI LENA DECISION CORE"


};


}






// ============================================================
// AUTHENTICITY VALIDATION
// ============================================================


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

        scenarioData.type,



    authority:

        "CAPTAIN AI LENA DECISION CORE"


};


}






let domainResult;






// ============================================================
// FINANCIAL RESILIENCE DOMAIN
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
// BUSINESS & HUMAN RIGHTS DOMAIN
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







// ============================================================
// UNKNOWN / INACTIVE DOMAIN PROTECTION
// ============================================================


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
// DOMAIN RESULT VALIDATION
// ============================================================


if(!domainResult)

{


return {


    status:

        "DOMAIN RESULT INVALID",



    domain:

        scenarioData.domain,



    authority:

        "CAPTAIN AI LENA DECISION CORE"


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
// BRIDGE AUTHORITY VALIDATION
// ============================================================


if(

bridgeResult.goldenRuleAuthority !== true

||

bridgeResult.captainAILenaAuthority !== true

)

{


return {


    status:

        "DOMAIN BRIDGE AUTHORITY FAILURE",



    authority:

        "CAPTAIN AI LENA DECISION CORE"


};


}








// ============================================================
// DECISION CONTEXT FUSION
// ============================================================


const decisionContext =


    buildDecisionContext(

        domainResult,

        bridgeResult,

        scenarioData

    );








// ============================================================
// CONTEXT VALIDATION
// ============================================================


const contextValidation =


    validateDecisionContext(

        decisionContext

    );








return {


    authenticity,



    scenarioProfile:

        getScenarioAuthent