// ============================================================
// SPD v13.1 — SEXTANT RESILIENCE EXECUTION ENGINE
// engine.js (ROOT)
//
// FIX 4 — INTENSITY BRIDGE REPAIR VERSION
//
// CAPTAIN AI LENA AUTONOMOUS AGENT CORE
//
// DATA → ALGORITHMS → COMPUTE
//
// GOLDEN RULE PIPELINE:
//
// OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
//
// AUTHORITY:
//
// Golden Rule Engine remains authoritative.
// Captain AI Lena Decision Core remains final decision authority.
//
// DOMAIN ENGINES:
// FIN
// BHR
//
// Deterministic.
// No randomness.
// No machine learning.
//
// ============================================================



// ============================================================
// IMPORTS
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

    executeDomainRule

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
//
// INTENSITY BRIDGE ENABLED
// ============================================================


function normalizeState(state){


return {


    fx:

    Number(

        state.fx ?? 0

    ),



    energy:

    Number(

        state.energy ?? 50

    ),



    cyb:

    Number(

        state.cyb ?? 50

    ),



    inf:

    Number(

        state.inf ?? 0

    ),



    dc:

    Number(

        state.dc ?? 0

    ),





    event:

    state.event

    ??

    "NORMAL",





    scenario:

    state.scenario

    ??

    state.event

    ??

    "NORMAL",





    mode:

    state.mode

    ??

    "AUTONOMOUS",





    // FIX 4 INTENSITY BRIDGE

    intensity:

    Number(

        state.intensity ?? 50

    ),





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
// FIN + BHR
//
// Intensity is passed through
// Domain engines remain advisory
//
// ============================================================


const domainIntegrationResult =


executeDomainRule(

    verifiedState.scenario,

    verifiedState

);





// ============================================================
// ASSESS
//
// ANALYTICS + DOMAIN CONTEXT
// ============================================================


const analytics =


runAnalytics(

{

    ...verifiedState,


    domainDecision:

    domainIntegrationResult

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


    domainDecision:

    domainIntegrationResult,


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

    domainIntegrationResult?.domain

    ??

    "NONE",



    intensity:

    verifiedState.intensity,



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



    domainIntegration:

    domainIntegrationResult,



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



    scenario:

    verifiedState.sc
