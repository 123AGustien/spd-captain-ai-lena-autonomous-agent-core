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

MASTER CLEAN BUILD

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