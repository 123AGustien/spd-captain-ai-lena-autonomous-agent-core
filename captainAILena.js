/**
 * SPD v13 — CAPTAIN AI LENA
 * -------------------------
 * Autonomous orchestration and decision interpretation layer.
 *
 * Architecture:
 *
 * DATA
 *   ↓
 * MEMORY CORE
 *   ↓
 * DOMAIN MODULES
 *   ↓
 * GOLDEN RULE REGISTRY
 *   ↓
 * SEXTANT GOLDEN RULE ENGINE
 *   ↓
 * SELF-TEST FINDINGS
 *   ↓
 * CAPTAIN AI LENA DECISION
 *   ↓
 * SYSTEM OUTPUT
 *   ↓
 * AUDIT LOG
 *   ↓
 * ACT
 *   ↓
 * UPDATE
 *   ↓
 * RE-TEST
 *
 * Golden Rule:
 *
 * OBSERVE
 *   ↓
 * VERIFY
 *   ↓
 * ASSESS
 *   ↓
 * DECIDE
 *   ↓
 * ACT
 *   ↓
 * UPDATE
 *
 * ============================================================
 *
 * IMPORTANT GOVERNANCE PRINCIPLE
 *
 * The SEXTANT GOLDEN RULE ENGINE remains the SINGLE
 * AUTHORITATIVE deterministic assessment and decision layer.
 *
 * The Golden Rules remain the SOURCE OF TRUTH.
 *
 * Captain AI Lena does NOT replace or override the
 * Golden Rule Engine.
 *
 * The Memory Core provides operational context and history.
 *
 * The Rule Registry identifies the applicable authoritative
 * Golden Rule reference.
 *
 * The Rule Engine provides a controlled gateway to the
 * Golden Rule authority.
 *
 * The Audit Log records the operational decision trail.
 *
 * Captain AI Lena interprets authoritative outputs and
 * identifies corrective actions.
 *
 * ============================================================
 *
 * DATA
 *   ↓
 * MEMORY
 *   ↓
 * DOMAIN MODULES
 *   ↓
 * GOLDEN RULE REFERENCE
 *   ↓
 * GOLDEN RULE ENGINE
 *   ↓
 * SELF-TEST
 *   ↓
 * CAPTAIN AI LENA
 *   ↓
 * DECISION
 *   ↓
 * AUDIT
 *   ↓
 * ACTION
 *   ↓
 * UPDATE
 *
 * ============================================================
 */

// ============================================================
// DOMAIN MODULES
// ============================================================

import { fxModule } from "./fx.js";

import { energyModule } from "./energy.js";

import { riskModule } from "./risk.js";

import { scenarioEngine } from "./scenario.js";


// ============================================================
// AUTHORITATIVE GOLDEN RULE ENGINE
// ============================================================
//
// This remains the SINGLE AUTHORITATIVE deterministic
// assessment and decision layer.
//
// It controls:
//
// - System assessment
// - Golden Score
// - Resilience Score
// - Risk classification
// - Operational decision
// - Operational action
// - Action sequence
// - Updated state
//
// ============================================================

import {
  runGoldenRule
} from "./goldenRuleEngine.js";


// ============================================================
// MEMORY CORE
// ============================================================
//
// Memory provides operational context.
//
// Memory does NOT create or modify Golden Rules.
//
// Golden Rules remain the Source of Truth.
//
// ============================================================

import MemoryCore from "./memory/memory-core.js";


// ============================================================
// GOLDEN RULE REGISTRY LOADER
// ============================================================
//
// The Rule Loader identifies the applicable Golden Rule
// reference for a given operational event.
//
// It does not replace the Golden Rule Engine.
//
// ============================================================

import RuleLoader from "./rules/rule-loader.js";


// ============================================================
// RULE ENGINE GATEWAY
// ============================================================
//
// The Rule Engine provides a controlled gateway between
// the Agent Core and the Golden Rule authority.
//
// It does not create or override Golden Rules.
//
// ============================================================

import RuleEngine from "./rules/rule-engine.js";


// ============================================================
// AUDIT LOG
// ============================================================
//
// Records:
//
// - Event
// - System state
// - Memory context
// - Golden Rule reference
// - Risk
// - Decision
// - Action
// - Outcome
//
// ============================================================

import AuditLog from "./audit/audit-log.js";


// ============================================================
// CAPTAIN AI LENA CORE INITIALIZATION
// ============================================================
//
// The Golden Rule Registry must be loaded before
// operational event processing.
//
// The registry should be the controlled registry
// associated with the Sextant Golden Rule Library.
//
// ============================================================

let captainCoreInitialized = false;

let initializedRuleRegistry = null;


// ============================================================
// INITIALIZE CAPTAIN AI LENA CORE
// ============================================================
//
// This function:
//
// 1. Loads the Golden Rule Registry.
// 2. Initializes the Rule Engine gateway.
// 3. Prepares Memory Core.
// 4. Prepares Audit Log.
//
// The Golden Rule Engine itself remains the authoritative
// decision layer.
//
// ============================================================

export function initializeCaptainAILenaCore(
  ruleRegistry
) {

  if (
    !ruleRegistry ||
    typeof ruleRegistry !== "object"
  ) {

    throw new Error(
      "Captain AI Lena Core initialization failed: " +
      "Valid Golden Rule Registry required."
    );

  }


  // ----------------------------------------------------------
  // LOAD GOLDEN RULE REGISTRY
  // ----------------------------------------------------------

  const ruleStatus =
    RuleLoader.loadRegistry(
      ruleRegistry
    );


  // ----------------------------------------------------------
  // INITIALIZE RULE ENGINE GATEWAY
  // ----------------------------------------------------------

  const ruleEngineStatus =
    RuleEngine.initialize(
      RuleLoader
    );


  // ----------------------------------------------------------
  // STORE INITIALIZATION STATE
  // ----------------------------------------------------------

  initializedRuleRegistry =
    ruleRegistry;

  captainCoreInitialized =
    true;


  // ----------------------------------------------------------
  // RETURN CORE STATUS
  // ----------------------------------------------------------

  return {

    status:
      "CAPTAIN AI LENA CORE READY",

    memoryCore:
      "READY",

    ruleRegistry:
      ruleStatus,

    ruleEngine:
      ruleEngineStatus,

    auditLog:
      "READY",

    goldenRuleEngine:
      "AUTHORITATIVE",

    goldenRuleAuthority:
      "SEXTANT GOLDEN RULE ENGINE",

    sourceOfTruth:
      "SEXTANT GOLDEN RULE LIBRARY",

    ruleModificationAllowed:
      false

  };

}


// ============================================================
// CORE STATUS
// ============================================================

export function getCaptainAILenaCoreStatus() {

  return {

    initialized:
      captainCoreInitialized,

    memoryCore:
      "ACTIVE",

    ruleRegistry:
      initializedRuleRegistry
        ? "LOADED"
        : "NOT LOADED",

    ruleEngine:
      captainCoreInitialized
        ? "READY"
        : "WAITING",

    goldenRuleEngine:
      "AUTHORITATIVE",

    goldenRuleAuthority:
      "SEXTANT GOLDEN RULE ENGINE",

    sourceOfTruth:
      "SEXTANT GOLDEN RULE LIBRARY",

    auditLog:
      "ACTIVE"

  };

}


// ============================================================
// CAPTAIN AI LENA — SELF-TEST DECISION INTERPRETATION
// ============================================================
//
// The self-test does NOT change the Golden Rule Engine.
//
// It identifies a fault.
//
// Captain AI Lena interprets that fault and determines
// the corrective action required.
//
// This is NOT a second risk engine.
//
// It is a deterministic corrective-action interpretation layer.
//
// ============================================================

function buildSelfTestDecision(
  selfTest
) {

  // ----------------------------------------------------------
  // NO SELF-TEST SUPPLIED
  // ----------------------------------------------------------

  if (!selfTest) {

    return {

      status:
        "NO SELF-TEST RESULT",

      decision:
        null,

      action:
        null,

      findings:
        [],

      nextAction:
        null

    };

  }


  // ----------------------------------------------------------
  // EXTRACT SELF-TEST RESULTS
  // ----------------------------------------------------------

  const results =
    Array.isArray(
      selfTest.results
    )
      ? selfTest.results
      : [];


  // ----------------------------------------------------------
  // IDENTIFY FAILED TESTS
  // ----------------------------------------------------------

  const failures =
    results.filter(
      test =>
        test.status === "FAIL"
    );


  // ----------------------------------------------------------
  // ALL TESTS PASSED
  // ----------------------------------------------------------

  if (
    failures.length === 0 &&
    selfTest.overallStatus === "PASS"
  ) {

    return {

      status:
        "SELF-TEST PASS",

      decision:
        "SYSTEM VALIDATED",

      action:
        "CONTINUE NORMAL OPERATIONS AND MONITOR SYSTEM RESPONSE",

      findings:
        [],

      nextAction:
        "CONTINUE MONITORING"

    };

  }


  // ----------------------------------------------------------
  // IDENTIFY FAULTS AND REQUIRED CORRECTIVE ACTIONS
  // ----------------------------------------------------------

  const findings =
    failures.map(
      test => {

        const expected =
          test.expectedDecision ??
          test.expected ??
          "UNSPECIFIED";


        const actual =
          test.actualDecision ??
          test.actual ??
          "UNSPECIFIED";


        const risk =
          test.risk ??
          test.actualRisk ??
          "UNKNOWN";


        // ======================================================
        // HIGH-RISK DECISION MISMATCH
        // ======================================================

        if (
          test.test?.includes(
            "HIGH RISK"
          ) ||
          risk === "MEDIUM"
        ) {

          return {

            test:
              test.test,

            condition:
              "HIGH-RISK SCENARIO UNDER-ESCALATION",

            expected:
              expected,

            actual:
              actual,

            risk:
              risk,

            rectification:
              "AUDIT HIGH-RISK CLASSIFICATION AND DECISION MAPPING",

            requiredAction:
              "REVIEW HIGH-RISK ESCALATION THRESHOLD AND STABILIZATION RESPONSE"

          };

        }


        // ======================================================
        // CRITICAL-RISK DECISION MISMATCH
        // ======================================================

        if (
          test.test?.includes(
            "CRITICAL RISK"
          ) ||
          test.test?.includes(
            "MAXIMUM CURRENT RISK"
          )
        ) {

          return {

            test:
              test.test,

            condition:
              "CRITICAL-RISK SCENARIO NOT ESCALATED TO REQUIRED RESPONSE",

            expected:
              expected,

            actual:
              actual,

            risk:
              risk,

            rectification:
              "AUDIT CRITICAL-RISK ESCALATION AND EMERGENCY DECISION MAPPING",

            requiredAction:
              "REVIEW CRITICAL-RISK THRESHOLD AND EMERGENCY STABILIZATION RESPONSE"

          };

        }


        // ======================================================
        // GENERAL DECISION MISMATCH
        // ======================================================

        return {

          test:
            test.test,

          condition:
            "DETERMINISTIC DECISION MISMATCH",

          expected:
            expected,

          actual:
            actual,

          risk:
            risk,

          rectification:
            "AUDIT THE FAILED DECISION CONDITION",

          requiredAction:
            "REVIEW THE EXPECTED AND ACTUAL DECISION PATH AND APPLY CORRECTIVE ACTION"

        };

      }
    );


  // ----------------------------------------------------------
  // DETERMINE OVERALL CAPTAIN AI LENA CORRECTIVE DECISION
  // ----------------------------------------------------------

  return {

    status:
      "RECTIFICATION REQUIRED",

    decision:
      "AUDIT AND RECTIFY IDENTIFIED DECISION CONDITIONS",

    action:
      "REVIEW FAILED RISK ESCALATION AND DECISION MAPPING, APPLY CORRECTIVE ACTION, THEN RE-RUN SELF-TEST",

    findings,

    nextAction:
      "RE-RUN SELF-TEST AFTER RECTIFICATION"

  };

}


// ============================================================
// CAPTAIN AI LENA
// ============================================================

export function captainAILena(
  state = {},
  selfTest = null
) {


  // ==========================================================
  // 0. CAPTURE EVENT
  // ==========================================================

  const eventType =
    state?.event?.type ??
    state?.event ??
    null;


  // ==========================================================
  // 1. MEMORY CORE — RECORD OBSERVED EVENT
  // ==========================================================

  let memoryEvent = null;

  if (eventType) {

    memoryEvent =
      MemoryCore.recordEvent({

        type:
          eventType,

        payload:
          state,

        source:
          "CAPTAIN_AI_LENA"

      });

  }


  // ==========================================================
  // 2. MEMORY CORE — RECORD CURRENT STATE
  // ==========================================================

  const memoryState =
    MemoryCore.recordState(
      state
    );


  // ==========================================================
  // 3. RETRIEVE OPERATIONAL MEMORY CONTEXT
  // ==========================================================

  const memoryContext =
    MemoryCore.getContext();


  // ==========================================================
  // 4. IDENTIFY APPLICABLE GOLDEN RULE
  // ==========================================================
  //
  // The Rule Engine identifies the relevant authoritative
  // Golden Rule reference.
  //
  // It does NOT replace the Golden Rule Engine.
  //
  // ==========================================================

  let ruleReference = null;

  if (eventType) {

    ruleReference =
      RuleEngine.evaluate(
        eventType
      );

  }


  // ==========================================================
  // 5. RUN DOMAIN MODULES
  //
  // These modules provide supporting domain information
  // and diagnostics.
  //
  // They do NOT define authoritative system risk.
  // ==========================================================

  const fx =
    fxModule(
      state.fx
    );


  const energy =
    energyModule(
      state.energy
    );


  const riskDiagnostics =
    riskModule(
      state.cyb,
      state.energy,
      state.fx
    );


  const scenario =
    scenarioEngine(
      state.event
    );


  // ==========================================================
  // 6. RUN AUTHORITATIVE GOLDEN RULE ENGINE
  //
  // OBSERVE
  // VERIFY
  // ASSESS
  // DECIDE
  // ACT
  // UPDATE
  //
  // The Golden Rule Engine remains the SINGLE SOURCE OF TRUTH
  // for:
  //
  // - System assessment
  // - Golden Score
  // - Resilience Score
  // - Risk classification
  // - Operational decision
  // - Operational action
  // - Action sequence
  // - Updated state
  // ==========================================================

  const goldenRule =
    runGoldenRule(
      state
    );


  // ==========================================================
  // 7. AUTHORITATIVE RISK
  // ==========================================================
  //
  // Do NOT use riskDiagnostics.risk as the final
  // Captain AI Lena risk classification.
  //
  // The authoritative risk comes directly from:
  //
  // goldenRule.assessment.risk
  //
  // ==========================================================

  const authoritativeRisk =
    goldenRule.assessment?.risk ??
    "UNKNOWN";


  // ==========================================================
  // 8. CAPTAIN AI LENA SELF-TEST DECISION
  // ==========================================================
  //
  // SELF-TEST:
  //     Identifies the fault.
  //
  // CAPTAIN AI LENA:
  //     Determines the required corrective action.
  //
  // This does NOT override the Golden Rule Engine.
  //
  // ==========================================================

  const selfTestDecision =
    buildSelfTestDecision(
      selfTest
    );


  // ==========================================================
  // 9. RECORD DECISION IN MEMORY
  // ==========================================================

  const memoryDecision =
    MemoryCore.recordDecision({

      event:
        eventType,

      ruleReference:
        ruleReference,

      riskLevel:
        authoritativeRisk,

      decision:
        goldenRule.decision,

      recommendedAction:
        goldenRule.actionSequence,

      rationale:
        goldenRule.assessment

    });


  // ==========================================================
  // 10. CREATE AUDIT RECORD
  // ==========================================================

  const auditRecord =
    AuditLog.record({

      event:
        eventType,

      systemState:
        state,

      memoryContext:
        memoryContext,

      ruleReference:
        ruleReference,

      ruleAuthority:
        "SEXTANT GOLDEN RULE ENGINE",

      ruleSourceOfTruth:
        true,

      algorithm:
        goldenRule.pipeline,

      riskLevel:
        authoritativeRisk,

      decision:
        goldenRule.decision,

      recommendedAction:
        goldenRule.actionSequence,

      outcome:
        goldenRule.updatedState,

      status:
        goldenRule.status

    });


  // ==========================================================
  // 11. UNIFIED CAPTAIN AI LENA OUTPUT
  // ==========================================================

  return {

    agent:
      "CAPTAIN AI LENA",


    // ========================================================
    // CORE STATUS
    // ========================================================

    coreStatus:
      getCaptainAILenaCoreStatus(),


    // ========================================================
    // EVENT
    // ========================================================

    event:
      eventType,


    // ========================================================
    // DOMAIN DIAGNOSTIC OUTPUTS
    // ========================================================

    fx,

    energy,

    // Supporting diagnostic information only.
    // This is NOT the authoritative risk classification.

    riskDiagnostics,

    scenario,


    // ========================================================
    // MEMORY OUTPUT
    // ========================================================

    memory: {

      event:
        memoryEvent,

      state:
        memoryState,

      context:
        memoryContext,

      decision:
        memoryDecision

    },


    // ========================================================
    // GOLDEN RULE REFERENCE
    // ========================================================

    ruleReference:
      ruleReference,


    // ========================================================
    // AUTHORITATIVE GOLDEN RULE OUTPUT
    // ========================================================

    risk:
      authoritativeRisk,

    decision:
      goldenRule.decision,

    actionSequence:
      goldenRule.actionSequence,

    assessment:
      goldenRule.assessment,

    updatedState:
      goldenRule.updatedState,

    pipeline:
      goldenRule.pipeline,

    status:
      goldenRule.status,


    // ========================================================
    // CAPTAIN AI LENA SELF-TEST DECISION
    // ========================================================
    //
    // This section does not replace the Golden Rule decision.
    //
    // It identifies the corrective action required when
    // the self-test detects a failed condition.
    //
    // ========================================================

    selfTestDecision,


    // ========================================================
    // AUDIT OUTPUT
    // ========================================================

    audit:
      auditRecord

  };

}


// ============================================================
// OPTIONAL DIRECT ACCESS
// ============================================================
//
// Exported for cockpit interfaces that need to interpret
// an existing self-test result without running a new
// Golden Rule execution.
//
// This keeps the self-test interpretation deterministic
// and reusable by desktop, mobile, and simulation interfaces.
// ============================================================

export function interpretSelfTest(
  selfTest
) {

  return buildSelfTestDecision(
    selfTest
  );

}


// ============================================================
// OPTIONAL MEMORY ACCESS
// ============================================================
//
// Allows cockpit or diagnostic interfaces to inspect
// operational memory without directly modifying it.
// ============================================================

export function getCaptainAILenaMemory() {

  return MemoryCore.getSnapshot();

}


// ============================================================
// OPTIONAL AUDIT ACCESS
// ============================================================
//
// Allows cockpit or audit interfaces to retrieve
// recorded operational evidence.
// ============================================================

export function getCaptainAILenaAudit(
  limit = 10
) {

  return AuditLog.getRecent(
    limit
  );

}