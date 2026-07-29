# SPD v13.1 — Client Scenario Branch Protocol

## Purpose

This document defines the deployment method for SPD v13.1 client demonstrations.

The SPD v13.1 clean build remains the authoritative master copy.

Each client demonstration must operate on an isolated branch and must not merge client-specific changes into the master build.

The purpose is to preserve:

- Core engine integrity
- Golden Rule Engine authority
- Validation consistency
- Audit traceability
- Client confidentiality
- Independent demonstration environments


# Master Build

## Authoritative Source

Branch:

`spd-v13-clean-rebuild`

Status:

`MASTER CLEAN BUILD`

Purpose:

- Holds the validated SPD v13.1 architecture
- Contains the Golden Rule Engine
- Contains Captain AI Lena Decision Core
- Contains Self-Test & Validation Engine
- Contains approved domain integration framework

The master build must remain protected from client-specific modifications.


# Client Branch Architecture

Each client demonstration receives a dedicated isolated branch.


## Branch Structure

Format:

`client-[client-name]-[scenario-name]`

Example:

`client-energy-company-liquidity-stress`

Example:

`client-port-operator-cyber-resilience`


# Branch Creation Rule

Every client branch must be created from:

`spd-v13-clean-rebuild`


Example:

Master:

`spd-v13-clean-rebuild`

↓

Client Branch:

`client-clientname-scenario`


# Branch Isolation Policy

## Allowed

Client branch may contain:

- Client-specific scenario configuration
- Required domain integration
- Required rule engine connection
- Scenario validation logic
- Client audit formatting
- Demonstration interface changes


## Not Allowed

Client branch must not contain:

- Changes to the master architecture
- Changes to Golden Rule Engine authority
- Removal of validation controls
- Unapproved core engine modifications
- Other client scenarios
- Experimental features


# Scenario Integration Flow

Every client scenario must follow the SPD v13.1 architecture:
# Golden Rule Authority

The Golden Rule Engine remains the final authority.

Domain engines provide:

- Assessment
- Risk indicators
- Scenario interpretation
- Domain-specific rules

Domain engines do not override:

- Core engine decisions
- Validation results
- Safety boundaries


# Client Demonstration Validation

Before delivery, each client branch must pass:


## 1. Scenario Test

Verify:

- Scenario loads correctly
- Inputs are accepted
- Domain engine responds correctly


## 2. Engine Validation

Verify:

- Golden Rule Engine operates normally
- Captain AI Lena Decision Core receives correct data
- Decision output is consistent


## 3. Audit Validation

Verify:

- Audit record generated
- Scenario history recorded
- Decision pathway traceable


## 4. Recovery Test

Verify:

- System returns to stable state
- Validation status confirmed


# Client Deployment Record

Client:

`CLIENT_NAME`

Scenario:

`CLIENT_SCENARIO`

Branch:

`client-CLIENT_NAME-scenario`

Source:

`spd-v13-clean-rebuild`

Validation Status:

`PENDING / PASSED`

Deployment Status:

`DEMO READY`


# Merge Policy

Client demonstration branches remain independent.

Policy:

`NO MERGE BACK TO MASTER`

The master clean build remains the protected authoritative source.


# Version Control

Protocol Version:

`SPD v13.1`

Document:

`Client Scenario Branch Protocol`

Status:

`ACTIVE`

Authority:

`SPD v13.1 MASTER CLEAN BUILD`

Client Scenario Input
↓
Domain Integration Layer
↓
Domain Rule Engine
↓
Scenario Assessment
↓
Golden Rule Engine
↓
Captain AI Lena Decision Core
↓
Action Sequence
↓
Memory Core
↓
Audit Record
↓
Validation Confirmation