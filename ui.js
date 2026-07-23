/*
 * SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
 * Captain AI Lena Autonomous Agent Core
 *
 * UI CONTROLLER
 *
 * DATA → ALGORITHMS → COMPUTE
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Purpose:
 * Connects the cockpit user interface to:
 *
 * 1. SPD v13.1 Core Engine
 * 2. FIN Domain Rule Registry
 * 3. FIN Rule Selection
 * 4. Rule-Specific Scenario Selection
 * 5. Scenario Intensity
 * 6. Golden Rule Pipeline
 * 7. Captain AI Lena Decision Layer
 * 8. Audit Record
 */

/*
 * FIN DOMAIN REGISTRY
 *
 * The UI uses the same FIN rule definitions as FIN/index.js.
 *
 * FIN-001 → FX_SHOCK
 * FIN-002 → FINANCIAL_STRESS
 * FIN-003 → LIQUIDITY_STRESS
 * FIN-004 → BANKING_STRESS
 * FIN-005 → INFLATION_SHOCK
 */

const FIN_DOMAIN = {
  id: "FIN",
  name: "Financial Resilience",
  status: "ACTIVE"
};

const FIN_RULES = {
  "FIN-001": {
    id: "FIN-001",
    name: "Foreign Exchange Stress",
    scenario: "FX_SHOCK",
    category: "Foreign Exchange Resilience",
    file: "./FIN-001.md",
    status: "ACTIVE"
  },

  "FIN-002": {
    id: "FIN-002",
    name: "Financial Stress",
    scenario: "FINANCIAL_STRESS",
    category: "Financial System Resilience",
    file: "./FIN-002.md",
    status: "ACTIVE"
  },

  "FIN-003": {
    id: "FIN-003",
    name: "Liquidity Stress",
    scenario: "LIQUIDITY_STRESS",
    category: "Liquidity Resilience",
    file: "./FIN-003.md",
    status: "ACTIVE"
  },

  "FIN-004": {
    id: "FIN-004",
    name: "Banking Stress",
    scenario: "BANKING_STRESS",
    category: "Banking System Stability",
    file: "./FIN-004.md",
    status: "ACTIVE"
  },

  "FIN-005": {
    id: "FIN-005",
    name: "Inflation Shock",
    scenario: "INFLATION_SHOCK",
    category: "Inflation Risk",
    file: "./FIN-005.md",
    status: "ACTIVE"
  }
};

/*
 * CURRENT UI SELECTION STATE
 */

let selectedDomain = null;
let selectedFINRule = null;
let selectedScenario = "FX_SHOCK";
let selectedIntensity = 50;

/*
 * GOLDEN RULE PIPELINE
 */

const GOLDEN_RULE_PIPELINE = [
  "OBSERVE",
  "VERIFY",
  "ASSESS",
  "DECIDE",
  "ACT",
  "UPDATE"
];

/*
 * SELECT FIN DOMAIN
 */

function selectFINDomain() {
  selectedDomain = FIN_DOMAIN;

  return {
    status: "READY",
    domain: FIN_DOMAIN.id,
    domainName: FIN_DOMAIN.name
  };
}

/*
 * SELECT FIN RULE
 *
 * Example:
 *
 * selectFINRuleFromUI("FIN-005")
 *
 * Result:
 *
 * FIN
 * ↓
 * FIN-005
 * ↓
 * INFLATION_SHOCK
 */

function selectFINRuleFromUI(ruleId) {
  const rule = FIN_RULES[ruleId];

  if (!rule) {
    return {
      status: "ERROR",
      domain: "FIN",
      message: `FIN rule ${ruleId} not found`
    };
  }

  if (rule.status !== "ACTIVE") {
    return {
      status: "INACTIVE",
      domain: "FIN",
      ruleId: rule.id,
      message: `FIN rule ${ruleId} is not active`
    };
  }

  selectedDomain = FIN_DOMAIN;
  selectedFINRule = rule;
  selectedScenario = rule.scenario;

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
 * LOAD FIN SCENARIO FROM SELECTED RULE
 */

function loadSelectedFINScenario() {
  if (!selectedFINRule) {
    return {
      status: "ERROR",
      message: "No FIN rule selected"
    };
  }

  selectedScenario = selectedFINRule.scenario;

  return {
    status: "ACTIVE",
    domain: FIN_DOMAIN.id,
    ruleId: selectedFINRule.id,
    ruleName: selectedFINRule.name,
    scenario: selectedFINRule.scenario,
    category: selectedFINRule.category
  };
}

/*
 * CREATE FIN EXECUTION REQUEST
 */

function createUIFINExecutionRequest(intensity = 50) {
  if (!selectedFINRule) {
    return {
      status: "ERROR",
      message: "Select a FIN rule before execution"
    };
  }

  selectedIntensity = intensity;

  return {
    status: "READY",
    domain: FIN_DOMAIN.id,
    ruleId: selectedFINRule.id,
    ruleName: selectedFINRule.name,
    scenario: selectedFINRule.scenario,
    category: selectedFINRule.category,
    intensity: selectedIntensity,
    mode: "AUTONOMOUS",
    pipeline: GOLDEN_RULE_PIPELINE
  };
}

/*
 * GET CURRENT FIN UI STATE
 */

function getFINUIState() {
  return {
    domain: selectedDomain,
    rule: selectedFINRule,
    scenario: selectedScenario,
    intensity: selectedIntensity
  };
}

/*
 * UPDATE SCENARIO PANEL
 */

function updateFINScenarioPanel() {
  const panel = document.getElementById("scenario-panel");

  if (!panel) {
    return;
  }

  if (!selectedFINRule) {
    panel.textContent = JSON.stringify(
      {
        scenario: selectedScenario,
        intensity: `${selectedIntensity}%`,
        status: "READY"
      },
      null,
      2
    );

    return;
  }

  panel.textContent = JSON.stringify(
    {
      domain: FIN_DOMAIN.id,
      ruleId: selectedFINRule.id,
      ruleName: selectedFINRule.name,
      category: selectedFINRule.category,
      scenario: selectedFINRule.scenario,
      intensity: `${selectedIntensity}%`,
      status: "ACTIVE"
    },
    null,
    2
  );
}

/*
 * UPDATE FIN SELECTION DISPLAY
 */

function updateFINSelectionDisplay() {
  const display = document.getElementById("fin-selection");

  if (!display) {
    return;
  }

  if (!selectedFINRule) {
    display.textContent = "No FIN rule selected";
    return;
  }

  display.textContent =
    `FIN DOMAIN: ${FIN_DOMAIN.name}\n` +
    `RULE: ${selectedFINRule.id} — ${selectedFINRule.name}\n` +
    `CATEGORY: ${selectedFINRule.category}\n` +
    `SCENARIO: ${selectedFINRule.scenario}`;
}

/*
 * CONNECT FIN RULE BUTTONS
 *
 * Expected HTML button format:
 *
 * <button data-fin-rule="FIN-001">FIN-001</button>
 *
 * The same structure works for FIN-005.
 */

function connectFINRuleButtons() {
  const buttons = document.querySelectorAll("[data-fin-rule]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const ruleId = button.getAttribute("data-fin-rule");

      const result = selectFINRuleFromUI(ruleId);

      if (result.status !== "READY") {
        console.error("FIN RULE SELECTION ERROR:", result);
        return;
      }

      loadSelectedFINScenario();

      updateFINSelectionDisplay();
      updateFINScenarioPanel();

      console.log("FIN RULE SELECTED:", result);
    });
  });
}

/*
 * CONNECT FIN DOMAIN BUTTON
 */

function connectFINDomainButton() {
  const button = document.getElementById("select-fin-domain");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const result = selectFINDomain();

    console.log("FIN DOMAIN SELECTED:", result);

    updateFINSelectionDisplay();
    updateFINScenarioPanel();
  });
}

/*
 * CONNECT INTENSITY CONTROL
 */

function connectFINIntensityControl() {
  const intensityControl =
    document.getElementById("scenario-intensity");

  if (!intensityControl) {
    return;
  }

  intensityControl.addEventListener("input", () => {
    selectedIntensity = Number(intensityControl.value);

    updateFINScenarioPanel();
  });
}

/*
 * BUILD FIN AUDIT CONTEXT
 */

function buildFINUIAuditContext() {
  if (!selectedFINRule) {
    return {
      status: "ERROR",
      message: "No FIN rule selected for audit"
    };
  }

  return {
    domain: FIN_DOMAIN.id,
    ruleId: selectedFINRule.id,
    ruleName: selectedFINRule.name,
    category: selectedFINRule.category,
    scenario: selectedFINRule.scenario,
    scenarioIntensity: selectedIntensity,
    mode: "AUTONOMOUS",
    engine: "SPD v13.1 SEXTANT GOLDEN RULE ENGINE",
    pipeline: GOLDEN_RULE_PIPELINE
  };
}

/*
 * FIN EXECUTION HANDOFF
 *
 * This function creates the structured request that
 * the SPD v13.1 Core Engine can consume.
 */

function handoffFINToCoreEngine() {
  const request = createUIFINExecutionRequest(selectedIntensity);

  if (request.status !== "READY") {
    console.error("FIN CORE ENGINE HANDOFF ERROR:", request);
    return request;
  }

  console.log(
    "FIN → CORE ENGINE HANDOFF",
    request
  );

  return request;
}

/*
 * INITIALIZE FIN UI
 */

function initializeFINUI() {
  connectFINDomainButton();
  connectFINRuleButtons();
  connectFINIntensityControl();

  updateFINSelectionDisplay();
  updateFINScenarioPanel();

  console.log(
    "SPD v13.1 FIN DOMAIN UI INITIALIZED"
  );
}

/*
 * AUTO INITIALIZATION
 */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeFINUI
  );
} else {
  initializeFINUI();
}

/*
 * MODULE EXPORTS
 *
 * These exports allow the main cockpit application
 * to access FIN domain selection and rule execution.
 */

export {
  FIN_DOMAIN,
  FIN_RULES,
  GOLDEN_RULE_PIPELINE,
  selectFINDomain,
  selectFINRuleFromUI,
  loadSelectedFINScenario,
  createUIFINExecutionRequest,
  getFINUIState,
  buildFINUIAuditContext,
  handoffFINToCoreEngine,
  initializeFINUI
};