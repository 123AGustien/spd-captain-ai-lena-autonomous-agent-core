/**
 * SPD v13.1 — Assessment Latency Integration
 *
 * Measurement-only integration layer.
 *
 * IMPORTANT:
 * - Golden Rule Engine remains authoritative.
 * - Domain Rule Engines remain authoritative.
 * - Cockpit remains unchanged.
 * - No risk thresholds are modified.
 * - No decisions are modified.
 * - No domain rules are modified.
 *
 * This module measures execution latency and records
 * the measurements in the Assessment Latency Catalogue.
 */

import latencyCatalogue from "./assessmentLatencyCatalogue.json";

const CATALOGUE_VERSION =
    latencyCatalogue.catalogue.version;

const measurements = new Map();

/**
 * Start timing a processing stage.
 */
export function startLatency(stage, context = {}) {
    const key = createMeasurementKey(stage, context);

    measurements.set(key, {
        stage,
        context,
        start: now(),
        end: null,
        durationMs: null
    });

    return key;
}

/**
 * Stop timing a processing stage.
 */
export function endLatency(key) {
    const measurement = measurements.get(key);

    if (!measurement) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_FOUND"
        };
    }

    measurement.end = now();

    measurement.durationMs = Math.max(
        0,
        measurement.end - measurement.start
    );

    measurements.set(key, measurement);

    return {
        success: true,
        stage: measurement.stage,
        durationMs: measurement.durationMs
    };
}

/**
 * Record a completed latency measurement.
 *
 * This function records measurement data only.
 * It does not modify engine behaviour.
 */
export function recordLatency(key) {
    const measurement = measurements.get(key);

    if (!measurement) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_FOUND"
        };
    }

    if (measurement.durationMs === null) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_COMPLETED"
        };
    }

    const record = {
        catalogueVersion: CATALOGUE_VERSION,
        stage: measurement.stage,
        context: measurement.context,
        durationMs: measurement.durationMs,
        recordedAt: new Date().toISOString()
    };

    return {
        success: true,
        record
    };
}

/**
 * Measure a function without changing its result.
 *
 * The wrapped function remains the authority.
 */
export function measureStage(stage, fn, context = {}) {
    const key = startLatency(stage, context);

    try {
        const result = fn();

        endLatency(key);

        return {
            result,
            latency: recordLatency(key)
        };
    } catch (error) {
        endLatency(key);

        throw error;
    }
}

/**
 * Create a unique measurement key.
 */
function createMeasurementKey(stage, context) {
    const scenario =
        context.scenario || "UNSPECIFIED";

    const domain =
        context.domain || "CORE";

    return `${domain}:${scenario}:${stage}:${Date.now()}:${Math.random()}`;
}

/**
 * High-resolution timing where available.
 */
function now() {
    if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
    ) {
        return performance.now();
    }

    return Date.now();
}

/**
 * Integration status.
 */
export function getLatencyIntegrationStatus() {
    return {
        status: "ACTIVE",
        catalogue: "CONNECTED",
        catalogueVersion: CATALOGUE_VERSION,

        measurementOnly: true,

        goldenRuleEngine: "UNCHANGED",
        domainRuleEngines: "UNCHANGED",
        cockpit: "UNCHANGED",
        decisionLogic: "UNCHANGED"
    };
}