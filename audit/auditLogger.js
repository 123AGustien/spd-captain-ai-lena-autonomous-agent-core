/**
 * SPD v13.1 — Audit Logger
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 * Create a deterministic, traceable audit record for every
 * Golden Rule Engine execution.
 *
 * The audit layer records what happened.
 * It does not make decisions.
 *
 * FIN Domain Enhancement:
 * FIN executions may explicitly record:
 * - FIN Rule ID
 * - FIN Rule Result
 *
 * These fields provide direct audit traceability between
 * financial-domain scenario execution and the rule that
 * produced the domain assessment.
 */

export function createAuditRecord({
  engineIdentity = "SPD v13.1 — Sextant Resilience",
  domain = null,

  // Generic rule identification
  ruleId = null,

  // Explicit FIN domain audit traceability
  finRuleId = null,
  finRuleResult = null,

  scenario = null,
  observedState = null,
  verifiedState = null,
  assessment = null,
  riskLevel = null,
  decision = null,
  action = null,
  actionSequence = [],
  updatedState = null,
  validationStatus = null,
  executionStatus = "COMPLETED"
} = {}) {

  return {
    timestamp: new Date().toISOString(),

    engineIdentity,

    domain,

    ruleId,

    finRuleId,

    finRuleResult,

    scenario,

    goldenRulePipeline: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ],

    observedState,

    verifiedState,

    assessment,

    riskLevel,

    decision,

    action,

    actionSequence,

    updatedState,

    validationStatus,

    executionStatus
  };
}

export function validateAuditRecord(record) {

  if (!record) {
    return {
      valid: false,
      reason: "Audit record is missing"
    };
  }

  const requiredFields = [
    "timestamp",
    "engineIdentity",
    "goldenRulePipeline",
    "executionStatus"
  ];

  const missingFields = requiredFields.filter(
    field => record[field] === undefined || record[field] === null
  );

  return {
    valid: missingFields.length === 0,
    missingFields
  };
}