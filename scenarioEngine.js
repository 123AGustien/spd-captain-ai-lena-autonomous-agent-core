import { scenarios, energyIndex } from "./engine.js";

/**
 * SPD v12 SCENARIO ENGINE v2
 * DECISION + INTERPRETATION LAYER (ENGINE-ALIGNED)
 */

/* =============================
   DECISION PACKET BUILDER
============================= */
export function buildDecisionPacket(state, activeType, risk) {

  const scenario = scenarios?.[activeType];

  // =============================
  // SAFE SNAPSHOT
  // =============================
  const safe = safeSnapshot(state);

  // =============================
  // FALLBACK (NO SCENARIO)
  // =============================
  if (!scenario) {
    return {
      title: "NO SCENARIO",
      summary: "System idle or unknown event",
      decision: "STANDBY",
      cascadeInterpretation: 0,
      riskSignal: risk,
      systemSnapshot: safe
    };
  }

  // =============================
  // CASCADE ENGINE
  // =============================
  const cascadePressure =
    (safe.fx * 1.2) +
    (safe.dc * 1.1) +
    (safe.cyb * 1.4) +
    (safe.inf * 1.3);

  const energyPressure =
    typeof energyIndex === "function"
      ? energyIndex(state)
      : 0;

  const cascadeInterpretation =
    Math.round((cascadePressure + energyPressure) / 10);

  // =============================
  // DECISION LAYER (PURE RULES)
  // =============================
  let decision = "NORMAL OPERATIONS";

  if (risk === "CRITICAL") {
    decision = "FULL OVERRIDE";
  } else if (risk === "HIGH") {
    decision = "CRISIS CONTAINMENT";
  } else if (risk === "MEDIUM") {
    decision = "CONTROLLED BALANCE";
  }

  // =============================
  // SCENARIO OVERRIDE (SAFE ONLY)
  // =============================
  if (scenario.type === "FX_SHOCK") {
    decision = "FX STABILIZATION ACTIVE";
  }

  if (scenario.type === "ENERGY_CRISIS") {
    decision = "ENERGY RESERVE MODE ACTIVE";
  }

  if (scenario.type === "CYBER_ATTACK") {
    decision = "CYBER DEFENSE MODE ACTIVE";
  }

  if (scenario.type === "INFRA_FAILURE") {
    decision = "INFRASTRUCTURE RECOVERY MODE";
  }

  // =============================
  // OUTPUT PACKET
  // =============================
  return {
    title: scenario.name,
    summary: scenario.description,
    impact: scenario.impact,

    decision,
    riskSignal: risk,

    cascadeInterpretation,
    energyIndex: energyPressure,

    systemSnapshot: safe
  };
}

/* =============================
   SAFE SNAPSHOT BUILDER
============================= */
function safeSnapshot(state = {}) {
  return {
    fx: state.fx ?? 0,
    dc: state.dc ?? 0,
    cyb: state.cyb ?? 0,
    inf: state.inf ?? 0
  };
}

/* =============================
   HUMAN READABLE OUTPUT
============================= */
export function renderDecisionText(packet) {
  return `
▶ SPD DECISION PANEL v2

SCENARIO: ${packet.title}
SUMMARY: ${packet.summary}
IMPACT: ${packet.impact || "—"}

RISK: ${packet.riskSignal}
DECISION: ${packet.decision}

CASCADE INDEX: ${packet.cascadeInterpretation}
ENERGY INDEX: ${packet.energyIndex}

SYSTEM SNAPSHOT:
FX=${packet.systemSnapshot.fx}
DC=${packet.systemSnapshot.dc}
CYB=${packet.systemSnapshot.cyb}
INF=${packet.systemSnapshot.inf}
  `;
}