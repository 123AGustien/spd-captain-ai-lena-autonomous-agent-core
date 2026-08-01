/**
 * ============================================================
 * SPD v13.1 — DOMAIN PRIORITY CONTEXT FUSION
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 *
 * Translate domain intelligence into
 * priority-aware decision context.
 *
 * Domain engines advise.
 *
 * Golden Rule Engine remains authoritative.
 *
 * Captain AI Lena remains final authority.
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


export function evaluateDomainSeverity(

    domainResult = {}

){


const stress =

Number(

    domainResult.domainStress

    ??

    domainResult.financialStress

    ??

    0

);



let severity = "LOW";



if(stress >= 70)

{

    severity = "HIGH";

}

else if(stress >= 40)

{

    severity = "MEDIUM";

}



return {


    domain:

        domainResult.domain
        ??
        "UNKNOWN",


    scenario:

        domainResult.scenario
        ??
        "UNKNOWN",


    severity,


    stress,


    status:

        "DOMAIN SEVERITY ASSESSED"


};


}







/**
 * ============================================================
 * DOMAIN PRIORITY FUSION
 * ============================================================
 */


export function buildDomainPriorityContext(

    domainResult = {},

    systemCondition = {}

){



const severity =

evaluateDomainSeverity(

    domainResult

);





let priority = "SYSTEM_MONITORING";

let recommendedFocus = "NORMAL OPERATIONS";





switch(domainResult.domain)

{


case "BHR":


    if(severity.severity !== "LOW")

    {

        priority =
            "HUMAN_RIGHTS_PROTECTION";


        recommendedFocus =
            "INVESTIGATION AND REMEDIATION";

    }


break;





case "FIN":


    if(severity.severity !== "LOW")

    {

        priority =
            "FINANCIAL_RESILIENCE";


        recommendedFocus =
            "LIQUIDITY AND CAPITAL PROTECTION";

    }


break;





case "CYB":


    priority =
        "CYBER_PROTECTION";


break;





case "INF":


    priority =
        "INFRASTRUCTURE_STABILITY";


break;





default:


    priority =
        "GENERAL_RESILIENCE";


}







return {


    domainSeverity:

        severity,


    systemCondition,


    priority,


    recommendedFocus,



    advisoryOnly:

        true,



    goldenRuleAuthority:

        true,



    captainAILenaAuthority:

        true,



    deterministic:

        true



};



}







export default {


    evaluateDomainSeverity,

    buildDomainPriorityContext


};