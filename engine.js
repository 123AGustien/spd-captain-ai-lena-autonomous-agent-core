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
