/**
 * SPD v13.1 — Assessment Latency Observer
 *
 * PURPOSE:
 * Measure execution latency without modifying or controlling
 * any SPD decision engine.
 *
 * IMPORTANT ARCHITECTURE RULE:
 * - Does NOT modify the Golden Rule Engine.
 * - Does NOT modify any Domain Rule Engine.
 * - Does NOT modify domain thresholds.
 * - Does NOT modify risk classification.
 * - Does NOT modify decisions or actions.
 * - Does NOT modify cockpit screens.
 *
 * This module is measurement-only.
 */

const latencyCatalogue = [];

/**
 * Start a latency measurement.
 *
 * @param {Object} metadata
 * @returns {Object}
 */
export function startLatencyMeasurement(metadata = {}) {
  return {
    measurementId: `LAT-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    startTime: performance.now(),
    timestamp: new Date().toISOString(),
    metadata: { ...metadata }
  };
}

/**
 * Complete a latency measurement.
 *
 * @param {Object} measurement
 * @param {Object} result
 * @returns {Object}
 */
export function endLatencyMeasurement(measurement, result = {}) {
  const endTime = performance.now();

  const record = {
    measurementId: measurement.measurementId,
    timestamp: measurement.timestamp,
    startTimeMs: measurement.startTime,
    endTimeMs: endTime,
    elapsedMs: Number(
      (endTime - measurement.startTime).toFixed(3)
    ),

    metadata: {
      ...measurement.metadata
    },

    result: {
      ...result
    }
  };

  latencyCatalogue.push(record);

  return record;
}

/**
 * Record a completed measurement directly.
 *
 * This function is useful when an existing engine has already
 * completed execution and we only want to catalogue its timing.
 *
 * @param {Object} record
 * @returns {Object}
 */
export function recordLatency(record) {
  const safeRecord = {
    ...record,
    recordedAt: new Date().toISOString()
  };

  latencyCatalogue.push(safeRecord);

  return safeRecord;
}

/**
 * Return a copy of the current catalogue.
 *
 * No engine state is exposed for modification.
 */
export function getLatencyCatalogue() {
  return latencyCatalogue.map(record => ({
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
 * Clear only the latency catalogue.
 *
 * This does NOT reset or modify any SPD engine.
 */
export function clearLatencyCatalogue() {
  latencyCatalogue.length = 0;
}

/**
 * Calculate basic latency statistics.
 *
 * @returns {Object}
 */
export function getLatencyStatistics() {
  const values = latencyCatalogue
    .map(record => Number(record.elapsedMs))
    .filter(value => Number.isFinite(value));

  if (values.length === 0) {
    return {
      count: 0,
      minimumMs: null,
      maximumMs: null,
      averageMs: null
    };
  }

  const minimumMs = Math.min(...values);
  const maximumMs = Math.max(...values);
  const averageMs =
    values.reduce((sum, value) => sum + value, 0) /
    values.length;

  return {
    count: values.length,
    minimumMs: Number(minimumMs.toFixed(3)),
    maximumMs: Number(maximumMs.toFixed(3)),
    averageMs: Number(averageMs.toFixed(3))
  };
}