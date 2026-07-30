/**
 * SPD v13.1 — Analytics Layer Registry
 */

const { detectCascade } = require("./cascadeDetectionEngine");
const { analyseRelationships } = require("./causalAnalysisEngine");

function runAnalytics(state) {

    return {
        cascadeAnalysis: detectCascade(state),
        causalAnalysis: analyseRelationships(state)
    };
}

module.exports = {
    runAnalytics
};