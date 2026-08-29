Your site is live at https://123agustien.github.io/spd-captain-ai-lena-autonomous-agent-core/

🛰️ SPD v13.1 — SEXTANT RESILIENCE COCKPIT PRO

UMV / DP Resilience Simulator

Captain AI Lena Autonomous Agent Core
Dynamic Positioning (DP) / Unmanned Marine Vehicle (UMV) Operational Resilience
Triple-Layer Decision Resilience • Deterministic Local Simulation • Human Decision Authority

---

SYSTEM STATUS

READY — LOCAL DETERMINISTIC SIMULATOR

This branch contains the UMV / DP operational resilience simulator for the Sextant Protocol™ architecture.

The simulator provides a controlled digital test environment for abnormal and cascading conditions affecting an Unmanned Marine Vehicle / Dynamic Positioning system.

It is designed for simulation, assessment, validation and decision-support purposes only.

---

⚓ UMV / DP PURPOSE

The UMV / DP simulator is designed to examine how a resilient decision architecture can respond to abnormal marine operational conditions.

The simulator allows controlled testing of scenarios including:

- Thruster Failure
- Power Failure
- Position Deviation
- High Wind Load
- Drift Off
- Multiple Thruster Failure
- Worst Case Failure

The architecture evaluates the condition through independent assessment layers before producing controlled decision support.

---

🧭 RESILIENCE DECISION PIPELINE

The UMV / DP decision pipeline is:

OBSERVE → VERIFY → ASSESS → CASCADE → PRIMARY AI → SECONDARY AI → STABILIZER / CAPTAIN AI LENA → TRIAL → VALIDATE → HUMAN

The pipeline is intended to provide multiple decision-resilience stages before any controlled operational response.

Pipeline stages

1. OBSERVE
   
   - Identify the simulated abnormal condition.

2. VERIFY
   
   - Verify the simulated system state.

3. ASSESS
   
   - Calculate the deterministic resilience assessment.

4. CASCADE
   
   - Identify interacting or cascading abnormal conditions.

5. PRIMARY AI
   
   - Perform an independent first-pass assessment.

6. SECONDARY AI
   
   - Perform an independent cross-check.

7. STABILIZER / CAPTAIN AI LENA
   
   - Reconcile the assessment layers and produce controlled decision support.

8. TRIAL
   
   - Simulate a proposed manoeuvre or response.

9. VALIDATE
   
   - Independently validate the simulated trial manoeuvre.

10. HUMAN

- Present the resulting decision support to the Human Decision Authority.

---

🧠 TRIPLE-LAYER DECISION RESILIENCE

The UMV architecture contains three decision-support layers:

PRIMARY AI

The Primary AI performs an independent first-pass abnormal-condition assessment.

It evaluates:

- observed condition
- severity
- raw stress
- risk
- recommended response

The Primary AI does not rely on the Secondary AI result.

---

SECONDARY AI

The Secondary AI performs an independent cross-check.

It examines:

- observed condition
- calculated risk
- critical domains
- independent recommendation

The Secondary AI is designed not to simply copy the Primary AI.

---

STABILIZER / CAPTAIN AI LENA

Captain AI Lena functions as the stabilizing decision-support layer.

It reconciles:

- Primary AI assessment
- Secondary AI assessment
- cascading-condition recognition
- resilience calculation
- risk classification

The resulting output is decision support, not automatic physical control.

---

🔗 CASCADING-CONDITION RECOGNITION

The simulator evaluates whether multiple abnormal conditions may interact.

A cascading condition may be identified when multiple critical system domains exceed defined stress levels.

The simulator records:

- cascade detected
- critical domains
- containment requirement
- cascading-condition description

This provides an additional resilience layer between initial assessment and decision support.

---

📊 DETERMINISTIC RESILIENCE ENGINE

The current simulator uses the SPD v13.1 deterministic calculation model.

The monitored domains are:

- FX
- ENERGY
- CYB
- INF
- DC

The current implementation applies equal weighting to the five monitored domains.

Raw Stress

rawStress =
(FX + ENERGY + CYB + INF + DC) / 5

Golden Score

Using:

φ = 1.618033988749895

the Golden Score is calculated as:

goldenScore = rawStress × (1 / φ)

Resilience Score

resilienceScore =
max(0, 100 - goldenScore)

Risk Classification

LOW     < 30 Golden Score

MEDIUM  ≥ 30 and < 50

HIGH    ≥ 50

The calculation is deterministic and locally executed.

---

🛰️ TRIAL MANOEUVRE

The simulator includes a Trial Manoeuvre stage.

A trial manoeuvre is:

- simulation-only
- deterministic
- locally executed
- not connected to a physical vehicle
- not connected to a backend
- not an automatic recovery mechanism

The trial manoeuvre records the proposed response and provides it to the validation layer.

---

🔎 INDEPENDENT VALIDATION

The Validation Core checks the simulated trial manoeuvre.

Validation confirms, among other things:

- trial manoeuvre exists
- proposed action exists
- backend connection is false
- physical execution is false
- human authorization remains required

A successful validation produces:

TRIAL MANOEUVRE VERIFICATION — PASS

---

🧑‍✈️ HUMAN DECISION AUTHORITY

AI DECISION SUPPORT → HUMAN OPERATOR AUTHORIZATION

Captain AI Lena provides decision support.

Captain AI Lena does not independently authorize physical execution.

The simulator does not automatically execute recovery actions.

The Human Decision Authority provides the final operational decision within the simulated decision workflow.

Available decisions include:

- AUTHORIZE RECOVERY
- MAINTAIN SAFE STATE
- REQUEST ADDITIONAL DIAGNOSTICS
- ABORT RECOVERY
- ESCALATE TO MISSION AUTHORITY

Even when AUTHORIZE RECOVERY is selected, the simulator only records the human authorization decision.

It does not execute a physical recovery action.

---

🔒 EXECUTION GATE

The fundamental execution gate is:

HUMAN AUTHORIZATION REQUIRED

The simulator maintains:

physicalExecution = false

and:

backendConnection = false

Therefore this branch does not provide direct physical control of an UMV, DP vessel or propulsion system.

---

🧾 AUDIT CORE

The simulator maintains an audit record of significant events.

Examples include:

- "SIMULATOR_INITIALIZED"
- "SIMULATOR_RESET"
- "SYSTEM_RUN_STARTED"
- "SCENARIO_LOADED"
- "PIPELINE_STARTED"
- "GOLDEN_RULE_COMPLETED"
- "TRIAL_MANOEUVRE_SIMULATED"
- "TRIAL_MANOEUVRE_VERIFICATION"
- "HUMAN_DECISION"
- "SELF_TEST"
- "CORRECTIVE_ACTION_ASSESSMENT"
- "RE_TEST_VALIDATION"
- "FINAL_INTEGRATION_TEST"

Each record contains a timestamp and relevant event data.

---

🧠 MEMORY CORE

The local Memory Core records the latest simulator state, including:

lastScenario
lastDomain
lastDecision
lastAssessment
lastCascade
lastTrialManoeuvre
lastValidation
lastHumanDecision
timestamp

The Memory Core is local to the simulator.

---

🧪 VALIDATION CORE

The simulator contains:

Self-Test

Checks the operational integrity of:

- DOM controls
- scenario database
- Golden Rule calculation
- Human Decision Authority
- execution gate
- backend isolation
- Audit Core
- Memory Core

Corrective Assessment

Provides:

- fault identification
- corrective action assessment
- architecture-preservation check

Re-Test

Performs a post-corrective validation.

Final Integration Test

Checks the integration of:

- UMV / DP scenarios
- Orbital scenario availability within the shared simulator
- Golden Rule Engine
- Human Decision Authority
- physical execution lock
- backend isolation
- Audit Core
- Memory Core

---

🛡️ SAFETY / CONTROL PRINCIPLES

The UMV branch maintains the following principles:

1. Local deterministic simulation
2. No backend connection
3. No direct physical execution
4. No automatic recovery
5. Human authorization required
6. Independent Primary AI assessment
7. Independent Secondary AI assessment
8. Stabilizer / Captain AI Lena reconciliation
9. Trial manoeuvre before controlled decision support
10. Independent validation
11. Audit recording
12. Local memory state

---

📁 BRANCH PURPOSE

This branch is intended to develop and demonstrate the:

UMV / DP RESILIENCE TESTBED

The focus is the application of the Sextant Protocol™ decision-resilience architecture to:

- Unmanned Marine Vehicles
- Dynamic Positioning systems
- marine propulsion resilience
- station-keeping resilience
- abnormal-condition assessment
- cascading-condition recognition
- controlled recovery decision support

The simulator can subsequently be connected conceptually to suitable marine testbeds or simulator environments for further evaluation.

---

🤝 TESTBED / RESEARCH COOPERATION

The UMV / DP simulator is intended to support technical discussion with organizations operating:

- DP simulators
- UMV testbeds
- marine autonomy testbeds
- maritime research facilities
- offshore operational simulators
- autonomy and decision-support environments

The purpose of cooperation is to determine whether the Sextant Protocol™ architecture can be evaluated, demonstrated or developed within an appropriate testbed environment.

Any external integration should be subject to appropriate technical, legal, safety, IP and confidentiality arrangements.

---

🔐 INTELLECTUAL PROPERTY

The Sextant Protocol™ architecture, documentation, software, decision architecture, simulator concepts and associated materials are proprietary project materials unless otherwise expressly identified.

This repository is intended to demonstrate the technical architecture and deterministic simulation capability.

External evaluation or testbed integration does not by itself grant ownership or transfer of intellectual property.

Any permitted external use, development or integration should be governed by an appropriate written agreement.

---

🛰️ CURRENT POSITION

The UMV / DP branch currently provides:

SPD v13.1 — Sextant Resilience Cockpit Pro

with:

- UMV / DP scenario engine
- deterministic resilience assessment
- cascading-condition recognition
- Primary AI layer
- Secondary AI layer
- Stabilizer / Captain AI Lena
- Trial Manoeuvre simulation
- Independent validation
- Human Decision Authority
- Execution Gate
- Memory Core
- Audit Core
- Self-Test
- Corrective Assessment
- Re-Test
- Final Integration Test

---

⚠️ IMPORTANT LIMITATION

This software is a deterministic local simulation and decision-support demonstrator.

It is not a certified DP control system, marine automation system, safety-critical controller or autonomous navigation system.

It does not directly control:

- thrusters
- propulsion
- steering
- power systems
- navigation systems
- communication systems
- physical UMVs
- physical vessels

No physical action is automatically executed by this simulator.

---

🚀 NEXT DEVELOPMENT DIRECTION

The UMV branch can be developed toward controlled testbed evaluation involving:

Sextant Protocol™

↓

UMV / DP Resilience Simulator

↓

Testbed / DP Simulator

↓

Controlled Scenario Evaluation

↓

Independent Validation

↓

Human Decision Authority

↓

Research / Demonstration Results

The objective is to demonstrate whether the architecture provides useful additional resilience in complex abnormal and cascading operational conditions.

---

FILE

Primary application:

index.html

Branch purpose:

UMV / DP RESILIENCE

Application type:

Single-file HTML
Local deterministic simulator

---

COPYRIGHT / PROJECT IDENTIFICATION

Sextant Protocol™
SPD v13.1 — Sextant Resilience Cockpit Pro

UMV / DP Operational Resilience Simulator

Captain AI Lena Autonomous Agent Core

AI Decision Support → Human Decision Authority

No Backend Connection • No Automatic Recovery • No Physical Execution
