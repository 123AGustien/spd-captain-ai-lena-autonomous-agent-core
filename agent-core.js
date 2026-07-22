/**
 * SPD v13.1 — CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * FILE:
 * agent-core.js
 *
 * PURPOSE:
 * Central integration bridge between the existing cockpit
 * and the deterministic Sextant architecture.
 *
 * ARCHITECTURE:
 *
 * DATA
 *   ↓
 * MEMORY CORE
 *   ↓
 * RULE REGISTRY
 *   ↓
 * RULE ENGINE
 *   ↓
 * GOLDEN RULE ENGINE
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
 * 1. The Sextant Golden Rule Engine remains authoritative.
 * 2. Golden Rules remain the Source of Truth.
 * 3. Captain AI Lena does not override Golden Rule decisions.
 * 4. Rule Engine resolves authoritative rule references.
 * 5. Memory Core records operational context.
 * 6. Audit Log records the execution history.
 * 7. This module orchestrates the system but does not
 *    replace the deterministic assessment engine.
 *
 * IMPORTANT:
 *
 * This file is designed to preserve the existing cockpit UI.
 * It provides the backend orchestration layer required to
 * connect the current screen to the authoritative rules.
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

import {

  MemoryCore

} from "./memory/memory-core.js";


/* ============================================================
   RULE ENGINE
   ============================================================ */

import {

  RuleEngine

} from "./rules/rule-engine.js";


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
    null,

  lastExecution:
    null,

  executionCount:
    0,

  status:
    "INITIALIZING"

};


/* ============================================================
   INITIALIZE AGENT CORE
   ============================================================ */

/**
 * Initialize the Agent Core.
 *
 * The Rule Registry is supplied by the caller.
 *
 * Example:
 *
 * const registry =
 *   await fetch("./rules/rule-registry.json")
 *     .then(response => response.json());
 *
 * initializeAgentCore(registry);
 */

export function initializeAgentCore(
  ruleRegistry
) {

  if (!ruleRegistry) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry not supplied."
    );

  }


  /* ==========================================================
     VERIFY RULE REGISTRY AUTHORITY
     ========================================================== */

  if (
    ruleRegistry.sourceOfTruth !== true
  ) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry is not marked as Source of Truth."
    );

  }


  if (
    ruleRegistry.status !==
    "ACTIVE"
  ) {

    throw new Error(
      "Agent Core initialization failed: Rule Registry is not ACTIVE."
    );

  }


  /* ==========================================================
     INITIALIZE RULE ENGINE
     ========================================================== */

  AgentCoreState.ruleRegistry =
    ruleRegistry;


  AgentCoreState.ruleEngine =
    new RuleEngine(
      ruleRegistry
    );


  /* ==========================================================
     INITIALIZE MEMORY CORE
     ========================================================== */

  AgentCoreState.memoryCore =
    new MemoryCore();


  /* ==========================================================
     INITIALIZE STATE
     ========================================================== */

  AgentCoreState.initialized =
    true;


  AgentCoreState.status =
    "READY";


  /* ==========================================================
     AUDIT INITIALIZATION
     ========================================================== */

  AuditLog.record({

    event:
      "AGENT_CORE_INITIALIZED",

    ruleAuthority:
      ruleRegistry.authority,

    ruleSourceOfTruth:
      true,

    algorithm:
      "SPD CAPTAIN AI LENA AUTONOMOUS AGENT CORE",

    status:
      "READY"

  });


  return {

    status:
      "READY",

    ruleRegistry:
      ruleRegistry,

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
   RESOLVE AUTHORITATIVE RULE
   ============================================================ */

/**
 * Resolve the Golden Rule associated with
 * the current operational event.
 *
 * The registry is authoritative.
 */

function resolveRule(
  event
) {

  ensureInitialized();


  const ruleEntry =
    AgentCoreState
      .ruleRegistry
      .rules?.[
        event
      ];


  if (!ruleEntry) {

    return {

      event,

      domain:
        null,

      ruleIds:
        [],

      description:
        "No registered Golden Rule found for this event.",

      authority:
        AgentCoreState
          .ruleRegistry
          .authority,

      sourceOfTruth:
        AgentCoreState
          .ruleRegistry
          .sourceOfTruth

    };

  }


  return {

    event,

    domain:
      ruleEntry.domain,

    ruleIds:
      ruleEntry.ruleIds || [],

    description:
      ruleEntry.description,

    authority:
      AgentCoreState
        .ruleRegistry
        .authority,

    sourceOfTruth:
      AgentCoreState
        .ruleRegistry
        .sourceOfTruth

  };

}


/* ============================================================
   MEMORY OBSERVATION
   ============================================================ */

/**
 * Record the observed operational state.
 */

function observeMemory(
  state,
  ruleReference
) {

  ensureInitialized();


  const observation = {

    event:
      state.event || "NORMAL",

    state: {
      ...state
    },

    ruleReference,

    timestamp:
      new Date().toISOString()

  };


  /*
   * The Memory Core is intentionally treated
   * as operational context.
   *
   * It does not alter the Golden Rule Engine.
   */

  if (
    typeof AgentCoreState
      .memoryCore
      .record ===
    "function"
  ) {

    AgentCoreState
      .memoryCore
      .record(
        observation
      );

  }


  return observation;

}


/* ============================================================
   CAPTAIN AI LENA EXECUTION
   ============================================================ */

/**
 * Execute the complete Agent Core.
 *
 * Authoritative flow:
 *
 * DATA
 * → MEMORY
 * → RULE RESOLUTION
 * → GOLDEN RULE ENGINE
 * → CAPTAIN AI LENA
 * → AUDIT
 * → OUTPUT
 */

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
     3. AUTHORITATIVE GOLDEN RULE EXECUTION
     ========================================================== */

  const goldenRule =
    runGoldenRule(
      state
    );


  /* ==========================================================
     4. CAPTAIN AI LENA INTERPRETATION
     ========================================================== */

  const captainDecision =
    captainAILena(
      state,
      selfTest
    );


  /* ==========================================================
     5. AUTHORITATIVE RISK
     ========================================================== */

  const authoritativeRisk =
    goldenRule
      .assessment
      ?.risk ||
    "UNKNOWN";


  /* ==========================================================
     6. AUDIT RECORD
     ========================================================== */

  const auditRecord =
    AuditLog.record({

      event,

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


  /* ==========================================================
     7. UPDATE AGENT CORE STATE
     ========================================================== */

  AgentCoreState
    .lastExecution = {

      timestamp:
        executionTime,

      event,

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
     8. RETURN UNIFIED OUTPUT
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
      false

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

  return AuditLog
    .getAll();

}


export function getRecentAudit(
  limit = 10
) {

  return AuditLog
    .getRecent(
      limit
    );

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

/*
 * These references allow the existing cockpit
 * to inspect the Agent Core without changing
 * the visual interface.
 */

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