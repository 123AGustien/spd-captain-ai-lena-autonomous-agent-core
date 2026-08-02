/**
 * ============================================================
 * SPD v13.1 — SCENARIO ENGINE
 *
 * FINAL HARDENED COCKPIT + INTENSITY BRIDGE VERSION
 *
 * File:
 * scenarioEngine.js
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * ============================================================
 *
 * FLOW:
 *
 * COCKPIT
 *    ↓
 * SCENARIO ENGINE
 *    ↓
 * SCENARIO AUTHENTICITY
 *    ↓
 * DOMAIN INTEGRATION
 *    ↓
 * DOMAIN RULE ENGINE
 *    ↓
 * DOMAIN VALIDATION
 *    ↓
 * GOLDEN RULE ENGINE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
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
 * SCENARIO REGISTRY
 * ============================================================
 */


export const scenarios = {



/**
 * ============================================================
 * NORMAL OPERATIONS
 * ============================================================
 */


NORMAL:

{

type:

"NORMAL",


domain:

"SC",


name:

"NORMAL OPERATIONS"

},






/**
 * ============================================================
 * FINANCIAL RESILIENCE DOMAIN
 * ============================================================
 */


FX_SHOCK:

{

type:

"FX_SHOCK",


domain:

"FIN",


name:

"FOREIGN EXCHANGE SHOCK"

},





FIN_STRESS:

{

type:

"FIN_STRESS",


domain:

"FIN",


name:

"FINANCIAL STRESS"

},





BANKING_STRESS:

{

type:

"BANKING_STRESS",


domain:

"FIN",


name:

"BANKING STRESS"

},





LIQUIDITY_CRISIS:

{

type:

"LIQUIDITY_CRISIS",


domain:

"FIN",


name:

"LIQUIDITY CRISIS"

},





CREDIT_STRESS:

{

type:

"CREDIT_STRESS",


domain:

"FIN",


name:

"CREDIT STRESS"

},





SOVEREIGN_DEBT:

{

type:

"SOVEREIGN_DEBT",


domain:

"FIN",


name:

"SOVEREIGN DEBT"

},






/**
 * ============================================================
 * DATA CENTRE RESILIENCE
 * ============================================================
 */


DC_LOAD:

{

type:

"DC_LOAD",


domain:

"DC",


name:

"DATA CENTRE LOAD"

},






/**
 * ============================================================
 * CYBER RESILIENCE
 * ============================================================
 */


CYBER_EVENT:

{

type:

"CYBER_EVENT",


domain:

"CYB",


name:

"CYBER EVENT"

},




CYBER_ATTACK:

{

type:

"CYBER_ATTACK",


domain:

"CYB",


name:

"CYBER ATTACK"

},






/**
 * ============================================================
 * INFRASTRUCTURE RESILIENCE
 * ============================================================
 */


INFRASTRUCTURE_STRESS:

{

type:

"INFRASTRUCTURE_STRESS",


domain:

"INF",


name:

"INFRASTRUCTURE STRESS"

},





INFRA_FAILURE:

{

type:

"INFRA_FAILURE",


domain:

"INF",


name:

"INFRASTRUCTURE FAILURE"

},






/**
 * ============================================================
 * ENERGY RESILIENCE
 * ============================================================
 */


BIODIESEL_SHORTAGE:

{

type:

"BIODIESEL_SHORTAGE",


domain:

"ENG",


name:

"BIODIESEL SHORTAGE"

},