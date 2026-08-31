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

function validateDomain(domainId) {

  const status = getDomainStatus(domainId);

  return {

    domain: domainId,

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

function runE2ETest(test) {

  const state = {

    scenario: test.scenario,

    intensity: 50,

    intensityFactor: 0.5,

    fx: 20,

    energy: 20,

    cyb: 20,

    inf: 20,

    dc: 20

  };


  /* -------------------------------------------------------
     STEP 1 — RESOLVE DOMAIN
  ------------------------------------------------------- */

  const resolvedDomain =
    resolveDomain(
      test.scenario
    );


  const domainResolved =
    resolvedDomain === test.expectedDomain;


  /* -------------------------------------------------------
     STEP 2 — VALIDATE DOMAIN REGISTRATION
  ------------------------------------------------------- */

  const domainStatus =
    validateDomain(
      test.expectedDomain
    );


  /* -------------------------------------------------------
     STEP 3 — EXECUTE AUTHORITATIVE DOMAIN ASSESSMENT
  ------------------------------------------------------- */

  let domainResult = null;
  let executionError = null;

  try {

    domainResult =
      executeScenarioDomain(
        test.scenario,
        state
      );

  } catch (error) {

    executionError =
      error instanceof Error
        ? error.message
        : String(error);

  }


  /* -------------------------------------------------------
     STEP 4 — VALIDATE RESULT
  ------------------------------------------------------- */

  const assessmentAvailable =
    domainResult !== null &&
    typeof domainResult === "object";


  const passed =
    domainResolved &&
    domainStatus.ready &&
    assessmentAvailable &&
    executionError === null;


  return {

    scenario:
      test.scenario,

    expectedDomain:
      test.expectedDomain,

    resolvedDomain,

    domainResolved,

    domainStatus,

    assessmentAvailable,

    executionError,

    domainResult,

    autonomousExecution:
      false,

    humanAuthorizationRequired:
      true,

    passed

  };

}


/* =========================================================
   RUN COMPLETE CORE → DOMAIN E2E VALIDATION
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
          result.passed === true
      ).length,

    failedTests:
      results.filter(
        result =>
          result.passed !== true
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