/*
 * SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO
 * Captain AI Lena Autonomous Agent Core
 *
 * FIN DOMAIN UI INTEGRATION
 *
 * FIN DOMAIN
 *     ↓
 * FIN RULE SELECTION
 *     ↓
 * RULE-SPECIFIC SCENARIO
 *     ↓
 * SCENARIO INTENSITY
 *     ↓
 * SPD v13.1 CORE ENGINE
 *     ↓
 * GOLDEN RULE PIPELINE
 *     ↓
 * DECISION
 *     ↓
 * ACTION
 *     ↓
 * AUDIT
 *
 * Purpose:
 * Connects the FIN Domain Rule Registry to the cockpit UI.
 */

import {
  FIN_DOMAIN,
  FIN_RULES,
  selectFINRule,
  loadFINScenario,
  createFINExecutionRequest,
  validateFINRule,
  buildFINAuditContext
} from "./index.js";


/*
 * FIN UI STATE
 */

let finUIState = {
  domain: "FIN",
  selectedRuleId: null,
  selectedRuleName: null,
  selectedScenario: null,
  selectedCategory: null,
  intensity: 50,
  status: "READY"
};


/*
 * INITIALIZE FIN DOMAIN UI
 */

function initializeFINUI() {
  const ruleSelector = document.getElementById("fin-rule-selector");

  if (!ruleSelector) {
    console.warn("FIN rule selector not found.");
    return;
  }

  ruleSelector.innerHTML = "";

  Object.values(FIN_RULES).forEach((rule) => {
    const option = document.createElement("option");

    option.value = rule.id;
    option.textContent = `${rule.id} — ${rule.name}`;

    ruleSelector.appendChild(option);
  });

  ruleSelector.addEventListener("change", () => {
    selectFINRuleForCockpit(ruleSelector.value);
  });

  selectFINRuleForCockpit("FIN-001");
}


/*
 * SELECT FIN RULE FOR COCKPIT
 */

function selectFINRuleForCockpit(ruleId) {

  const validation = validateFINRule(ruleId);

  if (validation.status !== "VALID") {
    updateFINUI({
      status: validation.status,
      message: validation.message
    });

    return validation;
  }


  const selectedRule = selectFINRule(ruleId);

  if (selectedRule.status !== "READY") {
    updateFINUI(selectedRule);

    return selectedRule;
  }


  const scenario = loadFINScenario(ruleId);

  finUIState = {
    domain: FIN_DOMAIN.id,
    selectedRuleId: selectedRule.ruleId,
    selectedRuleName: selectedRule.ruleName,
    selectedScenario: selectedRule.scenario,
    selectedCategory: selectedRule.category,
    intensity: finUIState.intensity,
    status: "READY"
  };


  updateFINUI({
    ...selectedRule,
    scenarioStatus: scenario.status
  });


  return finUIState;
}


/*
 * SET FIN SCENARIO INTENSITY
 */

function setFINIntensity(intensity) {

  const numericIntensity = Number(intensity);

  if (
    Number.isNaN(numericIntensity) ||
    numericIntensity < 0 ||
    numericIntensity > 100
  ) {
    return {
      status: "ERROR",
      message: "FIN scenario intensity must be between 0 and 100."
    };
  }


  finUIState.intensity = numericIntensity;


  const intensityDisplay =
    document.getElementById("fin-intensity-value");

  if (intensityDisplay) {
    intensityDisplay.textContent = `${numericIntensity}%`;
  }


  return {
    status: "READY",
    intensity: numericIntensity
  };
}


/*
 * CREATE FIN EXECUTION REQUEST FROM UI
 */

function createFINUIExecutionRequest() {

  if (!finUIState.selectedRuleId) {
    return {
      status: "ERROR",
      domain: "FIN",
      message: "No FIN rule selected."
    };
  }


  return createFINExecutionRequest(
    finUIState.selectedRuleId,
    finUIState.intensity
  );
}


/*
 * BUILD FIN AUDIT CONTEXT FROM UI
 */

function createFINUIAuditContext() {

  if (!finUIState.selectedRuleId) {
    return {
      status: "ERROR",
      domain: "FIN",
      message: "No FIN rule selected."
    };
  }


  return buildFINAuditContext(
    finUIState.selectedRuleId,
    finUIState.intensity
  );
}


/*
 * UPDATE FIN UI
 */

function updateFINUI(data) {

  const ruleDisplay =
    document.getElementById("fin-selected-rule");

  const scenarioDisplay =
    document.getElementById("fin-selected-scenario");

  const categoryDisplay =
    document.getElementById("fin-selected-category");

  const statusDisplay =
    document.getElementById("fin-rule-status");


  if (ruleDisplay) {
    ruleDisplay.textContent =
      data.ruleId || finUIState.selectedRuleId || "Waiting...";
  }


  if (scenarioDisplay) {
    scenarioDisplay.textContent =
      data.scenario || finUIState.selectedScenario || "Waiting...";
  }


  if (categoryDisplay) {
    categoryDisplay.textContent =
      data.category || finUIState.selectedCategory || "Waiting...";
  }


  if (statusDisplay) {
    statusDisplay.textContent =
      data.status || finUIState.status || "READY";
  }
}


/*
 * GET CURRENT FIN UI STATE
 */

function getFINUIState() {
  return {
    ...finUIState
  };
}


/*
 * PUBLIC FIN UI API
 */

export {
  initializeFINUI,
  selectFINRuleForCockpit,
  setFINIntensity,
  createFINUIExecutionRequest,
  createFINUIAuditContext,
  getFINUIState
};