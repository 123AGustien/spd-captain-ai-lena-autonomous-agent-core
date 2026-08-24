/**
 * SPD v13.1 — Assessment Latency Integration
 *
 * File:
 * /assessmentLatencyIntegration.js
 *
 * Purpose:
 * Measurement-only integration layer for the
 * SPD v13.1 Assessment Latency Catalogue.
 *
 * IMPORTANT:
 * - Golden Rule Engine remains authoritative.
 * - Domain Rule Engines remain authoritative.
 * - Cockpit remains unchanged.
 * - No risk thresholds are modified.
 * - No decisions are modified.
 * - No domain rules are modified.
 * - No Golden Rule stages are modified.
 * - No scenario logic is modified.
 * - No action logic is modified.
 *
 * This module measures execution latency and creates
 * latency records for validation and audit purposes.
 *
 * Architecture:
 *
 * DOMAIN RULE ENGINE
 *        ↓
 * GOLDEN RULE ENGINE
 *        ↓
 * ASSESSMENT LATENCY INTEGRATION
 *        ↓
 * ASSESSMENT LATENCY CATALOGUE
 *        ↓
 * VALIDATION / AUDIT
 *
 * Authority:
 *
 * Domain Rule Engines
 *     = Domain-specific authority
 *
 * Golden Rule Engine
 *     = Core deterministic decision authority
 *
 * Assessment Latency Integration
 *     = Measurement only
 *
 * Assessment Latency Catalogue
 *     = Latency definition / record structure
 *
 * Cockpit
 *     = Existing interface, unchanged
 */

import latencyCatalogue from "./assessmentLatencyCatalogue.json";

/**
 * Catalogue version.
 *
 * Obtained directly from the latency catalogue.
 */
const CATALOGUE_VERSION =
    latencyCatalogue.catalogue.version;

/**
 * Internal measurement storage.
 *
 * This storage is local to the latency integration layer.
 * It does not alter system state used by the decision engines.
 */
const measurements = new Map();

/**
 * Deterministic measurement sequence.
 *
 * Used instead of Math.random() so that measurement identifiers
 * do not introduce unnecessary randomness into the integration layer.
 */
let measurementSequence = 0;

/**
 * Supported catalogue stages.
 *
 * These stages mirror the stages defined by the
 * Assessment Latency Catalogue.
 *
 * The list is informational only.
 * It does not redefine the Golden Rule Engine.
 */
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

/**
 * Check whether a stage exists in the catalogue.
 */
export function isSupportedLatencyStage(stage) {
    return LATENCY_STAGES.includes(stage);
}

/**
 * Return the currently supported latency stages.
 *
 * A copy is returned so callers cannot modify the
 * internal stage definition.
 */
export function getLatencyStages() {
    return [...LATENCY_STAGES];
}

/**
 * High-resolution timing where available.
 *
 * performance.now() is preferred because it is suitable
 * for measuring elapsed execution time.
 *
 * Date.now() is retained as a compatibility fallback.
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
 * Create a deterministic measurement key.
 *
 * The key contains:
 * - domain
 * - scenario
 * - stage
 * - deterministic sequence number
 */
function createMeasurementKey(stage, context = {}) {
    const scenario =
        context.scenario || "UNSPECIFIED";

    const domain =
        context.domain || "CORE";

    measurementSequence += 1;

    return `${domain}:${scenario}:${stage}:${measurementSequence}`;
}

/**
 * Start timing a processing stage.
 *
 * This function observes timing only.
 * It does not execute or modify any engine logic.
 */
export function startLatency(stage, context = {}) {
    if (!isSupportedLatencyStage(stage)) {
        return {
            success: false,
            error: "UNSUPPORTED_LATENCY_STAGE",
            stage
        };
    }

    const key = createMeasurementKey(stage, context);

    const measurement = {
        key,
        stage,
        context,
        start: now(),
        end: null,
        durationMs: null,
        completed: false
    };

    measurements.set(key, measurement);

    return {
        success: true,
        key,
        stage
    };
}

/**
 * Stop timing a processing stage.
 *
 * No engine result is changed.
 */
export function endLatency(key) {
    const measurement = measurements.get(key);

    if (!measurement) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_FOUND"
        };
    }

    if (measurement.completed) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_ALREADY_COMPLETED",
            key
        };
    }

    const end = now();

    measurement.end = end;

    measurement.durationMs = Math.max(
        0,
        end - measurement.start
    );

    measurement.completed = true;

    measurements.set(key, measurement);

    return {
        success: true,
        key,
        stage: measurement.stage,
        durationMs: measurement.durationMs
    };
}

/**
 * Retrieve a measurement without modifying it.
 */
export function getLatencyMeasurement(key) {
    const measurement = measurements.get(key);

    if (!measurement) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_FOUND"
        };
    }

    return {
        success: true,
        measurement: {
            ...measurement
        }
    };
}

/**
 * Record a completed latency measurement.
 *
 * This function creates an audit-compatible measurement record.
 *
 * It does not modify:
 * - risk
 * - resilience
 * - decisions
 * - actions
 * - domain rules
 * - Golden Rule logic
 */
export function recordLatency(key) {
    const measurement = measurements.get(key);

    if (!measurement) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_FOUND"
        };
    }

    if (!measurement.completed) {
        return {
            success: false,
            error: "LATENCY_MEASUREMENT_NOT_COMPLETED"
        };
    }

    const record = {
        catalogueVersion: CATALOGUE_VERSION,

        measurementId: measurement.key,

        stage: measurement.stage,

        context: {
            ...measurement.context
        },

        durationMs: measurement.durationMs,

        recordedAt: new Date().toISOString(),

        measurementPolicy:
            "MEASUREMENT_ONLY",

        authority: {
            goldenRuleEngine: "UNCHANGED",
            domainRuleEngines: "UNCHANGED",
            cockpit: "UNCHANGED",
            decisionLogic: "UNCHANGED"
        }
    };

    return {
        success: true,
        record
    };
}

/**
 * Measure a synchronous function without changing
 * the function's returned result.
 *
 * The wrapped function remains the authority.
 */
export function measureStage(
    stage,
    fn,
    context = {}
) {
    if (typeof fn !== "function") {
        return {
            success: false,
            error: "INVALID_MEASUREMENT_FUNCTION"
        };
    }

    const startResult =
        startLatency(stage, context);

    if (!startResult.success) {
        return startResult;
    }

    const key = startResult.key;

    try {
        const result = fn();

        const endResult =
            endLatency(key);

        const latencyResult =
            recordLatency(key);

        return {
            success: true,
            result,
            latency: latencyResult,
            timing: endResult
        };
    } catch (error) {
        endLatency(key);

        throw error;
    }
}

/**
 * Create a completed latency record directly.
 *
 * Useful for integration tests where start/end timing
 * is supplied by an external execution boundary.
 */
export function createLatencyRecord({
    stage,
    durationMs,
    context = {}
} = {}) {
    if (!isSupportedLatencyStage(stage)) {
        return {
            success: false,
            error: "UNSUPPORTED_LATENCY_STAGE",
            stage
        };
    }

    if (
        typeof durationMs !== "number" ||
        !Number.isFinite(durationMs) ||
        durationMs < 0
    ) {
        return {
            success: false,
            error: "INVALID_LATENCY_DURATION"
        };
    }

    measurementSequence += 1;

    return {
        success: true,

        record: {
            catalogueVersion: CATALOGUE_VERSION,

            measurementId:
                `DIRECT:${stage}:${measurementSequence}`,

            stage,

            context: {
                ...context
            },

            durationMs,

            recordedAt:
                new Date().toISOString(),

            measurementPolicy:
                "MEASUREMENT_ONLY",

            authority: {
                goldenRuleEngine: "UNCHANGED",
                domainRuleEngines: "UNCHANGED",
                cockpit: "UNCHANGED",
                decisionLogic: "UNCHANGED"
            }
        }
    };
}

/**
 * Return all completed measurements currently held
 * by this integration layer.
 *
 * No engine state is returned or modified.
 */
export function getCompletedMeasurements() {
    const completed = [];

    measurements.forEach((measurement) => {
        if (measurement.completed) {
            completed.push({
                ...measurement,
                context: {
                    ...measurement.context
                }
            });
        }
    });

    return completed;
}

/**
 * Return the number of measurements currently held.
 */
export function getMeasurementCount() {
    return measurements.size;
}

/**
 * Clear latency measurements only.
 *
 * This does NOT clear:
 * - Golden Rule state
 * - Domain Engine state
 * - Memory Core
 * - Audit Core
 * - Cockpit state
 * - Scenario state
 *
 * It only clears the local latency measurement store.
 */
export function clearLatencyMeasurements() {
    measurements.clear();

    return {
        success: true,
        status: "LATENCY_MEASUREMENTS_CLEARED"
    };
}

/**
 * Reset the internal measurement sequence.
 *
 * Intended primarily for isolated validation/testing.
 */
export function resetLatencySequence() {
    measurementSequence = 0;

    return {
        success: true,
        status: "LATENCY_SEQUENCE_RESET"
    };
}

/**
 * Return catalogue metadata.
 */
export function getLatencyCatalogueInfo() {
    return {
        name:
            latencyCatalogue.catalogue.name,

        version:
            latencyCatalogue.catalogue.version,

        purpose:
            latencyCatalogue.catalogue.purpose,

        measurementPolicy:
            latencyCatalogue.catalogue.measurementPolicy,

        authoritativeSources: {
            ...latencyCatalogue.catalogue
                .authoritativeSources
        }
    };
}

/**
 * Return complete integration status.
 *
 * This is diagnostic information only.
 */
export function getLatencyIntegrationStatus() {
    return {
        status: "ACTIVE",

        catalogue: "CONNECTED",

        catalogueVersion:
            CATALOGUE_VERSION,

        measurementOnly: true,

        supportedStages:
            [...LATENCY_STAGES],

        measurementCount:
            measurements.size,

        goldenRuleEngine:
            "UNCHANGED",

        domainRuleEngines:
            "UNCHANGED",

        cockpit:
            "UNCHANGED",

        decisionLogic:
            "UNCHANGED",

        riskThresholds:
            "UNCHANGED",

        scenarioRules:
            "UNCHANGED",

        actionRules:
            "UNCHANGED"
    };
}

/**
 * Validate the integrity of the latency integration.
 *
 * This validates the measurement layer itself.
 * It does not validate or modify the Golden Rule Engine.
 */
export function validateLatencyIntegration() {
    const catalogueValid =
        latencyCatalogue &&
        latencyCatalogue.catalogue &&
        typeof latencyCatalogue.catalogue.version ===
            "string";

    const stagesValid =
        Array.isArray(
            latencyCatalogue.latencyStages
        );

    const stagesMatch =
        stagesValid &&
        LATENCY_STAGES.every((stage) =>
            latencyCatalogue.latencyStages.includes(stage)
        );

    return {
        status:
            catalogueValid &&
            stagesValid &&
            stagesMatch
                ? "PASS"
                : "FAIL",

        catalogueValid,

        stagesValid,

        stagesMatch,

        measurementOnly: true,

        goldenRuleEngine:
            "UNCHANGED",

        domainRuleEngines:
            "UNCHANGED",

        cockpit:
            "UNCHANGED"
    };
}

/**
 * Default integration status export.
 */
export default {
    startLatency,
    endLatency,
    recordLatency,
    measureStage,
    createLatencyRecord,
    getLatencyMeasurement,
    getCompletedMeasurements,
    getMeasurementCount,
    clearLatencyMeasurements,
    resetLatencySequence,
    getLatencyCatalogueInfo,
    getLatencyIntegrationStatus,
    validateLatencyIntegration,
    getLatencyStages,
    isSupportedLatencyStage
};