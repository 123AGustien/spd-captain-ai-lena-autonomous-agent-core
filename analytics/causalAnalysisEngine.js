/**
 * SPD v13.1 — Causal Analysis Support Engine
 *
 * Purpose:
 * Monitor possible stress relationships.
 *
 * This does not replace Golden Rule Engine.
 */

function analyseRelationships(state) {

    const relationships = [];

    if (state.energy < 35 && state.dc > 40) {
        relationships.push({
            relationship: "ENERGY → DC",
            status: "MONITOR"
        });
    }

    if (state.cyb > 50 && state.inf > 50) {
        relationships.push({
            relationship: "CYB → INF",
            status: "MONITOR"
        });
    }

    return {
        status: "COMPLETE",
        relationships
    };
}

module.exports = {
    analyseRelationships
};