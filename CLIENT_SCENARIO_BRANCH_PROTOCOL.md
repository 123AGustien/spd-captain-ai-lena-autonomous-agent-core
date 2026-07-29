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

Structure:

main
 |
 └── spd-v13-clean-rebuild
          |
          ├── client-01-scenario-demo
          |
          ├── client-02-scenario-demo
          |
          └── client-03-scenario-demo


# Client Branch Rules

Each client branch must:

1. Start from the SPD v13.1 clean build.

2. Contain only the required client scenario.

3. Keep the Golden Rule Engine unchanged and authoritative.

4. Use the existing SPD v13.1 validation architecture.

5. Maintain independent audit records.

6. Maintain independent deployment links.

7. Never merge client-specific modifications back into the master build.


# Scenario Implementation Procedure

For every client scenario:


## Step 1 — Create Client Branch

Create a new isolated branch from:

`spd-v13-clean-rebuild`

Example:

`client-financial-risk-demo`

or

`client-energy-resilience-demo`


## Step 2 — Add Client Scenario

The client scenario is connected through:

Client Scenario

↓

domainIntegration.js

↓

Domain Rule Engine

↓

Golden Rule Engine

↓

Captain AI Lena Decision Core

↓

Audit Record


## Step 3 — Validate Pipeline

Every client scenario must verify:

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


Validation must confirm:

- Scenario input accepted
- Domain assessment completed
- Risk classification generated
- Decision produced
- Action sequence recorded
- Memory Core updated
- Audit Record completed


# Client Demonstration Isolation

A client branch contains only:

- Required scenario button
- Required domain integration
- Required rule engine
- Required validation
- Required audit output


A client branch does not contain:

- Other client scenarios
- Experimental branches
- Corrupt builds
- Unapproved modifications


# Audit Language Configuration

Audit output may be configured according to demonstration requirements.

Supported languages:

- English
- Bahasa Indonesia


Example English:

VALIDATION COMPLETE

SYSTEM STABLE

RECOVERY VERIFIED


Example Bahasa Indonesia:

VALIDASI SELESAI

SISTEM STABIL

PEMULIHAN TERVERIFIKASI


# Release Deployment

Each client branch receives its own deployment release.

Deployment structure:

SPD v13.1 Master Build

+

Client Isolated Branch

↓

Dedicated Demonstration Link


The release link must point only to the client demonstration branch.

The master build deployment remains separate.


# Branch Protection Principle

SPD v13.1 follows:

ONE VALIDATED MASTER BUILD

+

MULTIPLE ISOLATED CLIENT DEMONSTRATIONS

=

CONTROLLED DEPLOYMENT


The master build remains the source of truth.

Client demonstrations prove capability without changing the core architecture.


# Final Authority

The Golden Rule Engine remains authoritative.

Domain rule engines assess conditions.

Captain AI Lena Decision Core executes the validated decision pipeline.

The SPD v13.1 clean build remains protected.


# Version Control Record

Protocol:

SPD v13.1 — Client Scenario Branch Protocol

Master Branch:

spd-v13-clean-rebuild

Deployment Model:

Isolated Client Scenario Branches

Merge Policy:

Client branches are not merged into master

Validation Authority:

Golden Rule Engine + Self-Test Validation Engine