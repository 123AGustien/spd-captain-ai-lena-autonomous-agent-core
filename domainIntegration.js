/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Central domain routing bridge.
 *
 * Cockpit
 *    ↓
 * domainIntegration.js
 *    ↓
 * Domain Rule Engines
 *    ↓
 * Golden Rule Engine
 *
 * ============================================================
 */


import {

    runBHRRuleEngine

} from "./BHR/bhr-rule-engine.js";


import {

    runFINRuleEngine

} from "./FIN/fin-rule-engine.js";



/**
 * ============================================================
 * DOMAIN REGISTRY
 * ============================================================
 */

const DOMAIN_MAP = {


    // BUSINESS & HUMAN RIGHTS

    HUMAN_RIGHTS_DUE_DILIGENCE:
        "BHR",

    FORCED_LABOUR:
        "BHR",

    CHILD_LABOUR:
        "BHR",

    DISCRIMINATION:
        "BHR",

    OCCUPATIONAL_HEALTH_AND_SAFETY:
        "BHR",

    MODERN_SLAVERY:
        "BHR",

    COMMUNITY_IMPACT:
        "BHR",

    INDIGENOUS_RIGHTS:
        "BHR",

    SUPPLY_CHAIN_RISK:
        "BHR",

    GRIEVANCE_MECHANISM:
        "BHR",



    // FINANCIAL RESILIENCE

    FIN_STRESS:
        "FIN",

    BANKING_STRESS:
        "FIN",

    LIQUIDITY_CRISIS:
        "FIN",

    CREDIT_STRESS:
        "FIN",

    SOVEREIGN_DEBT:
        "FIN"


};



/**
 * ============================================================
 * GET DOMAIN
 * ============================================================
 */

export function getScenarioDomain(

    scenario

) {


    return DOMAIN_MAP[scenario] || "CORE";


}



/**
 * ============================================================
 * DOMAIN ROUTER
 * ============================================================
 */

export function runDomainIntegration(

    scenario,

    state = {}

) {


    const domain =

        getScenarioDomain(

            scenario

        );



    switch(domain) {



        case "BHR":


            return runBHRRuleEngine(

                scenario,

                state

            );



        case "FIN":


            return runFINRuleEngine(

                scenario,

                state

            );



        default:


            return {


                domain:

                    "CORE",


                status:

                    "NO_DOMAIN_RULE",


                scenario,


                message:

                    "Scenario handled by core Golden Rule Engine."

            };


    }


}



/**
 * ============================================================
 * DOMAIN VALIDATION
 * ============================================================
 */

export function validateDomainIntegration() {


    return {


        module:

            "SPD v13.1 Domain Integration Layer",


        status:

            "READY",


        registeredScenarios:

            Object.keys(

                DOMAIN_MAP

            ),


        timestamp:

            new Date()

            .toISOString()


    };


}