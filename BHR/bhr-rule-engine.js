/**
 * SPD v13.1 — BHR Rule Engine
 *
 * Purpose:
 * Business & Human Rights domain assessment engine.
 *
 * Flow:
 *
 * BHR Scenario Registry
 *        ↓
 * BHR Rule Engine
 *        ↓
 * Domain Assessment
 *        ↓
 * Golden Rule Engine
 *        ↓
 * Captain AI Lena Decision Core
 *
 * Golden Rule Engine remains authoritative.
 */

import {
    getBHRScenario
} from "./bhr-scenario-registry.js";


/**
 * Execute BHR scenario assessment
 */

export function runBHRRuleEngine(
    scenarioId,
    state = {}
) {

    const scenario = getBHRScenario(scenarioId);


    if (!scenario) {

        return {
            status: "ERROR",
            message: "Unknown BHR scenario"
        };

    }


    let riskScore = 0;
    let assessment = "LOW";


    switch (scenario.id) {


        case "BHR-001":

            riskScore =
                (
                    (state.labourRisk || 0) * 0.30 +
                    (state.communityImpact || 0) * 0.25 +
                    (state.supplyChainRisk || 0) * 0.25 +
                    (state.complianceRisk || 0) * 0.20
                );

            break;



        case "BHR-002":

            riskScore =
                (
                    (state.supplierRisk || 0) * 0.35 +
                    (state.labourConditions || 0) * 0.25 +
                    (100 - (state.monitoringLevel || 100)) * 0.20 +
                    (100 - (state.remediationCapacity || 100)) * 0.20
                );

            break;



        case "BHR-003":

            riskScore =
                (
                    (state.safetyRisk || 0) * 0.35 +
                    (100 - (state.workerProtection || 100)) * 0.25 +
                    (state.grievanceRisk || 0) * 0.20 +
                    (state.complianceRisk || 0) * 0.20
                );

            break;



        case "BHR-004":

            riskScore =
                (
                    (state.environmentalImpact || 0) * 0.30 +
                    (state.socialImpact || 0) * 0.30 +
                    (100 - (state.consultationLevel || 100)) * 0.20 +
                    (100 - (state.mitigationCapability || 100)) * 0.20
                );

            break;


        default:

            riskScore = 0;

    }


    if (riskScore < 30) {

        assessment = "LOW";

    } else if (riskScore < 60) {

        assessment = "MEDIUM";

    } else {

        assessment = "HIGH";

    }


    return {

        domain: "BHR",

        scenario: scenario.name,

        scenarioId: scenario.id,

        riskScore:
            Number(riskScore.toFixed(2)),

        assessment,

        ruleApplied:
            scenario.ruleSet,

       