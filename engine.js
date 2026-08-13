/**
 * SPD v13.1 — CORE EXECUTION ENGINE
 *
 * COCKPIT
 *   ↓
 * DOMAIN INTEGRATION
 *   ↓
 * AUTHORITATIVE DOMAIN RULE ENGINE
 *   ↓
 * CAPTAIN AI LENA DECISION CORE
 *   ↓
 * GOLDEN RULE PIPELINE
 *   ↓
 * RESULT / MEMORY / AUDIT
 *
 * ACTIVE DOMAINS:
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 * INF — Infrastructure Resilience
 *
 * HUMAN AUTHORITY REMAINS FINAL.
 * AI GENERATES DECISION SUPPORT ONLY.
 * AUTONOMOUS EXECUTION IS DISABLED.
 */

import { captainAILena } from "./captainAILena.js";

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

function safeNumber(value, fallback = 0) {

  const numeric = Number(value);

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
 * IMPORTANT:
 *
 * Raw operator-entered values are NOT modified.
 *
 * Intensity is supplied separately to the
 * authoritative domain engines and decision core.
 *
 * This prevents silent alteration of the
 * operator-entered system state.
========================================================= */

function applyIntensity(
  value,
  intensityFactor
) {

  /*
   * Intensity is intentionally not applied
   * directly to raw system state.
   */

  return clamp(
    value
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
       CORE DOMAIN STATE
    ===================================================== */

    fx:
      clamp(
        observedState.fx
      ),

    energy:
      clamp(
        observedState.energy
      ),

    cyb:
      clamp(
        observedState.cyb
      ),

    inf:
      clamp(
        observedState.inf
      ),

    dc:
      clamp(
        observedState.dc
      ),


    /* =====================================================
       BHR DOMAIN STATE
    ===================================================== */

    labour:
      clamp(
        observedState.labour
      ),

    humanRights:
      clamp(
        observedState.humanRights
      ),

    supplyChain:
      clamp(
        observedState.supplyChain
      ),

    community:
      clamp(
        observedState.community
      ),

    governance:
      clamp(
        observedState.governance
      ),

    environment:
      clamp(
        observedState.environment
      ),


    /* =====================================================
       FIN DOMAIN STATE
    ===================================================== */

    liquidity:
      clamp(
        observedState.liquidity
      ),

    credit:
      clamp(
        observedState.credit
      ),

    banking:
      clamp(
        observedState.banking
      ),

    sovereign:
      clamp(
        observedState.sovereign
      ),

    financialMarket:
      clamp(
        observedState.financialMarket
      )

  };

}


/* =========================================================
   DOMAIN IDENTIFICATION
========================================================= */

function identifyDomain(
  observedState = {}
) {

  try {

    return resolveDomain(
      observedState
    );

  }

  catch (error) {

    console.error(
      "Domain identification error:",
      error
    );

    return null;

  }

}


/* =========================================================
   ACTIVE DOMAIN STATUS
========================================================= */

function getActiveDomainStatus() {

  const domains = {};


  for (
    const domain of ACTIVE_DOMAINS
  ) {

    try {

      domains[domain] =
        getDomainStatus(
          domain
        );

    }

    catch (error) {

      domains[domain] = {

        domain,

        status:
          "ERROR",

        error:
          error.message

      };

    }

  }


  return domains;

}


/* =========================================================
   VERIFY ACTIVE DOMAIN
========================================================= */

function isActiveDomain(
  domain
) {

  return ACTIVE_DOMAINS.includes(
    domain
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

  /* -------------------------------------------------------
     NO DOMAIN
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     DOMAIN MUST BE ACTIVE
  ------------------------------------------------------- */

  if (
    !isActiveDomain(
      domain
    )
  ) {

    return {

      success:
        false,

      domain,

      error:
        "DOMAIN_NOT_ACTIVE",

      activeDomains:
        ACTIVE_DOMAINS

    };

  }


  /* -------------------------------------------------------
     DOMAIN STATUS
  ------------------------------------------------------- */

  let domainStatus;

  try {

    domainStatus =
      getDomainStatus(
        domain
      );

  }

  catch (error) {

    return {

      success:
        false,

      domain,

      error:
        "DOMAIN_STATUS_ERROR",

      message:
        error.message

    };

  }


  /* -------------------------------------------------------
     ENGINE REGISTRATION
  ------------------------------------------------------- */

  if (
    !domainStatus ||
    domainStatus.engineRegistered === false
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


  /* -------------------------------------------------------
     ENGINE EVALUATION
  ------------------------------------------------------- */

  if (
    domainStatus.evaluateAvailable === false
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


  /* -------------------------------------------------------
     AUTHORITATIVE DOMAIN ENGINE
  ------------------------------------------------------- */

  try {

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

        intensityFactor:
          normalizedState.intensityFactor,

        event:
          observedState.event

      }

    );

  }

  catch (error) {

    return {

      success:
        false,

      domain,

      error:
        "DOMAIN_EXECUTION_EXCEPTION",

      message:
        error.message,

      domainStatus

    };

  }

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


  const result =
    domainResult.result;


  if (!result) {

    return null;

  }


  const assessment =
    result.assessment ||
    {};


  const decision =
    result.decision ||
    {};


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

    assessment,

    decision,

    resilienceScore:
      assessment.resilienceScore ??
      null,

    risk:
      assessment.risk ??
      "UNKNOWN",

    executionAuthority:
      result.executionAuthority ||
      "HUMAN_OPERATOR",

    executionStatus:
      result.executionStatus ||
      "HUMAN_AUTHORIZATION_REQUIRED",

    autonomousExecution:
      result.autonomousExecution ??
      false,

    humanAuthorizationRequired:
      result.humanAuthorizationRequired ??
      true,

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

    console.error(
      "Captain AI Lena execution error:",
      error
    );


    return {

      success:
        false,

      error:
        "CAPTAIN_AI_EXECUTION_ERROR",

      message:
        error.message,

      assessment: {

        risk:
          "UNKNOWN",

        resilienceScore:
          null

      },

      decision: {

        action:
          "MAINTAIN_SAFE_STATE",

        priority:
          "CRITICAL",

        humanAuthorization:
          "REQUIRED"

      },

      executionAuthority:
        "HUMAN_OPERATOR",

      executionStatus:
        "DECISION_GENERATED_HUMAN_AUTHORIZATION_REQUIRED",

      autonomousExecution:
        false,

      humanAuthorizationRequired:
        true

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

    autonomousExecution:
      false,

    humanAuthorizationRequired:
      true

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
     ASSESSMENT
  ======================================================= */

  const assessment =

    domainAssessment?.assessment ||

    captainResult?.assessment ||

    {

      risk:
        "UNKNOWN",

      resilienceScore:
        null

    };


  /* =======================================================
     DECISION
  ======================================================= */

  const decision =

    domainAssessment?.decision ||

    captainResult?.decision ||

    {

      action:
        "MAINTAIN_SAFE_STATE",

      humanAuthorization:
        "REQUIRED"

    };


  /* =======================================================
     FINAL OUTPUT
  ======================================================= */

  const output = {

    status:
      "COMPLETE",

    domain:
      domain ||
      "CORE",

    activeDomains:
      ACTIVE_DOMAINS,

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

    assessment,

    decision,

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

    humanAuthorizationRequired:
      true,

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

    activeDomains:
      ACTIVE_DOMAINS,

    domainResult,

    output,

    constants: {

      GOLDEN_RATIO

    },

    pipeline:
      GOLDEN_RULE_PIPELINE,

    executionAuthority:
      "HUMAN_OPERATOR",

    autonomousExecution:
      false,

    humanAuthorizationRequired:
      true,

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

      /* CORE */

      fx:
        50,

      energy:
        50,

      cyb:
        50,

      inf:
        50,

      dc:
        50,


      /* BHR */

      labour:
        0,

      humanRights:
        0,

      supplyChain:
        0,

      community:
        0,

      governance:
        0,

      environment:
        0,


      /* FIN */

      liquidity:
        0,

      credit:
        0,

      banking:
        0,

      sovereign:
        0,

      financialMarket:
        0,


      scenario:
        "NORMAL",

      event:
        "NORMAL",

      financialScenario:
        "FIN_STRESS",

      intensity:
        50,

      mode:
        "TEST",

      executionAuthority:
        "HUMAN_OPERATOR",

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false

    };


    const result =
      runEngine(
        testState
      );


    const pass =

      result?.status ===
        "EXECUTED"

      &&

      result?.output?.status ===
        "COMPLETE"

      &&

      result?.output?.intensity ===
        50

      &&

      result?.output
        ?.intensityFactor ===
        0.5

      &&

      result?.output
        ?.executionAuthority ===
        "HUMAN_OPERATOR"

      &&

      result?.output
        ?.autonomousExecution ===
        false

      &&

      result?.output
        ?.humanAuthorizationRequired ===
        true

      &&

      Array.isArray(
        result?.output?.activeDomains
      )

      &&

      ACTIVE_DOMAINS.every(
        domain =>
          result.output.activeDomains.includes(
            domain
          )
      );


    return {

      engine:
        "SPD v13.1 CORE EXECUTION ENGINE",

      status:
        pass
          ? "PASS"
          : "FAIL",

      domain:
        result?.domain,

      activeDomains:
        result?.output?.activeDomains,

      intensity:
        result?.output?.intensity,

      intensityFactor:
        result?.output?.intensityFactor,

      executionAuthority:
        result?.output
          ?.executionAuthority,

      autonomousExecution:
        result?.output
          ?.autonomousExecution,

      humanAuthorizationRequired:
        result?.output
          ?.humanAuthorizationRequired,

      pipeline:
        result?.pipeline,

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

  isActiveDomain,

  getActiveDomainStatus,

  executeResolvedDomain,

  extractDomainAssessment,

  executeCaptainAI,

  buildDecisionSupport

};