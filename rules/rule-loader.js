/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * RULE LOADER v1.0
 *
 * Purpose:
 * - Load the controlled Golden Rule Registry
 * - Identify the applicable Golden Rule reference
 * - Provide rule metadata to the Rule Engine
 *
 * GOVERNANCE:
 * The Sextant Golden Rule Engine remains the
 * SINGLE AUTHORITATIVE deterministic decision layer.
 *
 * The Golden Rules remain the Source of Truth.
 *
 * This loader does not create, modify, or override rules.
 */

const RuleLoader = (() => {

  let registry = null;


  // ==========================================================
  // LOAD GOLDEN RULE REGISTRY
  // ==========================================================

  function loadRegistry(
    ruleRegistry
  ) {

    if (
      !ruleRegistry ||
      typeof ruleRegistry !== "object"
    ) {

      throw new Error(
        "Invalid Golden Rule Registry."
      );

    }


    if (
      !ruleRegistry.rules ||
      typeof ruleRegistry.rules !== "object"
    ) {

      throw new Error(
        "Golden Rule Registry does not contain a valid rules collection."
      );

    }


    registry =
      ruleRegistry;


    return {

      status:
        "LOADED",

      registryVersion:
        registry.version ??
        "UNKNOWN",

      authority:
        registry.authority ??
        "SEXTANT_RULE_LIBRARY",

      sourceOfTruth:
        registry.sourceOfTruth === true

    };

  }


  // ==========================================================
  // GET COMPLETE REGISTRY
  // ==========================================================

  function getRegistry() {

    if (!registry) {

      throw new Error(
        "Golden Rule Registry has not been loaded."
      );

    }

    return registry;

  }


  // ==========================================================
  // FIND GOLDEN RULE REFERENCE
  // ==========================================================
  //
  // Returns the authoritative rule reference associated
  // with an operational event.
  //
  // This does not execute the Golden Rule.
  //
  // ==========================================================

  function findRule(
    eventType
  ) {

    if (!registry) {

      throw new Error(
        "Golden Rule Registry has not been loaded."
      );

    }


    if (!eventType) {

      return {

        found:
          false,

        event:
          null,

        message:
          "No event type supplied."

      };

    }


    const rule =
      registry.rules?.[
        eventType
      ];


    // --------------------------------------------------------
    // NO RULE FOUND
    // --------------------------------------------------------

    if (!rule) {

      return {

        found:
          false,

        event:
          eventType,

        authority:
          registry.authority ??
          "SEXTANT_RULE_LIBRARY",

        sourceOfTruth:
          registry.sourceOfTruth === true,

        message:
          "No registered Golden Rule reference found. " +
          "Agent Core must not invent or assume a rule."

      };

    }


    // --------------------------------------------------------
    // RULE FOUND
    // --------------------------------------------------------

    return {

      found:
        true,

      event:
        eventType,

      domain:
        rule.domain ??
        null,

      ruleIds:
        Array.isArray(
          rule.ruleIds
        )
          ? rule.ruleIds
          : [],

      description:
        rule.description ??
        null,

      authority:
        registry.authority ??
        "SEXTANT_RULE_LIBRARY",

      sourceOfTruth:
        registry.sourceOfTruth === true,

      registryVersion:
        registry.version ??
        "UNKNOWN"

    };

  }


  // ==========================================================
  // CHECK RULE EXISTENCE
  // ==========================================================

  function hasRule(
    eventType
  ) {

    if (!registry) {

      return false;

    }


    return Boolean(
      registry.rules?.[
        eventType
      ]
    );

  }


  // ==========================================================
  // LIST REGISTERED EVENTS
  // ==========================================================

  function listEvents() {

    if (!registry) {

      return [];

    }


    return Object.keys(
      registry.rules ??
      {}
    );

  }


  // ==========================================================
  // GET REGISTERED RULE DOMAINS
  // ==========================================================

  function listDomains() {

    if (!registry) {

      return [];

    }


    const domains =
      Object.values(
        registry.rules ??
        {}
      )
      .map(
        rule =>
          rule.domain
      )
      .filter(
        Boolean
      );


    return [
      ...new Set(
        domains
      )
    ];

  }


  // ==========================================================
  // PUBLIC API
  // ==========================================================

  return {

    loadRegistry,

    getRegistry,

    findRule,

    hasRule,

    listEvents,

    listDomains

  };

})();


// ============================================================
// ES MODULE EXPORT
// ============================================================

export default RuleLoader;