/**
 * ============================================================
 * SPD v13.1 — BUSINESS & HUMAN RIGHTS SCENARIO RULE BRIDGE
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * PURPOSE:
 * Maps cockpit-selected BHR scenarios
 * to authoritative BHR rule definitions.
 *
 *
 * ARCHITECTURE:
 *
 * COCKPIT SCENARIO
 *        ↓
 * BHR SCENARIO RULE BRIDGE
 *        ↓
 * BHR RULE ENGINE
 *        ↓
 * GOLDEN RULE ENGINE
 *        ↓
 * CAPTAIN AI LENA DECISION CORE
 *
 *
 * IMPORTANT:
 *
 * Golden Rule Engine remains authoritative.
 *
 * Deterministic.
 * No randomness.
 *
 * ============================================================
 */


/* ============================================================
   BHR SCENARIO → RULE MAPPING
   ============================================================
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



/* ============================================================
   NORMALIZE SCENARIO
   ============================================================
 */


function normalizeScenario(
    scenario
){

    return String(
        scenario || ""
    )
    .trim()
    .toUpperCase();

}



/* ============================================================
   GET BHR RULE FROM SCENARIO
   ============================================================
 */


export function getBHRRuleFromScenario(
    scenario
){

    const normalizedScenario =
        normalizeScenario(
            scenario
        );


    return (
        BHR_SCENARIO_RULE_MAP[
            normalizedScenario
        ]
        ||
        null
    );

}



/* ============================================================
   VERIFY BHR SCENARIO SUPPORT
   ============================================================
 */


export function isBHRScenarioSupported(
    scenario
){

    return (
        getBHRRuleFromScenario(
            scenario
        )
        !==
        null
    );

}



/* ============================================================
   BHR BRIDGE STATUS
   ============================================================
 */


export const BHR_BRIDGE_STATUS = {

    domain:
        "BHR",

    bridge:
        "BHR_SCENARIO_RULE_BRIDGE",

    scenarios:
        Object.keys(
            BHR_SCENARIO_RULE_MAP
        ).length,

    status:
        "ACTIVE",

    deterministic:
        true,

    goldenRuleAuthority:
        true

};



export default {


    BHR_SCENARIO_RULE_MAP,

    getBHRRuleFromScenario,

    isBHRScenarioSupported,

    BHR_BRIDGE_STATUS


};