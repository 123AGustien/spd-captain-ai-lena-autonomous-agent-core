// FIN Domain UI Integration
// SPD Captain AI Lena Autonomous Agent Core

export function getFinancialRuleStatus(rule) {
  if (!rule) {
    return {
      status: "UNKNOWN",
      message: "Financial rule not available."
    };
  }

  return {
    status: rule.status || "ACTIVE",
    ruleId: rule.ruleId || rule.id || "UNKNOWN",
    domain: "FIN",
    category: rule.category || "Financial Resilience"
  };
}

export function formatFinancialAction(rule, action) {
  return {
    domain: "FIN",
    ruleId: rule?.ruleId || rule?.id || "UNKNOWN",
    action: action || "MONITOR",
    timestamp: new Date().toISOString()
  };
}