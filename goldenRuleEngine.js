/**
 * SPD v13 — SEXTANT GOLDEN RULE ENGINE
 * -------------------------------------
 * Authoritative deterministic assessment pipeline.
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Architecture:
 * DATA → ALGORITHMS → COMPUTE
 *
 * This module does not replace the SPD backend.
 * It provides the deterministic Golden Rule calculation
 * used by Captain AI Lena to assess system resilience.
 *
 * Backend remains the source of truth.
 */

// ============================================================
// SYSTEM CONSTANTS
// ============================================================

export const PHI = (1 + Math.sqrt(5)) / 2;

// ============================================================
// GOLDEN RULE STAGES
// ============================================================

export const GOLDEN_RULE_STAGES = [
  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"
];

// ============================================================
// 1. OBSERVE
// Capture the current system state.
// No decision logic is applied here.
// ============================================================

export function observe(systemState = {}) {
  return {
    fx: Number(systemState.fx ?? 0),
    energy: Number(systemState.energy ?? 100),
    cyb: Number(systemState.cyb ?? 0),
    inf: Number(systemState.inf ?? 0),
    dc: Number(systemState.dc ?? 0),
    event: systemState.event ?? "NORMAL",
    time: systemState.time ?? new Date().toISOString(),
    mode: systemState.mode ?? "AUTONOMOUS"
  };
}

// ============================================================
// 2. VERIFY
// Validate and normalize incoming data.
// ============================================================

export function verify(state) {
  const verified = {
    fx: clamp(state.fx, 0, 100),
    energy: clamp(state.energy, 0, 100),
    cyb: clamp(state.cyb, 0, 100),
    inf: clamp(state.inf, 0, 100),
    dc: clamp(state.dc, 0, 100),
    event: state.event,
    time: state.time,
    mode: state.mode
  };

  return {
    valid: true,
    state: verified
  };
}

// ============================================================
// 3. ASSESS
// Calculate systemic stress and Golden Ratio weighting.
// ============================================================

export function assess(state) {

  /*
   * Stress domains:
   * FX     = economic / currency pressure
   * ENERGY = energy availability pressure
   * CYB    = cyber/system integrity pressure
   * INF    = infrastructure pressure
   * DC     = data-centre / system load pressure
   */

  const rawStress =
    (state.fx * 0.25) +
    ((100 - state.energy) * 0.20) +
    (state.cyb * 0.20) +
    (state.inf * 0.20) +
    (state.dc * 0.15);

  /*
   * Golden Ratio normalization.
   *
   * PHI is used as a deterministic scaling factor.
   * The result remains bounded between 0 and 100.
   */

  const goldenScore = clamp(
    rawStress * PHI / (1 + PHI),
    0,
    100
  );

  let risk;

  if (goldenScore >= 70) {
    risk = "CRITICAL";
  } else if (goldenScore >= 50) {
    risk = "HIGH";
  } else if (goldenScore >= 30) {
    risk = "MEDIUM";
  } else {
    risk = "LOW";
  }

  const resilienceScore = clamp(
    100 - goldenScore,
    0,
    100
  );

  return {
    rawStress,
    goldenScore,
    resilienceScore,
    risk,
    phi: PHI
  };
}

// ============================================================
// 4. DECIDE
// Apply deterministic Captain AI Lena decision rules.
// ============================================================

export function decide(assessment, state) {

  const { risk, resilienceScore } = assessment;

  let decision;
  let action;

  if (risk === "CRITICAL") {
    decision = "ACTIVATE EMERGENCY STABILIZATION";
    action = "ISOLATE CASCADE AND PROTECT CORE SYSTEMS";
  }

  else if (risk === "HIGH") {
    decision = "ACTIVATE STABILIZATION MODE";
    action = "REDUCE SYSTEM EXPOSURE AND APPLY MITIGATION";
  }

  else if (state.energy < 30) {
    decision = "ENERGY PROTECTION MODE";
    action = "REDUCE SYSTEM LOAD AND PRESERVE ENERGY RESERVES";
  }

  else if (state.fx >= 60) {
    decision = "FX CORRECTION ACTIVE";
    action = "REDUCE FX EXPOSURE AND MONITOR LIQUIDITY";
  }

  else if (risk === "MEDIUM") {
    decision = "PREVENTIVE RESILIENCE MODE";
    action = "MONITOR CASCADES AND PREPARE MITIGATION";
  }

  else {
    decision = "SYSTEM STABLE";
    action = "NORMAL OPERATIONS CONTINUE";
  }

  return {
    decision,
    action,
    resilienceScore
  };
}

// ============================================================
// 5. ACT
// Produce the deterministic action sequence.
// ============================================================

export function act(decisionResult) {

  return [
    "CONFIRM SYSTEM STATE",
    "APPLY SELECTED MITIGATION",
    decisionResult.action,
    "MONITOR SYSTEM RESPONSE"
  ];
}

// ============================================================
// 6. UPDATE
// Reassess the system after action.
// ============================================================

export function update(previousState, actionResult = {}) {

  return {
    ...previousState,
    lastDecision: actionResult.decision ?? "NONE",
    lastAction: actionResult.action ?? "NONE",
    updatedAt: new Date().toISOString()
  };
}

// ============================================================
// COMPLETE GOLDEN RULE EXECUTION
// ============================================================

export function runGoldenRule(systemState = {}) {

  // OBSERVE
  const observed = observe(systemState);

  // VERIFY
  const verification = verify(observed);

  if (!verification.valid) {
    return {
      status: "VERIFICATION_FAILED",
      stage: "VERIFY"
    };
  }

  const verifiedState = verification.state;

  // ASSESS
  const assessment = assess(verifiedState);

  // DECIDE
  const decision = decide(
    assessment,
    verifiedState
  );

  // ACT
  const actionSequence = act(decision);

  // UPDATE
  const updatedState = update(
    verifiedState,
    decision
  );

  return {

    engine: "SPD v13 SEXTANT GOLDEN RULE ENGINE",

    pipeline: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ],

    observedState: observed,

    verifiedState,

    assessment,

    decision,

    actionSequence,

    updatedState,

    status: "COMPLETE"
  };
}

// ============================================================
// UTILITY
// ============================================================

function clamp(value, min, max) {
  return Math.min(
    Math.max(Number(value) || 0, min),
    max
  );
}