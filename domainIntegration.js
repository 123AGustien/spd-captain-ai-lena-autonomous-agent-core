/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FIN + BHR DECISION AUTHORITY BRIDGE
 * WITH BHR VALIDATION ENGINE
 *
 * File:
 * domainIntegration.js
 *
 * Gateway:
 *
 * COCKPIT
 *      ↓
 * DOMAIN SCENARIO
 *      ↓
 * DOMAIN RULE ENGINE
 *      ↓
 * DOMAIN VALIDATION ENGINE
 *      ↓
 * DOMAIN DECISION BRIDGE
 *      ↓
 * CAPTAIN AI LENA DECISION CORE
 *      ↓
 * GOLDEN RULE ENGINE
 *      ↓
 * ACTION / MEMORY / AUDIT
 *
 *
 * PRINCIPLE:
 *
 * Domain Engines advise.
 * Captain AI Lena decides.
 *
 * Golden Rule Engine remains authoritative.
 *
 * Deterministic.
 * No machine learning.
 * No randomness.
 *
 * ============================================================
 */


/**
 * ============================================================
 * DOMAIN ENGINE IMPORTS
 * ============================================================
 */


import {

    finRuleEngine

} from "./FIN/fin-rule-engine.js";



import {

    buildFINDecisionBridge

} from "./FIN/fin-decision-bridge.js";



import {

    bhrRuleEngine

} from "./BHR/bhr-rule-engine.js";



import {

    buildBHRDecisionBridge

} from "./BHR/bhr-decision-bridge.js";



/**
 * BHR VALIDATION ENGINE
 *
 * BHR Rule Engine
 *        ↓
 * BHR Validation
 *        ↓
 * Decision Bridge
 *
 */

import {

    validateBHREngine

} from "./BHR/bhr-validation-engine.js";







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

            "Cyber Security",


        active:

            false


    },



    INF: {


        name:

            "Infrastructure",


        active:

            false


    }


};







/**
 * ============================================================
 * DOMAIN ENGINE MAP
 * ============================================================
 */


export const DOMAIN_ENGINES = {


    FIN:

        finRuleEngine,



    BHR:

        bhrRuleEngine


};







/**
 * ============================================================
 * VERIFY DOMAIN INPUT
 * ============================================================
 */


export function verifyDomainInput(

    domain,

    scenario

){


    if(

        !DOMAIN_REGISTRY[domain]

    ){


        throw new Error(

            "UNKNOWN DOMAIN"

        );


    }



    if(

        !DOMAIN_REGISTRY[domain].active

    ){


        throw new Error(

            "DOMAIN NOT ACTIVE"

        );


    }



    return {


        valid:true,


        domain,


        scenario


    };


}







/**
 * ============================================================
 * REGISTER DOMAIN ENGINE
 * ============================================================
 */


export function registerDomainEngine(

    domain,

    engine

){


    DOMAIN_ENGINES[domain] = engine;



    DOMAIN_REGISTRY[domain] = {


        name:domain,


        active:true


    };


}







/**
 * ============================================================
 * GET DOMAIN STATUS
 * ============================================================
 */


export function getDomainStatus(

    domain

){


    return (

        DOMAIN_REGISTRY[domain]

        ??

        {


            active:false,


            name:"UNKNOWN"


        }

    );


}
/**
 * ============================================================
 * EXECUTE DOMAIN RULE
 *
 * Domain engines provide advisory assessment.
 *
 * Validation layer verifies domain output.
 *
 * Captain AI Lena remains final authority.
 *
 * ============================================================
 */


export function executeDomainRule(

    domain,

    scenario,

    state = {}

){


    verifyDomainInput(

        domain,

        scenario

    );



    const engine =

        DOMAIN_ENGINES[domain];



    if(!engine)

    {

        return {


            domain,

            scenario,


            status:

                "NO_ENGINE"


        };


    }






    const result =

        engine(

            {

                ...state,

                domain,

                scenario

            }

        );







    /**
     * ========================================================
     * DOMAIN VALIDATION
     *
     * Currently active:
     * BHR Validation Engine
     *
     * ========================================================
     */


    let validation = null;



    if(domain === "BHR")

    {


        validation =

            validateBHREngine(

                {

                    ...state,

                    scenario

                }

            );


    }







    /**
     * ========================================================
     * DECISION BRIDGE
     * ========================================================
     */


    let decisionBridge = null;



    if(domain === "FIN")

    {


        decisionBridge =

            buildFINDecisionBridge(

                result

            );


    }





    if(domain === "BHR")

    {


        decisionBridge =

            buildBHRDecisionBridge(

                result

            );


    }








    const decision =


        decisionBridge

        ?.domainDecision

        ?.decision


        ??

        result.decision


        ??

        null;







    const action =


        decisionBridge

        ?.domainDecision

        ?.action


        ??

        result.action


        ??

        null;







    return {


        domain,


        scenario,



        validation,



        validation