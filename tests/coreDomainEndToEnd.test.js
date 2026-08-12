/**
 * SPD v13.1 — CORE → DOMAIN END-TO-END SYSTEM TEST
 *
 * Purpose:
 * Validate the complete execution path:
 *
 * COCKPIT STATE
 *      ↓
 * CORE EXECUTION ENGINE
 *      ↓
 * OBSERVE
 *      ↓
 * VERIFY / NORMALIZE
 *      ↓
 * DOMAIN RESOLUTION
 *      ↓
 * AUTHORITATIVE DOMAIN RULE ENGINE
 *      ↓
 * CAPTAIN AI LENA
 *      ↓
 * DECISION SUPPORT
 *      ↓
 * HUMAN AUTHORIZATION GATE
 *      ↓
 * RESULT
 *
 * This test verifies that the Core Execution Engine is
 * actually wired to the Domain Integration Layer.
 *
 * Human authority remains final.
 * Autonomous execution must remain disabled.
 */


/* =========================================================
   IMPORTS
========================================================= */

import {
  runEngine,
  verifyCoreEngine
} from "../coreExecutionEngine.js";

import {
  getDomainStatus,
  mapScenario,
  resolveDomain
} from "../domainIntegration.js";


/* =========================================================
   TEST COUNTERS
========================================================= */

let passed = 0;
let failed = 0;


/* =========================================================
   ASSERTION
========================================================= */

function assert(
  condition,
  message
) {

  if (condition) {

    console.log(
      "PASS:",
      message
    );

    passed++;

  } else {

    console.error(
      "FAIL:",
      message
    );

    failed++;

  }

}


/* =========================================================
   TEST 1 — CORE SELF TEST
========================================================= */

console.log(
  "\nTEST 1 — CORE EXECUTION ENGINE SELF-TEST"
);

const coreSelfTest =
  verifyCoreEngine();

assert(
  coreSelfTest.status === "PASS",
  "Core execution engine self-test PASS"
);

assert(
  coreSelfTest.engine ===
    "SPD v13.1 CORE EXECUTION ENGINE",
  "Correct Core Execution Engine identified"
);


/* =========================================================
   TEST 2 — FIN CORE → DOMAIN
========================================================= */

console.log(
  "\nTEST 2 — CORE → FIN END-TO-END"
);

const finInput = {

  scenario:
    "LIQUIDITY_CRISIS",

  intensity:
    90,

  fx:
    70,

  energy:
    60,

  cyb:
    40,

  inf:
    50,

  dc:
    30,

  mode:
    "TEST"

};


assert(
  mapScenario(
    finInput.scenario
  ) === "FIN",
  "FIN scenario resolves correctly"
);

assert(
  resolveDomain(
    finInput
  ) === "FIN",
  "Core input resolves to FIN"
);


const finCoreResult =
  runEngine(
    finInput
  );


assert(
  finCoreResult.status ===
    "EXECUTED",
  "FIN Core execution completed"
);

assert(
  finCoreResult.output.status ===
    "COMPLETE",
  "FIN Core output COMPLETE"
);

assert(
  finCoreResult.output.domain ===
    "FIN",
  "Core routed execution to FIN"
);

assert(
  finCoreResult.output.domainResult !==
    null,
  "FIN domain result returned"
);

assert(
  finCoreResult.output.domainResult?.success ===
    true,
  "FIN authoritative domain engine executed"
);

assert(
  finCoreResult.output.domainAssessment !==
    null,
  "FIN domain assessment extracted"
);

assert(
  finCoreResult.output.captainAI !==
    undefined,
  "Captain AI Lena executed after domain evaluation"
);

assert(
  finCoreResult.output.decisionSupport !==
    undefined,
  "FIN decision support generated"
);


/* =========================================================
   TEST 3 — BHR CORE → DOMAIN
========================================================= */

console.log(
  "\nTEST 3 — CORE → BHR END-TO-END"
);

const bhrInput = {

  scenario:
    "FORCED_LABOUR",

  intensity:
    90,

  labour:
    80,

  humanRights:
    85,

  supplyChain:
    70,

  governance:
    65,

  community:
    40,

  environment:
    20,

  mode:
    "TEST"

};


assert(
  mapScenario(
    bhrInput.scenario
  ) === "BHR",
  "BHR scenario resolves correctly"
);

assert(
  resolveDomain(
    bhrInput
  ) === "BHR",
  "Core input resolves to BHR"
);


const bhrCoreResult =
  runEngine(
    bhrInput
  );


assert(
  bhrCoreResult.status ===
    "EXECUTED",
  "BHR Core execution completed"
);

assert(
  bhrCoreResult.output.domain ===
    "BHR",
  "Core routed execution to BHR"
);

assert(
  bhrCoreResult.output.domainResult?.success ===
    true,
  "BHR authoritative domain engine executed"
);

assert(
  bhrCoreResult.output.domainAssessment !==
    null,
  "BHR domain assessment extracted"
);

assert(
  bhrCoreResult.output.captainAI !==
    undefined,
  "Captain AI Lena executed for BHR"
);

assert(
  bhrCoreResult.output.decisionSupport !==
    undefined,
  "BHR decision support generated"
);


/* =========================================================
   TEST 4 — GOVERNANCE GATE
========================================================= */

console.log(
  "\nTEST 4 — HUMAN AUTHORITY GOVERNANCE"
);

[
  finCoreResult,
  bhrCoreResult
].forEach(
  (result, index) => {

    const label =
      index === 0
        ? "FIN"
        : "BHR";

    assert(
      result.output.executionAuthority ===
        "HUMAN_OPERATOR",
      `${label} execution authority is HUMAN_OPERATOR`
    );

    assert(
      result.output.executionStatus ===
        "DECISION_GENERATED_HUMAN_AUTHORIZATION_REQUIRED",
      `${label} execution requires human authorization`
    );

    assert(
      result.output.decision !==
        undefined,
      `${label} decision exists`
    );

  }
);


/* =========================================================
   TEST 5 — GOLDEN RULE PIPELINE
========================================================= */

console.log(
  "\nTEST 5 — GOLDEN RULE PIPELINE"
);

const expectedPipeline = [
  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"
];


assert(
  JSON.stringify(
    finCoreResult.output.goldenRulePipeline
  ) ===
  JSON.stringify(
    expectedPipeline
  ),
  "FIN Golden Rule pipeline verified"
);

assert(
  JSON.stringify(
    bhrCoreResult.output.goldenRulePipeline
  ) ===
  JSON.stringify(
    expectedPipeline
  ),
  "BHR Golden Rule pipeline verified"
);


/* =========================================================
   TEST 6 — DOMAIN STATUS
========================================================= */

console.log(
  "\nTEST 6 — ACTIVE DOMAIN ENGINE STATUS"
);

[
  "FIN",
  "BHR"
].forEach(
  domain => {

    const status =
      getDomainStatus(
        domain
      );

    assert(
      status.status ===
        "ACTIVE",
      `${domain} domain ACTIVE`
    );

    assert(
      status.engineRegistered ===
        true,
      `${domain} engine registered`
    );

    assert(
      status.evaluateAvailable ===
        true,
      `${domain} evaluate() available`
    );

  }
);


/* =========================================================
   TEST 7 — CORE → DOMAIN → AI CHAIN
========================================================= */

console.log(
  "\nTEST 7 — COMPLETE EXECUTION CHAIN"
);

assert(
  finCoreResult.output.domainResult?.success ===
    true &&
  finCoreResult.output.captainAI !==
    undefined &&
  finCoreResult.output.decisionSupport !==
    undefined,
  "FIN Core → Domain → Captain AI chain complete"
);

assert(
  bhrCoreResult.output.domainResult?.success ===
    true &&
  bhrCoreResult.output.captainAI !==
    undefined &&
  bhrCoreResult.output.decisionSupport !==
    undefined,
  "BHR Core → Domain → Captain AI chain complete"
);


/* =========================================================
   TEST 8 — NO AUTONOMOUS EXECUTION
========================================================= */

console.log(
  "\nTEST 8 — AUTONOMOUS EXECUTION DISABLED"
);

[
  finCoreResult,
  bhrCoreResult
].forEach(
  (result, index) => {

    const label =
      index === 0
        ? "FIN"
        : "BHR";

    const domainResult =
      result.output.domainResult?.result;

    if (
      domainResult?.governance &&
      typeof domainResult.governance
        .autonomousExecution ===
        "boolean"
    ) {

      assert(
        domainResult.governance
          .autonomousExecution ===
          false,
        `${label} autonomous execution disabled`
      );

    }

  }
);


/* =========================================================
   TEST 9 — NORMALIZATION / OBSERVATION
========================================================= */

console.log(
  "\nTEST 9 — CORE OBSERVE / VERIFY"
);

assert(
  finCoreResult.input.observedAt !==
    undefined,
  "FIN observation timestamp recorded"
);

assert(
  finCoreResult.normalizedInput !==
    undefined,
  "FIN normalized input recorded"
);

assert(
  bhrCoreResult.input.observedAt !==
    undefined,
  "BHR observation timestamp recorded"
);

assert(
  bhrCoreResult.normalizedInput !==
    undefined,
  "BHR normalized input recorded"
);


/* =========================================================
   TEST 10 — DOMAIN AUTHORITY
========================================================= */

console.log(
  "\nTEST 10 — AUTHORITATIVE DOMAIN ASSESSMENT"
);

assert(
  finCoreResult.output
    .decisionSupport
    .assessmentSource ===
      "DOMAIN_RULE_ENGINE",
  "FIN assessment source is authoritative domain engine"
);

assert(
  bhrCoreResult.output
    .decisionSupport
    .assessmentSource ===
      "DOMAIN_RULE_ENGINE",
  "BHR assessment source is authoritative domain engine"
);


/* =========================================================
   FINAL SUMMARY
========================================================= */

console.log(
  "\n================================================="
);

console.log(
  "SPD v13.1 — CORE → DOMAIN END-TO-END TEST"
);

console.log(
  "================================================="
);

console.log(
  "PASSED:",
  passed
);

console.log(
  "FAILED:",
  failed
);

console.log(
  "STATUS:",
  failed === 0
    ? "PASS"
    : "FAIL"
);

console.log(
  "================================================="
);


/* =========================================================
   CI FAILURE GATE
========================================================= */

if (
  failed > 0
) {

  throw new Error(
    `SPD v13.1 Core-to-Domain E2E Test FAILED: ${failed} test(s) failed.`
  );

}


/* =========================================================
   EXPORT TEST SUMMARY
========================================================= */

export {

  passed,

  failed

};