 /**
  * SPD v12 SCENARIO ENGINE v2
  * DECISION + INTERPRETATION LAYER (SAFE ARCHITECTURE)
  */

import { scenarios, energyIndex } from "./engine.js";

/* =============================
   DECISION PACKET BUILDER
============================= */
export function buildDecisionPacket(state, activeType, risk) {

  const scenario = scenarios?.[activeType];

  // =============================
  // SAFETY FALLBACK (NO SCENARIO)
  // =============================
  if (!scenario) {
    return {
      title: "NO SCENARIO",
      summary: "System idle or unknown event",
      decision: "STANDBY",
      cascadeInterpretation: 0,
      riskSignal: risk,
      systemSnapshot: safeSnapshot(state)
    };
  }

  // =============================
  // CASCADE PRESSURE ENGINE
  // =============================
  const safe = safeSnapshot(state);

  const cascadePressure =
    (safe.FX * 1.2) +
    (safe.DC * 1.1) +
    (safe.CYB * 1.4) +
    (safe.INF * 1.3);

  const energyPressure =
    typeof energyIndex === "function" ? energyIndex(state) : 0;

  const cascadeInterpretation =
    Math.round((cascadePressure + energyPressure) / 10);

  // =============================
  // DECISION LOGIC LAYER
  // =============================
  let decision = "NORMAL OPERATIONS";

  if (risk === "CRITICAL") decision = "FULL OVERRIDE";
  else if (risk === "HIGH") decision = "CRISIS CONTAINMENT";
  else if (risk === "MEDIUM") decision = "CONTROLLED BALANCE";

  // scenario override layer
  if (activeType === "FX_SHOCK") {
    decision = "FX STABILIZATION ACTIVE";
  }

  if (activeType === "ENERGY_CRISIS") {
    decision = "ENERGY RESERVE MODE ACTIVE";
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
    FX: state.FX ?? 0,
    DC: state.DC ?? 0,
    CYB: state.CYB ?? 0,
    INF: state.INF ?? 0
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
FX=${packet.systemSnapshot.FX}
DC=${packet.systemSnapshot.DC}
CYB=${packet.systemSnapshot.CYB}
INF=${packet.systemSnapshot.INF}
  `;
}