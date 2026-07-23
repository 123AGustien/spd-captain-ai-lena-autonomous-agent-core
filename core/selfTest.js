/**
 * ============================================================
 * SPD V13 — SELF TEST & VALIDATION ENGINE
 * ============================================================
 *
 * Independent validation layer for the
 * SPD Captain AI Lena Autonomous Agent Core.
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
 * It only validates engine behaviour.
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
    expectedDecision: "SYSTEM STABLE"
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
    expectedDecision: "ACTIVATE STABILIZATION MODE"
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
    expectedDecision: "REDUCE SYSTEM LOAD"
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
    expectedDecision: "FX CORRECTION ACTIVE"
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
    expectedDecision: "ENERGY RESERVE MODE ACTIVE"
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
    expectedDecision: "CYBER DEFENSE MODE ACTIVE"
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
    expectedDecision: "INFRASTRUCTURE RECOVERY MODE"
  }

];


/**
 * ============================================================
 * SINGLE TEST EXECUTION
 * ============================================================
 */

function runTest(test) {

  try {

    const result = captainAILena(test.input);

    const passed =
      result.decision === test.expectedDecision;

    return {

      name: test.name,

      passed,

      expected:
        test.expectedDecision,

      actual:
        result.decision,

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

      name: test.name,

      passed: false,

      expected:
        test.expectedDecision,

      actual: null,

      error:
        error?.message ?? String(error),

      status: "ERROR"

    };

  }

}


/**
 * ============================================================
 * FULL SELF TEST
 * ============================================================
 */

export function runSelfTest() {

  const results =
    testCases.map(runTest);

  const passed =
    results.filter(
      test => test.passed
    ).length;

  const failed =
    results.length - passed;

  return {

    engine:
      "SPD V13 DETERMINISTIC AUTONOMOUS AGENT CORE",

    validation:
      "INDEPENDENT SELF-TEST",

    timestamp:
      new Date().toISOString(),

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