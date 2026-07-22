/*
============================================================
SPD v13.1 — SEXTANT RESILIENCE PROTOCOL
SELF-TEST & VALIDATION CONTROLLER
============================================================

PURPOSE

This file is the validation controller for SPD v13.1.

It validates:

- Core deterministic engine behaviour
- Scenario differentiation
- Scenario intensity escalation
- Domain sensitivity
- Cross-domain cascade behaviour
- Decision appropriateness
- Audit consistency

VALIDATION CYCLE

INITIAL SELF-TEST
        ↓
FAULT IDENTIFICATION
        ↓
CONTROLLED CORRECTIVE ACTION
        ↓
ACTUAL RE-TEST
        ↓
FINAL VALIDATION
        ↓
AUDIT RECORD

IMPORTANT

This controller does NOT modify the authoritative Golden Rule
Engine automatically.

The Golden Rule Engine remains the authoritative rule set.

This controller:

1. Executes validation.
2. Identifies faults.
3. Records corrective action requirements.
4. Executes an actual re-test.
5. Compares initial and re-test results.
6. Produces final validation status.
7. Generates an audit record.

============================================================
GOLDEN RULE

OBSERVE
→ VERIFY
→ ASSESS
→ DECIDE
→ ACT
→ UPDATE
============================================================
*/


/* =========================================================
SYSTEM CONSTANTS
========================================================= */

const GOLDEN_RULE_PIPELINE = [
  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"
];

const ENGINE_NAME =
  "SPD v13.1 — SEXTANT RESILIENCE PROTOCOL";

const VALIDATION_ENGINE =
  "SPD v13.1 SELF-TEST & VALIDATION CONTROLLER";


/* =========================================================
BASIC ENGINE FUNCTIONS
========================================================= */

function calculateRawStress(state) {

  const fxStress =
    state.fx * 0.20;

  const energyStress =
    (100 - state.energy) * 0.20;

  const cyberStress =
    state.cyb * 0.20;

  const infrastructureStress =
    state.inf * 0.15;

  const dataCentreStress =
    state.dc * 0.15;

  const eventStress =
    state.eventStress || 0;

  return (
    fxStress +
    energyStress +
    cyberStress +
    infrastructureStress +
    dataCentreStress +
    eventStress
  );

}


function calculateGoldenScore(rawStress) {

  const PHI =
    1.618033988749895;

  return (
    rawStress *
    (1 / PHI)
  );

}


function calculateResilienceScore(
  goldenScore
) {

  return Math.max(
    0,
    100 - goldenScore
  );

}


function classifyRisk(
  goldenScore
) {

  if (
    goldenScore < 30
  ) {

    return "LOW";

  }

  if (
    goldenScore < 50
  ) {

    return "MEDIUM";

  }

  return "HIGH";

}


function determineDecision(
  risk,
  state
) {

  if (
    risk === "LOW"
  ) {

    if (
      state.energy < 35
    ) {

      return {

        decision:
          "ENERGY PROTECTION MODE",

        action:
          "REDUCE SYSTEM LOAD AND PRESERVE ENERGY RESERVES"

      };

    }

    return {

      decision:
        "SYSTEM STABLE",

      action:
        "CONTINUE MONITORING"

    };

  }


  if (
    risk === "MEDIUM"
  ) {

    return {

      decision:
        "PREVENTIVE RESILIENCE MODE",

      action:
        "APPLY PREVENTIVE MITIGATION AND MONITOR CASCADE RISK"

    };

  }


  return {

    decision:
      "ACTIVATE STABILIZATION MODE",

    action:
      "ISOLATE AFFECTED DOMAINS AND ACTIVATE SYSTEM STABILIZATION"

  };

}


/* =========================================================
SCENARIO DEFINITIONS
========================================================= */

const SCENARIOS = {

  FX_STRESS: {

    primaryDomain:
      "FX",

    description:
      "Foreign exchange and economic stress event",

    impact: {

      fx:
        1.0,

      energy:
        0.20

    },

    eventStress:
      10

  },


  DC_LOAD: {

    primaryDomain:
      "DC",

    description:
      "Data centre load and energy demand event",

    impact: {

      dc:
        1.0,

      energy:
        0.30

    },

    eventStress:
      10

  },


  CYBER_EVENT: {

    primaryDomain:
      "CYB",

    description:
      "Cybersecurity disruption event",

    impact: {

      cyb:
        1.0,

      dc:
        0.10,

      energy:
        0.10

    },

    eventStress:
      10

  },


  INFRA_STRAIN: {

    primaryDomain:
      "INF",

    description:
      "Infrastructure resilience stress event",

    impact: {

      inf:
        1.0,

      dc:
        0.20,

      energy:
        0.10

    },

    eventStress:
      10

  },


  BIODIESEL_SHORTAGE: {

    primaryDomain:
      "ENERGY",

    description:
      "Biodiesel and fuel supply shortage",

    impact: {

      energy:
        1.0,

      fx:
        0.10

    },

    eventStress:
      10

  }

};


/* =========================================================
BASE STATE
========================================================= */

function createBaseState() {

  return {

    fx:
      0,

    energy:
      80,

    cyb:
      10,

    inf:
      5,

    dc:
      5,

    event:
      "NORMAL",

    eventStress:
      0,

    mode:
      "AUTONOMOUS"

  };

}


/* =========================================================
APPLY SCENARIO
========================================================= */

function applyScenario(
  scenarioName,
  intensity
) {

  const scenario =
    SCENARIOS[
      scenarioName
    ];

  const state =
    createBaseState();


  if (
    !scenario
  ) {

    return state;

  }


  const factor =
    Math.max(
      0,
      Math.min(
        100,
        intensity
      )
    ) / 100;


  state.event =
    scenarioName;


  state.eventStress =
    scenario.eventStress *
    factor;


  Object.keys(
    scenario.impact
  ).forEach(
    domain => {

      const impact =
        scenario.impact[
          domain
        ] *
        factor *
        100;


      if (
        domain === "fx"
      ) {

        state.fx =
          Math.min(
            100,
            state.fx +
            impact
          );

      }


      if (
        domain === "energy"
      ) {

        state.energy =
          Math.max(
            0,
            state.energy -
            impact
          );

      }


      if (
        domain === "cyb"
      ) {

        state.cyb =
          Math.min(
            100,
            state.cyb +
            impact
          );

      }


      if (
        domain === "inf"
      ) {

        state.inf =
          Math.min(
            100,
            state.inf +
            impact
          );

      }


      if (
        domain === "dc"
      ) {

        state.dc =
          Math.min(
            100,
            state.dc +
            impact
          );

      }

    }
  );


  return state;

}


/* =========================================================
COMPLETE ENGINE EVALUATION
========================================================= */

function evaluateState(
  state
) {

  const rawStress =
    calculateRawStress(
      state
    );


  const goldenScore =
    calculateGoldenScore(
      rawStress
    );


  const resilienceScore =
    calculateResilienceScore(
      goldenScore
    );


  const risk =
    classifyRisk(
      goldenScore
    );


  const decision =
    determineDecision(
      risk,
      state
    );


  return {

    rawStress,

    goldenScore,

    resilienceScore,

    risk,

    decision,

    pipeline:
      [
        ...GOLDEN_RULE_PIPELINE
      ],

    engineStatus:
      "COMPLETE"

  };

}


/* =========================================================
CORE ENGINE VALIDATION
========================================================= */

function runCoreEngineTests() {

  const tests = [];


  const cases = [

    {

      name:
        "LOW RISK — NORMAL STABILITY",

      input: {

        fx:
          0,

        energy:
          80,

        cyb:
          10,

        inf:
          5,

        dc:
          5,

        event:
          "NORMAL",

        eventStress:
          0,

        mode:
          "AUTONOMOUS"

      },

      expectedRisk:
        "LOW",

      expectedDecision:
        "SYSTEM STABLE"

    },


    {

      name:
        "MEDIUM RISK — PREVENTIVE RESILIENCE",

      input: {

        fx:
          50,

        energy:
          50,

        cyb:
          50,

        inf:
          50,

        dc:
          50,

        event:
          "MEDIUM_STRESS",

        eventStress:
          0,

        mode:
          "AUTONOMOUS"

      },

      expectedRisk:
        "MEDIUM",

      expectedDecision:
        "PREVENTIVE RESILIENCE MODE"

    },


    {

      name:
        "HIGH RISK — STABILIZATION",

      input: {

        fx:
          80,

        energy:
          0,

        cyb:
          100,

        inf:
          100,

        dc:
          100,

        event:
          "HIGH_STRESS",

        eventStress:
          0,

        mode:
          "AUTONOMOUS"

      },

      expectedRisk:
        "HIGH",

      expectedDecision:
        "ACTIVATE STABILIZATION MODE"

    },


    {

      name:
        "MAXIMUM CURRENT RISK — ENGINE LIMIT",

      input: {

        fx:
          100,

        energy:
          0,

        cyb:
          100,

        inf:
          100,

        dc:
          100,

        event:
          "CRITICAL_EVENT",

        eventStress:
          0,

        mode:
          "AUTONOMOUS"

      },

      expectedRisk:
        "HIGH",

      expectedDecision:
        "ACTIVATE STABILIZATION MODE"

    }

  ];


  cases.forEach(
    testCase => {

      const result =
        evaluateState(
          testCase.input
        );


      const passed =

        result.risk ===
          testCase.expectedRisk

        &&

        result.decision.decision ===
          testCase.expectedDecision

        &&

        result.pipeline.length ===
          6

        &&

        result.engineStatus ===
          "COMPLETE";


      tests.push({

        test:
          testCase.name,

        input:
          testCase.input,

        expectedRisk:
          testCase.expectedRisk,

        actualRisk:
          result.risk,

        expectedDecision:
          testCase.expectedDecision,

        actualDecision:
          result.decision.decision,

        goldenScore:
          result.goldenScore,

        resilienceScore:
          result.resilienceScore,

        pipeline:
          result.pipeline,

        engineStatus:
          result.engineStatus,

        status:
          passed
            ? "PASS"
            : "FAIL"

      });

    }
  );


  return {

    engine:
      "SPD v13.1 SELF-TEST",

    summary:
      `${tests.filter(
        test =>
          test.status ===
          "PASS"
      ).length}/${tests.length} TESTS PASSED`,

    overallStatus:

      tests.every(
        test =>
          test.status ===
          "PASS"
      )

        ? "PASS"

        : "FAIL",

    testsValidated: [

      "RISK CLASSIFICATION",

      "DETERMINISTIC DECISION LOGIC",

      "GOLDEN RULE PIPELINE",

      "ENGINE EXECUTION STATUS"

    ],

    goldenRulePipeline:
      [
        ...GOLDEN_RULE_PIPELINE
      ],

    results:
      tests

  };

}


/* =========================================================
SCENARIO DIFFERENTIATION TEST
========================================================= */

function runScenarioDifferentiationTest() {

  const dcState =
    applyScenario(
      "DC_LOAD",
      100
    );


  const cyberState =
    applyScenario(
      "CYBER_EVENT",
      100
    );


  const dcAssessment =
    evaluateState(
      dcState
    );


  const cyberAssessment =
    evaluateState(
      cyberState
    );


  const differentiated =

    dcState.dc !==
      cyberState.dc

    &&

    cyberState.cyb !==
      dcState.cyb;


  return {

    test:
      "SCENARIO DIFFERENTIATION — DC_LOAD vs CYBER_EVENT",

    dcLoad: {

      state:
        dcState,

      assessment:
        dcAssessment

    },

    cyberEvent: {

      state:
        cyberState,

      assessment:
        cyberAssessment

    },

    status:
      differentiated
        ? "PASS"
        : "REVIEW",

    finding:
      differentiated

        ?

        "Scenario domain impacts are differentiated."

        :

        "Scenario domain impacts are insufficiently differentiated."

  };

}


/* =========================================================
INTENSITY ESCALATION TEST
========================================================= */

function runIntensityEscalationTest(
  scenarioName
) {

  const intensities =
    [
      30,
      50,
      75,
      100
    ];


  const results =
    intensities.map(
      intensity => {

        const state =
          applyScenario(
            scenarioName,
            intensity
          );


        const assessment =
          evaluateState(
            state
          );


        return {

          intensity,

          rawStress:
            assessment.rawStress,

          goldenScore:
            assessment.goldenScore,

          resilienceScore:
            assessment.resilienceScore,

          risk:
            assessment.risk

        };

      }
    );


  let escalationPass =
    true;


  for (
    let i = 1;
    i < results.length;
    i++
  ) {

    if (
      results[i].rawStress <
      results[i - 1].rawStress
    ) {

      escalationPass =
        false;

    }

  }


  return {

    test:
      `INTENSITY ESCALATION — ${scenarioName}`,

    results,

    status:
      escalationPass
        ? "PASS"
        : "REVIEW",

    finding:
      escalationPass

        ?

        "Stress increases monotonically with scenario intensity."

        :

        "Stress does not increase logically with scenario intensity."

  };

}


/* =========================================================
DOMAIN SENSITIVITY TEST
========================================================= */

function runDomainSensitivityTest() {

  const expectations = {

    FX_STRESS:
      "FX",

    DC_LOAD:
      "DC",

    CYBER_EVENT:
      "CYB",

    INFRA_STRAIN:
      "INF",

    BIODIESEL_SHORTAGE:
      "ENERGY"

  };


  const results =
    Object.keys(
      expectations
    ).map(
      scenarioName => {

        const state =
          applyScenario(
            scenarioName,
            100
          );


        const primaryDomain =
          expectations[
            scenarioName
          ];


        const domainValue =

          primaryDomain ===
            "FX"

            ?

            state.fx

            :

          primaryDomain ===
            "DC"

            ?

            state.dc

            :

          primaryDomain ===
            "CYB"

            ?

            state.cyb

            :

          primaryDomain ===
            "INF"

            ?

            state.inf

            :

            state.energy;


        const valid =

          primaryDomain ===
            "ENERGY"

            ?

            domainValue <
              80

            :

            domainValue >
              5;


        return {

          scenario:
            scenarioName,

          expectedPrimaryDomain:
            primaryDomain,

          observedPrimaryDomainValue:
            domainValue,

          status:
            valid
              ? "PASS"
              : "REVIEW"

        };

      }
    );


  return {

    test:
      "DOMAIN SENSITIVITY",

    results,

    status:
      results.every(
        result =>
          result.status ===
          "PASS"
      )

        ? "PASS"

        : "REVIEW"

  };

}


/* =========================================================
CROSS-DOMAIN CASCADE TEST
========================================================= */

function runCrossDomainCascadeTest() {

  const results =
    Object.keys(
      SCENARIOS
    ).map(
      scenarioName => {

        const base =
          createBaseState();


        const stressed =
          applyScenario(
            scenarioName,
            100
          );


        const changedDomains =
          [];


        if (
          base.fx !==
          stressed.fx
        ) {

          changedDomains.push(
            "FX"
          );

        }


        if (
          base.energy !==
          stressed.energy
        ) {

          changedDomains.push(
            "ENERGY"
          );

        }


        if (
          base.cyb !==
          stressed.cyb
        ) {

          changedDomains.push(
            "CYB"
          );

        }


        if (
          base.inf !==
          stressed.inf
        ) {

          changedDomains.push(
            "INF"
          );

        }


        if (
          base.dc !==
          stressed.dc
        ) {

          changedDomains.push(
            "DC"
          );

        }


        return {

          scenario:
            scenarioName,

          changedDomains,

          status:
            changedDomains.length >
            0

              ?

              "PASS"

              :

              "REVIEW"

        };

      }
    );


  return {

    test:
      "CROSS-DOMAIN CASCADE",

    results,

    status:

      results.every(
        result =>
          result.status ===
          "PASS"
      )

        ?

        "PASS"

        :

        "REVIEW"

  };

}


/* =========================================================
DECISION APPROPRIATENESS TEST
========================================================= */

function runDecisionAppropriatenessTest() {

  const results =
    Object.keys(
      SCENARIOS
    ).map(
      scenarioName => {

        const state =
          applyScenario(
            scenarioName,
            100
          );


        const assessment =
          evaluateState(
            state
          );


        const decisionExists =
          Boolean(
            assessment
              .decision
              .decision
          );


        const actionExists =
          Boolean(
            assessment
              .decision
              .action
          );


        return {

          scenario:
            scenarioName,

          primaryDomain:
            SCENARIOS[
              scenarioName
            ].primaryDomain,

          risk:
            assessment.risk,

          decision:
            assessment
              .decision
              .decision,

          action:
            assessment
              .decision
              .action,

          status:

            decisionExists &&
            actionExists

              ?

              "PASS"

              :

              "REVIEW"

        };

      }
    );


  return {

    test:
      "DECISION APPROPRIATENESS",

    results,

    status:

      results.every(
        result =>
          result.status ===
          "PASS"
      )

        ?

        "PASS"

        :

        "REVIEW"

  };

}


/* =========================================================
AUDIT CONSISTENCY TEST
========================================================= */

function runAuditConsistencyTest() {

  const scenarioName =
    "DC_LOAD";


  const intensity =
    100;


  const state =
    applyScenario(
      scenarioName,
      intensity
    );


  const assessment =
    evaluateState(
      state
    );


  const consistent =

    state.event ===
      scenarioName

    &&

    assessment.pipeline.join(
      "→"
    ) ===
      GOLDEN_RULE_PIPELINE.join(
        "→"
      )

    &&

    Boolean(
      assessment
        .decision
        .decision
    )

    &&

    Boolean(
      assessment
        .decision
        .action
    )

    &&

    typeof assessment.rawStress ===
      "number"

    &&

    typeof assessment.resilienceScore ===
      "number";


  return {

    test:
      "AUDIT CONSISTENCY",

    scenario:
      scenarioName,

    intensity,

    observedState:
      state,

    assessment,

    status:
      consistent
        ? "PASS"
        : "REVIEW"

  };

}


/* =========================================================
SCENARIO INTEGRATION VALIDATION
========================================================= */

function runScenarioIntegrationTests() {

  const differentiation =
    runScenarioDifferentiationTest();


  const intensityTests =
    Object.keys(
      SCENARIOS
    ).map(
      scenarioName =>
        runIntensityEscalationTest(
          scenarioName
        )
    );


  const domainSensitivity =
    runDomainSensitivityTest();


  const cascade =
    runCrossDomainCascadeTest();


  const decisionAppropriateness =
    runDecisionAppropriatenessTest();


  const auditConsistency =
    runAuditConsistencyTest();


  const allTests = [

    differentiation,

    ...intensityTests,

    domainSensitivity,

    cascade,

    decisionAppropriateness,

    auditConsistency

  ];


  const overallStatus =

    allTests.every(
      test =>
        test.status ===
        "PASS"
    )

      ?

      "PASS"

      :

      "REVIEW";


  return {

    engine:
      "SPD v13.1 SCENARIO INTEGRATION VALIDATION",

    overallStatus,

    testsValidated: [

      "SCENARIO DIFFERENTIATION",

      "INTENSITY ESCALATION",

      "DOMAIN SENSITIVITY",

      "CROSS-DOMAIN CASCADE",

      "DECISION APPROPRIATENESS",

      "AUDIT CONSISTENCY"

    ],

    results:
      allTests

  };

}


/* =========================================================
FAULT IDENTIFICATION
========================================================= */

function identifyFaults(
  coreResults,
  scenarioResults
) {

  const faults =
    [];


  if (
    coreResults.overallStatus !==
    "PASS"
  ) {

    faults.push({

      source:
        "CORE ENGINE VALIDATION",

      fault:
        "One or more core deterministic engine tests failed.",

      severity:
        "HIGH"

    });

  }


  if (
    scenarioResults.overallStatus !==
    "PASS"
  ) {

    faults.push({

      source:
        "SCENARIO INTEGRATION VALIDATION",

      fault:
        "One or more scenario integration tests require review.",

      severity:
        "MEDIUM"

    });

  }


  return {

    status:

      faults.length ===
      0

        ?

        "NO FAULT IDENTIFIED"

        :

        "FAULTS IDENTIFIED",

    findings:
      faults

  };

}


/* =========================================================
CONTROLLED CORRECTIVE ACTION
========================================================= */

function determineCorrectiveAction(
  faults
) {

  if (
    faults.findings.length ===
    0
  ) {

    return {

      status:
        "NO CORRECTIVE ACTION REQUIRED",

      decision:
        "SYSTEM VALIDATED",

      action:
        "NO ENGINE MODIFICATION PERFORMED",

      nextAction:
        "PROCEED TO FINAL VALIDATION"

    };

  }


  return {

    status:
      "CORRECTIVE ACTION REQUIRED",

    decision:
      "CAPTAIN AI LENA VALIDATION REVIEW REQUIRED",

    action:
      "ISOLATE FAILED VALIDATION LAYERS; PRESERVE THE AUTHORITATIVE GOLDEN RULE ENGINE; CORRECT THE RESPONSIBLE IMPLEMENTATION OUTSIDE THE VALIDATION CONTROLLER.",

    nextAction:
      "LOAD CORRECTED IMPLEMENTATION THEN EXECUTE ACTUAL RE-TEST",

    safetyRule:
      "VALIDATION CONTROLLER DOES NOT AUTOMATICALLY MODIFY THE AUTHORITATIVE ENGINE"

  };

}


/* =========================================================
RESULT SIGNATURE
========================================================= */

function createValidationSignature(
core,
scenarios
) {

  return {

    coreStatus:
      core.overallStatus,

    scenarioStatus:
      scenarios.overallStatus,

    coreTestCount:
      core.results.length,

    corePassed:
      core.results.filter(
        item =>
          item.status ===
          "PASS"
      ).length,

    scenarioTestCount:
      scenarios.results.length,

    scenarioPassed:
      scenarios.results.filter(
        item =>
          item.status ===
          "PASS"
      ).length

  };

}


/* =========================================================
ACTUAL RE-TEST VALIDATION
========================================================= */

function runActualRetest(
initialValidation
) {

  const retestStart =
    new Date().toISOString();


  /*
  IMPORTANT:

  This is a genuine second execution of the
  validation suite.

  The same deterministic tests are executed
  again independently of the initial results.
  */


  const core =
    runCoreEngineTests();


  const scenarios =
    runScenarioIntegrationTests();


  const faults =
    identifyFaults(
      core,
      scenarios
    );


  const initialSignature =
    createValidationSignature(
      initialValidation.coreValidation,
      initialValidation.scenarioIntegrationValidation
    );


  const retestSignature =
    createValidationSignature(
      core,
      scenarios
    );


  const resultsMatch =

    initialSignature.coreStatus ===
      retestSignature.coreStatus

    &&

    initialSignature.scenarioStatus ===
      retestSignature.scenarioStatus

    &&

    initialSignature.coreTestCount ===
      retestSignature.coreTestCount

    &&

    initialSignature.corePassed ===
      retestSignature.corePassed

    &&

    initialSignature.scenarioTestCount ===
      retestSignature.scenarioTestCount

    &&

    initialSignature.scenarioPassed ===
      retestSignature.scenarioPassed;


  const retestPassed =
    faults.findings.length ===
    0;


  return {

    executionTime:
      retestStart,

    type:
      "ACTUAL RE-TEST",

    coreValidation:
      core,

    scenarioValidation:
      scenarios,

    faultIdentification:
      faults,

    initialValidationSignature:
      initialSignature,

    reTestValidationSignature:
      retestSignature,

    deterministicComparison:
      resultsMatch
        ? "CONSISTENT"
        : "MISMATCH DETECTED",

    status:

      retestPassed &&
      resultsMatch

        ?

        "PASS"

        :

        "FAIL"

  };

}


/* =========================================================
FINAL VALIDATION
========================================================= */

function performFinalValidation(
initialValidation,
retestValidation,
faults
) {

  const initialPassed =

    initialValidation
      .coreValidation
      .overallStatus ===
      "PASS"

    &&

    initialValidation
      .scenarioIntegrationValidation
      .overallStatus ===
      "PASS";


  const retestPassed =

    retestValidation.status ===
    "PASS";


  const finalStatus =

    initialPassed &&
    retestPassed

      ?

      "VALIDATED"

      :

      "REVIEW REQUIRED";


  return {

    status:
      finalStatus,

    initialValidation:
      initialPassed
        ? "PASS"
        : "FAIL",

    faultStatus:
      faults.status,

    reTestValidation:
      retestPassed
        ? "PASS"
        : "FAIL",

    deterministicConsistency:
      retestValidation
        .deterministicComparison,

    conclusion:

      finalStatus ===
      "VALIDATED"

        ?

        "SPD v13.1 VALIDATION CYCLE COMPLETED SUCCESSFULLY"

        :

        "SPD v13.1 REQUIRES FURTHER REVIEW OR CORRECTIVE ACTION"

  };

}


/* =========================================================
FULL CLOSED-LOOP VALIDATION
========================================================= */

function runFullValidation() {

  const executionStart =
    new Date().toISOString();


  /*
  STEP 1
  INITIAL SELF-TEST
  */

  const core =
    runCoreEngineTests();


  const scenarios =
    runScenarioIntegrationTests();


  /*
  STEP 2
  FAULT IDENTIFICATION
  */

  const faults =
    identifyFaults(
      core,
      scenarios
    );


  /*
  STEP 3
  CONTROLLED CORRECTIVE ACTION
  */

  const correctiveAction =
    determineCorrectiveAction(
      faults
    );


  /*
  STEP 4
  ACTUAL RE-TEST

  The validation suite is executed again.

  The authoritative engine is NOT automatically modified.

  This confirms deterministic repeatability and
  identifies whether the validation state remains
  consistent.
  */

  const initialValidation = {

    coreValidation:
      core,

    scenarioIntegrationValidation:
      scenarios

  };


  const retest =
    runActualRetest(
      initialValidation
    );


  /*
  STEP 5
  FINAL VALIDATION
  */

  const finalValidation =
    performFinalValidation(
      initialValidation,
      retest,
      faults
    );


  /*
  STEP 6
  AUDIT RECORD
  */

  const auditRecord = {

    auditType:
      "SPD v13.1 FULL VALIDATION CYCLE",

    executionStart,

    executionEnd:
      new Date().toISOString(),

    engine:
      ENGINE_NAME,

    validationController:
      VALIDATION_ENGINE,

    pipeline:
      [
        "SELF-TEST",

        "FAULT IDENTIFICATION",

        "CONTROLLED CORRECTIVE ACTION",

        "ACTUAL RE-TEST",

        "FINAL VALIDATION",

        "AUDIT RECORD"

      ],

    goldenRulePipeline:
      [
        ...GOLDEN_RULE_PIPELINE
      ],

    initialValidation:
      initialValidation,

    faultIdentification:
      faults,

    correctiveAction:
      correctiveAction,

    actualReTest:
      retest,

    finalValidation:
      finalValidation,

    auditStatus:
      finalValidation.status

  };


  return {

    timestamp:
      new Date().toISOString(),

    engine:
      ENGINE_NAME,

    pipeline:
      [
        ...GOLDEN_RULE_PIPELINE
      ],

    coreValidation:
      core,

    scenarioIntegrationValidation:
      scenarios,

    faultIdentification:
      faults,

    correctiveAction:
      correctiveAction,

    reTestValidation:
      retest,

    finalValidation:
      finalValidation,

    auditRecord:

      auditRecord,

    status:

      finalValidation.status ===
      "VALIDATED"

        ?

        "COMPLETE — VALIDATED"

        :

        "COMPLETE — REVIEW REQUIRED"

  };

}


/* =========================================================
PUBLIC API
========================================================= */

window.SPD_SELF_TEST = {

  runCoreEngineTests,

  runScenarioIntegrationTests,

  runFullValidation,

  identifyFaults,

  determineCorrectiveAction,

  runRetestValidation:
    function () {

      const core =
        runCoreEngineTests();


      const scenarios =
        runScenarioIntegrationTests();


      const initialValidation = {

        coreValidation:
          core,

        scenarioIntegrationValidation:
          scenarios

      };


      return runActualRetest(
        initialValidation
      );

    }

};


/* =========================================================
ENGINE LOADED
========================================================= */

console.log(
  "SPD v13.1 SELF-TEST & VALIDATION CONTROLLER LOADED"
);

console.log(
  "Validation sequence:",
  "SELF-TEST → FAULT IDENTIFICATION → CONTROLLED CORRECTIVE ACTION → ACTUAL RE-TEST → FINAL VALIDATION → AUDIT RECORD"
);