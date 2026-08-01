/**
 * ============================================================
 * SPD v13.1 — CLIENT RECOVERY ACTION TEST
 *
 * FORCED LABOUR 95% DEMONSTRATION
 *
 * FLOW:
 *
 * TEST INPUT
 *      ↓
 * FAULT IDENTIFICATION
 *      ↓
 * CORRECTIVE ACTION
 *      ↓
 * RE-TEST VALIDATION
 *
 * ============================================================
 */


import {

    identifyFaults

}

from "./faultIdentificationEngine.js";



import {

    executeCorrectiveAction

}

from "./correctiveActionEngine.js";



import {

    executeRetestValidation

}

from "./retestValidationEngine.js";





// ============================================================
// TEST SCENARIO
// ============================================================


const scenario = {


    domain:

        "BHR",


    scenario:

        "FORCED_LABOUR",


    intensity:

        95,



    expectedRisk:

        "HIGH",



    expectedDecision:

        "ACTIVATE BHR REMEDIATION MODE",





    // INTENTIONAL FAULT
    //
    // Simulates system error

    actualRisk:

        "LOW",



    actualDecision:

        "SYSTEM STABLE"



};






// ============================================================
// STEP 1
// FAULT IDENTIFICATION
// ============================================================


const faultReport =

identifyFaults(

    scenario

);



console.log(

    "FAULT REPORT",

    faultReport

);






// ============================================================
// STEP 2
// CORRECTIVE ACTION
// ============================================================


const correctiveAction =

executeCorrectiveAction(

{

    faultReport

}

);



console.log(

    "CORRECTIVE ACTION",

    correctiveAction

);






// ============================================================
// STEP 3
// RE-TEST
// ============================================================


const retest =

executeRetestValidation(

{


    expectedRisk:

        scenario.expectedRisk,


    retestRisk:

        "HIGH",



    expectedDecision:

        scenario.expectedDecision,


    retestDecision:

        "ACTIVATE BHR REMEDIATION MODE"


}

);



console.log(

    "RE-TEST RESULT",

    retest

);





export default {


    scenario,

    faultReport,

    correctiveAction,

    retest


};