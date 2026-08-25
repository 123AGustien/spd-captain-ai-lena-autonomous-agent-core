/**
 * =========================================================
 * SPD v13.1 — ASSESSMENT LATENCY DISPLAY
 * =========================================================
 *
 * Read-only presentation layer for the Assessment Latency
 * Observer.
 *
 * VERSION
 * 1.0.1
 *
 * IMPORTANT:
 * - Does not execute SPD decisions.
 * - Does not execute domain rules.
 * - Does not execute recovery actions.
 * - Does not modify thresholds.
 * - Does not modify risk classification.
 * - Does not modify resilience calculations.
 * - Does not modify Human Decision Authority.
 * - Does not write to the latency catalogue.
 * - Does not fabricate latency measurements.
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
 *
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


/* =========================================================
   DISPLAY METADATA
========================================================= */

const DISPLAY_VERSION = "1.0.1";

const DISPLAY_STATUS = Object.freeze({
  READY: "READY",
  RENDERED: "RENDERED",
  ERROR: "DISPLAY ERROR"
});

const DISPLAY_MODE = "MEASUREMENT ONLY";

const ARCHITECTURE_PROTECTION = "ACTIVE";


/* =========================================================
   SAFE VALUE HELPERS
========================================================= */

/**
 * Return a safe numeric value.
 */
function toFiniteNumber(value) {

  const numeric =
    Number(value);

  return Number.isFinite(numeric)
    ? numeric
    : null;

}


/**
 * Return a safe display string.
 */
function safeString(
  value,
  fallback = "UNSPECIFIED"
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return fallback;

  }

  return String(value);

}


/* =========================================================
   DISPLAY MODEL
========================================================= */

/**
 * Return the current read-only Assessment Latency
 * display model.
 */
export function getAssessmentLatencyDisplay() {

  try {

    const model =
      getLatencyDisplayModel();

    return {

      success:
        true,

      version:
        DISPLAY_VERSION,

      status:
        DISPLAY_STATUS.READY,

      mode:
        DISPLAY_MODE,

      title:
        "SPD v13.1 — ASSESSMENT LATENCY MONITOR",

      model,

      architectureProtection:
        ARCHITECTURE_PROTECTION,

      autonomousExecution:
        false,

      decisionAuthority:
        "UNCHANGED"

    };

  }

  catch (error) {

    return {

      success:
        false,

      version:
        DISPLAY_VERSION,

      status:
        DISPLAY_STATUS.ERROR,

      mode:
        DISPLAY_MODE,

      error:
        error instanceof Error
          ? error.message
          : String(error),

      architectureProtection:
        ARCHITECTURE_PROTECTION,

      autonomousExecution:
        false

    };

  }

}


/* =========================================================
   DISPLAY SUMMARY
========================================================= */

/**
 * Build a compact display summary.
 *
 * Read-only.
 */
export function getAssessmentLatencyDisplaySummary() {

  try {

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
        observerStatus?.status ||
        "UNKNOWN",

      mode:
        DISPLAY_MODE,

      recordCount:
        Number.isFinite(
          statistics?.count
        )
          ? statistics.count
          : 0,

      minimumMs:
        toFiniteNumber(
          statistics?.minimumMs
        ),

      maximumMs:
        toFiniteNumber(
          statistics?.maximumMs
        ),

      averageMs:
        toFiniteNumber(
          statistics?.averageMs
        ),

      totalMs:
        toFiniteNumber(
          statistics?.totalMs
        ),

      architectureProtection:
        ARCHITECTURE_PROTECTION,

      autonomousExecution:
        false,

      decisionAuthority:
        "UNCHANGED"

    };

  }

  catch (error) {

    return {

      title:
        "ASSESSMENT LATENCY MONITOR",

      version:
        DISPLAY_VERSION,

      status:
        DISPLAY_STATUS.ERROR,

      mode:
        DISPLAY_MODE,

      recordCount:
        0,

      minimumMs:
        null,

      maximumMs:
        null,

      averageMs:
        null,

      totalMs:
        null,

      error:
        error instanceof Error
          ? error.message
          : String(error),

      architectureProtection:
        ARCHITECTURE_PROTECTION,

      autonomousExecution:
        false,

      decisionAuthority:
        "UNCHANGED"

    };

  }

}


/* =========================================================
   STAGE DISPLAY
========================================================= */

export function getAssessmentLatencyStageDisplay() {

  return getStageLatencyStatistics();

}


/* =========================================================
   DOMAIN DISPLAY
========================================================= */

export function getAssessmentLatencyDomainDisplay() {

  return getDomainLatencyStatistics();

}


/* =========================================================
   SCENARIO DISPLAY
========================================================= */

export function getAssessmentLatencyScenarioDisplay() {

  return getScenarioLatencyStatistics();

}


/* =========================================================
   READ-ONLY RECORD SNAPSHOT
========================================================= */

/**
 * Return a safe copy of all measurements.
 *
 * IMPORTANT:
 * This function never mutates the observer catalogue.
 */
export function getAssessmentLatencyRecords() {

  const catalogue =
    getLatencyCatalogue();

  if (
    !Array.isArray(catalogue)
  ) {

    return [];

  }

  return catalogue.map(
    record => ({

      ...record,

      metadata: {

        ...(record?.metadata || {})

      },

      result: {

        ...(record?.result || {})

      }

    })
  );

}


/* =========================================================
   FORMAT LATENCY
========================================================= */

/**
 * Format milliseconds for human-readable display.
 */
export function formatLatencyMs(
  value
) {

  const numeric =
    toFiniteNumber(value);

  if (
    numeric === null
  ) {

    return "NO MEASUREMENT";

  }

  return `${numeric.toFixed(3)} ms`;

}


/* =========================================================
   BUILD DISPLAY ROWS
========================================================= */

/**
 * Create display rows for the latency catalogue.
 */
export function buildAssessmentLatencyRows() {

  const records =
    getAssessmentLatencyRecords();

  return records.map(
    record => ({

      measurementId:
        safeString(
          record?.measurementId
        ),

      timestamp:
        safeString(
          record?.timestamp
        ),

      engine:
        safeString(
          record?.metadata?.engine
        ),

      domain:
        safeString(
          record?.metadata?.domain,
          "CORE"
        ),

      ruleId:
        safeString(
          record?.metadata?.ruleId
        ),

      scenario:
        safeString(
          record?.metadata?.scenario
        ),

      stage:
        safeString(
          record?.metadata?.stage
        ),

      intensity:
        record?.metadata?.intensity ??
        null,

      latency:
        formatLatencyMs(
          record?.elapsedMs
        ),

      status:
        safeString(
          record?.result?.status,
          "MEASURED"
        ),

      validationStatus:
        safeString(
          record?.metadata?.validationStatus,
          "NOT_SPECIFIED"
        )

    })
  );

}


/* =========================================================
   DISPLAY CONTAINER VALIDATION
========================================================= */

/**
 * Validate the presentation container.
 *
 * The display layer accepts a normal DOM element only.
 */
export function verifyAssessmentLatencyDisplayContainer(
  container
) {

  const valid =
    Boolean(
      container &&
      typeof container === "object" &&
      typeof container.innerHTML === "string"
    );

  return {

    status:
      valid
        ? "PASS"
        : "FAIL",

    containerAvailable:
      valid,

    mode:
      DISPLAY_MODE,

    architectureProtection:
      ARCHITECTURE_PROTECTION,

    decisionAuthority:
      "UNCHANGED",

    autonomousExecution:
      false

  };

}


/* =========================================================
   RENDER DISPLAY
========================================================= */

/**
 * Render the Assessment Latency display.
 *
 * Presentation only.
 *
 * This function:
 *
 * - reads measurement data
 * - builds HTML
 * - writes HTML to the supplied display container
 *
 * It does NOT:
 *
 * - execute SPD decisions
 * - execute domain engines
 * - execute recovery actions
 * - modify latency measurements
 * - modify Golden Rule state
 * - modify Human Decision Authority
 */
export function renderAssessmentLatencyDisplay(
  container
) {

  const containerVerification =
    verifyAssessmentLatencyDisplayContainer(
      container
    );

  if (
    containerVerification.status !== "PASS"
  ) {

    throw new Error(
      "Assessment Latency display container unavailable"
    );

  }


  const display =
    getAssessmentLatencyDisplay();

  if (
    !display.success
  ) {

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

                <td>
                  ${escapeHtml(
                    row.measurementId
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.engine
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.domain
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.scenario
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.stage
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.latency
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    row.status
                  )}
                </td>

              </tr>

            `
          )
          .join("")

      : `

          <tr>

            <td colspan="7">

              NO MEASUREMENTS RECORDED

            </td>

          </tr>

        `;


  container.innerHTML = `

    <section
      class="assessment-latency-monitor"
      data-assessment-latency-display="true"
      data-display-version="${DISPLAY_VERSION}"
      data-display-mode="${DISPLAY_MODE}"
    >

      <header>

        <h2>
          SPD v13.1 — ASSESSMENT LATENCY MONITOR
        </h2>

        <div>
          Status:
          <strong>
            ${escapeHtml(
              summary.status
            )}
          </strong>
        </div>

        <div>
          Mode:
          <strong>
            ${DISPLAY_MODE}
          </strong>
        </div>

        <div>
          Display Version:
          <strong>
            ${DISPLAY_VERSION}
          </strong>
        </div>

      </header>


      <section
        class="assessment-latency-summary"
      >

        <div>

          <strong>
            Measurements
          </strong>

          <span>
            ${summary.recordCount}
          </span>

        </div>


        <div>

          <strong>
            Minimum
          </strong>

          <span>
            ${formatLatencyMs(
              summary.minimumMs
            )}
          </span>

        </div>


        <div>

          <strong>
            Maximum
          </strong>

          <span>
            ${formatLatencyMs(
              summary.maximumMs
            )}
          </span>

        </div>


        <div>

          <strong>
            Average
          </strong>

          <span>
            ${formatLatencyMs(
              summary.averageMs
            )}
          </span>

        </div>


        <div>

          <strong>
            Total
          </strong>

          <span>
            ${formatLatencyMs(
              summary.totalMs
            )}
          </span>

        </div>

      </section>


      <section
        class="assessment-latency-records"
      >

        <h3>
          Latency Measurements
        </h3>


        <table>

          <thead>

            <tr>

              <th>
                Measurement ID
              </th>

              <th>
                Engine
              </th>

              <th>
                Domain
              </th>

              <th>
                Scenario
              </th>

              <th>
                Stage
              </th>

              <th>
                Latency
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            ${rowHtml}

          </tbody>

        </table>

      </section>


      <section
        class="assessment-latency-protection"
      >

        <h3>
          Architecture Protection
        </h3>

        <div>
          Golden Rule Engine:
          <strong>
            UNCHANGED
          </strong>
        </div>

        <div>
          Domain Rule Engines:
          <strong>
            UNCHANGED
          </strong>
        </div>

        <div>
          Decision Logic:
          <strong>
            UNCHANGED
          </strong>
        </div>

        <div>
          Action Logic:
          <strong>
            UNCHANGED
          </strong>
        </div>

        <div>
          Human Decision Authority:
          <strong>
            UNCHANGED
          </strong>
        </div>

      </section>


      <footer>

        <div>
          Architecture Protection:
          <strong>
            ACTIVE
          </strong>
        </div>

        <div>
          Decision Authority:
          <strong>
            UNCHANGED
          </strong>
        </div>

        <div>
          Autonomous Execution:
          <strong>
            FALSE
          </strong>
        </div>

        <div>
          Measurement Fabrication:
          <strong>
            FALSE
          </strong>
        </div>

      </footer>

    </section>

  `;


  return {

    success:
      true,

    version:
      DISPLAY_VERSION,

    status:
      DISPLAY_STATUS.RENDERED,

    mode:
      DISPLAY_MODE,

    recordCount:
      summary.recordCount,

    architectureProtection:
      ARCHITECTURE_PROTECTION,

    autonomousExecution:
      false,

    decisionAuthority:
      "UNCHANGED"

  };

}


/* =========================================================
   HTML ESCAPING
========================================================= */

/**
 * Escape display values before inserting them into HTML.
 */
function escapeHtml(
  value
) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   DISPLAY MODULE VERIFICATION
========================================================= */

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

    const rows =
      buildAssessmentLatencyRows();


    const displayValid =
      Boolean(
        display &&
        display.success === true
      );


    const recordsValid =
      Array.isArray(records);


    const rowsValid =
      Array.isArray(rows);


    return {

      status:
        displayValid &&
        recordsValid &&
        rowsValid
          ? "PASS"
          : "FAIL",

      displayModule:
        true,

      observerConnected:
        true,

      displayModelAvailable:
        displayValid,

      recordsAvailable:
        recordsValid,

      rowsAvailable:
        rowsValid,

      recordCount:
        summary.recordCount,

      mode:
        DISPLAY_MODE,

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

      autonomousExecution:
        false,

      latencyFabrication:
        false,

      architectureProtection:
        ARCHITECTURE_PROTECTION

    };

  }

  catch (error) {

    return {

      status:
        "FAIL",

      displayModule:
        true,

      observerConnected:
        false,

      mode:
        DISPLAY_MODE,

      error:
        error instanceof Error
          ? error.message
          : String(error),

      architectureProtection:
        ARCHITECTURE_PROTECTION,

      autonomousExecution:
        false

    };

  }

}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {

  getAssessmentLatencyDisplay,

  getAssessmentLatencyDisplaySummary,

  getAssessmentLatencyStageDisplay,

  getAssessmentLatencyDomainDisplay,

  getAssessmentLatencyScenarioDisplay,

  getAssessmentLatencyRecords,

  formatLatencyMs,

  buildAssessmentLatencyRows,

  verifyAssessmentLatencyDisplayContainer,

  renderAssessmentLatencyDisplay,

  verifyAssessmentLatencyDisplay

};