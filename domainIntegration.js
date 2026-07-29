/**
 * ============================================================
 * SPD V13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 *
 * Single gateway between:
 *
 * COCKPIT / SCENARIO BUTTONS
 *          ↓
 * DOMAIN INTEGRATION
 *          ↓
 * DOMAIN RULE ENGINES
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 *
 * ACTIVE DOMAINS:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 *
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/* ============================================================
   DOMAIN ENGINE IMPORTS
   ============================================================
 */


import {
    finRuleEngine
} from "./FIN/fin-rule-engine.js";


import {
    bhrRuleEngine
} from "./BHR/bhr-rule-engine.js";



/* ============================================================
   DOMAIN REGISTRY
   ============================================================
 */


export const DOMAIN_REGISTRY = {


    FIN: {

        name:
            "Financial Resilience",

        status:
            "ACTIVE",

        engine:
            "FIN_RULE_ENGINE"

    },


    BHR: {

        name:
            "Business & Human Rights Resilience",

        status:
            "ACTIVE",

        engine:
            "BHR_RULE_ENGINE"

    },


    FX: {

        name:
            "Foreign Exchange",

        status:
            "PLANNED",

        engine:
            "FX_RULE_ENGINE"

    },


    DC: {

        name:
            "Data Centre",

        status:
            "PLANNED",

        engine:
            "DC_RULE_ENGINE"

    },


    CYB: {

        name:
            "Cyber Resilience",

        status:
            "PLANNED",

        engine:
            "CYB_RULE_ENGINE"

    },


    INF: {

        name:
            "Infrastructure",

        status:
            "PLANNED",

        engine:
            "INF_RULE_ENGINE"

    },


    ENG: {

        name:
            "Energy",

        status:
            "PLANNED",

        engine:
            "ENG_RULE_ENGINE"

    },


    OPS: {

        name:
            "Operations",

        status:
            "PLANNED",

        engine:
            "OPS_RULE_ENGINE"

    }


};



/* ============================================================
   DOMAIN ENGINE REGISTRY
   ============================================================
 */


const DOMAIN_ENGINES = {


    FIN:

        finRuleEngine,


    BHR:

        bhrRuleEngine


};



/* ============================================================
   REGISTER DOMAIN ENGINE
   ============================================================
 */


export function registerDomainEngine(

    domain,

    engine

) {


    const id = String(

        domain || ""

    )

    .trim()

    .toUpperCase();



    if (!id) {

        throw new Error(
            "DOMAIN ID REQUIRED"
        );

    }



    if (
        typeof engine !== "function"
    ) {

        throw new Error(
            "DOMAIN ENGINE MUST BE FUNCTION"
        );

    }



    DOMAIN_ENGINES[id] =
        engine;



    return {

        domain:
            id,

        status:
            "ENGINE_REGISTERED"

    };

}



/* ============================================================
   GET DOMAIN STATUS
   ============================================================
 */


export function getDomainStatus(

    domain

) {


    const id = String(

        domain || ""

    )

    .trim()

    .toUpperCase();



    return {


        domain:

            id,


        name:

            DOMAIN_REGISTRY[id]?.name
            ||
            "UNKNOWN DOMAIN",


        engineRegistered:

            Boolean(
                DOMAIN_ENGINES[id]
            ),


        status:

            DOMAIN_ENGINES[id]

            ?

            "ACTIVE"

            :

            "UNAVAILABLE"


    };


}



/* ============================================================
   EXECUTE DOMAIN RULE
   ============================================================
 */


export function executeDomainRule(

    domain,

    input = {}

) {


    const id = String(

        domain || ""

    )

    .trim()

    .toUpperCase();



    const engine =

        DOMAIN_ENGINES[id];



    const config =

        DOMAIN_REGISTRY[id];



    if (!config) {


        return {

            status:
                "UNKNOWN_DOMAIN",

            decision:
                "NO DOMAIN RULE AVAILABLE"

        };


    }



    if (!engine) {


        return {

            domain:
                id,

            status:
                "ENGINE_NOT_REGISTERED",

            decision:
                "MONITOR SYSTEM"

        };


    }



    const observedInput = {


        ...input,


        domain:

            id,


        domainName:

            config.name,


        timestamp:

            new Date()
            .toISOString()


    };



    try {



        const verifiedInput =

            verifyDomainInput(
                observedInput
            );



        const result =

            engine(
                verifiedInput
            );



        return {


            domain:

                id,


            domainName:

                config.name,


            engine:

                config.engine,


            pipeline:

            [

                "OBSERVE