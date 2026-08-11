/**
 * SPD v13.1 — CORE EXECUTION ENGINE
 *
 * COCKPIT
 *    ↓
 * DOMAIN INTEGRATION
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE PIPELINE
 *    ↓
 * RESULT / AUDIT
 */

import { captainAILena } from "./captainAILena.js";
import {
  executeDomainRule,
  getDomainStatus
} from "./domainIntegration.js";

import { GOLDEN_RATIO } from "./constants/math.constants.js";


export function runEngine(state) {

  // =========================================================
  // OBSERVE
  // =========================================================

  const observedState = {
    ...state
  };


  // =========================================================
  // VERIFY / NORMALIZATION
  // =========================================================

  const normalizedState = {
    ...observedState,

    energy:
      Number(observedState.energy ?? 0) /
      GOLDEN_RATIO,

    fx:
      Number(observedState.fx ?? 0) /
      GOLDEN_RATIO,

    cyb:
      Number(observedState.cyb ?? 0),

    inf:
      Number(observedState.inf ?? 0),

    dc:
      Number(observedState.dc ?? 0)
  };


  // =========================================================
  // DOMAIN IDENTIFICATION
  // =========================================================

  const domain =
    observedState.domain ||
    (
      observedState.scenario &&
      [
        "FIN_STRESS",
        "BANKING_STRESS",
        "LIQUIDITY_CRISIS",
        "CREDIT_STRESS",
        "SOVEREIGN_DEBT"
      ].includes(observedState.scenario)
        ? "FIN"
        : null
    );


  // =========================================================
  // DOMAIN EXECUTION
  // =========================================================

  let domainResult = null;

  if (domain) {

    const domainStatus =
      getDomainStatus(domain);

    if (domainStatus.engineRegistered) {

      domainResult =
        executeDomainRule(
          domain,
          normalizedState,
          {
            source:
              "SPD v13.1 COCKPIT",

            scenario:
              observedState.scenario,

            intensity:
              observedState.intensity
          }
        );

    } else {

      domainResult = {
        success: false,
        domain,
        error:
          "DOMAIN_ENGINE_NOT_REGISTERED"
      };

    }

  }


  // =========================================================
  // CAPTAIN AI LENA DECISION CORE
  // =========================================================

  const captainResult =
    captainAILena(
      normalizedState
    );


  // =========================================================
  // GOLDEN RULE PIPELINE
  // =========================================================

  const goldenRulePipeline = [
    "OBSERVE",
    "VERIFY",
    "ASSESS",
    "DECIDE",
    "ACT",
    "UPDATE"
  ];


  // =========================================================
  // FINAL OUTPUT
  // =========================================================

  const output = {

    status:
      "COMPLETE",

    domain:
      domain || "CORE",

    domainResult,

    captainAI:
      captainResult,

    assessment:
      captainResult.assessment,

    decision:
      captainResult.decision,

    goldenRulePipeline,

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      "DECISION_GENERATED_HUMAN_AUTHORIZATION_REQUIRED"
  };


  // =========================================================
  // AUDIT WRAPPER
  // =========================================================

  return {

    timestamp:
      new Date().toISOString(),

    input:
      observedState,

    normalizedInput:
      normalizedState,

    domain:
      domain || "CORE",

    domainResult,

    output,

    constants: {
      GOLDEN_RATIO
    },

    status:
      "EXECUTED"
  };

}