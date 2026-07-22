/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * AUDIT LOG v1.0
 *
 * Purpose:
 * - Record Agent Core operational events
 * - Record Golden Rule references
 * - Record decisions and recommended actions
 * - Provide an auditable operational history
 *
 * GOVERNANCE:
 * - Golden Rules remain the Source of Truth.
 * - Audit records are append-only during normal operation.
 * - Audit records do not modify rules or system logic.
 */

const AuditLog = (() => {

  const records = [];

  /**
   * Record an operational audit event.
   */
  function record(entry) {

    const auditEntry = {
      id: `AUDIT-${Date.now()}`,
      timestamp: new Date().toISOString(),

      agentCoreVersion:
        entry?.agentCoreVersion ||
        "SPD-CAPTAIN-AI-LENA-CORE",

      event:
        entry?.event ||
        null,

      systemState:
        entry?.systemState ||
        null,

      memoryContext:
        entry?.memoryContext ||
        null,

      ruleReference:
        entry?.ruleReference ||
        null,

      ruleAuthority:
        entry?.ruleAuthority ||
        "SEXTANT_RULE_LIBRARY",

      ruleSourceOfTruth:
        entry?.ruleSourceOfTruth === true,

      algorithm:
        entry?.algorithm ||
        null,

      riskLevel:
        entry?.riskLevel ||
        null,

      decision:
        entry?.decision ||
        null,

      recommendedAction:
        entry?.recommendedAction ||
        null,

      outcome:
        entry?.outcome ||
        null,

      status:
        entry?.status ||
        "RECORDED"
    };

    records.push(auditEntry);

    return auditEntry;
  }


  /**
   * Return the complete audit history.
   */
  function getAll() {

    return JSON.parse(
      JSON.stringify(records)
    );
  }


  /**
   * Return the most recent audit records.
   */
  function getRecent(limit = 10) {

    return records
      .slice(-limit)
      .map(record =>
        JSON.parse(
          JSON.stringify(record)
        )
      );
  }


  /**
   * Find audit records associated
   * with a specific event.
   */
  function findByEvent(eventType) {

    return records
      .filter(record =>
        record.event === eventType
      )
      .map(record =>
        JSON.parse(
          JSON.stringify(record)
        )
      );
  }


  /**
   * Find audit records associated
   * with a specific rule.
   */
  function findByRule(ruleId) {

    return records
      .filter(record => {

        const rules =
          record.ruleReference?.ruleIds || [];

        return rules.includes(ruleId);
      })
      .map(record =>
        JSON.parse(
          JSON.stringify(record)
        )
      );
  }


  /**
   * Return the number of audit records.
   */
  function count() {

    return records.length;
  }


  /**
   * Clear audit records.
   *
   * Intended for simulation reset only.
   */
  function reset() {

    records.length = 0;

  }


  return {
    record,
    getAll,
    getRecent,
    findByEvent,
    findByRule,
    count,
    reset
  };

})();


// Browser environment
if (typeof window !== "undefined") {
  window.AuditLog = AuditLog;
}


// Node / server environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = AuditLog;
}