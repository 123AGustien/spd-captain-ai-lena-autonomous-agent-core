/* =========================================================
   SPD v13.1 — ANTIPODEAN DOMAIN CONFIGURATION
   SEXTANT RESILIENCE COCKPIT PRO

   Configuration / presentation layer only.

   IMPORTANT:
   - Does NOT replace engine.js
   - Does NOT modify Golden Rule logic
   - Does NOT modify domain thresholds
   - Does NOT modify risk classification
   - Does NOT execute autonomous actions
   - Human operator authorization remains mandatory
========================================================= */

export const ANTIPODEAN_DOMAIN_CONFIG = {

  /* =======================================================
     IDENTITY
  ======================================================= */

  domainId:
    "ANTIPODEAN",

  domainName:
    "Antipodean Resilience",

  version:
    "1.0.0",

  system:
    "SPD v13.1",

  architecture:
    "SEXTANT RESILIENCE COCKPIT PRO",

  agent:
    "Captain AI Lena",


  /* =======================================================
     DOMAIN DESCRIPTION
  ======================================================= */

  description:
    "Antipodean resilience assessment configuration for Australia–New Zealand operating environments.",

  purpose:
    "Provide a structured domain configuration for resilience assessment without modifying the SPD core decision engine.",


  /* =======================================================
     GEOGRAPHIC SCOPE
  ======================================================= */

  geographicScope: [

    "AUSTRALIA",

    "NEW_ZEALAND",

    "SOUTH_PACIFIC",

    "ANTIPODEAN_REGION"

  ],


  /* =======================================================
     CORE RESILIENCE DOMAINS
  ======================================================= */

  coreDomains: [

    "FX",

    "ENERGY",

    "CYB",

    "INF",

    "DC"

  ],


  /* =======================================================
     ANTIPODEAN DOMAIN FACTORS
  ======================================================= */

  factors: {

    energySecurity: {

      id:
        "ENERGY_SECURITY",

      label:
        "Energy Security",

      description:
        "Assessment of energy availability, resilience and supply disruption exposure."

    },


    infrastructure: {

      id:
        "INFRASTRUCTURE",

      label:
        "Critical Infrastructure",

      description:
        "Assessment of infrastructure resilience and continuity."

    },


    maritime: {

      id:
        "MARITIME",

      label:
        "Maritime Resilience",

      description:
        "Assessment of maritime transport, ports, shipping and offshore continuity."

    },


    supplyChain: {

      id:
        "SUPPLY_CHAIN",

      label:
        "Supply Chain Resilience",

      description:
        "Assessment of critical supply-chain continuity and disruption exposure."

    },


    climate: {

      id:
        "CLIMATE",

      label:
        "Climate / Environmental Stress",

      description:
        "Assessment of environmental and climate-related operational stress."

    },


    cyber: {

      id:
        "CYBER",

      label:
        "Cyber Resilience",

      description:
        "Assessment of cyber disruption and digital infrastructure exposure."

    },


    financial: {

      id:
        "FINANCIAL",

      label:
        "Financial Resilience",

      description:
        "Assessment of financial, liquidity and market stress."

    },


    humanRights: {

      id:
        "HUMAN_RIGHTS",

      label:
        "Business & Human Rights",

      description:
        "Assessment of labour, human-rights, supply-chain and community resilience."

    }

  },


  /* =======================================================
     SCENARIOS
  ======================================================= */

  scenarios: [

    {
      id:
        "ANTIPODEAN_NORMAL",

      label:
        "NORMAL OPERATIONS"
    },


    {
      id:
        "AU_ENERGY_STRESS",

      label:
        "AUSTRALIAN ENERGY STRESS"
    },


    {
      id:
        "NZ_ENERGY_STRESS",

      label:
        "NEW ZEALAND ENERGY STRESS"
    },


    {
      id:
        "MARITIME_DISRUPTION",

      label:
        "MARITIME DISRUPTION"
    },


    {
      id:
        "PORT_INFRASTRUCTURE_STRESS",

      label:
        "PORT / INFRASTRUCTURE STRESS"
    },


    {
      id:
        "SOUTH_PACIFIC_SUPPLY_CHAIN",

      label:
        "SOUTH PACIFIC SUPPLY CHAIN STRESS"
    },


    {
      id:
        "CYBER_INFRASTRUCTURE_EVENT",

      label:
        "CYBER / INFRASTRUCTURE EVENT"
    },


    {
      id:
        "CLIMATE_STRESS",

      label:
        "CLIMATE / ENVIRONMENTAL STRESS"
    },


    {
      id:
        "FINANCIAL_STRESS",

      label:
        "FINANCIAL RESILIENCE STRESS"
    },


    {
      id:
        "BHR_STRESS",

      label:
        "BUSINESS & HUMAN RIGHTS STRESS"
    }

  ],


  /* =======================================================
     OPERATING MODEL
  ======================================================= */

  operatingModel: {

    mode:
      "AUTONOMOUS_ANALYSIS",

    executionMode:
      "HUMAN_AUTHORIZATION_REQUIRED",

    automaticExecution:
      false,

    recoveryExecution:
      false,

    humanDecisionAuthority:
      true

  },


  /* =======================================================
     GOLDEN RULE
  ======================================================= */

  goldenRule: [

    "OBSERVE",

    "VERIFY",

    "ASSESS",

    "DECIDE",

    "ACT",

    "UPDATE"

  ],


  /* =======================================================
     HUMAN AUTHORITY
  ======================================================= */

  humanAuthority: {

    required:
      true,

    authority:
      "HUMAN_OPERATOR",

    policy:
      "NO_RECOVERY_ACTION_EXECUTED_UNTIL_HUMAN_AUTHORIZATION",

    allowedDecisionStates: [

      "AUTHORIZE_RECOVERY",

      "MAINTAIN_SAFE_STATE",

      "REQUEST_ADDITIONAL_DIAGNOSTICS",

      "ABORT_RECOVERY",

      "ESCALATE_TO_MISSION_AUTHORITY"

    ]

  },


  /* =======================================================
     DATA MODEL
  ======================================================= */

  inputModel: {

    numericRange: {

      minimum:
        0,

      maximum:
        100

    },

    fields: [

      "fx",

      "energy",

      "cyb",

      "inf",

      "dc",

      "labour",

      "humanRights",

      "supplyChain",

      "community",

      "governance",

      "environment",

      "liquidity",

      "credit",

      "banking",

      "sovereign",

      "financialMarket"

    ]

  },


  /* =======================================================
     DISPLAY
  ======================================================= */

  display: {

    title:
      "ANTIPODEAN RESILIENCE DOMAIN",

    subtitle:
      "Australia • New Zealand • South Pacific",

    status:
      "CONFIGURATION READY",

    engineAuthority:
      "SPD v13.1 CORE ENGINE",

    decisionAuthority:
      "HUMAN OPERATOR"

  },


  /* =======================================================
     INTEGRATION CONTRACT
  ======================================================= */

  integration: {

    engine:
      "./engine.js",

    domainIntegration:
      "./domainIntegration.js",

    armController:
      "./armController.js",

    constants:
      "./constants/math.constants.js",

    modificationPolicy:
      "CONFIGURATION_ONLY",

    coreEngineModification:
      false,

    domainThresholdModification:
      false,

    riskClassificationModification:
      false,

    decisionLogicModification:
      false

  },


  /* =======================================================
     AUDIT
  ======================================================= */

  audit: {

    configurationStatus:
      "READY",

    deterministic:
      true,

    backendConnection:
      false,

    localExecution:
      true,

    timestamp:
      new Date().toISOString()

  }

};


/* =========================================================
   VALIDATION
========================================================= */

export function verifyAntipodeanDomainConfig() {

  const config =
    ANTIPODEAN_DOMAIN_CONFIG;


  const required =
    [

      config.domainId,

      config.domainName,

      config.version,

      config.system,

      config.agent,

      config.goldenRule,

      config.humanAuthority,

      config.integration

    ];


  const valid =
    required.every(
      value =>
        value !== undefined &&
        value !== null
    );


  return {

    status:
      valid
        ? "READY"
        : "INVALID",

    domain:
      config.domainId,

    version:
      config.version,

    configuration:
      valid
        ? "VALID"
        : "INVALID",

    coreEngineModified:
      config.integration.coreEngineModification,

    humanAuthorizationRequired:
      config.humanAuthority.required,

    automaticExecution:
      config.operatingModel.automaticExecution,

    timestamp:
      new Date().toISOString()

  };

}