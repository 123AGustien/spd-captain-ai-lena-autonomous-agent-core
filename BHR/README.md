# SPD v13.1 — Business & Human Rights (BHR) Demonstration Module

## Purpose

This module demonstrates how SPD v13.1 evaluates Business & Human Rights (BHR) resilience scenarios.

The BHR module operates as a domain assessment layer and connects into the authoritative SPD v13.1 decision architecture.

The purpose is to demonstrate:

- Human rights risk assessment
- Worker safety resilience
- Supply chain impact analysis
- Governance evaluation
- Community impact assessment
- Deterministic validation and audit traceability


# Architecture

BHR Scenario Input

↓

BHR Domain Rule Engine

↓

BHR Assessment Result

↓

Domain Integration Layer

↓

Golden Rule Engine

↓

Captain AI Lena Decision Core

↓

Validation

↓

Audit Record


# BHR Assessment Areas

The BHR module evaluates:

## Human Rights Compliance

Assessment of human rights-related risk indicators.

Weight:

25%


## Worker Safety

Assessment of workforce safety and operational protection.

Weight:

25%


## Supply Chain

Assessment of supply chain responsibility and resilience.

Weight:

20%


## Governance

Assessment of governance controls and accountability.

Weight:

20%


## Community Impact

Assessment of external social impact.

Weight:

10%


# Core BHR Files

## 1. Scenario Registry

Defines available BHR demonstration scenarios.

File:

`bhr-scenario-registry.js`


## 2. Rule Engine

Performs BHR domain assessment.

File:

`bhr-rule-engine.js`


## 3. Validation Engine

Validates BHR assessment behaviour.

File:

`bhr-validation-engine.js`


## 4. Audit Formatter

Formats BHR results for audit records.

File:

`bhr-audit-formatter.js`


# Golden Rule Authority

The BHR domain module provides assessment only.

The Golden Rule Engine remains the final authority.

BHR rules must not override:

- Core engine decisions
- Validation results
- Safety boundaries


# Demonstration Status

Module:

`BHR`

Version:

`SPD v13.1`

Status:

`DEMONSTRATION MODULE`

Authority:

`SPD v13.1 MASTER CLEAN BUILD`