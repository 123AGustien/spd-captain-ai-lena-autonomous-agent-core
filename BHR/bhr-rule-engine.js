/**
 * ============================================================
 * SPD v13.1 — BHR RULE ENGINE
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Business & Human Rights Assessment Engine
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * Golden Rule Engine remains authoritative.
 *
 * ============================================================
 */


import {
    getBHRScenario
} from "./bhr-scenario-registry.js";



/**
 * ============================================================
 * RUN BHR RULE ENGINE
 * ============================================================
 */

export function runBHRRuleEngine(
    scenarioId,
    state = {}
) {


    const scenario =
        getBHRScenario(
            scenarioId
        );


    if (!scenario || !scenario.rule) {

        return {

            domain: "BHR",

            status: "ERROR",

            message:
                "Unknown BHR scenario"

        };

    }



    let riskScore = 0;



    switch (scenario.rule) {



        /*
         * BHR-001
         * Human Rights Due Diligence
         */

        case "BHR-001":

            riskScore =
            (
                (state.labourRisk || 0) * 0.30 +
                (state.communityImpact || 0) * 0.25 +
                (state.supplyChainRisk || 0) * 0.25 +
                (state.complianceRisk || 0) * 0.20
            );

            break;



        /*
         * BHR-002
         * Forced Labour
         */

        case "BHR-002":

            riskScore =
            (
                (state.workerFreedomRisk || 0) * 0.35 +
                (state.labourConditionRisk || 0) * 0.25 +
                (state.supplyChainRisk || 0) * 0.20 +
                (100 - (state.monitoringLevel ?? 100)) * 0.20
            );

            break;



        /*
         * BHR-003
         * Child Labour
         */

        case "BHR-003":

            riskScore =
            (
                (state.childLabourRisk || 0) * 0.40 +
                (state.supplierRisk || 0) * 0.25 +
                (state.auditFailure || 0) * 0.20 +
                (state.complianceRisk || 0) * 0.15
            );

            break;



        /*
         * BHR-004
         * Discrimination
         */

        case "BHR-004":

            riskScore =
            (
                (state.discriminationRisk || 0) * 0.40 +
                (state.equalOpportunityRisk || 0) * 0.25 +
                (state.complianceRisk || 0) * 0.20 +
                (state.grievanceRisk || 0) * 0.15
            );

            break;



        /*
         * BHR-005
         * Occupational Health & Safety
         */

        case "BHR-005":

            riskScore =
            (
                (state.safetyRisk || 0) * 0.40 +
                (state.incidentRate || 0) * 0.25 +
                (100 - (state.workerProtection ?? 100)) * 0.20 +
                (state.complianceRisk || 0) * 0.15
            );

            break;



        /*
         * BHR-006
         * Modern Slavery
         */

        case "BHR-006":

            riskScore =
            (
                (state.modernSlaveryRisk || 0) * 0.40 +
                (state.supplyChainRisk || 0) * 0.25 +
                (state.workerVulnerability || 0) * 0.20 +
                (state.monitoringFailure || 0) * 0.15
            );

            break;



        /*
         * BHR-007
         * Community Impact
         */

        case "BHR-007":

            riskScore =
            (
                (state.environmentalImpact || 0) * 0.30 +
                (state.socialImpact || 0) * 0.30 +
                (100 - (state.communityEngagement ?? 100)) * 0.20 +
                (state.mitigationFailure || 0) * 0.20
            );

            break;



        /*
         * BHR-008
         * Indigenous Rights
         */

        case "BHR-008":

            riskScore =
            (
                (state.landRightsRisk || 0) * 0.30 +
                (state.consultationFailure || 0) * 0.30 +
                (state.culturalImpact || 0) * 0.20 +
                (100 - (state.mitigationCapability ?? 100)) * 0.20
            );

            break;



        /*
         * BHR-009
         * Supply Chain Risk
         */

        case "BHR-009":

            riskScore =
            (
                (state.supplierRisk || 0) * 0.35 +
                (state.auditFailure || 0) * 0.25 +
                (state.labourRisk || 0) * 0.20 +
                (state.traceabilityRisk || 0) * 0.20
            );

            break;



        /*
         * BHR-010
         * Grievance Mechanism
         */

        case "BHR-010":

            riskScore =
            (
                (state.grievanceFailure || 0) * 0.40 +
                (100 - (state.accessibility ?? 100)) * 0.25 +
                (100 - (state.responseCapability ?? 100)) * 0.20 +
                (state.remediationRisk || 0) * 0.15
            );

            break;



        default:

            riskScore = 0;

    }



    let assessment;


    if (riskScore < 30) {

        assessment = "LOW";

    }

    else if (riskScore < 60) {

        assessment = "MEDIUM";

    }

    else {

        assessment = "HIGH";

    }



    return {


        domain:
            "BHR",


        status:
            "COMPLETE",


        scenario:
            scenarioId,


        ruleApplied:
            scenario.rule,


        riskScore:
            Number(
                riskScore.toFixed(2)
            ),


        assessment,


        recommendation:
            generateBHRRecommendation(
                scenario.rule,
                assessment
            ),


        timestamp:
            new Date()
            .toISOString()

    };

}



/**
 * ============================================================
 * BHR RECOMMENDATION CORE
 * ============================================================
 */

function generateBHRRecommendation(
    rule,
    assessment
) {


    if (assessment === "LOW") {

        return "MONITOR HUMAN RIGHTS CONDITIONS";

    }



    if (assessment === "MEDIUM") {

        return "ACTIVATE PREVENTIVE HUMAN RIGHTS RESILIENCE MODE";

    }



    return "ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE";


}



/**
 * ============================================================
 * DOMAIN INTEGRATION WRAPPER
 * ============================================================
 */

export function bhrRuleEngine(
    input = {}
) {


    return runBHRRuleEngine(

        input.scenario,

        input.state

    );

}



/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {

    runBHRRuleEngine,

    bhrRuleEngine

};