/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * FIN + BHR DECISION AUTHORITY BRIDGE
 * FINAL INTEGRATED VERSION
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
 * REGISTER DOMAIN ENGINE
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
 * Decision Bridges translate domain output.
 *
 * Captain AI Lena remains final decision authority.
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

            action:null,

            decisionBridge:null,

            goldenRuleAuthority:false,

            status:

                "NO_ENGINE"


        };

    }






    /*
    ========================================================
    EXECUTE DOMAIN RULE ENGINE
    ========================================================
    */


    const result =

        engine(

            {

                ...state,

                domain,

                scenario

            }

        );








    /*
    ========================================================
    DOMAIN DECISION BRIDGE ROUTING
    ========================================================


    FIN:

    FIN RULE ENGINE
          ↓
    FIN DECISION BRIDGE
          ↓
    CAPTAIN AI LENA


    BHR:

    BHR RULE ENGINE
          ↓
    BHR DECISION BRIDGE
          ↓
    CAPTAIN AI LENA


    ========================================================
    */


    let decisionBridge = null;





    if(

        domain === "FIN"

    ){


        decisionBridge =

            buildFINDecisionBridge(

                result

            );


    }






    if(

        domain === "BHR"

    ){


        decisionBridge =

            buildBHRDecisionBridge(

                result

            );


    }







    /*
    ========================================================
    CAPTAIN AI LENA DECISION EXTRACTION
    ========================================================
    */


    const decision =


        decisionBridge

            ?.domainDecision

            ?.decision


        ??

        result.decision


        ??

        result.domainDecision?.decision


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








    const authority =


        decisionBridge
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








    /*
    ========================================================
    FIN SCENARIO REGISTRY
    ========================================================
    */


    const FIN_SCENARIOS = [


        "FX_STRESS",

        "FIN_STRESS",

        "BANKING_STRESS",

        "LIQUIDITY_CRISIS",

        "CREDIT_STRESS",

        "SOVEREIGN_DEBT"


    ];








    /*
    ========================================================
    BHR SCENARIO REGISTRY
    ========================================================
    */


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








    /*
    ========================================================
    DOMAIN IDENTIFICATION
    ========================================================
    */


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








    /*
    ========================================================
    NO ACTIVE DOMAIN
    ========================================================
    */


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








    /*
    ========================================================
    EXECUTE DOMAIN BRIDGE
    ========================================================
    */


    return {


        integration:

            "