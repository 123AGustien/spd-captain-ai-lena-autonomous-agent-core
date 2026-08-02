/**
 * ============================================================
 * SPD v13.1 — SCENARIO ENGINE
 * UPDATED COCKPIT COMPATIBILITY VERSION
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Scenario Engine:
 * COCKPIT
 * ↓
 * SCENARIO ENGINE
 * ↓
 * DOMAIN INTEGRATION
 * ↓
 * DOMAIN RULE ENGINE
 * ↓
 * GOLDEN RULE ENGINE
 * ↓
 * CAPTAIN AI LENA
 *
 * Deterministic
 * No randomness
 * No machine learning
 * ============================================================
 */


export const scenarios = {


NORMAL:{
type:"NORMAL",
domain:"SC",
name:"NORMAL OPERATIONS"
},


/* FIN */

FX_SHOCK:{
type:"FX_SHOCK",
domain:"FIN",
name:"FOREIGN EXCHANGE SHOCK"
},

FIN_STRESS:{
type:"FIN_STRESS",
domain:"FIN",
name:"FINANCIAL STRESS"
},

BANKING_STRESS:{
type:"BANKING_STRESS",
domain:"FIN",
name:"BANKING STRESS"
},

LIQUIDITY_CRISIS:{
type:"LIQUIDITY_CRISIS",
domain:"FIN",
name:"LIQUIDITY CRISIS"
},

CREDIT_STRESS:{
type:"CREDIT_STRESS",
domain:"FIN",
name:"CREDIT STRESS"
},

SOVEREIGN_DEBT:{
type:"SOVEREIGN_DEBT",
domain:"FIN",
name:"SOVEREIGN DEBT"
},


/* DATA CENTRE */

DC_LOAD:{
type:"DC_LOAD",
domain:"DC",
name:"DATA CENTRE LOAD"
},


/* CYBER */

CYBER_EVENT:{
type:"CYBER_EVENT",
domain:"CYB",
name:"CYBER EVENT"
},


/* INFRASTRUCTURE */

INFRASTRUCTURE_STRESS:{
type:"INFRASTRUCTURE_STRESS",
domain:"INF",
name:"INFRASTRUCTURE STRESS"
},


/* ENERGY */

BIODIESEL_SHORTAGE:{
type:"BIODIESEL_SHORTAGE",
domain:"ENG",
name:"BIODIESEL SHORTAGE"
},


/* BHR */

HUMAN_RIGHTS_DUE_DILIGENCE:{
type:"HUMAN_RIGHTS_DUE_DILIGENCE",
domain:"BHR",
name:"HUMAN RIGHTS DUE DILIGENCE"
},

FORCED_LABOUR:{
type:"FORCED_LABOUR",
domain:"BHR",
name:"FORCED LABOUR"
},

CHILD_LABOUR:{
type:"CHILD_LABOUR",
domain:"BHR",
name:"CHILD LABOUR"
},

DISCRIMINATION:{
type:"DISCRIMINATION",
domain:"BHR",
name:"DISCRIMINATION"
},

OCCUPATIONAL_HEALTH_AND_SAFETY:{
type:"OCCUPATIONAL_HEALTH_AND_SAFETY",
domain:"BHR",
name:"OCCUPATIONAL HEALTH AND SAFETY"
},

MODERN_SLAVERY:{
type:"MODERN_SLAVERY",
domain:"BHR",
name:"MODERN SLAVERY"
},

COMMUNITY_IMPACT:{
type:"COMMUNITY_IMPACT",
domain:"BHR",
name:"COMMUNITY IMPACT"
},

INDIGENOUS_RIGHTS:{
type:"INDIGENOUS_RIGHTS",
domain:"BHR",
name:"INDIGENOUS RIGHTS"
},

SUPPLY_CHAIN_RISK:{
type:"SUPPLY_CHAIN_RISK",
domain:"BHR",
name:"SUPPLY CHAIN RISK"
},

GRIEVANCE_MECHANISM:{
type:"GRIEVANCE_MECHANISM",
domain:"BHR",
name:"GRIEVANCE MECHANISM"
}

};



export function scenarioEngine(event="NORMAL"){

const key =
String(event)
.trim()
.toUpperCase();


return scenarios[key] ?? scenarios.NORMAL;

}



export function getScenarioResponse(scenario){

const type =
typeof scenario === "string"
?
scenario
:
scenario?.type;


if(type==="FIN_STRESS"||
type==="FX_SHOCK"||
type==="BANKING_STRESS"||
type==="LIQUIDITY_CRISIS"||
type==="CREDIT_STRESS"||
type==="SOVEREIGN_DEBT")
return "FINANCIAL RESILIENCE MODE ACTIVE";


if(type==="HUMAN_RIGHTS_DUE_DILIGENCE"||
type==="FORCED_LABOUR"||
type==="CHILD_LABOUR"||
type==="DISCRIMINATION"||
type==="SUPPLY_CHAIN_RISK")
return "BHR HUMAN RIGHTS ASSESSMENT ACTIVE";


if(type==="CYBER_EVENT")
return "CYBER RESILIENCE MODE ACTIVE";


if(type==="DC_LOAD")
return "DATA CENTRE RESILIENCE MODE ACTIVE";


if(type==="INFRASTRUCTURE_STRESS")
return "INFRASTRUCTURE RESILIENCE MODE ACTIVE";


if(type==="BIODIESEL_SHORTAGE")
return "ENERGY RESILIENCE MODE ACTIVE";


return "NO SCENARIO RESPONSE REQUIRED";

}



export default {

scenarioEngine,
scenarios,
getScenarioResponse

};