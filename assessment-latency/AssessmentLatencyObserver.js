/**
 * SPD v13.1 — Assessment Latency Observer
 *
 * File:
 * /assessment-latency/AssessmentLatencyObserver.js
 *
 * PURPOSE:
 * Measurement-only observer for execution latency.
 *
 * IMPORTANT:
 * This module MUST NOT modify:
 * - Golden Rule Engine
 * - Domain Rule Engines
 * - Domain thresholds
 * - Risk classification
 * - Resilience calculations
 * - Decision logic
 * - Action logic
 * - Human Decision Authority
 * - Existing cockpit controls
 * - Existing scenario logic
 *
 * GOLDEN RULE:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * This observer only measures execution timing.
 *
 * It does not become an authority in the Golden Rule pipeline.
 */


/* =========================================================
   CONSTANTS
========================================================= */

const OBSERVER_NAME =
  "SPD v13.1 Assessment Latency Observer";

const OBSERVER_VERSION =
  "1.0.0";

const MEASUREMENT_POLICY =
  "MEASUREMENT_ONLY";


/* =========================================================
   INTERNAL LATENCY CATALOGUE
========================================================= */

const latencyCatalogue = [];


/* =========================================================
   DETERMINISTIC MEASUREMENT SEQUENCE
========================================================= */

let measurementSequence = 0;


/* =========================================================
   SUPPORTED STAGES
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

  "END_TO_END",

  "DOMAIN_ASSESS"

]);


/* =========================================================
   HIGH-RESOLUTION CLOCK
========================================================= */

function now() {

  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {

    return performance.now();

  }

  return Date.now();

}


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
   CREATE MEASUREMENT ID
========================================================= */

function createMeasurementId() {

  measurementSequence += 1;

  return `LATENCY-${measurementSequence}`;

}


/* =========================================================
   START LATENCY MEASUREMENT
========================================================= */

export function startLatencyMeasurement(
  metadata = {}
) {

  const measurementId =
    metadata.measurementId ||
    createMeasurementId();

  const startTime =
    now();

  const timestamp =
    new Date().toISOString();


  return {

    measurementId,

    startTime,

    timestamp,

    metadata: {

      engine:
        metadata.engine ||
        "UNKNOWN",

      domain:
        metadata.domain ||
        null,

      ruleId:
        metadata.ruleId ||
        null,

      stage:
        metadata.stage ||
        "UNKNOWN",

      scenario:
        metadata.scenario ||
        null

    },

    measurementPolicy:
      MEASUREMENT_POLICY

  };

}


/* =========================================================
   END LATENCY MEASUREMENT
========================================================= */

export function endLatencyMeasurement(
  measurement,
  result = {}
) {

  if (
    !measurement ||
    typeof measurement !== "object"
  ) {

    throw new Error(
      "INVALID_LATENCY_MEASUREMENT"
    );

  }


  const endTime =
    now();


  const startTime =
    safeNumber(
      measurement.startTime
    );


  if (startTime === null) {

    throw new Error(
      "INVALID_LATENCY_START_TIME"
    );

  }


  const elapsedMs =
    Math.max(
      0,
      endTime - startTime
    );


  const record = {

    measurementId:
      measurement.measurementId ||
      createMeasurementId(),

    elapsedMs,

    timestamp:
      measurement.timestamp ||
      new Date().toISOString(),

    recordedAt:
      new Date().toISOString(),

    metadata: {

      ...(measurement.metadata || {})

    },

    result: {

      ...(result || {})

    },

    measurementPolicy:
      MEASUREMENT_POLICY

  };


  /*
   * IMPORTANT:
   *
   * Only the latency catalogue is modified here.
   *
   * No SPD decision state is changed.
   */

  latencyCatalogue.push(
    record
  );


  return {

    ...record

  };

}


/* =========================================================
   DIRECT LATENCY RECORD
========================================================= */

export function recordLatency(
  record = {}
) {

  if (
    !record ||
    typeof record !== "object"
  ) {

    return {

      success:
        false,

      error:
        "INVALID_LATENCY_RECORD"

    };

  }


  const elapsedMs =
    safeNumber(
      record.elapsedMs
    );


  if (
    elapsedMs === null ||
    elapsedMs < 0
  ) {

    return {

      success:
        false,

      error:
        "INVALID_LATENCY_VALUE"

    };

  }


  const measurementId =
    record.measurementId ||
    createMeasurementId();


  const normalizedRecord = {

    measurementId,

    elapsedMs,

    timestamp:
      record.timestamp ||
      new Date().toISOString(),

    recordedAt:
      record.recordedAt ||
      new Date().toISOString(),

    metadata: {

      engine:
        record.engine ||
        record.metadata?.engine ||
        "UNKNOWN",

      domain:
        record.domain ||
        record.metadata?.domain ||
        null,

      ruleId:
        record.ruleId ||
        record.metadata?.ruleId ||
        null,

      stage:
        record.stage ||
        record.metadata?.stage ||
        "UNKNOWN",

      scenario:
        record.scenario ||
        record.metadata?.scenario ||
        null

    },

    result: {

      ...(record.result || {})

    },

    measurementPolicy:
      MEASUREMENT_POLICY

  };


  latencyCatalogue.push(
    normalizedRecord
  );


  return {

    success:
      true,

    record:
      {

        ...normalizedRecord,

        metadata: {

          ...normalizedRecord.metadata

        },

        result: {

          ...normalizedRecord.result

        }

      }

  };

}


/* =========================================================
   GET LATENCY CATALOGUE
========================================================= */

export function getLatencyCatalogue() {

  return latencyCatalogue.map(
    record => ({

      ...record,

      metadata: {

        ...(record.metadata || {})

      },

      result: {

        ...(record.result || {})

      }

    })
  );

}


/* =========================================================
   GET LATENCY STATISTICS
========================================================= */

export function getLatencyStatistics() {

  const values =
    latencyCatalogue

      .map(
        record =>
          safeNumber(
            record.elapsedMs
          )
      )

      .filter(
        value =>
          value !== null
      );


  if (
    values.length === 0
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
      ...values
    );


  const maximumMs =
    Math.max(
      ...values
    );


  const totalMs =
    values.reduce(
      (
        total,
        value
      ) =>
        total + value,
      0
    );


  const averageMs =
    totalMs /
    values.length;


  return {

    count:
      values.length,

    minimumMs,

    maximumMs,

    averageMs

  };

}


/* =========================================================
   CLEAR LATENCY CATALOGUE
========================================================= */

export function clearLatencyCatalogue() {

  latencyCatalogue.length = 0;


  return {

    success:
      true,

    status:
      "LATENCY_CATALOGUE_CLEARED"

  };

}


/* =========================================================
   GET OBSERVER STATUS
========================================================= */

export function getAssessmentLatencyObserverStatus() {

  return {

    module:
      OBSERVER_NAME,

    version:
      OBSERVER_VERSION,

    status:
      "ACTIVE",

    measurementOnly:
      true,

    measurementPolicy:
      MEASUREMENT_POLICY,

    catalogueRecords:
      latencyCatalogue.length,

    authority: {

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
        "UNCHANGED"

    },

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   VALIDATE OBSERVER
========================================================= */

export function validateAssessmentLatencyObserver() {

  try {

    const catalogue =
      getLatencyCatalogue();


    const statistics =
      getLatencyStatistics();


    const validCatalogue =
      Array.isArray(
        catalogue
      );


    const validStatistics =
      statistics &&
      typeof statistics.count ===
        "number";


    const pass =
      validCatalogue &&
      validStatistics;


    return {

      module:
        OBSERVER_NAME,

      version:
        OBSERVER_VERSION,

      status:
        pass
          ? "PASS"
          : "FAIL",

      measurementOnly:
        true,

      catalogueCount:
        catalogue.length,

      statistics,

      protection: {

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

        cockpit:
          "UNCHANGED"

      },

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      module:
        OBSERVER_NAME,

      version:
        OBSERVER_VERSION,

      status:
        "FAIL",

      measurementOnly:
        true,

      error:
        error.message,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   RESET SEQUENCE
========================================================= */

export function resetLatencyMeasurementSequence() {

  measurementSequence = 0;


  return {

    success:
      true,

    status:
      "LATENCY_SEQUENCE_RESET"

  };

}


/* =========================================================
   EXPORT CONSTANTS
========================================================= */

export {

  OBSERVER_NAME,

  OBSERVER_VERSION,

  MEASUREMENT_POLICY,

  LATENCY_STAGES,

  safeNumber

};


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {

  startLatencyMeasurement,

  endLatencyMeasurement,

  recordLatency,

  getLatencyCatalogue,

  getLatencyStatistics,

  clearLatencyCatalogue,

  getAssessmentLatencyObserverStatus,

  validateAssessmentLatencyObserver,

  resetLatencyMeasurementSequence

};