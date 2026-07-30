/**
 * SPD v13.1 — Business & Human Rights Audit Registry
 *
 * Purpose:
 * Central registry for BHR scenario audit requirements.
 *
 * Domains:
 * Human Rights Due Diligence
 * Forced Labour
 * Child Labour
 * Discrimination
 * Occupational Health & Safety
 * Modern Slavery
 * Community Impact
 * Indigenous Rights
 * Supply Chain Risk
 * Grievance Mechanism
 *
 * Golden Rule Engine remains authoritative.
 */

export const BHR_AUDIT_REGISTRY = {

    HUMAN_RIGHTS_DUE_DILIGENCE: {
        category: "BHR",
        auditFocus: [
            "POLICY_ALIGNMENT",
            "RISK_IDENTIFICATION",
            "MITIGATION_REVIEW",
            "STAKEHOLDER_CONSIDERATION"
        ],
        evidenceRequired: true
    },

    FORCED_LABOUR: {
        category: "BHR",
        auditFocus: [
            "LABOUR_CONDITIONS",
            "WORKER_FREEDOM",
            "RECRUITMENT_PRACTICES",
            "SUPPLIER_SCREENING"
        ],
        evidenceRequired: true
    },

    CHILD_LABOUR: {
        category: "BHR",
        auditFocus: [
            "AGE_VERIFICATION",
            "SUPPLY_CHAIN_CHECK",
            "REMEDIATION_PROCESS"
        ],
        evidenceRequired: true
    },

    DISCRIMINATION: {
        category: "BHR",
        auditFocus: [
            "EQUALITY_ASSESSMENT",
            "WORKPLACE_FAIRNESS",
            "COMPLAINT_HANDLING"
        ],
        evidenceRequired: true
    },

    OCCUPATIONAL_HEALTH_AND_SAFETY: {
        category: "BHR",
        auditFocus: [
            "SAFETY_MANAGEMENT",
            "INCIDENT_PREVENTION",
            "EMERGENCY_RESPONSE",
            "WORKER_PROTECTION"
        ],
        evidenceRequired: true
    },

    MODERN_SLAVERY: {
        category: "BHR",
        auditFocus: [
            "MODERN_SLAVERY_RISK",
            "SUPPLIER_DUE_DILIGENCE",
            "CONTROL_MEASURES"
        ],
        evidenceRequired: true
    },

    COMMUNITY_IMPACT: {
        category: "BHR",
        auditFocus: [
            "COMMUNITY_CONSULTATION",
            "SOCIAL_IMPACT",
            "REMEDIATION"
        ],
        evidenceRequired: true
    },

    INDIGENOUS_RIGHTS: {
        category: "BHR",
        auditFocus: [
            "CONSULTATION",
            "CULTURAL_RESPECT",
            "LAND_AND_RESOURCE_IMPACT",
            "STAKEHOLDER_ENGAGEMENT"
        ],
        evidenceRequired: true
    },

    SUPPLY_CHAIN_RISK: {
        category: "BHR",
        auditFocus: [
            "SUPPLIER_SCREENING",
            "TRACEABILITY",
            "RISK_MONITORING",
            "CORRECTIVE_ACTION"
        ],
        evidenceRequired: true
    },

    GRIEVANCE_MECHANISM: {
        category: "BHR",
        auditFocus: [
            "REPORTING_CHANNELS",
            "ACCESSIBILITY",
            "INVESTIGATION_PROCESS",
            "RESPONSE_TRACKING"
        ],
        evidenceRequired: true
    }

};


/**
 * Retrieve BHR audit requirements
 */

export function getBHRAuditProfile(scenario) {

    return BHR_AUDIT_REGISTRY[scenario] || {

        category: "BHR",

        auditFocus: [
            "GENERAL_HUMAN_RIGHTS_REVIEW"
        ],

        evidenceRequired: true

    };

}
