/**
 * ============================================================
 * SPD v13.1 — FIN VALIDATION ENGINE
 * ============================================================
 *
 * File:
 * FIN/fin-validation-engine.js
 *
 * Domain:
 * FIN — Financial Resilience
 *
 * Purpose:
 *
 * Independent validation layer for FIN domain outputs.
 *
 * FLOW:
 *
 * COCKPIT
 *    ↓
 * FIN RULE ENGINE
 *    ↓
 * FIN VALIDATION ENGINE
 *    ↓
 * DOMAIN RESULT
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE ENGINE
 *
 *
 * Validation:
 *
 * INPUT
 * OUTPUT
 * RISK
 * DECISION
 * ACTION
 *
 *
 * Deterministic.
 * No machine learning.
 * No randomness.
 *
 * ============================================================
 */


import {

    finRuleEngine

} from "./fin-rule-engine.js";





/**
 * ============================================================
 * VALIDATE FIN INPUT
 * ============================================================
 */


export function validateFINInput(

state = {}

){


const requiredFields = [


"scenario",

"intensity"


];





const missing =


requiredFields.filter(

field =>

state[field] === undefined

);







return {


status:

missing.length === 0

?

"PASS"

:

"FAIL",



valid:

missing.length === 0,



missingFields:

missing,



timestamp:

new Date().toISOString()



};


}






/**
 * ============================================================
 * VALIDATE FIN OUTPUT
 * ============================================================
 */


export function validateFINOutput(

result = {}

){



const checks = {


domain:

result.domain === "FIN",



status:

result.status === "COMPLETE",



risk:

Boolean(

result.risk

),



decision:

Boolean(

result.decision?.decision

),



action:

Boolean(

result.action

)


};





const passed =


Object.values(checks)

.every(

value => value === true

);







return {


status:

passed

?

"PASS"

:

"FAIL",



valid:

passed,



checks,



timestamp:

new Date().toISOString()



};


}

/**
 * ============================================================
 * VALIDATE FIN RISK CLASSIFICATION
 * ============================================================
 *
 * Ensures:
 *
 * LOW
 * MEDIUM
 * HIGH
 *
 * matches calculated financial stress.
 *
 * ============================================================
 */


export function validateFINRisk(

assessment = {}

){


const stress =


Number(

assessment.financialStress

);





let expectedRisk;







if(

stress < 30

){

expectedRisk = "LOW";

}

else if(

stress < 50

){

expectedRisk = "MEDIUM";

}

else

{

expectedRisk = "HIGH";

}







const valid =


expectedRisk === assessment.risk;







return {


status:

valid

?

"PASS"

:

"FAIL",



expectedRisk,



actualRisk:

assessment.risk,



financialStress:

stress,



valid,



timestamp:

new Date().toISOString()



};


}









/**
 * ============================================================
 * VALIDATE FIN DECISION
 * ============================================================
 *
 * Checks that FIN recommendation matches risk.
 *
 * ============================================================
 */


export function validateFINDecision(

result = {}

){


const risk =


result?.assessment?.risk;





const decision =


result?.decision?.decision;







let valid = false;









switch(risk){



case "HIGH":



valid =


decision ===

"ACTIVATE FINANCIAL STABILIZATION MODE";



break;







case "MEDIUM":



valid =


decision ===

"ACTIVATE PREVENTIVE FINANCIAL RESILIENCE MODE";



break;







case "LOW":



valid =


decision ===

"CONTINUE FINANCIAL RESILIENCE MONITORING";



break;



default:



valid = false;


}







return {


status:

valid

?

"PASS"

:

"FAIL",



risk,



decision,



valid,



timestamp:

new Date().toISOString()



};


}









/**
 * ============================================================
 * FIN ENGINE FULL VALIDATION
 * ============================================================
 *
 * Executes:
 *
 * INPUT VALIDATION
 * ENGINE EXECUTION
 * OUTPUT VALIDATION
 * RISK VALIDATION
 * DECISION VALIDATION
 *
 * ============================================================
 */


export function validateFINEngine(

state = {}

){



const inputValidation =


validateFINInput(

state

);





if(

!inputValidation.valid

){


return {


status:

"FAIL",



stage:

"INPUT_VALIDATION",



inputValidation



};


}







const result =


finRuleEngine(

state

);







const outputValidation =


validateFINOutput(

result

);







const riskValidation =


validateFINRisk(

result.assessment

);







const decisionValidation =


validateFINDecision(

result

);







const overall =


[

outputValidation,

riskValidation,

decisionValidation

]

.every(

test =>

test.valid === true

);







return {


engine:

"SPD v13.1 FIN VALIDATION ENGINE",



status:

overall

?

"PASS"

:

"FAIL",



inputValidation,



outputValidation,



riskValidation,



decisionValidation,

/**
 * ============================================================
 * FIN VALIDATION SELF-TEST
 * ============================================================
 *
 * Independent FIN domain verification.
 *
 * Does not replace:
 *
 * SPD v13.1 SELF-TEST ENGINE
 *
 * It provides domain-level validation.
 *
 * ============================================================
 */


export function runFINValidationSelfTest(){


const tests = [

{

name:

"LOW RISK FIN MONITORING",


input:{


scenario:

"FIN_STRESS",


intensity:

10,


fx:

5,


energy:

80,


cyb:

10,


inf:

5,


dc:

5


},


expectedRisk:

"LOW"

},





{

name:

"MEDIUM RISK FIN PREVENTION",


input:{


scenario:

"BANKING_STRESS",


intensity:

80,


fx:

40,


energy:

50,


cyb:

30,


inf:

40,


dc:

30


},


expectedRisk:

"MEDIUM"

},





{

name:

"HIGH RISK FIN STABILIZATION",


input:{


scenario:

"LIQUIDITY_CRISIS",


intensity:

100,


fx:

90,


energy:

10,


cyb:

70,


inf:

80,


dc:

60


},


expectedRisk:

"HIGH"

}



];







const results = tests.map(

test => {



const validation =


validateFINEngine(

test.input

);





const actualRisk =


validation

.engineResult

.assessment

.risk;





return {


test:

test.name,



status:

actualRisk === test.expectedRisk

?

"PASS"

:

"FAIL",



expectedRisk:

test.expectedRisk,



actualRisk,



validationStatus:

validation.status



};


}

);







const passed =


results.filter(

item =>

item.status === "PASS"

).length;