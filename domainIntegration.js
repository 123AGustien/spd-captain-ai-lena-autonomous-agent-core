/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Central domain routing bridge.
 *
 * Architecture:
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
 *    ↓
 * Memory Core
 *    ↓
 * Audit Record
 *
 *
 * IMPORTANT:
 *
 * Domain engines provide assessment,
 * risk factors and recommended actions.
 *
 * Golden Rule Engine remains authoritative.
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/**
 * ============================================================
 * DOMAIN ENGINE IMPORTS
 * ============================================================
 */


import {

    evaluateBHRScenario

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


    // ================================
    // BUSINESS & HUMAN RIGHTS
    // ================================


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



    // ================================
    // FINANCIAL RESILIENCE
    // ================================


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
 * NORMALIZE SCENARIO
 * ============================================================
 */


function normalizeScenario(

    scenario

) {


    return String(

        scenario || ""

    )

    .trim()

    .toUpperCase();


}



/**
 * ============================================================
 * GET DOMAIN
 * ============================================================
 */


export function getScenarioDomain(

    scenario

) {


    const id =

        normalizeScenario(

            scenario

        );


    return (

        DOMAIN_MAP[id]

        ||

        "CORE"

    );


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


    const scenarioID =

        normalizeScenario(

            scenario

        );



    const BHR_RULE_MAP = {


        HUMAN_RIGHTS_DUE_DILIGENCE:
            "BHR-001",


        FORCED_LABOUR:
            "BHR-002",


        CHILD_LABOUR:
            "BHR-003",


        DISCRIMINATION:
            "BHR-004",


        OCCUPATIONAL_HEALTH_AND_SAFETY:
            "BHR-005",


        MODERN_SLAVERY:
            "BHR-006",


        COMMUNITY_IMPACT:
            "BHR-007",


        INDIGENOUS_RIGHTS:
            "BHR-008",


        SUPPLY_CHAIN_RISK:
            "BHR-009",


        GRIEVANCE_MECHANISM:
            "BHR-010"


    };



    return evaluateBHRScenario({

        scenario:

            scenarioID,


        rule:

            BHR_RULE_MAP[scenarioID],


        intensity:

            state.intensityValue

            ||

            state.intensity

            ||

            0


    });


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


    const scenarioID =

        normalizeScenario(

            scenario

        );



    const domain =

        getScenarioDomain(

            scenarioID

        );



    switch(domain) {



        case "BHR":



            return runBHRDomain(

                scenarioID,

                state

            );





        case "FIN":



            return runFINRuleEngine(

                scenarioID,

                state

            );





        default:



            return {


                domain:

                    "CORE",


                status:

                    "NO_DOMAIN_RULE",


                scenario:

                    scenarioID,


                message:

                    "Scenario handled by Core Golden Rule Engine."


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



        domains:

            [

                "BHR",

                "FIN"

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


export const DOMAIN_INTEGRATION_STATUS = {


    module:

        "SPD v13.1 Domain Integration Layer",



    activeDomains:

        [

            "BHR",

            "FIN"

        ],



    deterministic:

        true,



    goldenRuleAuthority:

        true,



    status:

        "ACTIVE"


};



export default {


    getScenarioDomain,

    runDomainIntegration,

    validateDomainIntegration,

    DOMAIN_INTEGRATION_STATUS


};