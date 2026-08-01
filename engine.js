// ============================================================
// SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
// engine.js (ROOT)
//
// CAPTAIN AI LENA AUTONOMOUS AGENT CORE
//
// DATA → ALGORITHMS → COMPUTE
//
// GOLDEN RULE PIPELINE:
//
// OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
//
// Backend Decision Authority:
// CAPTAIN AI LENA DECISION CORE
//
// Domain Engines:
// FIN
// BHR
//
// Domain engines provide advisory intelligence only.
//
// Golden Rule Engine remains authoritative.
//
// Deterministic.
// No randomness.
// No machine learning.
//
// ============================================================


import {

    captainAILena

}

from "./captainAILena.js";


import {

    GOLDEN_RATIO

}

from "./constants/math.constants.js";


import {

    runAnalytics

}

from "./analytics/index.js";


import {

    executeMemoryCore

}

from "./memoryCore.js";


import {

    createAuditRecord

}

from "./auditRecord.js";


import {

    executeDomainIntegration

}

from "./domainIntegration.js";




// ============================================================
// GOLDEN RULE PIPELINE
// ============================================================


export const GOLDEN_RULE_STAGES = [

    "OBSERVE",

    "VERIFY",

    "ASSESS",

    "DECIDE",

    "ACT",

    "UPDATE"

];




// ============================================================
// INPUT VALIDATION
// ============================================================


function validateInput(state){


    if(

        typeof state !== "object"

        ||

        state === null

    ){

        throw new Error(

            "SPD v13.1 VERIFY FAILED: INVALID INPUT STATE"

        );

    }


    return true;

}




// ============================================================
// NORMALIZE STATE
// ============================================================


function normalizeState(state){


return {


    fx:

    Number(state.fx ?? 0),


    energy:

    Number(state.energy ?? 50),


    cyb:

    Number(state.cyb ?? 50),


    inf:

    Number(state.inf ?? 0),


    dc:

    Number(state.dc ?? 0),



    event:

    state.event ?? "NORMAL",



    scenario:

    state.scenario ?? "NORMAL",



    mode:

    state.mode ?? "AUTONOMOUS",



    intensity:

    Number(state.intensity ?? 0),



    time:

    new Date().toISOString()


};


}





// ============================================================
// MAIN EXECUTION ENGINE
// ============================================================


export function runEngine(

state = {}

){



// ============================================================
// OBSERVE
// ============================================================


validateInput(state);



const inputState = {

    ...state

};





// ============================================================
// VERIFY
// ============================================================


const verifiedState =

normalizeState(

    state

);





// ============================================================
// DOMAIN INTEGRATION
//
// FIN / BHR
//
// Domain engines advisory only.
//
// Priority Context Fusion active.
// ============================================================


const domainIntegrationResult =


executeDomainIntegration(

    verifiedState

);





const domainDecision = {


    ...(

        domainIntegrationResult.domainDecision

        ??

        {}

    ),



    priorityContext:

    domainIntegrationResult.priorityContext

    ??

    null


};






// ============================================================
// DOMAIN CONTEXT CHECK
// ============================================================


if(domainDecision.priorityContext){


console.log(

"SPD v13.1 DOMAIN PRIORITY:",

domainDecision.priorityContext.priority

);


}






// ============================================================
// ASSESS
// ============================================================


const analytics =


runAnalytics(

{


    ...verifiedState,


    domainDecision,


    priorityContext:

    domainDecision.priorityContext


}

);






// ============================================================
// DECIDE
//
// CAPTAIN AI LENA FINAL AUTHORITY
// ============================================================


const decision =


captainAILena(

{


    ...verifiedState,


    domainDecision,


    priorityContext:

    domainDecision.priorityContext,


    analytics,


    authority:

    "CAPTAIN AI LENA DECISION CORE",


    goldenRuleAuthority:

    true


}

);






// ============================================================
// ACT
// ============================================================


const action = {


    decision:

    decision.decision

    ||

    "SYSTEM MONITORING",



    action:

    decision.action

    ||

    "MONITOR SYSTEM",



    status:

    "ACTIVE"


};






// ============================================================
// UPDATE MEMORY CORE
// ============================================================


const memory =


executeMemoryCore(

{


    scenario:

    verifiedState.scenario,



    domain:

    domainDecision.domain

    ??

    "NONE",



    priorityContext:

    domainDecision.priorityContext,



    decision,



    action,



    timestamp:

    new Date().toISOString()


}

);







// ============================================================
// AUDIT RECORD
// ============================================================


const audit =


createAuditRecord(

{


    inputState,


    verifiedState,


    domainDecision,


    priorityContext:

    domainDecision.priorityContext,


    decision,


    action,


    memory,


    pipeline:

    GOLDEN_RULE_STAGES,


    authority:

    "CAPTAIN AI LENA DECISION CORE"


}

);







// ============================================================
// FINAL OUTPUT
// ============================================================


return {


    timestamp:

    new Date().toISOString(),



    engine:

    "SPD v13.1 SEXTANT RESILIENCE EXECUTION ENGINE",



    agent:

    "CAPTAIN AI LENA",



    pipeline:

    GOLDEN_RULE_STAGES,



    input:

    inputState,



    verifiedState,



    domainIntegration:

    domainIntegrationResult,



    domainDecision,



    priorityContext:

    domainDecision.priorityContext,



    analytics,



    decision,



    action,



    memory,



    audit,



    constants:{


        PHI:

        GOLDEN_RATIO,


        GOLDEN_RULE_STAGES


    },



    validation:{


        engine:

        "SPD v13.1 VALIDATION READY",



        decisionAuthority:

        "CAPTAIN AI LENA DECISION CORE",



        goldenRuleAuthority:

        true,



        domainPriorityFusion:

        Boolean(

            domainDecision.priorityContext

        ),



        deterministic:

        true,



        machineLearning:

        false


    },





    authority:

    "CAPTAIN AI LENA DECISION CORE",



    status:

    "EXECUTED"


};


}








// ============================================================
// ENGINE STATUS
// ============================================================


export const ENGINE_STATUS = {


    module:

    "SPD v13.1 SEXTANT RESILIENCE EXECUTION ENGINE",



    pipeline:


    [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "ACT",

        "UPDATE"

    ],



    domains:


    [

        "FIN",

        "BHR"

    ],



    features:


    [

        "DOMAIN_PRIORITY_CONTEXT_FUSION"

    ],



    authority:

    "CAPTAIN AI LENA DECISION CORE",



    goldenRuleAuthority:

    true,



    deterministic:

    true,



    machineLearning:

    false,



    status:

    "READY"


};







// ============================================================
// DEFAULT EXPORT
// ============================================================


export default {


    runEngine,


    GOLDEN_RULE_STAGES,


    ENGINE_STATUS


};