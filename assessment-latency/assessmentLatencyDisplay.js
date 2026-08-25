/**
 * =========================================================
 * SPD v13.1 — ASSESSMENT LATENCY DISPLAY
 * =========================================================
 *
 * Read-only presentation layer for the Assessment Latency
 * Observer.
 *
 * IMPORTANT:
 * - Does not execute SPD decisions.
 * - Does not execute domain rules.
 * - Does not execute recovery actions.
 * - Does not modify thresholds.
 * - Does not modify risk classification.
 * - Does not modify resilience calculations.
 * - Does not modify Human Decision Authority.
 *
 * Architecture:
 *
 * ASSESSMENT LATENCY OBSERVER
 *            ↓
 *     DISPLAY MODEL
 *            ↓
 *     DISPLAY / COCKPIT
 *
 * Measurement data flows INTO this display.
 * Display output never flows back into decision authority.
 * =========================================================
 */

import {
  getLatencyDisplayModel,
  getLatencyCatalogue,
  getLatencyStatistics,
  getStageLatencyStatistics,
  getDomainLatencyStatistics,
  getScenarioLatencyStatistics,
  getLatencyObserverStatus
} from "./assessmentLatency.js";

const DISPLAY_VERSION = "1.0.0";

const DISPLAY_STATUS = Object.freeze({
  READY: "READY",
  RENDERED: "RENDERED",
  ERROR: "DISPLAY ERROR"
});

/**
 * Return the current read-only Assessment Latency display model.
 */
export function getAssessmentLatencyDisplay() {
  try {
    const model = getLatencyDisplayModel();

    return {
      success: true,

      version: DISPLAY_VERSION,

      status: DISPLAY_STATUS.READY,

      mode: "MEASUREMENT ONLY",

      title:
        "SPD v13.1 — ASSESSMENT LATENCY MONITOR",

      model,

      architectureProtection: "ACTIVE"
    };
  } catch (error) {
    return {
      success: false,

      version: DISPLAY_VERSION,

      status: DISPLAY_STATUS.ERROR,

      mode: "MEASUREMENT ONLY",

      error:
        error instanceof Error
          ? error.message
          : String(error),

      architectureProtection: "ACTIVE"
    };
  }
}

/**
 * Build a compact display summary.
 *
 * This function is read-only.
 */
export function getAssessmentLatencyDisplaySummary() {
  const statistics =
    getLatencyStatistics();

  const observerStatus =
    getLatencyObserverStatus();

  return {
    title:
      "ASSESSMENT LATENCY MONITOR",

    version:
      DISPLAY_VERSION,

    status:
      observerStatus.status,

    mode:
      "MEASUREMENT ONLY",

    recordCount:
      statistics.count,

    minimumMs:
      statistics.minimumMs,

    maximumMs:
      statistics.maximumMs,

    averageMs:
      statistics.averageMs,

    totalMs:
      statistics.totalMs,

    architectureProtection:
      "ACTIVE",

    autonomousExecution:
      false
  };
}

/**
 * Return the latest latency measurements by stage.
 */
export function getAssessmentLatencyStageDisplay() {
  return getStageLatencyStatistics();
}

/**
 * Return latency measurements grouped by domain.
 */
export function getAssessmentLatencyDomainDisplay() {
  return getDomainLatencyStatistics();
}

/**
 * Return latency measurements grouped by scenario.
 */
export function getAssessmentLatencyScenarioDisplay() {
  return getScenarioLatencyStatistics();
}

/**
 * Return a safe copy of all measurements for display.
 *
 * No mutation of the observer catalogue occurs.
 */
export function getAssessmentLatencyRecords() {
  return getLatencyCatalogue().map(record => ({
    ...record,

    metadata: {
      ...(record.metadata || {})
    },

    result: {
      ...(record.result || {})
    }
  }));
}

/**
 * Format milliseconds for human-readable display.
 */
export function formatLatencyMs(value) {
  const numeric =
    Number(value);

  if (!Number.isFinite(numeric)) {
    return "NO MEASUREMENT";
  }

  return `${numeric.toFixed(3)} ms`;
}

/**
 * Create display rows for the latency catalogue.
 */
export function buildAssessmentLatencyRows() {
  const records =
    getAssessmentLatencyRecords();

  return records.map(record => ({
    measurementId:
      record.measurementId || "UNSPECIFIED",

    timestamp:
      record.timestamp || "UNSPECIFIED",

    engine:
      record.metadata?.engine ||
      "UNSPECIFIED",

    domain:
      record.metadata?.domain ||
      "CORE",

    ruleId:
      record.metadata?.ruleId ||
      "UNSPECIFIED",

    scenario:
      record.metadata?.scenario ||
      "UNSPECIFIED",

    stage:
      record.metadata?.stage ||
      "UNSPECIFIED",

    intensity:
      record.metadata?.intensity ?? null,

    latency:
      formatLatencyMs(
        record.elapsedMs
      ),

    status:
      record.result?.status ||
      "MEASURED",

    validationStatus:
      record.metadata?.validationStatus ||
      "NOT_SPECIFIED"
  }));
}

/**
 * Render the Assessment Latency display.
 *
 * The supplied container is used only as a presentation target.
 */
export function renderAssessmentLatencyDisplay(
  container
) {
  if (
    !container ||
    typeof container !== "object"
  ) {
    throw new Error(
      "Assessment Latency display container unavailable"
    );
  }

  const display =
    getAssessmentLatencyDisplay();

  if (!display.success) {
    throw new Error(
      display.error ||
        "Assessment Latency display unavailable"
    );
  }

  const summary =
    getAssessmentLatencyDisplaySummary();

  const rows =
    buildAssessmentLatencyRows();

  const rowHtml =
    rows.length > 0
      ? rows
          .map(
            row => `
              <tr>
                <td>${escapeHtml(row.measurementId)}</td>
                <td>${escapeHtml(row.engine)}</td>
                <td>${escapeHtml(row.domain)}</td>
                <td>${escapeHtml(row.scenario)}</td>
                <td>${escapeHtml(row.stage)}</td>
                <td>${escapeHtml(row.latency)}</td>
                <td>${escapeHtml(row.status)}</td>
              </tr>
            `
          )
          .join("")
      : `
          <tr>
            <td colspan="7">
              NO MEASUREMENTS
            </td>
          </tr>
        `;

  container.innerHTML = `
    <section
      class="assessment-latency-monitor"
      data-assessment-latency-display="true"
    >
      <header>
        <h2>
          SPD v13.1 — ASSESSMENT LATENCY MONITOR
        </h2>

        <div>
          Status:
          <strong>
            ${escapeHtml(summary.status)}
          </strong>
        </div>

        <div>
          Mode:
          <strong>
            MEASUREMENT ONLY
          </strong>
        </div>
      </header>

      <section
        class="assessment-latency-summary"
      >
        <div>
          <strong>Measurements</strong>
          <span>
            ${summary.recordCount}
          </span>
        </div>

        <div>
          <strong>Minimum</strong>
          <span>
            ${formatLatencyMs(summary.minimumMs)}
          </span>
        </div>

        <div>
          <strong>Maximum</strong>
          <span>
            ${formatLatencyMs(summary.maximumMs)}
          </span>
        </div>

        <div>
          <strong>Average</strong>
          <span>
            ${formatLatencyMs(summary.averageMs)}
          </span>
        </div>

        <div>
          <strong>Total</strong>
          <span>
            ${formatLatencyMs(summary.totalMs)}
          </span>
        </div>
      </section>

      <section
        class="assessment-latency-records"
      >
        <h3>Latency Measurements</h3>

        <table>
          <thead>
            <tr>
              <th>Measurement ID</th>
              <th>Engine</th>
              <th>Domain</th>
              <th>Scenario</th>
              <th>Stage</th>
              <th>Latency</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${rowHtml}
          </tbody>
        </table>
      </section>

      <footer>
        <div>
          Architecture Protection:
          <strong>ACTIVE</strong>
        </div>

        <div>
          Decision Authority:
          <strong>UNCHANGED</strong>
        </div>

        <div>
          Autonomous Execution:
          <strong>FALSE</strong>
        </div>
      </footer>
    </section>
  `;

  return {
    success: true,

    version:
      DISPLAY_VERSION,

    status:
      DISPLAY_STATUS.RENDERED,

    mode:
      "MEASUREMENT ONLY",

    recordCount:
      summary.recordCount,

    architectureProtection:
      "ACTIVE"
  };
}

/**
 * Escape display values before inserting them into HTML.
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Verify the display module without executing
 * any SPD decision engine.
 */
export function verifyAssessmentLatencyDisplay() {
  try {
    const display =
      getAssessmentLatencyDisplay();

    const summary =
      getAssessmentLatencyDisplaySummary();

    const records =
      getAssessmentLatencyRecords();

    return {
      status:
        display.success &&
        Array.isArray(records)
          ? "PASS"
          : "FAIL",

      displayModule:
        true,

      observerConnected:
        true,

      recordCount:
        summary.recordCount,

      mode:
        "MEASUREMENT ONLY",

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED",

      actionLogic:
        "UNCHANGED",

      humanDecisionAuthority:
        "UNCHANGED",

      autonomousExecution:
        false,

      architectureProtection:
        "ACTIVE"
    };
  } catch (error) {
    return {
      status: "FAIL",

      displayModule:
        true,

      mode:
        "MEASUREMENT ONLY",

      error:
        error instanceof Error
          ? error.message
          : String(error),

      architectureProtection:
        "ACTIVE"
    };
  }
}

export default {
  getAssessmentLatencyDisplay,
  getAssessmentLatencyDisplaySummary,
  getAssessmentLatencyStageDisplay,
  getAssessmentLatencyDomainDisplay,
  getAssessmentLatencyScenarioDisplay,
  getAssessmentLatencyRecords,
  formatLatencyMs,
  buildAssessmentLatencyRows,
  renderAssessmentLatencyDisplay,
  verifyAssessmentLatencyDisplay
};