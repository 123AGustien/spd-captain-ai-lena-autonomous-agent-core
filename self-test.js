/*
===========================================================
SPD v13.1 — SEXTANT RESILIENCE PROTOCOL
SELF-TEST & VALIDATION ENGINE
===========================================================

Purpose:
- Validate core deterministic engine behaviour
- Validate scenario differentiation
- Validate scenario intensity escalation
- Validate domain sensitivity
- Validate cross-domain cascade behaviour
- Validate decision appropriateness
- Validate audit consistency
- Identify faults
- Recommend corrective action
- Perform re-test validation

Architecture:

CORE ENGINE VALIDATION
        ↓
SCENARIO INTEGRATION VALIDATION
        ↓
FAULT IDENTIFICATION
        ↓
CAPTAIN AI LENA CORRECTIVE ACTION
        ↓
RE-TEST VALIDATION

Golden Rule:

OBSERVE
→ VERIFY
→ ASSESS
→ DECIDE
→ ACT
→ UPDATE
===========================================================
*/


/* =========================================================
   SYSTEM CONSTANTS
========================================================= */

const PHI = 1.618033988749895;

const GOLDEN_RULE_PIPELINE = [
  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"
];


/* =========================================================
   BASIC ENGINE FUNCTIONS
========================================================= */

/*
  Stress calculation.

  This is a deterministic validation model.
  The purpose of this standalone self-test is to verify
  system behaviour independently of the cockpit UI.
*/

function calculateRawStress(state) {

  const fxStress = state.fx * 0.20;

  const energyStress = (100 - state.energy) * 0.20;

  const cyberStress = state.cyb * 0.20;

  const infrastructureStress = state.inf * 0.15;

  const dataCentreStress = state.dc * 0.15;

  const eventStress = state.eventStress || 0;

  return (
    fxStress +
    energyStress +
    cyberStress +
    infrastructureStress +
    dataCentreStress +
    eventStress
  );
}


/*
  Golden score.
*/

function calculateGoldenScore(rawStress) {

  return rawStress * (1 / PHI);

}


/*
  Resilience score.
*/

function calculateResilienceScore(goldenScore) {

  return Math.max(
    0,
    100 - goldenScore
  );

}


/*
  Risk classification.

  Thresholds are intentionally explicit so that
  external evaluators can inspect deterministic logic.
*/

function classifyRisk(goldenScore) {

  if (goldenScore < 30) {

    return "LOW";

  }

  if (goldenScore < 50) {

    return "MEDIUM";

  }

  return "HIGH";

}


/*
  Decision engine.
*/

function determineDecision(risk, state) {

  if (risk === "LOW") {

    if (state.energy < 35) {

      return {
        decision: "ENERGY PROTECTION MODE",
        action:
          "REDUCE SYSTEM LOAD AND PRESERVE ENERGY RESERVES"
      };

    }

    return {
      decision: "SYSTEM STABLE",
      action:
        "CONTINUE MONITORING"
    };

  }


  if (risk === "MEDIUM") {

    return {
      decision: "PREVENTIVE RESILIENCE MODE",
      action:
        "APPLY PREVENTIVE MITIGATION AND MONITOR CASCADE RISK"
    };

  }


  return {
    decision: "ACTIVATE STABILIZATION MODE",
    action:
      "ISOLATE AFFECTED DOMAINS AND ACTIVATE SYSTEM STABILIZATION"
  };

}


/* =========================================================
   SCENARIO DEFINITIONS
========================================================= */

const SCENARIOS = {

  FX_STRESS: {

    primaryDomain: "FX",

    description:
      "Foreign exchange and economic stress event",

    impact: {
      fx: 1.0,
      energy: 0.20
    },

    eventStress: 10

  },


  DC_LOAD: {

    primaryDomain: "DC",

    description:
      "Data centre load and energy demand event",

    impact: {
      dc: 1.0,
      energy: 0.30
    },

    eventStress: 10

  },


  CYBER_EVENT: {

    primaryDomain: "CYB",

    description:
      "Cybersecurity disruption event",

    impact: {
      cyb: 1.0,
      dc: 0.10,
      energy: 0.10
    },

    eventStress: 10

  },


  INFRA_STRAIN: {

    primaryDomain: "INF",

    description:
      "Infrastructure resilience stress event",

    impact: {
      inf: 1.0,
      dc: 0.20,
      energy: 0.10
    },

    eventStress: 10

  },


  BIODIESEL_SHORTAGE: {

    primaryDomain: "ENERGY",

    description:
      "Biodiesel and fuel supply shortage",

    impact: {
      energy: 1.0,
      fx: 0.10
    },

    eventStress: 10

  }

};


/* =========================================================
   BASE STATE
========================================================= */

function createBaseState() {

  return {

    fx: 0,

    energy: 80,

    cyb: 10,

    inf: 5,

    dc: 5,

    event: "NORMAL",

    eventStress: 0,

    mode: "AUTONOMOUS"

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
    SCENARIOS[scenarioName];

  const state =
    createBaseState();

  if (!scenario) {

    return state;

  }


  const factor =
    intensity / 100;


  state.event =
    scenarioName;


  state.eventStress =
    scenario.eventStress * factor;


  /*
    Primary and secondary domain impacts.
  */

  Object.keys(
    scenario.impact
  ).forEach(domain => {

    const impact =
      scenario.impact[domain] *
      factor *
      100;


    if (domain === "fx") {

      state.fx =
        Math.min(
          100,
          state.fx + impact
        );

    }


    if (domain === "energy") {

      state.energy =
        Math.max(
          