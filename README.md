
## 📥 CLIENT INSTRUCTIONS & INFORMATION FEED

This section defines how external users (clients / systems / developers) must provide data into the SPD Captain AI Lena Autonomous Agent Core.

The system operates on a structured **input feed model**.  
All decision-making is driven by this input.

---

## 🧠 1. CLIENT INPUT REQUIREMENT

To activate the system, the client must provide a **System State Object**.

### Minimum Required Input:

```json
{
  "fx": 0,
  "energy": 50,
  "cyb": 50
}
Cockpit screen:
https://123AGustien.github.io/spd-captain-ai-lena-autonomous-agent-core/cockpit_dashboard.html

Development Status

Current Platform

The SPD Captain AI Lena Autonomous Agent Core is currently being developed primarily from an Android device.

The current repository focuses on:

- Rule-based AI agent logic
- Captain AI Lena decision engine
- Cockpit dashboard interface
- Modular JavaScript components
- System architecture documentation

Desktop Application Roadmap

Desktop application support using Electron is planned for a future development stage when the project is built on a desktop computer.

The repository already includes the initial Electron configuration files ("main.js" and "package.json") as the foundation for future desktop packaging.

When development moves to a desktop environment, the project will be extended to provide:

- Native desktop application
- Executable package
- Desktop icon
- Standalone Captain AI Lena cockpit application

Until then, development remains focused on expanding the autonomous agent, decision engine, cockpit interface, and SPD architecture.
# spd-captain-ai-lena-autonomous-agent-core

SPD Captain AI Lena Autonomous Agent Core is a rule-based autonomous decision engine that transforms structured system state data into continuous Observe–Decide–Act–Update loops. It integrates algorithmic rule logic, scenario simulation, and modular compute execution to form a deterministic AI agent framework inside the SPD architecture.

---

# SPD Captain AI Lena Autonomous Agent Core

## Overview
The SPD Captain AI Lena Autonomous Agent Core is a structured decision engine built on a deterministic rule-based AI agent architecture. It simulates autonomous reasoning using layered system logic, state computation, and continuous feedback loops.

This system does not use machine learning. Instead, it relies on explicit algorithmic rules, scenario models, and state transitions to produce controlled intelligent behavior.

---

## Core Concept

The system is built on the SPD Protocol Architecture Map:

**DATA → ALGORITHMS → CODE → COMPUTE**

---

## Layer Definitions

- **DATA** → Inputs, system state, environment variables  
- **ALGORITHMS** → Decision logic, rules, scenario models  
- **CODE** → Implementation of logic in executable form  
- **COMPUTE** → Runtime execution and system output  

---

## Agent Identity: Captain AI Lena

Captain AI Lena is the autonomous control layer of the system.

### Responsibilities
- Observe system state  
- Evaluate rule conditions  
- Make decisions  
- Execute actions  
- Maintain system stability  

---

## System Architecture

### SPD AUTONOMOUS AGENT CORE

### 1. DATA LAYER
- FX values  
- INF index  
- CYB stability index  
- DC load system  
- Energy + biodiesel reserves  

---

### 2. ALGORITHM LAYER
- Rule Engine  
- Risk Evaluation Model  
- Scenario Matching System  
- Decision Matrix Logic  
- Source Validation Protocol (Foreign Source Handling Rule)  

---

### 3. CODE LAYER
- JavaScript modules  
- Simulation functions  
- State handlers  

---

### 4. COMPUTE LAYER
- Execution runtime  
- State transitions  
- Output generation  

---

### 5. AGENT LOOP (CORE BEHAVIOR)

**OBSERVE → DECIDE → ACT → UPDATE → REPEAT**

---

## Agent Loop

### OBSERVE
- Read system state  
- Capture inputs  

### DECIDE
- Apply rule engine  
- Evaluate risk conditions  
- Select action path  

### ACT
- Execute module functions  
- Trigger system response  

### UPDATE
- Update system state  
- Store results  

### REPEAT
- Continuous execution cycle  

---

# 🧠 Captain AI Lena Cockpit

## Overview
The Captain AI Lena Cockpit is the operational interface layer of the SPD Autonomous Agent Core.  
It represents a real-time conceptual dashboard where system state, rules, and decision logic are visualized as an active control environment.

This cockpit is not a GUI dependency — it is a system model representation layer that translates internal computation into readable operational status.

---

## ⚙️ Cockpit Structure

### 📊 1. System State Panel (DATA)
- FX Index (economic stability)  
- INF Index (inflation/risk pressure)  
- CYB Stability (system integrity)  
- DC Load (computational demand)  
- Energy Reserve (biodiesel / power availability)  

---

### 🧮 2. Rule Engine Panel (ALGORITHMS)

- Risk threshold evaluation rules  
- Energy stability conditions  
- FX correction triggers  
- Scenario injection filters  
- Source validation protocol status  

**Example Logic:**
