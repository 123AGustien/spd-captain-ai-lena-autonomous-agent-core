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
 * - Record system state and memory context
 * - Provide an auditable operational history
 *
 * GOVERNANCE:
 * - Golden Rules remain the Source of Truth.
 * - The SEXTANT GOLDEN RULE ENGINE remains authoritative.
 * - Audit records do not modify Golden Rules.
 * - Audit records do not modify system logic.
 * - Audit records are append-only during normal operation.
 *
 * IMPORTANT:
 * The audit log records what the system observed,
 * what authoritative rule reference was identified,
 * what deterministic decision was produced,
 * and what action was recommended.
 */

const AuditLog = (() => {

  const records = [];


  // ==========================================================
  // RECORD OPERATIONAL AUDIT EVENT
  // ==========================================================

  function record(
    entry = {}
  ) {

    const auditEntry = {

      id:
        `AUDIT-${Date.now()}`,

      timestamp:
        new Date().toISOString(),


      // --------------------------------------------------------
      // AGENT CORE
      // --------------------------------------------------------

      agentCoreVersion:
        entry?.agentCoreVersion ??
        "SPD-CAPTAIN-AI-LENA-CORE",


      // --------------------------------------------------------
      // OBSERVED EVENT
      // --------------------------------------------------------

      event:
        entry?.event ??
        null,


      // --------------------------------------------------------
      // SYSTEM STATE
      // --------------------------------------------------------

      systemState:
        entry?.systemState ??
        null,


      // --------------------------------------------------------
      // MEMORY CONTEXT
      // --------------------------------------------------------

      memoryContext:
        entry?.memoryContext ??
        null,


      // --------------------------------------------------------
      // GOLDEN RULE REFERENCE
      // --------------------------------------------------------

      ruleReference:
        entry?.ruleReference ??
        null,


      // --------------------------------------------------------
      // RULE AUTHORITY
      // --------------------------------------------------------

      ruleAuthority:
        entry?.ruleAuthority ??
        "SEXTANT GOLDEN RULE ENGINE",


      // --------------------------------------------------------
      // SOURCE OF TRUTH
      // --------------------------------------------------------

      ruleSourceOfTruth:
        entry?.ruleSourceOfTruth === true,


      // --------------------------------------------------------
      // ALGORITHM / PIPELINE
      // --------------------------------------------------------

      algorithm:
        entry?.algorithm ??
        null,


      // --------------------------------------------------------
      // AUTHORITATIVE RISK
      // --------------------------------------------------------

      riskLevel:
        entry?.riskLevel ??
        null,


      // --------------------------------------------------------
      // AUTHORITATIVE DECISION
      // --------------------------------------------------------

      decision:
        entry?.decision ??
        null,


      // --------------------------------------------------------
      // RECOMMENDED ACTION
      // --------------------------------------------------------

      recommendedAction:
        entry?.recommendedAction ??
        null,


      // --------------------------------------------------------
      // RESULTING OUTCOME
      // --------------------------------------------------------

      outcome:
        entry?.outcome ??
        null,


      // --------------------------------------------------------
      // AUDIT STATUS
      // --------------------------------------------------------

      status:
        entry?.status ??
        "RECORDED"

    };


    // --------------------------------------------------------
    // APPEND AUDIT RECORD
    // --------------------------------------------------------

    records.push(
      auditEntry
    );


    return auditEntry;

  }


  // ==========================================================
  // RETURN COMPLETE AUDIT HISTORY
  // ==========================================================

  function getAll() {

    return JSON.parse(
      JSON.stringify(
        records
      )
    );

  }


  // ==========================================================
  // RETURN MOST RECENT AUDIT RECORDS
  // ==========================================================

  function getRecent(
    limit = 10
  ) {

    return records
      .slice(
        -limit
      )
      .map(
        record =>
          JSON.parse(
            JSON.stringify(
              record
            )
          )
      );

  }


  // ==========================================================
  // FIND RECORDS BY EVENT
  // ==========================================================

  function findByEvent(
    eventType
  ) {

    return records
      .filter(
        record =>
          record.event ===
          eventType
      )
      .map(
        record =>
          JSON.parse(
            JSON.stringify(
              record
            )
          )
      );

  }


  // ==========================================================
  // FIND RECORDS BY GOLDEN RULE ID
  // ==========================================================

  function findByRule(
    ruleId
  ) {

    return records
      .filter(
        record => {

          const rules =
            record
              .ruleReference
              ?.ruleIds ??
            [];


          return rules.includes(
            ruleId
          );

        }
      )
      .map(
        record =>
          JSON.parse(
            JSON.stringify(
              record
            )
          )
      );

  }


  // ==========================================================
  // FIND RECORDS BY RISK LEVEL
  // ==========================================================

  function findByRisk(
    riskLevel
  ) {

    return records
      .filter(
        record =>
          record.riskLevel ===
          riskLevel
      )
      .map(
        record =>
          JSON.parse(
            JSON.stringify(
              record
            )
          )
      );

  }


  // ==========================================================
  // FIND RECORDS BY DECISION
  // ==========================================================

  function findByDecision(
    decision
  ) {

    return records
      .filter(
        record =>
          record.decision ===
          decision
      )
      .map(
        record =>
          JSON.parse(
            JSON.stringify(
              record
            )
          )
      );

  }


  // ==========================================================
  // RETURN AUDIT RECORD COUNT
  // ==========================================================

  function count() {

    return records.length;

  }


  // ==========================================================
  // GET LATEST AUDIT RECORD
  // ==========================================================

  function getLatest() {

    if (
      records.length === 0
    ) {

      return null;

    }


    return JSON.parse(
      JSON.stringify(
        records[
          records.length - 1
        ]
      )
    );

  }


  // ==========================================================
  // RESET AUDIT HISTORY
  // ==========================================================
  //
  // Intended for simulation reset only.
  //
  // Normal operational mode should not clear audit history.
  //
  // ==========================================================

  function reset() {

    records.length = 0;

  }


  // ==========================================================
  // PUBLIC API
  // ==========================================================

  return {

    record,

    getAll,

    getRecent,

    getLatest,

    findByEvent,

    findByRule,

    findByRisk,

    findByDecision,

    count,

    reset

  };

})();


// ============================================================
// ES MODULE EXPORT
// ============================================================

export default AuditLog;