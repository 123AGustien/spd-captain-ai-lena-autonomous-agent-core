/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-002
 * Rule Name: Forced Labour Prevention
 *
 * Purpose:
 * Detect, assess, prevent, and remediate forced labour risks
 * within operations and supply chains.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_002_FORCED_LABOUR = {

    id: "BHR-002",

    domain: "BHR",

    name: "Forced Labour Prevention",

    category: "Labour Rights",

    description:
        "Evaluates indicators of forced labour including coercion, restricted movement, document retention, threats, and involuntary work.",


    triggers: [
        "forced labour allegation",
        "worker coercion detected",
        "retained worker documents",
        "restricted worker movement",
        "supplier labour violation"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.coercionRisk) {
            riskScore += 30;
        }

        if (state.documentRetentionRisk) {
            riskScore += 20;
        }

        if (state.movementRestrictionRisk) {
            riskScore += 25;
        }

        if (state.supplierLabourRisk) {
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
                "ACTIVATE FORCED LABOUR REMEDIATION MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE LABOUR RIGHTS CONTROL MEASURES"

                :

                "CONTINUE FORCED LABOUR MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY WORKER CONDITIONS",
                    "STOP IDENTIFIED ABUSE",
                    "PROTECT AFFECTED WORKERS",
                    "IMPLEMENT REMEDIATION PLAN"
                ]

                :

                [
                    "MAINTAIN LABOUR DUE DILIGENCE",
                    "UPDATE SUPPLIER RISK RECORDS"
                ]

        };

    }

};


export default BHR_002_FORCED_LABOUR;
