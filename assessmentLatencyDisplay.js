/**
 * SPD v13.1 — Assessment Latency Display
 *
 * VERSION: 1.2.1
 *
 * PURPOSE:
 * Display measured execution latency on a dedicated
 * SPD v13.1 assessment-latency display.
 *
 * ARCHITECTURE:
 *
 * assessmentLatency.js
 *          ↓
 * READ-ONLY LATENCY DATA
 *          ↓
 * assessmentLatencyDisplay.js
 *          ↓
 * Dedicated latency container
 *          ↓
 * Existing SPD Cockpit
 *
 *
 * =========================================================
 * CRITICAL ARCHITECTURAL RULE
 * =========================================================
 *
 * THIS MODULE IS DISPLAY ONLY.
 *
 * It:
 *
 * - READS latency measurements.
 * - DISPLAYS latency measurements.
 * - DOES NOT execute SPD engines.
 * - DOES NOT execute Captain AI Lena.
 * - DOES NOT execute Domain Rule Engines.
 * - DOES NOT calculate risk.
 * - DOES NOT calculate resilience.
 * - DOES NOT modify thresholds.
 * - DOES NOT modify decisions.
 * - DOES NOT modify actions.
 * - DOES NOT modify Human Decision Authority.
 * - DOES NOT replace the existing cockpit.
 * - DOES NOT modify existing cockpit controls.
 *
 *
 * GOLDEN RULE:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 *
 * The latency display observes recorded measurements only.
 *
 *
 * MEASUREMENT FLOW:
 *
 * EXISTING ENGINE
 *       ↓
 * LATENCY OBSERVER
 *       ↓
 * MEASUREMENT RECORD
 *       ↓
 * LATENCY CATALOGUE
 *       ↓
 * READ-ONLY DISPLAY
 *
 *
 * NEVER:
 *
 * DISPLAY → ENGINE
 *
 * NEVER:
 *
 * MEASUREMENT → DECISION
 */


/* =========================================================
   IMPORT LATENCY SOURCE
========================================================= */

import {
  getLatencyCatalogue,
  getLatencyStatistics
} from "./assessmentLatency.js";


/* =========================================================
   DISPLAY CONSTANTS
========================================================= */

const LATENCY_DISPLAY_ID =
  "SPD_V13_1_ASSESSMENT_LATENCY_MONITOR";

const LATENCY_DISPLAY_TITLE =
  "⏱️ ASSESSMENT LATENCY MONITOR";

const LATENCY_DISPLAY_MODE =
  "MEASUREMENT_ONLY";

const SOURCE_STATUS =
  "READ_ONLY";

const DISPLAY_VERSION =
  "1.2.1";


/* =========================================================
   SUPPORTED LATENCY STAGES
========================================================= */

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
   SAFE NUMBER
========================================================= */

function safeNumber(
  value,
  fallback = null
) {

  const numeric =
    Number(value);

  return Number.isFinite(numeric)
    ? numeric
    : fallback;

}


/* =========================================================
   FORMAT LATENCY
========================================================= */

function formatLatency(
  value
) {

  const numeric =
    safeNumber(value);

  if (
    numeric === null
  ) {

    return "N/A";

  }

  return `${numeric.toFixed(3)} ms`;

}


/* =========================================================
   NORMALIZE CATALOGUE
========================================================= */

function normalizeCatalogue(
  catalogue
) {

  if (
    Array.isArray(catalogue)
  ) {

    return catalogue;

  }


  /*
   * Supports both:
   *
   * getLatencyCatalogue() → []
   *
   * and
   *
   * getLatencyCatalogue() → { records: [] }
   */

  if (
    catalogue &&
    Array.isArray(catalogue.records)
  ) {

    return catalogue.records;

  }


  return [];

}


/* =========================================================
   FIND LATEST MEASUREMENT
========================================================= */

function findLatestMeasurement(
  stage,
  catalogue
) {

  const records =
    normalizeCatalogue(
      catalogue
    );


  const matches =
    records.filter(
      record => {

        if (
          !record ||
          typeof record !== "object"
        ) {

          return false;

        }


        const metadataStage =
          record.metadata?.stage;

        const directStage =
          record.stage;

        return (
          metadataStage === stage ||
          directStage === stage
        );

      }
    );


  if (
    matches.length === 0
  ) {

    return null;

  }


  /*
   * Catalogue order is treated as chronological
   * when no explicit timestamp sorting is required.
   *
   * The newest record is therefore the final match.
   */

  return matches[
    matches.length - 1
  ];

}


/* =========================================================
   BUILD STAGE DISPLAY
========================================================= */

function buildStageDisplay(
  stage,
  catalogue
) {

  const record =
    findLatestMeasurement(
      stage,
      catalogue
    );


  if (
    !record
  ) {

    return {

      stage,

      elapsedMs:
        null,

      display:
        "N/A",

      status:
        "WAITING",

      measurementId:
        null,

      timestamp:
        null

    };

  }


  const elapsedMs =
    safeNumber(
      record.elapsedMs
    );


  return {

    stage,

    elapsedMs,

    display:
      formatLatency(
        elapsedMs
      ),

    status:
      elapsedMs === null
        ? "INVALID"
        : "MEASURED",

    measurementId:
      record.measurementId ||
      null,

    timestamp:
      record.timestamp ||
      record.recordedAt ||
      null

  };

}


/* =========================================================
   GET ASSESSMENT LATENCY DISPLAY DATA
========================================================= */

export function getAssessmentLatencyDisplay() {

  let catalogue = [];

  let statistics = {};


  /*
   * Read-only source access.
   *
   * Any source failure must remain isolated
   * from the existing SPD architecture.
   */

  try {

    catalogue =
      getLatencyCatalogue();

  }

  catch (_) {

    catalogue = [];

  }


  try {

    statistics =
      getLatencyStatistics() ||
      {};

  }

  catch (_) {

    statistics = {};

  }


  const stages = {};


  LATENCY_STAGES.forEach(
    stage => {

      stages[stage] =
        buildStageDisplay(
          stage,
          catalogue
        );

    }
  );


  return {

    id:
      LATENCY_DISPLAY_ID,

    version:
      DISPLAY_VERSION,

    title:
      LATENCY_DISPLAY_TITLE,

    mode:
      LATENCY_DISPLAY_MODE,

    source:
      "assessmentLatency.js",

    sourceStatus:
      SOURCE_STATUS,

    measurementOnly:
      true,

    stages,

    statistics: {

      count:
        safeNumber(
          statistics?.count,
          0
        ),

      minimumMs:
        safeNumber(
          statistics?.minimumMs
        ),

      maximumMs:
        safeNumber(
          statistics?.maximumMs
        ),

      averageMs:
        safeNumber(
          statistics?.averageMs
        )

    },

    protection: {

      cockpit:
        "UNCHANGED",

      cockpitControls:
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
        false

    },

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   GET SINGLE LATENCY STAGE
========================================================= */

export function getLatencyStageValue(
  stage
) {

  if (
    !LATENCY_STAGES.includes(
      stage
    )
  ) {

    return {

      stage,

      elapsedMs:
        null,

      display:
        "N/A",

      status:
        "UNKNOWN_STAGE"

    };

  }


  const display =
    getAssessmentLatencyDisplay();


  return display.stages[
    stage
  ];

}


/* =========================================================
   GET LATENCY SUMMARY
========================================================= */

export function getAssessmentLatencySummary() {

  const display =
    getAssessmentLatencyDisplay();


  return {

    title:
      display.title,

    mode:
      display.mode,

    source:
      display.source,

    sourceStatus:
      display.sourceStatus,

    measurementOnly:
      display.measurementOnly,

    statistics:
      display.statistics,

    timestamp:
      display.timestamp

  };

}


/* =========================================================
   BUILD SCREEN MODEL
========================================================= */

export function buildLatencyScreenModel() {

  const display =
    getAssessmentLatencyDisplay();


  return {

    sectionTitle:
      display.title,

    sourceLine:
      `Source: ${display.source}`,

    modeLine:
      `Mode: ${display.mode}`,

    statusLine:
      `Status: ${display.sourceStatus}`,

    measurements:
      LATENCY_STAGES.map(
        stage =>
          display.stages[
            stage
          ]
      ),

    statistics: {

      samples:
        display.statistics.count,

      minimum:
        formatLatency(
          display.statistics.minimumMs
        ),

      maximum:
        formatLatency(
          display.statistics.maximumMs
        ),

      average:
        formatLatency(
          display.statistics.averageMs
        )

    },

    protectionMessage:
      "⚠️ MEASUREMENT ONLY — LATENCY DISPLAY DOES NOT CONTROL SYSTEM DECISIONS"

  };

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   RENDER DISPLAY
 *
 * ONLY WRITES TO THE SUPPLIED DEDICATED CONTAINER.
========================================================= */

export function renderAssessmentLatencyDisplay(
  container
) {

  if (
    !container
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_DISPLAY_CONTAINER_NOT_FOUND"

    };

  }


  const model =
    buildLatencyScreenModel();


  const rows =
    model.measurements
      .map(
        measurement => {

          return `

            <div class="spd-latency-row">

              <span class="spd-latency-stage">
                ${escapeHtml(
                  measurement.stage
                )}
              </span>

              <span class="spd-latency-value">
                ${escapeHtml(
                  measurement.display
                )}
              </span>

              <span class="spd-latency-status">
                ${escapeHtml(
                  measurement.status
                )}
              </span>

            </div>

          `;

        }
      )
      .join("");


  /*
   * IMPORTANT:
   *
   * innerHTML is restricted to the dedicated
   * latency container supplied by the wiring layer.
   *
   * No existing cockpit element is searched for,
   * replaced, or modified here.
   */

  container.innerHTML = `

    <section
      id="${LATENCY_DISPLAY_ID}"
      class="spd-assessment-latency-monitor"
      aria-label="${escapeHtml(
        LATENCY_DISPLAY_TITLE
      )}"
      data-spd-display-version="${DISPLAY_VERSION}"
      data-spd-mode="MEASUREMENT_ONLY"
      data-spd-source="assessmentLatency.js"
    >

      <h2>
        ${escapeHtml(
          model.sectionTitle
        )}
      </h2>

      <div class="spd-latency-source">

        <div>
          ${escapeHtml(
            model.sourceLine
          )}
        </div>

        <div>
          ${escapeHtml(
            model.modeLine
          )}
        </div>

        <div>
          ${escapeHtml(
            model.statusLine
          )}
        </div>

      </div>


      <div
        class="spd-latency-measurements"
        aria-label="Latency measurements"
      >

        ${rows}

      </div>


      <div
        class="spd-latency-statistics"
      >

        <h3>
          LATENCY STATISTICS
        </h3>

        <div>
          Samples:
          ${escapeHtml(
            model.statistics.samples
          )}
        </div>

        <div>
          Minimum:
          ${escapeHtml(
            model.statistics.minimum
          )}
        </div>

        <div>
          Maximum:
          ${escapeHtml(
            model.statistics.maximum
          )}
        </div>

        <div>
          Average:
          ${escapeHtml(
            model.statistics.average
          )}
        </div>

      </div>


      <div
        class="spd-latency-protection"
      >

        ${escapeHtml(
          model.protectionMessage
        )}

      </div>

    </section>

  `;


  return {

    success:
      true,

    displayId:
      LATENCY_DISPLAY_ID,

    version:
      DISPLAY_VERSION,

    measurements:
      model.measurements.length,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   REFRESH DISPLAY
========================================================= */

export function refreshAssessmentLatencyDisplay(
  container
) {

  return renderAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   RENDER BY CONTAINER ID
========================================================= */

export function renderAssessmentLatencyDisplayById(
  containerId =
    "spd-assessment-latency-container"
) {

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
      containerId
    );


  if (
    !container
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_DISPLAY_CONTAINER_NOT_FOUND",

      containerId

    };

  }


  return renderAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   REFRESH BY CONTAINER ID
========================================================= */

export function refreshAssessmentLatencyDisplayById(
  containerId =
    "spd-assessment-latency-container"
) {

  return renderAssessmentLatencyDisplayById(
    containerId
  );

}


/* =========================================================
   VERIFY DISPLAY
========================================================= */

export function verifyAssessmentLatencyDisplay() {

  try {

    const display =
      getAssessmentLatencyDisplay();


    const validStages =
      LATENCY_STAGES.every(
        stage =>
          display.stages &&
          display.stages[stage]
      );


    const protectionValid =
      display.protection &&
      display.protection.goldenRuleEngine ===
        "UNCHANGED" &&

      display.protection.domainRuleEngines ===
        "UNCHANGED" &&

      display.protection.domainThresholds ===
        "UNCHANGED" &&

      display.protection.riskClassification ===
        "UNCHANGED" &&

      display.protection.resilienceCalculations ===
        "UNCHANGED" &&

      display.protection.decisions ===
        "UNCHANGED" &&

      display.protection.actions ===
        "UNCHANGED" &&

      display.protection.humanDecisionAuthority ===
        "UNCHANGED" &&

      display.protection.cockpit ===
        "UNCHANGED" &&

      display.protection.cockpitControls ===
        "UNCHANGED" &&

      display.protection.autonomousExecution ===
        false;


    const pass =
      display.id ===
        LATENCY_DISPLAY_ID &&

      display.mode ===
        LATENCY_DISPLAY_MODE &&

      display.source ===
        "assessmentLatency.js" &&

      display.sourceStatus ===
        SOURCE_STATUS &&

      display.measurementOnly ===
        true &&

      validStages &&

      protectionValid;


    return {

      module:
        "SPD v13.1 Assessment Latency Display",

      version:
        DISPLAY_VERSION,

      status:
        pass
          ? "PASS"
          : "FAIL",

      displayId:
        display.id,

      source:
        display.source,

      sourceStatus:
        display.sourceStatus,

      mode:
        display.mode,

      measurementOnly:
        display.measurementOnly,

      stages:
        LATENCY_STAGES,

      protection:
        display.protection,

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      module:
        "SPD v13.1 Assessment Latency Display",

      version:
        DISPLAY_VERSION,

      status:
        "FAIL",

      error:
        error?.message ||
        String(error),

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   DISPLAY STATUS
========================================================= */

export function getAssessmentLatencyDisplayStatus() {

  return {

    status:
      "ACTIVE",

    display:
      LATENCY_DISPLAY_ID,

    version:
      DISPLAY_VERSION,

    source:
      "assessmentLatency.js",

    mode:
      LATENCY_DISPLAY_MODE,

    sourceStatus:
      SOURCE_STATUS,

    measurementOnly:
      true,

    autonomousExecution:
      false,

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

    cockpit:
      "UNCHANGED",

    cockpitControls:
      "UNCHANGED",

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORT DISPLAY CONSTANTS / HELPERS
========================================================= */

export {

  LATENCY_DISPLAY_ID,

  LATENCY_DISPLAY_TITLE,

  LATENCY_DISPLAY_MODE,

  SOURCE_STATUS,

  DISPLAY_VERSION,

  LATENCY_STAGES,

  safeNumber,

  formatLatency,

  findLatestMeasurement,

  buildStageDisplay

};