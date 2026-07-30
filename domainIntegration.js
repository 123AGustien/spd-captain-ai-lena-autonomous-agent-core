/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Purpose:
 *
 * Gateway between:
 *
 * COCKPIT
 *      ↓
 * DOMAIN SCENARIO
 *      ↓
 * DOMAIN RULE ENGINE
 *      ↓
 * DOMAIN DECISION BRIDGE
 *      ↓
 * CAPTAIN AI LENA DECISION CORE
 *      ↓
 * GOLDEN RULE ENGINE
 *
 *
 * Golden Rule Engine remains authoritative.
 *
 * Domains:
 *
 * FIN  - Financial Resilience
 * BHR  - Business & Human Rights
 * DC   - Data Centre
 * CYB  - Cyber
 * INF  - Infrastructure
 *
 * ============================================================
 */


import {

    finRuleEngine

} from "./FIN/fin-rule-engine.js";


import {

    bhrRuleEngine

} from "./BHR/bhr-rule-engine.js";





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


        valid:

            true,


        domain,


        scenario


    };


}









/**
 * ============================================================
 * REGISTER NEW DOMAIN ENGINE
 * ============================================================
 */


export function registerDomainEngine(

    domain,

    engine

){


    DOMAIN_ENGINES[domain] = engine;


    DOMAIN_REGISTRY[domain] = {


        name:

            domain,


        active:

            true


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

        ||

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
 * Domain engines provide verified advice.
 *
 * Captain AI Lena remains authority.
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





    if(

        !engine

    ){

        return {


            domain,

            scenario,

            decision:null,

            domainDecision:null,

            goldenRuleAuthority:false,

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









    const decision =


        result.decision


        ??

        result.domainDecision?.decision


        ??

        null;









    /*
    Domain engines are advisory only.

    Golden Rule Engine remains authority.

    */


    const authority =


        result.goldenRuleAuthority


        ??

        result.domainDecision?.goldenRuleAuthority


        ??

        false;









    const domainDecision = {


        decision,


        goldenRuleAuthority:

            authority,


        domain,


        scenario,


        advisory:

            true


    };









    return {


        domain,


        scenario,



        decision,



        domainDecision,



        recommendation:


            result.recommendation


            ??

            result.ruleResponse


            ??

            result.recommendedActions


            ??

            null,



        risk:


            result.risk


            ??

            result.assessment


            ??

            null,



        goldenRuleAuthority:


            authority,



        status:


            decision

            ?


            "VERIFIED DOMAIN DECISION"


            :


            "DOMAIN ASSESSMENT COMPLETE"



    };


}









/**
 * ============================================================
 * CREATE DOMAIN DECISION BRIDGE
 *
 * Output consumed by Captain AI Lena.
 *
 * ============================================================
 */


export function createDomainDecisionBridge(

    domain,

    scenario,

    state = {}

){


    return executeDomainRule(

        domain,

        scenario,

        state

    );


}









/**
 * ============================================================
 * MASTER DOMAIN INTEGRATION ENTRY POINT
 *
 * Called by:
 *
 * runEngine.js
 *
 * ============================================================
 */


export function executeDomainIntegration(

    state = {}

){



    const scenario =


        String(

            state.scenario

            ??

            state.event

            ??

            "NORMAL"

        )

        .trim()

        .toUpperCase();






    let domain = "NONE";








    const FIN_SCENARIOS = [


        "FX_STRESS",

        "FIN_STRESS",

        "BANKING_STRESS",

        "LIQUIDITY_CRISIS",

        "CREDIT_STRESS",

        "SOVEREIGN_DEBT"


    ];







    const BHR_SCENARIOS = [


        "HUMAN_RIGHTS_DUE_DILIGENCE",

        "FORCED_LABOUR",

        "CHILD_LABOUR",

        "DISCRIMINATION",

        "OCCUPATIONAL_HEALTH_AND_SAFETY",

        "MODERN_SLAVERY",

        "COMMUNITY_IMPACT",

        "INDIGENOUS_RIGHTS",

        "SUPPLY_CHAIN_RISK",

        "GRIEVANCE_MECHANISM"


    ];









    if(

        FIN_SCENARIOS.includes(

            scenario

        )

    ){

        domain = "FIN";

    }






    if(

        BHR_SCENARIOS.includes(

            scenario

        )

    ){

        domain = "BHR";

    }









    if(

        domain === "NONE"

    ){

        return {


            integration:

                "SPD v13.1 DOMAIN INTEGRATION LAYER",


            status:

                "NO ACTIVE DOMAIN",


            domain,


            scenario,


            goldenRuleAuthority:

                true


        };

    }









    return {


        integration:

            "SPD v13.1 DOMAIN INTEGRATION LAYER",


        status:

            "DOMAIN ROUTING COMPLETE",


        ...createDomainDecisionBridge(

            domain,

            scenario,

            state

        )


    };


}









/**
 * ============================================================
 * DOMAIN INTEGRATION STATUS
 * ============================================================
 */


export const DOMAIN_INTEGRATION_STATUS = {


    module:

        "SPD v13.1 DOMAIN INTEGRATION LAYER",


    domains:

        [

            "FIN",

            "BHR",

            "DC",

            "CYB",

            "INF"

        ],



    activeDomains:

        [

            "FIN",

            "BHR"

        ],



    goldenRuleAuthority:

        true,



    captainAILenaAuthority:

        true,



    deterministic:

        true,



    machineLearning:

        false,



    status:

        "READY"


};









/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */


export default {


    DOMAIN_REGISTRY,

    DOMAIN_ENGINES,

    verifyDomainInput,

    registerDomainEngine,

    getDomainStatus,

    executeDomainRule,

    createDomainDecisionBridge,

    executeDomainIntegration,

    DOMAIN_INTEGRATION_STATUS


};