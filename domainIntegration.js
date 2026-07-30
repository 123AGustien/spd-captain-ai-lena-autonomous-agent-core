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
 *    ↓
 * Captain AI Lena Decision Core
 *
 *
 * Active Domains:
 *
 * FIN  — Financial Resilience
 * BHR  — Business & Human Rights
 *
 * ============================================================
 */


import {

    evaluateBHRScenario,
    getBHRRuleDefinition

} from "./BHR/bhr-rule-engine.js";


import {

    getBHRRuleFromScenario

} from "./BHR/bhr-scenario-rule-bridge.js";


import {

    runFINRuleEngine

} from "./FIN/fin-rule-engine.js";



/**
 * ============================================================
 * DOMAIN REGISTRY
 * ============================================================
 */

const DOMAIN_MAP = {


    // ========================================================
    // BUSINESS & HUMAN RIGHTS DOMAIN
    // ========================================================

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



    // ========================================================
    // FINANCIAL RESILIENCE DOMAIN
    // ========================================================

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
 * BHR DOMAIN EXECUTION
 * ============================================================
 */

function runBHRDomain(

    scenario,

    state = {}

) {


    const rule =

        getBHRRuleFromScenario(

            scenario

        );



    return {


        domain:

            "BHR",



        scenario,



        rule,



        ruleDefinition:

            getBHRRuleDefinition(

                rule

            ),



        evaluation:

            evaluateBHRScenario({

                scenario,

                rule,

                intensity:

                    state.intensity || 0

            }),



        status:

            "BHR_RULE_EXECUTED",



        timestamp:

            new Date()

            .toISOString()


    };


}



/**
 * ============================================================
 * FIN DOMAIN EXECUTION
 * ============================================================
 */

function runFINDomain(

    scenario,

    state = {}

) {


    return runFINRuleEngine(

        scenario,

        state

    );


}



/**
 * ============================================================
 * CENTRAL DOMAIN ROUTER
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


            return runBHRDomain(

                scenario,

                state

            );



        case "FIN":


            return runFINDomain(

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

                    "Scenario handled by core Golden Rule Engine.",



                timestamp:

                    new Date()

                    .toISOString()


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



        architecture:

            [

                "COCKPIT",

                "DOMAIN_INTEGRATION",

                "DOMAIN_RULE_ENGINE",

                "GOLDEN_RULE_ENGINE",

                "CAPTAIN_AI_LENA_DECISION"

            ],



        activeDomains:

            [

                "FIN",

                "BHR"

            ],



        registeredScenarios:

            Object.keys(

                DOMAIN_MAP

            ),



        timestamp:

            new Date()

            .toISOString()


    };


}



/**
 * ============================================================
 * DOMAIN STATUS
 * ============================================================
 */

export function getDomainStatus(

) {


    return {


        FIN:

        {

            status:
                "ACTIVE"

        },


        BHR:

        {

            status:
                "ACTIVE"

        },


        totalScenarios:

            Object.keys(

                DOMAIN_MAP

            ).length,


        timestamp:

            new Date()

            .toISOString()


    };


}