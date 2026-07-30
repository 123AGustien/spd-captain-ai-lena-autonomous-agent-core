/**
 * SPD v13.1 — Business & Human Rights Rule Engine
 *
 * Rule ID: BHR-008
 * Domain: Business & Human Rights
 * Scenario: INDIGENOUS_RIGHTS
 *
 * Purpose:
 * Assess and manage risks affecting Indigenous Peoples,
 * including consultation, cultural protection, and rights impact.
 */

export const BHR_008_INDIGENOUS_RIGHTS = {
    id: "BHR-008",
    name: "Indigenous Rights",
    domain: "BHR",
    scenario: "INDIGENOUS_RIGHTS",

    riskFactors: [
        "lack of free prior informed consultation",
        "cultural heritage impact",
        "land rights conflict",
        "resource access disruption",
        "community rights violation"
    ],

    assessment: {
        observe: [
            "Identify Indigenous communities potentially affected",
            "Monitor cultural, social, and land impacts",
            "Record stakeholder concerns"
        ],

        verify: [
            "Verify consultation and engagement processes",
            "Confirm rights protection measures",
            "Validate impact assessment evidence"
        ],

        assess: {
            low: "Indigenous rights risks controlled",
            medium: "Enhanced consultation and mitigation required",
            high: "Immediate rights protection action required"
        }
    },

    decisions: {
        low: "INDIGENOUS_RIGHTS_MONITORING",
        medium: "INDIGENOUS_ENGAGEMENT_MODE",
        high: "INDIGENOUS_RIGHTS_PROTECTION_MODE"
    },

    actions: [
        "Conduct meaningful consultation",
        "Protect cultural heritage",
        "Implement agreed mitigation measures",
        "Monitor corrective actions",
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

export default BHR_008_INDIGENOUS_RIGHTS;
