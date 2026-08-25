/**
 * =========================================================
 * SPD v13.1 — ASSESSMENT LATENCY OBSERVER
 * =========================================================
 *
 * Measurement-only execution latency observer.
 *
 * This module:
 * - records execution timing
 * - stores latency measurements
 * - calculates latency statistics
 * - provides read-only display models
 *
 * This module does NOT:
 * - modify Golden Rule Engine logic
 * - modify Domain Rule Engines
 * - modify thresholds
 * - modify risk classification
 * - modify resilience calculations
 * - modify decisions
 * - execute recovery actions
 * - authorize actions
 * - modify Human Decision Authority
 *
 * Architecture:
 *
 * EXISTING SPD ENGINE
 *        ↓
 * LATENCY OBSERVER
 *        ↓
 * MEASUREMENT RECORD
 *        ↓
 * LATENCY CATALOGUE
 *
 * Measurement flows FROM the engine to the observer.
 * Measurement never flows back into decision authority.
 * =========================================================
 */

const latencyCatalogue = [];

export const LATENCY_STAGES = Object.freeze([
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
  "FINAL_VALIDATION",
  "END_TO_END"
]);

function getPerformanceNow() {
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    return performance.now();
  }

  return Date.now();
}

function safeNumber(value, fallback = null) {
  const numeric = Number(value);

  return Number.isFinite(numeric)
    ? numeric
    : fallback;
}

function createMeasurementId() {
  return [
    "LAT",
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2, 8)
  ].join("-");
}

function normalizeMetadata(metadata = {}) {
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
      "LOCAL_SIMULATOR",

    engine:
      metadata.engine ||
      "UNSPECIFIED",

    ruleId:
      metadata.ruleId ||
      "UNSPECIFIED",

    intensity:
      safeNumber(metadata.intensity),

    validationStatus:
      metadata.validationStatus ||
      "NOT_SPECIFIED"
  };
}

/**
 * Start a measurement.
 *
 * Measurement only.
 * No SPD engine is executed.
 */
export function startLatencyMeasurement(metadata = {}) {
  return {
    measurementId: createMeasurementId(),

    startTime:
      getPerformanceNow(),

    timestamp:
      new Date().toISOString(),

    metadata:
      normalizeMetadata(metadata)
  };
}

/**
 * Complete a measurement.
 *
 * Calculates elapsed time and records it.
 */
export function endLatencyMeasurement(
  measurement,
  result = {}
) {
  if (
    !measurement ||
    !Number.isFinite(
      Number(measurement.startTime)
    )
  ) {
    return {
      success: false,
      error: "INVALID_LATENCY_MEASUREMENT"
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
    success: true,

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
      ...(measurement.metadata || {})
    },

    result: {
      ...(result || {})
    },

    recordedAt:
      new Date().toISOString()
  };

  latencyCatalogue.push(record);

  return {
    ...record,
    metadata: {
      ...record.metadata
    },
    result: {
      ...record.result
    }
  };
}

/**
 * Record an already completed measurement.
 *
 * This does not execute or modify any SPD engine.
 */
export function recordLatency(record = {}) {
  const safeRecord = {
    success: true,

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
      ...(record.result || {})
    },

    recordedAt:
      new Date().toISOString()
  };

  latencyCatalogue.push(safeRecord);

  return {
    ...safeRecord,
    metadata: {
      ...safeRecord.metadata
    },
    result: {
      ...safeRecord.result
    }
  };
}

/**
 * Measure a synchronous function.
 *
 * The wrapped function remains authoritative.
 * Its result is returned unchanged.
 */
export function measureStage(
  stage,
  fn,
  metadata = {}
) {
  if (typeof fn !== "function") {
    return {
      success: false,
      error: "LATENCY_TARGET_NOT_FUNCTION"
    };
  }

  const measurement =
    startLatencyMeasurement({
      ...metadata,
      stage
    });

  try {
    const result = fn();

    const latency =
      endLatencyMeasurement(
        measurement,
        {
          status: "COMPLETE"
        }
      );

    return {
      success: true,
      result,
      latency
    };
  } catch (error) {
    const latency =
      endLatencyMeasurement(
        measurement,
        {
          status: "ERROR",
          error:
            error?.message ||
            "UNKNOWN_ERROR"
        }
      );

    throw Object.assign(
      error,
      { latency }
    );
  }
}

/**
 * Measure an asynchronous function.
 *
 * The wrapped function remains authoritative.
 */
export async function measureStageAsync(
  stage,
  fn,
  metadata = {}
) {
  if (typeof fn !== "function") {
    return {
      success: false,
      error: "LATENCY_TARGET_NOT_FUNCTION"
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
          status: "COMPLETE"
        }
      );

    return {
      success: true,
      result,
      latency
    };
  } catch (error) {
    const latency =
      endLatencyMeasurement(
        measurement,
        {
          status: "ERROR",
          error:
            error?.message ||
            "UNKNOWN_ERROR"
        }
      );

    throw Object.assign(
      error,
      { latency }
    );
  }
}

/**
 * Return a safe copy of the catalogue.
 */
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

/**
 * Return latest measurement for every stage.
 */
export function getLatestLatencyByStage() {
  const latest = {};

  latencyCatalogue.forEach(record => {
    const stage =
      record.metadata?.stage ||
      "UNSPECIFIED";

    const existing =
      latest[stage];

    if (
      !existing ||
      String(record.recordedAt || "") >
        String(existing.recordedAt || "")
    ) {
      latest[stage] = {
        ...record,

        metadata: {
          ...(record.metadata || {})
        },

        result: {
          ...(record.result || {})
        }
      };
    }
  });

  return latest;
}

/**
 * Build the latest stage snapshot.
 */
export function getLatestLatencySnapshot() {
  const latest =
    getLatestLatencyByStage();

  const snapshot = {};

  LATENCY_STAGES.forEach(stage => {
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
          : "NO MEASUREMENT",

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
  });

  return snapshot;
}

/**
 * Calculate overall latency statistics.
 */
export function getLatencyStatistics() {
  const values =
    latencyCatalogue
      .map(record =>
        Number(record.elapsedMs)
      )
      .filter(value =>
        Number.isFinite(value)
      );

  if (values.length === 0) {
    return {
      count: 0,
      minimumMs: null,
      maximumMs: null,
      averageMs: null,
      totalMs: 0
    };
  }

  const minimumMs =
    Math.min(...values);

  const maximumMs =
    Math.max(...values);

  const totalMs =
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return {
    count: values.length,

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
        (
          totalMs /
          values.length
        ).toFixed(3)
      ),

    totalMs:
      Number(
        totalMs.toFixed(3)
      )
  };
}

/**
 * Calculate statistics by stage.
 */
export function getStageLatencyStatistics() {
  const stages = {};

  LATENCY_STAGES.forEach(stage => {
    stages[stage] = {
      count: 0,
      minimumMs: null,
      maximumMs: null,
      averageMs: null,
      totalMs: 0
    };
  });

  latencyCatalogue.forEach(record => {
    const stage =
      record.metadata?.stage;

    const value =
      safeNumber(
        record.elapsedMs
      );

    if (!stage || value === null) {
      return;
    }

    if (!stages[stage]) {
      stages[stage] = {
        count: 0,
        minimumMs: null,
        maximumMs: null,
        averageMs: null,
        totalMs: 0
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
  });

  return stages;
}

/**
 * Calculate statistics by domain.
 */
export function getDomainLatencyStatistics() {
  return calculateGroupedStatistics(
    record =>
      record.metadata?.domain ||
      "CORE"
  );
}

/**
 * Calculate statistics by scenario.
 */
export function getScenarioLatencyStatistics() {
  return calculateGroupedStatistics(
    record =>
      record.metadata?.scenario ||
      "UNSPECIFIED"
  );
}

function calculateGroupedStatistics(
  keySelector
) {
  const groups = {};

  latencyCatalogue.forEach(record => {
    const key =
      keySelector(record);

    const value =
      safeNumber(
        record.elapsedMs
      );

    if (value === null) {
      return;
    }

    if (!groups[key]) {
      groups[key] = {
        count: 0,
        minimumMs: null,
        maximumMs: null,
        averageMs: null,
        totalMs: 0
      };
    }

    const statistics =
      groups[key];

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
  });

  return groups;
}

/**
 * Build a read-only display model.
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
      cockpit: "UNCHANGED",
      goldenRuleEngine: "UNCHANGED",
      domainRuleEngines: "UNCHANGED",
      domainThresholds: "UNCHANGED",
      riskClassification: "UNCHANGED",
      resilienceCalculations: "UNCHANGED",
      decisionLogic: "UNCHANGED",
      actionLogic: "UNCHANGED",
      humanDecisionAuthority: "UNCHANGED",
      autonomousExecution: false
    },

    generatedAt:
      new Date().toISOString()
  };
}

/**
 * Clear only the latency catalogue.
 */
export function clearLatencyCatalogue() {
  latencyCatalogue.length = 0;

  return {
    success: true,
    cleared: true,
    measurementCount:
      latencyCatalogue.length,
    enginesModified: false
  };
}

/**
 * Return catalogue size.
 */
export function getLatencyCatalogueSize() {
  return latencyCatalogue.length;
}

/**
 * Return observer integration status.
 */
export function getLatencyObserverStatus() {
  return {
    status: "ACTIVE",
    mode: "MEASUREMENT_ONLY",

    catalogueConnected: true,

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

/**
 * Verify the latency observer itself.
 *
 * This self-test does not invoke SPD decision engines.
 */
export function verifyLatencyObserver() {
  try {
    const measurement =
      startLatencyMeasurement({
        stage: "SELF_TEST",
        domain: "CORE",
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

      measurementOnly: true,

      goldenRuleEngine:
        "UNCHANGED",

      domainRuleEngines:
        "UNCHANGED",

      cockpit:
        "UNCHANGED",

      timestamp:
        new Date().toISOString()
    };
  } catch (error) {
    return {
      observer:
        "SPD v13.1 Assessment Latency Observer",

      status: "FAIL",

      error:
        error?.message ||
        "LATENCY_OBSERVER_SELF_TEST_ERROR",

      measurementOnly: true,

      timestamp:
        new Date().toISOString()
    };
  }
}

/**
 * Return observer summary.
 */
export function getLatencyObserverSummary() {
  return {
    observer:
      "SPD v13.1 Assessment Latency Observer",

    version: "1.0.0",

    purpose:
      "Measure execution latency without modifying SPD decision engines.",

    measurementOnly: true,

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