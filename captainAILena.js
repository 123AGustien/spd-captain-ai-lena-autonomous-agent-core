/**
 * SPD v13 — CAPTAIN AI LENA
 * -------------------------
 * Autonomous orchestration and decision interpretation layer.
 *
 * Architecture:
 * DATA → ALGORITHMS → COMPUTE
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Captain AI Lena coordinates:
 * FX
 * ENERGY
 * RISK DIAGNOSTICS
 * SCENARIO
 * SELF-TEST FINDINGS
 * CORRECTIVE ACTION IDENTIFICATION
 *
 * IMPORTANT:
 * The SEXTANT GOLDEN RULE ENGINE remains the SINGLE
 * AUTHORITATIVE deterministic assessment and decision layer.
 *
 * Captain AI Lena does NOT replace or override the
 * Golden Rule Engine.
 *
 * The self-test identifies faults.
 * Captain AI Lena identifies the required corrective action.
 *
 * Authoritative flow:
 *
 * DATA
 *   ↓
 * DOMAIN MODULES
 *   ↓
 * SEXTANT GOLDEN RULE ENGINE
 *   ↓
 * SELF-TEST FINDINGS
 *   ↓
 * CAPTAIN AI LENA DECISION
 *   ↓
 * SYSTEM OUTPUT
 *   ↓
 * ACT
 *   ↓
 * UPDATE
 *   ↓
 * RE-TEST
 */

// ============================================================
// DOMAIN MODULES
// ============================================================

import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

import {
  runGoldenRule
} from "./goldenRuleEngine.js";


// ============================================================
// CAPTAIN AI LENA — SELF-TEST DECISION INTERPRETATION
// ============================================================
//
// The self-test does NOT change the Golden Rule Engine.
// It identifies a fault.
//
// Captain AI Lena interprets that fault and determines
// the corrective action required.
//
// This is NOT a second risk engine.
//
// It is a deterministic corrective-action interpretation layer.
// ============================================================

function buildSelfTestDecision(selfTest) {

  // ----------------------------------------------------------
  // No self-test supplied
  // ----------------------------------------------------------

  if (!selfTest) {

    return {

      status:
        "NO SELF-TEST RESULT",

      decision:
        null,

      action:
        null,

      findings:
        [],

      nextAction:
        null

    };

  }


  // ----------------------------------------------------------
  // Extract self-test results
  // ----------------------------------------------------------

  const results =
    Array.isArray(selfTest.results)
      ? selfTest.results
      : [];


  // ----------------------------------------------------------
  // Identify failed tests
  // ----------------------------------------------------------

  const failures =
    results.filter(
      test =>
        test.status === "FAIL"
    );


  // ----------------------------------------------------------
  // All tests passed
  // ----------------------------------------------------------

  if (
    failures.length === 0 &&
    selfTest.overallStatus === "PASS"
  ) {

    return {

      status:
        "SELF-TEST PASS",

      decision:
        "SYSTEM VALIDATED",

      action:
        "CONTINUE NORMAL OPERATIONS AND MONITOR SYSTEM RESPONSE",

      findings:
        [],

      nextAction:
        "CONTINUE MONITORING"

    };

  }


  // ----------------------------------------------------------
  // Identify faults and required corrective actions
  // ----------------------------------------------------------

  const findings =
    failures.map(
      test => {

        const expected =
          test.expectedDecision ??
          test.expected ??
          "UNSPECIFIED";

        const actual =
          test.actualDecision ??
          test.actual ??
          "UNSPECIFIED";

        const risk =
          test.risk ??
          test.actualRisk ??
          "UNKNOWN";


        // ======================================================
        // HIGH-RISK DECISION MISMATCH
        // ======================================================

        if (
          test.test?.includes("HIGH RISK") ||
          risk === "MEDIUM"
        ) {

          return {

            test:
              test.test,

            condition:
              "HIGH-RISK SCENARIO UNDER-ESCALATION",

            expected:
              expected,

            actual:
              actual,

            risk:
              risk,

            rectification:
              "AUDIT HIGH-RISK CLASSIFICATION AND DECISION MAPPING",

            requiredAction:
              "REVIEW HIGH-RISK ESCALATION THRESHOLD AND STABILIZATION RESPONSE"

          };

        }


        // ======================================================
        // CRITICAL-RISK DECISION MISMATCH
        // ======================================================

        if (
          test.test?.includes("CRITICAL RISK") ||
          test.test?.includes("MAXIMUM CURRENT RISK")
        ) {

          return {

            test:
              test.test,

            condition:
              "CRITICAL-RISK SCENARIO NOT ESCALATED TO REQUIRED RESPONSE",

            expected:
              expected,

            actual:
              actual,

            risk:
              risk,

            rectification:
              "AUDIT CRITICAL-RISK ESCALATION AND EMERGENCY DECISION MAPPING",

            requiredAction:
              "REVIEW CRITICAL-RISK THRESHOLD AND EMERGENCY STABILIZATION RESPONSE"

          };

        }


        // ======================================================
        // GENERAL DECISION MISMATCH
        // ======================================================

        return {

          test:
            test.test,

          condition:
            "DETERMINISTIC DECISION MISMATCH",

          expected:
            expected,

          actual:
            actual,

          risk:
            risk,

          rectification:
            "AUDIT THE FAILED DECISION CONDITION",

          requiredAction:
            "REVIEW THE EXPECTED AND ACTUAL DECISION PATH AND APPLY CORRECTIVE ACTION"

        };

      }
    );


  // ----------------------------------------------------------
  // Determine overall Captain AI Lena corrective decision
  // ----------------------------------------------------------

  return {

    status:
      "RECTIFICATION REQUIRED",

    decision:
      "AUDIT AND RECTIFY IDENTIFIED DECISION CONDITIONS",

    action:
      "REVIEW FAILED RISK ESCALATION AND DECISION MAPPING, APPLY CORRECTIVE ACTION, THEN RE-RUN SELF-TEST",

    findings,

    nextAction:
      "RE-RUN SELF-TEST AFTER RECTIFICATION"

  };

}


// ============================================================
// CAPTAIN AI LENA
// ============================================================

export function captainAILena(
  state = {},
  selfTest = null
) {

  // ==========================================================
  // 1. RUN DOMAIN MODULES
  //
  // These modules provide supporting domain information
  // and diagnostics.
  //
  // They do NOT define authoritative system risk.
  // ==========================================================

  const fx =
    fxModule(
      state.fx
    );


  const energy =
    energyModule(
      state.energy
    );


  const riskDiagnostics =
    riskModule(
      state.cyb,
      state.energy,
      state.fx
    );


  const scenario =
    scenarioEngine(
      state.event
    );


  // ==========================================================
  // 2. RUN AUTHORITATIVE GOLDEN RULE ENGINE
  //
  // OBSERVE
  // VERIFY
  // ASSESS
  // DECIDE
  // ACT
  // UPDATE
  //
  // The Golden Rule Engine remains the SINGLE SOURCE OF TRUTH
  // for:
  //
  // - System assessment
  // - Golden Score
  // - Resilience Score
  // - Risk classification
  // - Operational decision
  // - Operational action
  // - Action sequence
  // - Updated state
  // ==========================================================

  const goldenRule =
    runGoldenRule(
      state
    );


  // ==========================================================
  // 3. AUTHORITATIVE RISK
  //
  // IMPORTANT:
  //
  // Do NOT use riskDiagnostics.risk as the final
  // Captain AI Lena risk classification.
  //
  // The authoritative risk comes directly from:
  //
  // goldenRule.assessment.risk
  // ==========================================================

  const authoritativeRisk =
    goldenRule.assessment?.risk ??
    "UNKNOWN";


  // ==========================================================
  // 4. CAPTAIN AI LENA SELF-TEST DECISION
  //
  // SELF-TEST:
  //     Identifies the fault.
  //
  // CAPTAIN AI LENA:
  //     Determines the required corrective action.
  //
  // This does NOT override the Golden Rule Engine.
  // ==========================================================

  const selfTestDecision =
    buildSelfTestDecision(
      selfTest
    );


  // ==========================================================
  // 5. UNIFIED CAPTAIN AI LENA OUTPUT
  // ==========================================================

  return {

    agent:
      "CAPTAIN AI LENA",


    // ========================================================
    // DOMAIN DIAGNOSTIC OUTPUTS
    // ========================================================

    fx,

    energy,

    // Supporting diagnostic information only.
    // This is NOT the authoritative risk classification.

    riskDiagnostics,

    scenario,


    // ========================================================
    // AUTHORITATIVE GOLDEN RULE OUTPUT
    // ========================================================

    risk:
      authoritativeRisk,

    decision:
      goldenRule.decision,

    actionSequence:
      goldenRule.actionSequence,

    assessment:
      goldenRule.assessment,

    updatedState:
      goldenRule.updatedState,

    pipeline:
      goldenRule.pipeline,

    status:
      goldenRule.status,


    // ========================================================
    // CAPTAIN AI LENA SELF-TEST DECISION
    // ========================================================
    //
    // This section does not replace the Golden Rule decision.
    //
    // It identifies the corrective action required when
    // the self-test detects a failed condition.
    // ========================================================

    selfTestDecision

  };

}


// ============================================================
// OPTIONAL DIRECT ACCESS
// ============================================================
//
// Exported for cockpit interfaces that need to interpret
// an existing self-test result without running a new
// Golden Rule execution.
//
// This keeps the self-test interpretation deterministic
// and reusable by desktop, mobile, and simulation interfaces.
// ============================================================

export function interpretSelfTest(
  selfTest
) {

  return buildSelfTestDecision(
    selfTest
  );

}