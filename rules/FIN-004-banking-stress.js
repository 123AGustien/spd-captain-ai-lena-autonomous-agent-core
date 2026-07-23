/**
 * ============================================================
 * SPD V13.1 — FIN-004 BANKING STRESS RULE
 * ============================================================
 *
 * Rule ID:
 * FIN-004
 *
 * Domain:
 * FINANCIAL RESILIENCE
 *
 * Category:
 * BANKING SYSTEM STABILITY
 *
 * Status:
 * ACTIVE
 *
 * Version:
 * 1.0
 *
 * Purpose:
 * Evaluate banking-sector resilience during periods of
 * financial stress and identify potential cascading effects
 * across interconnected systems.
 *
 * Golden Rule:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic rule-based evaluation.
 * No randomness.
 * No machine learning.
 *
 * This rule does not directly execute system actions.
 * It evaluates the financial stress condition and returns
 * a deterministic rule assessment and recommended action.
 * Captain AI Lena remains the authoritative decision engine.
 * ============================================================
 */


/**
 * ============================================================
 * RULE METADATA
 * ============================================================
 */

export const FIN_004 = {

  ruleId:
    "FIN-004",

  domain:
    "FINANCIAL RESILIENCE",

  category:
    "BANKING SYSTEM STABILITY",

  status:
    "ACTIVE",

  version:
    "1.0",

  name:
    "BANKING STRESS",

  purpose:
    "Evaluate banking-sector resilience during periods of financial stress and assess potential cascading effects across interconnected systems."

};


/**
 * ============================================================
 * FIN-004 RULE EVALUATION
 * ============================================================
 *
 * Inputs:
 *
 * fx      → Foreign exchange stress
 * energy  → Available energy condition
 * cyb     → Cyber/system integrity condition
 * inf     → Infrastructure stress
 * dc      → Data-centre/system load stress
 *
 * The rule evaluates the financial stress environment and
 * identifies the appropriate FIN-004 response condition.
 * ============================================================
 */

export function evaluateFIN004(state = {}) {

  const safeState = {

    fx:
      Number(state.fx ?? 0),

    energy:
      Number(state.energy ?? 50),

    cyb:
      Number(state.cyb ?? 50),

    inf:
      Number(state.inf ?? 0),

    dc:
      Number(state.dc ?? 0)

  };


  /**
   * ==========================================================
   * FINANCIAL STRESS INDICATORS
   * ==========================================================
   */

  const fxStress =
    safeState.fx > 10;


  const bankingPressure =
    fxStress;


  const interconnectedStress =

    fxStress &&

    (
      safeState.energy < 30 ||
      safeState.cyb < 50 ||
      safeState.inf > 50 ||
      safeState.dc > 50
    );


  /**
   * ==========================================================
   * RULE ASSESSMENT
   * ==========================================================
   */

  let severity =
    "LOW";


  let action =
    "MONITOR FINANCIAL SYSTEM";


  if (interconnectedStress) {

    severity =
      "HIGH";

    action =
      "ACTIVATE FINANCIAL STABILIZATION RESPONSE";

  }

  else if (bankingPressure) {

    severity =
      "MEDIUM";

    action =
      "ACTIVATE FX STABILIZATION MONITORING";

  }


  /**
   * ==========================================================
   * RULE OUTPUT
   * ==========================================================
   */

  return {

    ruleId:
      FIN_004.ruleId,

    ruleName:
      FIN_004.name,

    domain:
      FIN_004.domain,

    category:
      FIN_004.category,

    version:
      FIN_004.version,

    status:
      FIN_004.status,

    severity,

    action,

    indicators: {

      fxStress,

      bankingPressure,

      interconnectedStress

    },

    systemSnapshot:
      safeState,

    ruleStatus:
      "EVALUATED"

  };

}


/**
 * ============================================================
 * FIN-004 ACTION LINK
 * ============================================================
 *
 * Maps the rule assessment to the operational response
 * expected by the Captain AI Lena decision layer.
 *
 * The rule does not override the core safety hierarchy.
 * Higher-priority system safety conditions remain authoritative.
 * ============================================================
 */

export function getFIN004Action(ruleResult) {

  if (!ruleResult) {

    return {

      ruleId:
        "FIN-004",

      action:
        "NO ACTION",

      status:
        "STANDBY"

    };

  }


  if (
    ruleResult.severity ===
    "HIGH"
  ) {

    return {

      ruleId:
        "FIN-004",

      action:
        "ACTIVATE FINANCIAL STABILIZATION RESPONSE",

      mode:
        "FINANCIAL STABILIZATION",

      status:
        "ACTIVE"

    };

  }


  if (
    ruleResult.severity ===
    "MEDIUM"
  ) {

    return {

      ruleId:
        "FIN-004",

      action:
        "ACTIVATE FX STABILIZATION MONITORING",

      mode:
        "FX STABILIZATION",

      status:
        "ACTIVE"

    };

  }


  return {

    ruleId:
      "FIN-004",

    action:
      "MONITOR FINANCIAL SYSTEM",

    mode:
      "MONITORING",

    status:
      "STABLE"

  };

}


/**
 * ============================================================
 * FIN-004 COMPLETE RULE PACKET
 * ============================================================
 *
 * Provides one deterministic output packet for the
 * validation and audit layers.
 * ============================================================
 */

export function buildFIN004Packet(state = {}) {

  const ruleResult =
    evaluateFIN004(state);


  const action =
    getFIN004Action(
      ruleResult
    );


  return {

    rule:
      FIN_004,

    evaluation:
      ruleResult,

    action,

    timestamp:
      new Date().toISOString(),

    status:
      "FIN-004 RULE EVALUATED"

  };

}