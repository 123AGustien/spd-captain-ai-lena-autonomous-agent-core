/**
 * ============================================================
 * SPD v13.1 — DOMAIN DECISION BRIDGE
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Hardened FIN + BHR Compatible Version
 *
 * File:
 * domainDecisionBridge.js
 *
 *
 * PURPOSE:
 *
 * Convert validated domain intelligence,
 * severity and priority context into a
 * unified decision structure.
 *
 *
 * SUPPORTED:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 * FUTURE DOMAINS
 *
 *
 * ARCHITECTURE:
 *
 * DOMAIN RULE ENGINE
 *          ↓
 * DOMAIN PRIORITY CONTEXT
 *          ↓
 * DOMAIN DECISION BRIDGE
 *          ↓
 * GOLDEN RULE ENGINE
 *          ↓
 * CAPTAIN AI LENA DECISION CORE
 *          ↓
 * MEMORY CORE
 *          ↓
 * AUDIT RECORD
 *
 *
 * AUTHORITY:
 *
 * Golden Rule Engine:
 * Final validation authority
 *
 * Captain AI Lena:
 * Final decision authority
 *
 *
 * Properties:
 *
 * Deterministic
 * No randomness
 * No machine learning
 *
 * ============================================================
 */



/**
 * ============================================================
 * BUILD DOMAIN DECISION BRIDGE
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

true



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

domainResult.decision?.decision

||

domainResult.decision

||

"MONITOR";






const actions =


domainResult.domainActions

||

domainResult.evaluation?.recommendedActions

||

domainResult.action?.actions

||

domainResult.actions

||

[];






const solution =


domainResult.domainSolution

||

domainResult.solution

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
