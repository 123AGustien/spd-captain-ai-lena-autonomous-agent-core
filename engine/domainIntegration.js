/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Purpose:
 *
 * Gateway between cockpit scenarios,
 * domain rule engines,
 * and Captain AI Lena decision architecture.
 *
 *
 * ARCHITECTURE:
 *
 * SCENARIO INPUT
 *        ↓
 * DOMAIN INTEGRATION LAYER
 *        ↓
 * FIN / BHR RULE ENGINE
 *        ↓
 * DOMAIN DECISION BRIDGE
 *        ↓
 * GOLDEN RULE ENGINE
 *        ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 *
 * PRINCIPLE:
 *
 * Domain engines assess.
 *
 * Domain bridge translates.
 *
 * Golden Rule Engine remains authoritative.
 *
 * Captain AI Lena decides.
 *
 *
 * Deterministic.
 * No machine learning.
 * No randomness.
 *
 * ============================================================
 */


import {

    domainDecisionBridge

}

from "./domainDecisionBridge.js";





// ============================================================
// DOMAIN REGISTRY
// ============================================================


export const DOMAIN_REGISTRY = {


    FIN:

    {

        name:

        "Financial Resilience",

        active:

        true

    },


    BHR:

    {

        name:

        "Business & Human Rights",

        active:

        true

    }


};





// ============================================================
// DOMAIN DETECTION
// ============================================================


function detectDomain(state = {})

{


    if(

        state.domain

    )

    {

        return state.domain;

    }



    const scenario =

        state.scenario;



    const FIN_SCENARIOS = [

        "FIN_STRESS",

        "BANKING_STRESS",

        "LIQUIDITY_CRISIS",

        "CREDIT_STRESS",

        "SOVEREIGN_DEBT"

    ];



    const BHR_SCENARIOS = [

        "OCCUPATIONAL_HEALTH_AND_SAFETY",

        "FORCED_LABOUR",

        "CHILD_LABOUR",

        "SUPPLY_CHAIN_RISK",

        "COMMUNITY_IMPACT"

    ];



    if(

        FIN_SCENARIOS.includes(scenario)

    )

    {

        return "FIN";

    }



    if(

        BHR_SCENARIOS.includes(scenario)

    )

    {

        return "BHR";

    }



    return "UNKNOWN";

}





// ============================================================
// DOMAIN RULE EXECUTION
// ============================================================


function executeDomainRule(

    state = {},

    domain

)

{


    return {


        domain,


        scenario:

            state.scenario

            ??

            "NORMAL",



        domainStress:

            Number(

                state.intensity

                ??

                0

            ),



        risk:

            state.risk

            ??

            "LOW"


    };


}







// ============================================================
// MAIN DOMAIN INTEGRATION FUNCTION
// ============================================================


export function executeDomainIntegration(

    state = {}

)

{


    const domain =

        detectDomain(

            state

        );



    const domainResult =


        executeDomainRule(

            state,

            domain

        );





    const bridgeResult =


        domainDecisionBridge(

            domainResult

        );





    return {


        ...bridgeResult,



        integrationLayer:

            "SPD