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
 * Domain Integration:
 *
 * Cockpit
 *    ↓
 * Domain Integration Layer
 *    ↓
 * FIN / BHR Rule Engine
 *    ↓
 * Captain AI Lena Decision Core
 *    ↓
 * Golden Rule Decision
 *    ↓
 * Result / Audit
 *
 * IMPORTANT:
 * This module does not redefine the Golden Rule Engine.
 * It consumes authoritative module outputs and generates
 * the deterministic Captain AI Lena decision.
 *
 * Human authority remains final for consequential execution.
 */


/* =========================================================
   CAPTAIN AI LENA
========================================================= */

export function captainAILena(state = {}) {

  // =======================================================
  // OBSERVE
  // =======================================================

  const observedState = {
    ...state
  };


  // =======================================================
  // VERIFY
  // =======================================================

  const verifiedState = {

    fx:
      Number(
        observedState.fx ?? 0
      ),

    energy:
      Number(
        observedState.energy ?? 0
      ),

    cyb:
      Number(
        observedState.cyb ?? 0
      ),

    inf:
      Number(
        observedState.inf ?? 0
      ),

    dc:
      Number(
        observedState.dc ?? 0
      ),

    event:
      observedState.event ??
      observedState.scenario ??
      "NORMAL",

    scenario:
      observedState.scenario ??
      observedState.event ??
      "NORMAL",

    mode:
      observedState.mode ??
      "AUTONOMOUS",

    intensity:
      Number(
        observedState.intensity ?? 0
      ),

    domain:
      observedState.domain ??
      null,

    domainStatus:
      observedState.domainStatus ??
      null,

    domainResult:
      observedState.domainResult ??
      null

  };


  // =======================================================
  // ASSESS
  // =======================================================

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


  /*
   * Domain assessment is supplied by
   * domainIntegration.js.
   *
   * The domain engine remains authoritative
   * for its own domain-specific rules.
   */

  const domainAssessment =
    extractDomainAssessment(
      verifiedState.domainResult
    );


  // =======================================================
  // DECIDE
  // =======================================================

  const decision =
    decide(
      risk,
      energy,
      fx,
      domainAssessment
    );


  // =======================================================
  // ACT
  // =======================================================

  const action =
    actionForDecision(
      decision
    );


  // =======================================================
  // UPDATE
  // =======================================================

  return {

    observedState,

    verifiedState,

    assessment: {

      fx,

      energy,

      risk,

      scenario,

      domain:
        domainAssessment

    },

    decision: {

      decision,

      action,

      domain:
        verifiedState.domain,

      humanDecisionAuthority:
        getHumanDecisionAuthority(
          domainAssessment
        )

    },

    status:
      "COMPLETE"

  };

}


/* =========================================================
   EXTRACT DOMAIN ASSESSMENT
========================================================= */

function extractDomainAssessment(
  domainResult
) {

  if (
    !domainResult
  ) {

    return {

      active:
        false,

      domain:
        null,

      risk:
        null,

      resilienceScore:
        null,

      baseStress:
        null,

      action:
        null,

      priority:
        null,

      humanAuthorization:
        null

    };

  }


  /*
   * domainIntegration.js returns:
   *
   * {
   *   success,
   *   domain,
   *   result
   * }
   *
   * Extract the actual rule-engine result.
   */

  const engineResult =
    domainResult.result ||
    domainResult;


  const assessment =
    engineResult.assessment ||
    {};


  const domainDecision =
    engineResult.decision ||
    {};


  return {

    active:
      Boolean(
        domainResult.success !== false
      ),

    domain:
      engineResult.domain ||
      domainResult.domain ||
      null,

    domainName:
      engineResult.domainName ||
      null,

    status:
      engineResult.status ||
      null,

    risk:
      assessment.risk ||
      null,

    resilienceScore:
      assessment.resilienceScore ??
      null,

    baseStress:
      assessment.baseStress ??
      null,

    action:
      domainDecision.action ||
      null,

    priority:
      domainDecision.priority ||
      null,

    humanAuthorization:
      domainDecision.humanAuthorization ||
      engineResult.humanDecisionAuthority ||
      null,

    executionPolicy:
      engineResult.executionPolicy ||
      null

  };

}


/* =========================================================
   DETERMINISTIC DECISION LOGIC
========================================================= */

/**
 * Existing decision hierarchy preserved:
 *
 * DOMAIN HIGH RISK
 * ↓
 * HIGH SYSTEM RISK
 * ↓
 * LOW ENERGY
 * ↓
 * FX STABILIZATION
 * ↓
 * SYSTEM STABLE
 *
 * Domain-specific assessment is considered first
 * when an active authoritative domain engine is present.
 */

function decide(
  risk,
  energy,
  fx,
  domainAssessment
) {

  /*
   * Authoritative domain HIGH risk.
   */

  if (
    domainAssessment.active &&
    domainAssessment.risk ===
      "HIGH"
  ) {

    return "DOMAIN HIGH RISK — ESCALATE AND MAINTAIN SAFE STATE";

  }


  /*
   * Existing system HIGH risk logic.
   */

  if (
    risk ===
    "HIGH RISK"
  ) {

    return "ACTIVATE STABILIZATION MODE";

  }


  /*
   * Authoritative domain MEDIUM risk.
   */

  if (
    domainAssessment.active &&
    domainAssessment.risk ===
      "MEDIUM"
  ) {

    return "DOMAIN MEDIUM RISK — INITIATE MITIGATION REVIEW";

  }


  /*
   * Existing energy protection logic.
   */

  if (
    energy ===
    "LOW ENERGY MODE"
  ) {

    return "REDUCE SYSTEM LOAD";

  }


  /*
   * Existing FX stabilization logic.
   */

  if (
    typeof fx === "string" &&
    fx.includes(
      "STABILIZATION"
    )
  ) {

    return "FX CORRECTION ACTIVE";

  }


  /*
   * Existing stable-state logic.
   */

  return "SYSTEM STABLE";

}


/* =========================================================
   OPERATIONAL ACTION
========================================================= */

/**
 * Converts the deterministic decision into
 * an explicit operational action.
 *
 * No consequential action is automatically executed.
 * Human authority remains final.
 */

function actionForDecision(
  decision
) {

  switch (
    decision
  ) {

    case
      "DOMAIN HIGH RISK — ESCALATE AND MAINTAIN SAFE STATE":

      return (
        "ESCALATE DOMAIN RISK, " +
        "MAINTAIN SAFE STATE, " +
        "AND REQUEST HUMAN AUTHORIZATION " +
        "BEFORE ANY RECOVERY ACTION"
      );


    case
      "ACTIVATE STABILIZATION MODE":

      return (
        "PROTECT SYSTEM STABILITY " +
        "AND ACTIVATE STABILIZATION MEASURES"
      );


    case
      "DOMAIN MEDIUM RISK — INITIATE MITIGATION REVIEW":

      return (
        "INITIATE DOMAIN MITIGATION REVIEW " +
        "AND REQUEST HUMAN AUTHORIZATION " +
        "BEFORE EXECUTION"
      );


    case
      "REDUCE SYSTEM LOAD":

      return (
        "REDUCE SYSTEM LOAD " +
        "AND PRESERVE ENERGY RESERVES"
      );


    case
      "FX CORRECTION ACTIVE":

      return (
        "REDUCE FX EXPOSURE " +
        "AND ACTIVATE FX STABILIZATION MEASURES"
      );


    case
      "SYSTEM STABLE":

      return (
        "CONTINUE MONITORING " +
        "AND MAINTAIN NORMAL OPERATIONS"
      );


    default:

      return (
        "MAINTAIN SAFE STATE"
      );

  }

}


/* =========================================================
   HUMAN DECISION AUTHORITY
========================================================= */

function getHumanDecisionAuthority(
  domainAssessment
) {

  if (
    domainAssessment &&
    domainAssessment.humanAuthorization
  ) {

    return (
      domainAssessment.humanAuthorization
    );

  }


  return (
    "FINAL HUMAN AUTHORITY"
  );

}