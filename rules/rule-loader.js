/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * RULE LOADER v1.0
 *
 * Purpose:
 * - Load the controlled Rule Registry
 * - Identify the correct Golden Rule reference
 * - Provide rule metadata to the Rule Engine
 *
 * IMPORTANT:
 * This loader does NOT create, modify, or override Golden Rules.
 * The Sextant Rule Library remains the Source of Truth.
 */

const RuleLoader = (() => {

  let registry = null;

  /**
   * Load the Rule Registry.
   */
  function loadRegistry(ruleRegistry) {

    if (!ruleRegistry || typeof ruleRegistry !== "object") {
      throw new Error("Invalid Rule Registry.");
    }

    registry = ruleRegistry;

    return {
      status: "LOADED",
      registryVersion: registry.version || "UNKNOWN",
      authority: registry.authority || "SEXTANT_RULE_LIBRARY"
    };
  }

  /**
   * Get the complete Rule Registry.
   */
  function getRegistry() {

    if (!registry) {
      throw new Error("Rule Registry has not been loaded.");
    }

    return registry;
  }

  /**
   * Find the Golden Rule reference
   * associated with an operational event.
   */
  function findRule(eventType) {

    if (!registry) {
      throw new Error("Rule Registry has not been loaded.");
    }

    if (!eventType) {
      return null;
    }

    const rule = registry.rules?.[eventType];

    if (!rule) {
      return {
        found: false,
        event: eventType,
        message: "No registered Golden Rule reference found."
      };
    }

    return {
      found: true,
      event: eventType,
      domain: rule.domain,
      ruleIds: rule.ruleIds,
      description: rule.description,
      authority: registry.authority,
      sourceOfTruth: registry.sourceOfTruth === true,
      registryVersion: registry.version
    };
  }

  /**
   * Check whether an event has a registered rule.
   */
  function hasRule(eventType) {

    if (!registry) {
      return false;
    }

    return Boolean(registry.rules?.[eventType]);
  }

  /**
   * Return all registered events.
   */
  function listEvents() {

    if (!registry) {
      return [];
    }

    return Object.keys(registry.rules || {});
  }

  return {
    loadRegistry,
    getRegistry,
    findRule,
    hasRule,
    listEvents
  };

})();


// Browser environment
if (typeof window !== "undefined") {
  window.RuleLoader = RuleLoader;
}


// Node / server environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = RuleLoader;
}