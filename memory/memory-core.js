/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 * MEMORY CORE v1.0
 *
 * Memory provides operational context.
 * Golden Rules remain the Source of Truth.
 */

const MemoryCore = (() => {

  const memory = {
    events: [],
    states: [],
    decisions: [],
    lastObservedEvent: null,
    lastKnownState: null
  };

  function recordEvent(event) {
    const entry = {
      id: `EVT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: event?.type || event,
      payload: event?.payload || {},
      source: event?.source || "SPD_AGENT_CORE"
    };

    memory.events.push(entry);
    memory.lastObservedEvent = entry;

    return entry;
  }

  function recordState(state) {
    const entry = {
      id: `STATE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      state: JSON.parse(JSON.stringify(state || {}))
    };

    memory.states.push(entry);
    memory.lastKnownState = entry;

    return entry;
  }

  function recordDecision(decision) {
    const entry = {
      id: `DEC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: decision?.event || null,
      ruleReference: decision?.ruleReference || null,
      riskLevel: decision?.riskLevel || null,
      decision: decision?.decision || null,
      recommendedAction: decision?.recommendedAction || null,
      rationale: decision?.rationale || null
    };

    memory.decisions.push(entry);

    return entry;
  }

  function getContext() {
    return {
      lastObservedEvent: memory.lastObservedEvent,
      lastKnownState: memory.lastKnownState,
      recentEvents: memory.events.slice(-10),
      recentStates: memory.states.slice(-10),
      recentDecisions: memory.decisions.slice(-10)
    };
  }

  function findEvents(eventType) {
    return memory.events.filter(
      event => event.event === eventType
    );
  }

  function findDecisions(eventType) {
    return memory.decisions.filter(
      decision => decision.event === eventType
    );
  }

  function getSnapshot() {
    return JSON.parse(JSON.stringify(memory));
  }

  function reset() {
    memory.events = [];
    memory.states = [];
    memory.decisions = [];
    memory.lastObservedEvent = null;
    memory.lastKnownState = null;
  }

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

if (typeof window !== "undefined") {
  window.MemoryCore = MemoryCore;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MemoryCore;
}