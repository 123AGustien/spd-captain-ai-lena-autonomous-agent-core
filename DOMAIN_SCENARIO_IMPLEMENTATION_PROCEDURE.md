# 🛰️ SPD v13.1 — DOMAIN & SCENARIO IMPLEMENTATION PROCEDURE

## Standard Procedure for Adding New Domains and Scenarios

**System:** SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO  
**Architecture:** Captain AI Lena Autonomous Agent Core  
**Governance:** AI Decision Support → HUMAN OPERATOR AUTHORIZATION

---

# 1. PURPOSE

This document defines the mandatory implementation procedure for adding:

- New resilience domains
- New domain rule engines
- New domain rules
- New cockpit scenarios
- New scenario buttons
- New scenario-to-domain mappings

All future domain and scenario development MUST follow this procedure.

The objective is to prevent disconnected scenarios, duplicate logic,
unregistered engines, or cockpit controls that do not reach the
authoritative domain rule engine.

---

# 2. CORE ARCHITECTURE

All domain scenarios must follow:

COCKPIT
↓
SCENARIO ENGINE
↓
DOMAIN INTEGRATION LAYER
↓
AUTHORITATIVE DOMAIN RULE ENGINE
↓
CORE EXECUTION ENGINE
↓
CAPTAIN AI LENA DECISION CORE
↓
GOLDEN RULE PIPELINE
↓
ASSESSMENT
↓
DECISION SUPPORT
↓
HUMAN AUTHORIZATION
↓
MEMORY / AUDIT

Golden Rule:

OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

AI provides decision support.

HUMAN_OPERATOR retains final execution authority.

No autonomous recovery execution is permitted.

---

# 3. NEW DOMAIN PROCEDURE

When creating a completely new domain:

## Step 1 — Define Domain

Assign:

- Domain ID
- Domain name
- Purpose
- Domain status

Example:

NEW:
  id: "ENG"
  name: "Energy Resilience"
  status: "ACTIVE"

---

## Step 2 — Create Domain Directory

Create:

domains/<DOMAIN_ID>/

Example:

domains/ENG/

---

## Step 3 — Create Authoritative Rule Engine

Create:

domains/<DOMAIN_ID>/<DOMAIN>RuleEngine.js

Example:

domains/ENG/ENGRuleEngine.js

The rule engine must contain:

- Rule registry
- Scenario map
- Input validation
- Deterministic assessment
- Risk classification
- Resilience calculation
- Cascade generation where applicable
- Contingency recommendations
- Human authorization governance
- Audit output
- evaluate() function
- getStatus() function

The engine must NOT execute autonomous recovery.

---

# 4. DOMAIN RULE REQUIREMENTS

Each domain rule should have:

- Unique rule ID
- Rule name
- Category
- Scenario identifier
- Deterministic calculation
- Risk classification
- Resilience assessment
- Cascade assessment where applicable
- Contingency actions
- Governance output
- Audit information

Example:

"ENG-001": {
  id: "ENG-001",
  name: "Power Generation Failure",
  category: "ENERGY_INFRASTRUCTURE",
  scenario: "GENERATION_FAILURE"
}

Rule IDs must never be duplicated.

---

# 5. SCENARIO MAP

Every authoritative domain engine must contain a scenario map.

Example:

const SCENARIO_MAP = {

  GENERATION_FAILURE: "ENG-001",
  FUEL_SHORTAGE: "ENG-002",
  GRID_INSTABILITY: "ENG-003"

};

Every scenario must resolve to an authoritative rule.

---

# 6. DOMAIN INTEGRATION LAYER

Update:

domainIntegration.js

Required changes:

### A. Import the new rule engine

Example:

import * as ENGRuleEngine
  from "./domains/ENG/ENGRuleEngine.js";


### B. Add domain to DOMAIN_REGISTRY

Example:

ENG: {
  id: "ENG",
  name: "Energy Resilience",
  status: "ACTIVE"
}


### C. Add engine to DOMAIN_ENGINES

Example:

ENG:
  ENGRuleEngine


### D. Add every scenario to SCENARIO_DOMAIN_MAP

Example:

GENERATION_FAILURE:
  "ENG",

FUEL_SHORTAGE:
  "ENG",

GRID_INSTABILITY:
  "ENG"


### E. Verify domain integration

The new domain must appear in:

getDomainStatus()

listDomains()

verifyDomainIntegration()

The engine must report:

engineRegistered: true

evaluateAvailable: true

---

# 7. SCENARIO ENGINE

Update:

scenarioEngine.js

For every new scenario add:

### A. Scenario resolution

Example:

case "GENERATION_FAILURE":
  return "GENERATION FAILURE SCENARIO";


### B. Scenario domain identification

Example:

case "GENERATION_FAILURE":
  return "ENG";


The scenario must therefore be recognised by both:

scenarioEngine()

and

getScenarioDomain()

---

# 8. COCKPIT INTEGRATION

Add a visible cockpit control only after the authoritative
scenario has been implemented.

Example:

GENERATION FAILURE

The cockpit control must produce the exact scenario identifier:

GENERATION_FAILURE

Do not create a cockpit button for an unregistered scenario.

---

# 9. CORE EXECUTION ENGINE

The Core Execution Engine normally does NOT require new
domain-specific calculation logic.

It should continue to use:

resolveDomain()

executeDomainRule()

getDomainStatus()

The domain-specific assessment remains inside the authoritative
domain rule engine.

The Core Execution Engine receives the domain result and passes
decision support into Captain AI Lena.

---

# 10. CAPTAIN AI LENA

Captain AI Lena remains the higher-level decision-support layer.

Domain engines remain authoritative for:

- Domain assessment
- Domain risk
- Domain resilience
- Domain-specific contingency recommendations

Captain AI Lena provides:

- System-level assessment
- Decision support
- Priority
- Recommended response
- Human authorization requirement

---

# 11. GOLDEN RULE PIPELINE

Every new domain must remain compatible with:

OBSERVE
→ VERIFY
→ ASSESS
→ DECIDE
→ ACT
→ UPDATE

The domain engine must not bypass this architecture.

---

# 12. HUMAN AUTHORITY

Every new domain must explicitly preserve:

executionAuthority:
  "HUMAN_OPERATOR"

humanAuthorizationRequired:
  true

autonomousExecution:
  false

Execution status must indicate:

HUMAN_AUTHORIZATION_REQUIRED

No domain rule may directly execute recovery actions.

Contingency actions are recommendations only.

---

# 13. MEMORY AND AUDIT

Every successful domain evaluation must produce sufficient
information for the Memory Core and Audit Core.

At minimum:

- Domain
- Scenario
- Rule ID
- Risk
- Stress
- Resilience score
- Decision/recommendation
- Timestamp
- Execution authority
- Authorization status

---

# 14. TESTING PROCEDURE

After implementing a new domain:

## Test 1 — Rule Registration

Verify every rule exists.

---

## Test 2 — Scenario Resolution

Verify:

scenario
→ rule

---

## Test 3 — Domain Resolution

Verify:

scenario
→ domain

---

## Test 4 — Engine Registration

Verify:

domain
→ authoritative rule engine

---

## Test 5 — Engine Evaluation

Verify:

scenario + state
→ deterministic assessment

---

## Test 6 — Risk Classification

Verify expected:

GREEN
YELLOW
ORANGE
RED

---

## Test 7 — Resilience Calculation

Verify deterministic resilience score.

---

## Test 8 — Cascade

Verify cascade output where applicable.

---

## Test 9 — Decision Support

Verify Captain AI Lena receives the domain assessment.

---

## Test 10 — Human Authorization

Verify:

NO AUTONOMOUS EXECUTION

---

## Test 11 — Audit

Verify audit record is generated.

---

## Test 12 — Full Cockpit Integration

Verify:

COCKPIT
→ SCENARIO ENGINE
→ DOMAIN INTEGRATION
→ DOMAIN RULE ENGINE
→ CORE EXECUTION ENGINE
→ CAPTAIN AI LENA
→ GOLDEN RULE
→ RESULT
→ MEMORY
→ AUDIT

---

# 15. NEW SCENARIO ONLY PROCEDURE

If adding a scenario to an EXISTING domain:

DO NOT create a new domain.

Instead:

1. Add rule to the existing domain rule engine.
2. Add scenario to the domain SCENARIO_MAP.
3. Add scenario to domainIntegration.js.
4. Add scenario to scenarioEngine.js.
5. Add scenario domain identification.
6. Add cockpit control if required.
7. Add deterministic test.
8. Run domain integration validation.
9. Run full system validation.

---

# 16. EXISTING DOMAIN UPDATE PROCEDURE

If modifying an existing domain:

1. Identify authoritative domain engine.
2. Modify only the domain-specific rule logic.
3. Preserve existing scenario mappings.
4. Preserve domain registration.
5. Preserve human authorization.
6. Update tests.
7. Run domain self-test.
8. Run domain integration test.
9. Run full cockpit validation.
10. Record the change in the audit/release documentation.

---

# 17. DO NOT CREATE DUPLICATE LOGIC

The cockpit must NOT become an alternative rule engine.

The Scenario Engine resolves scenarios.

The Domain Integration Layer routes scenarios.

The Domain Rule Engine performs authoritative domain assessment.

The Core Execution Engine coordinates execution.

Captain AI Lena provides higher-level decision support.

This separation must be preserved.

---

# 18. INFRASTRUCTURE STRESS SPECIAL NOTE

`INFRASTRUCTURE_STRESS` is currently recognised by:

scenarioEngine.js

and:

getScenarioDomain()

as:

DC

However, it is NOT currently registered as a DC authoritative
rule in the supplied DCRuleEngine.js.

Therefore:

INFRASTRUCTURE_STRESS

must NOT be treated as a completed DC rule until a corresponding
DC rule is deliberately created and registered.

If later required, implement:

DC-011 — Infrastructure Stress

(or the next available unique DC rule ID)

Then add it to:

1. DCRuleEngine.js
2. DC SCENARIO_MAP
3. domainIntegration.js
4. scenarioEngine.js
5. cockpit scenario control
6. DC tests
7. domain integration tests
8. full system validation

Do NOT simply add a cockpit button without the authoritative rule.

---

# 19. CURRENT ACTIVE DOMAINS

The current SPD v13.1 architecture includes:

FIN — Financial Resilience
BHR — Business & Human Rights Resilience
DC — Data Centre Resilience
CYB — Cyber Resilience

Planned domains include:

FX — Foreign Exchange
INF — Infrastructure
ENG — Energy
OPS — Operations

A planned domain must remain:

status: "PLANNED"

until its authoritative rule engine has been created,
registered, tested, and integrated.

---

# 20. IMPLEMENTATION CHECKLIST

Before declaring a new domain/scenario COMPLETE:

[ ] Domain defined

[ ] Domain directory created

[ ] Authoritative rule engine created

[ ] Rules registered

[ ] Scenario map created

[ ] Domain registered in domainIntegration.js

[ ] Rule engine imported

[ ] Engine registered

[ ] Scenario mapped to domain

[ ] scenarioEngine.js updated

[ ] getScenarioDomain() updated

[ ] Cockpit control added

[ ] Core Execution Engine verified

[ ] Captain AI Lena integration verified

[ ] Golden Rule Pipeline verified

[ ] Risk classification tested

[ ] Resilience calculation tested

[ ] Cascade tested

[ ] Contingency recommendations tested

[ ] Human authorization verified

[ ] Autonomous execution confirmed FALSE

[ ] Memory output verified

[ ] Audit output verified

[ ] Domain integration test PASS

[ ] Self-test PASS

[ ] Full system test PASS

[ ] Documentation updated

[ ] Release/commit recorded

---

# 21. COMPLETION STANDARD

A domain or scenario is considered:

## IMPLEMENTED

only when the authoritative rule exists.

## WIRED

only when the cockpit/scenario reaches the authoritative
domain rule through the Domain Integration Layer.

## VALIDATED

only when deterministic tests and integration tests pass.

## COMPLETE

only when:

IMPLEMENTED
+
WIRED
+
VALIDATED
+
HUMAN AUTHORITY VERIFIED

---

# 22. GOLDEN RULE FOR FUTURE DEVELOPMENT

For every future domain or scenario:

DO NOT JUST ADD A BUTTON.

Build the complete chain:

DATA
→
ALGORITHM
→
COMPUTE
→
OBSERVE
→
VERIFY
→
ASSESS
→
DECIDE
→
ACT
→
UPDATE
→
MEMORY
→
AUDIT

The cockpit is the interface.

The Domain Integration Layer is the gateway.

The Domain Rule Engine is the authoritative domain logic.

Captain AI Lena is the decision-support layer.

The HUMAN OPERATOR remains the final execution authority.

---

## END OF PROCEDURE

SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO

Standard Domain & Scenario Implementation Procedure