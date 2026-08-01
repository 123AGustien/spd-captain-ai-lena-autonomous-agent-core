Yes Captain Don. Before upgrading the code, a README is the right step. It will document the architecture and prevent breaking the validated SPD v13.1 core.
Writing
SPD v13.1 — Scenario Rule Integration Upgrade README
🛰️ Purpose
This upgrade adds Scenario Rule Visibility and Domain Intelligence Integration to SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO.
The objective is to connect scenario-specific rule engines (FIN, BHR, future domains) into the existing Captain AI Lena decision pipeline while preserving the validated autonomous core.
Core Principle
Domain Rules Advise
Golden Rule Engine Validates
Captain AI Lena Decides
Domain scenario engines provide specialist assessments.
They do not override:
Golden Rule Engine authority
Captain AI Lena final decision authority
Deterministic validation logic
Existing Validated Architecture
DATA
 ↓
ALGORITHMS
 ↓
COMPUTE
 ↓
SELF-TEST
 ↓
FAULT IDENTIFICATION
 ↓
CAPTAIN AI LENA DECISION
 ↓
CORRECTIVE ACTION
 ↓
RE-TEST VALIDATION
Status:
SPD v13.1 VALIDATION COMPLETE
Scenario Rule Upgrade Architecture
SCENARIO BUTTON
        ↓
domainIntegration.js
        ↓
Scenario Registry
        ↓
Domain Rule Engine
        ↓
Domain Validation Engine
        ↓
Domain Decision Bridge
        ↓
Golden Rule Engine
        ↓
Captain AI Lena Decision Core
        ↓
Action Engine
        ↓
Memory Core
        ↓
Audit Record
        ↓
Re-Test Validation
Upgrade Objectives
1. Scenario Identification
Each cockpit scenario must map to an authoritative rule set.
Example:
FIN_STRESS
        ↓
FIN Rule Engine
CHILD_LABOUR
        ↓
BHR Rule Engine
2. Rule Evidence Output
Each domain engine should provide:
{
 "domain": "FIN",
 "scenario": "FIN_STRESS",

 "rulesApplied": [
   "FIN-001",
   "FIN-002",
   "FIN-003"
 ],

 "ruleStatus":
 "ASSESSMENT COMPLETE",

 "domainRisk":
 "MEDIUM",

 "domainStress": 45
}
3. Domain Decision Bridge
Purpose:
Translate domain intelligence into a standard Captain AI Lena input format.
The bridge must preserve:
sourceDomainResult
domainAssessment
risk
decision
action
Authority remains:
Golden Rule Engine
        ↓
Captain AI Lena
4. FIN Upgrade
Initial implementation:
Financial Resilience Domain
Scenarios:
FIN_STRESS
BANKING_STRESS
LIQUIDITY_CRISIS
CREDIT_STRESS
SOVEREIGN_DEBT
Rules:
FIN-001 Foreign Exchange Stress
FIN-002 Liquidity Risk
FIN-003 Credit Stress
FIN-004 Banking Stability
FIN-005 Sovereign Risk
5. BHR Upgrade
Business & Human Rights Domain
Scenarios:
HUMAN RIGHTS DUE DILIGENCE
FORCED LABOUR
CHILD LABOUR
DISCRIMINATION
OCCUPATIONAL HEALTH & SAFETY
MODERN SLAVERY
COMMUNITY IMPACT
INDIGENOUS RIGHTS
SUPPLY CHAIN RISK
GRIEVANCE MECHANISM
Validation Requirements
Every new scenario rule integration must pass:
Scenario Test
Scenario Selected
↓
Correct Rule Engine Activated
Rule Test
Rules Applied
↓
Assessment Generated
Golden Rule Test
OBSERVE
VERIFY
ASSESS
DECIDE
ACT
UPDATE
Authority Test
Verify:
Domain Engine = Advisory

Golden Rule Engine = Authority

Captain AI Lena = Final Decision
Non-Negotiable Protection Rules
The upgrade must NOT change:
✅ PHI constant
1.618033988749895
✅ Golden Score calculation
✅ Risk classification logic
✅ Captain AI Lena decision authority
✅ Self-test validation engine
✅ Memory Core compatibility
✅ Audit Record compatibility
✅ Deterministic behaviour
Must remain:
No Machine Learning
No Randomness
No Hidden Decision Layer
Implementation Sequence
Phase 1
FIN Scenario Rule Visibility
↓
Phase 2
BHR Scenario Rule Visibility
↓
Phase 3
Domain Decision Bridge Enhancement
↓
Phase 4
Cockpit Rule Assessment Display
↓
Phase 5
Full Scenario Validation
Final Success Criteria
SPD v13.1 must show:
SCENARIO
        ↓
RULES APPLIED
        ↓
DOMAIN ASSESSMENT
        ↓
GOLDEN RULE VALIDATION
        ↓
CAPTAIN AI LENA DECISION
        ↓
ACTION
        ↓
AUDIT
Final status:
SPD v13.1 SCENARIO RULE INTEGRATION
VALIDATION COMPLETE
This README can become the guide for the next development branch. The next technical step after this document is to verify the existing FIN/fin-rule-engine.js output before adding anything.