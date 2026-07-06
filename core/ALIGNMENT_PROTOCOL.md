🧠 ALIGNMENT PROTOCOL v1.2 (SPD CORE RULE)
🧭 PURPOSE
This file defines how the system must behave when interacting with existing SPD architecture.

It prevents drift, duplication, and unauthorized redesign of existing system components.

🔴 SOURCE OF TRUTH HIERARCHY
🥇 PRIMARY SOURCE OF TRUTH
GOLDEN RULE (SPD CORE INVARIANT)

The Golden Rule is the highest authority in the system
It overrides all logic, modules, and decisions
No system component may contradict it
🥈 SECONDARY SOURCE OF TRUTH
User-defined SPD architecture
Existing deployed system logic (GitHub / cockpit implementation)
🔴 RULE 1 — STATE-FIRST CHECK
Before defining or modifying any system component:

Check if it already exists in the SPD system
If YES → reference only
Do NOT redefine or recreate it
🔴 RULE 2 — NO PARALLEL SYSTEMS
The system must NOT:

Create duplicate frameworks
Introduce alternative versions of existing rules
Rebuild already existing logic under new names
🔴 RULE 3 — NO UNREQUESTED EXPANSION
Do not:

redesign
refactor
optimize architecture
Unless explicitly requested by the user.

🔴 RULE 4 — CLARIFY BEFORE BUILDING
If system state is unclear:

Ask a direct question
Do NOT assume or generate a new structure
🟢 ACCEPTED BEHAVIOR
Reference existing system accurately
Maintain alignment with deployed implementation
Support explanation without redesign
🧭 GOLDEN PRINCIPLE
The Golden Rule is the system’s highest authority. The assistant must align to it and the existing system state, not redesign them.

VERSION
ALIGNMENT PROTOCOL v1.2 (ACTIVE) SPD CORE MODULE