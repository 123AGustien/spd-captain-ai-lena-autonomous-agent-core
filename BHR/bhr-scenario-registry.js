/**
 * SPD v13.1 — Business & Human Rights (BHR) Scenario Registry
 *
 * Purpose:
 * Central registry for all BHR domain scenarios.
 *
 * Architecture:
 * COCKPIT
 *    ↓
 * domainIntegration.js
 *    ↓
 * BHR Scenario Registry
 *    ↓
 * BHR Rule Engine
 *    ↓
 * Golden Rule Engine
 *    ↓
 * Captain AI Lena Decision Core
 *
 * Design Principle:
 * Domain scenarios identify and assess risk.
 * They do not override the authoritative core engine.
 */

export const BHR_SCENARIO_REGISTRY = {

    BHR_COMPLIANCE_STRESS: {
        id: "BHR_COMPLIANCE_STRESS",
        domain: "BHR",
        name: "Business & Human Rights Compliance Stress",
        description:
            "Evaluates human rights compliance obligations, monitoring requirements, and reporting risks.",
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
        id: "BHR_WORKER_SAFETY_EVENT",
        domain: "BHR",
        name: "Worker Safety Event",
        description:
            "Evaluates worker safety risks and operational protection requirements.",
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
        id: "BHR_SUPPLY_CHAIN_RISK",
        domain: "BHR",
        name: "Supply Chain Human Rights Risk",
        description:
            "Evaluates supplier due diligence, ethical sourcing, and supply chain resilience.",
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
        id: "BHR_COMMUNITY_IMPACT",
        domain: "BHR",
        name: "Community Impact Risk",
        description:
            "Evaluates community impact, stakeholder engagement, and social resilience.",
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
        id: "BHR_GOVERNANCE_FAILURE",
        domain: "BHR",
        name: "Human Rights Governance Failure",
        description:
            "Evaluates governance controls, accountability, and compliance oversight.",
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
 * Retrieve BHR scenario definition
 */
export function getBHRScenario(scenarioId) {

    return BHR_SCENARIO_REGISTRY[scenarioId] || null;

}


/**
 * Return all available BHR scenarios
 */
export function getAllBHRScenarios() {

    return Object.values(BHR_SCENARIO_REGISTRY);

}