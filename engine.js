// ============================================================
// SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
// runEngine.js
//
// CAPTAIN AI LENA AUTONOMOUS AGENT CORE
//
// DATA → ALGORITHMS → COMPUTE
//
// Golden Rule:
// OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
//
// Engine Authority:
// Captain AI Lena Decision Core
//
// Analytics:
// Advisory only
// Does not modify decisions
//
// Domain Integration:
// FIN / BHR / DC / CYB / INF gateway
// Provides verified domain intelligence
// ============================================================


import { captainAILena } from "./captainAILena.js";

import { GOLDEN_RATIO } 
from "./constants/math.constants.js";

import { runAnalytics } 
from "./analytics/index.js";

import { executeDomainRule } 
from "./domainIntegration.js";


// ============================================================
// GOLDEN RULE PIPELINE
// ============================================================

export const GOLDEN_RULE_STAGES = [

  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"

];


// ============================================================
// SPD EXECUTION ENGINE
// ============================================================

export function runEngine(state = {}) {


  // ==========================================================
  // INPUT VALIDATION
  // ==========================================================

  if (
    !state ||
    typeof state !== "object"
  ) {

    throw new Error(
      "SPD ENGINE ERROR: Invalid system state"
    );

  }



  // ==========================================================
  // OBSERVE
  //
  // Preserve original system data.
  // ==========================================================

  const inputState = {

    ...state

  };



  // ==========================================================
  // VERIFY
  //
  // Deterministic normalization layer.
  // Original input unchanged.
  // ==========================================================

  const normalizedState = {


    ...state,


    energy:

      Number(state.energy ?? 50)
      / GOLDEN_RATIO,


    fx:

      Number(state.fx ?? 0)
      / GOLDEN_RATIO,


    cyb:

      Number(state.cyb ?? 50),


    inf:

      Number(state.inf ?? 0),


    dc:

      Number(state.dc ?? 0),


    event:

      state.event ?? "NORMAL",


    scenario:

      state.scenario ?? "NORMAL",


    mode:

      state.mode ?? "AUTONOMOUS"


  };



  // ==========================================================
  // ASSESS
  //
  // DOMAIN INTEGRATION LAYER
  //
  // FIN / BHR / DC / CYB / INF
  //
  // Advisory intelligence.
  // Does not override Captain AI Lena.
  // ==========================================================

  const domainAssessment =

    executeDomainRule(
      normalizedState
    );



  // ==========================================================
  // ANALYTICS LAYER
  //
  // Advisory only.
  // ==========================================================

  const analytics =

    runAnalytics(
      normalizedState
    );



  // ==========================================================
  // DECIDE
  //
  // Captain AI Lena remains authority.
  // ==========================================================

  const result =

    captainAILena({

      ...normalizedState,

      domainAssessment

    });



  // ==========================================================
  // ACT + UPDATE
  //
  // Complete execution record.
  // ==========================================================

  return {


    timestamp:

      new Date().toISOString(),



    engine:

      "SPD v13.1 SEXTANT RESILIENCE EXECUTION ENGINE",



    agent:

      "CAPTAIN AI LENA",



    pipeline:

      GOLDEN_RULE_STAGES,



    input:

      inputState,



    normalizedInput:

      normalizedState,



    domainAssessment,



    analytics,



    output:

      result,



    constants: {


      GOLDEN_RATIO,


      GOLDEN_RULE_STAGES


    },



    authority:

      "CAPTAIN AI LENA DECISION CORE",



    status:

      "EXECUTED"


  };


}