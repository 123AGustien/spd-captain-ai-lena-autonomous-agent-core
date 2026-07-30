/**
 * SPD v13.1 — Business & Human Rights Rule Registry
 *
 * Rule ID: BHR-003
 * Domain: Business & Human Rights
 * Scenario: Child Labour
 *
 * Purpose:
 * Detect, assess and mitigate child labour risks
 * through the SPD Golden Rule Engine.
 *
 * Pipeline:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_003_CHILD_LABOUR = {

    ruleId: "BHR-003",

    domain: "BHR",

    scenario: "CHILD_LABOUR",

    title: "Child Labour Risk Assessment",

    description:
        "Identifies risks involving underage employment, hazardous work exposure, illegal recruitment, and failure to protect children's rights.",

    riskIndicators: [
        "underage_worker_detected",
        "age_verification_failure",
        "hazardous_work_assignment",
        "illegal_recruitment",
        "blocked_access_to_education",
        "supplier_child_labour_violation"
    ],

    assessment: function(state) {

        let riskScore = 0;

        if (state.underageWorker) riskScore += 30;
        if (state.ageVerificationFailure) riskScore += 20;
        if (state.hazardousWork) riskScore += 20;
        if (state.illegalRecruitment) riskScore += 15;
        if (state.educationBlocked) riskScore += 10;
        if (state.supplierViolation) riskScore += 5;

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
                    "ACTIVATE_CHILD_PROTECTION_MODE",

                action:
                    "REMOVE CHILD LABOUR EXPOSURE AND INITIATE IMMEDIATE REMEDIATION"
            };
        }


        if (result.status === "MEDIUM_RISK") {

            return {
                decision:
                    "PREVENTIVE_CHILD_RIGHTS_CONTROL_MODE",

                action:
                    "VERIFY AGE CONTROLS AND STRENGTHEN SUPPLIER OVERSIGHT"
            };
        }


        return {

            decision:
                "MONITOR_CHILD_LABOUR_RISK",

            action:
                "CONTINUE CHILD RIGHTS DUE DILIGENCE MONITORING"
        };
    }
};


export default BHR_003_CHILD_LABOUR;