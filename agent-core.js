/**
 * SPD v13.1 — CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * FILE:
 * agent-core.js
 *
 * PURPOSE:
 * Central orchestration bridge connecting:
 *
 * DATA
 *   ↓
 * MEMORY CORE
 *   ↓
 * RULE REGISTRY
 *   ↓
 * RULE ENGINE GATEWAY
 *   ↓
 * AUTHORITATIVE GOLDEN RULE ENGINE
 *   ↓
 * CAPTAIN AI LENA
 *   ↓
 * AUDIT LOG
 *   ↓
 * SYSTEM OUTPUT
 *
 * GOLDEN RULE:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * GOVERNANCE:
 *
 * 1. Golden Rules remain the Source of Truth.
 * 2. Golden Rule Engine remains authoritative.
 * 3. Agent Core does not create or modify Golden Rules.
 * 4. Agent Core does not override authoritative decisions.
 * 5. Memory Core provides operational context only.
 * 6. Rule Engine Gateway identifies applicable Golden Rules.
 * 7. Audit Log records execution history.
 * 8. Existing cockpit UI remains unchanged.
 */


/* ============================================================
   AUTHORITATIVE GOLDEN RULE ENGINE
   ============================================================ */

import {
  runGoldenRule
} from "./goldenRuleEngine.js";


/* ============================================================
   CAPTAIN AI LENA
   ============================================================ */

import {
  captainAILena
} from "./captainAILena.js";


/* ============================================================
   MEMORY CORE
   ============================================================ */

import MemoryCore
  from "./memory/memory-core.js";


/* ============================================================
   RULE LOADER
   ============================================================ */

import RuleLoader
  from "./rules/rule-loader.js";


/* ============================================================
   RULE ENGINE GATEWAY
   ============================================================ */

import RuleEngine
  from "./rules/rule-engine.js";


/* ============================================================
   AUDIT LOG
   ============================================================ */

import AuditLog
  from "./audit/audit-log.js";


/* ============================================================
   AGENT CORE STATE
   ============================================================ */

const AgentCoreState = {

  initialized:
    false,

  ruleRegistry:
    null,

  ruleEngine:
    null,

  memoryCore:
    MemoryCore,

  lastExecution:
    null,

  executionCount:
    0,

  status:
    "INITIALIZING"

};


/* ============================================================
   SCENARIO → AUTHORITATIVE RULE EVENT MAPPING
   ============================================================ */

/*
 * The existing cockpit may use FX_SHOCK.
 *
 * The authoritative registry uses FX_STRESS.
 *
 * This mapping preserves the existing cockpit screen
 * while connecting it to the correct Golden Rule.
 */

const EVENT_MAP = {

  FX_SHOCK:
    "FX_STRESS",

  FX_STRESS:
    "FX_STRESS",

  DC_LOAD:
    "DC_LOAD",

  CYBER_EVENT:
    "CYBER_EVENT",

  INFRASTRUCTURE_STRESS:
    "INFRASTRUCTURE_STRESS",

  SCENARIO_EVENT:
    "SCENARIO_EVENT",

  ENGINEERING_EVENT:
    "ENGINEERING_EVENT",

  OPERATIONAL_EVENT:
    "OPERATIONAL_EVENT",

  BIODIESEL_SHORTAGE:
    "ENGINEERING_EVENT",

  NORMAL:
    "SCENARIO_EVENT"

};


/* ============================================================
   NORMALIZE EVENT
   ============================================================ */

function normalizeEvent(
  event
) {

  const input =
    typeof event === "string"
      ? event
      : event?.type ||
        event?.event ||
        "NORMAL";


  return {

    original:
      input,

    authoritative:
      EVENT_MAP[input] ||
      input

  };

}


/* ============================================================
   INITIALIZE AGENT CORE
   ============================================================ */

export function initializeAgentCore(
  ruleRegistry
) {

  if (!ruleRegistry) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry not supplied."
    );

  }


  /* ==========================================================
     VERIFY SOURCE OF TRUTH
     ========================================================== */

  if (
    ruleRegistry.sourceOfTruth !== true
  ) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry is not marked as Source of Truth."
    );

  }


  /* ==========================================================
     VERIFY ACTIVE STATUS
     ========================================================== */

  if (
    ruleRegistry.status !==
    "ACTIVE"
  ) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry is not ACTIVE."
    );

  }


  /* ==========================================================
     LOAD REGISTRY THROUGH RULE LOADER
     ========================================================== */

  const loaderStatus =
    RuleLoader.loadRegistry(
      ruleRegistry
    );


  /* ==========================================================
     INITIALIZE RULE ENGINE GATEWAY
     ========================================================== */

  const engineStatus =
    RuleEngine.initialize(
      RuleLoader
    );


  /* ==========================================================
     STORE AGENT CORE STATE
     ========================================================== */

  AgentCoreState.ruleRegistry =
    RuleLoader.getRegistry();


  AgentCoreState.ruleEngine =
    RuleEngine;


  AgentCoreState.initialized =
    true;


  AgentCoreState.status =
    "READY";


  /* ==========================================================
     AUDIT INITIALIZATION
     ========================================================== */

  if (
    AuditLog &&
    typeof AuditLog.record ===
    "function"
  ) {

    AuditLog.record({

      event:
        "AGENT_CORE_INITIALIZED",

      algorithm:
        "SPD CAPTAIN AI LENA AUTONOMOUS AGENT CORE",

      ruleAuthority:
        ruleRegistry.authority,

      ruleSourceOfTruth:
        ruleRegistry.sourceOfTruth,

      registryVersion:
        ruleRegistry.version,

      ruleLoaderStatus:
        loaderStatus.status,

      ruleEngineStatus:
        engineStatus.status,

      status:
        "READY"

    });

  }


  return {

    status:
      "READY",

    ruleRegistry:
      AgentCoreState.ruleRegistry,

    ruleEngine:
      AgentCoreState.ruleEngine,

    memoryCore:
      AgentCoreState.memoryCore

  };

}


/* ============================================================
   VERIFY INITIALIZATION
   ============================================================ */

function ensureInitialized() {

  if (
    !AgentCoreState.initialized
  ) {

    throw new Error(
      "Captain AI Lena Agent Core is not initialized."
    );

  }

}


/* ============================================================
   RESOLVE AUTHORITATIVE GOLDEN RULE
   ============================================================ */

function resolveRule(
  event
) {

  ensureInitialized();


  const normalized =
    normalizeEvent(
      event
    );


  const result =
    RuleEngine.evaluate({

      type:
        normalized.authoritative

    });


  return {

    originalEvent:
      normalized.original,

    authoritativeEvent:
      normalized.authoritative,

    ruleApplied:
      result.ruleApplied ??
      false,

    found:
      result.ruleReference?.found ??
      false,

    domain:
      result.ruleReference?.domain ??
      null,

    ruleIds:
      result.ruleReference?.ruleIds ??
      [],

    description:
      result.ruleReference?.description ??
      null,

    authority:
      AgentCoreState
        .ruleRegistry
        .authority,

    sourceOfTruth:
      AgentCoreState
        .ruleRegistry
        .sourceOfTruth,

    registryVersion:
      AgentCoreState
        .ruleRegistry
        .version

  };

}


/* ============================================================
   MEMORY OBSERVATION
   ============================================================ */

function observeMemory(
  state,
  ruleReference
) {

  ensureInitialized();


  const event =
    state.event ||
    "NORMAL";


  const eventRecord =
    AgentCoreState
      .memoryCore
      .recordEvent({

        type:
          event,

        payload: {

          state: {
            ...state
          },

          ruleReference

        },

        source:
          "SPD_AGENT_CORE"

      });


  const stateRecord =
    AgentCoreState
      .memoryCore
      .recordState(
        state
      );


  return {

    event:
      eventRecord,

    state:
      stateRecord,

    context:
      AgentCoreState
        .memoryCore
        .getContext()

  };

}


/* ============================================================
   CAPTAIN AI LENA EXECUTION
   ============================================================ */

export function runAgentCore(
  state = {},
  selfTest = null
) {

  ensureInitialized();


  const executionTime =
    new Date().toISOString();


  const event =
    state.event ||
    "NORMAL";


  /* ==========================================================
     1. RESOLVE GOLDEN RULE
     ========================================================== */

  const ruleReference =
    resolveRule(
      event
    );


  /* ==========================================================
     2. OBSERVE / MEMORY
     ========================================================== */

  const memoryObservation =
    observeMemory(
      state,
      ruleReference
    );


  /* ==========================================================
     3. AUTHORITATIVE GOLDEN RULE ENGINE
     ========================================================== */

  const goldenRule =
    runGoldenRule(
      state
    );


  /* ==========================================================
     4. CAPTAIN AI LENA INTERPRETATION
     ========================================================== */

  let captainDecision =
    null;


  if (
    typeof captainAILena ===
    "function"
  ) {

    captainDecision =
      captainAILena(
        state,
        selfTest
      );

  }


  /* ==========================================================
     5. AUTHORITATIVE RISK
     ========================================================== */

  const authoritativeRisk =
    goldenRule
      .assessment
      ?.risk ||
    "UNKNOWN";


  /* ==========================================================
     6. RECORD AGENT DECISION IN MEMORY
     ========================================================== */

  const decisionRecord =
    AgentCoreState
      .memoryCore
      .recordDecision({

        event,

        ruleReference,

        riskLevel:
          authoritativeRisk,

        decision:
          goldenRule
            .decision
            ?.decision ??
          null,

        recommendedAction:
          goldenRule
            .actionSequence ??
          null,

        rationale:
          goldenRule
            .assessment ??
          null

      });


  /* ==========================================================
     7. AUDIT RECORD
     ========================================================== */

  let auditRecord =
    null;


  if (
    AuditLog &&
    typeof AuditLog.record ===
    "function"
  ) {

    auditRecord =
      AuditLog.record({

        event,

        originalEvent:
          ruleReference
            .originalEvent,

        authoritativeEvent:
          ruleReference
            .authoritativeEvent,

        systemState:
          state,

        memoryContext:
          memoryObservation,

        ruleReference,

        ruleAuthority:
          AgentCoreState
            .ruleRegistry
            .authority,

        ruleSourceOfTruth:
          true,

        algorithm:
          "Sextant Golden Rule Engine",

        riskLevel:
          authoritativeRisk,

        decision:
          goldenRule
            .decision,

        recommendedAction:
          goldenRule
            .actionSequence,

        outcome:
          goldenRule
            .updatedState,

        status:
          goldenRule
            .status

      });

  }


  /* ==========================================================
     8. UPDATE AGENT CORE STATE
     ========================================================== */

  AgentCoreState
    .lastExecution = {

      timestamp:
        executionTime,

      event,

      authoritativeEvent:
        ruleReference
          .authoritativeEvent,

      ruleIds:
        ruleReference
          .ruleIds,

      risk:
        authoritativeRisk,

      status:
        goldenRule
          .status

    };


  AgentCoreState
    .executionCount +=
    1;


  /* ==========================================================
     9. RETURN UNIFIED OUTPUT
     ========================================================== */

  return {

    agent:
      "CAPTAIN AI LENA",

    agentCore:
      "SPD v13.1 AUTONOMOUS AGENT CORE",

    executionTime,

    status:
      goldenRule
        .status,

    event,

    ruleReference,

    memoryObservation,

    decisionRecord,

    goldenRule,

    captainDecision,

    risk:
      authoritativeRisk,

    assessment:
      goldenRule
        .assessment,

    decision:
      goldenRule
        .decision,

    actionSequence:
      goldenRule
        .actionSequence,

    updatedState:
      goldenRule
        .updatedState,

    pipeline:
      goldenRule
        .pipeline,

    auditRecord

  };

}


/* ============================================================
   AGENT CORE STATUS
   ============================================================ */

export function getAgentCoreStatus() {

  return {

    initialized:
      AgentCoreState
        .initialized,

    status:
      AgentCoreState
        .status,

    executionCount:
      AgentCoreState
        .executionCount,

    lastExecution:
      AgentCoreState
        .lastExecution,

    goldenRuleAuthority:
      AgentCoreState
        .ruleRegistry
        ?.authority ||
      "NOT INITIALIZED",

    sourceOfTruth:
      AgentCoreState
        .ruleRegistry
        ?.sourceOfTruth ||
      false,

    registryVersion:
      AgentCoreState
        .ruleRegistry
        ?.version ||
      null

  };

}


/* ============================================================
   MEMORY ACCESS
   ============================================================ */

export function getMemoryCore() {

  ensureInitialized();

  return AgentCoreState
    .memoryCore;

}


/* ============================================================
   RULE ENGINE ACCESS
   ============================================================ */

export function getRuleEngine() {

  ensureInitialized();

  return AgentCoreState
    .ruleEngine;

}


/* ============================================================
   AUDIT ACCESS
   ============================================================ */

export function getAuditHistory() {

  if (
    AuditLog &&
    typeof AuditLog.getAll ===
    "function"
  ) {

    return AuditLog
      .getAll();

  }


  return [];

}


export function getRecentAudit(
  limit = 10
) {

  if (
    AuditLog &&
    typeof AuditLog.getRecent ===
    "function"
  ) {

    return AuditLog
      .getRecent(
        limit
      );

  }


  return [];

}


/* ============================================================
   DIRECT RULE RESOLUTION
   ============================================================ */

export function getRuleReference(
  event
) {

  ensureInitialized();

  return resolveRule(
    event
  );

}


/* ============================================================
   GLOBAL BROWSER ACCESS
   ============================================================ */

if (
  typeof window !==
  "undefined"
) {

  window.SextantAgentCore = {

    initialize:
      initializeAgentCore,

    run:
      runAgentCore,

    status:
      getAgentCoreStatus,

    memory:
      getMemoryCore,

    rules:
      getRuleEngine,

    ruleReference:
      getRuleReference,

    audit:
      getAuditHistory,

    recentAudit:
      getRecentAudit

  };

}