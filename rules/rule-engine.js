/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * RULE ENGINE v1.0
 *
 * Purpose:
 * - Connect operational events to the Sextant Golden Rules
 * - Use RuleLoader to identify authoritative rule references
 * - Return deterministic rule guidance to the Agent Core
 *
 * GOVERNANCE:
 * - Golden Rules remain the Source of Truth.
 * - This engine does not invent or modify rules.
 * - This engine does not override Golden Rules.
 * - If no authoritative rule is found, the event is flagged for review.
 */

const RuleEngine = (() => {

  let ruleLoader = null;

  /**
   * Connect the Rule Loader.
   */
  function initialize(loader) {

    if (!loader) {
      throw new Error("RuleLoader is required.");
    }

    if (typeof loader.findRule !== "function") {
      throw new Error("Invalid RuleLoader.");
    }

    ruleLoader = loader;

    return {
      status: "READY",
      authority: "SEXTANT_RULE_LIBRARY",
      sourceOfTruth: true
    };
  }


  /**
   * Evaluate an operational event
   * against the registered Golden Rules.
   */
  function evaluate(event) {

    if (!ruleLoader) {
      throw new Error("RuleEngine has not been initialized.");
    }

    const eventType =
      typeof event === "string"
        ? event
        : event?.type;

    if (!eventType) {
      return {
        status: "INVALID",
        event: null,
        message: "No event type supplied."
      };
    }

    const ruleReference =
      ruleLoader.findRule(eventType);

    /**
     * No registered Golden Rule found.
     */
    if (!ruleReference || !ruleReference.found) {

      return {
        status: "REVIEW_REQUIRED",
        event: eventType,
        ruleApplied: false,
        authority: "SEXTANT_RULE_LIBRARY",
        sourceOfTruth: true,
        message:
          "No authoritative Golden Rule reference found. " +
          "Agent Core must not invent or assume a rule."
      };
    }

    /**
     * Authoritative rule reference found.
     */
    return {
      status: "RULE_IDENTIFIED",
      event: eventType,

      ruleApplied: true,

      domain: ruleReference.domain,

      ruleIds: ruleReference.ruleIds,

      ruleDescription:
        ruleReference.description,

      authority:
        ruleReference.authority ||
        "SEXTANT_RULE_LIBRARY",

      sourceOfTruth:
        ruleReference.sourceOfTruth === true,

      registryVersion:
        ruleReference.registryVersion,

      guidanceStatus:
        "AUTHORITATIVE_RULE_REFERENCE_IDENTIFIED",

      nextStep:
        "Agent Core may now retrieve and apply the corresponding Golden Rule."
    };
  }


  /**
   * Check whether an event has
   * an authoritative rule reference.
   */
  function hasAuthoritativeRule(eventType) {

    if (!ruleLoader) {
      return false;
    }

    return ruleLoader.hasRule(eventType);
  }


  /**
   * Return Rule Engine status.
   */
  function getStatus() {

    return {
      initialized: Boolean(ruleLoader),
      authority: "SEXTANT_RULE_LIBRARY",
      sourceOfTruth: true,
      ruleModificationAllowed: false
    };
  }


  return {
    initialize,
    evaluate,
    hasAuthoritativeRule,
    getStatus
  };

})();


// Browser environment
if (typeof window !== "undefined") {
  window.RuleEngine = RuleEngine;
}


// Node / server environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = RuleEngine;
}