/**
 * SPD v13.1 — Assessment Latency Display
 *
 * PURPOSE:
 * Display measured execution latency on the existing SPD cockpit.
 *
 * ARCHITECTURE:
 *
 * AssessmentLatencyObserver
 *          ↓
 * assessmentLatencyDisplay.js
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
 * - Does NOT modify the existing cockpit controls.
 *
 * Golden Rule Engine:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Domain Rule Engines remain independent and authoritative.
 */


/* =========================================================
   IMPORT LATENCY OBSERVER
========================================================= */

import {
  getLatencyCatalogue,
  getLatencyStatistics
} from "./assessmentLatencyObserver.js";


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
   OBSERVER STATUS
========================================================= */

const OBSERVER_STATUS =
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
      record =>
        record &&
        record.metadata &&
        record.metadata.stage === stage
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

    observer:
      "AssessmentLatencyObserver",

    observerStatus:
      OBSERVER_STATUS,

    measurementOnly:
      true,

    stages,

    statistics: {

      count:
        safeNumber(
          statistics.count,
          0
        ),

      minimumMs:
        safeNumber(
          statistics.minimumMs
        ),

      maximumMs:
        safeNumber(
          statistics.maximumMs
        ),

      averageMs:
        safeNumber(
          statistics.averageMs
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

    observer:
      display.observer,

    observerStatus:
      display.observerStatus,

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

    observerLine:
      `Observer: ${display.observer}`,

    modeLine:
      `Mode: ${display.mode}`,

    statusLine:
      `Status: ${display.observerStatus}`,

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
      "⚠️ LATENCY OBSERVER DOES NOT CONTROL SYSTEM DECISIONS"

  };

}


/* =========================================================
   RENDER TO EXISTING DOM
 *
 * This function only updates the dedicated latency
 * display container.
 *
 * It does NOT replace or modify the existing cockpit.
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
        measurement => `

          <div class="spd-latency-row">

            <span class="spd-latency-stage">
              ${measurement.stage}
            </span>

            <span class="spd-latency-value">
              ${measurement.display}
            </span>

            <span class="spd-latency-status">
              ${measurement.status}
            </span>

          </div>

        `
      )
      .join("");


  container.innerHTML = `

    <section
      id="${LATENCY_DISPLAY_ID}"
      class="spd-assessment-latency-monitor"
      aria-label="${LATENCY_DISPLAY_TITLE}"
    >

      <h2>
        ${model.sectionTitle}
      </h2>

      <div class="spd-latency-observer">

        <div>
          ${model.observerLine}
        </div>

        <div>
          ${model.modeLine}
        </div>

        <div>
          ${model.statusLine}
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
          ${model.statistics.samples}
        </div>

        <div>
          Minimum:
          ${model.statistics.minimum}
        </div>

        <div>
          Maximum:
          ${model.statistics.maximum}
        </div>

        <div>
          Average:
          ${model.statistics.average}
        </div>

      </div>


      <div
        class="spd-latency-protection"
      >

        ${model.protectionMessage}

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


    const pass =
      display.id ===
        LATENCY_DISPLAY_ID &&

      display.mode ===
        "MEASUREMENT_ONLY" &&

      display.observer ===
        "AssessmentLatencyObserver" &&

      display.measurementOnly ===
        true &&

      validStages;


    return {

      module:
        "SPD v13.1 Assessment Latency Display",

      status:
        pass
          ? "PASS"
          : "FAIL",

      displayId:
        display.id,

      observer:
        display.observer,

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
   EXPORT DISPLAY CONSTANTS
========================================================= */

export {

  LATENCY_DISPLAY_ID,

  LATENCY_DISPLAY_TITLE,

  LATENCY_DISPLAY_MODE,

  OBSERVER_STATUS,

  LATENCY_STAGES,

  safeNumber,

  formatLatency,

  findLatestMeasurement,

  buildStageDisplay

};