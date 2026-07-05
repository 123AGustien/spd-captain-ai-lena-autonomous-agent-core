export const GOLDEN_RULE = {
  authority: "ABSOLUTE",
  description: "System must remain within SAFE COCKPIT BOUNDARY",
  enforcement: "HARD_BLOCK"
};

export const ALIGNMENT_RULES = {
  noParallelSystems: true,
  noUnrequestedExpansion: true,
  stateFirstCheck: true,
  requireClarificationIfUnclear: true
};

function checkGoldenRule(actionContext) {
  return actionContext.riskLevel === "HIGH_VIOLATION";
}

export function alignmentCheck(actionContext) {
  const {
    systemStateExists,
    isRedefinitionAttempt,
    isExpansionRequest,
    isUnclearContext
  } = actionContext;

  if (checkGoldenRule(actionContext)) {
    return { allowed: false, reason: "BLOCKED_BY_GOLDEN_RULE" };
  }

  if (ALIGNMENT_RULES.stateFirstCheck && isRedefinitionAttempt && systemStateExists) {
    return { allowed: false, reason: "NO_REDEFINITION_ALLOWED" };
  }

  if (ALIGNMENT_RULES.noParallelSystems && isRedefinitionAttempt) {
    return { allowed: false, reason: "PARALLEL_SYSTEM_DETECTED" };
  }

  if (
    ALIGNMENT_RULES.noUnrequestedExpansion &&
    isExpansionRequest &&
    isRedefinitionAttempt
  ) {
    return { allowed: false, reason: "UNREQUESTED_EXPANSION_BLOCKED" };
  }

  if (ALIGNMENT_RULES.requireClarificationIfUnclear && isUnclearContext) {
    return { allowed: false, reason: "CLARIFICATION_REQUIRED" };
  }

  return { allowed: true, reason: "ALIGNMENT_OK" };
}