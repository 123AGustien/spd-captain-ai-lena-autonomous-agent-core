/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER FINAL
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Central Domain Routing Bridge
 *
 * COCKPIT
 *    ↓
 * domainIntegration.js
 *    ↓
 * DOMAIN RULE ENGINES
 *    ↓
 * DOMAIN ACTION ENGINE
 *    ↓
 * DOMAIN SOLUTION ENGINE
 *    ↓
 * DOMAIN DECISION BRIDGE
 *    ↓
 * GOLDEN RULE ENGINE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * MEMORY CORE
 *    ↓
 * AUDIT RECORD
 *
 *
 * ACTIVE DOMAINS:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
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

    getBHRAction

} from "./BHR/bhr-action-engine.js";


import {

    getBHRSolution

} from "./BHR/bhr-solution-engine.js";


import {

    runFINRuleEngine

} from "./FIN/fin-rule-engine.js";





/**
 * ============================================================
 * DOMAIN REGISTRY
 * ============================================================
 */


const DOMAIN_MAP = {


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



    FIN_STRESS:"FIN",

    BANKING_STRESS:"FIN",

    LIQUIDITY_CRISIS:"FIN",

    CREDIT_STRESS:"FIN",

    SOVEREIGN_DEBT:"FIN"


};





/**
 * ============================================================
 * GET DOMAIN
 * ============================================================
 */


export function getScenarioDomain(

    scenario

){


    return DOMAIN_MAP[scenario] || "CORE";

}





/**
 * ============================================================
 * DOMAIN DECISION BRIDGE
 * ============================================================
 */


function buildDomainDecisionBridge(

    domainResult

){


    return {


        domain:

        domainResult.domain,


        scenario:

        domainResult.scenario,


        domainRisk:

        domainResult.evaluation?.risk

        ||

        domainResult.assessment?.risk

        ||

        domainResult.risk

        ||

        "UNKNOWN",



        domainAssessment:

        domainResult.evaluation

        ||

        domainResult.assessment

        ||

        {},



        domainDecision:

        domainResult.evaluation?.decision

        ||

        domainResult.decision

        ||

        "MONITOR",



        domainActions:

        domainResult.domainActions

        ||

        domainResult.evaluation?.recommendedActions

        ||

        domainResult.actions

        ||

        [],



        domainSolution:

        domainResult.domainSolution

        ||

        null,



        authority:

        "DOMAIN_RULE_ENGINE",



        goldenRuleAuthority:

        true,



        timestamp:

        new Date().toISOString()


    };


}





/**
 * ============================================================
 * RUN BHR DOMAIN
 * ============================================================
 */


function runBHRDomain(

    scenario,

    state={}

){


    const rule =

    getBHRRuleFromScenario(

        scenario

    );



    if(!rule){


        return {


            domain:

            "BHR",


            scenario,


            status:

            "UNKNOWN_BHR_RULE",


            timestamp:

            new Date().toISOString()


        };

    }





    const ruleDefinition =

    getBHRRuleDefinition(

        rule

    );





    const scenarioIntensity =


    state.intensityValue

    ??

    state.intensity

    ??

    0;





    const evaluation =


    evaluateBHRScenario({

        scenario,

        rule,

        intensity:

        scenarioIntensity

    });





    /**
     * ========================================================
     * BHR ACTION ENGINE
     * ========================================================
     */


    const bhrAction =


    getBHRAction(

        scenario

    );





    /**
     * ========================================================
     * BHR SOLUTION ENGINE
     * ========================================================
     */


    const assessment =


    evaluation.risk

    ||

    evaluation.assessment

    ||

    "LOW";





    const bhrSolution =


    getBHRSolution(

        rule,

        assessment

    );





    const result = {


        domain:

        "BHR",



        scenario,



        rule,



        ruleDefinition,



        intensity:

        scenarioIntensity,



        evaluation,



        domainActions:

        bhrAction.steps,



        recommendedAction:

        bhrAction.action,



        domainSolution:

        bhrSolution,



        status:

        "BHR_RULE_EXECUTED",



        goldenRuleAuthority:

        true,



        timestamp:

        new Date().toISOString()


    };





    return {


        ...result,



        domainDecisionBridge:


        buildDomainDecisionBridge(

            result

        )


    };


}







/**
 * ============================================================
 * RUN FIN DOMAIN
 * ============================================================
 */


function runFINDomain(

    scenario,

    state={}

){


    const result =


    runFINRuleEngine(

        scenario,

        state

    );



    return {


        ...result,



        domainDecisionBridge:


        buildDomainDecisionBridge(

            result

        )


    };


}







/**
 * ============================================================
 * CENTRAL DOMAIN ROUTER
 * ============================================================
 */


export function runDomainIntegration(

    scenario,

    state={}

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


                domain:

                "CORE",



                scenario,



                status:

                "NO_DOMAIN_RULE",



                message:

                "Handled by Core Golden Rule Engine.",



                timestamp:

                new Date().toISOString()


            };


    }


}







/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */


export function validateDomainIntegration(){


    return {


        module:

        "SPD v13.1 Domain Integration Layer Final",



        status:

        "READY",



        architecture:[


            "COCKPIT",


            "DOMAIN_INTEGRATION",


            "DOMAIN_RULE_ENGINE",


            "DOMAIN_ACTION_ENGINE",


            "DOMAIN_SOLUTION_ENGINE",


            "DOMAIN_DECISION_BRIDGE",


            "GOLDEN_RULE_ENGINE",


            "CAPTAIN_AI_LENA_DECISION",


            "MEMORY_CORE",


            "AUDIT_RECORD"


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







export default {


    getScenarioDomain,


    runDomainIntegration,


    validateDomainIntegration,


    getDomainStatus


};