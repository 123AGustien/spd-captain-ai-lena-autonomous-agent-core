/**
 * ============================================================
 * SPD V13.1 — FIN DOMAIN RULE ENGINE
 * ============================================================
 *
 * File:
 * FIN/fin-rule-engine.js
 *
 * Domain:
 * FIN — Financial Resilience
 *
 * Purpose:
 *
 * Deterministic financial-domain assessment layer.
 *
 * FLOW:
 *
 * COCKPIT
 *    ↓
 * domainIntegration.js
 *    ↓
 * FIN RULE ENGINE
 *    ↓
 * FIN ASSESSMENT
 *    ↓
 * DOMAIN DECISION BRIDGE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE ENGINE
 *    ↓
 * ACTION
 *    ↓
 * MEMORY / AUDIT
 *
 *
 * FIN ENGINE:
 *
 * Provides verified advisory intelligence.
 *
 * Captain AI Lena:
 *
 * Final decision authority.
 *
 * Golden Rule Engine:
 *
 * Final validation authority.
 *
 * Deterministic.
 * No machine learning.
 * No randomness.
 *
 * ============================================================
 */



/**
 * ============================================================
 * FIN SCENARIO DEFINITIONS
 * ============================================================
 */


const FIN_SCENARIOS = {


FIN_STRESS: {


id:
"FIN_STRESS",


category:
"FINANCIAL_SYSTEM_STRESS",


description:
"General financial system stress affecting interconnected financial conditions."

},



BANKING_STRESS: {


id:
"BANKING_STRESS",


category:
"BANKING_SYSTEM_STABILITY",


description:
"Stress affecting banking-sector stability and systemic contagion."

},



LIQUIDITY_CRISIS: {


id:
"LIQUIDITY_CRISIS",


category:
"LIQUIDITY_RESILIENCE",


description:
"Reduced liquidity availability and increased funding pressure."

},



CREDIT_STRESS: {


id:
"CREDIT_STRESS",


category:
"CREDIT_RESILIENCE",


description:
"Deterioration in credit conditions and default pressure."

},



SOVEREIGN_DEBT: {


id:
"SOVEREIGN_DEBT",


category:
"SOVEREIGN_FINANCIAL_RESILIENCE",


description:
"Sovereign debt stress and financial transmission risk."

}


};







/**
 * ============================================================
 * MAIN FIN RULE ENGINE
 * ============================================================
 */


export function finRuleEngine(

input = {}

){



const state =

normalizeFINState(

input

);





const scenario =


FIN_SCENARIOS[

state.scenario

]

||


FIN_SCENARIOS.FIN_STRESS;





const assessment =


assessFinancialRisk(

state,

scenario

);





const decision =


determineFINDecision(

assessment

);





const action =


determineFINAction(

decision

);







return {


domain:

"FIN",



engine:

"SPD V13.1 FINANCIAL RESILIENCE RULE ENGINE",



scenario:

scenario.id,



category:

scenario.category,



intensity:

state.intensity,



intensityFactor:

state.intensityFactor,



description:

scenario.description,



input:

state,



assessment,



decision,



action,



/**
 * ========================================================
 * INTEGRATION OUTPUT
 * ========================================================
 */


risk:

assessment.risk,



recommendation:

decision.decision,



goldenRuleAuthority:

true,



authority:

"CAPTAIN AI LENA / GOLDEN RULE ENGINE",



status:

"COMPLETE"



};


}
 
/**
 * ============================================================
 * INPUT NORMALIZATION
 * ============================================================
 *
 * Supports:
 *
 * Direct input:
 *
 * {
 *   scenario:"BANKING_STRESS",
 *   intensity:80,
 *   fx:50,
 *   energy:25,
 *   cyb:40,
 *   inf:50,
 *   dc:40
 * }
 *
 *
 * Nested input:
 *
 * {
 *   scenario:"BANKING_STRESS",
 *   intensity:80,
 *   state:{
 *      fx:50,
 *      energy:25,
 *      cyb:40,
 *      inf:50,
 *      dc:40
 *   }
 * }
 *
 * ============================================================
 */


function normalizeFINState(

input

){


const intensity =


clamp(

Number(

input?.intensity ?? 50

),

0,

100

);





const sourceState =


input?.state

??

input;







return {


scenario:


normalizeScenario(

input?.scenario

??

input?.event

??

"FIN_STRESS"

),



intensity,



intensityFactor:

intensity / 100,



fx:

normalizeMetric(

sourceState?.fx

),



energy:

normalizeMetric(

sourceState?.energy,

50

),



cyb:

normalizeMetric(

sourceState?.cyb

),



inf:

normalizeMetric(

sourceState?.inf

),



dc:

normalizeMetric(

sourceState?.dc

),



mode:

input?.mode

??

"AUTONOMOUS",



time:

input?.time

??

new Date().toISOString()



};


}









/**
 * ============================================================
 * SCENARIO NORMALIZATION
 * ============================================================
 */


function normalizeScenario(

scenario

){


const value =


String(

scenario ??

"FIN_STRESS"

)

.trim()

.toUpperCase();





const aliases = {


FIN_STRESS:

"FIN_STRESS",



FINANCIAL_STRESS:

"FIN_STRESS",



BANKING_STRESS:

"BANKING_STRESS",



BANK_STRESS:

"BANKING_STRESS",



LIQUIDITY_CRISIS:

"LIQUIDITY_CRISIS",



LIQUIDITY_STRESS:

"LIQUIDITY_CRISIS",



CREDIT_STRESS:

"CREDIT_STRESS",



CREDIT_CRISIS:

"CREDIT_STRESS",



SOVEREIGN_DEBT:

"SOVEREIGN_DEBT",



DEBT_STRESS:

"SOVEREIGN_DEBT"



};





return (

aliases[value]

??

"FIN_STRESS"

);



}









/**
 * ============================================================
 * FINANCIAL RISK ASSESSMENT
 * ============================================================
 *
 * FIN domain calculates financial stress only.
 *
 * It does not replace:
 *
 * SPD Core Stress Engine
 * Golden Rule Engine
 *
 * ============================================================
 */


function assessFinancialRisk(

state,

/**
 * ============================================================
 * FINANCIAL RISK CLASSIFICATION
 * ============================================================
 */


function classifyFINRisk(

financialStress

){


if(

financialStress < 30

){

return "LOW";

}



if(

financialStress < 50

){

return "MEDIUM";

}



return "HIGH";


}









/**
 * ============================================================
 * FIN DECISION LAYER
 * ============================================================
 *
 * Domain recommendation only.
 *
 * Captain AI Lena remains final authority.
 *
 * ============================================================
 */


function determineFINDecision(

assessment

){



switch(

assessment.risk

){



case "HIGH":


return {


mode:

"FINANCIAL_STABILIZATION",



decision:

"ACTIVATE FINANCIAL STABILIZATION MODE"



};







case "MEDIUM":


return {


mode:

"FINANCIAL_PREVENTION",



decision:

"ACTIVATE PREVENTIVE FINANCIAL RESILIENCE MODE"



};







case "LOW":

default:


return {


mode:

"FINANCIAL_MONITORING",



decision:

"CONTINUE FINANCIAL RESILIENCE MONITORING"



};


}


}









/**
 * ============================================================
 * FIN ACTION LAYER
 * ============================================================
 */


function determineFINAction(

decision

){



switch(

decision.mode

){



case "FINANCIAL_STABILIZATION":


return {


command:

"STABILIZE FINANCIAL SYSTEM",



actions:[


"CONFIRM FINANCIAL SYSTEM STATE",


"ASSESS BANKING AND LIQUIDITY CONDITIONS",


"ACTIVATE FINANCIAL STABILIZATION MEASURES",


"MONITOR SYSTEMIC CONTAGION RISK"


],



status:

"ACTIVE"


};









case "FINANCIAL_PREVENTION":


return {


command:

"ACTIVATE PREVENTIVE FINANCIAL RESILIENCE",



actions:[


"CONFIRM FINANCIAL SYSTEM STATE",


"MONITOR BANKING AND CREDIT CONDITIONS",


"STRENGTHEN LIQUIDITY RESERVES",


"MONITOR SYSTEM RESPONSE"


],



status:

"ACTIVE"


};









case "FINANCIAL_MONITORING":

default:


return {


command:

"MONITOR FINANCIAL SYSTEM",



actions:[


"CONFIRM FINANCIAL SYSTEM STATE",


"CONTINUE FINANCIAL RESILIENCE MONITORING",


"MONITOR SYSTEM RESPONSE"


],



status:

"ACTIVE"


};


}


}









/**
 * ============================================================
 * NUMERIC NORMALIZATION
 * ============================================================
 */


function normalizeMetric(

value,

defaultValue = 0

){


const numeric =

Number(value);




if(

!Number.isFinite(numeric)

){

return defaultValue;

}



return clamp(

numeric,

0,

100

);


}









/**
 * ============================================================
 * CLAMP
 * ============================================================
 */


function clamp(

value,

minimum,

maximum

){


return Math.max(

minimum,

Math.min(

maximum,

value

)

);


}









/**
 * ============================================================
 * FIN ENGINE TEST
 * ============================================================
 */


export function testFINRuleEngine(){



const testInput = {


scenario:

"FIN_STRESS",



intensity:

100,



state:{


fx: