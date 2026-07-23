/**
 * ============================================================
 * SPD v13.1 — FIN SCENARIO RULE BRIDGE
 * ============================================================
 *
 * File:
 * FIN/fin-scenario-rule-bridge.js
 *
 * Purpose:
 * Connects the SPD v13.1 cockpit scenario layer with the
 * FIN scenario interpretation and rule layer.
 *
 * FLOW:
 *
 * COCKPIT SCENARIO
 *       ↓
 * SCENARIO NORMALIZATION
 *       ↓
 * FIN RULE BRIDGE
 *       ↓
 * SCENARIO INTERPRETATION
 *       ↓
 * GOLDEN RULE ENGINE
 *       ↓
 * CAPTAIN AI LENA DECISION
 *       ↓
 * ACTION / AUDIT
 *
 * This bridge does NOT override the authoritative Golden Rule
 * Engine or Captain AI Lena safety hierarchy.
 *
 * It provides deterministic scenario identification,
 * normalization, FIN rule context, and audit information.
 *
 * Supported cockpit scenarios:
 *
 * FX_SHOCK
 * DC_LOAD
 * CYBER_EVENT
 * INFRASTRUCTURE_STRESS
 * BIODIESEL_SHORTAGE
 * NORMAL
 *
 * Normalized scenario types:
 *
 * FX_SHOCK
 * ENERGY_CRISIS
 * CYBER_ATTACK
 * INFRA_FAILURE
 * NORMAL
 *
 * ============================================================
 */


/**
 * ============================================================
 * SCENARIO DEFINITIONS
 * ============================================================
 */

export const FIN_SCENARIO_RULES = {

  NORMAL: {

    type: "NORMAL",

    name: "NORMAL OPERATIONS",

    domain: "SYSTEM",

    ruleId: "NONE",

    description:
      "No active financial or systemic stress scenario.",

    impact:
      "System operating within normal parameters."

  },


  FX_SHOCK: {

    type: "FX_SHOCK",

    name: "FOREIGN EXCHANGE SHOCK",

    domain: "FIN",

    ruleId: "FIN-001",

    description:
      "Rapid deterioration in foreign exchange stability.",

    impact:
      "Foreign exchange pressure may propagate into connected financial and systemic domains."

  },


  ENERGY_CRISIS: {

    type: "ENERGY_CRISIS",

    name: "ENERGY CRISIS",

    domain: "ENG",

    ruleId: "ENG-001",

    description:
      "Available energy reserves are under significant pressure.",

    impact:
      "System load reduction and energy preservation may be required."

  },


  CYBER_ATTACK: {

    type: "CYBER_ATTACK",

    name: "CYBER ATTACK",

    domain: "CYB",

    ruleId: "CYB-001",

    description:
      "Cybersecurity conditions indicate an active or simulated attack.",

    impact:
      "System integrity and defensive controls require protection."

  },


  INFRA_FAILURE: {

    type: "INFRA_FAILURE",

    name: "INFRASTRUCTURE FAILURE",

    domain: "INF",

    ruleId: "INF-001",

    description:
      "Critical infrastructure is experiencing operational stress.",

    impact:
      "Recovery and stabilization measures may be required."

  }

};


/**
 * ============================================================
 * COCKPIT SCENARIO NORMALIZATION
 * ============================================================
 *
 * Converts cockpit scenario identifiers into authoritative
 * scenario types understood by the FIN bridge.
 *
 * This prevents naming differences between the UI and the
 * rule interpretation layer from breaking the pipeline.
 * ============================================================
 */

export const SCENARIO_ALIASES = {

  NORMAL:
    "NORMAL",

  FX_SHOCK:
    "FX_SHOCK",

  FX_STRESS:
    "FX_SHOCK",

  DC_LOAD:
    "ENERGY_CRISIS",

  DATA_CENTRE_LOAD:
    "ENERGY_CRISIS",

  CYBER_EVENT:
    "CYBER_ATTACK",

  CYBER_ATTACK:
    "CYBER_ATTACK",

  INFRASTRUCTURE_STRESS:
    "INFRA_FAILURE",

  INFRA_STRAIN:
    "INFRA_FAILURE",

  INFRA_FAILURE:
    "INFRA_FAILURE",

  BIODIESEL_SHORTAGE:
    "ENERGY_CRISIS",

  ENERGY_CRISIS:
    "ENERGY_CRISIS"

};


/**
 * ============================================================
 * NORMALIZE SCENARIO
 * ============================================================
 */

export function normalizeScenario(
  scenario = "NORMAL"
) {

  const normalizedInput =
    String(scenario)
      .trim()
      .toUpperCase();


  return (
    SCENARIO_ALIASES[
      normalizedInput
    ] ??
    "NORMAL"
  );

}


/**
 * ============================================================
 * GET SCENARIO DEFINITION
 * ============================================================
 */

export function getFINScenarioDefinition(
  scenario = "NORMAL"
) {

  const normalizedScenario =
    normalizeScenario(
      scenario
    );


  return (
    FIN_SCENARIO_RULES[
      normalizedScenario
    ] ??
    FIN_SCENARIO_RULES.NORMAL
  );

}


/**
 * ============================================================
 * FIN RULE RESPONSE
 * ============================================================
 *
 * Returns deterministic guidance for the active scenario.
 *
 * This is guidance only.
 *
 * Final decision authority remains with the Golden Rule Engine
 * and Captain AI Lena decision hierarchy.
 * ============================================================
 */

export function getFINRuleResponse(
  scenario = "NORMAL"
) {

  const definition =
    getFINScenarioDefinition(
      scenario
    );


  switch (
    definition.type
  ) {

    case "FX_SHOCK":

      return {

        mode:
          "FX RESILIENCE MODE",

        response:
          "MONITOR FX PRESSURE → VERIFY FINANCIAL EXPOSURE → PROTECT LIQUIDITY → ASSESS CASCADE RISK",

        priority:
          "FINANCIAL STABILITY"

      };


    case "ENERGY_CRISIS":

      return {

        mode:
          "ENERGY RESERVE MODE",

        response:
          "MONITOR ENERGY RESERVES → REDUCE NON-CRITICAL LOAD → PRESERVE CRITICAL CAPACITY → ASSESS CASCADE RISK",

        priority:
          "ENERGY RESILIENCE"

      };


    case "CYBER_ATTACK":

      return {

        mode:
          "CYBER DEFENSE MODE",

        response:
          "VERIFY EVENT → PROTECT SYSTEM INTEGRITY → ISOLATE COMPROMISED PATHS → MAINTAIN SAFE OPERATIONS",

        priority:
          "SYSTEM INTEGRITY"

      };


    case "INFRA_FAILURE":

      return {

        mode:
          "INFRASTRUCTURE RECOVERY MODE",

        response:
          "IDENTIFY FAILED INFRASTRUCTURE → PROTECT CRITICAL SERVICES → ISOLATE FAILURE → RESTORE RESILIENCE",

        priority:
          "INFRASTRUCTURE STABILITY"

      };


    default:

      return {

        mode:
          "NORMAL OPERATIONS",

        response:
          "CONTINUE MONITORING",

        priority:
          "SYSTEM STABILITY"

      };

  }

}


/**
 * ============================================================
 * BUILD FIN SCENARIO RULE BRIDGE
 * ============================================================
 */

export function buildFINScenarioRuleBridge(
  state = {}
) {

  const sourceScenario =
    state.event ??
    state.scenario ??
    "NORMAL";


  const normalizedScenario =
    normalizeScenario(
      sourceScenario
    );


  const definition =
    getFINScenarioDefinition(
      normalizedScenario
    );


  const ruleResponse =
    getFINRuleResponse(
      normalizedScenario
    );


  return {

    bridge:

      "SPD v13.1 FIN SCENARIO RULE BRIDGE",

    status:
      "SCENARIO BRIDGE ACTIVE",

    sourceScenario:
      sourceScenario,

    normalizedScenario:
      normalizedScenario,

    scenario:

      {

        type:
          definition.type,

        name:
          definition.name,

        domain:
          definition.domain,

        ruleId:
          definition.ruleId,

        description:
          definition.description,

        impact:
          definition.impact

      },

    ruleResponse:

      {

        mode:
          ruleResponse.mode,

        response:
          ruleResponse.response,

        priority:
          ruleResponse.priority

      },

    systemSnapshot:

      {

        fx:
          Number(
            state.fx ??
            0
          ),

        energy:
          Number(
            state.energy ??
            50
          ),

        cyb:
          Number(
            state.cyb ??
            0
          ),

        inf:
          Number(
            state.inf ??
            0
          ),

        dc:
          Number(
            state.dc ??
            0
          )

      },

    authority:
      "GOLDEN RULE ENGINE / CAPTAIN AI LENA",

    override:
      false,

    finalDecisionAuthority:
      "CAPTAIN AI LENA",

    timestamp:
      state.time ??
      new Date().toISOString()

  };

}


/**
 * ============================================================
 * VALIDATE FIN SCENARIO BRIDGE
 * ============================================================
 */

export function validateFINScenarioBridge(
  state = {}
) {

  const bridge =
    buildFINScenarioRuleBridge(
      state
    );


  const valid =
    Boolean(
      bridge.scenario.type
    ) &&

    Boolean(
      bridge.scenario.name
    ) &&

    Boolean(
      bridge.scenario.domain
    );


  return {

    status:
      valid
        ? "PASS"
        : "FAIL",

    bridgeValid:
      valid,

    scenario:
      bridge.normalizedScenario,

    ruleId:
      bridge.scenario.ruleId,

    authority:
      bridge.authority,

    override:
      bridge.override,

    timestamp:
      new Date().toISOString()

  };

}


/**
 * ============================================================
 * AUTHORITATIVE BRIDGE ENTRY POINT
 * ============================================================
 *
 * This function is intended to be called by the cockpit before
 * the Golden Rule Engine executes its authoritative evaluation.
 * ============================================================
 */

export function evaluateFINScenario(
  state = {}
) {

  const bridge =
    buildFINScenarioRuleBridge(
      state
    );


  const validation =
    validateFINScenarioBridge(
      state
    );


  return {

    ...bridge,

    validation:

      {

        status:
          validation.status,

        bridgeValid:
          validation.bridgeValid

      },

    pipeline:

      [

        "SCENARIO IDENTIFIED",

        "SCENARIO NORMALIZED",

        "FIN RULE CONTEXT ATTACHED",

        "GOLDEN RULE ENGINE EVALUATION REQUIRED",

        "CAPTAIN AI LENA DECISION AUTHORITY PRESERVED"

      ]

  };

}


/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {

  FIN_SCENARIO_RULES,

  SCENARIO_ALIASES,

  normalizeScenario,

  getFINScenarioDefinition,

  getFINRuleResponse,

  buildFINScenarioRuleBridge,

  validateFINScenarioBridge,

  evaluateFINScenario

};