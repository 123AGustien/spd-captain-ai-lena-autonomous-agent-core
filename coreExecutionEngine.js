/**
 * SPD v13.1 — CORE EXECUTION ENGINE
 *
 * =========================================================
 * AUTHORITATIVE EXECUTION ARCHITECTURE
 * =========================================================
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
 * ASSESSMENT LATENCY INTEGRATION
 *    └── MEASUREMENT ONLY
 *
 * =========================================================
 *
 * ACTIVE DOMAINS:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 * INF — Infrastructure Resilience
 *
 * =========================================================
 *
 * GOVERNANCE:
 *
 * AI provides decision support.
 * HUMAN_OPERATOR retains final authority.
 * No autonomous execution is permitted.
 *
 * =========================================================
 *
 * IMPORTANT ENGINE SEPARATION
 *
 * Golden Rule Engine:
 * - Core deterministic decision pipeline.
 *
 * Domain Rule Engines:
 * - Independent domain-specific assessment engines.
 *
 * Assessment Latency Integration:
 * - Measurement/instrumentation only.
 *
 * Cockpit:
 * - Presentation/input layer.
 *
 * NONE of the above measurement wiring modifies:
 *
 * - Golden Rule thresholds
 * - Domain thresholds
 * - Domain calculations
 * - Decisions
 * - Cockpit behaviour
 * - Human authority
 *
 * =========================================================
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


/*
 * Assessment Latency Integration
 *
 * Measurement only.
 *
 * This module does NOT control execution.
 */
import {
  startLatency,
  endLatency,
  recordLatency
} from "./assessmentLatencyIntegration.js";


/* =========================================================
   GOLDEN RULE PIPELINE
 *
 * AUTHORITATIVE GOLDEN RULE PIPELINE
 *
 * DO NOT MODIFY HERE WITHOUT FORMAL ENGINE CHANGE.
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
 * The authoritative domain engine receives:
 *
 * 1. Original scenario indicators
 * 2. Normalized intensity
 * 3. Intensity factor
 *
 * This prevents accidental double application.
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
 *
 * IMPORTANT:
 *
 * This function does NOT execute domain logic itself.
 *
 * It routes the state to the authoritative
 * domain rule engine registered through
 * domainIntegration.js.
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


  /*
   * DOMAIN RULE ENGINE REMAINS AUTHORITATIVE.
   *
   * No domain calculations occur here.
   */

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
 *
 * Captain AI remains the decision-support core.
 *
 * The Golden Rule pipeline remains authoritative.
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
 *
 * This is a presentation/aggregation object.
 *
 * It does NOT replace either authoritative engine.
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
   ACTIVE DOMAIN STATUS
========================================================= */

function getActiveDomainStatus() {

  const domains = {};


  ACTIVE_DOMAINS.forEach(
    domainId => {

      domains[
        domainId
      ] =
        getDomainStatus(
          domainId
        );

    }
  );


  const ready =
    ACTIVE_DOMAINS.every(
      domainId =>

        domains[domainId] &&

        domains[domainId].engineRegistered ===
          true &&

        domains[domainId].evaluateAvailable ===
          true

    );


  return {

    status:
      ready
        ? "READY"
        : "PARTIAL",

    activeDomains:
      ACTIVE_DOMAINS,

    domains,

    ready,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   LATENCY MEASUREMENT HELPER
 *
 * MEASUREMENT ONLY.
 *
 * This helper cannot alter the result of the function
 * being measured.
========================================================= */

function measureExecutionStage(
  stage,
  fn,
  context = {}
) {

  const key =
    startLatency(
      stage,
      context
    );


  try {

    const result =
      fn();


    endLatency(
      key
    );


    const latency =
      recordLatency(
        key
      );


    return {

      result,

      latency

    };

  }

  catch (error) {

    endLatency(
      key
    );

    /*
     * Measurement is recorded before
     * the original exception is re-thrown.
     */

    recordLatency(
      key
    );

    throw error;

  }

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
     LATENCY CONTEXT
  ======================================================= */

  const latencyContext = {

    scenario:
      state.scenario ||
      "UNSPECIFIED",

    domain:
      state.domain ||
      "CORE"

  };


  /* =======================================================
     INPUT
  ======================================================= */

  const inputLatency =
    startLatency(
      "INPUT",
      latencyContext
    );


  /* =======================================================
     OBSERVE
  ======================================================= */

  const observeMeasurement =
    measureExecutionStage(

      "OBSERVE",

      () =>
        observeState(
          state
        ),

      latencyContext

    );


  endLatency(
    inputLatency
  );

  const inputLatencyRecord =
    recordLatency(
      inputLatency
    );


  const observedState =
    observeMeasurement.result;


  /* =======================================================
     VERIFY
  ======================================================= */

  const verifyMeasurement =
    measureExecutionStage(

      "VERIFY",

      () =>
        normalizeState(
          observedState
        ),

      {

        ...latencyContext,

        domain:
          resolveDomain(
            observedState
          ) ||
          latencyContext.domain

      }

    );


  const normalizedState =
    verifyMeasurement.result;


  /* =======================================================
     DOMAIN IDENTIFICATION
     ======================================================= */

  const domain =
    identifyDomain(
      observedState
    );


  const domainLatencyContext = {

    scenario:
      observedState.scenario ||
      "UNSPECIFIED",

    domain:
      domain ||
      "CORE"

  };


  /* =======================================================
     DOMAIN EXECUTION
     *
     * AUTHORITATIVE DOMAIN ENGINE.
     * LATENCY WRAPPER ONLY.
  ======================================================= */

  let domainMeasurement;

  try {

    domainMeasurement =
      measureExecutionStage(

        "ASSESS",

        () =>
          executeResolvedDomain(

            domain,

            normalizedState,

            observedState

          ),

        domainLatencyContext

      );

  }

  catch (error) {

    domainMeasurement = {

      result: {

        success:
          false,

        domain:
          domain ||
          "CORE",

        error:
          "DOMAIN_EXECUTION_EXCEPTION",

        message:
          error.message

      },

      latency:
        null

    };

  }


  const domainResult =
    domainMeasurement.result;


  /* =======================================================
     DOMAIN ASSESSMENT EXTRACTION
  ======================================================= */

  const domainAssessment =
    extractDomainAssessment(
      domainResult
    );


  /* =======================================================
     CAPTAIN AI LENA
  ======================================================= */

  const captainMeasurement =
    measureExecutionStage(

      "DECIDE",

      () =>
        executeCaptainAI(
          normalizedState
        ),

      domainLatencyContext

    );


  const captainResult =
    captainMeasurement.result;


  /* =======================================================
     DECISION SUPPORT
  ======================================================= */

  const decisionSupportMeasurement =
    measureExecutionStage(

      "ACT",

      () =>
        buildDecisionSupport(

          domainAssessment,

          captainResult

        ),

      domainLatencyContext

    );


  const decisionSupport =
    decisionSupportMeasurement.result;


  /* =======================================================
     UPDATE
  ======================================================= */

  const updateLatency =
    startLatency(

      "UPDATE",

      domainLatencyContext

    );


  /*
   * UPDATE is intentionally measurement-only here.
   *
   * Memory/Audit authorities remain outside this
   * measurement layer.
   */

  endLatency(
    updateLatency
  );


  const updateLatencyRecord =
    recordLatency(
      updateLatency
    );


  /* =======================================================
     END-TO-END
  ======================================================= */

  const endToEndLatency =
    startLatency(

      "END_TO_END",

      domainLatencyContext

    );


  /*
   * End-to-end marker is closed immediately before
   * returning the completed execution record.
   */

  endLatency(
    endToEndLatency
  );


  const endToEndLatencyRecord =
    recordLatency(
      endToEndLatency
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
      executionTimestamp,


    /* =====================================================
       ASSESSMENT LATENCY
       *
       * Measurement records only.
    ===================================================== */

    assessmentLatency: {

      catalogue:
        "SPD v13.1 Assessment Latency Catalogue",

      catalogueVersion:
        "1.0.0",

      measurementOnly:
        true,

      input:
        inputLatencyRecord,

      observe:
        observeMeasurement.latency,

      verify:
        verifyMeasurement.latency,

      assess:
        domainMeasurement.latency,

      decide:
        captainMeasurement.latency,

      act:
        decisionSupportMeasurement.latency,

      update:
        updateLatencyRecord,

      endToEnd:
        endToEndLatencyRecord

    }

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

    latencyMeasurement: {

      enabled:
        true,

      measurementOnly:
        true,

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      cockpit:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED"

    },

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

      result.status ===
        "EXECUTED" &&

      result.output &&

      result.output.status ===
        "COMPLETE" &&

      result.output.intensity ===
        50 &&

      result.output.intensityFactor ===
        0.5 &&

      result.output.assessmentLatency &&

      result.output.assessmentLatency.measurementOnly ===
        true;


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

      latencyMeasurement:
        result.output?.assessmentLatency
          ? "ACTIVE"
          : "FAILED",

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

  normalizeState,

  identifyDomain,

  executeResolvedDomain,

  extractDomainAssessment,

  executeCaptainAI,

  buildDecisionSupport,

  getActiveDomainStatus,

  measureExecutionStage

};