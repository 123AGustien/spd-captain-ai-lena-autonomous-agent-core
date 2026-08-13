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
 * DC  — Data Centre Resilience
 *
 * Human authority remains final.
 * The engine generates decision support only.
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
      value
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
    safeNumber(value),
    0,
    100
  );

}


/* =========================================================
   APPLY INTENSITY
========================================================= */

function applyIntensity(
  value,
  intensityFactor
) {

  return clamp(
    safeNumber(value) *
    intensityFactor
  );

}


/* =========================================================
   VERIFY / NORMALIZATION
========================================================= */

function normalizeState(
  observedState = {}
) {

  /*
   * IMPORTANT:
   *
   * The cockpit intensity slider is a
   * real computational input.
   *
   * 0%   → no scenario stress applied
   * 50%  → half of supplied stress applied
   * 100% → full supplied stress applied
   */

  const intensity =
    normalizeIntensity(
      observedState.intensity
    );


  const intensityFactor =
    intensity / 100;


  return {

    ...observedState,


    /* =====================================================
       INTENSITY
    ===================================================== */

    intensity,

    intensityFactor,


    /* =====================================================
       CORE DOMAINS
    ===================================================== */

    fx:
      applyIntensity(
        observedState.fx,
        intensityFactor
      ),

    energy:
      applyIntensity(
        observedState.energy,
        intensityFactor
      ),

    cyb:
      applyIntensity(
        observedState.cyb,
        intensityFactor
      ),

    inf:
      applyIntensity(
        observedState.inf,
        intensityFactor
      ),

    dc:
      applyIntensity(
        observedState.dc,
        intensityFactor
      ),


    /* =====================================================
       BHR
    ===================================================== */

    labour:
      applyIntensity(
        observedState.labour,
        intensityFactor
      ),

    humanRights:
      applyIntensity(
        observedState.humanRights,
        intensityFactor
      ),

    supplyChain:
      applyIntensity(
        observedState.supplyChain,
        intensityFactor
      ),

    community:
      applyIntensity(
        observedState.community,
        intensityFactor
      ),

    governance:
      applyIntensity(
        observedState.governance,
        intensityFactor
      ),

    environment:
      applyIntensity(
        observedState.environment,
        intensityFactor
      ),


    /* =====================================================
       FIN
    ===================================================== */

    liquidity:
      applyIntensity(
        observedState.liquidity,
        intensityFactor
      ),

    credit:
      applyIntensity(
        observedState.credit,
        intensityFactor
      ),

    banking:
      applyIntensity(
        observedState.banking,
        intensityFactor
      ),

    sovereign:
      applyIntensity(
        observedState.sovereign,
        intensityFactor
      ),

    financialMarket:
      applyIntensity(
        observedState.financialMarket,
        intensityFactor
      ),


    /* =====================================================
       DC — DATA CENTRE
    ===================================================== */

    temperature:
      applyIntensity(
        observedState.temperature,
        intensityFactor
      ),

    cooling:
      applyIntensity(
        observedState.cooling,
        intensityFactor
      ),

    thermal:
      applyIntensity(
        observedState.thermal,
        intensityFactor
      ),

    voltage:
      applyIntensity(
        observedState.voltage,
        intensityFactor
      ),

    frequency:
      applyIntensity(
        observedState.frequency,
        intensityFactor
      ),

    upsLoad:
      applyIntensity(
        observedState.upsLoad,
        intensityFactor
      ),

    generatorRisk:
      applyIntensity(
        observedState.generatorRisk,
        intensityFactor
      ),

    bandwidth:
      applyIntensity(
        observedState.bandwidth,
        intensityFactor
      ),

    latency:
      applyIntensity(
        observedState.latency,
        intensityFactor
      ),

    packetLoss:
      applyIntensity(
        observedState.packetLoss,
        intensityFactor
      ),

    routerLoad:
      applyIntensity(
        observedState.routerLoad,
        intensityFactor
      ),

    cpu:
      applyIntensity(
        observedState.cpu,
        intensityFactor
      ),

    memory:
      applyIntensity(
        observedState.memory,
        intensityFactor
      ),

    storageIO:
      applyIntensity(
        observedState.storageIO,
        intensityFactor
      ),

    queueDepth:
      applyIntensity(
        observedState.queueDepth,
        intensityFactor
      ),

    powerLoss:
      applyIntensity(
        observedState.powerLoss,
        intensityFactor
      ),

    generatorFailure:
      applyIntensity(
        observedState.generatorFailure,
        intensityFactor
      ),

    upsStress:
      applyIntensity(
        observedState.upsStress,
        intensityFactor
      ),

    recoveryDelay:
      applyIntensity(
        observedState.recoveryDelay,
        intensityFactor
      ),

    hotspots:
      applyIntensity(
        observedState.hotspots,
        intensityFactor
      ),

    coolingInstability:
      applyIntensity(
        observedState.coolingInstability,
        intensityFactor
      ),

    throttling:
      applyIntensity(
        observedState.throttling,
        intensityFactor
      ),

    deviceFailure:
      applyIntensity(
        observedState.deviceFailure,
        intensityFactor
      ),

    segmentation:
      applyIntensity(
        observedState.segmentation,
        intensityFactor
      ),

    routingInstability:
      applyIntensity(
        observedState.routingInstability,
        intensityFactor
      ),

    diskFailure:
      applyIntensity(
        observedState.diskFailure,
        intensityFactor
      ),

    iops:
      applyIntensity(
        observedState.iops,
        intensityFactor
      ),

    replicationLag:
      applyIntensity(
        observedState.replicationLag,
        intensityFactor
      ),

    coolingUtilisation:
      applyIntensity(
        observedState.coolingUtilisation,
        intensityFactor
      ),

    thermalHeadroom:
      applyIntensity(
        observedState.thermalHeadroom,
        intensityFactor
      ),

    chillerLoad:
      applyIntensity(
        observedState.chillerLoad,
        intensityFactor
      ),

    power:
      applyIntensity(
        observedState.power,
        intensityFactor
      ),

    network:
      applyIntensity(
        observedState.network,
        intensityFactor
      ),

    compute:
      applyIntensity(
        observedState.compute,
        intensityFactor
      ),

    storage:
      applyIntensity(
        observedState.storage,
        intensityFactor
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
   ACTIVE DOMAIN STATUS
========================================================= */

function getActiveDomainStatus(
  state = {}
) {

  const observedState =
    observeState(
      state
    );


  const domain =
    identifyDomain(
      observedState
    );


  if (!domain) {

    return {

      success:
        true,

      domain:
        "CORE",

      status:
        "NO_ACTIVE_DOMAIN",

      engine:
        null,

      engineRegistered:
        false,

      evaluateAvailable:
        false,

      ruleCount:
        null,

      executionAuthority:
        "HUMAN_OPERATOR",

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false

    };

  }


  const domainStatus =
    getDomainStatus(
      domain
    );


  return {

    success:
      true,

    domain,

    status:
      domainStatus?.status ||
      "UNKNOWN",

    engine:
      domainStatus?.engine ||
      null,

    engineRegistered:
      domainStatus?.engineRegistered === true,

    evaluateAvailable:
      domainStatus?.evaluateAvailable !== false,

    ruleCount:
      domainStatus?.ruleCount ??
      null,

    executionAuthority:
      domainStatus?.executionAuthority ||
      "HUMAN_OPERATOR",

    humanAuthorizationRequired:
      domainStatus?.humanAuthorizationRequired !== false,

    autonomousExecution:
      domainStatus?.autonomousExecution === true

  };

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
      result.decision?.executionAuthority ||
      "HUMAN_OPERATOR",

    executionStatus:
      result.executionStatus ||
      result.decision?.executionStatus ||
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
      null,

    executionAuthority:
      domainAssessment?.executionAuthority ||
      "HUMAN_OPERATOR",

    executionStatus:
      domainAssessment?.executionStatus ||
      "HUMAN_AUTHORIZATION_REQUIRED"

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
     ACTIVE DOMAIN STATUS
  ======================================================= */

  const activeDomainStatus =
    getActiveDomainStatus(
      observedState
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

    activeDomainStatus,

    domainStatus:
      domain
        ? getDomainStatus(domain)
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

    activeDomainStatus,

    domainResult,

    output,

    constants: {

      GOLDEN_RATIO

    },

    pipeline:
      GOLDEN_RULE_PIPELINE,

    governance: {

      executionAuthority:
        "HUMAN_OPERATOR",

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false

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


      /* =====================================================
         BHR
      ===================================================== */

      labour: 0,

      humanRights: 0,

      supplyChain: 0,

      community: 0,

      governance: 0,

      environment: 0,


      /* =====================================================
         FIN
      ===================================================== */

      liquidity: 0,

      credit: 0,

      banking: 0,

      sovereign: 0,

      financialMarket: 0,


      /* =====================================================
         DC
      ===================================================== */

      temperature: 0,

      cooling: 0,

      thermal: 0,

      voltage: 0,

      frequency: 0,

      upsLoad: 0,

      generatorRisk: 0,

      bandwidth: 0,

      latency: 0,

      packetLoss: 0,

      routerLoad: 0,

      cpu: 0,

      memory: 0,

      storageIO: 0,

      queueDepth: 0,

      powerLoss: 0,

      generatorFailure: 0,

      upsStress: 0,

      recoveryDelay: 0,

      hotspots: 0,

      coolingInstability: 0,

      throttling: 0,

      deviceFailure: 0,

      segmentation: 0,

      routingInstability: 0,

      diskFailure: 0,

      iops: 0,

      replicationLag: 0,

      coolingUtilisation: 0,

      thermalHeadroom: 0,

      chillerLoad: 0,

      power: 0,

      network: 0,

      compute: 0,

      storage: 0,


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

      Array.isArray(
        result.pipeline
      ) &&

      result.pipeline.length ===
        6;


    return {

      engine:
        "SPD v13.1 CORE EXECUTION ENGINE",

      status:
        pass
          ? "PASS"
          : "FAIL",

      domain:
        result.domain,

      activeDomainStatus:
        result.activeDomainStatus,

      intensity:
        result.output?.intensity,

      intensityFactor:
        result.output?.intensityFactor,

      pipeline:
        result.pipeline,

      executionAuthority:
        result.output?.executionAuthority,

      autonomousExecution:
        result.output?.autonomousExecution,

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

  clamp,

  observeState,

  normalizeIntensity,

  applyIntensity,

  normalizeState,

  identifyDomain,

  getActiveDomainStatus,

  executeResolvedDomain,

  extractDomainAssessment,

  executeCaptainAI,

  buildDecisionSupport

};