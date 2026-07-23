/**
 * ============================================================
 * SPD V13 — SCENARIO VALIDATION ENGINE
 * ============================================================
 *
 * Independent validation layer for scenario behaviour.
 *
 * Validation sequence:
 *
 * SCENARIO DIFFERENTIATION
 *        ↓
 * INTENSITY / RESPONSE ESCALATION
 *        ↓
 * DOMAIN SENSITIVITY
 *        ↓
 * DECISION CONSISTENCY
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic validation only.
 * No randomness.
 * No machine learning.
 *
 * This module does not modify the core engine.
 * It validates how the core responds to different scenarios.
 * ============================================================
 */

import { captainAILena } from "../captainAILena.js";


/**
 * ============================================================
 * SCENARIO DIFFERENTIATION TEST
 * ============================================================
 *
 * Verifies that each supported scenario is recognised
 * as a distinct scenario type.
 * ============================================================
 */

export function testScenarioDifferentiation() {

  const scenarios = [

    "NORMAL",
    "FX_SHOCK",
    "ENERGY_CRISIS",
    "CYBER_ATTACK",
    "INFRA_FAILURE"

  ];

  const results = scenarios.map(event => {

    const result = captainAILena({
      fx: 0,
      energy: 80,
      cyb: 100,
      inf: 0,
      dc: 0,
      event
    });

    return {

      inputScenario: event,

      detectedScenario:
        result.scenario?.type ?? "UNKNOWN",

      decision:
        result.decision,

      passed:
        result.scenario?.type === event

    };

  });

  const passed =
    results.filter(
      result => result.passed
    ).length;

  return {

    test:
      "SCENARIO DIFFERENTIATION",

    total:
      results.length,

    passed,

    failed:
      results.length - passed,

    status:
      passed === results.length
        ? "PASS"
        : "FAIL",

    results

  };

}


/**
 * ============================================================
 * INTENSITY / RESPONSE ESCALATION TEST
 * ============================================================
 *
 * Tests system behaviour as stress increases.
 *
 * LOW STRESS
 *      ↓
 * MEDIUM STRESS
 *      ↓
 * HIGH STRESS
 *
 * The purpose is to verify that increased system pressure
 * produces an appropriate change in risk classification.
 * ============================================================
 */

export function testIntensityEscalation() {

  const intensityLevels = [

    {
      name: "LOW",
      input: {
        fx: 0,
        energy: 80,
        cyb: 100
      }
    },

    {
      name: "MEDIUM",
      input: {
        fx: 15,
        energy: 50,
        cyb: 40
      }
    },

    {
      name: "HIGH",
      input: {
        fx: 20,
        energy: 20,
        cyb: 20
      }
    }

  ];

  const results =
    intensityLevels.map(level => {

      const result =
        captainAILena({
          ...level.input,
          inf: 0,
          dc: 0,
          event: "NORMAL"
        });

      return {

        intensity:
          level.name,

        risk:
          result.modules?.risk,

        decision:
          result.decision,

        action:
          result.action

      };

    });


  const riskOrder = {
    "LOW RISK": 1,
    "MEDIUM RISK": 2,
    "HIGH RISK": 3,
    "CRITICAL": 4
  };


  const scores =
    results.map(
      result =>
        riskOrder[result.risk] ?? 0
    );


  const passed =
    scores[0] <= scores[1] &&
    scores[1] <= scores[2];


  return {

    test:
      "INTENSITY ESCALATION",

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL",

    results

  };

}


/**
 * ============================================================
 * DOMAIN SENSITIVITY TEST
 * ============================================================
 *
 * Tests whether changing one major domain variable affects
 * the decision engine appropriately.
 *
 * Domains:
 *
 * FX
 * ENERGY
 * CYBER
 * ============================================================
 */

export function testDomainSensitivity() {

  const baseline = {

    fx: 0,

    energy: 80,

    cyb: 100,

    inf: 0,

    dc: 0,

    event: "NORMAL"

  };


  const baselineResult =
    captainAILena(baseline);


  const fxStressResult =
    captainAILena({
      ...baseline,
      fx: 20
    });


  const energyStressResult =
    captainAILena({
      ...baseline,
      energy: 20
    });


  const cyberStressResult =
    captainAILena({
      ...baseline,
      cyb: 20
    });


  const results = {

    baseline: {

      risk:
        baselineResult.modules?.risk,

      decision:
        baselineResult.decision

    },

    fxStress: {

      risk:
        fxStressResult.modules?.risk,

      decision:
        fxStressResult.decision

    },

    energyStress: {

      risk:
        energyStressResult.modules?.risk,

      decision:
        energyStressResult.decision

    },

    cyberStress: {

      risk:
        cyberStressResult.modules?.risk,

      decision:
        cyberStressResult.decision

    }

  };


  const passed =

    baselineResult.modules?.risk !==
      fxStressResult.modules?.risk &&

    baselineResult.modules?.risk !==
      energyStressResult.modules?.risk &&

    baselineResult.modules?.risk !==
      cyberStressResult.modules?.risk;


  return {

    test:
      "DOMAIN SENSITIVITY",

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL",

    results

  };

}


/**
 * ============================================================
 * COMPLETE SCENARIO VALIDATION
 * ============================================================
 *
 * Runs all scenario validation tests.
 * ============================================================
 */

export function runScenarioValidation() {

  const differentiation =
    testScenarioDifferentiation();


  const escalation =
    testIntensityEscalation();


  const sensitivity =
    testDomainSensitivity();


  const tests = [

    differentiation,

    escalation,

    sensitivity

  ];


  const passed =
    tests.filter(
      test => test.status === "PASS"
    ).length;


  const failed =
    tests.length - passed;


  return {

    engine:
      "SPD V13 DETERMINISTIC AUTONOMOUS AGENT CORE",

    validation:
      "SCENARIO INTEGRATION VALIDATION",

    timestamp:
      new Date().toISOString(),

    totalTests:
      tests.length,

    passed,

    failed,

    status:
      failed === 0
        ? "SCENARIO VALIDATION PASSED"
        : "SCENARIO VALIDATION FAILED",

    tests

  };

}


/**
 * ============================================================
 * VALIDATION SUMMARY
 * ============================================================
 */

export function getScenarioValidationSummary() {

  const report =
    runScenarioValidation();


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