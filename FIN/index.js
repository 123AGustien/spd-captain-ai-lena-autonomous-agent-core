/*
 * SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
 * Captain AI Lena Autonomous Agent Core
 *
 * FIN Domain Rule Registry
 *
 * DATA → ALGORITHMS → COMPUTE
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Purpose:
 * Provides the Financial Resilience (FIN) domain rule registry,
 * rule selection, scenario loading, and execution request generation.
 */

const FIN_DOMAIN = {
  id: "FIN",
  name: "Financial Resilience",
  description:
    "Financial system stress, liquidity, foreign exchange, banking stability, and financial contagion resilience.",
  status: "ACTIVE"
};

/*
 * FIN RULE REGISTRY
 *
 * Each FIN rule has:
 * - A unique Rule ID
 * - A rule name
 * - A rule documentation file
 * - A dedicated scenario
 * - A financial resilience category
 * - An operational status
 */

const FIN_RULES = {
  "FIN-001": {
    id: "FIN-001",
    name: "Foreign Exchange Stress",
    file: "./FIN-001.md",
    scenario: "FX_SHOCK",
    category: "Foreign Exchange Resilience",
    status: "ACTIVE"
  },

  "FIN-002": {
    id: "FIN-002",
    name: "Financial Stress",
    file: "./FIN-002.md",
    scenario: "FINANCIAL_STRESS",
    category: "Financial System Resilience",
    status: "ACTIVE"
  },

  "FIN-003": {
    id: "FIN-003",
    name: "Liquidity Stress",
    file: "./FIN-003.md",
    scenario: "LIQUIDITY_STRESS",
    category: "Liquidity Resilience",
    status: "ACTIVE"
  },

  "FIN-004": {
    id: "FIN-004",
    name: "Banking Stress",
    file: "./FIN-004.md",
    scenario: "BANKING_STRESS",
    category: "Banking System Stability",
    status: "ACTIVE"
  },

   "FIN-005": {
    id: "FIN-005",
    name: "Inflation Shock",
    file: "./FIN-005.md",
    scenario: "INFLATION_SHOCK",
    category: "Inflation Risk",
    status: "ACTIVE"
  }
};

/*
 * SELECT FIN RULE
 *
 * Selects one specific FIN rule from the FIN domain.
 *
 * Example:
 * selectFINRule("FIN-001")
 */

function selectFINRule(ruleId) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "ERROR",
      domain: FIN_DOMAIN.id,
      message: `FIN rule ${ruleId} not found`
    };
  }

  return {
    status: "READY",
    domain: FIN_DOMAIN.id,
    ruleId: rule.id,
    ruleName: rule.name,
    scenario: rule.scenario,
    category: rule.category,
    ruleFile: rule.file
  };
}

/*
 * LOAD FIN SCENARIO
 *
 * Loads the scenario associated with the selected FIN rule.
 *
 * Example:
 * loadFINScenario("FIN-001")
 *
 * Result:
 * FIN-001 → FX_SHOCK
 */

function loadFINScenario(ruleId) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "ERROR",
      domain: FIN_DOMAIN.id,
      message: `Unable to load scenario. Rule ${ruleId} not registered.`
    };
  }

  return {
    status: "ACTIVE",
    domain: FIN_DOMAIN.id,
    ruleId: rule.id,
    ruleName: rule.name,
    scenario: rule.scenario,
    category: rule.category,
    scenarioSource: rule.file
  };
}

/*
 * CREATE FIN EXECUTION REQUEST
 *
 * Creates an autonomous execution request for the selected
 * FIN rule and its dedicated scenario.
 *
 * Example:
 *
 * createFINExecutionRequest("FIN-001", 50)
 *
 * Result:
 *
 * FIN DOMAIN
 * ↓
 * FIN-001
 * ↓
 * FX_SHOCK
 * ↓
 * SPD v13.1 CORE ENGINE
 */

function createFINExecutionRequest(ruleId, intensity = 50) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "ERROR",
      domain: FIN_DOMAIN.id,
      message: `FIN rule ${ruleId} not found`
    };
  }

  return {
    status: "READY",
    domain: FIN_DOMAIN.id,
    ruleId: rule.id,
    ruleName: rule.name,
    scenario: rule.scenario,
    category: rule.category,
    intensity,
    mode: "AUTONOMOUS",
    pipeline: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ]
  };
}

/*
 * GET ALL FIN RULES
 *
 * Returns the complete FIN Rule Registry.
 */

function getFINRules() {
  return {
    status: "READY",
    domain: FIN_DOMAIN,
    totalRules: Object.keys(FIN_RULES).length,
    rules: FIN_RULES
  };
}

/*
 * GET FIN DOMAIN
 *
 * Returns the FIN domain configuration.
 */

function getFINDomain() {
  return {
    status: "READY",
    domain: FIN_DOMAIN
  };
}

/*
 * VALIDATE FIN RULE
 *
 * Confirms that the requested FIN Rule exists
 * and is operationally active.
 */

function validateFINRule(ruleId) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "INVALID",
      domain: FIN_DOMAIN.id,
      ruleId,
      message: `FIN rule ${ruleId} does not exist`
    };
  }

  if (rule.status !== "ACTIVE") {
    return {
      status: "INACTIVE",
      domain: FIN_DOMAIN.id,
      ruleId: rule.id,
      ruleName: rule.name,
      message: `FIN rule ${ruleId} is not active`
    };
  }

  return {
    status: "VALID",
    domain: FIN_DOMAIN.id,
    ruleId: rule.id,
    ruleName: rule.name,
    scenario: rule.scenario,
    category: rule.category
  };
}

/*
 * BUILD FIN AUDIT CONTEXT
 *
 * Creates the FIN-specific audit metadata that can be passed
 * to the SPD v13.1 audit record.
 */

function buildFINAuditContext(ruleId, intensity = 50) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "ERROR",
      domain: FIN_DOMAIN.id,
      message: `FIN rule ${ruleId} not found`
    };
  }

  return {
    domain: FIN_DOMAIN.id,
    ruleId: rule.id,
    ruleName: rule.name,
    category: rule.category,
    scenario: rule.scenario,
    scenarioIntensity: intensity,
    mode: "AUTONOMOUS",
    engine: "SPD v13.1 SEXTANT GOLDEN RULE ENGINE",
    pipeline: [
      "OBSERVE",
      "VERIFY",
      "ASSESS",
      "DECIDE",
      "ACT",
      "UPDATE"
    ]
  };
}

/*
 * EXAMPLE EXECUTION
 *
 * To select only the FX scenario:
 *
 * const request = createFINExecutionRequest("FIN-001", 50);
 *
 * Result:
 *
 * {
 *   status: "READY",
 *   domain: "FIN",
 *   ruleId: "FIN-001",
 *   ruleName: "Foreign Exchange Stress",
 *   scenario: "FX_SHOCK",
 *   category: "Foreign Exchange Resilience",
 *   intensity: 50,
 *   mode: "AUTONOMOUS",
 *   pipeline: [
 *     "OBSERVE",
 *     "VERIFY",
 *     "ASSESS",
 *     "DECIDE",
 *     "ACT",
 *     "UPDATE"
 *   ]
 * }
 */

/*
 * FIN INTEGRATION ARCHITECTURE
 *
 * FIN DOMAIN
 *     ↓
 * FIN RULE REGISTRY
 *     ↓
 * SELECT FIN RULE
 *     ↓
 * VALIDATE FIN RULE
 *     ↓
 * LOAD RULE-SPECIFIC SCENARIO
 *     ↓
 * CREATE EXECUTION REQUEST
 *     ↓
 * SPD v13.1 CORE ENGINE
 *     ↓
 * DATA
 *     ↓
 * ALGORITHMS
 *     ↓
 * COMPUTE
 *     ↓
 * OBSERVE
 *     ↓
 * VERIFY
 *     ↓
 * ASSESS
 *     ↓
 * DECIDE
 *     ↓
 * ACT
 *     ↓
 * UPDATE
 *     ↓
 * CAPTAIN AI LENA DECISION
 *     ↓
 * RULE-SPECIFIC SOLUTION
 *     ↓
 * AUDIT RECORD
 */

/*
 * MODULE EXPORTS
 *
 * These exports allow the SPD v13.1 core engine or UI
 * to connect to the FIN domain integration layer.
 */

export {
  FIN_DOMAIN,
  FIN_RULES,
  selectFINRule,
  loadFINScenario,
  createFINExecutionRequest,
  getFINRules,
  getFINDomain,
  validateFINRule,
  buildFINAuditContext
};