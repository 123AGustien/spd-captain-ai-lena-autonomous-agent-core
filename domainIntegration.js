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
 * DOMAIN IMPACT BRIDGE
 *          ↓
 * HUMAN IMPACT ASSESSMENT
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *          ↓
 * MEMORY CORE
 *          ↓
 * AUDIT REGISTRY
 *          ↓
 * SECURITY HASH
 *          ↓
 * AUDIT CLOSURE
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

    runBHRSPDBridge

} from "./BHR/bhr-spd-stress-bridge.js";


import {

    getBHRScenario

} from "./BHR/bhr-scenario-registry.js";


import {

    runHumanImpactAssessment

} from "./BHR/human-impact-assessment.js";


import {

    registerBHRAudit

} from "./BHR/bhr-audit-registry.js";


import {

    createAuditClosure

} from "./core/validation/auditClosure.js";


import {

    generateAuditHash

} from "./core/security/auditHash.js";



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
            "BHR_SPD_STRESS_BRIDGE"

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

        function(input){


            const bhrResult =

                runBHRSPDBridge(

                    input.scenario,

                    input.state

                );



            const humanImpact =

                runHumanImpactAssessment(

                    input

                );



            registerBHRAudit({

                scenario:

                    input.scenario,


                intensity:

                    input.intensity,


                assessment:

                    humanImpact

            });



            return {


                ...bhrResult,


                humanImpact


            };


        }


};
 
/* ============================================================
   REGISTER DOMAIN ENGINE
   ============================================================
 */

export function registerDomainEngine(

    domain,

    engine

){


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    if(!id){

        throw new Error(

            "DOMAIN INTEGRATION ERROR: DOMAIN ID REQUIRED"

        );

    }



    if(typeof engine !== "function"){

        throw new Error(

            "DOMAIN INTEGRATION ERROR: ENGINE MUST BE FUNCTION"

        );

    }



    DOMAIN_ENGINES[id] = engine;



    return {

        domain:id,

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

){


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    const config =

        DOMAIN_REGISTRY[id];



    const engine =

        DOMAIN_ENGINES[id];



    return {


        domain:id,


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
   DOMAIN IMPACT BRIDGE
   ============================================================
 */

function createDomainImpact(

    domain,

    assessment,

    config

){


    return {


        domain,


        source:

            config.engine,



        riskScore:

            Number(

                assessment?.riskScore ??

                assessment?.stressContribution?.stress ??

                0

            ),



        assessment:

            assessment?.assessment ??

            assessment?.bhrAssessment?.assessment ??

            "UNKNOWN",



        applied:

            true


    };


}



/* ============================================================
   EXECUTE DOMAIN RULE
   ============================================================
 */

export function executeDomainRule(

    domain,

    input = {}

){


    const id =

        String(domain || "")

        .trim()

        .toUpperCase();



    const config =

        DOMAIN_REGISTRY[id];



    const engine =

        DOMAIN_ENGINES[id];



    if(!config){

        return {


            domain:id,

            status:

                "UNKNOWN_DOMAIN",


            decision:

                "NO DOMAIN RULE AVAILABLE",


            action:

                "MONITOR SYSTEM"


        };

    }



    if(!engine){

        return {


            domain:id,

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


        domain:id,


        domainName:

            config.name,


        timestamp:

            new Date()

            .toISOString()


    };



    try{


        const verifiedInput =

            verifyDomainInput(

                observedInput

            );



        const assessment =

            engine(

                verifiedInput

            );



        const domainImpact =

            createDomainImpact(

                id,

                assessment,

                config

            );



        const auditData = {


            domain:id,


            scenario:

                verifiedInput.scenario,


            result:

                assessment,


            timestamp:

                new Date()

                .toISOString()


        };



        return {


            domain:id,


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

            {

                ...assessment,

                domainImpact

            },



            scenarioRegistry:

                id === "BHR"

                ?

                (

                    getBHRScenario(

                        verifiedInput.scenario

                    )

                    ??

                    null

                )

                :

                null,



            trace:

            {

                domain:id,

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


                deterministic:true

            },



            audit:

            {

                status:

                    "RECORDED",


                domain:id,


                timestamp:

                    auditData.timestamp,


                hash:

                    generateAuditHash(

                        auditData

                    ),



                closure:

                    createAuditClosure({

                        domain:id,

                        status:"COMPLETE"

                    })

            },



            status:

                "EXECUTED"


        };


    }

    catch(error){


        return {


            domain:id,


            status:

                "DOMAIN_ENGINE_ERROR",


            error:

                error.message,


            decision:

                "NO DECISION — ENGINE ERROR",


            action:

                "HOLD AND MONITOR"


        };


    }


}



/* ============================================================
   VERIFY DOMAIN INPUT
   ============================================================
 */

function verifyDomainInput(

    input

){


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

            input.scenario