/**
 * SPD v13.1 — Assessment Latency Integration
 *
 * PURPOSE:
 * Measure and record the execution latency of the existing
 * SPD assessment pipeline without modifying its authority.
 *
 * IMPORTANT:
 * - Does NOT modify the Golden Rule Engine.
 * - Does NOT modify domain rules.
 * - Does NOT create a second decision engine.
 * - Does NOT change risk thresholds.
 * - Does NOT change decisions or actions.
 * - Does NOT modify cockpit screens.
 *
 * The module observes execution timing and produces
 * latency metadata for validation and audit purposes.
 *
 * Architecture:
 *
 * DOMAIN ENGINE
 *      ↓
 * GOLDEN RULE ENGINE
 *      ↓
 * ASSESSMENT LATENCY OBSERVER
 *      ↓
 * AUDIT / VALIDATION
 *
 * Authority remains with the existing engines.
 */

const LATENCY_CATALOGUE_VERSION = "SPD-V13.1-ALC-1.0";

/**
 * Create a high-resolution timestamp where available.
 */
function timestamp() {
    if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
    ) {
        return performance.now();
    }

    return Date.now();
}

/**
 * Create a latency measurement object.
 */
export function createLatencyMeasurement(stage) {
    return {
        stage,
        start: null,
        end: null,
        durationMs: null
    };
}

/**
 * Start timing an assessment stage.
 */
export function startAssessmentStage(stage) {
    return {
        stage,
        start: timestamp(),
        end: null,
        durationMs: null
    };
}

/**
 * Complete timing for an assessment stage.
 */
export function completeAssessmentStage(measurement) {
    if (!measurement || measurement.start === null) {
        throw new Error(
            "Assessment latency measurement requires a valid start timestamp."
        );
    }

    const end = timestamp();

    return {
        ...measurement,
        end,
        durationMs: Math.max(0, end - measurement.start)
    };
}

/**
 * Build a complete latency catalogue record.
 *
 * This function records timing only.
 * It does not interpret risk or make decisions.
 */
export function buildAssessmentLatencyRecord({
    scenario = null,
    domain = null,
    ruleId = null,
    stages = {},
    executionStatus = "UNKNOWN"
} = {}) {
    const durations = {};

    Object.keys(stages).forEach((stage) => {
        const measurement = stages[stage];

        durations[stage] =
            measurement &&
            typeof measurement.durationMs === "number"
                ? measurement.durationMs
                : null;
    });

    const validDurations = Object.values(durations).filter(
        (value) => typeof value === "number"
    );

    const totalAssessmentLatencyMs =
        validDurations.length > 0
            ? validDurations.reduce((sum, value) => sum + value, 0)
            : null;

    return {
        catalogueVersion: LATENCY_CATALOGUE_VERSION,
        timestamp: new Date().toISOString(),

        scenario,
        domain,
        ruleId,

        stages: durations,

        totalAssessmentLatencyMs,

        executionStatus,

        authority: {
            domainRules: "UNCHANGED",
            goldenRuleEngine: "UNCHANGED",
            cockpit: "UNCHANGED",
            decisionLogic: "UNCHANGED"
        }
    };
}

/**
 * Validate that the latency record is measurement-only.
 */
export function validateLatencyRecord(record) {
    if (!record || typeof record !== "object") {
        return {
            valid: false,
            reason: "INVALID_LATENCY_RECORD"
        };
    }

    if (!record.catalogueVersion) {
        return {
            valid: false,
            reason: "MISSING_CATALOGUE_VERSION"
        };
    }

    if (!record.authority) {
        return {
            valid: false,
            reason: "MISSING_AUTHORITY_DECLARATION"
        };
    }

    return {
        valid: true,
        reason: "LATENCY_RECORD_VALID"
    };
}

/**
 * Return catalogue metadata.
 */
export function getAssessmentLatencyCatalogueStatus() {
    return {
        catalogueVersion: LATENCY_CATALOGUE_VERSION,
        status: "ACTIVE",
        purpose: "ASSESSMENT_LATENCY_MEASUREMENT",

        integrationMode: "NON_INTRUSIVE",

        modifiesGoldenRule: false,
        modifiesDomainRules: false,
        modifiesCockpit: false,
        modifiesDecisionLogic: false,

        authority:
            "EXISTING DOMAIN ENGINES AND GOLDEN RULE ENGINE REMAIN AUTHORITATIVE"
    };
}