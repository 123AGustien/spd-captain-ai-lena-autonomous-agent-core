/**
 * SPD v13.1 — Assessment Latency Display Wiring
 *
 * VERSION: 1.2.0
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
  "1.2.0";

const INITIALIZATION_FLAG =
  "__SPD_V13_1_ASSESSMENT_LATENCY_INITIALIZED__";

const LISTENER_FLAG =
  "__SPD_V13_1_ASSESSMENT_LATENCY_LISTENERS_REGISTERED__";

const STATUS_FLAG =
  "__SPD_V13_1_ASSESSMENT_LATENCY_WIRING_STATUS__";


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
     * Logging must never interfere with
     * the cockpit or decision architecture.
     */

  }

}


/* =========================================================
   INTERNAL WIRING STATE
========================================================= */

function setWiringState(
  state,
  error = null
) {

  if (
    typeof window === "undefined"
  ) {

    return;

  }


  window[
    STATUS_FLAG
  ] = {

    state,

    error:
      error
        ? (
            error?.message ||
            String(error)
          )
        : null,

    version:
      LATENCY_WIRING_VERSION,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   GET INTERNAL WIRING STATE
========================================================= */

function getInternalWiringState() {

  if (
    typeof window === "undefined"
  ) {

    return {

      state:
        "SERVER_CONTEXT",

      error:
        null

    };

  }


  return (
    window[
      STATUS_FLAG
    ] || {

      state:
        "NOT_STARTED",

      error:
        null

    }
  );

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


  /*
   * The module may load before <body> exists.
   *
   * Do not attempt appendChild() until the body
   * is available.
   */

  if (
    !document.body
  ) {

    return {

      success:
        false,

      error:
        "DOM_BODY_NOT_AVAILABLE"

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


  container.setAttribute(
    "data-spd-wiring-status",
    "INITIALIZING"
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

  setWiringState(
    "INITIALIZING"
  );


  const containerResult =
    ensureAssessmentLatencyContainer();


  if (
    !containerResult.success
  ) {

    setWiringState(
      "WAITING_FOR_DOM",
      containerResult.error
    );


    return containerResult;

  }


  try {

    const renderResult =
      renderAssessmentLatencyDisplay(
        containerResult.container
      );


    if (
      renderResult &&
      renderResult.success === true
    ) {

      containerResult.container.setAttribute(
        "data-spd-wiring-status",
        "RENDERED"
      );

    }


    return {

      ...renderResult,

      container:
        containerResult.container,

      initialized:
        renderResult?.success === true

    };

  }

  catch (error) {

    containerResult.container.setAttribute(
      "data-spd-wiring-status",
      "FAILED"
    );


    setWiringState(
      "FAILED",
      error
    );


    return {

      success:
        false,

      initialized:
        false,

      container:
        containerResult.container,

      error:
        error?.message ||
        String(error)

    };

  }

}


/* =========================================================
   REFRESH DISPLAY
========================================================= */

export function refreshAssessmentLatencyScreen() {

  let container =
    getAssessmentLatencyContainer();


  if (!container) {

    const initialized =
      initializeAssessmentLatencyDisplay();


    if (
      !initialized.success
    ) {

      return initialized;

    }


    container =
      initialized.container;

  }


  try {

    const result =
      refreshAssessmentLatencyDisplay(
        container
      );


    if (
      result &&
      result.success === true
    ) {

      container.setAttribute(
        "data-spd-wiring-status",
        "READY"
      );

    }


    return result;

  }

  catch (error) {

    container.setAttribute(
      "data-spd-wiring-status",
      "FAILED"
    );


    setWiringState(
      "FAILED",
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


    if (pass) {

      setWiringState(
        "READY"
      );


      container.setAttribute(
        "data-spd-wiring-status",
        "READY"
      );

    } else {

      setWiringState(
        "FAILED",
        "DISPLAY_OR_CONTAINER_VERIFICATION_FAILED"
      );

    }


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

    setWiringState(
      "FAILED",
      error
    );


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


  const internalState =
    getInternalWiringState();


  let status =
    "WAITING_FOR_CONTAINER";


  if (
    internalState.state ===
    "FAILED"
  ) {

    status =
      "FAILED";

  }

  else if (
    container
  ) {

    const domStatus =
      container.getAttribute(
        "data-spd-wiring-status"
      );


    if (
      domStatus ===
      "READY"
    ) {

      status =
        "CONNECTED";

    }

    else if (
      domStatus ===
      "RENDERED"
    ) {

      status =
        "INITIALIZING";

    }

    else {

      status =
        "CONNECTED";

    }

  }


  return {

    module:
      LATENCY_WIRING_ID,

    version:
      LATENCY_WIRING_VERSION,

    status,

    internalState:
      internalState.state,

    error:
      internalState.error,

    containerId:
      LATENCY_CONTAINER_ID,

    containerAvailable:
      container !== null,

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

    autonomousExecution:
      false,

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
   * IMPORTANT:
   *
   * Only return alreadyInitialized when the previous
   * initialization actually succeeded.
   *
   * A failed initialization MUST be retryable.
   */

  if (
    typeof window !== "undefined" &&
    window[
      INITIALIZATION_FLAG
    ] === true
  ) {

    const verification =
      verifyAssessmentLatencyDisplayWiring();


    if (
      verification.status ===
      "PASS"
    ) {

      return {

        success:
          true,

        alreadyInitialized:
          true,

        wiring:
          getAssessmentLatencyDisplayWiringStatus(),

        verification

      };

    }


    /*
     * Previous state was not healthy.
     *
     * Clear the flag so initialization can retry.
     */

    window[
      INITIALIZATION_FLAG
    ] = false;

  }


  setWiringState(
    "INITIALIZING"
  );


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
        getAssessmentLatencyDisplayWiringStatus()

    };

  }


  const listeners =
    registerAssessmentLatencyDisplayListeners();


  const verification =
    verifyAssessmentLatencyDisplayWiring();


  const result = {

    success:
      verification.status ===
      "PASS",

    wiring:
      getAssessmentLatencyDisplayWiringStatus(),

    display,

    listeners,

    verification

  };


  /*
   * CRITICAL:
   *
   * Only mark the module initialized after a
   * successful verification.
   */

  if (
    typeof window !== "undefined"
  ) {

    window[
      INITIALIZATION_FLAG
    ] =
      result.success === true;

  }


  if (
    result.success
  ) {

    setWiringState(
      "READY"
    );

  }

  else {

    setWiringState(
      "FAILED",
      "ASSESSMENT_LATENCY_WIRING_VERIFICATION_FAILED"
    );

  }


  latencyLog(
    "Assessment Latency Display initialization result",
    result
  );


  return result;

}


/* =========================================================
   BROWSER BUTTON HANDLERS
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
   * Display-only functions.
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
 * Robust browser startup.
 *
 * 1. Expose API immediately.
 * 2. Wait for DOM when required.
 * 3. Retry after DOM is available.
 * 4. Never lock a failed initialization.
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


  /*
   * Expose browser API immediately.
   *
   * This allows the live cockpit buttons to find
   * the functions even while DOM initialization is pending.
   */

  if (
    typeof window !== "undefined"
  ) {

    exposeAssessmentLatencyBrowserAPI();

  }


  const start =
    () => {

      try {

        const result =
          initializeAssessmentLatencyDisplayWiring();


        if (
          result.success
        ) {

          latencyLog(
            "Automatic initialization PASS",
            result
          );

        }

        else {

          latencyLog(
            "Automatic initialization did not verify",
            result
          );

        }


        return result;

      }

      catch (error) {

        setWiringState(
          "FAILED",
          error
        );


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


  /*
   * DOM already available.
   */

  if (
    document.readyState !==
    "loading"
  ) {

    return start();

  }


  /*
   * DOM still loading.
   */

  document.addEventListener(
    "DOMContentLoaded",
    start,
    {
      once:
        true
    }
  );


  setWiringState(
    "WAITING_FOR_DOM"
  );


  return {

    success:
      true,

    status:
      "WAITING_FOR_DOM_CONTENT_LOADED",

    measurementOnly:
      true

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


/* =========================================================
   AUTOMATIC START
========================================================= */

autoInitializeAssessmentLatencyDisplay();