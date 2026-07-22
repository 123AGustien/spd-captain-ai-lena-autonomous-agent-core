/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * MEMORY CORE v1.0
 *
 * Purpose:
 * - Maintain operational memory
 * - Record observed events
 * - Preserve system state
 * - Record Golden Rule references
 * - Record Agent Core decisions
 *
 * GOVERNANCE:
 * Memory provides operational context.
 * Golden Rules remain the Source of Truth.
 * Memory does not create, modify, or override Golden Rules.
 */

const MemoryCore = (() => {

  const memory = {
    events: [],
    states: [],
    decisions: [],
    lastObservedEvent: null,
    lastKnownState: null
  };


  // ==========================================================
  // RECORD EVENT
  // ==========================================================

  function recordEvent(event) {

    const entry = {

      id:
        `EVT-${Date.now()}`,

      timestamp:
        new Date().toISOString(),

      event:
        event?.type ??
        event ??
        null,

      payload:
        event?.payload ??
        {},

      source:
        event?.source ??
        "SPD_AGENT_CORE"

    };

    memory.events.push(
      entry
    );

    memory.lastObservedEvent =
      entry;

    return entry;

  }


  // ==========================================================
  // RECORD SYSTEM STATE
  // ==========================================================

  function recordState(state) {

    const entry = {

      id:
        `STATE-${Date.now()}`,

      timestamp:
        new Date().toISOString(),

      state:
        JSON.parse(
          JSON.stringify(
            state ?? {}
          )
        )

    };

    memory.states.push(
      entry
    );

    memory.lastKnownState =
      entry;

    return entry;

  }


  // ==========================================================
  // RECORD AGENT DECISION
  // ==========================================================

  function recordDecision(
    decision
  ) {

    const entry = {

      id:
        `DEC-${Date.now()}`,

      timestamp:
        new Date().toISOString(),

      event:
        decision?.event ??
        null,

      ruleReference:
        decision?.ruleReference ??
        null,

      riskLevel:
        decision?.riskLevel ??
        null,

      decision:
        decision?.decision ??
        null,

      recommendedAction:
        decision?.recommendedAction ??
        null,

      rationale:
        decision?.rationale ??
        null

    };

    memory.decisions.push(
      entry
    );

    return entry;

  }


  // ==========================================================
  // GET OPERATIONAL CONTEXT
  // ==========================================================

  function getContext() {

    return {

      lastObservedEvent:
        memory.lastObservedEvent,

      lastKnownState:
        memory.lastKnownState,

      recentEvents:
        memory.events.slice(
          -10
        ),

      recentStates:
        memory.states.slice(
          -10
        ),

      recentDecisions:
        memory.decisions.slice(
          -10
        )

    };

  }


  // ==========================================================
  // FIND EVENTS
  // ==========================================================

  function findEvents(
    eventType
  ) {

    return memory.events.filter(
      event =>
        event.event === eventType
    );

  }


  // ==========================================================
  // FIND DECISIONS
  // ==========================================================

  function findDecisions(
    eventType
  ) {

    return memory.decisions.filter(
      decision =>
        decision.event === eventType
    );

  }


  // ==========================================================
  // GET COMPLETE MEMORY SNAPSHOT
  // ==========================================================

  function getSnapshot() {

    return JSON.parse(
      JSON.stringify(
        memory
      )
    );

  }


  // ==========================================================
  // RESET MEMORY
  // ==========================================================
  //
  // Intended for simulation reset only.
  //
  // ==========================================================

  function reset() {

    memory.events = [];

    memory.states = [];

    memory.decisions = [];

    memory.lastObservedEvent =
      null;

    memory.lastKnownState =
      null;

  }


  // ==========================================================
  // PUBLIC API
  // ==========================================================

  return {

    recordEvent,

    recordState,

    recordDecision,

    getContext,

    findEvents,

    findDecisions,

    getSnapshot,

    reset

  };

})();


// ============================================================
// ES MODULE EXPORT
// ============================================================

export default MemoryCore;