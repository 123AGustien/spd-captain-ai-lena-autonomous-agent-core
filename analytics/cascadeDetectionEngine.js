/**
 * SPD v13.1 — Cascade Detection Engine
 *
 * Purpose:
 * Detect possible cascading stress pathways
 * without changing the Golden Rule Engine.
 *
 * Authority:
 * Supporting analytics layer only.
 */

function detectCascade(state) {

    const cascadePaths = [];

    if (state.cyb >= 40 && state.dc >= 40) {
        cascadePaths.push({
            path: ["CYB", "DC"],
            risk: "POTENTIAL CASCADE"
        });
    }

    if (state.energy <= 30 && state.dc >= 40) {
        cascadePaths.push({
            path: ["ENERGY", "DC"],
            risk: "POTENTIAL CASCADE"
        });
    }

    if (state.fx >= 60 && state.energy <= 30) {
        cascadePaths.push({
            path: ["FX", "ENERGY"],
            risk: "POTENTIAL CASCADE"
        });
    }

    return {
        status: "COMPLETE",
        cascadeDetected: cascadePaths.length > 0,
        cascadeCount: cascadePaths.length,
        paths: cascadePaths
    };
}

module.exports = {
    detectCascade
};