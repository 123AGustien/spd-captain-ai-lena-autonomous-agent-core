/**
 * SPD v13.1 — DOMAIN INTEGRATION SYSTEM TEST
 *
 * Validates:
 * - Active domain registration
 * - Engine registration
 * - Scenario → domain resolution
 * - FIN routing
 * - BHR routing
 * - DC routing
 * - CYB routing
 * - INF routing
 * - Unknown scenario rejection
 * - Domain execution
 * - Governance controls
 * - Human authorization
 * - Autonomous execution disabled
 * - Full integration self-test
 * - Deterministic repeatability
 *
 * Expected active domains:
 * FIN, BHR, DC, CYB, INF
 */

import {
  DOMAIN_REGISTRY,
  DOMAIN_ENGINES,
  SCENARIO_DOMAIN_MAP,
  mapScenario,
  resolveDomain,
  getDomainStatus,
  executeDomainRule,
  executeScenarioDomain,
  listDomains,
  verifyDomainIntegration,
  selfTestDomainRegistration,
  selfTestScenarioResolution,
  selfTest
} from "./domainIntegration.js";


let passed = 0;
let failed = 0;


/* =========================================================
   ASSERTION
========================================================= */

function assert(condition, message) {

  if (condition) {

    console.log("PASS:", message);

    passed++;

  } else {

    console.error("FAIL:", message);

    failed++;

  }

}


/* =========================================================
   TEST 1 — DOMAIN REGISTRATION
========================================================= */

console.log(
  "\nTEST 1 — ACTIVE DOMAIN REGISTRATION"
);

const activeDomains = [
  "FIN",
  "BHR",
  "DC",
  "CYB",
  "INF"
];

activeDomains.forEach(
  domain => {

    assert(
      DOMAIN_REGISTRY[domain] !== undefined,
      `${domain} domain registered`
    );

    assert(
      DOMAIN_REGISTRY[domain].status === "ACTIVE",
      `${domain} domain ACTIVE`
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

activeDomains.forEach(
  domain => {

    const status =
      getDomainStatus(domain);

    assert(
      status.engineRegistered === true,
      `${domain} engine registration confirmed`
    );

    assert(
      status.evaluateAvailable === true,
      `${domain} evaluation available`
    );

  }
);


/* =========================================================
   TEST 3 — FIN SCENARIO RESOLUTION
========================================================= */

console.log(
  "\nTEST 3 — FIN SCENARIO RESOLUTION"
);

assert(
  mapScenario("LIQUIDITY_CRISIS") === "FIN",
  "LIQUIDITY_CRISIS resolves to FIN"
);

assert(
  mapScenario("BANKING_STRESS") === "FIN",
  "BANKING_STRESS resolves to FIN"
);


/* =========================================================
   TEST 4 — BHR SCENARIO RESOLUTION
========================================================= */

console.log(
  "\nTEST 4 — BHR SCENARIO RESOLUTION"
);

const bhrScenarios = [
  "HUMAN_RIGHTS_DUE_DILIGENCE",
  "FORCED_LABOUR",
  "CHILD_LABOUR",
  "DISCRIMINATION",
  "OCCUPATIONAL_HEALTH_AND_SAFETY",
  "MODERN_SLAVERY",
  "COMMUNITY_IMPACT",
  "INDIGENOUS_RIGHTS",
  "SUPPLY_CHAIN_RISK",
  "GRIEVANCE_MECHANISM"
];

bhrScenarios.forEach(
  scenario => {

    assert(
      mapScenario(scenario) === "BHR",
      `${scenario} resolves to BHR`
    );

  }
);


/* =========================================================
   TEST 5 — DC SCENARIO RESOLUTION
========================================================= */

console.log(
  "\nTEST 5 — DC SCENARIO RESOLUTION"
);

const dcScenarios = [
  "COOLING_FAILURE",
  "POWER_INSTABILITY",
  "NETWORK_CONGESTION",
  "COMPUTE_LOAD_SPIKE",
  "BLACKOUT_RECOVERY",
  "COOLING_RECOVERY_FAILURE",
  "NETWORK_HARDWARE_FAILURE",
  "STORAGE_DEGRADATION",
  "COOLING_LOAD_SATURATION",
  "MULTI_SYSTEM_CASCADE"
];

dcScenarios.forEach(
  scenario => {

    assert(
      mapScenario(scenario) === "DC",
      `${scenario} resolves to DC`
    );

  }
);


/* =========================================================
   TEST 6 — CYB SCENARIO RESOLUTION
========================================================= */

console.log(
  "\nTEST 6 — CYB SCENARIO RESOLUTION"
);

const cybScenarios = [
  "DATA_BREACH_CREDENTIAL_LEAK",
  "DDOS",
  "INSIDER_THREAT",
  "API_ABUSE_TOKEN_MISUSE",
  "SUPPLY_CHAIN_CYBER_COMPROMISE",
  "CLOUD_MISCONFIGURATION_EXPOSURE",
  "IDENTITY_PROVIDER_OUTAGE",
  "MULTI_VECTOR_COORDINATED_CYBER_ATTACK"
];

cybScenarios.forEach(
  scenario => {

    assert(
      mapScenario(scenario) === "CYB",
      `${scenario} resolves to CYB`
    );

  }
);


/* =========================================================
   TEST 7 — INF AUTHORITATIVE SCENARIO MAPPING
========================================================= */

console.log(
  "\nTEST 7 — INF AUTHORITATIVE SCENARIO MAPPING"
);

const infEngine =
  DOMAIN_ENGINES.INF;

assert(
  typeof infEngine.getScenarioMap === "function",
  "INF authoritative scenario map available"
);

if (
  typeof infEngine.getScenarioMap === "function"
) {

  const infScenarioMap =
    infEngine.getScenarioMap();

  Object.keys(infScenarioMap).forEach(
    scenario => {

      assert(
        mapScenario(scenario) === "INF",
        `${scenario} resolves to INF`
      );

    }
  );

}


/* =========================================================
   TEST 8 — UNKNOWN SCENARIO
========================================================= */

console.log(
  "\nTEST 8 — UNKNOWN SCENARIO REJECTION"
);

const unknownScenario =
  "UNKNOWN_SYSTEM_SCENARIO";

assert(
  mapScenario(unknownScenario) === null,
  "Unknown scenario rejected"
);

assert(
  resolveDomain({
    scenario: unknownScenario
  }) === null,
  "Unknown scenario has no domain"
);

const unknownExecution =
  executeScenarioDomain({
    scenario: unknownScenario
  });

assert(
  unknownExecution.success === false,
  "Unknown scenario execution rejected"
);

assert(
  unknownExecution.error ===
    "NO_DOMAIN_MAPPED_TO_SCENARIO",
  "Correct unknown scenario error returned"
);


/* =========================================================
   TEST 9 — FIN DOMAIN EXECUTION
========================================================= */

console.log(
  "\nTEST 9 — FIN DOMAIN EXECUTION"
);

const finResult =
  executeScenarioDomain({

    scenario:
      "LIQUIDITY_CRISIS",

    fx: 70,
    energy: 60,
    cyb: 40,
    inf: 50,
    dc: 30

  });

assert(
  finResult.success === true,
  "FIN scenario executed successfully"
);

assert(
  finResult.domain === "FIN",
  "FIN domain confirmed"
);

assert(
  finResult.result !== undefined,
  "FIN result returned"
);


/* =========================================================
   TEST 10 — BHR DOMAIN EXECUTION
========================================================= */

console.log(
  "\nTEST 10 — BHR DOMAIN EXECUTION"
);

const bhrResult =
  executeScenarioDomain({

    scenario:
      "FORCED_LABOUR",

    labour: 80,
    humanRights: 85,
    supplyChain: 70,
    governance: 65,
    community: 40,
    environment: 20,
    intensity: 90

  });

assert(
  bhrResult.success === true,
  "BHR scenario executed successfully"
);

assert(
  bhrResult.domain === "BHR",
  "BHR domain confirmed"
);

assert(
  bhrResult.result !== undefined,
  "BHR result returned"
);


/* =========================================================
   TEST 11 — DC DOMAIN EXECUTION
========================================================= */

console.log(
  "\nTEST 11 — DC DOMAIN EXECUTION"
);

const dcResult =
  executeScenarioDomain({

    scenario:
      "COOLING_FAILURE",

    cooling: 90,
    power: 60,
    network: 50,
    compute: 70,
    intensity: 85

  });

assert(
  dcResult.success === true,
  "DC scenario executed successfully"
);

assert(
  dcResult.domain === "DC",
  "DC domain confirmed"
);

assert(
  dcResult.result !== undefined,
  "DC result returned"
);


/* =========================================================
   TEST 12 — CYB DOMAIN EXECUTION
========================================================= */

console.log(
  "\nTEST 12 — CYB DOMAIN EXECUTION"
);

const cybResult =
  executeScenarioDomain({

    scenario:
      "DDOS",

    network: 90,
    system: 80,
    intensity: 90

  });

assert(
  cybResult.success === true,
  "CYB scenario executed successfully"
);

assert(
  cybResult.domain === "CYB",
  "CYB domain confirmed"
);

assert(
  cybResult.result !== undefined,
  "CYB result returned"
);


/* =========================================================
   TEST 13 — INF DOMAIN EXECUTION
========================================================= */

console.log(
  "\nTEST 13 — INF DOMAIN EXECUTION"
);

const infResult =
  executeScenarioDomain({

    scenario:
      "REGIONAL_NETWORK_OUTAGE",

    network: 85,
    dns: 60,
    intensity: 90

  });

assert(
  infResult.success === true,
  "INF scenario executed successfully"
);

assert(
  infResult.domain === "INF",
  "INF domain confirmed"
);

assert(
  infResult.result !== undefined,
  "INF result returned"
);


/* =========================================================
   TEST 14 — GOVERNANCE
========================================================= */

console.log(
  "\nTEST 14 — GOVERNANCE"
);

const governanceResults = [
  finResult,
  bhrResult,
  dcResult,
  cybResult,
  infResult
];

governanceResults.forEach(
  (result, index) => {

    const number =
      index + 1;

    const domain =
      result.domain;

    const output =
      result.result;

    assert(
      output !== undefined,
      `Test ${number} ${domain} returned governed result`
    );

    if (!output) {
      return;
    }

    /*
     * Support both domain-engine governance
     * structures used by the current engines.
     */

    const autonomousExecution =
      output.governance &&
      output.governance.autonomousExecution;

    if (
      output.governance &&
      typeof autonomousExecution === "boolean"
    ) {

      assert(
        autonomousExecution === false,
        `${domain} autonomous execution disabled`
      );

    }

    if (
      output.executionAuthority
    ) {

      assert(
        output.executionAuthority ===
          "HUMAN_OPERATOR",
        `${domain} execution authority HUMAN_OPERATOR`
      );

    }

    if (
      output.decision &&
      output.decision.executionAuthority
    ) {

      assert(
        output.decision.executionAuthority ===
          "HUMAN_OPERATOR",
        `${domain} decision authority HUMAN_OPERATOR`
      );

    }

  }
);


/* =========================================================
   TEST 15 — HUMAN AUTHORIZATION
========================================================= */

console.log(
  "\nTEST 15 — HUMAN AUTHORIZATION"
);

const highRiskBHR =
  executeScenarioDomain({

    scenario:
      "FORCED_LABOUR",

    labour: 100,
    humanRights: 100,
    supplyChain: 100,
    governance: 100,
    community: 100,
    environment: 100,
    intensity: 100

  });

assert(
  highRiskBHR.success === true,
  "High-risk BHR scenario evaluated"
);

if (
  highRiskBHR.success &&
  highRiskBHR.result
) {

  const output =
    highRiskBHR.result;

  assert(
    output.executionStatus ===
      "HUMAN_AUTHORIZATION_REQUIRED" ||
    (
      output.decision &&
      output.decision.humanAuthorization ===
        "REQUIRED_BEFORE_EXECUTION"
    ),
    "BHR execution requires human authorization"
  );

}


/* =========================================================
   TEST 16 — DOMAIN INTEGRATION SELF-TEST
========================================================= */

console.log(
  "\nTEST 16 — DOMAIN INTEGRATION SELF-TEST"
);

const integrationSelfTest =
  selfTest();

assert(
  integrationSelfTest.status === "PASS",
  "Full domain integration self-test PASS"
);

assert(
  integrationSelfTest.registration.passed === true,
  "Domain registration self-test PASS"
);

assert(
  integrationSelfTest.resolution.passed === true,
  "Scenario resolution self-test PASS"
);

assert(
  integrationSelfTest.integration.status === "READY",
  "Domain integration reports READY"
);


/* =========================================================
   TEST 17 — DIRECT INTEGRATION VERIFICATION
========================================================= */

console.log(
  "\nTEST 17 — DIRECT INTEGRATION VERIFICATION"
);

const verification =
  verifyDomainIntegration();

assert(
  verification.status === "READY",
  "Integration verification READY"
);

assert(
  verification.activeDomains.length === 5,
  "Five active domains verified"
);

assert(
  verification.registeredEngines.includes("FIN"),
  "FIN registered"
);

assert(
  verification.registeredEngines.includes("BHR"),
  "BHR registered"
);

assert(
  verification.registeredEngines.includes("DC"),
  "DC registered"
);

assert(
  verification.registeredEngines.includes("CYB"),
  "CYB registered"
);

assert(
  verification.registeredEngines.includes("INF"),
  "INF registered"
);


/* =========================================================
   TEST 18 — DOMAIN LIST
========================================================= */

console.log(
  "\nTEST 18 — DOMAIN LIST"
);

const domains =
  listDomains();

activeDomains.forEach(
  domainId => {

    const domain =
      domains.find(
        item =>
          item.id === domainId
      );

    assert(
      domain !== undefined,
      `${domainId} appears in domain list`
    );

    if (domain) {

      assert(
        domain.status === "ACTIVE",
        `${domainId} listed ACTIVE`
      );

      assert(
        domain.engineRegistered === true,
        `${domainId} engine listed registered`
      );

      assert(
        domain.evaluateAvailable === true,
        `${domainId} evaluation listed available`
      );

    }

  }
);


/* =========================================================
   TEST 19 — DETERMINISTIC REPEATABILITY
========================================================= */

console.log(
  "\nTEST 19 — DETERMINISTIC REPEATABILITY"
);

const deterministicInput = {

  scenario:
    "REGIONAL_NETWORK_OUTAGE",

  network: 65,
  dns: 45,
  power: 55,
  cloud: 30,
  loadBalancer: 35,
  tls: 40,
  edge: 25,
  dci: 50,
  system: 45,
  intensity: 70

};

const runA =
  executeScenarioDomain(
    deterministicInput
  );

const runB =
  executeScenarioDomain(
    deterministicInput
  );

assert(
  runA.success === true &&
  runB.success === true,
  "Repeated INF executions successful