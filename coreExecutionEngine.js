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
 * ACTIVE DOMAINS:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 * INF — Infrastructure Resilience
 *
 * IMPORTANT:
 * The cockpit intensity is passed as a single
 * computational input to the authoritative domain
 * engine.
 *
 * Domain engines remain responsible for their own
 * scenario-specific stress calculations.
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains final authority.
 * No autonomous execution is permitted.
 */


/* =========================================================
   IMPORTS
========================================================= */

import {
  captainAILena
} from "./captainAILena.js";

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
   ACTIVE DOMAINS
========================================================= */

const ACTIVE_DOMAINS = [

  "FIN",
  "BHR",
  "DC",
  "CYB",
  "INF"

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

  return Number.isFinite(numeric)
    ? numeric
    : fallback;

}


/* =========================================================
   CLAMP
========================================================= */

function clamp(
  value,
  min = 0,
  max = 100
) {

  return Math.min(
    max,
    Math.max(
      min,
      safeNumber(value)
    )
  );

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
   INTENSITY
========================================================= */

function normalizeIntensity(
  value
) {

  return clamp(
    value,
    0,
    100
  );

}


/* =========================================================
   VERIFY / NORMALIZATION
 *
 * IMPORTANT:
 *
 * Intensity is NOT applied to every indicator here.
 *
 * The authoritative domain engine receives the
 * original scenario indicators and the normalized
 * intensity value.
 *
 * This prevents accidental double application of
 * scenario intensity.
========================================================= */

function normalizeState(
  observedState = {}
) {

  const intensity =
    normalizeIntensity(
      observedState.intensity
    );

  const intensityFactor =
    intensity / 100;

  return {

    ...observedState,

    intensity,

    intensityFactor,

    /* =====================================================
       CORE DOMAIN INDICATORS
    ===================================================== */

    fx:
      clamp(observedState.fx),

    energy:
      clamp(observedState.energy),

    cyb:
      clamp(observedState.cyb),

    inf:
      clamp(observedState.inf),

    dc:
      clamp(observedState.dc),


    /* =====================================================
       BHR INDICATORS
    ===================================================== */

    labour:
      clamp(observedState.labour),

    humanRights:
      clamp(observedState.humanRights),

    supplyChain:
      clamp(observedState.supplyChain),

    community:
      clamp(observedState.community),

    governance:
      clamp(observedState.governance),

    environment:
      clamp(observedState.environment),


    /* =====================================================
       FIN INDICATORS
    ===================================================== */

    liquidity:
      clamp(observedState.liquidity),

    credit:
      clamp(observedState.credit),

    banking:
      clamp(observedState.banking),

    sovereign:
      clamp(observedState.sovereign),

    financialMarket:
      clamp(observedState.financialMarket)

  };

}


/* =========================================================
   DOMAIN IDENTIFICATION
========================================================= */

function identifyDomain(
  observedState = {}
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
    !domainStatus ||
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
        "SPD_V13_1_COCKPIT",

      scenario:
        observedState.scenario,

      intensity:
        normalizedState.intensity,

      intensityFactor:
        normalizedState.intensityFactor,

      event:
        observedState.event

    }

  );

}


/* =========================================================
   EXTRACT DOMAIN ASSESSMENT
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


  const result =
    domainResult.result;


  if (!result) {

    return null;

  }


  return {

    domain:
      result.domain ||
      domainResult.domain ||
      "UNKNOWN",

    domainName:
      result.domainName ||
      null,

    engine:
      result.engine ||
      null,

    scenario:
      result.scenario ||
      null,

    rule:
      result.rule ||
      null,

    assessment:
      result.assessment ||
      null,

    decision:
      result.decision ||
      null,

    cascade:
      result.cascade ||
      null,

    contingencyActions:
      result.contingencyActions ||
      [],

    resilienceScore:
      result.assessment?.resilienceScore ??
      null,

    risk:
      result.assessment?.risk ??
      "UNKNOWN",

    executionAuthority:
      result.decision?.executionAuthority ||
      result.executionAuthority ||
      "HUMAN_OPERATOR",

    executionStatus:
      result.decision?.executionStatus ||
      result.executionStatus ||
      "HUMAN_AUTHORIZATION_REQUIRED",

    status:
      result.status ||
      "DOMAIN_EVALUATION_COMPLETE"

  };

}


/* =========================================================
   CAPTAIN AI LENA
========================================================= */

function executeCaptainAI(
  normalizedState
) {

  try {

    const result =
      captainAILena(
        normalizedState
      );


    return {

      success:
        true,

      ...result

    };

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
          "REQUIRED",

        executionAuthority:
          "HUMAN_OPERATOR",

        executionStatus:
          "HUMAN_AUTHORIZATION_REQUIRED"

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

    captainDecision,

    domainDecision:
      domainAssessment?.decision ||
      null,

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      "HUMAN_AUTHORIZATION_REQUIRED"

  };

}


/* =========================================================
   DOMAIN STATUS SNAPSHOT
========================================================= */

function getActiveDomainStatus() {

  const statuses = {};

  ACTIVE_DOMAINS.forEach(
    domainId => {

      statuses[
        domainId
      ] =
        getDomainStatus(
          domainId
        );

    }
  );

  return statuses;

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
        domain ||
        "CORE",

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
        ? getDomainStatus(domain)
        : null,

    activeDomainStatus:
      getActiveDomainStatus(),

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
          "REQUIRED",

        executionAuthority:
          "HUMAN_OPERATOR",

        executionStatus:
          "HUMAN_AUTHORIZATION_REQUIRED"

      },

    decisionSupport,

    intensity:
      normalizedState.intensity,

    intensityFactor:
      normalizedState.intensityFactor,

    goldenRulePipeline:
      GOLDEN_RULE_PIPELINE,

    executionAuthority:
      "HUMAN_OPERATOR",

    executionStatus:
      "DECISION_GENERATED_HUMAN_AUTHORIZATION_REQUIRED",

    autonomousExecution:
      false,

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

      labour: 0,
      humanRights: 0,
      supplyChain: 0,
      community: 0,
      governance: 0,
      environment: 0,

      liquidity: 0,
      credit: 0,
      banking: 0,
      sovereign: 0,
      financialMarket: 0,

      scenario:
        "NORMAL",

      event:
        "NORMAL",

      intensity:
        50,

      mode:
        "TEST"

    };


    const result =
      runEngine(
        testState
      );


    const pass =
      result &&
      result.status === "EXECUTED" &&
      result.output &&
      result.output.status === "COMPLETE" &&
      result.output.intensity === 50 &&
      result.output.intensityFactor === 0.5;


    return {

      engine:
        "SPD v13.1 CORE EXECUTION ENGINE",

      status:
        pass
          ? "PASS"
          : "FAIL",

      domain:
        result.domain,

      intensity:
        result.output?.intensity,

      intensityFactor:
        result.output?.intensityFactor,

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

  ACTIVE_DOMAINS,

  GOLDEN_RULE_PIPELINE,

  safeNumber,

  clamp,

  observeState,

  normalizeIntensity,

  applyIntensity,

  normalizeState,

  identifyDomain,

  executeResolvedDomain,

  extractDomainAssessment,

  executeCaptainAI,

  buildDecisionSupport,

  getActiveDomainStatus

};