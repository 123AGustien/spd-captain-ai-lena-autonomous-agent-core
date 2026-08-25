/**
 * SPD v13.1 — Assessment Latency Display Wiring
 *
 * VERSION: 1.1.0
 *
 * PURPOSE:
 * Connect the Assessment Latency Display to the existing
 * SPD v13.1 cockpit without modifying the authoritative
 * decision architecture.
 *
 * IMPORTANT:
 *
 * MEASUREMENT ONLY.
 *
 * This module:
 *
 * - DOES NOT execute the Golden Rule Engine.
 * - DOES NOT execute Captain AI Lena.
 * - DOES NOT execute domain engines.
 * - DOES NOT modify risk classification.
 * - DOES NOT modify resilience calculations.
 * - DOES NOT modify decisions.
 * - DOES NOT modify actions.
 * - DOES NOT modify Human Decision Authority.
 * - DOES NOT replace the existing cockpit.
 *
 *
 * GOLDEN RULE:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 *
 * The latency layer observes and displays measurements only.
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
  "1.1.0";

const INITIALIZATION_FLAG =
  "__SPD_V13_1_ASSESSMENT_LATENCY_INITIALIZED__";

const LISTENER_FLAG =
  "__SPD_V13_1_ASSESSMENT_LATENCY_LISTENERS_REGISTERED__";


/* =========================================================
   SAFE LOGGING
========================================================= */

function latencyLog(
  message,
  data = null
) {

  try {

    if (data !== null) {

      console.log(
        `[SPD LATENCY] ${message}`,
        data
      );

    } else {

      console.log(
        `[SPD LATENCY] ${message}`
      );

    }

  }

  catch (_) {

    /*
     * Logging must never interfere with the
     * cockpit or decision architecture.
     */

  }

}


/* =========================================================
   GET DISPLAY CONTAINER
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


  container.setAttribute(
    "data-spd-wiring-version",
    LATENCY_WIRING_VERSION
  );


  /*
   * Dedicated container only.
   *
   * Existing cockpit DOM is not replaced.
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
   INITIALIZE DISPLAY
========================================================= */

export function initializeAssessmentLatencyDisplay() {

  const containerResult =
    ensureAssessmentLatencyContainer();


  if (
    !containerResult.success
  ) {

    return containerResult;

  }


  const renderResult =
    renderAssessmentLatencyDisplay(
      containerResult.container
    );


  return {

    ...renderResult,

    container:
      containerResult.container,

    initialized:
      renderResult.success === true

  };

}


/* =========================================================
   REFRESH DISPLAY
========================================================= */

export function refreshAssessmentLatencyScreen() {

  const container =
    getAssessmentLatencyContainer();


  if (!container) {

    /*
     * If the container does not yet exist,
     * create it first.
     */

    const initialized =
      initializeAssessmentLatencyDisplay();


    if (
      !initialized.success
    ) {

      return initialized;

    }


    return {

      success:
        true,

      action:
        "INITIALIZED_AND_REFRESHED"

    };

  }


  return refreshAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   UPDATE AFTER SYSTEM EXECUTION
 *
 * PASSIVE ONLY.
========================================================= */

export function updateAssessmentLatencyAfterExecution() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   UPDATE AFTER SELF TEST
 *
 * PASSIVE ONLY.
========================================================= */

export function updateAssessmentLatencyAfterSelfTest() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   UPDATE AFTER CORRECTIVE ASSESSMENT
 *
 * PASSIVE ONLY.
========================================================= */

export function updateAssessmentLatencyAfterCorrectiveAssessment() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   UPDATE AFTER RE-TEST
 *
 * PASSIVE ONLY.
========================================================= */

export function updateAssessmentLatencyAfterRetest() {

  return refreshAssessmentLatencyScreen();

}


/* =========================================================
   VERIFY WIRING
========================================================= */

export function verifyAssessmentLatencyDisplayWiring() {

  try {

    const displayCheck =
      verifyAssessmentLatencyDisplay();


    const container =
      getAssessmentLatencyContainer();


    const containerAvailable =
      container !== null;


    const displayPass =
      displayCheck &&
      displayCheck.status === "PASS";


    const pass =
      displayPass &&
      containerAvailable;


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

      container: {

        id:
          LATENCY_CONTAINER_ID,

        available:
          containerAvailable

      },

      architectureProtection: {

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

    resilienceCalculations:
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
   REGISTER PASSIVE EVENTS
 *
 * These events NEVER execute the engine.
 *
 * They only refresh the display.
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


  /*
   * Prevent duplicate registration.
   */

  if (
    document[
      LISTENER_FLAG
    ]
  ) {

    return {

      success:
        true,

      alreadyRegistered:
        true,

      mode:
        "PASSIVE_DISPLAY_REFRESH",

      measurementOnly:
        true

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

        try {

          refreshAssessmentLatencyScreen();

        }

        catch (_) {

          /*
           * Passive display errors must not
           * affect the SPD engine.
           */

        }

      };


      handlers[eventName] =
        handler;


      document.addEventListener(
        eventName,
        handler
      );

    }
  );


  document[
    LISTENER_FLAG
  ] = true;


  return {

    success:
      true,

    alreadyRegistered:
      false,

    events,

    handlers,

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

  /*
   * Prevent duplicate initialization.
   */

  if (
    typeof window !== "undefined" &&
    window[
      INITIALIZATION_FLAG
    ]
  ) {

    return {

      success:
        true,

      alreadyInitialized:
        true,

      wiring:
        getAssessmentLatencyDisplayWiringStatus(),

      verification:
        verifyAssessmentLatencyDisplayWiring()

    };

  }


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


  const result = {

    success:
      verification.status === "PASS",

    wiring:
      getAssessmentLatencyDisplayWiringStatus(),

    display,

    listeners,

    verification

  };


  if (
    typeof window !== "undefined"
  ) {

    window[
      INITIALIZATION_FLAG
    ] = true;

  }


  latencyLog(
    "Assessment Latency Display initialized",
    result
  );


  return result;

}


/* =========================================================
   BROWSER BUTTON HANDLERS
 *
 * IMPORTANT:
 *
 * ES module exports are NOT automatically available to
 * inline HTML onclick handlers.
 *
 * Therefore we explicitly expose ONLY the three
 * measurement-display controls.
 *
 * These functions DO NOT execute SPD decisions.
========================================================= */


/* ---------------------------------------------------------
   BUTTON 1 — INITIALIZE DISPLAY
--------------------------------------------------------- */

export function initializeLatencyDisplayButton() {

  const result =
    initializeAssessmentLatencyDisplayWiring();


  latencyLog(
    "Initialize Display button",
    result
  );


  return result;

}


/* ---------------------------------------------------------
   BUTTON 2 — REFRESH MEASUREMENTS
--------------------------------------------------------- */

export function refreshLatencyMeasurementsButton() {

  const result =
    refreshAssessmentLatencyScreen();


  latencyLog(
    "Refresh Measurements button",
    result
  );


  return result;

}


/* ---------------------------------------------------------
   BUTTON 3 — VERIFY WIRING
--------------------------------------------------------- */

export function verifyLatencyWiringButton() {

  const result =
    verifyAssessmentLatencyDisplayWiring();


  latencyLog(
    "Verify Wiring button",
    result
  );


  return result;

}


/* =========================================================
   EXPOSE SAFE BROWSER API
 *
 * ONLY DISPLAY / VERIFICATION FUNCTIONS ARE EXPOSED.
 *
 * NO ENGINE FUNCTION IS EXPOSED HERE.
========================================================= */

export function exposeAssessmentLatencyBrowserAPI() {

  if (
    typeof window === "undefined"
  ) {

    return {

      success:
        false,

      error:
        "WINDOW_NOT_AVAILABLE"

    };

  }


  /*
   * Dedicated namespace.
   */

  if (
    !window.SPD_V13_1
  ) {

    window.SPD_V13_1 = {};

  }


  if (
    !window.SPD_V13_1.AssessmentLatency
  ) {

    window.SPD_V13_1.AssessmentLatency = {};

  }


  const api =
    window.SPD_V13_1.AssessmentLatency;


  api.initialize =
    initializeLatencyDisplayButton;


  api.refresh =
    refreshLatencyMeasurementsButton;


  api.verify =
    verifyLatencyWiringButton;


  api.status =
    getAssessmentLatencyDisplayWiringStatus;


  /*
   * Legacy/global compatibility.
   *
   * These are display-only functions.
   */

  window.initializeAssessmentLatencyDisplay =
    initializeLatencyDisplayButton;


  window.refreshAssessmentLatencyMeasurements =
    refreshLatencyMeasurementsButton;


  window.verifyAssessmentLatencyWiring =
    verifyLatencyWiringButton;


  return {

    success:
      true,

    namespace:
      "SPD_V13_1.AssessmentLatency",

    functions: [

      "initialize",

      "refresh",

      "verify",

      "status"

    ],

    measurementOnly:
      true

  };

}


/* =========================================================
   AUTO INITIALIZATION
 *
 * This is the important fix.
 *
 * The module now initializes when loaded by the browser.
 *
 * It waits for DOMContentLoaded if necessary.
========================================================= */

export function autoInitializeAssessmentLatencyDisplay() {

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


  const start =
    () => {

      try {

        exposeAssessmentLatencyBrowserAPI();

        return initializeAssessmentLatencyDisplayWiring();

      }

      catch (error) {

        latencyLog(
          "Automatic initialization failed",
          error
        );

        return {

          success:
            false,

          error:
            error?.message ||
            String(error)

        };

      }

    };


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      start,
      {
        once:
          true
      }
    );


    return {

      success:
        true,

      status:
        "WAITING_FOR_DOM_CONTENT_LOADED"

    };

  }


  return start();

}


/* =========================================================
   EXPORT CONSTANTS
========================================================= */

export {

  LATENCY_CONTAINER_ID,

  LATENCY_WIRING_ID,

  LATENCY_WIRING_VERSION

};


/* =========================================================
   AUTOMATIC START
========================================================= */

autoInitializeAssessmentLatencyDisplay();