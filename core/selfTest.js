/**
 * ============================================================
 * SPD V13.1 — SELF-TEST & VALIDATION ENGINE
 * ============================================================
 *
 * Independent validation layer for the
 * SPD Captain AI Lena Deterministic Autonomous Agent Core.
 *
 * Purpose:
 *
 * CORE ENGINE VALIDATION
 *        ↓
 * SCENARIO VALIDATION
 *        ↓
 * DECISION VALIDATION
 *        ↓
 * ACTION VALIDATION
 *        ↓
 * AUDIT CONSISTENCY
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic validation only.
 * No randomness.
 * No machine learning.
 *
 * This module does not modify the core engine.
 * It only validates engine behaviour and output integrity.
 * ============================================================
 */

import { captainAILena } from "../captainAILena.js";


/**
 * ============================================================
 * TEST CASE DEFINITIONS
 * ============================================================
 */

const testCases = [

  {
    name: "NORMAL SYSTEM",

    input: {
      fx: 0,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "NORMAL"
    },

    expectedDecision:
      "SYSTEM STABLE",

    expectedActionMode:
      "NORMAL",

    expectedActionStatus:
      "STABLE"
  },


  {
    name: "HIGH RISK SYSTEM",

    input: {
      fx: 20,
      energy: 20,
      cyb: 20,
      inf: 10,
      dc: 10,
      event: "NORMAL"
    },

    expectedDecision:
      "ACTIVATE STABILIZATION MODE",

    expectedActionMode:
      "STABILIZATION",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "LOW ENERGY SYSTEM",

    input: {
      fx: 0,
      energy: 20,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "NORMAL"
    },

    expectedDecision:
      "REDUCE SYSTEM LOAD",

    expectedActionMode:
      "ENERGY PROTECTION",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "FX SHOCK",

    input: {
      fx: 20,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "FX_SHOCK"
    },

    /*
     * FX = 20 produces HIGH RISK under the current
     * deterministic risk hierarchy.
     *
     * Safety priority therefore takes precedence over
     * the lower-priority scenario response.
     */

    expectedDecision:
      "ACTIVATE STABILIZATION MODE",

    expectedActionMode:
      "STABILIZATION",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "FX SHOCK — CONTROLLED",

    input: {
      fx: 5,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "FX_SHOCK"
    },

    expectedDecision:
      "FX SHOCK RESPONSE ACTIVE",

    expectedActionMode:
      "SCENARIO RESPONSE",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "ENERGY CRISIS",

    input: {
      fx: 0,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "ENERGY_CRISIS"
    },

    expectedDecision:
      "ENERGY RESERVE MODE ACTIVE",

    expectedActionMode:
      "ENERGY RESERVE",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "CYBER ATTACK",

    input: {
      fx: 0,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event: "CYBER_ATTACK"
    },

    expectedDecision:
      "CYBER DEFENSE MODE ACTIVE",

    expectedActionMode:
      "CYBER DEFENSE",

    expectedActionStatus:
      "ACTIVE"
  },


  {
    name: "INFRASTRUCTURE FAILURE",

    input: {
      fx: 0,
      energy: 80,
      cyb: 100,
      inf: 80,
      dc: 80,
      event: "INFRA_FAILURE"
    },

    expectedDecision:
      "INFRASTRUCTURE RECOVERY MODE",

    expectedActionMode:
      "INFRASTRUCTURE RECOVERY",

    expectedActionStatus:
      "ACTIVE"
  }

];


/**
 * ============================================================
 * SINGLE TEST EXECUTION
 * ============================================================
 */

function runTest(test) {

  try {

    const result =
      captainAILena(test.input);


    /**
     * ========================================================
     * DECISION VALIDATION
     * ========================================================
     */

    const decisionPassed =
      result.decision ===
      test.expectedDecision;


    /**
     * ========================================================
     * ACTION VALIDATION
     * ========================================================
     */

    const actionModePassed =
      result.action?.mode ===
      test.expectedActionMode;


    const actionStatusPassed =
      result.action?.status ===
      test.expectedActionStatus;


    /**
     * ========================================================
     * SCENARIO VALIDATION
     * ========================================================
     */

    const scenarioPassed =
      result.scenario?.type ===
      test.input.event;


    /**
     * ========================================================
     * AUDIT CONSISTENCY VALIDATION
     * ========================================================
     *
     * Verifies that the core output contains the expected
     * audit fields required for traceability.
     */

    const auditPassed =

      result.timestamp !== undefined &&

      result.agent ===
        "CAPTAIN AI LENA" &&

      result.mode !== undefined &&

      Array.isArray(result.loop) &&

      result.input !== undefined &&

      result.modules !== undefined &&

      result.scenario !== undefined &&

      result.decision !== undefined &&

      result.action !== undefined &&

      result.systemState !== undefined &&

      result.updatedState !== undefined &&

      result.status ===
        "EXECUTED";


    /**
     * ========================================================
     * FINAL TEST RESULT
     * ========================================================
     */

    const passed =

      decisionPassed &&

      actionModePassed &&

      actionStatusPassed &&

      scenarioPassed &&

      auditPassed;


    return {

      name:
        test.name,

      passed,

      expected:
        test.expectedDecision,

      actual:
        result.decision,

      decisionValidation: {

        expected:
          test.expectedDecision,

        actual:
          result.decision,

        passed:
          decisionPassed

      },

      actionValidation: {

        expectedMode:
          test.expectedActionMode,

        actualMode:
          result.action?.mode,

        expectedStatus:
          test.expectedActionStatus,

        actualStatus:
          result.action?.status,

        passed:
          actionModePassed &&
          actionStatusPassed

      },

      scenarioValidation: {

        expected:
          test.input.event,

        actual:
          result.scenario?.type,

        passed:
          scenarioPassed

      },

      auditConsistency: {

        passed:
          auditPassed

      },

      risk:
        result.modules?.risk,

      scenario:
        result.scenario?.type,

      action:
        result.action,

      status:
        passed
          ? "PASS"
          : "FAIL"

    };

  } catch (error) {

    return {

      name:
        test.name,

      passed:
        false,

      expected:
        test.expectedDecision,

      actual:
        null,

      error:
        error?.message ??
        String(error),

      status:
        "ERROR"

    };

  }

}


/**
 * ============================================================
 * FULL SELF-TEST
 * ============================================================
 *
 * Executes all deterministic validation test cases.
 * ============================================================
 */

export function runSelfTest() {

  const results =
    testCases.map(runTest);


  const passed =
    results.filter(
      test =>
        test.passed
    ).length;


  const failed =
    results.length -
    passed;


  return {

    engine:
      "SPD V13.1 DETERMINISTIC AUTONOMOUS AGENT CORE",

    validation:
      "INDEPENDENT SELF-TEST & VALIDATION",

    timestamp:
      new Date().toISOString(),

    goldenRule: [

      "OBSERVE",

      "VERIFY",

      "ASSESS",

      "DECIDE",

      "ACT",

      "UPDATE"

    ],

    totalTests:
      results.length,

    passed,

    failed,

    status:

      failed === 0

        ? "VALIDATION PASSED"

        : "VALIDATION FAILED",

    results

  };

}


/**
 * ============================================================
 * VALIDATION SUMMARY
 * ============================================================
 */

export function getValidationSummary() {

  const report =
    runSelfTest();


  return {

    engine:
      report.engine,

    validation:
      report.validation,

    status:
      report.status,

    totalTests:
      report.totalTests,

    passed:
      report.passed,

    failed:
      report.failed,

    timestamp:
      report.timestamp

  };

}