/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-003
 * Rule Name: Child Labour Prevention
 *
 * Purpose:
 * Detect, prevent, and remediate child labour risks
 * across operations and supply chains.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_003_CHILD_LABOUR = {

    id: "BHR-003",

    domain: "BHR",

    name: "Child Labour Prevention",

    category: "Labour Rights",

    description:
        "Evaluates risks involving underage workers, age verification failures, hazardous child employment, and supplier compliance failures.",


    triggers: [
        "child labour allegation",
        "age verification failure",
        "underage worker detected",
        "supplier child labour risk",
        "hazardous youth employment concern"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.ageVerificationFailure) {
            riskScore += 30;
        }

        if (state.underageWorkerRisk) {
            riskScore += 30;
        }

        if (state.hazardousWorkRisk) {
            riskScore += 20;
        }

        if (state.supplierComplianceFailure) {
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
                "ACTIVATE CHILD LABOUR REMEDIATION MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE CHILD LABOUR PREVENTION CONTROLS"

                :

                "CONTINUE CHILD LABOUR MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY AGE AND WORK CONDITIONS",
                    "REMOVE CHILD FROM HARMFUL WORK",
                    "PROVIDE REMEDIATION SUPPORT",
                    "AUDIT SUPPLY CHAIN SOURCE"
                ]

                :

                [
                    "MAINTAIN AGE VERIFICATION PROCESS",
                    "UPDATE HUMAN RIGHTS RISK REGISTER"
                ]

        };

    }

};


export default BHR_003_CHILD_LABOUR;
