FINRuleEngine.test.js

/**
 * SPD v13.1 — FIN Rule Engine Validation
 *
 * Tests FIN-001 through FIN-005.
 *
 * Purpose:
 * Verify rule registration, scenario mapping,
 * deterministic evaluation, risk classification,
 * cascade generation, human authorization and audit output.
 */

const FINRuleEngine = require("./FINRuleEngine");

let passed = 0;
let failed = 0;

function assert(condition, message) {

  if (condition) {
    console.log("PASS:", message);
    passed++;
  } else {
    console.error("FAIL:", message);
    failed++;
  }
}


/* -------------------------------------------------------
 * TEST 1 — Domain Registration
 * ----------------------------------------------------- */

console.log("\nTEST 1 — FIN DOMAIN STATUS");

const status = FINRuleEngine.getStatus();

assert(
  status.id === "FIN",
  "FIN domain registered"
);

assert(
  status.status === "ACTIVE",
  "FIN domain ACTIVE"
);

assert(
  status.engineRegistered === true,
  "FIN engine registered"
);

assert(
  status.ruleCount === 5,
  "Five FIN rules registered"
);


/* -------------------------------------------------------
 * TEST 2 — Rule Mapping
 * ----------------------------------------------------- */

console.log("\nTEST 2 — RULE MAPPING");

const expectedMappings = {
  FX_SHOCK: "FIN-001",
  FIN_STRESS: "FIN-001",
  BOND_OUTFLOW: "FIN-002",
  LIQUIDITY_CRISIS: "FIN-003",
  BANKING_STRESS: "FIN-004",
  INFLATION_SHOCK: "FIN-005"
};

Object.entries(expectedMappings).forEach(
  ([scenario, expectedRule]) => {

    const result =
      FINRuleEngine.resolveRule(scenario);

    assert(
      result.success === true,
      `${scenario} resolves successfully`
    );

    assert(
      result.ruleId === expectedRule,
      `${scenario} maps to ${expectedRule}`
    );
  }
);


/* -------------------------------------------------------
 * TEST 3 — Unknown Scenario Rejection
 * ----------------------------------------------------- */

console.log("\nTEST 3 — UNKNOWN SCENARIO");

const unknown =
  FINRuleEngine.resolveRule("UNKNOWN_FIN_SCENARIO");

assert(
  unknown.success === false,
  "Unknown FIN scenario rejected"
);

assert(
  unknown.error === "FIN_SCENARIO_NOT_REGISTERED",
  "Correct rejection code returned"
);


/* -------------------------------------------------------
 * TEST 4 — FIN-001 FX STRESS
 * ----------------------------------------------------- */

console.log("\nTEST 4 — FIN-001 FX STRESS");

const fxResult =
  FINRuleEngine.evaluate(
    "FX_SHOCK",
    {
      fx: 80,
      liquidity: 50,
      market: 60,
      sovereignDebt: 40,
      credit: 30,
      banking: 20,
      intensity: 100
    }
  );

assert(
  fxResult.success === true,
  "FIN-001 evaluation successful"
);

assert(
  fxResult.rule.id === "FIN-001",
  "FIN-001 selected"
);

assert(
  fxResult.domain === "FIN",
  "FIN domain confirmed"
);

assert(
  typeof fxResult.assessment.resilienceScore === "number",
  "FX resilience score generated"
);

assert(
  Array.isArray(fxResult.cascade.cascade),
  "FX cascade generated"
);


/* -------------------------------------------------------
 * TEST 5 — FIN-002 BOND OUTFLOW
 * ----------------------------------------------------- */

console.log("\nTEST 5 — FIN-002 BOND OUTFLOW");

const bondResult =
  FINRuleEngine.evaluate(
    "BOND_OUTFLOW",
    {
      sovereignDebt: 75,
      market: 70,
      liquidity: 60,
      credit: 50,
      fx: 40,
      intensity: 80
    }
  );

assert(
  bondResult.success === true,
  "FIN-002 evaluation successful"
);

assert(
  bondResult.rule.id === "FIN-002",
  "FIN-002 selected"
);

assert(
  bondResult.scenario === "BOND_OUTFLOW",
  "Bond scenario confirmed"
);


/* -------------------------------------------------------
 * TEST 6 — FIN-003 LIQUIDITY
 * ----------------------------------------------------- */

console.log("\nTEST 6 — FIN-003 LIQUIDITY");

const liquidityResult =
  FINRuleEngine.evaluate(
    "LIQUIDITY_CRISIS",
    {
      liquidity: 85,
      banking: 70,
      credit: 65,
      market: 60,
      sovereignDebt: 40,
      fx: 40,
      intensity: 90
    }
  );

assert(
  liquidityResult.success === true,
  "FIN-003 evaluation successful"
);

assert(
  liquidityResult.rule.id === "FIN-003",
  "FIN-003 selected"
);

assert(
  liquidityResult.decision.executionAuthority ===
    "HUMAN_OPERATOR",
  "Liquidity execution authority is human"
);


/* -------------------------------------------------------
 * TEST 7 — FIN-004 BANKING STRESS
 * ----------------------------------------------------- */

console.log("\nTEST 7 — FIN-004 BANKING STRESS");

const bankingResult =
  FINRuleEngine.evaluate(
    "BANKING_STRESS",
    {
      banking: 85,
      liquidity: 75,
      credit: 70,
      market: 65,
      sovereignDebt: 50,
      fx: 45,
      intensity: 90
    }
  );

assert(
  bankingResult.success === true,
  "FIN-004 evaluation successful"
);

assert(
  bankingResult.rule.id === "FIN-004",
  "FIN-004 selected"
);

assert(
  bankingResult.governance.humanAuthorizationRequired ===
    true,
  "Banking action requires human authorization"
);


/* -------------------------------------------------------
 * TEST 8 — FIN-005 INFLATION
 * ----------------------------------------------------- */

console.log("\nTEST 8 — FIN-005 INFLATION SHOCK");

const inflationResult =
  FINRuleEngine.evaluate(
    "INFLATION_SHOCK",
    {
      inflation: 80,
      fx: 60,
      market: 50,
      credit: 45,
      liquidity: 40,
      energy: 75,
      intensity: 85
    }
  );

assert(
  inflationResult.success === true,
  "FIN-005 evaluation successful"
);

assert(
  inflationResult.rule.id === "FIN-005",
  "FIN-005 selected"
);

assert(
  inflationResult.audit.ruleId === "FIN-005",
  "Inflation rule recorded in audit"
);


/* -------------------------------------------------------
 * TEST 9 — RISK CLASSIFICATION
 * ----------------------------------------------------- */

console.log("\nTEST 9 — RISK CLASSIFICATION");

const green =
  FINRuleEngine.evaluate(
    "FX_SHOCK",
    {
      fx: 0,
      intensity: 0
    }
  );

assert(
  green.assessment.risk === "GREEN",
  "Low stress produces GREEN"
);


const red =
  FINRuleEngine.evaluate(
    "BANKING_STRESS",
    {
      banking: 100,
      liquidity: 100,
      credit: 100,
      market: 100,
      sovereignDebt: 100,
      fx: 100,
      intensity: 100
    }
  );

assert(
  red.assessment.risk === "RED",
  "Extreme stress produces RED"
);


/* -------------------------------------------------------
 * TEST 10 — HUMAN EXECUTION GATE
 * ----------------------------------------------------- */

console.log("\nTEST 10 — HUMAN EXECUTION GATE");

const gate =
  FINRuleEngine.evaluate(
    "LIQUIDITY_CRISIS",
    {
      liquidity: 90,
      intensity: 100
    }
  );

assert(
  gate.decision.executionAuthority ===
    "HUMAN_OPERATOR",
  "Execution authority remains HUMAN_OPERATOR"
);

assert(
  gate.decision.executionStatus ===
    "HUMAN_AUTHORIZATION_REQUIRED",
  "Human authorization required before execution"
);

assert(
  gate.governance.autonomousExecution === false,
  "Autonomous execution disabled"
);


/* -------------------------------------------------------
 * TEST 11 — AUDIT OUTPUT
 * ----------------------------------------------------- */

console.log("\nTEST 11 — AUDIT OUTPUT");

assert(
  gate.audit.engine === "FINRuleEngine",
  "Audit identifies FINRuleEngine"
);

assert(
  gate.audit.domain === "FIN",
  "Audit identifies FIN domain"
);

assert(
  typeof gate.audit.timestamp === "string",
  "Audit timestamp generated"
);


/* -------------------------------------------------------
 * TEST 12 — DETERMINISTIC REPEATABILITY
 * ----------------------------------------------------- */

console.log("\nTEST 12 — DETERMINISTIC REPEATABILITY");

const testInput = {
  fx: 65,
  liquidity: 45,
  market: 55,
  sovereignDebt: 30,
  credit: 35,
  banking: 40,
  intensity: 70
};

const runA =
  FINRuleEngine.evaluate(
    "FX_SHOCK",
    testInput
  );

const runB =
  FINRuleEngine.evaluate(
    "FX_SHOCK",
    testInput
  );

assert(
  runA.assessment.stress ===
    runB.assessment.stress,
  "Repeated stress calculation is deterministic"
);

assert(
  runA.assessment.resilienceScore ===
    runB.assessment.resilienceScore,
  "Repeated resilience calculation is deterministic"
);

assert(
  runA.assessment.risk ===
    runB.assessment.risk,
  "Repeated risk classification is deterministic"
);


/* -------------------------------------------------------
 * FINAL RESULT
 * ----------------------------------------------------- */

console.log("\n======================================");
console.log("SPD v13.1 FIN RULE ENGINE VALIDATION");
console.log("======================================");

console.log("TOTAL PASSED:", passed);
console.log("TOTAL FAILED:", failed);

if (failed === 0) {

  console.log(
    "VALIDATION STATUS: PASS"
  );

  console.log(
    "FIN-001 → FIN-005 READY FOR DOMAIN INTEGRATION"
  );

} else {

  console.error(
    "VALIDATION STATUS: FAIL"
  );

  console.error(
    "DOMAIN INTEGRATION MUST NOT PROCEED"
  );

  process.exitCode = 1;
}