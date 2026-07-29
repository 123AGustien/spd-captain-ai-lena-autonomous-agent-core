/**
 * ============================================================
 * SPD v13.1 — BHR SCENARIO REGISTRY
 * ============================================================
 *
 * Business & Human Rights Resilience Domain
 *
 * Architecture:
 *
 * COCKPIT
 *    ↓
 * domainIntegration.js
 *    ↓
 * BHR Scenario Registry
 *    ↓
 * BHR Rule Engine
 *    ↓
 * BHR Validation Engine
 *    ↓
 * Captain AI Lena Decision Core
 *
 * Design Principle:
 *
 * Scenario registry identifies the event.
 * Rule engine performs assessment.
 * Validation engine verifies output.
 * Golden Rule Engine remains authoritative.
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * ============================================================
 */


export const BHR_DOMAIN_ID = "BHR";


export const BHR_SCENARIO_REGISTRY = {


    BHR_COMPLIANCE_STRESS: {

        id:
            "BHR_COMPLIANCE_STRESS",

        domain:
            "BHR",

        name:
            "Business & Human Rights Compliance Stress",

        description:
            "Evaluates human rights compliance obligations, monitoring requirements, governance exposure, and reporting risks.",

        indicators: [

            "humanRights",

            "governance",

            "reporting"

        ],

        ruleReference:
            "BHR-RULE-001",

        severityLevels: [

            "LOW",

            "MEDIUM",

            "HIGH"

        ]

    },


    BHR_WORKER_SAFETY_EVENT: {

        id:
            "BHR_WORKER_SAFETY_EVENT",

        domain:
            "BHR",

        name:
            "Worker Safety Event",

        description:
            "Evaluates worker safety risks, operational protection requirements, and corrective action needs.",

        indicators: [

            "workerSafety",

            "workplaceConditions",

            "safetyManagement"

        ],

        ruleReference:
            "BHR-RULE-002",

        severityLevels: [

            "LOW",

            "MEDIUM",

            "HIGH"

        ]

    },


    BHR_SUPPLY_CHAIN_RISK: {

        id:
            "BHR_SUPPLY_CHAIN_RISK",

        domain:
            "BHR",

        name:
            "Supply Chain Human Rights Risk",

        description:
            "Evaluates supplier due diligence, ethical sourcing, traceability, and supply chain resilience.",

        indicators: [

            "supplyChain",

            "supplierDueDiligence",

            "traceability"

        ],

        ruleReference:
            "BHR-RULE-003",

        severityLevels: [

            "LOW",

            "MEDIUM",

            "HIGH"

        ]

    },


    BHR_COMMUNITY_IMPACT: {

        id:
            "BHR_COMMUNITY_IMPACT",

        domain:
            "BHR",

        name:
            "Community Impact Risk",

        description:
            "Evaluates community impact, stakeholder engagement, grievance management, and social resilience.",

        indicators: [

            "communityImpact",

            "stakeholderEngagement",

            "grievanceManagement"

        ],

        ruleReference:
            "BHR-RULE-004",

        severityLevels: [

            "LOW",

            "MEDIUM",

            "HIGH"

        ]

    },


    BHR_GOVERNANCE_FAILURE: {

        id:
            "BHR_GOVERNANCE_FAILURE",

        domain:
            "BHR",

        name:
            "Human Rights Governance Failure",

        description:
            "Evaluates governance controls, accountability, compliance oversight, and institutional resilience.",

        indicators: [

            "governance",

            "accountability",

            "complianceControl"

        ],

        ruleReference:
            "BHR-RULE-005",

        severityLevels: [

            "LOW",

            "MEDIUM",

            "HIGH"

        ]

    }


};


/**
 * ============================================================
 * GET SINGLE BHR SCENARIO
 * ============================================================
 */

export function getBHRScenario(
    scenarioId
) {

    const id = String(
        scenarioId || ""
    )
    .trim()
    .toUpperCase();


    return (
        BHR_SCENARIO_REGISTRY[id]
        ||
        null
    );

}


/**
 * ============================================================
 * GET ALL BHR SCENARIOS
 * ============================================================
 */

export function getAllBHRScenarios() {

    return Object.values(
        BHR_SCENARIO_REGISTRY
    );

}


/**
 * ============================================================
 * CHECK SCENARIO EXISTS
 * ============================================================
 */

export function isValidBHRScenario(
    scenarioId
) {

    return Boolean(
        getBHRScenario(
            scenarioId
        )
    );

}


/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {

    BHR_DOMAIN_ID,

    BHR_SCENARIO_REGISTRY,

    getBHRScenario,

    getAllBHRScenarios,

    isValidBHRScenario

};