/**
 * ============================================================
 * SPD v13.1 — BUSINESS & HUMAN RIGHTS SCENARIO REGISTRY
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE
 * -------
 * Central registry for all BHR scenarios.
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
 * IMPORTANT
 * ---------
 * Registry only defines scenarios and rule mapping.
 * Assessment logic remains inside BHR Rule Engine.
 *
 * Golden Rule Engine remains authoritative.
 * ============================================================
 */



export const BHR_SCENARIOS = {


    HUMAN_RIGHTS_DUE_DILIGENCE:
        "HUMAN_RIGHTS_DUE_DILIGENCE",


    FORCED_LABOUR:
        "FORCED_LABOUR",


    CHILD_LABOUR:
        "CHILD_LABOUR",


    DISCRIMINATION:
        "DISCRIMINATION",


    OCCUPATIONAL_HEALTH_AND_SAFETY:
        "OCCUPATIONAL_HEALTH_AND_SAFETY",


    MODERN_SLAVERY:
        "MODERN_SLAVERY",


    COMMUNITY_IMPACT:
        "COMMUNITY_IMPACT",


    INDIGENOUS_RIGHTS:
        "INDIGENOUS_RIGHTS",


    SUPPLY_CHAIN_RISK:
        "SUPPLY_CHAIN_RISK",


    GRIEVANCE_MECHANISM:
        "GRIEVANCE_MECHANISM"

};



/**
 * ============================================================
 * BHR SCENARIO TO RULE MAPPING
 * ============================================================
 */

export const BHR_SCENARIO_RULE_MAP = {


    HUMAN_RIGHTS_DUE_DILIGENCE:
        "BHR-001",


    FORCED_LABOUR:
        "BHR-002",


    CHILD_LABOUR:
        "BHR-003",


    DISCRIMINATION:
        "BHR-004",


    OCCUPATIONAL_HEALTH_AND_SAFETY:
        "BHR-005",


    MODERN_SLAVERY:
        "BHR-006",


    COMMUNITY_IMPACT:
        "BHR-007",


    INDIGENOUS_RIGHTS:
        "BHR-008",


    SUPPLY_CHAIN_RISK:
        "BHR-009",


    GRIEVANCE_MECHANISM:
        "BHR-010"

};



/**
 * ============================================================
 * GET RULE FOR SCENARIO
 * ============================================================
 */

export function getBHRRule(
    scenario
) {

    return (

        BHR_SCENARIO_RULE_MAP[scenario]
        ??
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
        BHR_SCENARIOS
    );

}



/**
 * ============================================================
 * GET SCENARIO BY ID
 * ============================================================
 */

export function getBHRScenario(
    scenario
) {

    return {

        scenario,

        rule:
            getBHRRule(
                scenario
            ),

        domain:
            "BHR"

    };

}



/**
 * ============================================================
 * EXPORT STATUS
 * ============================================================
 */

export const BHR_REGISTRY_STATUS = {

    domain:
        "BHR",

    scenarios:
        10,

    status:
        "ACTIVE",

    deterministic:
        true,

    goldenRuleAuthority:
        true

};