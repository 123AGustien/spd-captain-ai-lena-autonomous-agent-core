/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-006
 * Rule Name: Modern Slavery Prevention
 *
 * Purpose:
 * Detect, assess, prevent, and remediate modern slavery
 * risks across operations and supply chains.
 *
 * Golden Rule Integration:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 */

const BHR_006_MODERN_SLAVERY = {

    id: "BHR-006",

    domain: "BHR",

    name: "Modern Slavery Prevention",

    category: "Human Exploitation Prevention",

    description:
        "Evaluates risks involving slavery, servitude, trafficking, exploitation, coercion, and severe labour rights violations.",


    triggers: [
        "modern slavery allegation",
        "human trafficking concern",
        "exploitation detected",
        "severe labour rights violation",
        "high-risk supplier identified"
    ],


    assess(state) {

        let riskScore = 0;


        if (state.traffickingRisk) {
            riskScore += 35;
        }

        if (state.exploitationRisk) {
            riskScore += 25;
        }

        if (state.coercionRisk) {
            riskScore += 20;
        }

        if (state.highRiskSupplier) {
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
                "ACTIVATE MODERN SLAVERY RESPONSE MODE"

                :

                risk === "MEDIUM"
                ?
                "ENHANCE EXPLOITATION PREVENTION CONTROLS"

                :

                "CONTINUE MODERN SLAVERY MONITORING",


            action:

                risk === "HIGH"
                ?
                [
                    "VERIFY ALLEGED EXPLOITATION",
                    "PROTECT AFFECTED PERSONS",
                    "STOP HIGH-RISK ACTIVITY",
                    "IMPLEMENT REMEDIATION PLAN",
                    "AUDIT SUPPLY CHAIN"
                ]

                :

                [
                    "MAINTAIN SUPPLIER DUE DILIGENCE",
                    "UPDATE HUMAN RIGHTS RISK REGISTER"
                ]

        };

    }

};


export default BHR_006_MODERN_SLAVERY;
