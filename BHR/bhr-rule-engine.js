/**
 * ============================================================
 * SPD v13.1 — BHR RULE ENGINE
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Business & Human Rights Domain Assessment Engine
 *
 * Architecture:
 *
 * BHR Scenario Registry
 *        ↓
 * BHR Rule Engine
 *        ↓
 * Domain Risk Assessment
 *        ↓
 * BHR Solution Recommendation
 *        ↓
 * Golden Rule Engine
 *        ↓
 * Captain AI Lena Decision Core
 *
 * Golden Rule Engine remains authoritative.
 *
 * Deterministic.
 * Explainable.
 * No randomness.
 *
 * ============================================================
 */


import {
    getBHRScenario
} from "./bhr-scenario-registry.js";



/**
 * ============================================================
 * BHR SOLUTION MAPPING
 * ============================================================
 */

function getBHRSolution(
    scenarioId,
    assessment
) {


    switch (scenarioId) {


        case "BHR-001":

            if (assessment === "HIGH")
                return "ACTIVATE HUMAN RIGHTS DUE DILIGENCE REMEDIATION PROTOCOL";

            if (assessment === "MEDIUM")
                return "ENHANCE HUMAN RIGHTS MONITORING AND REVIEW";

            return "CONTINUE HUMAN RIGHTS DUE DILIGENCE MONITORING";



        case "BHR-002":

            if (assessment === "HIGH")
                return "ACTIVATE SUPPLY CHAIN HUMAN RIGHTS CORRECTIVE ACTION";

            if (assessment === "MEDIUM")
                return "INCREASE SUPPLY CHAIN MONITORING";

            return "CONTINUE SUPPLY CHAIN OVERSIGHT";



        case "BHR-003":

            if (assessment === "HIGH")
                return "ACTIVATE WORKPLACE RIGHTS REMEDIATION PLAN";

            if (assessment === "MEDIUM")
                return "ENHANCE WORKPLACE RIGHTS CONTROLS";

            return "CONTINUE WORKPLACE RIGHTS MONITORING";



        case "BHR-004":

            if (assessment === "HIGH")
                return "INITIATE INDIGENOUS RIGHTS CONSULTATION AND REMEDIATION PROTOCOL";

            if (assessment === "MEDIUM")
                return "ENHANCE COMMUNITY CONSULTATION AND IMPACT REVIEW";

            return "CONTINUE COMMUNITY ENGAGEMENT MONITORING";



        default:

            return "CONTINUE BHR RISK MONITORING";

    }

}





/**
 * ============================================================
 * DIRECT BHR SCENARIO EXECUTION
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


    if (!scenario) {


        return {

            domain:"BHR",

            status:"ERROR",

            message:"Unknown BHR scenario"

        };

    }



    let riskScore = 0;



    switch (scenario.id) {



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
         * Supply Chain Human Rights Risk
         */

        case "BHR-002":

            riskScore =
            (
                (state.supplierRisk || 0) * 0.35 +
                (state.labourConditions || 0) * 0.25 +
                (100 - (state.monitoringLevel ?? 100)) * 0.20 +
                (100 - (state.remediationCapacity ?? 100)) * 0.20
            );

            break;



        /*
         * BHR-003
         * Workplace Rights
         */

        case "BHR-003":

            riskScore =
            (
                (state.safetyRisk || 0) * 0.35 +
                (100 - (state.workerProtection ?? 100)) * 0.25 +
                (state.grievanceRisk || 0) * 0.20 +
                (state.complianceRisk || 0) * 0.20
            );

            break;



        /*
         * BHR-004
         * Indigenous Rights / Community Impact
         */

        case "BHR-004":

            riskScore =
            (
                (state.environmentalImpact || 0) * 0.30 +
                (state.socialImpact || 0) * 0.30 +
                (100 - (state.consultationLevel ?? 100)) * 0.20 +
                (100 - (state.mitigationCapability ?? 100)) * 0.20
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



    const solution =
        getBHRSolution(
            scenario.id,
            assessment
        );



    return {


        domain:"BHR",

        status:"COMPLETE",


        scenario:
            scenario.name,


        scenarioId:
            scenario.id,


        riskScore:
            Number(
                riskScore.toFixed(2)
            ),


        assessment,


        solution,


        ruleApplied:
            scenario.ruleSet,


        goldenRuleReady:true,


        timestamp:
            new Date()
            .toISOString()


    };

}





/**
 * ============================================================
 * DOMAIN INTEGRATION WRAPPER
 * ============================================================
 *
 * Called by:
 * domainIntegration.js
 *
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