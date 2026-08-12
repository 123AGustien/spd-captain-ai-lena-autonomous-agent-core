/**
 * SPD v13.1 — CORE → DOMAIN END-TO-END VALIDATION
 *
 * Purpose:
 * Proves that a cockpit scenario can travel through:
 *
 * CORE
 *   ↓
 * DOMAIN RESOLUTION
 *   ↓
 * AUTHORITATIVE DOMAIN RULE ENGINE
 *   ↓
 * DOMAIN ASSESSMENT
 *   ↓
 * RESULT
 *
 * No autonomous execution is permitted.
 */

import {
  resolveDomain,
  executeScenarioDomain,
  getDomainStatus
} from "./domainIntegration.js";


/* =========================================================
   TEST SCENARIOS
========================================================= */

const E2E_SCENARIOS = [

  {
    scenario: "LIQUIDITY_CRISIS",
    expectedDomain: "FIN"
  },

  {
    scenario: "HUMAN_RIGHTS_DUE_DILIGENCE",
    expectedDomain: "BHR"
  },

  {
    scenario: "FORCED_LABOUR",
    expectedDomain: "BHR"
  },

  {
    scenario: "CHILD_LABOUR",
    expectedDomain: "BHR"
  },

  {
    scenario: "COOLING_FAILURE",
    expectedDomain: "DC"
  },

  {
    scenario: "DDOS",
    expectedDomain: "CYB"
  }

];


/* =========================================================
   VALIDATE DOMAIN REGISTRATION
========================================================= */

function validateDomain(
  domainId
) {

  const status =
    getDomainStatus(
      domainId
    );

  return {

    domain:
      domainId,

    registered:
      status.engineRegistered === true,

    evaluateAvailable:
      status.evaluateAvailable === true,

    ready:
      status.engineRegistered === true &&
      status.evaluateAvailable === true

  };

}


/* =========================================================
   RUN SINGLE E2E TEST
========================================================= */

function runE2ETest(
  test
) {

  const state = {

    scenario:
      test.scenario,

    intensity:
      50,

    intensityFactor:
      0.5,

    fx:
      20,

    energy:
      20,

    cyb:
      20,

    inf:
      20,

    dc:
      20,

    labour:
      20,

    humanRights:
      20,

    supplyChain:
      20,

    community:
      20,

    governance:
      20,

    environment:
      20,

    liquidity:
      50,

    credit:
      20,

    banking:
      20,

    sovereign:
      20,

    financialMarket:
      20

  };


  /* -------------------------------------------------------
     STEP 1 — DOMAIN RESOLUTION
  ------------------------------------------------------- */

  const resolvedDomain =
    resolveDomain(
      state
    );


  const resolutionPassed =
    resolvedDomain ===
    test.expectedDomain;


  /* -------------------------------------------------------
     STEP 2 — DOMAIN REGISTRATION
  ------------------------------------------------------- */

  const domainStatus =
    validateDomain(
      test.expectedDomain
    );


  /* -------------------------------------------------------
     STEP 3 — AUTHORITATIVE DOMAIN EXECUTION
  ------------------------------------------------------- */

  let execution;

  try {

    execution =
      executeScenarioDomain(
        state,
        {

          source:
            "SPD_V13_1_CORE_TO_DOMAIN_E2E",

          test:
            true

        }
      );

  }

  catch (error) {

    return {

      scenario:
        test.scenario,

      expectedDomain:
        test.expectedDomain,

      resolvedDomain,

      resolutionPassed,

      domainReady:
        domainStatus.ready,

      executionPassed:
        false,

      passed:
        false,

      error:
        error.message

    };

  }


  /* -------------------------------------------------------
     STEP 4 — RESULT VALIDATION
  ------------------------------------------------------- */

  const executionPassed =
    execution &&
    execution.success === true &&
    execution.domain ===
      test.expectedDomain;


  /* -------------------------------------------------------
     STEP 5 — FINAL TEST RESULT
  ------------------------------------------------------- */

  const passed =
    resolutionPassed &&
    domainStatus.ready &&
    executionPassed;


  return {

    scenario:
      test.scenario,

    expectedDomain:
      test.expectedDomain,

    resolvedDomain,

    resolutionPassed,

    domainReady:
      domainStatus.ready,

    executionPassed,

    executionSuccess:
      execution?.success === true,

    executionDomain:
      execution?.domain ||
      null,

    passed

  };

}


/* =========================================================
   FULL CORE → DOMAIN E2E TEST
========================================================= */

function runCoreToDomainE2ETest() {

  const results =
    E2E_SCENARIOS.map(
      runE2ETest
    );


  const passed =
    results.every(
      result =>
        result.passed === true
    );


  return {

    test:
      "CORE_TO_DOMAIN_END_TO_END",

    status:
      passed
        ? "PASS"
        : "FAIL",

    passed,

    totalTests:
      results.length,

    passedTests:
      results.filter(
        result =>
          result.passed
      ).length,

    failedTests:
      results.filter(
        result =>
          !result.passed
      ).length,

    results,

    architecture:

      "CORE → DOMAIN RESOLUTION → AUTHORITATIVE RULE ENGINE → DOMAIN ASSESSMENT",

    autonomousExecution:
      false,

    humanAuthorizationRequired:
      true,

    timestamp:
      new Date().toISOString()

  };

}


/* =========================================================
   EXPORTS
========================================================= */

export {

  E2E_SCENARIOS,

  validateDomain,

  runE2ETest,

  runCoreToDomainE2ETest

};