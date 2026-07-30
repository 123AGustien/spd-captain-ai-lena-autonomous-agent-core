/**
 * SPD v13.1 — Business & Human Rights Rule Registry
 *
 * Rule ID: BHR-002
 * Domain: Business & Human Rights
 * Scenario: Forced Labour
 *
 * Purpose:
 * Detect, assess and mitigate forced labour risks
 * through the SPD Golden Rule Engine.
 *
 * Pipeline:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_002_FORCED_LABOUR = {
    ruleId: "BHR-002",

    domain: "BHR",

    scenario: "FORCED_LABOUR",

    title: "Forced Labour Risk Assessment",

    description:
        "Identifies indicators of forced labour including coercion, restricted movement, debt bondage, retention of identity documents, and unsafe labour practices.",

    riskIndicators: [
        "coercion",
        "restricted_movement",
        "debt_bondage",
        "identity_document_retention",
        "threats_or_intimidation",
        "unpaid_or_withheld_wages"
    ],

    assessment: function(state) {

        let riskScore = 0;

        if (state.coercion) riskScore += 20;
        if (state.restrictedMovement) riskScore += 20;
        if (state.debtBondage) riskScore += 20;
        if (state.documentRetention) riskScore += 15;
        if (state.threats) riskScore += 15;
        if (state.wageViolation) riskScore += 10;

        return {
            ruleId: this.ruleId,
            scenario: this.scenario,
            riskScore: riskScore,
            status:
                riskScore >= 70 ? "HIGH_RISK" :
                riskScore >= 40 ? "MEDIUM_RISK" :
                "LOW_RISK"
        };
    },

    decision: function(result) {

        if (result.status === "HIGH_RISK") {
            return {
                decision: "ACTIVATE_HUMAN_RIGHTS_PROTECTION_MODE",
                action:
                    "STOP FORCED LABOUR EXPOSURE AND INITIATE IMMEDIATE REMEDIATION"
            };
        }

        if (result.status === "MEDIUM_RISK") {
            return {
                decision: "PREVENTIVE_BHR_RESILIENCE_MODE",
                action:
                    "INVESTIGATE LABOUR CONDITIONS AND APPLY CORRECTIVE CONTROLS"
            };
        }

        return {
            decision: "MONITOR_FORCED_LABOUR_RISK",
            action:
                "CONTINUE DUE DILIGENCE MONITORING"
        };
    }
};

export default BHR_002_FORCED_LABOUR;