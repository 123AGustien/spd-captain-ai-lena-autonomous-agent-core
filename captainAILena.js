import { fxModule } from "./fx.js";
import { energyModule } from "./energy.js";
import { riskModule } from "./risk.js";
import { scenarioEngine } from "./scenario.js";

/**
 * SPD v13.1 — Captain AI Lena Decision Core
 *
 * DATA → ALGORITHMS → COMPUTE
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * This module consumes authoritative domain/module outputs.
 * It does not redefine the Golden Rule Engine.
 */

export function captainAILena(state) {

  // =========================================================
  // OBSERVE
  // =========================================================

  const observedState = {
    ...state
  };


  // =========================================================
  // VERIFY
  // =========================================================

  const verifiedState = {

    fx:
      Number(observedState.fx ?? 0),

    energy:
      Number(observedState.energy ?? 0),

    cyb:
      Number(observedState.cyb ?? 0),

    inf:
      Number(observedState.inf ?? 0),

    dc:
      Number(observedState.dc ?? 0),

    event:
      observedState.event ??
      observedState.scenario ??
      "NORMAL",

    scenario:
      observedState.scenario ??
      observedState.event ??
      "NORMAL",

    intensity:
      Number(observedState.intensity ?? 0),

    mode:
      observedState.mode ??
      "AUTONOMOUS"
  };


  // =========================================================
  // ASSESS
  // =========================================================

  const fx =
    fxModule(
      verifiedState.fx
    );

  const energy =
    energyModule(
      verifiedState.energy
    );

  const risk =
    riskModule(
      verifiedState.cyb,
      verifiedState.energy,
      verifiedState.fx
    );

  const scenario =
    scenarioEngine(
      verifiedState.event
    );


  // =========================================================
  // DECIDE
  // =========================================================

  const decision =
    decide(
      risk,
      energy,
      fx
    );


  // =========================================================
  // ACT
  // =========================================================

  const action =
    actionForDecision(
      decision
    );


  // =========================================================
  // UPDATE
  // =========================================================

  return {

    observedState,

    verifiedState,

    assessment: {

      fx,

      energy,

      risk,

      scenario

    },

    decision: {

      decision,

      action,

      authority:
        "HUMAN_OPERATOR",

      executionStatus:
        "HUMAN_AUTHORIZATION_REQUIRED"

    },

    status:
      "COMPLETE"

  };

}


/**
 * ============================================================
 * DETERMINISTIC DECISION HIERARCHY
 * ============================================================
 *
 * HIGH RISK
 *      ↓
 * LOW ENERGY
 *      ↓
 * FX STABILIZATION
 *      ↓
 * SYSTEM STABLE
 */

function decide(
  risk,
  energy,
  fx
) {

  if (
    risk ===
    "HIGH RISK"
  ) {

    return (
      "ACTIVATE STABILIZATION MODE"
    );

  }


  if (
    energy ===
    "LOW ENERGY MODE"
  ) {

    return (
      "REDUCE SYSTEM LOAD"
    );

  }


  if (
    typeof fx === "string" &&
    fx.includes(
      "STABILIZATION"
    )
  ) {

    return (
      "FX CORRECTION ACTIVE"
    );

  }


  return (
    "SYSTEM STABLE"
  );

}


/**
 * ============================================================
 * ACTION TRANSLATION
 * ============================================================
 */

function actionForDecision(
  decision
) {

  switch (
    decision
  ) {

    case
      "ACTIVATE STABILIZATION MODE":

      return (
        "PROTECT SYSTEM STABILITY AND ACTIVATE STABILIZATION MEASURES"
      );


    case
      "REDUCE SYSTEM LOAD":

      return (
        "REDUCE SYSTEM LOAD AND PRESERVE ENERGY RESERVES"
      );


    case
      "FX CORRECTION ACTIVE":

      return (
        "REDUCE FX EXPOSURE AND ACTIVATE FX STABILIZATION MEASURES"
      );


    case
      "SYSTEM STABLE":

      return (
        "CONTINUE MONITORING AND MAINTAIN NORMAL OPERATIONS"
      );


    default:

      return (
        "MAINTAIN SAFE STATE"
      );

  }

}