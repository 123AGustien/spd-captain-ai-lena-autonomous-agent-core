# SPD v13.1 — Assessment Latency Catalogue

## Purpose

The SPD v13.1 Assessment Latency Catalogue is a measurement-only
component for recording the execution latency of the SPD resilience
architecture.

The catalogue does not modify, replace, or control any existing SPD
decision engine.

---

## Architectural Protection

The following components remain unchanged:

- SPD cockpit screens
- Desktop Cockpit
- Mobile Cockpit
- Live Simulation interface
- Golden Rule Engine
- Golden Rule thresholds
- Golden Rule calculations
- Golden Rule decisions
- Golden Rule actions
- FIN Domain Rule Engine
- BHR Domain Rule Engine
- CYB Domain Rule Engine
- DC Domain Rule Engine
- INF Domain Rule Engine
- Domain-specific thresholds
- Domain-specific decisions
- Domain Integration logic

The Assessment Latency Catalogue is an independent observation layer.

---

# Engine Separation

SPD v13.1 contains two distinct classes of rule authority.

## 1. Golden Rule Engine

The Golden Rule Engine is the core SPD deterministic decision
authority.

Its governing pipeline is:

OBSERVE
→ VERIFY
→ ASSESS
→ DECIDE
→ ACT
→ UPDATE

The latency catalogue measures this execution.

It does not redefine it.

---

## 2. Domain Rule Engines

Domain Rule Engines contain domain-specific assessment and rule logic.

Examples include:

- FIN — Financial Resilience
- BHR — Business & Human Rights
- CYB — Cyber
- DC — Data Centre
- INF — Infrastructure

Domain Rule Engines remain independent from the Golden Rule Engine.

The latency catalogue records their execution independently.

It does not merge their authorities.

---

# Measurement Architecture

The measurement layer follows:

EXISTING ENGINE
        ↓
LATENCY OBSERVER
        ↓
MEASUREMENT RECORD
        ↓
LATENCY CATALOGUE

The observer does not provide decision input to the engine.

Therefore:

ENGINE → MEASUREMENT

and never:

MEASUREMENT → ENGINE

---

# Measurement Categories

The catalogue is designed to record:

## Golden Rule Engine

- INPUT latency
- OBSERVE latency
- VERIFY latency
- ASSESS latency
- DECIDE latency
- ACT latency
- UPDATE latency
- END_TO_END latency

## Domain Rule Engine

- Domain input latency
- Domain verification latency
- Domain assessment latency
- Domain decision latency
- Domain action-generation latency
- Domain execution latency

## Validation

- SELF_TEST latency
- FAULT_IDENTIFICATION latency
- CORRECTIVE_ACTION_ASSESSMENT latency
- RE_TEST latency
- FINAL_VALIDATION latency

---

# Measurement Record

Each measurement should contain, where available:

- Measurement ID
- Timestamp
- Engine identity
- Domain
- Rule ID
- Scenario
- Scenario intensity
- Processing stage
- Start time
- End time
- Elapsed latency
- Execution status
- Validation status

Example:

```json
{
  "measurementId": "LAT-001",
  "engine": "Golden Rule Engine",
  "stage": "ASSESS",
  "scenario": "FX_SHOCK",
  "elapsedMs": 0,
  "status": "MEASURED"
}