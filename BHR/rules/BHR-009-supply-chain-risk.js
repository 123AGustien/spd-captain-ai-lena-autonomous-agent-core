/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-009
 * Domain: Business & Human Rights
 * Scenario: SUPPLY_CHAIN_RISK
 *
 * Purpose:
 * Identify, assess, and mitigate human rights risks
 * throughout supply chain operations.
 */

export const BHR_009_SUPPLY_CHAIN_RISK = {
    id: "BHR-009",
    name: "Supply Chain Risk",
    domain: "BHR",
    scenario: "SUPPLY_CHAIN_RISK",

    riskFactors: [
        "supplier human rights violations",
        "labour exploitation",
        "lack of supplier due diligence",
        "unsafe working conditions",
        "non-compliance with ethical standards"
    ],

    assessment: {
        observe: [
            "Monitor supplier activities",
            "Identify human rights risk exposure",
            "Track supply chain vulnerabilities"
        ],

        verify: [
            "Verify supplier compliance records",
            "Validate audits and certifications",
            "Confirm corrective action evidence"
        ],

        assess: {
            low: "Supply chain controls operating effectively",
            medium: "Supplier risk mitigation required",
            high: "Immediate supplier intervention required"
        }
    },

    decisions: {
        low: "SUPPLY_CHAIN_MONITORING",
        medium: "SUPPLIER_CORRECTIVE_ACTION_MODE",
        high: "SUPPLY_CHAIN_RISK_CONTROL_MODE"
    },

    actions: [
        "Perform supplier due diligence",
        "Engage suppliers on corrective measures",
        "Suspend or review high-risk suppliers",
        "Monitor improvement actions",
        "Update BHR audit record"
    ],

    goldenRulePipeline: [
        "OBSERVE",
        "VERIFY",
        "ASSESS",
        "DECIDE",
        "ACT",
        "UPDATE"
    ]
};

export default BHR_009_SUPPLY_CHAIN_RISK;
