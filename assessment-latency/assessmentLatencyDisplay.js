/**
 * SPD v13.1 — Assessment Latency Display
 *
 * Measurement-only presentation layer.
 *
 * IMPORTANT:
 * - Does not execute SPD decisions.
 * - Does not execute domain rules.
 * - Does not execute recovery actions.
 * - Does not modify Golden Rule logic.
 * - Does not modify Human Decision Authority.
 * - Does not fabricate or infer latency measurements.
 */

import {
  getLatencyCatalogue
} from "./assessmentLatency.js";

const DISPLAY_VERSION = "1.0.0";

const DISPLAY_STATUS = Object.freeze({
  READY: "READY",
  NO_MEASUREMENTS: "NO MEASUREMENTS RECORDED",
  ERROR: "DISPLAY ERROR"
});

/**
 * Return the current assessment-latency display model.
 *
 * This function only reads the latency catalogue.
 * It never writes to or modifies the catalogue.
 */
export function getAssessmentLatencyDisplay() {
  try {
    const catalogue = getLatencyCatalogue();

    const records = Array.isArray(catalogue)
      ? catalogue
      : Array.isArray(catalogue?.records)
        ? catalogue.records
        : [];

    return {
      version: DISPLAY_VERSION,
      mode: "MEASUREMENT ONLY",
      status:
        records.length > 0
          ? DISPLAY_STATUS.READY
          : DISPLAY_STATUS.NO_MEASUREMENTS,
      recordCount: records.length,
      records: [...records],
      architectureProtection: {
        cockpit: "UNCHANGED",
        goldenRuleEngine: "UNCHANGED",
        domainRuleEngines: "UNCHANGED",
        decisionAuthority: "PROTECTED",
        humanDecisionAuthority: "UNCHANGED",
        actionLogic: "UNCHANGED"
      }
    };
  } catch (error) {
    return {
      version: DISPLAY_VERSION,
      mode: "MEASUREMENT ONLY",
      status: DISPLAY_STATUS.ERROR,
      recordCount: 0,
      records: [],
      error: error instanceof Error
        ? error.message
        : String(error),
      architectureProtection: {
        decisionAuthority: "PROTECTED",
        humanDecisionAuthority: "UNCHANGED"
      }
    };
  }
}

/**
 * Format the display model as deterministic text.
 *
 * Presentation only.
 */
export function formatAssessmentLatencyDisplay() {
  const display = getAssessmentLatencyDisplay();

  const lines = [
    "SPD v13.1 — Assessment Latency Display",
    `Version: ${display.version}`,
    `Operating Mode: ${display.mode}`,
    `Status: ${display.status}`,
    `Recorded Measurements: ${display.recordCount}`,
    "",
    "Architecture Protection:",
    `Cockpit: ${display.architectureProtection.cockpit}`,
    `Golden Rule Engine: ${display.architectureProtection.goldenRuleEngine}`,
    `Domain Rule Engines: ${display.architectureProtection.domainRuleEngines}`,
    `Decision Authority: ${display.architectureProtection.decisionAuthority}`,
    `Human Decision Authority: ${display.architectureProtection.humanDecisionAuthority}`,
    `Action Logic: ${display.architectureProtection.actionLogic}`
  ];

  if (display.recordCount === 0) {
    lines.push(
      "",
      "NO MEASUREMENTS RECORDED",
      "No latency values fabricated, estimated, or inferred."
    );
  }

  return lines.join("\n");
}

/**
 * Render the display into a supplied DOM container.
 *
 * This function is presentation-only.
 * It does not invoke any SPD engine or decision function.
 */
export function renderAssessmentLatencyDisplay(container) {
  if (!container) {
    throw new Error("Assessment Latency display container unavailable");
  }

  const display = getAssessmentLatencyDisplay();

  container.textContent = "";

  const heading = document.createElement("h2");
  heading.textContent = "Assessment Latency Display";

  const status = document.createElement("p");
  status.textContent = `Status: ${display.status}`;

  const mode = document.createElement("p");
  mode.textContent = `Operating Mode: ${display.mode}`;

  const count = document.createElement("p");
  count.textContent = `Recorded Measurements: ${display.recordCount}`;

  container.appendChild(heading);
  container.appendChild(status);
  container.appendChild(mode);
  container.appendChild(count);

  if (display.recordCount === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      "No latency measurements recorded. No latency values fabricated, estimated, or inferred.";
    container.appendChild(empty);
  }

  return display;
}

/**
 * Read-only display metadata.
 */
export function getAssessmentLatencyDisplayStatus() {
  const display = getAssessmentLatencyDisplay();

  return Object.freeze({
    version: display.version,
    mode: display.mode,
    status: display.status,
    recordCount: display.recordCount
  });
}