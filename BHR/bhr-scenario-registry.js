/**
 * ============================================================
 * SPD v13.1 — BUSINESS & HUMAN RIGHTS SCENARIO REGISTRY
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * DOMAIN:
 * BHR — Business & Human Rights
 *
 * ARCHITECTURE
 * ------------
 *
 * Cockpit
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
 *    ↓
 * Memory Core
 *    ↓
 * Audit Record
 *
 *
 * IMPORTANT
 * ----------
 *
 * Registry defines:
 * - Scenario IDs
 * - Rule mapping
 * - Scenario metadata
 *
 * Assessment logic remains inside:
 * bhr-rule-engine.js
 *
 * Golden Rule Engine remains authoritative.
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */



/* ============================================================
   BHR SCENARIO DEFINITIONS
   ============================================================
 */

export const BHR_SCENARIOS = {


    HUMAN_RIGHTS_DUE_DILIGENCE: {

        id:
            "HUMAN_RIGHTS_DUE_DILIGENCE",

        rule:
            "BHR-001",

        name:
            "Human Rights Due Diligence",

        category:
            "GOVERNANCE"

    },


    FORCED_LABOUR: {

        id:
            "FORCED_LABOUR",

        rule:
            "BHR-002",

        name:
            "Forced Labour",

        category:
            "LABOUR"

    },


    CHILD_LABOUR: {

        id:
            "CHILD_LABOUR",

        rule:
            "BHR-003",

        name:
            "Child Labour",

        category:
            "LABOUR"

    },


    DISCRIMINATION: {

        id:
            "DISCRIMINATION",

        rule:
            "BHR-004",

        name:
            "Discrimination",

        category:
            "EQUALITY"

    },


    OCCUPATIONAL_HEALTH_AND_SAFETY: {

        id:
            "OCCUPATIONAL_HEALTH_AND_SAFETY",

        rule:
            "BHR-005",

        name:
            "Occupational Health & Safety",

        category:
            "SAFETY"

    },


    MODERN_SLAVERY: {

        id:
            "MODERN_SLAVERY",

        rule:
            "BHR-006",

        name:
            "Modern Slavery",

        category:
            "LABOUR"

    },


    COMMUNITY_IMPACT: {

        id:
            "COMMUNITY_IMPACT",

        rule:
            "BHR-007",

        name:
            "Community Impact",

        category:
            "SOCIAL"

    },


    INDIGENOUS_RIGHTS: {

        id:
            "INDIGENOUS_RIGHTS",

        rule:
            "BHR-008",

        name:
            "Indigenous Rights",

        category:
            "HUMAN_RIGHTS"

    },


    SUPPLY_CHAIN_RISK: {

        id:
            "SUPPLY_CHAIN_RISK",

        rule:
            "BHR-009",

        name:
            "Supply Chain Risk",

        category:
            "SUPPLY_CHAIN"

    },


    GRIEVANCE_MECHANISM: {

        id:
            "GRIEVANCE_MECHANISM",

        rule:
            "BHR-010",

        name:
            "Grievance Mechanism",

        category:
            "GOVERNANCE"

    }

};



/* ============================================================
   RULE MAP
   ============================================================
 */

export const BHR_SCENARIO_RULE_MAP = Object.fromEntries(

    Object.values(
        BHR_SCENARIOS
    )
    .map(

        scenario =>

        [

            scenario.id,

            scenario.rule

        ]

    )

);



/* ============================================================
   NORMALIZE SCENARIO ID
   ============================================================
 */

function normalizeScenario(
    scenario
) {

    return String(
        scenario || ""
    )
    .trim()
    .toUpperCase();

}



/* ============================================================
   GET BHR RULE
   ============================================================
 */

export function getBHRRule(
    scenario
) {

    const id =
        normalizeScenario(
            scenario
        );


    return (

        BHR_SCENARIO_RULE_MAP[id]
        ??
        null

    );

}



/* ============================================================
   GET SCENARIO CONFIGURATION
   ============================================================
 */

export function getBHRScenario(
    scenario
) {

    const id =
        normalizeScenario(
            scenario
        );


    const config =
        BHR_SCENARIOS[id];


    if (!config) {

        return {

            domain:
                "BHR",

            scenario:
                id,

            status:
                "UNKNOWN_SCENARIO",

            rule:
                null

        };

    }


    return {

        domain:
            "BHR",

        scenario:
            config.id,

        name:
            config.name,

        category:
            config.category,

        rule:
            config.rule,

        status:
            "REGISTERED"

    };

}



/* ============================================================
   GET ALL SCENARIOS
   ============================================================
 */

export function getAllBHRScenarios() {

    return Object.values(
        BHR_SCENARIOS
    );

}



/* ============================================================
   VALIDATE SCENARIO
   ============================================================
 */

export function validateBHRScenario(
    scenario
) {

    const id =
        normalizeScenario(
            scenario
        );


    return {

        scenario:
            id,

        exists:
            Boolean(
                BHR_SCENARIOS[id]
            ),

        rule:
            getBHRRule(
                id
            )

    };

}



/* ============================================================
   REGISTRY STATUS
   ============================================================
 */

export const BHR_REGISTRY_STATUS = {


    domain:
        "BHR",


    name:
        "Business & Human Rights Scenario Registry",


    scenarios:
        10,


    rules:

        [

            "BHR-001",

            "BHR-002",

            "BHR-003",

            "BHR-004",

            "BHR-005",

            "BHR-006",

            "BHR-007",

            "BHR-008",

            "BHR-009",

            "BHR-010"

        ],


    status:
        "ACTIVE",


    deterministic:
        true,


    goldenRuleAuthority:
        true,


    assessmentEngine:
        "BHR_RULE_ENGINE"

};



export default {


    BHR_SCENARIOS,

    BHR_SCENARIO_RULE_MAP,

    getBHRRule,

    getBHRScenario,

    getAllBHRScenarios,

    validateBHRScenario,

    BHR_REGISTRY_STATUS

};