import { scenarios, energyIndex } from "./engine.js";

/**
 * SPD v12 SCENARIO ENGINE v3 (ENGINE-ALIGNED FINAL)
 * Deterministic decision + cascade interpreter
 */

/* =============================
   MAIN ENTRY
============================= */
export function buildDecisionPacket(state, activeType, risk) {

  const scenario = scenarios?.[activeType];
  const safe = safeSnapshot(state);

  // =============================
  // FALLBACK STATE
  // =============================
  if (!scenario) {
    return basePacket("NO SCENARIO", "System idle or unknown event", risk, safe);
  }

  // =============================
  // CASCADE ENGINE
  // =============================
  const cascadePressure = computeCascadePressure(safe);

  const energyPressure =
    typeof energyIndex === "function"
      ? energyIndex(safe)
      : 0;

  const cascadeInterpretation =
    Math.round((cascadePressure + energyPressure) / 10);

  // =============================
  // DECISION ENGINE (CORE RULES)
  // =============================
  let decision = resolveBaseDecision(risk);

  // =============================
  // SCENARIO OVERRIDES (SAFE GUARDS)
  // =============================
  const type = scenario.type ?? "UNKNOWN";

  if (type === "FX_SHOCK") {
    decision = "FX STABILIZATION ACTIVE";
  } else if (type === "ENERGY_CRISIS") {
    decision = "ENERGY RESERVE MODE ACTIVE";
  } else if (type === "CYBER_ATTACK") {
    decision = "CYBER DEFENSE MODE ACTIVE";
  } else if (type === "INFRA_FAILURE") {
    decision = "INFRASTRUCTURE RECOVERY MODE";
  }

  // =============================
  // OUTPUT PACKET
  // =============================
  return {
    title: scenario.name ?? "UNKNOWN SCENARIO",
    summary: scenario.description ?? "—",
    impact: scenario.impact ?? "—",

    decision,
    riskSignal: risk,

    cascadeInterpretation,
    energyIndex: energyPressure,

    systemSnapshot: safe
  };
}

/* =============================
   BASE DECISION LOGIC
============================= */
function resolveBaseDecision(risk) {

  if (risk === "CRITICAL") return "FULL OVERRIDE";
  if (risk === "HIGH") return "CRISIS CONTAINMENT";
  if (risk === "MEDIUM") return "CONTROLLED BALANCE";

  return "NORMAL OPERATIONS";
}

/* =============================
   CASCADE ENGINE
============================= */
function computeCascadePressure(s) {
  return (
    (s.fx * 1.2) +
    (s.dc * 1.1) +
    (s.cyb * 1.4) +
    (s.inf * 1.3)
  );
}

/* =============================
   SAFE SNAPSHOT
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
   FALLBACK PACKET
============================= */
function basePacket(title, summary, risk, snapshot) {
  return {
    title,
    summary,
    impact: "—",

    decision: "STANDBY",
    riskSignal: risk,

    cascadeInterpretation: 0,
    energyIndex: 0,

    systemSnapshot: snapshot
  };
}

/* =============================
   UI RENDER
============================= */
export function renderDecisionText(packet) {
  return `
▶ SPD DECISION PANEL v3

SCENARIO: ${packet.title}
SUMMARY: ${packet.summary}
IMPACT: ${packet.impact}

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