/**
 * ============================================================
 * SPD v13.1 — DOMAIN INTEGRATION LAYER
 *
 * Purpose:
 * Gateway between:
 *
 * COCKPIT
 *      ↓
 * DOMAIN SCENARIO
 *      ↓
 * DOMAIN RULE ENGINE
 *      ↓
 * CAPTAIN AI LENA DECISION CORE
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
 * DOMAIN REGISTRY
 */

export const DOMAIN_REGISTRY = {


    FIN: {

        name:"Financial Resilience",

        active:true

    },


    BHR: {

        name:"Business & Human Rights",

        active:true

    },


    DC: {

        name:"Data Centre",

        active:false

    },


    CYB: {

        name:"Cyber Security",

        active:false

    },


    INF: {

        name:"Infrastructure",

        active:false

    }


};






/**
 * DOMAIN ENGINE MAP
 */

export const DOMAIN_ENGINES = {


    FIN:

        finRuleEngine,


    BHR:

        bhrRuleEngine


};






/**
 * VERIFY DOMAIN INPUT
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


return {


    valid:true,

    domain,

    scenario


};


}






/**
 * REGISTER NEW DOMAIN ENGINE
 */

export function registerDomainEngine(

    domain,

    engine

){


DOMAIN_ENGINES[domain] = engine;


DOMAIN_REGISTRY[domain] = {


    name:domain,

    active:true


};


}






/**
 * GET DOMAIN STATUS
 */

export function getDomainStatus(

    domain

){


return DOMAIN_REGISTRY[domain]

||


{

    active:false,

    name:"UNKNOWN"


};


}






/**
 * EXECUTE DOMAIN RULE
 *
 * Creates verified recommendation
 * for Captain AI Lena.
 *
 */

export function executeDomainRule(

    domain,

    scenario,

    state

){



const validation =

    verifyDomainInput(

        domain,

        scenario

    );




const engine =

    DOMAIN_ENGINES[domain];




if(!engine)

{


return {


    domain,

    scenario,

    decision:null,

    goldenRuleAuthority:false,

    status:"NO_ENGINE"


};


}





const result =

    engine(

        {

            ...state,

            scenario

        }

    );






return {


    domain,


    scenario,


    decision:

        result.decision,


    recommendation:

        result.recommendation || null,


    risk:

        result.risk || null,


    goldenRuleAuthority:

        true,


    status:

        "VERIFIED DOMAIN DECISION"


};



}






/**
 * DOMAIN BRIDGE TO CAPTAIN AI LENA
 */

export function createDomainDecisionBridge(

    domain,

    scenario,

    state

){



return executeDomainRule(

    domain,

    scenario,

    state

);


}