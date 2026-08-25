/**
 * SPD v13.1 — Assessment Latency Display Wiring
 *
 * Measurement-only UI wiring layer.
 *
 * IMPORTANT:
 * - Does not execute SPD decisions.
 * - Does not execute domain rules.
 * - Does not execute recovery actions.
 * - Does not modify the Golden Rule Engine.
 * - Does not modify domain thresholds.
 * - Does not modify risk classification.
 * - Does not modify resilience calculations.
 * - Does not modify Human Decision Authority.
 *
 * The wiring layer only connects display controls to the
 * Assessment Latency Display presentation functions.
 */

import {
  getAssessmentLatencyDisplay,
  renderAssessmentLatencyDisplay
} from "./assessmentLatencyDisplay.js";

const WIRING_VERSION = "1.0.0";

const WIRING_STATUS = Object.freeze({
  READY: "READY",
  INITIALIZED: "INITIALIZED",
  ERROR: "WIRING ERROR"
});

let initialized = false;
let boundContainer = null;
let boundControls = Object.freeze({});

/**
 * Return deterministic wiring metadata.
 */
export function getAssessmentLatencyDisplayWiringStatus() {
  return Object.freeze({
    version: WIRING_VERSION,
    status: initialized
      ? WIRING_STATUS.INITIALIZED
      : WIRING_STATUS.READY,
    mode: "MEASUREMENT ONLY",
    initialized,
    architectureProtection: "ACTIVE"
  });
}

/**
 * Locate the latency display container.
 */
function findDisplayContainer(root = document) {
  return (
    root.querySelector("#assessment-latency-display") ||
    root.querySelector("[data-assessment-latency-display]") ||
    root.querySelector(".assessment-latency-display")
  );
}

/**
 * Refresh only the Assessment Latency display.
 *
 * This function reads measurement data and updates
 * presentation only.
 */
export function refreshAssessmentLatencyDisplay(
  container = boundContainer
) {
  if (!container) {
    return {
      status: WIRING_STATUS.ERROR,
      error: "Assessment Latency display container unavailable"
    };
  }

  try {
    const display = renderAssessmentLatencyDisplay(container);

    return {
      status: WIRING_STATUS.INITIALIZED,
      mode: "MEASUREMENT ONLY",
      recordCount: display.recordCount,
      architectureProtection: "ACTIVE"
    };
  } catch (error) {
    return {
      status: WIRING_STATUS.ERROR,
      error:
        error instanceof Error
          ? error.message
          : String(error)
    };
  }
}

/**
 * Initialize the Assessment Latency display wiring.
 *
 * The function only binds display controls.
 */
export function initializeAssessmentLatencyDisplayWiring(
  root = document
) {
  try {
    const container = findDisplayContainer(root);

    if (!container) {
      return {
        status: WIRING_STATUS.ERROR,
        initialized: false,
        error:
          "Assessment Latency display container not found"
      };
    }

    boundContainer = container;

    const initializeButton =
      root.querySelector(
        "#initialize-assessment-latency"
      ) ||
      root.querySelector(
        "[data-action='initialize-assessment-latency']"
      );

    const refreshButton =
      root.querySelector(
        "#refresh-assessment-latency"
      ) ||
      root.querySelector(
        "[data-action='refresh-assessment-latency']"
      );

    const verifyButton =
      root.querySelector(
        "#verify-assessment-latency"
      ) ||
      root.querySelector(
        "[data-action='verify-assessment-latency']"
      );

    if (initializeButton) {
      initializeButton.addEventListener(
        "click",
        () => refreshAssessmentLatencyDisplay()
      );
    }

    if (refreshButton) {
      refreshButton.addEventListener(
        "click",
        () => refreshAssessmentLatencyDisplay()
      );
    }

    if (verifyButton) {
      verifyButton.addEventListener(
        "click",
        () =>
          verifyAssessmentLatencyDisplayWiring(root)
      );
    }

    boundControls = Object.freeze({
      initialize: Boolean(initializeButton),
      refresh: Boolean(refreshButton),
      verify: Boolean(verifyButton)
    });

    initialized = true;

    refreshAssessmentLatencyDisplay();

    return {
      status: WIRING_STATUS.INITIALIZED,
      initialized: true,
      mode: "MEASUREMENT ONLY",
      controls: boundControls,
      architectureProtection: "ACTIVE"
    };
  } catch (error) {
    return {
      status: WIRING_STATUS.ERROR,
      initialized: false,
      error:
        error instanceof Error
          ? error.message
          : String(error)
    };
  }
}

/**
 * Verify that the display wiring is available.
 *
 * Verification only.
 * No SPD decision or engine execution occurs.
 */
export function verifyAssessmentLatencyDisplayWiring(
  root = document
) {
  const container = findDisplayContainer(root);

  const displayAvailable =
    typeof getAssessmentLatencyDisplay === "function";

  const renderAvailable =
    typeof renderAssessmentLatencyDisplay === "function";

  return Object.freeze({
    status:
      container &&
      displayAvailable &&
      renderAvailable
        ? "PASS"
        : "FAIL",

    displayContainer: Boolean(container),
    displayModule: displayAvailable,
    renderFunction: renderAvailable,
    wiringModule: true,

    mode: "MEASUREMENT ONLY",

    architectureProtection: {
      cockpit: "UNCHANGED",
      goldenRuleEngine: "UNCHANGED",
      domainRuleEngines: "UNCHANGED",
      decisionLogic: "UNCHANGED",
      actionLogic: "UNCHANGED",
      humanDecisionAuthority: "UNCHANGED"
    }
  });
}

/**
 * Return a read-only snapshot of the current wiring state.
 */
export function getAssessmentLatencyDisplayWiringSnapshot() {
  return Object.freeze({
    version: WIRING_VERSION,
    initialized,
    status: initialized
      ? WIRING_STATUS.INITIALIZED
      : WIRING_STATUS.READY,
    mode: "MEASUREMENT ONLY",
    controls: boundControls,
    architectureProtection: "ACTIVE"
  });
}

/**
 * Automatic browser initialization.
 *
 * This only initializes the latency display wiring
 * when loaded in a browser environment.
 */
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        initializeAssessmentLatencyDisplayWiring(
          document
        );
      },
      { once: true }
    );
  } else {
    initializeAssessmentLatencyDisplayWiring(document);
  }
}
