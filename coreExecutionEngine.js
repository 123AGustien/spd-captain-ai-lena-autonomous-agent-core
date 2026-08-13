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
   APPLY INTENSITY
 *
 * Retained as a public utility for compatibility.
 *
 * IMPORTANT:
 * The main engine does NOT apply intensity to every
 * domain indicator. Authoritative domain engines receive
 * the normalized indicators and intensity separately.
========================================================= */

function applyIntensity(
  value,
  intensityFactor
) {

  return clamp(
    safeNumber(value) *
    safeNumber(intensityFactor)
  );

}


/* =========================================================
   VERIFY / NORMALIZATION
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
     