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

    getBHRRuleFromScenario,
    validateBHRScenarioMapping

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


    // ============================
    // BHR DOMAIN
    // ============================

    HUMAN_RIGHTS_DUE_DILIGENCE:"BHR",

    FORCED_LABOUR:"BHR",

    CHILD_LABOUR:"BHR",

    DISCRIMINATION:"BHR",

    OCCUPATIONAL_HEALTH_AND_SAFETY:"BHR",

    MODERN_SLAVERY:"BHR",

    COMMUNITY_IMPACT:"BHR",

    INDIGENOUS_RIGHTS:"BHR",

    SUPPLY_CHAIN_RISK:"BHR",

    GRIEVANCE_MECHANISM:"BHR",



    // ============================
    // FIN DOMAIN
    // ============================

    FIN_STRESS:"FIN",

    BANKING_STRESS:"FIN",

    LIQUIDITY_CRISIS:"FIN",

    CREDIT_STRESS:"FIN",

    SOVEREIGN_DEBT:"FIN"


};



/**
 * ============================================================
 * GET SCENARIO DOMAIN
 * ============================================================
 */

export function getScenarioDomain(

    scenario

){

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

){

    const rule =
        getBHRRuleFromScenario(
            scenario
        );


    if(!rule){

        return {

            domain:"BHR",

            scenario,

            status:"UNKNOWN_BHR_RULE",

            message:
            "No BHR rule mapping found.",

            timestamp:
            new Date().toISOString()

        };

    }



    const ruleDefinition =
        getBHRRuleDefinition(
            rule
        );



    const evaluation =
        evaluateBHRScenario({

            scenario,

            rule,

            intensity:
            state.intensity || 0

        });



    return {

        domain:"BHR",

        scenario,

        rule,

        ruleDefinition,

        evaluation,

        status:
        "BHR_RULE_EXECUTED",


        goldenRuleAuthority:
        true,


        timestamp:
        new Date().toISOString()


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

){

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

){


    const domain =
        getScenarioDomain(
            scenario
        );



    switch(domain){


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

                domain:"CORE",

                status:
                "NO_DOMAIN_RULE",

                scenario,

                message:
                "Scenario handled by Core Golden Rule Engine.",


                timestamp:
                new Date().toISOString()


            };


    }


}



/**
 * ============================================================
 * EXECUTE DOMAIN RULE BRIDGE
 * ============================================================
 *
 * Public cockpit interface.
 *
 * Cockpit
 *    ↓
 * executeDomainRule()
 *    ↓
 * runDomainIntegration()
 *    ↓
 * Domain Rule Engine
 *
 * ============================================================
 */

export function executeDomainRule(

    scenario,

    state = {}

){

    return runDomainIntegration(

        scenario,

        state

    );

}



/**
 * ============================================================
 * DOMAIN VALIDATION
 * ============================================================
 */

export function validateDomainIntegration(){


    return {


        module:
        "SPD v13.1 Domain Integration Layer",


        status:
        "READY",


        architecture:[

            "COCKPIT",

            "DOMAIN_INTEGRATION",

            "DOMAIN_RULE_ENGINE",

            "GOLDEN_RULE_ENGINE",

            "CAPTAIN_AI_LENA_DECISION"

        ],


        activeDomains:[

            "FIN",

            "BHR"

        ],


        BHRBridge:

        validateBHRScenarioMapping(),



        registeredScenarios:

        Object.keys(

            DOMAIN_MAP

        ),



        timestamp:

        new Date().toISOString()


    };


}



/**
 * ============================================================
 * DOMAIN STATUS
 * ============================================================
 */

export function getDomainStatus(){


    return {


        FIN:{

            status:
            "ACTIVE"

        },


        BHR:{

            status:
            "ACTIVE"

        },


        totalScenarios:

        Object.keys(

            DOMAIN_MAP

        ).length,


        timestamp:

        new Date().toISOString()


    };


}



/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {


    getScenarioDomain,

    runDomainIntegration,

    executeDomainRule,

    validateDomainIntegration,

    getDomainStatus


};