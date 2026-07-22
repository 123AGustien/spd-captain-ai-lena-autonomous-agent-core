FIN-003 — Liquidity Stress

Rule Information

- Rule ID: FIN-003
- Domain: Financial Resilience
- Category: Liquidity Risk
- Status: Active
- Version: 1.0
- Repository: Sextant Rule Library

---

Purpose

Evaluate the resilience of the financial system during periods of liquidity stress and assess potential cascading effects across interconnected domains.

---

Scenario

Funding liquidity begins to tighten as financial institutions experience increasing difficulty obtaining short-term financing.

Market liquidity deteriorates, reducing the ability to buy or sell assets efficiently.

The scenario evaluates:

- Banking system liquidity
- Interbank funding conditions
- Short-term funding markets
- Cash flow availability
- Market confidence

---

Primary Indicators

- Interbank lending rates
- Liquidity coverage ratios
- Cash reserve levels
- Funding spreads
- Overnight borrowing activity
- Short-term money market conditions

---

Risk Levels

GREEN — Normal Liquidity

Normal liquidity conditions.

Funding markets operate efficiently with adequate liquidity.

Action:

No contingency actions required.

---

YELLOW — Early Liquidity Tightening

Early signs of liquidity tightening.

Monitor:

- Interbank lending activity
- Funding spreads
- Cash reserve levels

Action:

Increase monitoring frequency and review liquidity positions.

---

ORANGE — Significant Liquidity Stress

Significant liquidity stress is developing.

Indicators:

- Reduced market liquidity
- Increasing funding costs
- Higher interbank borrowing rates
- Declining market confidence

Potential Cascade:

Liquidity Stress
↓
Funding Constraints
↓
Credit Tightening
↓
Financial Market Pressure

Action:

Prepare liquidity contingency measures and strengthen monitoring.

---

RED — Severe Liquidity Disruption

Severe liquidity disruption is occurring.

Indicators:

- Funding market dysfunction
- Critical liquidity shortages
- Rapid withdrawal of funding
- Elevated systemic stress

Potential Cascade:

Liquidity Crisis
↓
Banking Sector Stress
↓
Credit Market Disruption
↓
Systemic Financial Instability

Action:

Activate emergency liquidity management procedures and systemic risk response.

---

Cross-Domain Dependencies

Financial (FIN)
↓
Infrastructure (INF)
↓
Cyber (CYB)
↓
Data Centre Operations (DC)

Liquidity stress may propagate operational risks across interconnected systems.

---

Contingency Actions

1. Monitor liquidity conditions continuously.
2. Review available funding sources.
3. Assess cash flow resilience.
4. Evaluate systemic contagion risks.
5. Increase reporting frequency.
6. Escalate to institutional risk management when thresholds are exceeded.

---

Simulation Output

The SPD engine should produce:

- Risk Level
- Cascade Path
- Affected Domains
- Recommended Contingency Actions
- Audit Log Entry

---

Engine Mapping

Rule File:

"FIN/FIN-003-Liquidity-Stress.md"

Primary Domain:

"FIN"

Related Domains:

"INF", "CYB", "DC"

Rule Function:

Evaluate liquidity stress, identify systemic financial pressure, assess cross-domain propagation, and generate appropriate resilience and contingency actions.

---

Golden Rule Execution

The rule is processed through the authoritative SPD Golden Rule pipeline:

OBSERVE
↓
VERIFY
↓
ASSESS
↓
DECIDE
↓
ACT
↓
UPDATE

The rule does not independently override the authoritative Golden Rule Engine.

The backend implementation remains the source of truth for deterministic assessment, decision logic, action generation, and audit execution.

---

Validation Principle

The FIN-003 rule should be validated through the SPD v13 self-test and validation framework.

The validation process should confirm:

1. Scenario input is accepted.
2. Liquidity stress conditions are correctly represented.
3. The authoritative rule engine processes the scenario.
4. Risk classification is generated deterministically.
5. Cascade pathways are identified.
6. Affected domains are recorded.
7. Recommended actions are generated.
8. The execution is recorded in the audit log.
9. Any validation fault is identified.
10. Corrective action is applied only where required.
11. The scenario is re-tested.
12. Final validation status is recorded.

---

Governing Principle

«Protect system stability before optimization.»

The FIN-003 rule supports the SPD resilience objective of identifying financial stress early, containing uncontrolled propagation, maintaining system availability, and preserving an auditable decision path.

---

Status

ACTIVE

Rule ID: "FIN-003"

Domain: "FIN"

Version: "1.0"