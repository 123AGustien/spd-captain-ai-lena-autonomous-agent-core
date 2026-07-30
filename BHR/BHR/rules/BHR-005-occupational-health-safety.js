/**
 * SPD v13.1 — Business & Human Rights Rule Registry
 *
 * Rule ID: BHR-005
 * Domain: Business & Human Rights
 * Scenario: Occupational Health & Safety
 *
 * Purpose:
 * Detect, assess and mitigate workplace health and safety risks.
 *
 * Pipeline:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_005_OCCUPATIONAL_HEALTH_SAFETY = {

    ruleId: "BHR-005",

    domain: "BHR",

    scenario: "OCCUPATIONAL_HEALTH_SAFETY",

    title: "Occupational Health & Safety Risk Assessment",

    description:
        "Identifies workplace hazards, unsafe conditions, inadequate controls, incidents, and failures to protect worker safety.",


    riskIndicators: [

        "unsafe_work_condition",
        "missing_safety_controls",
        "workplace_incident",
        "high_risk_exposure",
        "insufficient_training",
        "failure_to_report_incidents"
    ],


    assessment: function(state) {

        let riskScore = 0;


        if (state.unsafeCondition)
            riskScore += 25;

        if (state.missingSafetyControls)
            riskScore += 20;

        if (state.workplaceIncident)
            riskScore += 20;

        if (state.highRiskExposure)
            riskScore += 15;

        if (state.insufficientTraining)
            riskScore += 10;

        if (state.failureToReport)
            riskScore += 10;


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

                decision:
                    "ACTIVATE_WORKER_SAFETY_PROTECTION_MODE",

                action:
                    "STOP UNSAFE OPERATIONS AND IMPLEMENT IMMEDIATE SAFETY CONTROLS"
            };
        }


        if (result.status === "MEDIUM_RISK") {

            return {

                decision:
                    "PREVENTIVE_SAFETY_CONTROL_MODE",

                action:
                    "STRENGTHEN RISK CONTROLS, TRAINING AND MONITORING"
            };
        }


        return {

            decision:
                "MONITOR_WORKPLACE_SAFETY",

            action:
                "CONTINUE OCCUPATIONAL HEALTH AND SAFETY ASSURANCE"
        };
    }

};


export default BHR_005_OCCUPATIONAL_HEALTH_SAFETY;