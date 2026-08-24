/**
 * SPD v13.1 — Assessment Latency Display
 *
 * PURPOSE:
 * Display measured execution latency on the existing SPD cockpit.
 *
 * SOURCE:
 * assessmentLatency.js
 *
 * ARCHITECTURE:
 *
 * assessmentLatency.js
 *          ↓
 * assessmentLatencyDisplay.js
 *          ↓
 * Dedicated latency display container
 *          ↓
 * Existing SPD Cockpit
 *
 * IMPORTANT:
 * - DISPLAY ONLY.
 * - Reads latency measurements.
 * - Does NOT calculate or modify SPD risk.
 * - Does NOT modify Golden Rule Engine.
 * - Does NOT modify Domain Rule Engines.
 * - Does NOT modify domain thresholds.
 * - Does NOT modify resilience calculations.
 * - Does NOT modify decisions.
 * - Does NOT modify actions.
 * - Does NOT modify Human Decision Authority.
 * - Does NOT replace existing cockpit content.
 * - Does NOT modify existing cockpit controls.
 *
 * Golden Rule Engine:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Domain Rule Engines remain independent and authoritative.
 */


/* =========================================================
   IMPORT LATENCY SOURCE
========================================================= */

import {
  getLatencyCatalogue,
  getLatencyStatistics
} from "./assessmentLatency.js";


/* =========================================================
   DISPLAY IDENTIFIER
========================================================= */

const LATENCY_DISPLAY_ID =
  "SPD_V13_1_ASSESSMENT_LATENCY_MONITOR";


/* =========================================================
   DISPLAY TITLE
========================================================= */

const LATENCY_DISPLAY_TITLE =
  "⏱️ ASSESSMENT LATENCY MONITOR";


/* =========================================================
   DISPLAY MODE
========================================================= */

const LATENCY_DISPLAY_MODE =
  "MEASUREMENT_ONLY";


/* =========================================================
   SOURCE STATUS
========================================================= */

const SOURCE_STATUS =
  "READ_ONLY";


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

  if (numeric === null) {

    return "N/A";

  }

  return `${numeric.toFixed(3)} ms`;

}


/* =========================================================
   FIND LATEST MEASUREMENT
========================================================= */

function findLatestMeasurement(
  stage,
  catalogue
) {

  const records =
    Array.isArray(catalogue)
      ? catalogue
      : [];


  const matches =
    records.filter(
      record => {

        if (!record) {

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


  if (matches.length === 0) {

    return null;

  }


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


  if (!record) {

    return {

      stage,

      elapsedMs:
        null,

      display:
        "N/A",

      status:
        "WAITING"

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
   BUILD LATENCY DISPLAY DATA
========================================================= */

export function getAssessmentLatencyDisplay() {

  const catalogue =
    getLatencyCatalogue();


  const statistics =
    getLatencyStatistics();


  const stages =
    {};


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

      cockpitControls:
        "UNCHANGED"

    },

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   GET SINGLE STAGE VALUE
========================================================= */

export function getLatencyStageValue(
  stage
) {

  if (
    !LATENCY_STAGES.includes(stage)
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
   BUILD HUMAN-READABLE SCREEN MODEL
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
          display.stages[stage]
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
      "⚠️ LATENCY DISPLAY DOES NOT CONTROL SYSTEM DECISIONS"

  };

}


/* =========================================================
   ESCAPE HTML
 *
 * Protects the display layer when values are inserted
 * into the dedicated display container.
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
   RENDER TO EXISTING DOM
 *
 * IMPORTANT:
 *
 * This function ONLY writes to the dedicated latency
 * display container supplied by the cockpit.
 *
 * It does NOT replace the existing cockpit.
 * It does NOT modify any existing cockpit control.
========================================================= */

export function renderAssessmentLatencyDisplay(
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


  const model =
    buildLatencyScreenModel();


  const rows =
    model.measurements
      .map(
        measurement => {

          const stage =
            escapeHtml(
              measurement.stage
            );

          const value =
            escapeHtml(
              measurement.display
            );

          const status =
            escapeHtml(
              measurement.status
            );


          return `

            <div class="spd-latency-row">

              <span class="spd-latency-stage">
                ${stage}
              </span>

              <span class="spd-latency-value">
                ${value}
              </span>

              <span class="spd-latency-status">
                ${status}
              </span>

            </div>

          `;

        }
      )
      .join("");


  container.innerHTML = `

    <section
      id="${LATENCY_DISPLAY_ID}"
      class="spd-assessment-latency-monitor"
      aria-label="${escapeHtml(
        LATENCY_DISPLAY_TITLE
      )}"
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

    measurements:
      model.measurements.length,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   REFRESH EXISTING LATENCY DISPLAY
========================================================= */

export function refreshAssessmentLatencyDisplay(
  container
) {

  return renderAssessmentLatencyDisplay(
    container
  );

}


/* =========================================================
   AUTO-FIND DEDICATED DISPLAY CONTAINER
 *
 * This does NOT create or replace the cockpit.
 *
 * It only searches for a dedicated latency container.
========================================================= */

export function renderAssessmentLatencyDisplayById(
  containerId =
    "assessment-latency-display"
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


  if (!container) {

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
    "assessment-latency-display"
) {

  return renderAssessmentLatencyDisplayById(
    containerId
  );

}


/* =========================================================
   CHECK DISPLAY INTEGRATION
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

      display.protection.cockpitControls ===
        "UNCHANGED";


    const pass =
      display.id ===
        LATENCY_DISPLAY_ID &&

      display.mode ===
        "MEASUREMENT_ONLY" &&

      display.source ===
        "assessmentLatency.js" &&

      display.measurementOnly ===
        true &&

      validStages &&

      protectionValid;


    return {

      module:
        "SPD v13.1 Assessment Latency Display",

      status:
        pass
          ? "PASS"
          : "FAIL",

      displayId:
        display.id,

      source:
        display.source,

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
   DISPLAY INTEGRATION STATUS
========================================================= */

export function getAssessmentLatencyDisplayStatus() {

  return {

    status:
      "ACTIVE",

    display:
      LATENCY_DISPLAY_ID,

    source:
      "assessmentLatency.js",

    mode:
      LATENCY_DISPLAY_MODE,

    sourceStatus:
      SOURCE_STATUS,

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

    resilienceCalculations:
      "UNCHANGED",

    decisions:
      "UNCHANGED",

    actions:
      "UNCHANGED",

    humanDecisionAuthority:
      "UNCHANGED",

    cockpitControls:
      "UNCHANGED",

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORT DISPLAY CONSTANTS
========================================================= */

export {

  LATENCY_DISPLAY_ID,

  LATENCY_DISPLAY_TITLE,

  LATENCY_DISPLAY_MODE,

  SOURCE_STATUS,

  LATENCY_STAGES,

  safeNumber,

  formatLatency,

  findLatestMeasurement,

  buildStageDisplay

};