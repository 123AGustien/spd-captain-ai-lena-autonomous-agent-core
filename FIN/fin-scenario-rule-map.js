/**
 * SPD v13 — FIN Scenario Rule Map
 * Captain AI Lena Autonomous Agent Core
 *
 * Purpose:
 * Maps operator-selected FIN scenarios to the applicable
 * FIN rules available in the FIN rule library.
 *
 * Flow:
 * OPERATOR SELECTS SCENARIO
 *        ↓
 * FIN SCENARIO RULE MAP
 *        ↓
 * OPERATOR SELECTS APPLICABLE RULE
 *        ↓
 * RULE ENGINE LOADS FIN-XXX
 *        ↓
 * CAPTAIN AI LENA EVALUATES
 *        ↓
 * DECISION + RULE-GUIDED ACTIONS
 */

const FIN_SCENARIO_RULE_MAP = {

  FX_STRESS: {
    scenarioId: "FX_STRESS",
    scenarioName: "Foreign Exchange Stress",
    domain: "FIN",
    rules: [
      {
        ruleId: "FIN-001",
        ruleName: "Foreign Exchange Stress",
        status: "ACTIVE"
      }
    ]
  },

  BANKING_STRESS: {
    scenarioId: "BANKING_STRESS",
    scenarioName: "Banking System Stress",
    domain: "FIN",
    rules: [
      {
        ruleId: "FIN-004",
        ruleName: "Banking System Stress",
        status: "ACTIVE"
      }
    ]
  }

};


/**
 * Return all FIN scenarios.
 */
function getFINScenarios() {
  return Object.values(FIN_SCENARIO_RULE_MAP);
}


/**
 * Return rules available for a selected FIN scenario.
 */
function getFINRulesForScenario(scenarioId) {

  const scenario = FIN_SCENARIO_RULE_MAP[scenarioId];

  if (!scenario) {
    return [];
  }

  return scenario.rules;
}


/**
 * Validate that a selected rule belongs
 * to the selected FIN scenario.
 */
function validateFINRuleSelection(scenarioId, ruleId) {

  const rules = getFINRulesForScenario(scenarioId);

  const selectedRule = rules.find(
    rule => rule.ruleId === ruleId
  );

  if (!selectedRule) {

    return {
      valid: false,
      status: "RULE_SCENARIO_MISMATCH",
      message:
        `Rule ${ruleId} is not registered for FIN scenario ${scenarioId}.`
    };

  }

  return {
    valid: true,
    status: "VALID",
    scenarioId,
    ruleId: selectedRule.ruleId,
    ruleName: selectedRule.ruleName
  };

}


/**
 * Prepare the selected FIN rule
 * for Captain AI Lena decision processing.
 */
function prepareFINRuleContext(scenarioId, ruleId) {

  const validation =
    validateFINRuleSelection(scenarioId, ruleId);

  if (!validation.valid) {
    return validation;
  }

  return {
    valid: true,
    domain: "FIN",
    scenarioId,
    ruleId,
    ruleName: validation.ruleName,
    status: "RULE_CONTEXT_READY",
    decisionAuthority: "CAPTAIN_AI_LENA"
  };

}


// Export for browser / module use.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FIN_SCENARIO_RULE_MAP,
    getFINScenarios,
    getFINRulesForScenario,
    validateFINRuleSelection,
    prepareFINRuleContext
  };
}