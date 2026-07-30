/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-007
 * Rule Name: Community Impact Assessment
 *
 * Purpose:
 * Detect, assess, prevent, and remediate adverse impacts
 * on affected communities and stakeholders.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_007_COMMUNITY_IMPACT = {

    id: "BHR-007",

    domain: "BHR",

    name: "Community Impact Assessment",

    category: "Community Rights",

    description:
        "Evaluates risks involving community disruption, environmental-social impacts, stakeholder concerns, and inadequate engagement.",


    triggers: [
        "community complaint",
        "social impact concern",
        "project affected community",
        "stakeholder conflict",
        "community engagement failure"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.communityComplaint) {
            riskScore += 25;
        }

        if (state.socialImpactRisk) {
            riskScore += 25;
        }

        if (state.stakeholderConflict) {
            riskScore += 25;
        }

        if (state.engagementFailure) {
            riskScore += 25;
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
                "ACTIVATE COMMUNITY IMPACT REMEDIATION MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE COMMUNITY ENGAGEMENT CONTROLS"

                :

                "CONTINUE COMMUNITY MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY COMMUNITY IMPACT",
                    "ENGAGE AFFECTED STAKEHOLDERS",
                    "IMPLEMENT REMEDIATION ACTION",
                    "MONITOR COMMUNITY RECOVERY"
                ]

                :

                [
                    "MAINTAIN STAKEHOLDER ENGAGEMENT",
                    "UPDATE COMMUNITY RISK REGISTER"
                ]

        };

    }

};


export default BHR_007_COMMUNITY_IMPACT;
