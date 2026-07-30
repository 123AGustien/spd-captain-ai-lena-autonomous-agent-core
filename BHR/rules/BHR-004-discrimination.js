/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-004
 * Rule Name: Discrimination Prevention
 *
 * Purpose:
 * Detect, assess, prevent, and remediate discrimination risks
 * affecting workers, communities, and stakeholders.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_004_DISCRIMINATION = {

    id: "BHR-004",

    domain: "BHR",

    name: "Discrimination Prevention",

    category: "Equal Opportunity & Fair Treatment",

    description:
        "Evaluates risks involving unequal treatment, harassment, exclusion, unfair employment practices, and discriminatory impacts.",


    triggers: [
        "discrimination allegation",
        "unequal treatment complaint",
        "harassment concern",
        "unfair employment practice",
        "stakeholder discrimination risk"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.discriminationComplaint) {
            riskScore += 30;
        }

        if (state.harassmentRisk) {
            riskScore += 25;
        }

        if (state.equalOpportunityFailure) {
            riskScore += 25;
        }

        if (state.policyComplianceFailure) {
            riskScore += 20;
        }


        let risk =
            riskScore >= 70 ? "HIGH" :
            riskScore >= 40 ? "MEDIUM" :
            "LOW";


        return {

            rule: this.id,

            assessment: {
                riskScore,
                risk
            },


            decision:

                risk === "HIGH"
                ?
                "ACTIVATE DISCRIMINATION REMEDIATION MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE EQUALITY AND INCLUSION CONTROLS"

                :

                "CONTINUE FAIR TREATMENT MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY DISCRIMINATION CLAIM",
                    "PROTECT AFFECTED PERSONS",
                    "IMPLEMENT CORRECTIVE ACTION",
                    "MONITOR REMEDIATION OUTCOME"
                ]

                :

                [
                    "MAINTAIN EQUAL OPPORTUNITY POLICY",
                    "UPDATE HUMAN RIGHTS RISK RECORD"
                ]

        };

    }

};


export default BHR_004_DISCRIMINATION;
