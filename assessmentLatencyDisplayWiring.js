/**
 * SPD v13.1 — Assessment Latency Display Wiring
 *
 * PURPOSE:
 * Wire the Assessment Latency Display into the EXISTING
 * SPD v13.1 cockpit.
 *
 * IMPORTANT ARCHITECTURE RULES:
 *
 * - Existing cockpit remains unchanged.
 * - Golden Rule Engine remains unchanged.
 * - Domain Rule Engines remain unchanged.
 * - Domain thresholds remain unchanged.
 * - Risk classification remains unchanged.
 * - Resilience calculations remain unchanged.
 * - Decision logic remains unchanged.
 * - Action logic remains unchanged.
 * - Human Decision Authority remains unchanged.
 *
 * This module ONLY connects the existing latency display
 * to a dedicated display container.
 *
 *
 * ARCHITECTURE:
 *
 * AssessmentLatencyObserver
 *          ↓
 * assessmentLatencyDisplay.js
 *          ↓
 * assessmentLatencyDisplayWiring.js
 *          ↓
 * EXISTING SPD COCKPIT
 *
 *
 * GOLDEN RULE:
 *
 * OBSERVE
 *    ↓
 * VERIFY
 *    ↓
 * ASSESS
 *    ↓
 * DECIDE
 *    ↓
 * ACT
 *    ↓
 * UPDATE
 *
 *
 * The latency system observes/measures the execution.
 * It does NOT become part of the decision authority.
 */


/* =========================================================
   IMPORT DISPLAY MODULE
========================================================= */

import {
  renderAssessmentLatencyDisplay,
  refreshAssessmentLatencyDisplay,
  verifyAssessmentLatencyDisplay
} from "./assessmentLatencyDisplay.js";


/* =========================================================
   CONSTANTS
========================================================= */

const LATENCY_CONTAINER_ID =
  "spd-assessment-latency-container";

const LATENCY_WIRING_ID =
  "SPD_V13_1_ASSESSMENT_LATENCY_DISPLAY_WIRING";

const LATENCY_WIRING_VERSION =
  "1.0.0";


/* =========================================================
   GET DISPLAY CONTAINER
 *
 * The wiring expects a dedicated container.
 *
 * It does NOT replace the cockpit.
 * It does NOT rewrite the cockpit.
 * It only finds the latency display location.
========================================================= */

export function getAssessmentLatencyContainer() {

  if (
    typeof document === "undefined"
  ) {

    return null;

  }


  return document.getElementById(
    LATENCY_CONTAINER_ID
  );

}


/* =========================================================
   CREATE DISPLAY CONTAINER
 *
 * Creates ONLY the dedicated latency container.
 *
 * No existing cockpit element is removed.
 * No existing cockpit element is replaced.
========================================================= */

export function ensureAssessmentLatencyContainer() {

  if (
    typeof document === "undefined"
  ) {

    return {

      success:
        false,

      error:
        "DOM_NOT_AVAILABLE"

    };

  }


  let container =
    getAssessmentLatencyContainer();


  if (container) {

    return {

      success:
        true,

      created:
        false,

      container

    };

  }


  container =
    document.createElement(
      "div"
    );


  container.id =
    LATENCY_CONTAINER_ID;


  container.setAttribute(
    "data-spd-module",
    "assessment-latency"
  );


  container.setAttribute(
    "data-spd-mode",
    "measurement-only"
  );


  /*
   * Append only to the existing document body.
   *
   * The existing cockpit remains untouched.
   */

  document.body.appendChild(
    container
  );


  return {

    success:
      true,

    created:
      true,

    container

  };

}


/* =========================================================
   INITIALIZE LATENCY DISPLAY
========================================================= */

export function initializeAssessmentLatencyDisplay() {

  const containerResult =
    ensureAssessmentLatencyContainer();


  if (
    !containerResult.success
  ) {

    return containerResult;

  }


  return renderAssessmentLatencyDisplay(
    containerResult.container
  );

}


/* =========================================================
   REFRESH LATENCY DISPLAY
 *
 * This should be called after an execution has produced
 * latency measurements.
========================================================= */

export function refreshAssessmentLatencyScreen() {

  const container =
    getAssessmentLatencyContainer();


  if (!container) {

    return {

      success:
        false,

      error:
        "LATENCY_DISPLAY_CONTAINER_NOT_FOUND"

    };

  }


  return refreshAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   REFRESH AFTER SYSTEM EXECUTION
 *
 * This function is intentionally passive.
 *
 * It does NOT execute the system.
 * It does NOT execute a domain engine.
 * It does NOT execute Captain AI Lena.
 * It does NOT execute the Golden Rule Engine.
 *
 * It only refreshes the latency display after execution.
========================================================= */

export function updateAssessmentLatencyAfterExecution() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   REFRESH AFTER SELF TEST
========================================================= */

export function updateAssessmentLatencyAfterSelfTest() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   REFRESH AFTER CORRECTIVE ACTION ASSESSMENT
========================================================= */

export function updateAssessmentLatencyAfterCorrectiveAssessment() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   REFRESH AFTER RE-TEST
========================================================= */

export function updateAssessmentLatencyAfterRetest() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   DISPLAY INTEGRATION SELF-CHECK
========================================================= */

export function verifyAssessmentLatencyDisplayWiring() {

  try {

    const displayCheck =
      verifyAssessmentLatencyDisplay();


    const container =
      getAssessmentLatencyContainer();


    const containerAvailable =
      container !== null;


    const pass =
      displayCheck &&
      displayCheck.status === "PASS";


    return {

      module:
        LATENCY_WIRING_ID,

      version:
        LATENCY_WIRING_VERSION,

      status:
        pass
          ? "PASS"
          : "FAIL",

      displayModule:
        displayCheck,

      container:

        {

          id:
            LATENCY_CONTAINER_ID,

          available:
            containerAvailable

        },


      architectureProtection:

        {

          cockpit:
            "UNCHANGED",

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

          decisions:
            "UNCHANGED",

          actions:
            "UNCHANGED",

          humanDecisionAuthority:
            "UNCHANGED"

        },


      measurementOnly:
        true,


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
        error.message,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   GET WIRING STATUS
========================================================= */

export function getAssessmentLatencyDisplayWiringStatus() {

  const container =
    getAssessmentLatencyContainer();


  return {

    module:
      LATENCY_WIRING_ID,

    version:
      LATENCY_WIRING_VERSION,

    status:
      container
        ? "CONNECTED"
        : "WAITING_FOR_CONTAINER",

    containerId:
      LATENCY_CONTAINER_ID,

    measurementOnly:
      true,

    observer:
      "AssessmentLatencyObserver",

    display:
      "AssessmentLatencyDisplay",

    cockpit:
      "UNCHANGED",

    goldenRuleEngine:
      "UNCHANGED",

    domainRuleEngines:
      "UNCHANGED",

    domainThresholds:
      "UNCHANGED",

    riskClassification:
      "UNCHANGED",

    decisions:
      "UNCHANGED",

    actions:
      "UNCHANGED",

    humanDecisionAuthority:
      "UNCHANGED",

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   OPTIONAL DOM EVENT WIRING
 *
 * These listeners are passive.
 *
 * If the existing cockpit emits these events, the latency
 * screen refreshes automatically.
 *
 * If the cockpit does not emit them, nothing is changed.
========================================================= */

export function registerAssessmentLatencyDisplayListeners() {

  if (
    typeof document === "undefined"
  ) {

    return {

      success:
        false,

      error:
        "DOM_NOT_AVAILABLE"

    };

  }


  const events = [

    "spd:system-complete",

    "spd:self-test-complete",

    "spd:corrective-assessment-complete",

    "spd:re-test-complete",

    "spd:latency-updated"

  ];


  const handlers = {};


  events.forEach(
    eventName => {

      const handler = () => {

        refreshAssessmentLatencyScreen();

      };


      handlers[eventName] =
        handler;


      document.addEventListener(
        eventName,
        handler
      );

    }
  );


  return {

    success:
      true,

    events,

    mode:
      "PASSIVE_DISPLAY_REFRESH",

    measurementOnly:
      true

  };

}


/* =========================================================
   FULL INITIALIZATION
========================================================= */

export function initializeAssessmentLatencyDisplayWiring() {

  const display =
    initializeAssessmentLatencyDisplay();


  if (
    !display.success
  ) {

    return {

      success:
        false,

      display,

      wiring:
        "NOT_INITIALIZED"

    };

  }


  const listeners =
    registerAssessmentLatencyDisplayListeners();


  const verification =
    verifyAssessmentLatencyDisplayWiring();


  return {

    success:
      verification.status === "PASS",

    wiring:
      getAssessmentLatencyDisplayWiringStatus(),

    display,

    listeners,

    verification

  };

}


/* =========================================================
   EXPORT CONSTANTS
========================================================= */

export {

  LATENCY_CONTAINER_ID,

  LATENCY_WIRING_ID,

  LATENCY_WIRING_VERSION

};