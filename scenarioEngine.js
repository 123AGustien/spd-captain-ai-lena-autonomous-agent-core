/**
 * ============================================================
 * SPD V13 — SCENARIO ENGINE
 * ============================================================
 *
 * Deterministic scenario interpretation layer.
 *
 * DATA → SCENARIO → RESPONSE
 *
 * The scenario engine does not directly override the core
 * safety hierarchy. It identifies the active scenario so that
 * Captain AI Lena can evaluate the appropriate response.
 *
 * Supported scenarios:
 * FX_SHOCK
 * ENERGY_CRISIS
 * CYBER_ATTACK
 * INFRA_FAILURE
 * NORMAL
 * ============================================================
 */


/**
 * ============================================================
 * SCENARIO DEFINITIONS
 * ============================================================
 */

export const scenarios = {

  NORMAL: {
    type: "NORMAL",
    name: "NORMAL OPERATIONS",
    description: "No active system stress scenario.",
    impact: "System operating within normal parameters."
  },

  FX_SHOCK: {
    type: "FX_SHOCK",
    name: "FOREIGN EXCHANGE SHOCK",
    description: "Rapid deterioration in foreign exchange stability.",
    impact: "Economic pressure may propagate into connected systems."
  },

  ENERGY_CRISIS: {
    type: "ENERGY_CRISIS",
    name: "ENERGY CRISIS",
    description: "Available energy reserves are under significant pressure.",
    impact: "System load reduction and energy preservation may be required."
  },

  CYBER_ATTACK: {
    type: "CYBER_ATTACK",
    name: "CYBER ATTACK",
    description: "Cybersecurity conditions indicate an active or simulated attack.",
    impact: "System integrity and defensive controls require protection."
  },

  INFRA_FAILURE: {
    type: "INFRA_FAILURE",
    name: "INFRASTRUCTURE FAILURE",
    description: "Critical infrastructure is experiencing operational stress.",
    impact: "Recovery and stabilization measures may be required."
  }

};


/**
 * ============================================================
 * MAIN SCENARIO ENGINE
 * ============================================================
 *
 * Converts an event identifier into a deterministic scenario
 * object.
 *
 * Unknown events safely return NORMAL.
 * ============================================================
 */

export function scenarioEngine(event = "NORMAL") {

  const normalizedEvent = String(event)
    .trim()
    .toUpperCase();

  return (
    scenarios[normalizedEvent] ??
    scenarios.NORMAL
  );

}


/**
 * ============================================================
 * SCENARIO DECISION HELPER
 * ============================================================
 *
 * Returns the recommended scenario response.
 *
 * Final safety priority remains with Captain AI Lena.
 * ============================================================
 */

export function getScenarioResponse(scenario) {

  const type =
    typeof scenario === "string"
      ? scenario
      : scenario?.type;

  switch (type) {

    case "FX_SHOCK":
      return "FX SHOCK RESPONSE ACTIVE";

    case "ENERGY_CRISIS":
      return "ENERGY RESERVE MODE ACTIVE";

    case "CYBER_ATTACK":
      return "CYBER DEFENSE MODE ACTIVE";

    case "INFRA_FAILURE":
      return "INFRASTRUCTURE RECOVERY MODE";

    default:
      return "NO SCENARIO RESPONSE REQUIRED";

  }

}


/**
 * ============================================================
 * SAFE SCENARIO SNAPSHOT
 * ============================================================
 */

export function safeScenarioSnapshot(state = {}) {

  return {

    fx: Number(state.fx ?? 0),

    energy: Number(state.energy ?? 50),

    cyb: Number(state.cyb ?? 50),

    inf: Number(state.inf ?? 0),

    dc: Number(state.dc ?? 0),

    event: state.event ?? "NORMAL"

  };

}


/**
 * ============================================================
 * SCENARIO INFORMATION PACKET
 * ============================================================
 *
 * Used by cockpit and audit layers.
 * Does not alter core decision logic.
 * ============================================================
 */

export function buildScenarioPacket(state = {}) {

  const snapshot =
    safeScenarioSnapshot(state);

  const scenario =
    scenarioEngine(snapshot.event);

  return {

    scenario: {

      type: scenario.type,

      name: scenario.name,

      description: scenario.description,

      impact: scenario.impact

    },

    response:
      getScenarioResponse(scenario),

    systemSnapshot:
      snapshot,

    status: "SCENARIO EVALUATED"

  };

}