/**
 * SPD v13.1 — Business & Human Rights Rule Registry
 *
 * Rule ID: BHR-004
 * Domain: Business & Human Rights
 * Scenario: Discrimination
 *
 * Purpose:
 * Detect, assess and mitigate discrimination risks
 * affecting workers, communities and stakeholders.
 *
 * Pipeline:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_004_DISCRIMINATION = {

    ruleId: "BHR-004",

    domain: "BHR",

    scenario: "DISCRIMINATION",

    title: "Discrimination Risk Assessment",

    description:
        "Identifies discrimination risks including unequal treatment, harassment, exclusion, unequal opportunity, and biased employment practices.",


    riskIndicators: [

        "unequal_treatment",
        "harassment",
        "exclusion_from_opportunity",
        "biased_recruitment",
        "unequal_pay",
        "retaliation_against_complaints"
    ],


    assessment: function(state) {

        let riskScore = 0;


        if (state.unequalTreatment)
            riskScore += 20;

        if (state.harassment)
            riskScore += 20;

        if (state.exclusion)
            riskScore += 15;

        if (state.biasedRecruitment)
            riskScore += 15;

        if (state.unequalPay)
            riskScore += 15;

        if (state.retaliation)
            riskScore += 15;


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
                    "ACTIVATE_EQUALITY_PROTECTION_MODE",

                action:
                    "STOP DISCRIMINATORY PRACTICES AND INITIATE REMEDIATION"
            };
        }


        if (result.status === "MEDIUM_RISK") {

            return {

                decision:
                    "PREVENTIVE_HUMAN_RIGHTS_CONTROL_MODE",

                action:
                    "INVESTIGATE COMPLAINTS AND STRENGTHEN FAIRNESS CONTROLS"
            };
        }


        return {

            decision:
                "MONITOR_EQUALITY_RISK",

            action:
                "CONTINUE DISCRIMINATION PREVENTION MONITORING"
        };
    }

};


export default BHR_004_DISCRIMINATION;