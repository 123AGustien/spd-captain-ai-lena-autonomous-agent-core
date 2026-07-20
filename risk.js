/**
 * SPD v13 — RISK DIAGNOSTICS MODULE
 * ---------------------------------
 *
 * Supporting diagnostic module only.
 *
 * IMPORTANT:
 * This module does NOT define the authoritative
 * SPD v13 system risk classification.
 *
 * The authoritative risk classification is produced
 * exclusively by:
 *
 * goldenRuleEngine.js
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Therefore:
 *
 * goldenRule.assessment.risk
 *
 * remains the SINGLE SOURCE OF TRUTH.
 *
 * This module provides an independent diagnostic
 * indicator for domain-level analysis only.
 */

// ============================================================
// RISK DIAGNOSTICS
// ============================================================

export function riskModule(cyb, energy, fx) {

  const riskScore =
    (Number(cyb) * 0.4) +
    ((100 - Number(energy)) * 0.3) +
    (Math.abs(Number(fx)) * 0.3);


  let diagnosticRisk;

  if (riskScore >= 70) {

    diagnosticRisk = "HIGH RISK";

  }

  else if (riskScore >= 40) {

    diagnosticRisk = "MEDIUM RISK";

  }

  else {

    diagnosticRisk = "LOW RISK";

  }


  return {

    module:
      "SPD RISK DIAGNOSTICS",

    riskScore,

    diagnosticRisk,

    authoritative:
      false,

    sourceOfTruth:
      "goldenRuleEngine.js"

  };

}