/**
 * SPD v13.1 — Analytics Layer Registry
 *
 * Purpose:
 * Advisory intelligence layer.
 *
 * Architecture:
 *
 * System State
 *      ↓
 * Analytics Registry
 *      ↓
 * Cascade Detection
 *      ↓
 * Causal Analysis
 *      ↓
 * Audit Record
 *
 * Analytics does NOT modify:
 * - System state
 * - Golden Rule Engine
 * - Captain AI Lena decision
 */

import { detectCascade } from "./cascadeDetectionEngine.js";
import { analyseRelationships } from "./causalAnalysisEngine.js";


export function runAnalytics(state) {

    if (!state || typeof state !== "object") {
        return {
            status: "INVALID_ANALYTICS_INPUT",
            cascadeAnalysis: null,
            causalAnalysis: null
        };
    }

    return {
        status: "ANALYTICS_COMPLETE",

        cascadeAnalysis: detectCascade(state),

        causalAnalysis: analyseRelationships(state)
    };
}