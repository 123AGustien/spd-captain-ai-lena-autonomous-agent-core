/**
 * SPD v13.1 — Assessment Latency Display
 *
 * VERSION: 1.0.1
 *
 * PURPOSE:
 * Display measured execution latency from the authoritative
 * Assessment Latency Integration layer.
 *
 * IMPORTANT:
 *
 * - DISPLAY ONLY.
 * - READS LATENCY MEASUREMENTS.
 * - DOES NOT EXECUTE SPD.
 * - DOES NOT EXECUTE THE GOLDEN RULE ENGINE.
 * - DOES NOT MODIFY RISK.
 * - DOES NOT MODIFY RESILIENCE.
 * - DOES NOT MODIFY DECISIONS.
 * - DOES NOT MODIFY ACTIONS.
 * - DOES NOT MODIFY DOMAIN RULE ENGINES.
 * - DOES NOT MODIFY DOMAIN THRESHOLDS.
 * - DOES NOT MODIFY HUMAN DECISION AUTHORITY.
 * - DOES NOT REPLACE THE EXISTING COCKPIT.
 * - DOES NOT MODIFY EXISTING COCKPIT CONTROLS.
 *
 * ARCHITECTURE:
 *
 * AssessmentLatencyIntegration
 *             ↓
 * AssessmentLatencyDisplay
 *             ↓
 * Dedicated latency container
 *             ↓
 * Existing SPD Cockpit
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
 * The latency layer observes/measures execution.
 * It does NOT become part of the decision authority.
 */


/* =========================================================
   IMPORT AUTHORITATIVE LATENCY INTEGRATION
========================================================= */

import {
  getCompletedMeasurements,
  getMeasurementCount,
  getLatencyIntegrationStatus,
  validateLatencyIntegration
} from "./assessmentLatencyIntegration.js";


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
   AUTHORITATIVE SOURCE
========================================================= */

const LATENCY_SOURCE =
  "assessmentLatencyIntegration.js";


/* =========================================================
   SUPPORTED LATENCY STAGES
 *
 * These mirror the Assessment Latency Integration layer.
 *
 * They are informational display stages only.
 * They do not redefine the Golden Rule Engine.
========================================================= */

const LATENCY_STAGES = Object.freeze([

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

]);


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
   FIND LATEST MEASUREMENT
 *
 * Supports the actual structure returned by
 * assessmentLatencyIntegration.js.
 *
 * Stage is stored directly as:
 *
 * record.stage
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


        const directStage =
          record.stage;


        const contextStage =
          record.context?.stage;


        const metadataStage =
          record.metadata?.stage;


        return (

          directStage === stage ||

          contextStage === stage ||

          metadataStage === stage

        );

      }
    );


  if (
    matches.length === 0
  ) {

    return null;

  }


  return matches[
    matches.length - 1
  ];

}


/* =========================================================
   BUILD STAGE DISPLAY
 *
 * IMPORTANT:
 *
 * The authoritative integration stores latency as:
 *
 * durationMs
 *
 * NOT elapsedMs.
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

      durationMs:
        null,

      display:
        "N/A",

      status:
        "WAITING"

    };

  }


  const durationMs =
    safeNumber(
      record.durationMs
    );


  return {

    stage,

    elapsedMs:
      durationMs,

    durationMs,

    display:
      formatLatency(
        durationMs
      ),

    status:
      durationMs === null
        ? "INVALID"
        : "MEASURED",

    measurementId:
      record.measurementId ||
      record.key ||
      null,

    timestamp:
      record.timestamp ||
      record.recordedAt ||
      null,

    context:
      record.context
        ? {
            ...record.context
          }
        : {}

  };

}


/* =========================================================
   CALCULATE LATENCY STATISTICS
 *
 * Statistics are calculated from the measurements supplied
 * by the measurement-only integration layer.
 *
 * No SPD engine values are changed.
========================================================= */

function calculateLatencyStatistics(
  records
) {

  const durations =
    Array.isArray(records)

      ? records
          .map(
            record =>
              safeNumber(
                record?.durationMs
              )
          )
          .filter(
            value =>
              value !== null
          )

      : [];


  if (
    durations.length === 0
  ) {

    return {

      count:
        0,

      minimumMs:
        null,

      maximumMs:
        null,

      averageMs:
        null

    };

  }


  const minimumMs =
    Math.min(
      ...durations
    );


  const maximumMs =
    Math.max(
      ...durations
    );


  const averageMs =
    durations.reduce(
      (
        sum,
        value
      ) =>
        sum + value,
      0
    ) /
    durations.length;


  return {

    count:
      durations.length,

    minimumMs,

    maximumMs,

    averageMs

  };

}


/* =========================================================
   GET ASSESSMENT LATENCY DISPLAY
========================================================= */

export function getAssessmentLatencyDisplay() {

  /*
   * Read completed measurements only.
   *
   * This does not execute anything.
   */

  const catalogue =
    getCompletedMeasurements();


  const statistics =
    calculateLatencyStatistics(
      catalogue
    );


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
      LATENCY_SOURCE,

    sourceStatus:
      SOURCE_STATUS,

    measurementOnly:
      true,

    measurementCount:
      getMeasurementCount(),

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

    integrationStatus:
      getLatencyIntegrationStatus(),

    protection: {

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

      scenarioLogic:
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
    !LATENCY_STAGES.includes(
      stage
    )
  ) {

    return {

      stage,

      elapsedMs:
        null,

      durationMs:
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

    measurementCount:
      display.measurementCount,

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

    measurementCountLine:
      `Measurements: ${display.measurementCount}`,

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
      "⚠️ LATENCY DISPLAY DOES NOT CONTROL SYSTEM DECISIONS"

  };

}


/* =========================================================
   ESCAPE HTML
 *
 * Protects the display layer when values are inserted
 * into the dedicated latency container.
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
 * display container supplied by the wiring layer.
 *
 * It does NOT replace the existing cockpit.
 * It does NOT modify existing cockpit controls.
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


          const measurementId =
            escapeHtml(
              measurement.measurementId ||
              "N/A"
            );


          return `

            <div
              class="spd-latency-row"
              data-stage="${stage}"
            >

              <span
                class="spd-latency-stage"
              >
                ${stage}
              </span>

              <span
                class="spd-latency-value"
              >
                ${value}
              </span>

              <span
                class="spd-latency-status"
              >
                ${status}
              </span>

              <span
                class="spd-latency-measurement-id"
              >
                ${measurementId}
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


      <div
        class="spd-latency-source"
      >

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


        <div>

          ${escapeHtml(
            model.measurementCountLine
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

    recordedMeasurements:
      model.statistics.samples,

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
    "spd-assessment-latency-container"
) {

  return renderAssessmentLatencyDisplayById(
    containerId
  );

}


/* =========================================================
   VERIFY DISPLAY INTEGRATION
 *
 * This verifies the display layer and the measurement
 * integration layer only.
 *
 * It does NOT test the Golden Rule Engine.
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

      display.protection.cockpit ===
        "UNCHANGED" &&

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

      display.protection.scenarioLogic ===
        "UNCHANGED";


    const integrationValidation =
      validateLatencyIntegration();


    const integrationValid =
      integrationValidation &&
      integrationValidation.status ===
        "PASS";


    const pass =
      display.id ===
        LATENCY_DISPLAY_ID &&

      display.mode ===
        LATENCY_DISPLAY_MODE &&

      display.source ===
        LATENCY_SOURCE &&

      display.measurementOnly ===
        true &&

      validStages &&

      protectionValid &&

      integrationValid;


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

      sourceStatus:
        display.sourceStatus,

      measurementOnly:
        display.measurementOnly,

      measurementCount:
        display.measurementCount,

      stages:
        LATENCY_STAGES,

      integration:
        integrationValidation,

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

  let integrationStatus;


  try {

    integrationStatus =
      getLatencyIntegrationStatus();

  }

  catch (error) {

    integrationStatus = {

      status:
        "ERROR",

      error:
        error.message

    };

  }


  return {

    status:
      "ACTIVE",

    display:
      LATENCY_DISPLAY_ID,

    source:
      LATENCY_SOURCE,

    mode:
      LATENCY_DISPLAY_MODE,

    sourceStatus:
      SOURCE_STATUS,

    measurementOnly:
      true,

    measurementCount:
      getMeasurementCount(),

    integration:
      integrationStatus,

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
   EXPORT DISPLAY CONSTANTS
========================================================= */

export {

  LATENCY_DISPLAY_ID,

  LATENCY_DISPLAY_TITLE,

  LATENCY_DISPLAY_MODE,

  SOURCE_STATUS,

  LATENCY_SOURCE,

  LATENCY_STAGES,

  safeNumber,

  formatLatency,

  findLatestMeasurement,

  buildStageDisplay,

  calculateLatencyStatistics

};