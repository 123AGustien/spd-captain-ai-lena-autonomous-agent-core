/**
 * SPD v13.1 — SCENARIO ENGINE
 *
 * Purpose:
 * Resolve cockpit scenario events into deterministic
 * scenario identifiers used by the Domain Integration Layer.
 *
 * Architecture:
 *
 * Cockpit Scenario Control
 *        ↓
 * scenarioEngine()
 *        ↓
 * Domain Integration Layer
 *        ↓
 * Authoritative Domain Rule Engine
 *
 * Active Domain Scenario Groups:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights Resilience
 * DC  — Data Centre Resilience
 * CYB — Cyber Resilience
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * No autonomous recovery execution is permitted.
 */


/* =========================================================
   SCENARIO ENGINE
========================================================= */

export function scenarioEngine(event) {

  /*
   * Default behaviour
   */

  if (!event) {
    return "NORMAL";
  }


  /*
   * =======================================================
   * FINANCIAL / GENERAL SYSTEM SCENARIOS
   * =======================================================
   */

  switch (event) {

    case "FX_SHOCK":
      return "FX SHOCK SCENARIO";


    case "ENERGY_SPIKE":
      return "ENERGY SPIKE SCENARIO";


    case "BIODIESEL_SHORTAGE":
      return "BIODIESEL SHORTAGE SCENARIO";


    case "NORMAL":
      return "NORMAL";


    /* =====================================================
       FIN — FINANCIAL RESILIENCE
    ===================================================== */

    case "FIN_STRESS":
      return "FIN STRESS SCENARIO";


    case "BANKING_STRESS":
      return "BANKING STRESS SCENARIO";


    case "LIQUIDITY_CRISIS":
      return "LIQUIDITY CRISIS SCENARIO";


    case "CREDIT_STRESS":
      return "CREDIT STRESS SCENARIO";


    case "SOVEREIGN_DEBT":
      return "SOVEREIGN DEBT SCENARIO";


    /* =====================================================
       BHR — BUSINESS & HUMAN RIGHTS RESILIENCE
    ===================================================== */

    case "BHR_STRESS":
      return "BHR STRESS SCENARIO";


    case "LABOUR_RIGHTS":
      return "LABOUR RIGHTS SCENARIO";


    case "HUMAN_RIGHTS_EVENT":
      return "HUMAN RIGHTS EVENT SCENARIO";


    case "SUPPLY_CHAIN_HUMAN_RIGHTS":
      return "SUPPLY CHAIN HUMAN RIGHTS SCENARIO";


    case "COMMUNITY_IMPACT":
      return "COMMUNITY IMPACT SCENARIO";


    case "GOVERNANCE_RISK":
      return "GOVERNANCE RISK SCENARIO";


    /* =====================================================
       DC — DATA CENTRE RESILIENCE
    ===================================================== */

    case "INFRASTRUCTURE_STRESS":
      return "INFRASTRUCTURE STRESS SCENARIO";


    case "COOLING_FAILURE":
      return "COOLING FAILURE SCENARIO";


    case "POWER_INSTABILITY":
      return "POWER INSTABILITY SCENARIO";


    case "NETWORK_CONGESTION":
      return "NETWORK CONGESTION SCENARIO";


    case "COMPUTE_LOAD_SPIKE":
      return "COMPUTE LOAD SPIKE SCENARIO";


    case "BLACKOUT_RECOVERY":
      return "BLACKOUT RECOVERY SCENARIO";


    case "COOLING_RECOVERY_FAILURE":
      return "COOLING RECOVERY FAILURE SCENARIO";


    case "NETWORK_HARDWARE_FAILURE":
      return "NETWORK HARDWARE FAILURE SCENARIO";


    case "STORAGE_DEGRADATION":
      return "STORAGE DEGRADATION SCENARIO";


    case "COOLING_LOAD_SATURATION":
      return "COOLING LOAD SATURATION SCENARIO";


    case "MULTI_SYSTEM_CASCADE":
      return "MULTI-SYSTEM CASCADE SCENARIO";


    /* =====================================================
       CYB — CYBER RESILIENCE
    ===================================================== */

    case "CYBER_EVENT":
      return "CYBER EVENT SCENARIO";


    case "DATA_BREACH":
      return "DATA BREACH SCENARIO";


    case "DDOS":
      return "DDOS SCENARIO";


    case "INSIDER_THREAT":
      return "INSIDER THREAT SCENARIO";


    case "API_ABUSE":
      return "API ABUSE SCENARIO";


    case "SUPPLY_CHAIN_CYBER":
      return "SUPPLY CHAIN CYBER SCENARIO";


    case "CLOUD_MISCONFIGURATION":
      return "CLOUD MISCONFIGURATION SCENARIO";


    case "IDENTITY_PROVIDER_OUTAGE":
      return "IDENTITY PROVIDER OUTAGE SCENARIO";


    case "MULTI_VECTOR_CYBER":
      return "MULTI-VECTOR CYBER SCENARIO";


    /* =====================================================
       UNKNOWN SCENARIO
    ===================================================== */

    default:
      return "UNKNOWN SCENARIO";

  }

}


/* =========================================================
   SCENARIO DOMAIN IDENTIFICATION
========================================================= */

export function getScenarioDomain(event) {

  if (!event) {
    return null;
  }


  switch (event) {


    /* -----------------------------------------------------
       FIN
    ----------------------------------------------------- */

    case "FIN_STRESS":
    case "BANKING_STRESS":
    case "LIQUIDITY_CRISIS":
    case "CREDIT_STRESS":
    case "SOVEREIGN_DEBT":

      return "FIN";


    /* -----------------------------------------------------
       BHR
    ----------------------------------------------------- */

    case "BHR_STRESS":
    case "LABOUR_RIGHTS":
    case "HUMAN_RIGHTS_EVENT":
    case "SUPPLY_CHAIN_HUMAN_RIGHTS":
    case "COMMUNITY_IMPACT":
    case "GOVERNANCE_RISK":

      return "BHR";


    /* -----------------------------------------------------
       DC
    ----------------------------------------------------- */

    case "INFRASTRUCTURE_STRESS":
    case "COOLING_FAILURE":
    case "POWER_INSTABILITY":
    case "NETWORK_CONGESTION":
    case "COMPUTE_LOAD_SPIKE":
    case "BLACKOUT_RECOVERY":
    case "COOLING_RECOVERY_FAILURE":
    case "NETWORK_HARDWARE_FAILURE":
    case "STORAGE_DEGRADATION":
    case "COOLING_LOAD_SATURATION":
    case "MULTI_SYSTEM_CASCADE":

      return "DC";


    /* -----------------------------------------------------
       CYB
    ----------------------------------------------------- */

    case "CYBER_EVENT":
    case "DATA_BREACH":
    case "DDOS":
    case "INSIDER_THREAT":
    case "API_ABUSE":
    case "SUPPLY_CHAIN_CYBER":
    case "CLOUD_MISCONFIGURATION":
    case "IDENTITY_PROVIDER_OUTAGE":
    case "MULTI_VECTOR_CYBER":

      return "CYB";


    /* -----------------------------------------------------
       GENERAL / NON-DOMAIN SCENARIOS
    ----------------------------------------------------- */

    case "FX_SHOCK":
    case "ENERGY_SPIKE":
    case "BIODIESEL_SHORTAGE":
    case "NORMAL":

      return null;


    default:

      return null;

  }

}


/* =========================================================
   SCENARIO RESOLUTION
========================================================= */

export function resolveScenario(event) {

  const scenario =
    scenarioEngine(event);

  const domain =
    getScenarioDomain(event);


  return {

    success:
      scenario !== "UNKNOWN SCENARIO",

    event,

    scenario,

    domain,

    status:
      scenario === "UNKNOWN SCENARIO"
        ? "UNKNOWN"
        : "RESOLVED"

  };

}


/* =========================================================
   SCENARIO VALIDATION
========================================================= */

export function isKnownScenario(event) {

  return (
    scenarioEngine(event) !==
    "UNKNOWN SCENARIO"
  );

}


/* =========================================================
   SCENARIO STATUS
========================================================= */

export function getScenarioStatus(event) {

  const resolution =
    resolveScenario(event);


  return {

    event:
      resolution.event,

    scenario:
      resolution.scenario,

    domain:
      resolution.domain,

    valid:
      resolution.success,

    status:
      resolution.status

  };

}