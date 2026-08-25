/**
 * =========================================================
 * SPD v13.1 — ASSESSMENT LATENCY OBSERVER
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Measure and catalogue execution latency across SPD
 * processing stages without modifying or controlling any
 * SPD decision engine.
 *
 *
 * ARCHITECTURE RULE
 * ---------------------------------------------------------
 * THIS MODULE IS MEASUREMENT-ONLY.
 *
 * It MUST NOT:
 *
 * - modify the Golden Rule Engine
 * - modify any Domain Rule Engine
 * - modify domain thresholds
 * - modify risk classification
 * - modify resilience calculations
 * - modify decisions
 * - modify actions
 * - authorize execution
 * - modify Human Decision Authority
 * - modify cockpit controls
 * - modify cockpit decision logic
 *
 *
 * SEPARATION
 * ---------------------------------------------------------
 *
 * DOMAIN RULE ENGINES
 *       ↓
 * DOMAIN ASSESSMENT
 *
 * GOLDEN RULE ENGINE
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * CAPTAIN AI LENA
 *       ↓
 * DECISION SUPPORT
 *
 * HUMAN OPERATOR
 *       ↓
 * FINAL AUTHORITY
 *
 * LATENCY OBSERVER
 *       ↓
 * MEASUREMENT ONLY
 *
 *
 * The latency observer observes execution timing only.
 * It does not participate in decision computation.
 *
 * =========================================================
 */


/* =========================================================
   INTERNAL LATENCY CATALOGUE
========================================================= */

const latencyCatalogue = [];


/* =========================================================
   STAGE DEFINITIONS
========================================================= */

export const LATENCY_STAGES = [

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
   SAFE HIGH-RESOLUTION CLOCK
========================================================= */

function getPerformanceNow() {

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

  return [

    "LAT",

    Date.now(),

    Math.random()
      .toString(36)
      .slice(2, 8)

  ].join("-");

}


/* =========================================================
   NORMALIZE METADATA
========================================================= */

function normalizeMetadata(
  metadata = {}
) {

  return {

    stage:
      metadata.stage ||
      "UNSPECIFIED",

    domain:
      metadata.domain ||
      "CORE",

    scenario:
      metadata.scenario ||
      "UNSPECIFIED",

    event:
      metadata.event ||
      "UNSPECIFIED",

    source:
      metadata.source ||
      "SPD_V13_1",

    mode:
      metadata.mode ||
      "LOCAL_SIMULATOR"

  };

}


/* =========================================================
   START LATENCY MEASUREMENT
========================================================= */

/**
 * Start a latency measurement.
 *
 * IMPORTANT:
 * This function only records a timestamp.
 *
 * It does not execute or modify any engine.
 *
 * @param {Object} metadata
 * @returns {Object}
 */

export function startLatencyMeasurement(
  metadata = {}
) {

  return {

    measurementId:
      createMeasurementId(),

    startTime:
      getPerformanceNow(),

    timestamp:
      new Date().toISOString(),

    metadata:
      normalizeMetadata(
        metadata
      )

  };

}


/* =========================================================
   END LATENCY MEASUREMENT
========================================================= */

/**
 * Complete a latency measurement.
 *
 * IMPORTANT:
 * This function only calculates elapsed time.
 *
 * It does not modify the result supplied by the
 * authoritative engine.
 *
 * @param {Object} measurement
 * @param {Object} result
 * @returns {Object}
 */

export function endLatencyMeasurement(
  measurement,
  result = {}
) {

  if (
    !measurement ||
    !Number.isFinite(
      Number(
        measurement.startTime
      )
    )
  ) {

    return {

      success:
        false,

      error:
        "INVALID_LATENCY_MEASUREMENT"

    };

  }


  const endTime =
    getPerformanceNow();


  const elapsedMs =
    Math.max(

      0,

      endTime -
        Number(
          measurement.startTime
        )

    );


  const record = {

    success:
      true,

    measurementId:
      measurement.measurementId,

    timestamp:
      measurement.timestamp,

    startTimeMs:
      measurement.startTime,

    endTimeMs:
      endTime,

    elapsedMs:
      Number(
        elapsedMs.toFixed(3)
      ),

    metadata: {

      ...(
        measurement.metadata ||
        {}
      )

    },

    result: {

      ...(
        result ||
        {}
      )

    },

    recordedAt:
      new Date().toISOString()

  };


  latencyCatalogue.push(
    record
  );


  return record;

}


/* =========================================================
   RECORD COMPLETED MEASUREMENT
========================================================= */

/**
 * Record an existing completed latency measurement.
 *
 * This is useful when timing already occurred elsewhere.
 *
 * No engine state is modified.
 *
 * @param {Object} record
 * @returns {Object}
 */

export function recordLatency(
  record = {}
) {

  const safeRecord = {

    success:
      true,

    measurementId:
      record.measurementId ||
      createMeasurementId(),

    timestamp:
      record.timestamp ||
      new Date().toISOString(),

    startTimeMs:
      safeNumber(
        record.startTimeMs
      ),

    endTimeMs:
      safeNumber(
        record.endTimeMs
      ),

    elapsedMs:
      safeNumber(
        record.elapsedMs
      ),

    metadata:
      normalizeMetadata(
        record.metadata
      ),

    result: {

      ...(
        record.result ||
        {}
      )

    },

    recordedAt:
      new Date().toISOString()

  };


  latencyCatalogue.push(
    safeRecord
  );


  return {

    ...safeRecord

  };

}


/* =========================================================
   MEASURE A FUNCTION
========================================================= */

/**
 * Measure execution time around an existing function.
 *
 * IMPORTANT:
 *
 * The wrapped function remains the authority.
 *
 * Its return value is returned unchanged.
 *
 * The observer only measures elapsed execution time.
 *
 * @param {String} stage
 * @param {Function} fn
 * @param {Object} metadata
 * @returns {Object}
 */

export function measureStage(
  stage,
  fn,
  metadata = {}
) {

  if (
    typeof fn !== "function"
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_TARGET_NOT_FUNCTION"

    };

  }


  const measurement =
    startLatencyMeasurement({

      ...metadata,

      stage

    });


  try {

    const result =
      fn();


    const latency =
      endLatencyMeasurement(

        measurement,

        {

          status:
            "COMPLETE"

        }

      );


    return {

      success:
        true,

      result,

      latency

    };

  }

  catch (error) {

    const latency =
      endLatencyMeasurement(

        measurement,

        {

          status:
            "ERROR",

          error:
            error?.message ||
            "UNKNOWN_ERROR"

        }

      );


    throw Object.assign(
      error,
      {

        latency

      }
    );

  }

}


/* =========================================================
   ASYNC STAGE MEASUREMENT
========================================================= */

/**
 * Measure an asynchronous function.
 *
 * The underlying function remains authoritative.
 *
 * @param {String} stage
 * @param {Function} fn
 * @param {Object} metadata
 * @returns {Promise<Object>}
 */

export async function measureStageAsync(
  stage,
  fn,
  metadata = {}
) {

  if (
    typeof fn !== "function"
  ) {

    return {

      success:
        false,

      error:
        "LATENCY_TARGET_NOT_FUNCTION"

    };

  }


  const measurement =
    startLatencyMeasurement({

      ...metadata,

      stage

    });


  try {

    const result =
      await fn();


    const latency =
      endLatencyMeasurement(

        measurement,

        {

          status:
            "COMPLETE"

        }

      );


    return {

      success:
        true,

      result,

      latency

    };

  }

  catch (error) {

    const latency =
      endLatencyMeasurement(

        measurement,

        {

          status:
            "ERROR",

          error:
            error?.message ||
            "UNKNOWN_ERROR"

        }

      );


    throw Object.assign(
      error,
      {

        latency

      }
    );

  }

}


/* =========================================================
   GET CATALOGUE
========================================================= */

/**
 * Return a safe copy of the latency catalogue.
 *
 * The caller cannot modify the internal catalogue through
 * the returned objects.
 *
 * @returns {Array}
 */

export function getLatencyCatalogue() {

  return latencyCatalogue.map(
    record => ({

      ...record,

      metadata: {

        ...(
          record.metadata ||
          {}
        )

      },

      result: {

        ...(
          record.result ||
          {}
        )

      }

    })
  );

}


/* =========================================================
   GET LATEST RECORDS BY STAGE
========================================================= */

/**
 * Return the latest measurement for each stage.
 *
 * @returns {Object}
 */

export function getLatestLatencyByStage() {

  const latest = {};


  latencyCatalogue.forEach(
    record => {

      const stage =
        record.metadata?.stage ||
        "UNSPECIFIED";


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
          {

            ...record,

            metadata: {

              ...(
                record.metadata ||
                {}
              )

            },

            result: {

              ...(
                record.result ||
                {}
              )

            }

          };

      }

    }
  );


  return latest;

}


/* =========================================================
   GET LATEST LATENCY SNAPSHOT
========================================================= */

/**
 * Produce a display-ready latest latency snapshot.
 *
 * This does not modify the cockpit.
 *
 * @returns {Object}
 */

export function getLatestLatencySnapshot() {

  const latest =
    getLatestLatencyByStage();


  const snapshot = {};


  LATENCY_STAGES.forEach(
    stage => {

      const record =
        latest[stage];


      snapshot[stage] = {

        stage,

        measured:
          Boolean(record),

        durationMs:
          record
            ? safeNumber(
                record.elapsedMs
              )
            : null,

        display:
          record
            ? `${Number(
                record.elapsedMs
              ).toFixed(3)} ms`
            : "— ms",

        domain:
          record?.metadata?.domain ||
          "CORE",

        scenario:
          record?.metadata?.scenario ||
          "UNSPECIFIED",

        recordedAt:
          record?.recordedAt ||
          null

      };

    }
  );


  return snapshot;

}


/* =========================================================
   STATISTICS
========================================================= */

/**
 * Calculate basic latency statistics.
 *
 * @returns {Object}
 */

export function getLatencyStatistics() {

  const values =
    latencyCatalogue

      .map(
        record =>
          Number(
            record.elapsedMs
          )
      )

      .filter(
        value =>
          Number.isFinite(
            value
          )
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
        null,

      totalMs:
        0

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
        sum,
        value
      ) =>
        sum + value,

      0

    );


  const averageMs =
    totalMs /
    values.length;


  return {

    count:
      values.length,

    minimumMs:
      Number(
        minimumMs.toFixed(3)
      ),

    maximumMs:
      Number(
        maximumMs.toFixed(3)
      ),

    averageMs:
      Number(
        averageMs.toFixed(3)
      ),

    totalMs:
      Number(
        totalMs.toFixed(3)
      )

  };

}


/* =========================================================
   STAGE STATISTICS
========================================================= */

/**
 * Calculate statistics for each latency stage.
 *
 * @returns {Object}
 */

export function getStageLatencyStatistics() {

  const stages = {};


  LATENCY_STAGES.forEach(
    stage => {

      stages[stage] = {

        count:
          0,

        minimumMs:
          null,

        maximumMs:
          null,

        averageMs:
          null,

        totalMs:
          0

      };

    }
  );


  latencyCatalogue.forEach(
    record => {

      const stage =
        record.metadata?.stage;


      const value =
        safeNumber(
          record.elapsedMs
        );


      if (
        !stage ||
        value === null
      ) {

        return;

      }


      if (
        !stages[stage]
      ) {

        stages[stage] = {

          count:
            0,

          minimumMs:
            null,

          maximumMs:
            null,

          averageMs:
            null,

          totalMs:
            0

        };

      }


      const statistics =
        stages[stage];


      statistics.count += 1;

      statistics.totalMs += value;


      statistics.minimumMs =
        statistics.minimumMs === null
          ? value
          : Math.min(
              statistics.minimumMs,
              value
            );


      statistics.maximumMs =
        statistics.maximumMs === null
          ? value
          : Math.max(
              statistics.maximumMs,
              value
            );


      statistics.averageMs =
        statistics.totalMs /
        statistics.count;


      statistics.totalMs =
        Number(
          statistics.totalMs.toFixed(3)
        );


      statistics.averageMs =
        Number(
          statistics.averageMs.toFixed(3)
        );


      statistics.minimumMs =
        Number(
          statistics.minimumMs.toFixed(3)
        );


      statistics.maximumMs =
        Number(
          statistics.maximumMs.toFixed(3)
        );

    }
  );


  return stages;

}


/* =========================================================
   DOMAIN STATISTICS
========================================================= */

/**
 * Calculate latency statistics by domain.
 *
 * @returns {Object}
 */

export function getDomainLatencyStatistics() {

  const domains = {};


  latencyCatalogue.forEach(
    record => {

      const domain =
        record.metadata?.domain ||
        "CORE";


      const value =
        safeNumber(
          record.elapsedMs
        );


      if (
        value === null
      ) {

        return;

      }


      if (
        !domains[domain]
      ) {

        domains[domain] = {

          count:
            0,

          minimumMs:
            null,

          maximumMs:
            null,

          averageMs:
            null,

          totalMs:
            0

        };

      }


      const statistics =
        domains[domain];


      statistics.count += 1;

      statistics.totalMs += value;


      statistics.minimumMs =
        statistics.minimumMs === null
          ? value
          : Math.min(
              statistics.minimumMs,
              value
            );


      statistics.maximumMs =
        statistics.maximumMs === null
          ? value
          : Math.max(
              statistics.maximumMs,
              value
            );


      statistics.averageMs =
        statistics.totalMs /
        statistics.count;


      statistics.totalMs =
        Number(
          statistics.totalMs.toFixed(3)
        );


      statistics.averageMs =
        Number(
          statistics.averageMs.toFixed(3)
        );


      statistics.minimumMs =
        Number(
          statistics.minimumMs.toFixed(3)
        );


      statistics.maximumMs =
        Number(
          statistics.maximumMs.toFixed(3)
        );

    }
  );


  return domains;

}


/* =========================================================
   SCENARIO STATISTICS
========================================================= */

/**
 * Calculate latency statistics by scenario.
 *
 * @returns {Object}
 */

export function getScenarioLatencyStatistics() {

  const scenarios = {};


  latencyCatalogue.forEach(
    record => {

      const scenario =
        record.metadata?.scenario ||
        "UNSPECIFIED";


      const value =
        safeNumber(
          record.elapsedMs
        );


      if (
        value === null
      ) {

        return;

      }


      if (
        !scenarios[scenario]
      ) {

        scenarios[scenario] = {

          count:
            0,

          minimumMs:
            null,

          maximumMs:
            null,

          averageMs:
            null,

          totalMs:
            0

        };

      }


      const statistics =
        scenarios[scenario];


      statistics.count += 1;

      statistics.totalMs += value;


      statistics.minimumMs =
        statistics.minimumMs === null
          ? value
          : Math.min(
              statistics.minimumMs,
              value
            );


      statistics.maximumMs =
        statistics.maximumMs === null
          ? value
          : Math.max(
              statistics.maximumMs,
              value
            );


      statistics.averageMs =
        statistics.totalMs /
        statistics.count;


      statistics.totalMs =
        Number(
          statistics.totalMs.toFixed(3)
        );


      statistics.averageMs =
        Number(
          statistics.averageMs.toFixed(3)
        );


      statistics.minimumMs =
        Number(
          statistics.minimumMs.toFixed(3)
        );


      statistics.maximumMs =
        Number(
          statistics.maximumMs.toFixed(3)
        );

    }
  );


  return scenarios;

}


/* =========================================================
   READ-ONLY DISPLAY MODEL
========================================================= */

/**
 * Build a read-only object for the cockpit latency monitor.
 *
 * IMPORTANT:
 * This does NOT modify the cockpit.
 *
 * The UI may read this object and display it.
 *
 * @returns {Object}
 */

export function getLatencyDisplayModel() {

  return {

    title:
      "ASSESSMENT LATENCY MONITOR",

    status:
      "MEASUREMENT ONLY",

    catalogue:

      "SPD v13.1 Assessment Latency Catalogue",

    measurementCount:
      latencyCatalogue.length,

    stages:
      getLatestLatencySnapshot(),

    statistics:
      getLatencyStatistics(),

    stageStatistics:
      getStageLatencyStatistics(),

    domainStatistics:
      getDomainLatencyStatistics(),

    scenarioStatistics:
      getScenarioLatencyStatistics(),

    architectureProtection: {

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      domainThresholds:
        "UNCHANGED",

      riskClassification:
        "UNCHANGED",

      decisionLogic:
        "UNCHANGED",

      actionLogic:
        "UNCHANGED",

      cockpitLogic:
        "UNCHANGED",

      humanDecisionAuthority:
        "UNCHANGED",

      autonomousExecution:
        false

    },

    generatedAt:
      new Date().toISOString()

  };

}


/* =========================================================
   CLEAR LATENCY CATALOGUE
========================================================= */

/**
 * Clear ONLY the latency catalogue.
 *
 * This does not reset or modify any SPD engine.
 */

export function clearLatencyCatalogue() {

  latencyCatalogue.length =
    0;


  return {

    success:
      true,

    cleared:
      true,

    measurementCount:
      latencyCatalogue.length,

    enginesModified:
      false

  };

}


/* =========================================================
   CATALOGUE SIZE
========================================================= */

export function getLatencyCatalogueSize() {

  return latencyCatalogue.length;

}


/* =========================================================
   OBSERVER STATUS
========================================================= */

/**
 * Return observer integration status.
 *
 * @returns {Object}
 */

export function getLatencyObserverStatus() {

  return {

    status:
      "ACTIVE",

    mode:
      "MEASUREMENT_ONLY",

    catalogueConnected:
      true,

    measurementCount:
      latencyCatalogue.length,

    goldenRuleEngine:
      "UNCHANGED",

    domainRuleEngines:
      "UNCHANGED",

    domainThresholds:
      "UNCHANGED",

    riskClassification:
      "UNCHANGED",

    decisionLogic:
      "UNCHANGED",

    actionLogic:
      "UNCHANGED",

    cockpit:
      "DISPLAY_CONSUMER_ONLY",

    humanDecisionAuthority:
      "HUMAN_OPERATOR",

    autonomousExecution:
      false,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   SELF-CHECK
========================================================= */

/**
 * Verify that the latency observer itself is operational.
 *
 * This self-check measures only the observer.
 * It does not invoke the Golden Rule Engine or any
 * Domain Rule Engine.
 *
 * @returns {Object}
 */

export function verifyLatencyObserver() {

  try {

    const measurement =
      startLatencyMeasurement({

        stage:
          "SELF_TEST",

        domain:
          "CORE",

        scenario:
          "LATENCY_OBSERVER_SELF_TEST",

        event:
          "OBSERVER_SELF_CHECK"

      });


    const latency =
      endLatencyMeasurement(

        measurement,

        {

          status:
            "OBSERVER_SELF_TEST_COMPLETE"

        }

      );


    const pass =
      latency &&
      latency.success === true &&
      Number.isFinite(
        Number(
          latency.elapsedMs
        )
      );


    return {

      observer:
        "SPD v13.1 Assessment Latency Observer",

      status:
        pass
          ? "PASS"
          : "FAIL",

      measurementId:
        latency.measurementId,

      elapsedMs:
        latency.elapsedMs,

      measurementOnly:
        true,

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      cockpit:
        "UNCHANGED",

      timestamp:
        new Date().toISOString()

    };

  }

  catch (error) {

    return {

      observer:
        "SPD v13.1 Assessment Latency Observer",

      status:
        "FAIL",

      error:
        error?.message ||
        "LATENCY_OBSERVER_SELF_TEST_ERROR",

      measurementOnly:
        true,

      timestamp:
        new Date().toISOString()

    };

  }

}


/* =========================================================
   EXPORT SUMMARY
========================================================= */

export function getLatencyObserverSummary() {

  return {

    observer:
      "SPD v13.1 Assessment Latency Observer",

    version:
      "1.0.0",

    purpose:
      "Measure execution latency without modifying SPD decision engines.",

    measurementOnly:
      true,

    catalogueEntries:
      latencyCatalogue.length,

    stages:
      [...LATENCY_STAGES],

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

    cockpit:
      "UNCHANGED",

    humanAuthorization:
      "REQUIRED",

    autonomousExecution:
      false,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {

  startLatencyMeasurement,

  endLatencyMeasurement,

  recordLatency,

  measureStage,

  measureStageAsync,

  getLatencyCatalogue,

  getLatestLatencyByStage,

  getLatestLatencySnapshot,

  getLatencyStatistics,

  getStageLatencyStatistics,

  getDomainLatencyStatistics,

  getScenarioLatencyStatistics,

  getLatencyDisplayModel,

  getLatencyCatalogueSize,

  clearLatencyCatalogue,

  getLatencyObserverStatus,

  verifyLatencyObserver,

  getLatencyObserverSummary

};
