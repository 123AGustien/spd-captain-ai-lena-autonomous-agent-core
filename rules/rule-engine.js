/**
 * SPD CAPTAIN AI LENA
 * AUTONOMOUS AGENT CORE
 *
 * FILE:
 * rules/rule-engine.js
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


/* ============================================================
   RULE ENGINE STATE
   ============================================================ */

const RuleEngine = (() => {

  let ruleLoader = null;

  let initialized = false;


  /* ==========================================================
     INITIALIZE RULE ENGINE GATEWAY
     ========================================================== */

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


  /* ==========================================================
     VERIFY INITIALIZATION
     ========================================================== */

  function ensureInitialized() {

    if (!initialized) {

      throw new Error(
        "Rule Engine has not been initialized."
      );

    }

  }


  /* ==========================================================
     EVALUATE EVENT
     ========================================================== */
  //
  // This function identifies the applicable Golden Rule.
  //
  // It does NOT execute the authoritative Golden Rule.
  //
  // The actual deterministic assessment and decision remain
  // exclusively with:
  //
  //     goldenRuleEngine.js
  //
  // ==========================================================

  function evaluate(
    event
  ) {

    ensureInitialized();


    /* ========================================================
       EXTRACT EVENT TYPE
       ======================================================== */

    const eventType =
      typeof event === "string"
        ? event
        : event?.type;


    /* ========================================================
       INVALID EVENT
       ======================================================== */

    if (!eventType) {

      return {

        status:
          "INVALID",

        event:
          null,

        ruleApplied:
          false,

        ruleReference:
          null,

        message:
          "No operational event type supplied."

      };

    }


    /* ========================================================
       FIND AUTHORITATIVE RULE REFERENCE
       ======================================================== */

    const ruleReference =
      ruleLoader.findRule(
        eventType
      );


    /* ========================================================
       NO AUTHORITATIVE RULE FOUND
       ======================================================== */

    if (
      !ruleReference ||
      ruleReference.found !== true
    ) {

      return {

        status:
          "NO_RULE",

        event:
          eventType,

        ruleApplied:
          false,

        ruleReference:
          ruleReference ||
          {

            found:
              false,

            event:
              eventType,

            authority:
              "SEXTANT_RULE_LIBRARY",

            sourceOfTruth:
              false,

            message:
              "No registered Golden Rule reference found."

          },

        authoritativeAssessment:
          false,

        authoritativeDecision:
          false,

        message:
          "No registered Golden Rule reference found. " +
          "Agent Core must not invent, assume, or substitute a rule."

      };

    }


    /* ========================================================
       VALIDATE RULE AUTHORITY
       ======================================================== */

    if (
      ruleReference.sourceOfTruth !==
      true
    ) {

      return {

        status:
          "AUTHORITY_ERROR",

        event:
          eventType,

        ruleApplied:
          false,

        ruleReference,

        authoritativeAssessment:
          false,

        authoritativeDecision:
          false,

        message:
          "Referenced rule is not verified as Source of Truth."

      };

    }


    /* ========================================================
       VALIDATE RULE IDS
       ======================================================== */

    if (
      !Array.isArray(
        ruleReference.ruleIds
      )
    ) {

      return {

        status:
          "INVALID_RULE_REFERENCE",

        event:
          eventType,

        ruleApplied:
          false,

        ruleReference,

        authoritativeAssessment:
          false,

        authoritativeDecision:
          false,

        message:
          "Golden Rule reference does not contain a valid rule ID collection."

      };

    }


    /* ========================================================
       AUTHORITATIVE RULE REFERENCE CONFIRMED
       ======================================================== */

    return {

      status:
        "RULE_RESOLVED",

      event:
        eventType,

      ruleApplied:
        true,

      ruleReference,

      authoritativeAssessment:
        "DELEGATED_TO_GOLDEN_RULE_ENGINE",

      authoritativeDecision:
        "DELEGATED_TO_GOLDEN_RULE_ENGINE",

      authority:
        ruleReference.authority,

      sourceOfTruth:
        ruleReference.sourceOfTruth,

      registryVersion:
        ruleReference.registryVersion,

      message:
        "Authoritative Golden Rule reference resolved. " +
        "Assessment and decision delegated to Golden Rule Engine."

    };

  }


  /* ==========================================================
     CHECK INITIALIZATION STATUS
     ========================================================== */

  function isInitialized() {

    return initialized;

  }


  /* ==========================================================
     GET ENGINE STATUS
     ========================================================== */

  function getStatus() {

    return {

      initialized,

      status:
        initialized
          ? "READY"
          : "NOT_INITIALIZED",

      authority:
        "SEXTANT GOLDEN RULE ENGINE",

      sourceOfTruth:
        "SEXTANT GOLDEN RULE LIBRARY",

      ruleModificationAllowed:
        false

    };

  }


  /* ==========================================================
     GET RULE LOADER
     ========================================================== */

  function getRuleLoader() {

    ensureInitialized();

    return ruleLoader;

  }


  /* ==========================================================
     PUBLIC API
     ========================================================== */

  return {

    initialize,

    evaluate,

    isInitialized,

    getStatus,

    getRuleLoader

  };

})();


/* ============================================================
   ES MODULE EXPORT
   ============================================================ */

export default RuleEngine;