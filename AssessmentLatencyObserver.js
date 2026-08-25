/**
 * SPD v13.1 — Assessment Latency Observer
 *
 * File:
 * /AssessmentLatencyObserver.js
 *
 * PURPOSE:
 * Passive observer for SPD execution lifecycle events.
 *
 * IMPORTANT:
 * - MEASUREMENT ONLY.
 * - READ-ONLY with respect to SPD engine state.
 * - Does NOT execute SPD decisions.
 * - Does NOT execute domain rules.
 * - Does NOT modify the Golden Rule Engine.
 * - Does NOT modify Domain Rule Engines.
 * - Does NOT modify risk thresholds.
 * - Does NOT modify resilience calculations.
 * - Does NOT modify decisions.
 * - Does NOT authorize actions.
 * - Does NOT replace cockpit controls.
 * - Does NOT fabricate latency values.
 *
 * ARCHITECTURE:
 *
 * Existing SPD execution
 *        ↓
 * Passive lifecycle event
 *        ↓
 * AssessmentLatencyObserver
 *        ↓
 * assessmentLatencyIntegration
 *        ↓
 * Assessment Latency Catalogue
 *        ↓
 * Read-only Monitor / Display
 */

import {
  startLatency,
  endLatency,
  recordLatency,
  createLatencyRecord,
  getLatencyStages,
  isSupportedLatencyStage,
  getLatencyIntegrationStatus
} from "./assessmentLatencyIntegration.js";


/* =========================================================
   CONSTANTS
========================================================= */

const OBSERVER_NAME =
  "AssessmentLatencyObserver";

const OBSERVER_VERSION =
  "1.0.0";

const OBSERVER_MODE =
  "MEASUREMENT_ONLY";

const EVENT_PREFIX =
  "spd:";


/* =========================================================
   EVENT → LATENCY STAGE MAP
========================================================= */

const EVENT_STAGE_MAP = Object.freeze({

  "spd:input":
    "INPUT",

  "spd:observe-complete":
    "OBSERVE",

  "spd:verify-complete":
    "VERIFY",

  "spd:assess-complete":
    "ASSESS",

  "spd:decide-complete":
    "DECIDE",

  "spd:act-complete":
    "ACT",

  "spd:update-complete":
    "UPDATE",

  "spd:self-test-complete":
    "SELF_TEST",

  "spd:fault-identification-complete":
    "FAULT_IDENTIFICATION",

  "spd:corrective-assessment-complete":
    "CORRECTIVE_ACTION_ASSESSMENT",

  "spd:re-test-complete":
    "RE_TEST",

  "spd:system-complete":
    "END_TO_END"

});


/* =========================================================
   LOCAL OBSERVER STATE
========================================================= */

const activeMeasurements =
  new Map();

const records =
  [];

const eventHistory =
  [];

let observerAttached =
  false;

let sequence =
  0;


/* =========================================================
   EVENT DETAIL
========================================================= */

function getEventDetail(event) {

  if (
    !event ||
    typeof event !== "object"
  ) {

    return {};

  }

  if (
    event.detail &&
    typeof event.detail === "object"
  ) {

    return event.detail;

  }

  return {};

}


/* =========================================================
   CONTEXT
========================================================= */

function buildContext(
  detail = {}
) {

  return {

    domain:
      detail.domain ||
      "CORE",

    scenario:
      detail.scenario ||
      "UNSPECIFIED",

    source:
      detail.source ||
      OBSERVER_NAME

  };

}


/* =========================================================
   EVENT VALIDATION
========================================================= */

function isObservedEvent(
  eventName
) {

  return (

    typeof eventName === "string" &&

    eventName.startsWith(
      EVENT_PREFIX
    ) &&

    Object.prototype.hasOwnProperty.call(
      EVENT_STAGE_MAP,
      eventName
    )

  );

}


/* =========================================================
   GET STAGE
========================================================= */

function getStageForEvent(
  eventName
) {

  return (
    EVENT_STAGE_MAP[eventName] ||
    null
  );

}


/* =========================================================
   EVENT HISTORY
========================================================= */

function recordEventHistory(
  eventName,
  stage,
  detail
) {

  sequence += 1;

  eventHistory.push({

    sequence,

    event:
      eventName,

    stage,

    domain:
      detail?.domain ||
      "CORE",

    scenario:
      detail?.scenario ||
      "UNSPECIFIED",

    observedAt:
      new Date().toISOString()

  });


  /*
   * Keep diagnostic history bounded.
   */

  if (
    eventHistory.length > 500
  ) {

    eventHistory.shift();

  }

}


/* =========================================================
   START OBSERVATION
========================================================= */

export function observeStart(
  stage,
  context = {}
) {

  if (
    !isSupportedLatencyStage(stage)
  ) {

    return {

      success:
        false,

      error:
        "UNSUPPORTED_LATENCY_STAGE",

      stage

    };

  }


  const result =
    startLatency(
      stage,
      context
    );


  if (
    !result.success
  ) {

    return result;

  }


  activeMeasurements.set(
    result.key,
    {

      stage,

      context: {
        ...context
      },

      key:
        result.key

    }
  );


  return {

    success:
      true,

    key:
      result.key,

    stage,

    mode:
      OBSERVER_MODE

  };

}


/* =========================================================
   COMPLETE OBSERVATION
========================================================= */

export function observeEnd(
  key
) {

  if (!key) {

    return {

      success:
        false,

      error:
        "LATENCY_MEASUREMENT_KEY_REQUIRED"

    };

  }


  const active =
    activeMeasurements.get(
      key
    );


  if (!active) {

    return {

      success:
        false,

      error:
        "OBSERVER_MEASUREMENT_NOT_FOUND",

      key

    };

  }


  const endResult =
    endLatency(key);


  if (
    !endResult.success
  ) {

    return endResult;

  }


  const recordResult =
    recordLatency(key);


  if (
    !recordResult.success
  ) {

    return recordResult;

  }


  activeMeasurements.delete(
    key
  );


  records.push(
    recordResult.record
  );


  /*
   * Observer-local record limit.
   */

  if (
    records.length > 1000
  ) {

    records.shift();

  }


  return {

    success:
      true,

    record:
      recordResult.record,

    mode:
      OBSERVER_MODE

  };

}


/* =========================================================
   DIRECT MEASURED LATENCY
 *
 * Only accepts an actual supplied duration.
 * No estimation or fabrication.
========================================================= */

export function observeMeasuredLatency(
  stage,
  durationMs,
  context = {}
) {

  if (
    !isSupportedLatencyStage(stage)
  ) {

    return {

      success:
        false,

      error:
        "UNSUPPORTED_LATENCY_STAGE",

      stage

    };

  }


  const result =
    createLatencyRecord({

      stage,

      durationMs,

      context

    });


  if (
    !result.success
  ) {

    return result;

  }


  records.push(
    result.record
  );


  if (
    records.length > 1000
  ) {

    records.shift();

  }


  return {

    success:
      true,

    record:
      result.record,

    mode:
      OBSERVER_MODE

  };

}


/* =========================================================
   PASSIVE EVENT OBSERVER
========================================================= */

export function observeEvent(
  eventName,
  event
) {

  if (
    !isObservedEvent(eventName)
  ) {

    return {

      success:
        false,

      ignored:
        true,

      error:
        "UNOBSERVED_EVENT",

      event:
        eventName

    };

  }


  const stage =
    getStageForEvent(
      eventName
    );


  const detail =
    getEventDetail(
      event
    );


  const context =
    buildContext(
      detail
    );


  recordEventHistory(
    eventName,
    stage,
    detail
  );


  /*
   * Existing measurement key.
   */

  const suppliedKey =
    detail.measurementKey ||
    detail.latencyKey ||
    null;


  if (
    suppliedKey &&
    activeMeasurements.has(
      suppliedKey
    )
  ) {

    return observeEnd(
      suppliedKey
    );

  }


  /*
   * External measured duration.
   */

  if (
    Number.isFinite(
      Number(
        detail.durationMs
      )
    )
  ) {

    return observeMeasuredLatency(

      stage,

      Number(
        detail.durationMs
      ),

      context

    );

  }


  /*
   * No valid measurement boundary.
   *
   * Do NOT fabricate a value.
   */

  return {

    success:
      true,

    observed:
      true,

    measured:
      false,

    stage,

    reason:
      "NO_MEASUREMENT_BOUNDARY_OR_DURATION"

  };

}


/* =========================================================
   EVENT HANDLER
========================================================= */

function createEventHandler(
  eventName
) {

  return function assessmentLatencyEventHandler(
    event
  ) {

    try {

      observeEvent(
        eventName,
        event
      );

    }
    catch (error) {

      /*
       * Observer errors must never propagate into
       * the existing SPD execution path.
       */

      recordEventHistory(

        "observer:error",

        "OBSERVER_ERROR",

        {

          source:
            OBSERVER_NAME,

          error:
            error?.message ||
            String(error)

        }

      );

    }

  };

}


/* =========================================================
   REGISTERED HANDLERS
========================================================= */

const registeredHandlers =
  new Map();


/* =========================================================
   ATTACH OBSERVER
========================================================= */

export function attachAssessmentLatencyObserver(
  target =
    typeof document !== "undefined"
      ? document
      : null
) {

  if (
    !target ||
    typeof target.addEventListener !==
      "function"
  ) {

    return {

      success:
        false,

      error:
        "EVENT_TARGET_NOT_AVAILABLE",

      observer:
        OBSERVER_NAME

    };

  }


  if (
    observerAttached
  ) {

    return {

      success:
        true,

      status:
        "ALREADY_ATTACHED",

      observer:
        OBSERVER_NAME

    };

  }


  Object.entries(
    EVENT_STAGE_MAP
  ).forEach(
    ([eventName]) => {

      const handler =
        createEventHandler(
          eventName
        );


      target.addEventListener(
        eventName,
        handler
      );


      registeredHandlers.set(

        eventName,

        {

          target,

          handler

        }

      );

    }
  );


  observerAttached =
    true;


  return {

    success:
      true,

    status:
      "ATTACHED",

    observer:
      OBSERVER_NAME,

    version:
      OBSERVER_VERSION,

    mode:
      OBSERVER_MODE,

    events:
      Object.keys(
        EVENT_STAGE_MAP
      )

  };

}


/* =========================================================
   DETACH OBSERVER
========================================================= */

export function detachAssessmentLatencyObserver() {

  registeredHandlers.forEach(
    ({
      target,
      handler
    },
    eventName) => {

      try {

        target.removeEventListener(
          eventName,
          handler
        );

      }
      catch {

        /*
         * Cleanup errors are isolated.
         */

      }

    }
  );


  registeredHandlers.clear();


  observerAttached =
    false;


  return {

    success:
      true,

    status:
      "DETACHED",

    observer:
      OBSERVER_NAME

  };

}


/* =========================================================
   OBSERVER STATUS
========================================================= */

export function getAssessmentLatencyObserverStatus() {

  let integrationStatus =
    null;


  try {

    integrationStatus =
      getLatencyIntegrationStatus();

  }
  catch {

    integrationStatus =
      null;

  }


  return {

    status:
      observerAttached
        ? "ACTIVE"
        : "DETACHED",

    observer:
      OBSERVER_NAME,

    version:
      OBSERVER_VERSION,

    mode:
      OBSERVER_MODE,

    measurementOnly:
      true,

    readOnly:
      true,

    attached:
      observerAttached,

    observedEvents:
      Object.keys(
        EVENT_STAGE_MAP
      ),

    supportedStages:
      getLatencyStages(),

    activeMeasurements:
      activeMeasurements.size,

    recordedMeasurements:
      records.length,

    integration:
      integrationStatus,

    protection: {

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      domainThresholds:
        "UNCHANGED",

      riskClassification:
        "UNCHANGED",

      resilienceCalculations:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED",

      actionLogic:
        "UNCHANGED",

      humanDecisionAuthority:
        "UNCHANGED",

      cockpitControls:
        "UNCHANGED"

    }

  };

}


/* =========================================================
   GET OBSERVED RECORDS
========================================================= */

export function getObservedLatencyRecords() {

  return records.map(
    record => ({

      ...record,

      context: {
        ...(record.context || {})
      },

      authority: {
        ...(record.authority || {})
      }

    })
  );

}


/* =========================================================
   GET EVENT HISTORY
========================================================= */

export function getObserverEventHistory() {

  return eventHistory.map(
    event => ({
      ...event
    })
  );

}


/* =========================================================
   CLEAR OBSERVER RECORDS
 *
 * Clears observer-local copies only.
========================================================= */

export function clearObserverRecords() {

  records.length =
    0;

  eventHistory.length =
    0;


  return {

    success:
      true,

    status:
      "OBSERVER_RECORDS_CLEARED",

    measurementOnly:
      true

  };

}


/* =========================================================
   VALIDATE OBSERVER
========================================================= */

export function validateAssessmentLatencyObserver() {

  try {

    const stages =
      getLatencyStages();


    const mappedStages =
      Object.values(
        EVENT_STAGE_MAP
      );


    const stageMapValid =
      mappedStages.length ===
        Object.keys(
          EVENT_STAGE_MAP
        ).length &&

      mappedStages.every(
        stage =>
          stages.includes(stage)
      );


    const integration =
      getLatencyIntegrationStatus();


    const integrationValid =
      integration &&

      integration.measurementOnly ===
        true;


    const pass =
      OBSERVER_NAME ===
        "AssessmentLatencyObserver" &&

      OBSERVER_MODE ===
        "MEASUREMENT_ONLY" &&

      stageMapValid &&

      integrationValid;


    return {

      module:
        OBSERVER_NAME,

      version:
        OBSERVER_VERSION,

      status:
        pass
          ? "PASS"
          : "FAIL",

      measurementOnly:
        true,

      readOnly:
        true,

      stageMapValid,

      integrationValid,

      observedEvents:
        Object.keys(
          EVENT_STAGE_MAP
        ),

      supportedStages:
        stages,

      protection: {

        goldenRuleEngine:
          "UNCHANGED",

        domainRuleEngines:
          "UNCHANGED",

        cockpit:
          "UNCHANGED",

        decisions:
          "UNCHANGED",

        actions:
          "UNCHANGED",

        humanDecisionAuthority:
          "UNCHANGED"

      },

      timestamp:
        new Date().toISOString()

    };

  }
  catch (error) {

    return {

      module:
        OBSERVER_NAME,

      version:
        OBSERVER_VERSION,

      status:
        "FAIL",

      measurementOnly:
        true,

      error:
        error?.message ||
        String(error),

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   EXPORT EVENT MAP
 *
 * Read-only copy for diagnostics/tests.
========================================================= */

export function getAssessmentLatencyObserverEventMap() {

  return {
    ...EVENT_STAGE_MAP
  };

}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {

  attachAssessmentLatencyObserver,

  detachAssessmentLatencyObserver,

  observeStart,

  observeEnd,

  observeEvent,

  observeMeasuredLatency,

  getAssessmentLatencyObserverStatus,

  getObservedLatencyRecords,

  getObserverEventHistory,

  clearObserverRecords,

  validateAssessmentLatencyObserver,

  getAssessmentLatencyObserverEventMap

};