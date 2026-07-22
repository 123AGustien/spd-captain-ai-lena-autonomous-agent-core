/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * RULE ENGINE GATEWAY v1.0
 *
 * Purpose:
 * - Connect operational events to the Sextant Golden Rule Registry
 * - Identify the applicable authoritative Golden Rule
 * - Provide controlled rule references to Captain AI Lena
 *
 * IMPORTANT GOVERNANCE:
 *
 * The SEXTANT GOLDEN RULE ENGINE remains the SINGLE
 * AUTHORITATIVE deterministic assessment and decision layer.
 *
 * The Golden Rules remain the SOURCE OF TRUTH.
 *
 * This Rule Engine Gateway:
 *
 * - Does NOT create rules
 * - Does NOT modify rules
 * - Does NOT override rules
 * - Does NOT independently calculate authoritative risk
 * - Does NOT replace goldenRuleEngine.js
 *
 * It only identifies and validates the applicable
 * Golden Rule reference before the authoritative
 * Golden Rule Engine performs the deterministic assessment.
 */

const RuleEngine = (() => {

  let ruleLoader = null;

  let initialized = false;


  // ==========================================================
  // INITIALIZE RULE ENGINE GATEWAY
  // ==========================================================

  function initialize(
    loader
  ) {

    if (!loader) {

      throw new Error(
        "RuleLoader is required."
      );

    }


    if (
      typeof loader.findRule !==
      "function"
    ) {

      throw new Error(
        "Invalid RuleLoader."
      );

    }


    ruleLoader =
      loader;


    initialized =
      true;


    return {

      status:
        "READY",

      authority:
        "SEXTANT GOLDEN RULE ENGINE",

      sourceOfTruth:
        "SEXTANT GOLDEN RULE LIBRARY",

      ruleModificationAllowed:
        false

    };

  }


  // ==========================================================
  // EVALUATE EVENT
  // ==========================================================
  //
  // This function identifies the applicable Golden Rule.
  //
  // It does NOT execute the authoritative Golden Rule.
  //
  // The actual deterministic decision remains with:
  //
  //     goldenRuleEngine.js
  //
  // ==========================================================

  function evaluate(
    event
  ) {

    if (!initialized) {

      throw new Error(
        "Rule Engine has not been initialized."
      );

    }


    const eventType =
      typeof event === "string"
        ? event
        : event?.type;


    // --------------------------------------------------------
    // INVALID EVENT
    // --------------------------------------------------------

    if (!eventType) {

      return {

        status:
          "INVALID",

        event:
          null,

        ruleApplied:
          false,

        message:
          "No operational event type supplied."

      };

    }


    // --------------------------------------------------------
    // FIND AUTHORITATIVE RULE REFERENCE
    // --------------------------------------------------------

    const ruleReference =
      ruleLoader.findRule(
        eventType
      );


    // --------------------------------------------------------
    // NO AUTHORITATIVE RULE FOUND