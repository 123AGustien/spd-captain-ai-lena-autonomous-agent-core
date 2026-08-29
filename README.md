
⚓ SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO

Captain AI Lena Autonomous Agent Core • UMV / Dynamic Positioning Operational Resilience

Triple-Layer Decision Resilience • Deterministic Local Simulation • Human Operator / DPO Decision Authority

---

🟢 SYSTEM STATUS

UMV / DP ASSESSMENT AND DECISION-SUPPORT SIMULATOR

SPD v13.1 — Sextant Resilience Cockpit Pro is a deterministic local simulation and decision-support architecture for Unmanned Marine Vehicle (UMV) and Dynamic Positioning (DP) resilience assessment.

The system evaluates abnormal operational conditions through independent assessment layers, cascading-condition recognition, controlled trial manoeuvre simulation, independent validation and final human operational decision recording.

«AI DECISION SUPPORT → HUMAN OPERATOR / DPO AUTHORIZATION»

Captain AI Lena provides controlled decision support.

Captain AI Lena does not independently authorize physical operational action.

---

🧭 UMV / DP RESILIENCE DECISION PIPELINE

The current operational simulation pipeline is:

ABNORMAL CONDITION
        ↓
OBSERVE
        ↓
VERIFY
        ↓
ASSESS
        ↓
CASCADE
        ↓
PRIMARY AI
        ↓
SECONDARY AI
        ↓
STABILIZER / CAPTAIN AI LENA
        ↓
TRIAL MANOEUVRE
        ↓
INDEPENDENT VALIDATION
        ↓
HUMAN OPERATOR / DPO
        ↓
CONTROLLED OPERATIONAL DECISION

Pipeline stages

Stage| Function
OBSERVE| Receives the simulated abnormal condition
VERIFY| Establishes the simulated operational condition
ASSESS| Calculates system stress, resilience and risk
CASCADE| Identifies possible cascading operational conditions
PRIMARY AI| Performs independent first-pass assessment
SECONDARY AI| Performs independent cross-check
STABILIZER| Reconciles the assessment layers
TRIAL| Simulates the proposed manoeuvre
VALIDATE| Independently validates the simulated trial
HUMAN / DPO| Records the final operational decision

---

🧠 TRIPLE-LAYER DECISION RESILIENCE

SPD v13.1 uses three decision-support layers.

PRIMARY AI

The Primary AI performs an independent first-pass assessment of the abnormal condition.

It evaluates:

- Observed condition
- Severity
- Domain
- Raw stress
- Risk
- Confidence
- Initial recommendation

Example:

{
  "agent": "PRIMARY AI",
  "assessment": "Independent first-pass abnormal-condition assessment",
  "domain": "UMV_DP",
  "severity": "HIGH",
  "observedCondition": "THRUSTER FAILURE",
  "rawStress": 31,
  "risk": "LOW",
  "confidence": "HIGH",
  "recommendation": "ISOLATE FAILED THRUSTER / MAINTAIN SAFE DP STATE"
}

---

SECONDARY AI

The Secondary AI performs an independent cross-check.

The Secondary AI is designed not simply to copy the Primary AI assessment.

Example:

{
  "agent": "SECONDARY AI",
  "assessment": "Independent cross-check",
  "independent": true,
  "domain": "UMV_DP",
  "observedCondition": "THRUSTER FAILURE",
  "risk": "LOW",
  "criticalDomains": [
    "DC"
  ],
  "recommendation": "ISOLATE FAILED THRUSTER / MAINTAIN SAFE DP STATE"
}

---

STABILIZER / CAPTAIN AI LENA

The Stabilizer / Captain AI Lena layer reconciles the independent assessment layers.

Its role is:

- Compare Primary AI assessment
- Compare Secondary AI assessment
- Evaluate cascade recognition
- Produce controlled decision support
- Generate a proposed operational response
- Maintain the human-authority execution gate

Example:

{
  "agent": "STABILIZER / CAPTAIN AI LENA",
  "role": "Decision reconciliation and controlled UMV / DP decision support",
  "domain": "UMV_DP",
  "primaryRisk": "LOW",
  "secondaryRisk": "LOW",
  "cascadeDetected": false,
  "finalRisk": "LOW",
  "resilienceScore": 80.841,
  "decision": "ISOLATE FAILED THRUSTER / MAINTAIN SAFE DP STATE"
}

---

🔗 CASCADING-CONDITION RECOGNITION

The simulator evaluates whether an initial abnormal condition may create secondary or cascading operational consequences.

For example:

THRUSTER FAILURE
       ↓
LOSS OF PROPULSION REDUNDANCY
       ↓
INCREASED STATION-KEEPING DEMAND
       ↓
POSSIBLE POSITION DEVIATION

The cascade layer records:

- Whether a cascade was detected
- The relevant domain
- The potential cascading condition
- Critical domain values
- Whether containment is required

Example:

{
  "detected": false,
  "domain": "UMV_DP",
  "condition": "Loss of propulsion redundancy may produce position deviation and increased station-keeping demand.",
  "criticalDomains": [
    {
      "domain": "dc",
      "value": 80
    }
  ],
  "containmentRequired": false
}

---

⚓ TRIAL MANOEUVRE SIMULATION

SPD v13.1 supports a simulation-only trial manoeuvre stage.

The trial manoeuvre does not control physical equipment.

It records the proposed action and simulates the expected operational response.

Example:

{
  "trial": {
    "domain": "UMV_DP",
    "scenario": "THRUSTER_FAILURE",
    "mode": "SIMULATION_ONLY",
    "physicalExecution": false,
    "backendConnection": false,
    "automaticRecovery": false,
    "proposedAction": "ISOLATE FAILED THRUSTER / MAINTAIN SAFE DP STATE",
    "result": "TRIAL MANOEUVRE SIMULATED",
    "executionGate": "HUMAN_AUTHORIZATION_REQUIRED"
  }
}

Trial manoeuvre safety boundary

The simulator:

- Does not command thrusters
- Does not command propulsion
- Does not command steering
- Does not command power systems
- Does not connect to a physical UMV
- Does not connect to a live DP system
- Does not execute automatic recovery

---

🔎 INDEPENDENT VALIDATION CORE V1

Every simulated trial manoeuvre can be independently validated.

The Validation Core checks that the trial:

- Exists
- Is deterministic
- Remains simulation-only
- Has no backend connection
- Has no physical execution
- Has no automatic recovery
- Remains behind the human authorization gate

Example successful validation:

{
  "validator": "VALIDATION CORE V1",
  "domain": "UMV_DP",
  "trialPresent": true,
  "deterministic": true,
  "backendConnection": false,
  "physicalExecution": false,
  "automaticRecovery": false,
  "result": "PASS",
  "executionGate": "HUMAN_AUTHORIZATION_REQUIRED"
}

---

🧑‍✈️ HUMAN OPERATOR / DPO DECISION AUTHORITY

The final operational authority remains with the Human Operator / DPO.

The architecture is:

AI DECISION SUPPORT
        ↓
HUMAN OPERATOR / DPO
        ↓
FINAL OPERATIONAL DECISION

Available decision states include:

AUTHORIZE_RECOVERY
MAINTAIN_SAFE_STATE
REQUEST_DIAGNOSTICS
ABORT_RECOVERY
ESCALATE_TO_MISSION_AUTHORITY

The simulator records the human decision.

It does not convert the recorded decision into physical equipment control.

---

🔒 EXECUTION GATE

The core safety boundary is:

HUMAN_AUTHORIZATION_REQUIRED

The simulator explicitly maintains:

{
  "authority": "UMV_OPERATOR_DPO",
  "executionGate": "HUMAN_AUTHORIZATION_REQUIRED",
  "physicalExecution": false,
  "automaticRecovery": false,
  "backendConnection": false
}

Therefore:

«No recovery action is automatically executed by the simulator.»

---

📊 RESILIENCE ASSESSMENT

SPD v13.1 uses the existing Golden Rule resilience calculation.

PHI

φ = 1.618033988749895

Golden Score

goldenScore = rawStress × (1 / PHI)

Resilience Score

resilienceScore = 100 - goldenScore

subject to the system's configured lower bound.

Example tested result:

Raw Stress:       31
Golden Score:     19.159
Resilience Score: 80.841
Risk:             LOW

---

🧪 VERIFIED UMV / DP TEST

Scenario: THRUSTER FAILURE

The current demonstrated test followed the complete decision-support chain.

Simulated system state

{
  "fx": 10,
  "energy": 35,
  "cyb": 10,
  "inf": 20,
  "dc": 80
}

Assessment

Raw Stress:       31
Golden Score:     19.159
Resilience Score: 80.841
Risk:             LOW

Decision-support recommendation

ISOLATE FAILED THRUSTER /
MAINTAIN SAFE DP STATE

Trial manoeuvre

TRIAL MANOEUVRE SIMULATED

Independent validation

VALIDATION CORE V1
RESULT: PASS

Human decision

The Human Operator / DPO subsequently recorded:

AUTHORIZE_RECOVERY

The system nevertheless maintained:

physicalExecution: false
automaticRecovery: false
backendConnection: false

Therefore the simulator recorded the human authorization without executing a physical recovery action.

---

🧾 AUDIT TRAIL

SPD v13.1 maintains an audit record of significant pipeline events.

Typical records include:

SIMULATOR_INITIALIZED
SCENARIO_LOADED
PIPELINE_STARTED
GOLDEN_RULE_COMPLETED
TRIAL_MANOEUVRE_SIMULATED
TRIAL_MANOEUVRE_VERIFICATION
HUMAN_DECISION

This creates a chronological record of the simulated decision-support process.

---

🧠 MEMORY CORE

The simulator maintains operational memory for the current simulation session.

The memory structure includes:

{
  "lastScenario": null,
  "lastDomain": null,
  "lastDecision": null,
  "lastAssessment": null,
  "lastCascade": null,
  "lastTrialManoeuvre": null,
  "lastValidation": null,
  "lastHumanDecision": null,
  "timestamp": null
}

After a completed scenario, the memory core can retain:

- Last scenario
- Last domain
- Last decision
- Last assessment
- Cascade assessment
- Trial manoeuvre
- Validation result
- Human decision
- Timestamp

---

⚙️ VALIDATION AND TESTING FRAMEWORK

SPD v13.1 provides the following validation controls:

RUN UMV SYSTEM
RUN SELF-TEST
SELF-TEST + CORRECTIVE ASSESSMENT
FINAL INTEGRATION TEST
RESET SIMULATOR

Self-Test

Checks the simulator's internal functional state.

Corrective Assessment

Provides an assessment pathway when a fault is identified during validation.

Re-Test

Allows the corrected state to be tested again.

Final Integration Test

Provides an end-to-end test of the integrated simulation architecture.

---

🧪 VALIDATION PIPELINE

The validation architecture includes:

SELF_TEST
      ↓
FAULT_IDENTIFICATION
      ↓
CORRECTIVE_ACTION_ASSESSMENT
      ↓
RE_TEST
      ↓
END_TO_END

The objective is to verify that the simulator remains deterministic and that the major decision-support components operate coherently.

---

⚓ UMV / DP SCENARIO LIBRARY

The current simulator interface provides scenarios including:

- Thruster Failure
- Power Failure
- Position Deviation
- High Wind Load
- Drift Off
- Multiple Thruster Failure
- Worst Case Failure

These scenarios are intended for controlled resilience testing and decision-support evaluation.

---

🏗️ SYSTEM ARCHITECTURE

                UMV / DP ENVIRONMENT
                        │
                        ▼
                    OBSERVE
                        │
                        ▼
                    VERIFY
                        │
                        ▼
                    ASSESS
                        │
                        ▼
                    CASCADE
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
         PRIMARY AI         SECONDARY AI
              │                   │
              └─────────┬─────────┘
                        ▼
              STABILIZER /
            CAPTAIN AI LENA
                        │
                        ▼
                TRIAL MANOEUVRE
                        │
                        ▼
             VALIDATION CORE V1
                        │
                        ▼
              HUMAN OPERATOR / DPO
                        │
                        ▼
             CONTROLLED DECISION

---

🛡️ OPERATIONAL SAFETY BOUNDARIES

SPD v13.1 is intentionally designed as a decision-support simulator, not as a direct control system.

The current implementation explicitly maintains:

No backend connection

backendConnection = false

No physical execution

physicalExecution = false

No automatic recovery

automaticRecovery = false

Human authorization required

executionGate = HUMAN_AUTHORIZATION_REQUIRED

These boundaries are preserved throughout the trial and validation stages.

---

🎯 PURPOSE OF THE UMV / DP TESTBED

The UMV / DP simulator provides a controlled environment for evaluating whether the Sextant Protocol architecture can:

1. Recognize an abnormal condition.
2. Assess the condition independently.
3. Cross-check the assessment.
4. Identify possible cascading conditions.
5. Reconcile independent assessments.
6. Produce controlled decision support.
7. Simulate a proposed manoeuvre.
8. Independently validate the simulated manoeuvre.
9. Present the result to the Human Operator / DPO.
10. Record the final human decision.
11. Preserve an auditable decision trail.

---

🤝 TESTBED / INDUSTRIAL COOPERATION

The current implementation is suitable for discussion with organizations possessing:

- DP simulators
- UMV testbeds
- Maritime autonomy test environments
- Decision-support research platforms
- Marine control-system simulation environments
- Human-in-the-loop testing facilities

The intended next step for an appropriate technical collaboration is to evaluate the Sextant Protocol architecture within a suitable research or industrial testbed, subject to the testbed owner's technical, safety, cybersecurity and operational requirements.

No assumption is made that the current local simulator is connected to or approved for use with any external DP or UMV system.

---

📌 CURRENT IMPLEMENTATION STATUS

Component| Status
UMV / DP simulator| 🟢 Operational
Deterministic local execution| 🟢 Active
Primary AI layer| 🟢 Implemented
Secondary AI layer| 🟢 Implemented
Stabilizer / Captain AI Lena| 🟢 Implemented
Cascade recognition| 🟢 Implemented
Trial manoeuvre simulation| 🟢 Implemented
Validation Core V1| 🟢 Implemented
Human Operator / DPO authority| 🟢 Implemented
Human decision recording| 🟢 Implemented
Audit record| 🟢 Implemented
Memory Core| 🟢 Implemented
Backend connection| 🔴 Not connected
Physical UMV execution| 🔴 Not implemented
Automatic recovery| 🔴 Disabled
Live DP control| 🔴 Not implemented

---

⚠️ IMPORTANT LIMITATION

SPD v13.1 in this repository is a deterministic local simulation and decision-support demonstrator.

It should not be represented as:

- a certified DP control system;
- a live vessel control system;
- an autonomous navigation controller;
- a certified safety-critical system;
- a replacement for a qualified DPO;
- a replacement for vessel procedures;
- a replacement for class, flag-state or manufacturer requirements.

Any future integration with an external simulator, testbed, vessel, UMV or operational system would require separate technical integration, cybersecurity review, safety assessment, validation and appropriate authorization.

---

🔐 DESIGN PRINCIPLE

The central design principle is:

«AI assists the decision. The Human Operator / DPO retains operational authority.»

The architecture therefore separates:

ASSESSMENT
      ↓
DECISION SUPPORT
      ↓
SIMULATED TRIAL
      ↓
INDEPENDENT VALIDATION
      ↓
HUMAN AUTHORIZATION

from:

PHYSICAL EXECUTION

Physical execution is outside the present simulator.

---

⚓ SEXTANT PROTOCOL™

SPD v13.1 forms part of the broader Sextant Protocol™ resilience architecture.

The architecture is intended to explore resilient decision-support across complex operational environments by combining:

- Independent assessment
- Cross-checking
- Stabilization
- Cascade recognition
- Trial simulation
- Independent validation
- Human decision authority
- Auditability
- Deterministic execution

---

📜 VERSION

SPD v13.1 — Sextant Resilience Cockpit Pro

Module: Captain AI Lena Autonomous Agent Core

Domain: UMV / Dynamic Positioning

Architecture: Triple-Layer Decision Resilience

Execution: Deterministic Local Simulation

Authority: Human Operator / DPO

Execution Gate: "HUMAN_AUTHORIZATION_REQUIRED"

Physical Execution: "FALSE"

Automatic Recovery: "FALSE"

Backend Connection: "FALSE"

---

⚓ FINAL SYSTEM STATEMENT

SPD v13.1 — Sextant Resilience Cockpit Pro

«Observe → Verify → Assess → Cascade → Primary AI → Secondary AI → Stabilizer / Captain AI Lena → Trial → Validate → Human / DPO Decision»

Deterministic Local Simulation • AI Decision Support • Human Operational Authority

No backend connection • No automatic recovery • No physical execution