/**
 * SPD v13.1 — Assessment Latency Wiring
 *
 * PURPOSE:
 * Connect the Assessment Latency Observer to the existing
 * SPD execution flow and expose the measured values to the
 * existing cockpit latency display.
 *
 * ARCHITECTURE RULE:
 *
 * This module is OBSERVATION ONLY.
 *
 * It does NOT:
 * - modify Golden Rule Engine logic
 * - modify Domain Rule Engine logic
 * - modify domain thresholds
 * - modify risk classification
 * - modify resilience calculations
 * - modify decisions
 * - modify actions
 * - modify Human Decision Authority
 * - modify existing cockpit controls
 *
 * FLOW:
 *
 * EXISTING SPD EXECUTION
 *          │
 *          ├──────────────► ASSESSMENT LATENCY OBSERVER
 *          │                       │
 *          │                       ▼
 *          │                LATENCY CATALOGUE
 *          │                       │
 *          │                       ▼
 *          └──────────────► LATENCY DISPLAY
 *
 * The observer measures.
 * The display reports.
 * The existing engines remain authoritative.
 */


/* =========================================================
   IMPORT OBSERVER
========================================================= */

import {
  startLatencyMeasurement,
  endLatencyMeasurement,
  getLatencyCatalogue,
  getLatencyStatistics
} from "./assessmentLatencyObserver.js";


/* =========================================================
   IMPORT DISPLAY
========================================================= */

import {
  renderAssessmentLatencyDisplay,
  getAssessmentLatencyDisplay,
  verifyAssessmentLatencyDisplay
} from "./assessmentLatencyDisplay.js";


/* =========================================================
   CONSTANTS
========================================================= */

const LATENCY_WIRING_VERSION =
  "1.0.0";

const LATENCY_WIRING_ID =
  "SPD_V13_1_ASSESSMENT_LATENCY_WIRING";


const LATENCY_STAGES = [

  "INPUT",

  "OBSERVE",

  "VERIFY",

  "ASSESS",

  "DECIDE",

  "ACT",

  "UPDATE",

  "SELF_TEST",

  "FAULT_IDENTIFICATION",

  "CORRECTIVE_ACTION_ASSESSMENT",

  "RE_TEST",

  "END_TO_END"

];


/* =========================================================
   ACTIVE MEASUREMENTS
========================================================= */

const activeMeasurements =
  new Map();


/* =========================================================
   SAFE STAGE
========================================================= */

function isValidStage(
  stage
) {

  return LATENCY_STAGES.includes(
    stage
  );

}


/* =========================================================
   START STAGE OBSERVATION
========================================================= */

export function startStageLatency(
  stage,
  context = {}
) {

  if (!isValidStage(stage)) {

    return {

      success:
        false,

      error:
        "INVALID_LATENCY_STAGE",

      stage

    };

  }


  const measurement =
    startLatencyMeasurement({

      stage,

      ...context

    });


  activeMeasurements.set(
    measurement.measurementId,
    measurement
  );


  return {

    success:
      true,

    measurementId:
      measurement.measurementId,

    stage,

    timestamp:
      measurement.timestamp

  };

}


/* =========================================================
   END STAGE OBSERVATION
========================================================= */

export function endStageLatency(
  measurementId,
  result = {}
) {

  if (
    !measurementId
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_MEASUREMENT_ID_REQUIRED"

    };

  }


  const measurement =
    activeMeasurements.get(
      measurementId
    );


  if (!measurement) {

    return {

      success:
        false,

      error:
        "LATENCY_MEASUREMENT_NOT_FOUND",

      measurementId

    };

  }


  const record =
    endLatencyMeasurement(

      measurement,

      result

    );


  activeMeasurements.delete(
    measurementId
  );


  return {

    success:
      true,

    record

  };

}


/* =========================================================
   MEASURE EXISTING FUNCTION
 *
 * IMPORTANT:
 *
 * The wrapped function remains authoritative.
 * Its return value is returned unchanged.
 *
 * The observer only measures execution time.
========================================================= */

export function measureStage(
  stage,
  fn,
  context = {}
) {

  if (
    typeof fn !==
    "function"
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_TARGET_FUNCTION_REQUIRED",

      stage

    };

  }


  const start =
    startStageLatency(

      stage,

      context

    );


  if (!start.success) {

    return start;

  }


  try {

    const result =
      fn();


    const completed =
      endStageLatency(

        start.measurementId,

        {

          success:
            true,

          resultType:
            typeof result

        }

      );


    return {

      success:
        true,

      result,

      latency:
        completed.record

    };

  }

  catch (error) {

    const completed =
      endStageLatency(

        start.measurementId,

        {

          success:
            false,

          error:
            error?.message ||
            "EXECUTION_ERROR"

        }

      );


    throw error;

  }

}


/* =========================================================
   ASYNC STAGE MEASUREMENT
========================================================= */

export async function measureStageAsync(
  stage,
  fn,
  context = {}
) {

  if (
    typeof fn !==
    "function"
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_TARGET_FUNCTION_REQUIRED",

      stage

    };

  }


  const start =
    startStageLatency(

      stage,

      context

    );


  if (!start.success) {

    return start;

  }


  try {

    const result =
      await fn();


    const completed =
      endStageLatency(

        start.measurementId,

        {

          success:
            true,

          resultType:
            typeof result

        }

      );


    return {

      success:
        true,

      result,

      latency:
        completed.record

    };

  }

  catch (error) {

    endStageLatency(

      start.measurementId,

      {

        success:
          false,

        error:
          error?.message ||
          "ASYNC_EXECUTION_ERROR"

      }

    );


    throw error;

  }

}


/* =========================================================
   END-TO-END MEASUREMENT
========================================================= */

export function startEndToEndLatency(
  context = {}
) {

  return startStageLatency(

    "END_TO_END",

    {

      source:
        "SPD_V13_1",

      ...context

    }

  );

}


export function endEndToEndLatency(
  measurementId,
  result = {}
) {

  return endStageLatency(

    measurementId,

    result

  );

}


/* =========================================================
   SELF-TEST MEASUREMENT
========================================================= */

export function measureSelfTest(
  selfTestFunction,
  context = {}
) {

  return measureStage(

    "SELF_TEST",

    selfTestFunction,

    {

      source:
        "SPD_V13_1_SELF_TEST",

      ...context

    }

  );

}


/* =========================================================
   FAULT IDENTIFICATION MEASUREMENT
========================================================= */

export function measureFaultIdentification(
  faultFunction,
  context = {}
) {

  return measureStage(

    "FAULT_IDENTIFICATION",

    faultFunction,

    {

      source:
        "SPD_V13_1_FAULT_IDENTIFICATION",

      ...context

    }

  );

}


/* =========================================================
   CORRECTIVE ACTION ASSESSMENT
========================================================= */

export function measureCorrectiveActionAssessment(
  assessmentFunction,
  context = {}
) {

  return measureStage(

    "CORRECTIVE_ACTION_ASSESSMENT",

    assessmentFunction,

    {

      source:
        "SPD_V13_1_CORRECTIVE_ACTION_ASSESSMENT",

      ...context

    }

  );

}


/* =========================================================
   RE-TEST MEASUREMENT
========================================================= */

export function measureRetest(
  retestFunction,
  context = {}
) {

  return measureStage(

    "RE_TEST",

    retestFunction,

    {

      source:
        "SPD_V13_1_RE_TEST",

      ...context

    }

  );

}


/* =========================================================
   READ CURRENT LATENCY DATA
========================================================= */

export function getCurrentLatencyData() {

  return {

    catalogue:
      getLatencyCatalogue(),

    statistics:
      getLatencyStatistics(),

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   UPDATE COCKPIT DISPLAY
 *
 * This function only updates the dedicated latency
 * display container.
 *
 * It does not modify any other cockpit section.
========================================================= */

export function updateLatencyDisplay(
  container
) {

  if (!container) {

    return {

      success:
        false,

      error:
        "LATENCY_DISPLAY_CONTAINER_NOT_FOUND"

    };

  }


  return renderAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   AUTO-LOCATE DEDICATED DISPLAY
 *
 * Uses only the dedicated latency container.
 * It does not replace the cockpit.
========================================================= */

export function updateLatencyDisplayById() {

  if (
    typeof document ===
    "undefined"
  ) {

    return {

      success:
        false,

      error:
        "DOM_NOT_AVAILABLE"

    };

  }


  const container =
    document.getElementById(
      "spd-assessment-latency-display"
    );


  if (!container) {

    return {

      success:
        false,

      error:
        "LATENCY_DISPLAY_CONTAINER_NOT_FOUND"

    };

  }


  return updateLatencyDisplay(
    container
  );

}


/* =========================================================
   GET DISPLAY MODEL
========================================================= */

export function getLatencyDisplayModel() {

  return getAssessmentLatencyDisplay();

}


/* =========================================================
   VERIFY WIRING
========================================================= */

export function verifyAssessmentLatencyWiring() {

  try {

    const display =
      verifyAssessmentLatencyDisplay();


    const observerAvailable =
      typeof startLatencyMeasurement ===
        "function" &&

      typeof endLatencyMeasurement ===
        "function";


    const displayAvailable =
      typeof renderAssessmentLatencyDisplay ===
        "function";


    const pass =
      observerAvailable &&
      displayAvailable &&
      display.status ===
        "PASS";


    return {

      module:
        LATENCY_WIRING_ID,

      version:
        LATENCY_WIRING_VERSION,

      status:
        pass
          ? "PASS"
          : "FAIL",

      observer:
        observerAvailable
          ? "CONNECTED"
          : "NOT_CONNECTED",

      display:
        displayAvailable
          ? "CONNECTED"
          : "NOT_CONNECTED",

      measurementOnly:
        true,

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      domainThresholds:
        "UNCHANGED",

      riskClassification:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED",

      actionLogic:
        "UNCHANGED",

      humanDecisionAuthority:
        "UNCHANGED",

      cockpitControls:
        "UNCHANGED",

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      module:
        LATENCY_WIRING_ID,

      version:
        LATENCY_WIRING_VERSION,

      status:
        "FAIL",

      error:
        error?.message ||
        "LATENCY_WIRING_VERIFICATION_ERROR",

      measurementOnly:
        true,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   ARCHITECTURE STATUS
========================================================= */

export function getLatencyWiringStatus() {

  return {

    module:
      LATENCY_WIRING_ID,

    version:
      LATENCY_WIRING_VERSION,

    status:
      "ACTIVE",

    observer:
      "CONNECTED",

    display:
      "CONNECTED",

    measurementOnly:
      true,

    authoritativeEngines: {

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED"

    },

    protectedLogic: {

      riskThresholds:
        "UNCHANGED",

      riskClassification:
        "UNCHANGED",

      resilienceCalculation:
        "UNCHANGED",

      decisions:
        "UNCHANGED",

      actions:
        "UNCHANGED",

      humanAuthorization:
        "UNCHANGED"

    },

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  LATENCY_WIRING_VERSION,

  LATENCY_WIRING_ID,

  LATENCY_STAGES,

  isValidStage

};