// FIN Domain Rule Index
// SPD Captain AI Lena Autonomous Agent Core

import FIN001 from "./FIN-001.md";
import FIN002 from "./FIN-002.md";
import FIN003 from "./FIN-003.md";
import FIN004 from "./FIN-004.md";
import FIN005 from "./FIN-005.md";

export const FIN_RULES = {
  "FIN-001": FIN001,
  "FIN-002": FIN002,
  "FIN-003": FIN003,
  "FIN-004": FIN004,
  "FIN-005": FIN005
};

export function getFINRule(ruleId) {
  return FIN_RULES[ruleId] || null;
}

export function getAllFINRules() {
  return Object.values(FIN_RULES);
}

export default FIN_RULES;