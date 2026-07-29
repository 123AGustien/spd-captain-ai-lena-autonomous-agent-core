/**
 * SPD v13.1 — BHR Validation Engine
 *
 * Purpose:
 * Validates BHR domain scenario processing.
 *
 * Flow:
 *
 * BHR Scenario
 *       ↓
 * BHR Rule Engine
 *       ↓
 * BHR Validation Engine
 *       ↓
 * Self-Test Validation Engine
 *       ↓
 * Golden Rule Engine
 *       ↓
 * Captain AI Lena Decision Core
 *
 * Golden Rule Engine remains authoritative.
 */


import {
    runBHRRuleEngine
} from "./bhr-rule-engine.js";


/**
 * Validate BHR scenario execution
 */

export function validateBHRScenario(
    scenarioId,
    state = {}
) {

    const result =
        runBHRRuleEngine(
            scenarioId,
            state
        );


    if (!result || result.status === "ERROR") {

        return {

            validationStatus:
                "FAILED",

            domain:
                "BHR",

            reason:
                "BHR scenario execution failed"

        };

    }


    const validationChecks = {


        scenarioLoaded:
            true,


        domainAssessmentComplete:
            result.status ===
            "BHR ASSESSMENT COMPLETE",


        riskScoreGenerated:
            typeof result.riskScore === "number",


        ruleTraceAvailable:
            Array.isArray(result.ruleApplied),


        goldenRuleAuthority:
            result.decisionAuthority ===
            "Golden Rule Engine"

    };


    const passed =
        Object.values(validationChecks)
            .every(
                check => check === true
            );


    return {

        domain:
            "BHR",

        scenario:
            result.scenario,

        validationStatus:
            passed
                ? "PASSED"
                : "FAILED",

        checks:
            validationChecks,

        assessment:
            result.assessment,

        riskScore:
            result.riskScore,

        ruleApplied:
            result.ruleApplied,

        authority:
            "Golden Rule Engine",

        message:
            passed
                ? "BHR VALIDATION COMPLETE"
                : "BHR VALIDATION FAILED"

    };

}