/**
 * SPD v13.1 — Domain Priority Context Fusion
 *
 * Purpose:
 * Fuse domain intelligence with system condition
 * before Golden Rule Engine and Captain AI Lena Decision.
 */

export function fuseDomainPriorityContext(
    domainResult,
    systemAssessment
) {

    const context = {

        domain: domainResult.domain,

        scenario: domainResult.scenario,

        domainSeverity:
            domainResult.severity ||
            domainResult.risk ||
            "LOW",

        domainStress:
            domainResult.domainStress || 0,

        systemRisk:
            systemAssessment.risk,

        systemResilience:
            systemAssessment.resilienceScore,

        priorityOverride: false
    };


    // Domain priority rules
    if (
        context.domainSeverity === "HIGH" &&
        context.domainStress >= 70
    ) {
        context.priorityOverride = true;
        context.finalRisk = "HIGH";
    }

    else if (
        context.domainSeverity === "MEDIUM"
    ) {
        context.finalRisk = "MEDIUM";
    }

    else {
        context.finalRisk = systemAssessment.risk;
    }


    return context;
}