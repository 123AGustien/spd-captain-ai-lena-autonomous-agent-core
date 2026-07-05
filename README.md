ROOTOOTCOCKPITCKPIT (Main Screen)
👉 https://123agustien.github.io/spd-captain-ai-lena-autonomous-agent-core/

 MOBILE SIMULATION SCREEN
👉 https://123agustien.github.io/spd-captain-ai-lena-autonomous-agent-core/cockpit_mobile.html
DESKTOP / DASHBOARD SCREEN (if enabled)
👉 https://123agustien.github.io/spd-captain-ai-lena-autonomous-agent-core/cockpit_dashboard.htmlare


# 🧠 SPD COMPUTE ARCHITECTURE MODEL

This system is built on a deterministic execution framework:

DATA → ALGORITHMS → COMPUTE

---

## 📊 1. DATA LAYER (STATE INPUT)

The system receives structured state:
🔒 Backend Source of Truth

Workflow Authority

The backend is the authoritative source for all system workflows, decision logic, and execution.

If any mismatch exists between:

- Frontend cockpit displays
- User interface behavior
- Documentation
- Examples
- Simulations
- External references
- Third-party implementations

the backend implementation shall be treated as the source of truth.

Development Rule

All development must follow this workflow:

Client Input → Backend Processing → Decision Engine → System Output → Frontend Display

The frontend must accurately represent the backend state and must never redefine or override backend decision logic.

Source Validation Rule

When integrating external libraries, frameworks, examples, tutorials, or reference implementations:

1. Read the official documentation and source code.
2. Compare external behavior with the SPD backend implementation.
3. If any mismatch is detected, verify the backend logic before making changes.
4. Do not modify the SPD workflow solely to match an external implementation without technical validation.

This ensures that the backend remains the authoritative execution layer for the SPD Captain AI Lena Autonomous Agent Core.

{
  fx: number,
  energy: number,
  cyb: number,
  inf?: number,
  dc?: number
}

Purpose:
- Represents real-world or simulated conditions
- Acts as raw system input
- No logic applied here

---

## 🧮 2. ALGORITHM LAYER (DECISION LOGIC)

Transforms raw data into evaluative states.

Modules:

### FX MODULE
- Evaluates economic/system stability
- Detects FX instability thresholds

### ENERGY MODULE
- Checks system power availability
- Detects overload or depletion

### RISK MODULE
- Combines FX + ENERGY + CYB
- Outputs risk state:
  - LOW RISK
  - MEDIUM RISK
  - HIGH RISK

### SCENARIO ENGINE
- Injects external events
- Simulates stress conditions
- Example: FX_SHOCK, ENERGY_SPIKE

---

## ⚙️ 3. COMPUTE LAYER (CAPTAIN AI LENA ENGINE)

This is the execution brain:

INPUT → RULES → DECISION → OUTPUT

Process:

1. Observe system state
2. Run all modules
3. Evaluate risk
4. Apply decision logic
5. Output system response

---

## 🤖 CAPTAIN AI LENA DECISION CORE

Decision rules:

- If HIGH RISK → ACTIVATE STABILIZATION MODE
- If ENERGY LOW → REDUCE SYSTEM LOAD
- If FX unstable → FX CORRECTION ACTIVE
- Else → SYSTEM STABLE

---

## 🔄 FULL LOOP

OBSERVE → ANALYZE → DECIDE → EXECUTE → UPDATE

This loop runs continuously in simulation mode.

---

## 🧠 DESIGN PRINCIPLE

- Deterministic logic only
- No machine learning
- No randomness dependency
- GitHub Repository: https://github.com/123AGustien/spd-captain-ai-lena-autonomous-agent-core
Live Demo: https://123agustien.github.io/spd-captain-ai-lena-autonomous-agent-core/
# SPD Captain AI Lena Autonomous Agent Core

SPD Captain AI Lena Autonomous Agent Core is a rule-based autonomous decision engine that transforms structured system state data into continuous Observe–Decide–Act–Update loops.

It integrates algorithmic rule logic, scenario simulation, and modular compute execution to form a deterministic AI agent framework inside the SPD architecture.

---

# 🔗 PROJECT LINKS

## 📁 GitHub Repository (Open in Chrome)
https://github.com/123AGustien/spd-captain-ai-lena-autonomous-agent-core

## 🧠 Live Cockpit Dashboard
https://123AGustien.github.io/spd-captain-ai-lena-autonomous-agent-core/cockpit_dashboard.html

---

# 📥 CLIENT INSTRUCTIONS & INFORMATION FEED

## System Input Requirement

The system requires a structured System State Object.

Minimum Input:
{
  "fx": 0,
  "energy": 50,
  "cyb": 50
}

Extended Input (Optional):
{
  "fx": 0,
  "energy": 100,
  "cyb": 100,
  "inf": 0,
  "dc": 0,
  "event": "NORMAL",
  "time": "2026-01-01T00:00:00Z",
  "mode": "AUTONOMOUS"
}

---

# 🧠 SYSTEM ARCHITECTURE

DATA → ALGORITHMS → CODE → COMPUTE

- DATA → system inputs and state
- ALGORITHMS → decision logic and rules
- CODE → implementation modules
- COMPUTE → runtime execution

---

# 🤖 CAPTAIN AI LENA

Captain AI Lena is the autonomous decision layer that:

- Observes system state
- Evaluates rules
- Makes decisions
- Executes actions
- Maintains stability

---

# ⚙️ AGENT LOOP

OBSERVE → DECIDE → ACT → UPDATE → REPEAT

---

# 🧠 COCKPIT SYSTEM

The cockpit is a visual representation of the system.

Panels:

### System State
- FX → stability index
- Energy → power level
- CYB → system integrity
- INF → external pressure
- DC → system load

### Rule Engine
- Risk evaluation logic
- Energy thresholds
- FX correction rules
- Scenario injection

### Agent Loop Monitor
- OBSERVE → DECIDE → ACT → UPDATE
- Decision output
- Current system state

---

# 📱 DEVELOPMENT STATUS

- Built from Android environment
- Rule-based deterministic AI system (no machine learning)
- Modular JavaScript architecture
- Cockpit dashboard interface

---

# 🖥️ DESKTOP ROADMAP (ELECTRON)

Future desktop version will include:

- Native desktop application
- Executable build (.exe / .dmg)
- Desktop icon
- Standalone cockpit application

Files already included:
- main.js
- package.json

---

# ⚠️ DESIGN PRINCIPLES

- Deterministic rule-based execution only
- No probabilistic AI
- External systems are reference only
- Local SPD rules are authoritative

---

# 🚀 SUMMARY

SPD Captain AI Lena is a deterministic autonomous agent system built for structured decision execution through layered architecture and continuous computation loops.
