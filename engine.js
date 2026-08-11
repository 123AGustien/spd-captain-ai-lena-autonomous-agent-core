/**
 * SPD v13.1 — CORE EXECUTION ENGINE
 *
 * COCKPIT
 *    ↓
 * DOMAIN INTEGRATION
 *    ↓
 * AUTHORITATIVE DOMAIN RULE ENGINE
 *    ↓
 * CAPTAIN AI LENA DECISION CORE
 *    ↓
 * GOLDEN RULE PIPELINE
 *    ↓
 * RESULT / MEMORY / AUDIT
 *
 * Active Domains:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 *
 * Human authority remains final.
 * The engine generates decision support only.
 */


/* =========================================================
   IMPORTS
========================================================= */

import { captainAILena }
  from "./captainAILena.js";

import {
  resolveDomain,
  executeDomainRule,
  getDomainStatus
} from "./domainIntegration.js";

import {
  GOLDEN_RATIO
} from "./constants/math.constants.js";


/* =========================================================
   GOLDEN RULE PIPELINE
========================================================= */

const GOLDEN_RULE_PIPELINE = [

  "OBSERVE",

  "VERIFY",

  "ASSESS",

  "DECIDE",

  "ACT",

  "UPDATE"

];


/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(
  value,
  fallback = 0
) {

  const numeric =
    Number(value);

  return Number.isFinite(
    numeric
  )
    ? numeric
    : fallback;

}


/* =========================================================
   OBSERVE
========================================================= */

function observeState(
  state = {}
) {

  return {

    ...state,

    observedAt:
      new Date().toISOString()

  };

}


/* =========================================================
   VERIFY / NORMALIZATION
========================================================= */

function normalizeState(
  observedState = {}
) {

  return {

    ...observedState,

    energy:
      safeNumber(
        observedState.energy
      ) /
      GOLDEN_RATIO,

    fx:
      safeNumber(
        observedState.fx
      ) /
      GOLDEN_RATIO,

    cyb:
      safeNumber(
        observedState.cyb
      ),

    inf:
      safeNumber(
        observedState.inf
      ),

    dc:
      safeNumber(
        observedState.dc
      )

  };

}


/* =========================================================
   DOMAIN IDENTIFICATION
========================================================= */

function identifyDomain(
  observedState
) {

  return resolveDomain(
    observedState
  );

}


/* =========================================================
   DOMAIN EXECUTION
========================================================= */

function executeResolvedDomain(
  domain,
  normalizedState,
  observedState
) {

  if (!domain) {

    return {

      success:
        true,

      domain:
        "CORE",

      status:
        "NO_DOMAIN_ENGINE_REQUIRED"

    };

  }


  const domainStatus =
    getDomainStatus(
      domain
    );


  if (
    !domainStatus.engineRegistered
  ) {

    return {

      success:
        false,

      domain,

      error:
        "DOMAIN_ENGINE_NOT_REGISTERED",

      domainStatus

    };

  }


  if (
    domainStatus.evaluateAvailable ===
    false
  ) {

    return {

      success:
        false,

      domain,

      error:
        "DOMAIN_ENGINE_EVALUATE_FUNCTION_NOT_AVAILABLE",

      domainStatus

    };

  }


  return executeDomainRule(

    domain,

    normalizedState,

    {

      source:
        "SPD v13.1 COCKPIT",

      scenario:
        observedState.scenario,

      intensity:
        observedState.intensity,

      event:
        observedState.event

    }

  );

}


/* =========================================================
   EXTRACT DOMAIN RESULT
========================================================= */

function extractDomainAssessment(
  domainResult
) {

  if (
    !domainResult ||
    !domainResult.success
  ) {

    return null;

  }


  /*
   * The integration layer wraps the
   * authoritative engine response inside
   * domainResult.result.
   */

  const result =
    domainResult.result;


  if (!result) {

    return null;

  }


  return {

    domain:
      result.domain ||
      domainResult.domain,

    domainName:
      result.domainName ||
      null,

    scenario:
      result.scenario ||
      null,

    assessment:
      result.assessment ||
      null,

    decision:
      result.decision ||
      null,

    resilienceScore:
      result.assessment?.resilienceScore ??
      null,

    risk:
      result.assessment?.risk ??
      "UNKNOWN",

    executionAuthority:
      result.executionAuthority ||
      "HUMAN_OPERATOR",

    executionStatus:
      result.executionStatus ||
      "HUMAN_AUTHORIZATION_REQUIRED",

    status:
      result.status ||
      "DOMAIN_EVALUATION_COMPLETE"

  };

}


/* =========================================================
   CAPTAIN AI LENA DECISION CORE
========================================================= */

function executeCaptainAI(
  normalizedState
) {

  try {

    return captainAILena(
      normalizedState
    );

  }

  catch (error) {

    return {

      success:
        false,

      error:
        "CAPTAIN_AI_EXECUTION_ERROR",

      message:
        error.message,

      assessment: {},

      decision: {

        action:
          "MAINTAIN_SAFE_STATE",

        priority:
          "CRITICAL",

        humanAuthorization:
          "REQUIRED"

      }

    };

  }

}


/* =========================================================
   MERGE DECISION SUPPORT
========================================================= */

function buildDecisionSupport(
  domainAssessment,
  captainResult
) {

  const captainAssessment =
    captainResult?.assessment ||
    {};

  const captainDecision =
    captainResult?.decision ||
    {};


  /*
   * Domain engines are authoritative for
   * domain-specific assessment.
   *
   * Captain AI remains the higher-level
   * decision-support layer.
   */

  return {

    domain:

      domainAssessment?.domain ||
      "CORE",

    risk:

      domainAssessment?.risk ??
      captainAssessment.risk ??
      "UNKNOWN",

    resilienceScore:

      domainAssessment?.resilienceScore ??
      captainAssessment.resilienceScore ??
      null,

    assessmentSource:

      domainAssessment
        ? "DOMAIN_RULE_ENGINE"
        : "CAPTAIN_AI_CORE",

    captainDecision:
      captainDecision,

    domainDecision:
      domainAssessment?.decision ||
      null

  };

}


/* =========================================================
   RUN ENGINE
========================================================= */

export function runEngine(
  state = {}
) {

  const executionTimestamp =
    new Date().toISOString();


  /* =======================================================
     OBSERVE
  ======================================================= */

  const observedState =
    observeState(
      state
    );


  /* =======================================================
     VERIFY
  ======================================================= */

  const normalizedState =
    normalizeState(
      observedState
    );


  /* =======================================================
     DOMAIN IDENTIFICATION
  ======================================================= */

  const domain =
    identifyDomain(
      observedState
    );


  /* =======================================================
     DOMAIN EXECUTION
  ======================================================= */

  let domainResult =
    null;


  try {

    domainResult =
      executeResolvedDomain(

        domain,

        normalizedState,

        observedState

      );

  }

  catch (error) {

    domainResult = {

      success:
        false,

      domain:
        domain || "CORE",

      error:
        "DOMAIN_EXECUTION_EXCEPTION",

      message:
        error.message

    };

  }


  /* =======================================================
     DOMAIN ASSESSMENT
  ======================================================= */

  const domainAssessment =
    extractDomainAssessment(
      domainResult
    );


  /* =======================================================
     CAPTAIN AI LENA
  ======================================================= */

  const captainResult =
    executeCaptainAI(
      normalizedState
    );


  /* =======================================================
     DECISION SUPPORT
  ======================================================= */

  const decisionSupport =
    buildDecisionSupport(

      domainAssessment,

      captainResult

    );


  /* =======================================================
     FINAL OUTPUT
  ======================================================= */

  const output = {

    status:
      "COMPLETE",

    domain:
      domain ||
      "CORE",

    domainStatus:
      domain
        ? getDomainStatus(
            domain
          )
        : null,

    domainResult,

    domainAssessment,

    captainAI:
      captainResult,

    assessment:
      domainAssessment?.assessment ||
      captainResult?.assessment ||
      {},

    decision:
      domainAssessment?.decision ||
      captainResult?.decision ||
      {
        action:
          "MAINTAIN_SAFE_STATE",

        humanAuthorization:
          "REQUIRED"

      },

    decisionSupport,

    goldenRulePipeline:
      GOLDEN_RULE_PIPELINE,

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      "DECISION_GENERATED_HUMAN_AUTHORIZATION_REQUIRED",

    timestamp:
      executionTimestamp

  };


  /* =======================================================
     AUDIT WRAPPER
  ======================================================= */

  return {

    timestamp:
      executionTimestamp,

    input:
      observedState,

    normalizedInput:
      normalizedState,

    domain:
      domain ||
      "CORE",

    domainResult,

    output,

    constants: {

      GOLDEN_RATIO

    },

    pipeline:
      GOLDEN_RULE_PIPELINE,

    status:
      "EXECUTED"

  };

}


/* =========================================================
   ENGINE SELF-CHECK
========================================================= */

export function verifyCoreEngine() {

  try {

    const testState = {

      fx: 0,

      energy: 0,

      cyb: 0,

      inf: 0,

      dc: 0,

      scenario:
        "NORMAL",

      intensity:
        0,

      mode:
        "TEST"

    };


    const result =
      runEngine(
        testState
      );


    const pass =
      result &&
      result.status ===
      "EXECUTED" &&
      result.output &&
      result.output.status ===
      "COMPLETE";


    return {

      engine:
        "SPD v13.1 CORE EXECUTION ENGINE",

      status:
        pass
          ? "PASS"
          : "FAIL",

      domain:
        result.domain,

      pipeline:
        result.pipeline,

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      engine:
        "SPD v13.1 CORE EXECUTION ENGINE",

      status:
        "FAIL",

      error:
        error.message,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  GOLDEN_RULE_PIPELINE,

  safeNumber,

  observeState,

  normalizeState,

  identifyDomain,

  executeResolvedDomain,

  extractDomainAssessment,

  executeCaptainAI,

  buildDecisionSupport

};