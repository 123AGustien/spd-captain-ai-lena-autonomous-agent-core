/**
 * ============================================================
 * SPD V13.1 — DOMAIN INTEGRATION LAYER
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * COCKPIT / SCENARIO BUTTONS
 *          ↓
 * DOMAIN RULE ENGINES
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *          ↓
 * MEMORY CORE
 *          ↓
 * AUDIT RECORD
 *
 * Active Domains:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 *
 * Golden Rule:
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


import {

    getBHRScenario

} from "./BHR/bhr-scenario-registry.js";



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
            "Business & Human Rights",

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

    },


    SC: {

        name:
            "Scenario Control",

        status:
            "ACTIVE",

        engine:
            "SCENARIO_ENGINE"

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

        function(input) {


            const scenarioConfig =

                getBHRScenario(

                    input.scenario

                );



            return bhrRuleEngine({

                ...input,

                scenarioConfig

            });


        }


};



/* ============================================================
   REGISTER DOMAIN ENGINE
   ============================================================
 */

export function registerDomainEngine(

    domain,

    engine

) {


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    if (!id) {

        throw new Error(

            "DOMAIN INTEGRATION ERROR: DOMAIN ID REQUIRED"

        );

    }



    if (

        typeof engine !== "function"

    ) {

        throw new Error(

            "DOMAIN INTEGRATION ERROR: ENGINE MUST BE FUNCTION"

        );

    }



    DOMAIN_ENGINES[id] = engine;



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


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    const config =

        DOMAIN_REGISTRY[id];



    const engine =

        DOMAIN_ENGINES[id];



    return {


        domain:

            id,


        name:

            config?.name ??

            "UNKNOWN DOMAIN",



        configured:

            Boolean(config),



        engineRegistered:

            Boolean(engine),



        status:

            engine

            ?

            "ACTIVE"

            :

            (

                config?.status ??

                "UNAVAILABLE"

            )


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


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    const config =

        DOMAIN_REGISTRY[id];



    const engine =

        DOMAIN_ENGINES[id];



    if (!config) {


        return {

            domain:

                id,

            status:

                "UNKNOWN_DOMAIN",

            decision:

                "NO DOMAIN RULE AVAILABLE",

            action:

                "MONITOR SYSTEM"

        };


    }



    if (!engine) {


        return {

            domain:

                id,

            status:

                "ENGINE_NOT_REGISTERED",

            decision:

                "DOMAIN ENGINE NOT AVAILABLE",

            action:

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



        const assessment =

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

                "OBSERVE",

                "VERIFY",

                "ASSESS",

                "DECIDE",

                "ACT",

                "UPDATE"

            ],



            input:

                verifiedInput,



            result:

                assessment,



            scenarioRegistry:

                id === "BHR"

                ?

                (

                    getBHRScenario(

                        verifiedInput.scenario

                    )

                    ??

                    {

                        domain:

                            "BHR",

                        scenario:

                            "UNKNOWN",

                        rule:

                            null

                    }

                )

                :

                null,



            trace:

            {

                domain:

                    id,


                engine:

                    config.engine,


                goldenRule:

                [

                    "OBSERVE",

                    "VERIFY",

                    "ASSESS",

                    "DECIDE",

                    "ACT",

                    "UPDATE"

                ],


                deterministic:

                    true

            },



            audit:

            {

                status:

                    "RECORDED",

                domain:

                    id,

                timestamp:

                    new Date()

                    .toISOString()

            },



            status:

                "EXECUTED"


        };


    }


    catch(error) {


        return {


            domain:

                id,


            status:

                "DOMAIN_ENGINE_ERROR",


            error:

                error.message,


            decision:

                "NO DECISION — ENGINE ERROR",


            action:

                "HOLD AND MONITOR",


            timestamp:

                new Date()

                .toISOString()


        };


    }


}



/* ============================================================
   VERIFY DOMAIN INPUT
   ============================================================
 */

function verifyDomainInput(

    input

) {


    const intensity =

        Math.max(

            0,

            Math.min(

                100,

                Number(input.intensity) || 0

            )

        );



    return {


        ...input,


        intensity,


        intensityFactor:

            intensity / 100,



        scenario:

            input.scenario ??

            input.event ??

            "DEFAULT",



        event:

            input.event ??

            input.scenario ??

            "DEFAULT",



        state:

            input.state ?? {},



        mode:

            input.mode ??

            "AUTONOMOUS"


    };


}



/* ============================================================
   GET ALL DOMAIN STATUS
   ============================================================
 */

export function getAllDomainStatus() {


    return Object.keys(

        DOMAIN_REGISTRY

    )

    .map(

        domain =>

            getDomainStatus(domain)

    );


}



/* ============================================================
   CONSTANTS
   ============================================================
 */

export const DOMAIN_IDS =

[

    "FIN",

    "BHR",

    "FX",

    "DC",

    "CYB",

    "INF",

    "ENG",

    "OPS",

    "SC"

];





export const DOMAIN_INTEGRATION_STATUS = {


    engine:

        "SPD V13.1 DOMAIN INTEGRATION LAYER",



    activeDomains:

    [

        "FIN",

        "BHR"

    ],



    scenarioRegistry:

    {

        FIN:

            "CONNECTED",


        BHR:

            "CONNECTED"

    },



    pipeline:

    [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "ACT",

        "UPDATE"

    ],



    deterministic:

        true,



    machineLearning:

        false,



    randomness:

        false


};



/* ============================================================
   DEFAULT EXPORT
   ============================================================
 */

export default {


    registerDomainEngine,


    executeDomainRule,


    getDomainStatus,


    getAllDomainStatus,


    DOMAIN_REGISTRY,


    DOMAIN_IDS,


    DOMAIN_INTEGRATION_STATUS


};