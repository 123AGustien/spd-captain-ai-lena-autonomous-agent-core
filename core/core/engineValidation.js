/**
 * ============================================================
 * SPD V13 — CORE ENGINE VALIDATION ENGINE
 * ============================================================
 *
 * Independent validation layer for the SPD V13 core engine.
 *
 * Validation sequence:
 *
 * CORE ENGINE EXECUTION
 *        ↓
 * INPUT NORMALIZATION
 *        ↓
 * MODULE EXECUTION
 *        ↓
 * DECISION OUTPUT
 *        ↓
 * ACTION OUTPUT
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
 * It validates the behaviour and output integrity
 * of the Captain AI Lena execution engine.
 * ============================================================
 */

import { runEngine } from "../engine.js";


/**
 * ============================================================
 * TEST 1 — CORE ENGINE EXECUTION
 * ============================================================
 *
 * Verifies that the engine executes successfully and returns
 * the required execution structure.
 * ============================================================
 */

export function testCoreEngineExecution() {

  const input = {

    fx: 0,
    energy: 80,
    cyb: 100,
    inf: 0,
    dc: 0,
    event: "NORMAL",
    mode: "AUTONOMOUS"

  };


  const result =
    runEngine(input);


  const passed =

    result?.status === "EXECUTED" &&

    result?.input !== undefined &&

    result?.normalizedInput !== undefined &&

    result?.output !== undefined &&

    result?.constants !== undefined;


  return {

    test:
      "CORE ENGINE EXECUTION",

    expectedStatus:
      "EXECUTED",

    actualStatus:
      result?.status,

    outputPresent:
      result?.output !== undefined,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * TEST 2 — INPUT PRESERVATION
 * ============================================================
 *
 * Verifies that the original input remains unchanged
 * for audit purposes.
 * ============================================================
 */

export function testInputPreservation() {

  const input = {

    fx: 20,
    energy: 60,
    cyb: 80,
    inf: 10,
    dc: 15,
    event: "FX_SHOCK",
    mode: "AUTONOMOUS"

  };


  const result =
    runEngine(input);


  const preserved =

    result?.input?.fx === input.fx &&

    result?.input?.energy === input.energy &&

    result?.input?.cyb === input.cyb &&

    result?.input?.inf === input.inf &&

    result?.input?.dc === input.dc &&

    result?.input?.event === input.event;


  return {

    test:
      "INPUT PRESERVATION",

    passed:
      preserved,

    status:
      preserved
        ? "PASS"
        : "FAIL",

    originalInput:
      input,

    returnedInput:
      result?.input

  };

}


/**
 * ============================================================
 * TEST 3 — GOLDEN RATIO NORMALIZATION
 * ============================================================
 *
 * Verifies that the engine applies the configured
 * GOLDEN_RATIO normalization to FX and ENERGY.
 *
 * The original input must remain unchanged.
 * ============================================================
 */

export function testGoldenRatioNormalization() {

  const input = {

    fx: 16.1803398875,

    energy: 80.9016994375,

    cyb: 100,

    inf: 0,

    dc: 0,

    event: "NORMAL"

  };


  const result =
    runEngine(input);


  const expectedFx =
    input.fx /
    result.constants.GOLDEN_RATIO;


  const expectedEnergy =
    input.energy /
    result.constants.GOLDEN_RATIO;


  const tolerance =
    0.000001;


  const fxValid =
    Math.abs(
      result.normalizedInput.fx -
      expectedFx
    ) < tolerance;


  const energyValid =
    Math.abs(
      result.normalizedInput.energy -
      expectedEnergy
    ) < tolerance;


  const originalPreserved =

    result.input.fx === input.fx &&

    result.input.energy === input.energy;


  const passed =

    fxValid &&

    energyValid &&

    originalPreserved;


  return {

    test:
      "GOLDEN RATIO NORMALIZATION",

    expectedFx,

    actualFx:
      result.normalizedInput.fx,

    expectedEnergy,

    actualEnergy:
      result.normalizedInput.energy,

    originalPreserved,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * TEST 4 — MODULE OUTPUT INTEGRITY
 * ============================================================
 *
 * Verifies that the core output contains the required
 * algorithmic modules.
 * ============================================================
 */

export function testModuleOutputIntegrity() {

  const result =
    runEngine({

      fx: 0,

      energy: 80,

      cyb: 100,

      inf: 0,

      dc: 0,

      event: "NORMAL"

    });


  const output =
    result?.output;


  const passed =

    output?.modules !== undefined &&

    output?.modules?.fx !== undefined &&

    output?.modules?.energy !== undefined &&

    output?.modules?.risk !== undefined;


  return {

    test:
      "MODULE OUTPUT INTEGRITY",

    modulesPresent:
      passed,

    fx:
      output?.modules?.fx,

    energy:
      output?.modules?.energy,

    risk:
      output?.modules?.risk,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * TEST 5 — DECISION OUTPUT INTEGRITY
 * ============================================================
 *
 * Verifies that the engine produces a deterministic decision
 * and corresponding action.
 * ============================================================
 */

export function testDecisionOutputIntegrity() {

  const result =
    runEngine({

      fx: 0,

      energy: 80,

      cyb: 100,

      inf: 0,

      dc: 0,

      event: "NORMAL"

    });


  const output =
    result?.output;


  const passed =

    typeof output?.decision === "string" &&

    output?.action !== undefined &&

    typeof output?.action?.mode === "string" &&

    typeof output?.action?.status === "string";


  return {

    test:
      "DECISION OUTPUT INTEGRITY",

    decision:
      output?.decision,

    action:
      output?.action,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * TEST 6 — SCENARIO OUTPUT INTEGRITY
 * ============================================================
 *
 * Verifies that scenario information is passed through
 * the core engine correctly.
 * ============================================================
 */

export function testScenarioOutputIntegrity() {

  const result =
    runEngine({

      fx: 0,

      energy: 80,

      cyb: 100,

      inf: 0,

      dc: 0,

      event: "CYBER_ATTACK"

    });


  const scenario =
    result?.output?.scenario;


  const passed =

    scenario?.type ===
      "CYBER_ATTACK" &&

    typeof scenario?.name ===
      "string" &&

    typeof scenario?.description ===
      "string";


  return {

    test:
      "SCENARIO OUTPUT INTEGRITY",

    expectedScenario:
      "CYBER_ATTACK",

    actualScenario:
      scenario?.type,

    scenario,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * TEST 7 — DETERMINISTIC REPEATABILITY
 * ============================================================
 *
 * Runs identical input twice.
 *
 * The decision engine must produce the same decision,
 * action, risk, and scenario result.
 *
 * Timestamp differences are intentionally ignored.
 * ============================================================
 */

export function testDeterministicRepeatability() {

  const input = {

    fx: 20,

    energy: 50,

    cyb: 40,

    inf: 10,

    dc: 15,

    event: "FX_SHOCK"

  };


  const first =
    runEngine(input);


  const second =
    runEngine(input);


  const firstOutput =
    first?.output;


  const secondOutput =
    second?.output;


  const passed =

    firstOutput?.decision ===
      secondOutput?.decision &&

    firstOutput?.action?.mode ===
      secondOutput?.action?.mode &&

    firstOutput?.action?.status ===
      secondOutput?.action?.status &&

    firstOutput?.modules?.risk ===
      secondOutput?.modules?.risk &&

    firstOutput?.scenario?.type ===
      secondOutput?.scenario?.type;


  return {

    test:
      "DETERMINISTIC REPEATABILITY",

    firstDecision:
      firstOutput?.decision,

    secondDecision:
      secondOutput?.decision,

    firstRisk:
      firstOutput?.modules?.risk,

    secondRisk:
      secondOutput?.modules?.risk,

    firstScenario:
      firstOutput?.scenario?.type,

    secondScenario:
      secondOutput?.scenario?.type,

    passed,

    status:
      passed
        ? "PASS"
        : "FAIL"

  };

}


/**
 * ============================================================
 * COMPLETE CORE ENGINE VALIDATION
 * ============================================================
 */

export function runEngineValidation() {

  const tests = [

    testCoreEngineExecution(),

    testInputPreservation(),

    testGoldenRatioNormalization(),

    testModuleOutputIntegrity(),

    testDecisionOutputIntegrity(),

    testScenarioOutputIntegrity(),

    testDeterministicRepeatability()

  ];


  const passed =
    tests.filter(
      test =>
        test.status === "PASS"
    ).length;


  const failed =
    tests.length - passed;


  return {

    engine:
      "SPD V13 DETERMINISTIC AUTONOMOUS AGENT CORE",

    validation:
      "CORE ENGINE VALIDATION",

    timestamp:
      new Date().toISOString(),

    totalTests:
      tests.length,

    passed,

    failed,

    status:
      failed === 0
        ? "CORE ENGINE VALIDATION PASSED"
        : "CORE ENGINE VALIDATION FAILED",

    tests

  };

}


/**
 * ============================================================
 * VALIDATION SUMMARY
 * ============================================================
 */

export function getEngineValidationSummary() {

  const report =
    runEngineValidation();


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