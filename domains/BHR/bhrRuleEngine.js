 /**
  * SPD v13.1 — BHR DOMAIN RULE ENGINE
  *
  * Business & Human Rights Resilience
  *
  * Domain Integration
  *      ↓
  * BHR Rule Engine
  *      ↓
  * Assessment
  *      ↓
  * Risk / Resilience
  *      ↓
  * Decision Support
  *      ↓
  * Audit
  *
  * BHR = Business & Human Rights Resilience
  *
  * Principle:
  * The engine provides deterministic decision support.
  * It does not replace human authority.
  */


 /* =========================================================
    BHR CONSTANTS
 ========================================================= */

 const BHR_CONSTANTS = {

   MEDIUM_THRESHOLD: 40,

   HIGH_THRESHOLD: 70,

   MAX_SCORE: 100,

   MIN_SCORE: 0

 };


 /* =========================================================
    CLAMP VALUE
 ========================================================= */

 function clamp(
   value,
   min = BHR_CONSTANTS.MIN_SCORE,
   max = BHR_CONSTANTS.MAX_SCORE
 ) {

   const numeric =
     Number(value);

   if (
     Number.isNaN(numeric)
   ) {

     return min;

   }

   return Math.min(
     max,
     Math.max(
       min,
       numeric
     )
   );

 }


 /* =========================================================
    NORMALIZE INPUT
 ========================================================= */

 function normalizeInput(
   state = {}
 ) {

   return {

     labour:
       clamp(
         state.labour ??
         state.labor ??
         0
       ),

     humanRights:
       clamp(
         state.humanRights ??
         state.human_rights ??
         0
       ),

     supplyChain:
       clamp(
         state.supplyChain ??
         state.supply_chain ??
         0
       ),

     community:
       clamp(
         state.community ??
         0
       ),

     governance:
       clamp(
         state.governance ??
         0
       ),

     environment:
       clamp(
         state.environment ??
         0
       ),

     intensity:
       clamp(
         state.intensity ??
         0
       )

   };

 }


 /* =========================================================
    CALCULATE BHR STRESS
 ========================================================= */

 function calculateBHRStress(
   state
 ) {

   /*
    * Deterministic weighted BHR model.
    *
    * Human rights and labour indicators
    * carry the highest weighting.
    */

   const stress =

     (
       state.labour *
       0.20
     ) +

     (
       state.humanRights *
       0.25
     ) +

     (
       state.supplyChain *
       0.15
     ) +

     (
       state.community *
       0.15
     ) +

     (
       state.governance *
       0.15
     ) +

     (
       state.environment *
       0.10
     );


   /*
    * Scenario intensity modifier.
    */

   const intensityFactor =
     1 +
     (
       state.intensity /
       100
     );


   return clamp(
     stress *
     intensityFactor
   );

 }


 /* =========================================================
    CLASSIFY RISK
 ========================================================= */

 function classifyRisk(
   stress
 ) {

   if (
     stress <
     BHR_CONSTANTS.MEDIUM_THRESHOLD
   ) {

     return "LOW";

   }


   if (
     stress <
     BHR_CONSTANTS.HIGH_THRESHOLD
   ) {

     return "MEDIUM";

   }


   return "HIGH";

 }


 /* =========================================================
    CALCULATE RESILIENCE
 ========================================================= */

 function calculateResilience(
   stress
 ) {

   return clamp(
     100 -
     stress
   );

 }


 /* =========================================================
    DETERMINE DECISION
 ========================================================= */

 function determineDecision(
   risk
 ) {

   switch (
     risk
   ) {

     case "LOW":

       return {

         action:
           "MAINTAIN_MONITORING",

         priority:
           "NORMAL",

         humanAuthorization:
           "NOT_REQUIRED_FOR_MONITORING"

       };


     case "MEDIUM":

       return {

         action:
           "INITIATE_BHR_MITIGATION_REVIEW",

         priority:
           "ELEVATED",

         humanAuthorization:
           "REQUIRED_BEFORE_EXECUTION"

       };


     case "HIGH":

       return {

         action:
           "ESCALATE_BHR_RISK_AND_MAINTAIN_SAFE_STATE",

         priority:
           "CRITICAL",

         humanAuthorization:
           "REQUIRED_BEFORE_EXECUTION"

       };


     default:

       return {

         action:
           "MAINTAIN_SAFE_STATE",

         priority:
           "UNKNOWN",

         humanAuthorization:
           "REQUIRED"

       };

   }

 }


 /* =========================================================
    BHR PRINCIPLE CHECK
 ========================================================= */

 function evaluateHumanRightsPrinciples(
   state
 ) {

   const concerns = [];


   if (
     state.labour >=
     BHR_CONSTANTS.MEDIUM_THRESHOLD
   ) {

     concerns.push(
       "LABOUR_RISK"
     );

   }


   if (
     state.humanRights >=
     BHR_CONSTANTS.MEDIUM_THRESHOLD
   ) {

     concerns.push(
       "HUMAN_RIGHTS_RISK"
     );

   }


   if (
     state.supplyChain >=
     BHR_CONSTANTS.MEDIUM_THRESHOLD
   ) {

     concerns.push(
       "SUPPLY_CHAIN_RISK"
     );

   }


   if (
     state.community >=
     BHR_CONSTANTS.MEDIUM_THRESHOLD
   ) {

     concerns.push(
       "COMMUNITY_IMPACT_RISK"