/**
 * ============================================================
 * SPD v13.1 — DOMAIN DECISION BRIDGE
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 *
 * Convert validated domain intelligence,
 * domain severity, and priority context
 * into unified decision structure.
 *
 *
 * Supports:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 * FUTURE DOMAINS
 *
 *
 * Architecture:
 *
 * DOMAIN RULE ENGINE
 *        ↓
 * DOMAIN PRIORITY CONTEXT FUSION
 *        ↓
 * DOMAIN DECISION BRIDGE
 *        ↓
 * GOLDEN RULE ENGINE
 *        ↓
 * CAPTAIN AI LENA DECISION CORE
 *        ↓
 * SOLUTION DECISION BRIDGE
 *        ↓
 * MEMORY CORE
 *        ↓
 * AUDIT RECORD
 *
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
 * BUILD DOMAIN DECISION OBJECT
 * ============================================================
 */


export function buildDomainDecisionBridge(

    domainResult,

    domainPriorityContext = null

){


    if(!domainResult)
    {

        return {

            status:

            "INVALID_DOMAIN_RESULT",


            goldenRuleAuthority:

            true,


            deterministic:

            true,


            machineLearning:

            false,


            randomness:

            false


        };

    }





    const domain =

        domainResult.domain

        ||

        "CORE";





    const scenario =

        domainResult.scenario

        ||

        "UNKNOWN";





    const risk =

        domainResult.evaluation?.risk

        ||

        domainResult.assessment?.risk

        ||

        domainResult.risk

        ||

        "UNKNOWN";





    const decision =

        domainResult.evaluation?.decision

        ||

        domainResult.decision

        ||

        "MONITOR";





    const actions =

        domainResult.domainActions

        ||

        domainResult.evaluation?.recommendedActions

        ||

        domainResult.action

        ||

        domainResult.actions

        ||

        [];





    const solution =

        domainResult.domainSolution

        ||

        null;





    const priority =

        domainPriorityContext?.priority

        ||

        "SYSTEM_MONITORING";





    const recommendedFocus =

        domainPriorityContext?.recommendedFocus

        ||

        "NORMAL OPERATIONS";





    const finalRisk =

        domainPriorityContext?.domainSeverity?.severity

        ||

        risk;






    return {


        domain,


        scenario,


        risk,


        finalRisk,


        decision,


        actions,


        solution,


        domainPriorityContext,


        priority,


        recommendedFocus,


        domainStatus:

            domainResult.status

            ||

            "PROCESSED",



        decisionAuthority:

            "DOMAIN_RULE_ENGINE",



        goldenRuleAuthority:

            true,



        captainAILenaAuthority:

            true,



        deterministic:

            true,



        machineLearning:

            false,



        randomness:

            false,



        nextStage:

            "GOLDEN_RULE_ENGINE",



        timestamp:

            new Date()

            .toISOString()


    };


}
