# SPD v13.1 — Client Scenario Branch Protocol

## Purpose

SPD v13.1 uses an isolated client scenario branch model.

The master clean build remains the authoritative source.

Each client demonstration receives its own branch containing only the required scenario configuration and integration.

This preserves:

- Core engine integrity
- Golden Rule Engine authority
- Validation consistency
- Audit traceability
- Client confidentiality


# Master Build

Branch:

`spd-v13-clean-rebuild`

Status:

`MASTER CLEAN BUILD`

The master build contains the validated SPD v13.1 architecture.

It must not be modified for individual client demonstrations.


# Client Branch Model

Each client uses a separate branch.

Format:

`client-[client-name]-[scenario-name]`

Example:

`client-energy-liquidity-stress`

Created from:

`spd-v13-clean-rebuild`


# Core Client Scenario Files

Each client scenario branch uses only the required files:

## 1. Scenario Configuration

Defines the client-specific scenario inputs and conditions.

Example:

`scenarioRegistry.js`


## 2. Domain Integration

Connects the scenario to the required domain rule engine.

File:

`domainIntegration.js`


## 3. Rule Engine

Provides domain-specific assessment.

Example:

`FIN/fin-rule-engine.js`

or

`BHR/bhr-rule-engine.js`


## 4. Validation and Audit

Confirms system behaviour and records results.

Files:

`selfTestValidationEngine.js`

`auditLogger.js`


# Processing Flow

Client Scenario

↓

Domain Integration Layer

↓

Domain Rule Engine

↓

Golden Rule Engine

↓

Captain AI Lena Decision Core

↓

Validation

↓

Audit Record


# Branch Policy

Client branches are isolated.

No client-specific changes merge back into:

`spd-v13-clean-rebuild`


# Deployment Status

Client:

`CLIENT_NAME`

Scenario:

`CLIENT_SCENARIO`

Branch:

`client-CLIENT_NAME-scenario`

Status:

`DEMO READY`


# Authority

SPD v13.1 MASTER CLEAN BUILD

Golden Rule Engine remains authoritative.