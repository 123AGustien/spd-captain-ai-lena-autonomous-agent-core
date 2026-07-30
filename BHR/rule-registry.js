/**
 * SPD v13.1 — Business & Human Rights Rule Registry
 *
 * Purpose:
 * Central registry for all BHR domain rules.
 *
 * Architecture:
 *
 * COCKPIT
 *    ↓
 * domainIntegration.js
 *    ↓
 * BHR Rule Registry
 *    ↓
 * BHR Rule Engine
 *    ↓
 * Golden Rule Engine
 *    ↓
 * Captain AI Lena Decision
 *
 */

import BHR_001_HUMAN_RIGHTS_DUE_DILIGENCE from "./rules/BHR-001-human-rights-due-diligence.js";
import BHR_002_FORCED_LABOUR from "./rules/BHR-002-forced-labour.js";
import BHR_003_CHILD_LABOUR from "./rules/BHR-003-child-labour.js";
import BHR_004_DISCRIMINATION from "./rules/BHR-004-discrimination.js";
import BHR_005_OCCUPATIONAL_HEALTH_AND_SAFETY from "./rules/BHR-005-occupational-health-and-safety.js";
import BHR_006_MODERN_SLAVERY from "./rules/BHR-006-modern-slavery.js";
import BHR_007_COMMUNITY_IMPACT from "./rules/BHR-007-community-impact.js";
import BHR_008_INDIGENOUS_RIGHTS from "./rules/BHR-008-indigenous-rights.js";
import BHR_009_SUPPLY_CHAIN_RISK from "./rules/BHR-009-supply-chain-risk.js";
import BHR_010_GRIEVANCE_MECHANISM from "./rules/BHR-010-grievance-mechanism.js";


const BHR_RULE_REGISTRY = {

    "BHR-001": BHR_001_HUMAN_RIGHTS_DUE_DILIGENCE,

    "BHR-002": BHR_002_FORCED_LABOUR,

    "BHR-003": BHR_003_CHILD_LABOUR,

    "BHR-004": BHR_004_DISCRIMINATION,

    "BHR-005": BHR_005_OCCUPATIONAL_HEALTH_AND_SAFETY,

    "BHR-006": BHR_006_MODERN_SLAVERY,

    "BHR-007": BHR_007_COMMUNITY_IMPACT,

    "BHR-008": BHR_008_INDIGENOUS_RIGHTS,

    "BHR-009": BHR_009_SUPPLY_CHAIN_RISK,

    "BHR-010": BHR_010_GRIEVANCE_MECHANISM

};


export function getBHRRule(ruleId) {

    return BHR_RULE_REGISTRY[ruleId] || null;

}


export function getAllBHRRules() {

    return BHR_RULE_REGISTRY;

}


export default BHR_RULE_REGISTRY;
