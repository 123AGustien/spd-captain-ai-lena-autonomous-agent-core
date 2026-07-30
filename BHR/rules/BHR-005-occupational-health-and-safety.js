/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-005
 * Rule Name: Occupational Health & Safety
 *
 * Purpose:
 * Detect, assess, prevent, and remediate workplace
 * health and safety risks.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_005_OCCUPATIONAL_HEALTH_AND_SAFETY = {

    id: "BHR-005",

    domain: "BHR",

    name: "Occupational Health & Safety",

    category: "Worker Safety",

    description:
        "Evaluates workplace hazards, safety control failures, incidents, and occupational health risks affecting workers.",


    triggers: [
        "workplace accident",
        "safety control failure",
        "hazard exposure detected",
        "occupational illness risk",
        "unsafe working condition"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.workplaceHazardRisk) {
            riskScore += 25;
        }

        if (state.safetyControlFailure) {
            riskScore += 25;
        }

        if (state.incidentDetected) {
            riskScore += 30;
        }

        if (state.healthExposureRisk) {
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
                "ACTIVATE OCCUPATIONAL SAFETY STABILIZATION MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE WORKPLACE SAFETY CONTROLS"

                :

                "CONTINUE HEALTH AND SAFETY MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY SAFETY INCIDENT",
                    "CONTROL IMMEDIATE HAZARD",
                    "PROTECT AFFECTED WORKERS",
                    "IMPLEMENT CORRECTIVE ACTION",
                    "MONITOR RECOVERY"
                ]

                :

                [
                    "MAINTAIN SAFETY MANAGEMENT SYSTEM",
                    "UPDATE OCCUPATIONAL RISK REGISTER"
                ]

        };

    }

};


export default BHR_005_OCCUPATIONAL_HEALTH_AND_SAFETY;
