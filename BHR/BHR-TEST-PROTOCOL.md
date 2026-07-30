# SPD v13.1 — BHR Test Protocol

## Purpose

This document defines the validation procedure for the Business & Human Rights (BHR) domain module.

The BHR module operates as a domain extension of SPD v13.1.

The Golden Rule Engine remains the final authority.

The BHR module provides:

- Human rights risk assessment
- Rule execution validation
- Domain stress contribution
- Deterministic assessment output
- Audit trace generation


# Architecture Flow

BHR Scenario
↓
BHR Scenario Registry
↓
BHR Rule Engine
↓
BHR Validation Engine
↓
BHR SPD Stress Bridge
↓
SPD Self-Test Validation Engine
↓
Golden Rule Engine
↓
Captain AI Lena Decision Core
↓
Memory Core
↓
Audit Record


# Test Objective

Verify that:

- BHR scenarios load correctly
- BHR rules execute correctly
- Risk assessment is generated correctly
- Domain stress contribution is calculated
- Golden Rule pipeline remains authoritative
- Validation status is recorded
- Audit trace is generated


# Test Case 1 — Human Rights Due Diligence Risk Assessment

## Scenario

`BHR-001`

## Rule

`BHR-001 Human Rights Due Diligence`

## Input

```javascript
{
    labourRisk: 40,
    communityImpact: 30,
    supplyChainRisk: 50,
    complianceRisk: 20
}

Expected Calculation

Human Rights Due Diligence:

40 × 0.30 = 12

Community Impact:

30 × 0.25 = 7.5

Supply Chain Risk:

50 × 0.25 = 12.5

Compliance Risk:

20 × 0.20 = 4

Expected Risk Score

"36"

Expected Assessment

"MEDIUM"

Expected Recommendation

"ACTIVATE PREVENTIVE HUMAN RIGHTS RESILIENCE MODE"

Validation

"PASS"
# Test Case 2 — Forced Labour Risk Assessment

## Scenario

`BHR-002`

## Rule

`BHR-002 Forced Labour`

## Input

```javascript
{
    workerFreedomRisk: 70,
    labourConditionRisk: 60,
    supplyChainRisk: 50,
    monitoringLevel: 40
}

Expected Calculation

Worker Freedom Risk:

70 × 0.35 = 24.5

Labour Condition Risk:

60 × 0.25 = 15

Supply Chain Risk:

50 × 0.20 = 10

Monitoring Failure:

(100 - 40) × 0.20 = 12

Expected Risk Score

"61.5"

Expected Assessment

"HIGH"

Expected Recommendation

"ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE"

Validation

"PASS"

Test Case 3 — Child Labour Risk Assessment

Scenario

"BHR-003"

Rule

"BHR-003 Child Labour"

Input

{
    childLabourRisk: 80,
    supplierRisk: 60,
    auditFailure: 50,
    complianceRisk: 40
}

Expected Calculation

Child Labour Risk:

80 × 0.40 = 32

Supplier Risk:

60 × 0.25 = 15

Audit Failure:

50 × 0.20 = 10

Compliance Risk:

40 × 0.15 = 6

Expected Risk Score

"63"

Expected Assessment

"HIGH"

Expected Recommendation

"ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE"

Validation

"PASS"
# Test Case 4 — Discrimination Risk Assessment

## Scenario

`BHR-004`

## Rule

`BHR-004 Discrimination`

## Input

```javascript
{
    discriminationRisk: 60,
    equalOpportunityRisk: 50,
    complianceRisk: 30,
    grievanceRisk: 40
}

Expected Calculation

Discrimination Risk:

60 × 0.40 = 24

Equal Opportunity Risk:

50 × 0.25 = 12.5

Compliance Risk:

30 × 0.20 = 6

Grievance Risk:

40 × 0.15 = 6

Expected Risk Score

"48.5"

Expected Assessment

"MEDIUM"

Expected Recommendation

"ACTIVATE PREVENTIVE HUMAN RIGHTS RESILIENCE MODE"

Validation

"PASS"

Test Case 5 — Occupational Health & Safety Risk Assessment

Scenario

"BHR-005"

Rule

"BHR-005 Occupational Health & Safety"

Input

{
    safetyRisk: 70,
    incidentRate: 60,
    workerProtection: 40,
    complianceRisk: 30
}

Expected Calculation

Safety Risk:

70 × 0.40 = 28

Incident Rate:

60 × 0.25 = 15

Worker Protection Failure:

(100 - 40) × 0.20 = 12

Compliance Risk:

30 × 0.15 = 4.5

Expected Risk Score

"59.5"

Expected Assessment

"MEDIUM"

Expected Recommendation

"ACTIVATE PREVENTIVE HUMAN RIGHTS RESILIENCE MODE"

Validation

"PASS"

Test Case 6 — Modern Slavery Risk Assessment

Scenario

"BHR-006"

Rule

"BHR-006 Modern Slavery"

Input

{
    modernSlaveryRisk: 80,
    supplyChainRisk: 70,
    workerVulnerability: 60,
    monitoringFailure: 50
}

Expected Calculation

Modern Slavery Risk:

80 × 0.40 = 32

Supply Chain Risk:

70 × 0.25 = 17.5

Worker Vulnerability:

60 × 0.20 = 12

Monitoring Failure:

50 × 0.15 = 7.5

Expected Risk Score

"69"

Expected Assessment

"HIGH"

Expected Recommendation

"ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE"

Validation

"PASS"

# Test Case 7 — Community Impact Risk Assessment

## Scenario

`BHR-007`

## Rule

`BHR-007 Community Impact`

## Input

```javascript
{
    environmentalImpact: 60,
    socialImpact: 70,
    communityEngagement: 40,
    mitigationFailure: 50
}

Expected Calculation

Environmental Impact:

60 × 0.30 = 18

Social Impact:

70 × 0.30 = 21

Community Engagement Failure:

(100 - 40) × 0.20 = 12

Mitigation Failure:

50 × 0.20 = 10

Expected Risk Score

"61"

Expected Assessment

"HIGH"

Expected Recommendation

"ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE"

Validation

"PASS"

Test Case 8 — Indigenous Rights Risk Assessment

Scenario

"BHR-008"

Rule

"BHR-008 Indigenous Rights"

Input

{
    landRightsRisk: 70,
    consultationFailure: 80,
    culturalImpact: 60,
    mitigationCapability: 30
}

Expected Calculation

Land Rights Risk:

70 × 0.30 = 21

Consultation Failure:

80 × 0.30 = 24

Cultural Impact:

60 × 0.20 = 12

Mitigation Capability Failure:

(100 - 30) × 0.20 = 14

Expected Risk Score

"71"

Expected Assessment

"HIGH"

Expected Recommendation

"ACTIVATE HUMAN RIGHTS PROTECTION AND REMEDIATION MODE"

Validation

"PASS"

Test Case 9 — Supply Chain Risk Assessment

Scenario

"BHR-009"

Rule

"BHR-009 Supply Chain Risk"

Input

{
    supplierRisk: 70,
    auditFailure: 60,
    labourRisk: 50,
    traceabilityRisk: 40
}

Expected Calculation

Supplier Risk:

70 × 0.35 = 24.5

Audit Failure:

60 × 0.25 = 15

Labour Risk:

50 × 0.20 = 10

Traceability Risk:

40 × 0.20 = 8

Expected Risk Score

"57.5"

Expected Assessment

"MEDIUM"

Expected Recommendation

"ACTIVATE PREVENTIVE HUMAN RIGHTS RESILIENCE MODE"

Validation

"PASS"