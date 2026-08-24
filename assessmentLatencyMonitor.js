/**
 * SPD v13.1 — ASSESSMENT LATENCY MONITOR
 *
 * READ-ONLY DISPLAY / MEASUREMENT CONSUMER
 *
 * IMPORTANT:
 * - Does NOT modify the Golden Rule Engine.
 * - Does NOT modify Domain Rule Engines.
 * - Does NOT modify cockpit decision logic.
 * - Does NOT modify risk thresholds.
 * - Does NOT modify decisions.
 * - Does NOT authorize execution.
 *
 * Purpose:
 * Expose measured latency values from the
 * Assessment Latency Integration layer.
 *
 * Architecture:
 *
 * Golden Rule Engine  ───────┐
 *                            │
 * Domain Rule Engines ───────┼──> Latency Measurement
 *                            │          │
 * Captain AI Lena ───────────┘          ↓
 *                              Assessment Latency Catalogue
 *                                         ↓
 *                              Read-Only Latency Monitor
 */


/* =========================================================
   IMPORTS
========================================================= */

import latencyCatalogue from "./assessmentLatencyCatalogue.json";


/* =========================================================
   CONFIGURATION
========================================================= */

const LATENCY_CATALOGUE_VERSION =
  latencyCatalogue.catalogue.version;

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
    return "— ms";
  }

  return `${numeric.toFixed(2)} ms`;

}


/* =========================================================
   EMPTY LATENCY SNAPSHOT
========================================================= */

function createEmptySnapshot() {

  const snapshot = {};

  LATENCY_STAGES.forEach(
    stage => {

      snapshot[stage] = {
        durationMs: null,
        display: "— ms",
        measured: false
      };

    }
  );

  return snapshot;

}


/* =========================================================
   BUILD LATENCY SNAPSHOT
========================================================= */

export function buildLatencySnapshot(
  records = []
) {

  const snapshot =
    createEmptySnapshot();

  if (!Array.isArray(records)) {
    return snapshot;
  }


  records.forEach(
    record => {

      if (!record) {
        return;
      }

      const stage =
        record.stage;

      if (
        !LATENCY_STAGES.includes(stage)
      ) {
        return;
      }

      const durationMs =
        safeNumber(
          record.durationMs
        );

      if (durationMs === null) {
        return;
      }

      snapshot[stage] = {

        durationMs,

        display:
          formatLatency(
            durationMs
          ),

        measured:
          true,

        scenario:
          record.context?.scenario ||
          "UNSPECIFIED",

        domain:
          record.context?.domain ||
          "CORE",

        recordedAt:
          record.recordedAt ||
          null

      };

    }
  );


  return snapshot;

}


/* =========================================================
   LATEST MEASUREMENT PER STAGE
========================================================= */

export function getLatestLatencySnapshot(
  records = []
) {

  const latest = {};

  if (!Array.isArray(records)) {
    return createEmptySnapshot();
  }


  records.forEach(
    record => {

      if (!record) {
        return;
      }

      const stage =
        record.stage;

      if (
        !LATENCY_STAGES.includes(stage)
      ) {
        return;
      }

      const durationMs =
        safeNumber(
          record.durationMs
        );

      if (durationMs === null) {
        return;
      }


      const existing =
        latest[stage];


      if (
        !existing ||
        String(
          record.recordedAt || ""
        ) >
        String(
          existing.recordedAt || ""
        )
      ) {

        latest[stage] =
          record;

      }

    }
  );


  return buildLatencySnapshot(
    Object.values(latest)
  );

}


/* =========================================================
   LATENCY SUMMARY
========================================================= */

export function calculateLatencySummary(
  records = []
) {

  const validRecords =
    Array.isArray(records)
      ? records.filter(
          record =>
            record &&
            Number.isFinite(
              Number(
                record.durationMs
              )
            )
        )
      : [];


  if (
    validRecords.length === 0
  ) {

    return {

      measurements:
        0,

      minimumMs:
        null,

      maximumMs:
        null,

      averageMs:
        null,

      latestMs:
        null

    };

  }


  const values =
    validRecords.map(
      record =>
        Number(
          record.durationMs
        )
    );


  const minimumMs =
    Math.min(
      ...values
    );

  const maximumMs =
    Math.max(
      ...values
    );

  const averageMs =
    values.reduce(
      (
        total,
        value
      ) =>
        total + value,
      0
    ) /
    values.length;


  const latestRecord =
    validRecords
      .slice()
      .sort(
        (
          a,
          b
        ) =>
          String(
            b.recordedAt || ""
          ).localeCompare(
            String(
              a.recordedAt || ""
            )
          )
      )[0];


  return {

    measurements:
      values.length,

    minimumMs,

    maximumMs,

    averageMs,

    latestMs:
      Number(
        latestRecord.durationMs
      )

  };

}


/* =========================================================
   DOMAIN LATENCY SUMMARY
========================================================= */

export function calculateDomainLatency(
  records = []
) {

  const domains = {};

  if (!Array.isArray(records)) {
    return domains;
  }


  records.forEach(
    record => {

      if (!record) {
        return;
      }

      const durationMs =
        safeNumber(
          record.durationMs
        );

      if (durationMs === null) {
        return;
      }


      const domain =
        record.context?.domain ||
        "CORE";


      if (!domains[domain]) {

        domains[domain] = {

          measurements:
            0,

          totalMs:
            0,

          averageMs:
            null,

          minimumMs:
            null,

          maximumMs:
            null

        };

      }


      const data =
        domains[domain];


      data.measurements += 1;

      data.totalMs += durationMs;


      data.minimumMs =
        data.minimumMs === null
          ? durationMs
          : Math.min(
              data.minimumMs,
              durationMs
            );


      data.maximumMs =
        data.maximumMs === null
          ? durationMs
          : Math.max(
              data.maximumMs,
              durationMs
            );


      data.averageMs =
        data.totalMs /
        data.measurements;

    }
  );


  return domains;

}


/* =========================================================
   DISPLAY MODEL
========================================================= */

export function getLatencyDisplayModel(
  records = []
) {

  const snapshot =
    getLatestLatencySnapshot(
      records
    );

  const summary =
    calculateLatencySummary(
      records
    );

  const domains =
    calculateDomainLatency(
      records
    );


  return {

    title:
      "ASSESSMENT LATENCY MONITOR",

    catalogue:
      "SPD v13.1 Assessment Latency Catalogue",

    catalogueVersion:
      LATENCY_CATALOGUE_VERSION,

    status:
      "MEASUREMENT ONLY",

    readOnly:
      true,

    engineModification:
      false,

    goldenRuleEngine:
      "UNCHANGED",

    domainRuleEngines:
      "UNCHANGED",

    cockpitDecisionLogic:
      "UNCHANGED",

    humanAuthorization:
      "UNCHANGED",

    stages:
      snapshot,

    summary,

    domains,

    generatedAt:
      new Date().toISOString()

  };

}


/* =========================================================
   SCREEN DISPLAY DATA
========================================================= */

export function getLatencyScreenData(
  records = []
) {

  const model =
    getLatencyDisplayModel(
      records
    );


  return {

    panelTitle:
      model.title,

    status:
      model.status,

    catalogueVersion:
      model.catalogueVersion,

    rows:
      LATENCY_STAGES.map(
        stage => {

          const item =
            model.stages[stage];


          return {

            stage,

            durationMs:
              item.durationMs,

            display:
              item.display,

            measured:
              item.measured

          };

        }
      ),

    summary: {

      measurements:
        model.summary.measurements,

      minimum:
        formatLatency(
          model.summary.minimumMs
        ),

      maximum:
        formatLatency(
          model.summary.maximumMs
        ),

      average:
        formatLatency(
          model.summary.averageMs
        ),

      latest:
        formatLatency(
          model.summary.latestMs
        )

    },

    protection: {

      measurementOnly:
        true,

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED",

      executionAuthority:
        "HUMAN_OPERATOR"

    }

  };

}


/* =========================================================
   INTEGRATION STATUS
========================================================= */

export function getLatencyMonitorStatus() {

  return {

    status:
      "ACTIVE",

    catalogue:
      "CONNECTED",

    catalogueVersion:
      LATENCY_CATALOGUE_VERSION,

    measurementOnly:
      true,

    readOnly:
      true,

    goldenRuleEngine:
      "UNCHANGED",

    domainRuleEngines:
      "UNCHANGED",

    cockpit:
      "DISPLAY_ONLY",

    decisionLogic:
      "UNCHANGED",

    executionLogic:
      "UNCHANGED",

    humanAuthorization:
      "REQUIRED"

  };

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  LATENCY_STAGES,

  LATENCY_CATALOGUE_VERSION,

  safeNumber,

  formatLatency,

  createEmptySnapshot

};