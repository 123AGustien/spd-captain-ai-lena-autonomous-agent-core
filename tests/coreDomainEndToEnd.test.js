/**
 * SPD v13.1 — DOMAIN INTEGRATION SYSTEM TEST
 *
 * PURPOSE
 * -------
 * Strict integration validation for:
 *
 * COCKPIT
 *   ↓
 * DOMAIN INTEGRATION
 *   ↓
 * AUTHORITATIVE DOMAIN ENGINE
 *   ↓
 * RESULT
 *
 * Active domains:
 * FIN, BHR, DC, CYB, INF
 *
 * Governance:
 * HUMAN_OPERATOR = FINAL AUTHORITY
 * autonomous execution = DISABLED
 */


/* =========================================================
   IMPORTS
========================================================= */

import {
  DOMAIN_REGISTRY,
  DOMAIN_ENGINES,
  mapScenario,
  resolveDomain,
  getDomainStatus,
  executeScenarioDomain,
  listDomains,
  verifyDomainIntegration,
  selfTest
} from "../domainIntegration.js";


/* =========================================================
   TEST STATE
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
   ACTIVE DOMAINS
========================================================= */

const ACTIVE_DOMAINS = [
  "FIN",
  "BHR",
  "DC",
  "CYB",
  "INF"
];


/* =========================================================
   TEST 1 — REGISTRY INTEGRITY
========================================================= */

console.log(
  "\nTEST 1 — DOMAIN REGISTRY INTEGRITY"
);

ACTIVE_DOMAINS.forEach(
  domain => {

    assert(
      DOMAIN_REGISTRY[domain] !== undefined,
      `${domain} registry entry exists`
    );

    assert(
      DOMAIN_REGISTRY[domain].status ===
        "ACTIVE",
      `${domain} registry status ACTIVE`
    );

    assert(
      DOMAIN_ENGINES[domain] !== undefined,
      `${domain} engine registered`
    );

    assert(
      typeof DOMAIN_ENGINES[domain].evaluate ===
        "function",
      `${domain} evaluate() available`
    );

  }
);


/* =========================================================
   TEST 2 — DOMAIN STATUS
========================================================= */

console.log(
  "\nTEST 2 — DOMAIN STATUS"
);

ACTIVE_DOMAINS.forEach(
  domain => {

    const status =
      getDomainStatus(
        domain
      );

    assert(
      status.engineRegistered ===
        true,
      `${domain} engineRegistered=true`
    );

    assert(
      status.evaluateAvailable ===
        true,
      `${domain} evaluateAvailable=true`
    );

  }
);


/* =========================================================
   TEST 3 — SCENARIO RESOLUTION
========================================================= */

console.log(
  "\nTEST 3 — SCENARIO RESOLUTION"
);

const resolutionTests = {

  LIQUIDITY_CRISIS:
    "FIN",

  BANKING_STRESS:
    "FIN",

  FORCED_LABOUR:
    "BHR",

  HUMAN_RIGHTS_DUE_DILIGENCE:
    "BHR",

  COOLING_FAILURE:
    "DC",

  POWER_INSTABILITY:
    "DC",

  DDOS:
    "CYB",

  DATA_BREACH_CREDENTIAL_LEAK:
    "CYB"

};


Object.entries(
  resolutionTests
).forEach(
  ([scenario, expectedDomain]) => {

    assert(
      mapScenario(
        scenario
      ) === expectedDomain,
      `${scenario} → ${expectedDomain}`
    );

    assert(
      resolveDomain({
        scenario
      }) === expectedDomain,
      `${scenario} resolveDomain() → ${expectedDomain}`
    );

  }
);


/* =========================================================
   TEST 4 — INF AUTHORITATIVE MAPPING
========================================================= */

console.log(
  "\nTEST 4 — INF AUTHORITATIVE SCENARIO MAP"
);

const infEngine =
  DOMAIN_ENGINES.INF;

assert(
  typeof infEngine.getScenarioMap ===
    "function",
  "INF exposes authoritative getScenarioMap()"
);

if (
  typeof infEngine.getScenarioMap ===
    "function"
) {

  const infMap =
    infEngine.getScenarioMap();

  const scenarios =
    Object.keys(
      infMap
    );

  assert(
    scenarios.length > 0,
    "INF authoritative scenario map is populated"
  );

  scenarios.forEach(
    scenario => {

      assert(
        mapScenario(
          scenario
        ) === "INF",
        `${scenario} → INF`
      );

    }
  );

}


/* =========================================================
   TEST 5 — UNKNOWN SCENARIO REJECTION
========================================================= */

console.log(
  "\nTEST 5 — UNKNOWN SCENARIO REJECTION"
);

const unknownScenario =
  "SPD_UNKNOWN_TEST_SCENARIO";

assert(
  mapScenario(
    unknownScenario
  ) === null,
  "Unknown scenario returns null"
);

assert(
  resolveDomain({
    scenario:
      unknownScenario
  }) === null,
  "Unknown scenario cannot resolve domain"
);

const unknownResult =
  executeScenarioDomain({

    scenario:
      unknownScenario

  });

assert(
  unknownResult.success ===
    false,
  "Unknown scenario execution rejected"
);

assert(
  unknownResult.error ===
    "NO_DOMAIN_MAPPED_TO_SCENARIO",
  "Correct rejection error returned"
);


/* =========================================================
   TEST 6 — FIN EXECUTION
========================================================= */

console.log(
  "\nTEST 6 — FIN EXECUTION"
);

const fin =
  executeScenarioDomain({

    scenario:
      "LIQUIDITY_CRISIS",

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

    intensity:
      90

  });

assert(
  fin.success ===
    true,
  "FIN execution successful"
);

assert(
  fin.domain ===
    "FIN",
  "FIN domain confirmed"
);

assert(
  fin.result !==
    undefined,
  "FIN authoritative result returned"
);


/* =========================================================
   TEST 7 — BHR EXECUTION
========================================================= */

console.log(
  "\nTEST 7 — BHR EXECUTION"
);

const bhr =
  executeScenarioDomain({

    scenario:
      "FORCED_LABOUR",

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

    intensity:
      90

  });

assert(
  bhr.success ===
    true,
  "BHR execution successful"
);

assert(
  bhr.domain ===
    "BHR",
  "BHR domain confirmed"
);

assert(
  bhr.result !==
    undefined,
  "BHR authoritative result returned"
);


/* =========================================================
   TEST 8 — DC EXECUTION
========================================================= */

console.log(
  "\nTEST 8 — DC EXECUTION"
);

const dc =
  executeScenarioDomain({

    scenario:
      "COOLING_FAILURE",

    cooling:
      90,

    power:
      60,

    network:
      50,

    compute:
      70,

    intensity:
      85

  });

assert(
  dc.success ===
    true,
  "DC execution successful"
);

assert(
  dc.domain ===
    "DC",
  "DC domain confirmed"
);

assert(
  dc.result !==
    undefined,
  "DC authoritative result returned"
);


/* =========================================================
   TEST 9 — CYB EXECUTION
========================================================= */

console.log(
  "\nTEST 9 — CYB EXECUTION"
);

const cyb =
  executeScenarioDomain({

    scenario:
      "DDOS",

    network:
      90,

    system:
      80,

    intensity:
      90

  });

assert(
  cyb.success ===
    true,
  "CYB execution successful"
);

assert(
  cyb.domain ===
    "CYB",
  "CYB domain confirmed"
);

assert(
  cyb.result !==
    undefined,
  "CYB authoritative result returned"
);


/* =========================================================
   TEST 10 — GOVERNANCE
========================================================= */

console.log(
  "\nTEST 10 — GOVERNANCE"
);

const results = [
  fin,
  bhr,
  dc,
  cyb
];


results.forEach(
  result => {

    const output =
      result.result;

    assert(
      output !==
        undefined,
      `${result.domain} governed result exists`
    );

    if (!output) {
      return;
    }


    if (
      output.executionAuthority
    ) {

      assert(
        output.executionAuthority ===
          "HUMAN_OPERATOR",
        `${result.domain} execution authority HUMAN_OPERATOR`
      );

    }


    if (
      output.decision &&
      output.decision.executionAuthority
    ) {

      assert(
        output.decision.executionAuthority ===
          "HUMAN_OPERATOR",
        `${result.domain} decision authority HUMAN_OPERATOR`
      );

    }


    if (
      output.governance &&
      typeof output.governance
        .autonomousExecution ===
        "boolean"
    ) {

      assert(
        output.governance
          .autonomousExecution ===
          false,
        `${result.domain} autonomous execution disabled`
      );

    }

  }
);


/* =========================================================
   TEST 11 — HIGH-RISK HUMAN AUTHORIZATION
========================================================= */

console.log(
  "\nTEST 11 — HIGH-RISK HUMAN AUTHORIZATION"
);

const highRisk =
  executeScenarioDomain({

    scenario:
      "FORCED_LABOUR",

    labour:
      100,

    humanRights:
      100,

    supplyChain:
      100,

    governance:
      100,

    community:
      100,

    environment:
      100,

    intensity:
      100

  });

assert(
  highRisk.success ===
    true,
  "High-risk BHR evaluation successful"
);

if (
  highRisk.success &&
  highRisk.result
) {

  const output =
    highRisk.result;

  const authorizationRequired =
    output.executionStatus ===
      "HUMAN_AUTHORIZATION_REQUIRED" ||

    (
      output.decision &&
      output.decision.humanAuthorization ===
        "REQUIRED_BEFORE_EXECUTION"
    );

  assert(
    authorizationRequired,
    "High-risk BHR requires human authorization"
  );

}


/* =========================================================
   TEST 12 — DOMAIN LIST
========================================================= */

console.log(
  "\nTEST 12 — DOMAIN LIST"
);

const domains =
  listDomains();

ACTIVE_DOMAINS.forEach(
  domainId => {

    const domain =
      domains.find(
        item =>
          item.id ===
            domainId
      );

    assert(
      domain !==
        undefined,
      `${domainId} present in domain list`
    );

    if (!domain) {
      return;
    }

    assert(
      domain.status ===
        "ACTIVE",
      `${domainId} listed ACTIVE`
    );

    assert(
      domain.engineRegistered ===
        true,
      `${domainId} listed engine registered`
    );

    assert(
      domain.evaluateAvailable ===
        true,
      `${domainId} listed evaluation available`
    );

  }
);


/* =========================================================
   TEST 13 — FULL INTEGRATION SELF-TEST
========================================================= */

console.log(
  "\nTEST 13 — FULL DOMAIN INTEGRATION SELF-TEST"
);

const integration =
  selfTest();

assert(
  integration.status ===
    "PASS",
  "Domain integration self-test PASS"
);

assert(
  integration.registration.passed ===
    true,
  "Registration self-test PASS"
);

assert(
  integration.resolution.passed ===
    true,
  "Resolution self-test PASS"
);

assert(
  integration.integration.status ===
    "READY",
  "Integration status READY"
);

assert(
  integration.governance
    .humanOperator ===
      true,
  "Human operator authority enabled"
);

assert(
  integration.governance
    .autonomousExecution ===
      false,
  "Autonomous execution disabled"
);

assert(
  integration.governance
    .humanAuthorizationRequired ===
      true,
  "Human authorization required"
);


/* =========================================================
   TEST 14 — INTEGRATION READINESS
========================================================= */

console.log(
  "\nTEST 14 — INTEGRATION READINESS"
);

const verification =
  verifyDomainIntegration();

assert(
  verification.status ===
    "READY",
  "Domain integration READY"
);

ACTIVE_DOMAINS.forEach(
  domain => {

    assert(
      verification
        .registeredEngines
        .includes(domain),
      `${domain} included in registered engines`
    );

  }
);


/* =========================================================
   FINAL RESULT
========================================================= */

console.log(
  "\n================================================="
);

console.log(
  "SPD v13.1 — DOMAIN INTEGRATION SYSTEM TEST"
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
    `SPD v13.1 Domain Integration Test FAILED: ${failed} test(s) failed.`
  );

}


/* =========================================================
   EXPORT
========================================================= */

export {

  passed,

  failed

};