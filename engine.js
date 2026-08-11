/**
 * SPD v13.1 — CORE EXECUTION ENGINE
 *
 * Cockpit
 *    ↓
 * Engine
 *    ↓
 * Domain Integration Layer
 *    ↓
 * FIN / BHR Rule Engine
 *    ↓
 * Captain AI Lena
 *    ↓
 * Golden Rule Pipeline
 *    ↓
 * Result / Audit
 */

import { captainAILena }
  from "./captainAILena.js";

import {
  executeDomainRule,
  getDomainStatus
} from "./domainIntegration.js";

import {
  GOLDEN_RATIO
} from "./constants/math.constants.js";


/* =========================================================
   RUN ENGINE
========================================================= */

export function runEngine(state = {}) {

  /* =======================================================
     SAFE INPUT NORMALIZATION
  ======================================================= */

  const normalizedState = {

    ...state,

    energy:
      Number(state.energy ?? 0) /
      GOLDEN_RATIO,

    fx:
      Number(state.fx ?? 0) /
      GOLDEN_RATIO

  };


  /* =======================================================
     DOMAIN IDENTIFICATION
  ======================================================= */

  let domain =
    state.domain ||
    null;


  /*
   * FIN scenarios are routed to FIN.
   */

  if (
    !domain &&
    (
      state.scenario === "FIN_STRESS" ||
      state.scenario === "BANKING_STRESS" ||
      state.scenario === "LIQUIDITY_CRISIS" ||
      state.scenario === "CREDIT_STRESS" ||
      state.scenario === "SOVEREIGN_DEBT"
    )
  ) {

    domain = "FIN";

  }


  /*
   * BHR scenarios can be explicitly identified
   * through domain or scenario.
   */

  if (
    !domain &&
    (
      state.scenario === "BHR_STRESS" ||
      state.scenario === "HUMAN_RIGHTS_RISK" ||
      state.scenario === "LABOUR_RISK" ||
      state.scenario === "SUPPLY_CHAIN_RISK"
    )
  ) {

    domain = "BHR";

  }


  /* =======================================================
     DOMAIN EXECUTION
  ======================================================= */

  let domainResult =
    null;

  let domainStatus =
    null;


  if (domain) {

    domainStatus =
      getDomainStatus(
        domain
      );


    domainResult =
      executeDomainRule(
        domain,
        normalizedState,
        {
          source:
            "SPD_V13.1_COCKPIT",

          scenario:
            state.scenario,

          intensity:
            state.intensity

        }
      );

  }


  /* =======================================================
     CAPTAIN AI LENA CORE
  ======================================================= */

  const lenaInput = {

    ...normalizedState,

    domain,

    domainStatus,

    domainResult

  };


  const result =
    captainAILena(
      lenaInput
    );


  /* =======================================================
     RESPONSE WRAPPER
  ======================================================= */

  return {

    timestamp:
      new Date().toISOString(),

    /* Original cockpit input */
    input:
      state,

    /* Normalized computational input */
    normalizedInput:
      normalizedState,

    /* Domain routing */
    domain: {

      selected:
        domain,

      status:
        domainStatus,

      result:
        domainResult

    },

    /* Captain AI Lena output */
    output:
      result,

    /* Execution metadata */
    constants: {

      GOLDEN_RATIO

    },

    status:
      "EXECUTED"

  };

}