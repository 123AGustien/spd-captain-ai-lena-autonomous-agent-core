/**
 * SPD v13.1 — Memory Core
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 * Maintain historical execution context for:
 * - Audit records
 * - Scenario history
 * - Event history
 *
 * The Memory Core does NOT make decisions.
 * The Golden Rule Engine remains authoritative.
 */

const eventMemory = [];
const scenarioMemory = [];
const auditMemory = [];

export function storeEvent(event) {

  const record = {
    timestamp: new Date().toISOString(),
    type: "EVENT",
    data: event
  };

  eventMemory.push(record);

  return record;
}

export function storeScenario(scenario) {

  const record = {
    timestamp: new Date().toISOString(),
    type: "SCENARIO",
    data: scenario
  };

  scenarioMemory.push(record);

  return record;
}

export function storeAuditRecord(auditRecord) {

  const record = {
    timestamp: new Date().toISOString(),
    type: "AUDIT",
    data: auditRecord
  };

  auditMemory.push(record);

  return record;
}

export function getEventMemory() {
  return [...eventMemory];
}

export function getScenarioMemory() {
  return [...scenarioMemory];
}

export function getAuditMemory() {
  return [...auditMemory];
}

export function getMemorySnapshot() {

  return {
    eventCount: eventMemory.length,
    scenarioCount: scenarioMemory.length,
    auditCount: auditMemory.length,

    events: [...eventMemory],
    scenarios: [...scenarioMemory],
    audits: [...auditMemory]
  };
}

export function clearMemory() {

  eventMemory.length = 0;
  scenarioMemory.length = 0;
  auditMemory.length = 0;

  return {
    status: "MEMORY_CLEARED"
  };
}