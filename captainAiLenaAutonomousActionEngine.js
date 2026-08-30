/*
============================================================
⚓ SEXTANT PROTOCOL™
SPD v13.1 — CAPTAIN AI LENA
AUTONOMOUS ACTION ENGINE v1.0.0
UMV / DP RESILIENCE SIMULATION
============================================================

PURPOSE
-------
Converts a validated Captain AI Lena decision into a
deterministic simulated autonomous control action.

ARCHITECTURE
------------
ASSESS
  ↓
DECIDE
  ↓
PLAN ACTION
  ↓
CONTROL ALLOCATION
  ↓
SIMULATED ACTUATOR STATE
  ↓
POST-ACTION VERIFICATION
  ↓
MEMORY UPDATE
  ↓
AUDIT

IMPORTANT SAFETY BOUNDARY
--------------------------
This engine is simulation-only.

NO:
- backend connection
- real actuator connection
- physical thruster command
- real steering command
- real propulsion command
- automatic recovery of a physical UMV

The engine demonstrates the autonomous decision/action
architecture inside the deterministic simulator.

============================================================
*/

const CaptainAILenaAutonomousActionEngine = (() => {

    const ENGINE_VERSION = "1.0.0";

    const SIMULATION_ONLY = true;
    const BACKEND_CONNECTION = false;
    const PHYSICAL_EXECUTION = false;

    /*
    ------------------------------------------------------------
    ACTION DEFINITIONS
    ------------------------------------------------------------
    */

    const ACTIONS = {

        ISOLATE_FAILED_THRUSTER: {
            name: "ISOLATE_FAILED_THRUSTER",
            description:
                "Simulate isolation of failed propulsion unit.",
            category: "PROPULSION_CONTAINMENT"
        },

        REDISTRIBUTE_THRUST: {
            name: "REDISTRIBUTE_THRUST",
            description:
                "Simulate redistribution of available propulsion demand.",
            category: "CONTROL_ALLOCATION"
        },

        MAINTAIN_SAFE_DP_STATE: {
            name: "MAINTAIN_SAFE_DP_STATE",
            description:
                "Simulate maintenance of the safe DP operating envelope.",
            category: "STATION_KEEPING"
        },

        CONTAIN_PROPULSION_LOSS: {
            name: "CONTAIN_PROPULSION_LOSS",
            description:
                "Simulate containment of multiple propulsion failures.",
            category: "PROPULSION_CONTAINMENT"
        },

        ENTER_SAFE_STATE: {
            name: "ENTER_SAFE_STATE",
            description:
                "Simulate transition toward a predefined safe operational state.",
            category: "SAFE_STATE"
        },

        MONITOR_SYSTEM: {
            name: "MONITOR_SYSTEM",
            description:
                "Continue deterministic monitoring of the simulated UMV state.",
            category: "MONITORING"
        }
    };


    /*
    ------------------------------------------------------------
    UTILITY
    ------------------------------------------------------------
    */

    function timestamp() {
        return new Date().toISOString();
    }


    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }


    /*
    ------------------------------------------------------------
    DECISION → ACTION PLAN
    ------------------------------------------------------------
    */

    function buildActionPlan(decision, scenario, systemState, cascade) {

        const plan = [];

        const decisionText =
            String(decision || "").toUpperCase();

        const scenarioText =
            String(scenario || "").toUpperCase();


        /*
        THRUSTER FAILURE
        */

        if (
            scenarioText.includes("THRUSTER FAILURE") &&
            !scenarioText.includes("MULTIPLE")
        ) {

            plan.push({
                action: ACTIONS.ISOLATE_FAILED_THRUSTER,
                priority: 1
            });

            plan.push({
                action: ACTIONS.MAINTAIN_SAFE_DP_STATE,
                priority: 2
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 3
            });
        }


        /*
        MULTIPLE THRUSTER FAILURE
        */

        if (
            scenarioText.includes("MULTIPLE THRUSTER FAILURE") ||
            decisionText.includes("CONTAIN PROPULSION LOSS")
        ) {

            plan.length = 0;

            plan.push({
                action: ACTIONS.CONTAIN_PROPULSION_LOSS,
                priority: 1
            });

            plan.push({
                action: ACTIONS.ISOLATE_FAILED_THRUSTER,
                priority: 2
            });

            plan.push({
                action: ACTIONS.REDISTRIBUTE_THRUST,
                priority: 3
            });

            plan.push({
                action: ACTIONS.MAINTAIN_SAFE_DP_STATE,
                priority: 4
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 5
            });
        }


        /*
        POWER FAILURE
        */

        if (scenarioText.includes("POWER FAILURE")) {

            plan.length = 0;

            plan.push({
                action: ACTIONS.ENTER_SAFE_STATE,
                priority: 1
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 2
            });
        }


        /*
        POSITION DEVIATION / DRIFT
        */

        if (
            scenarioText.includes("POSITION DEVIATION") ||
            scenarioText.includes("DRIFT OFF")
        ) {

            plan.length = 0;

            plan.push({
                action: ACTIONS.REDISTRIBUTE_THRUST,
                priority: 1
            });

            plan.push({
                action: ACTIONS.MAINTAIN_SAFE_DP_STATE,
                priority: 2
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 3
            });
        }


        /*
        HIGH WIND LOAD
        */

        if (scenarioText.includes("HIGH WIND LOAD")) {

            plan.length = 0;

            plan.push({
                action: ACTIONS.REDISTRIBUTE_THRUST,
                priority: 1
            });

            plan.push({
                action: ACTIONS.MAINTAIN_SAFE_DP_STATE,
                priority: 2
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 3
            });
        }


        /*
        WORST CASE
        */

        if (scenarioText.includes("WORST CASE")) {

            plan.length = 0;

            plan.push({
                action: ACTIONS.CONTAIN_PROPULSION_LOSS,
                priority: 1
            });

            plan.push({
                action: ACTIONS.ENTER_SAFE_STATE,
                priority: 2
            });

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 3
            });
        }


        /*
        FALLBACK
        */

        if (plan.length === 0) {

            plan.push({
                action: ACTIONS.MONITOR_SYSTEM,
                priority: 1
            });
        }


        return {
            authority: "CAPTAIN_AI_LENA",
            mode: "AUTONOMOUS_SIMULATION",
            domain: "UMV_DP",
            scenario,
            cascadeDetected: Boolean(cascade?.detected),
            containmentRequired: Boolean(cascade?.containmentRequired),
            plan,
            timestamp: timestamp()
        };
    }


    /*
    ------------------------------------------------------------
    SIMULATED CONTROL ALLOCATION
    ------------------------------------------------------------
    */

    function calculateControlAllocation(systemState, actionPlan) {

        const state = clone(systemState || {});

        const dc = Number(state.dc || 0);
        const energy = Number(state.energy || 0);

        let remainingPropulsionCapacity =
            Math.max(0, 100 - dc);

        let simulatedThrustRedistribution = 0;

        let safeState = true;

        let containment = false;


        for (const item of actionPlan.plan) {

            if (
                item.action.name ===
                "REDISTRIBUTE_THRUST"
            ) {

                simulatedThrustRedistribution =
                    Math.min(
                        100,
                        Math.max(
                            0,
                            100 - dc
                        )
                    );
            }


            if (
                item.action.name ===
                "CONTAIN_PROPULSION_LOSS"
            ) {

                containment = true;
            }


            if (
                item.action.name ===
                "ENTER_SAFE_STATE"
            ) {

                safeState = true;
            }
        }


        /*
        Deterministic simulation result.
        This is NOT a physical control command.
        */

        return {

            mode: "SIMULATION_ONLY",

            failedPropulsionDomain:
                dc,

            availablePropulsionCapacity:
                remainingPropulsionCapacity,

            simulatedThrustRedistribution,

            energyState:
                energy,

            containmentActivated:
                containment,

            safeStateMaintained:
                safeState,

            physicalExecution:
                false,

            backendConnection:
                false,

            automaticRecovery:
                false
        };
    }


    /*
    ------------------------------------------------------------
    SIMULATED ACTUATOR STATE
    ------------------------------------------------------------
    */

    function simulateActuatorState(allocation) {

        return {

            simulatedThrusters: {

                failedUnitsIsolated:
                    allocation.containmentActivated,

                thrustRedistribution:
                    allocation.simulatedThrustRedistribution,

                propulsionCommandIssued:
                    false
            },

            simulatedDPController: {

                active:
                    allocation.safeStateMaintained,

                stationKeepingIntent:
                    allocation.safeStateMaintained,

                physicalCommandIssued:
                    false
            },

            simulatedPowerState: {

                energyLevel:
                    allocation.energyState
            },

            executionBoundary: {

                simulationOnly:
                    true,

                physicalExecution:
                    false,

                backendConnection:
                    false
            }
        };
    }


    /*
    ------------------------------------------------------------
    POST-ACTION VERIFICATION
    ------------------------------------------------------------
    */

    function verifyAction(
        actionPlan,
        allocation,
        actuatorState
    ) {

        const checks = {

            actionPlanPresent:
                Array.isArray(actionPlan.plan) &&
                actionPlan.plan.length > 0,

            deterministic:
                true,

            physicalExecution:
                actuatorState.executionBoundary
                    .physicalExecution === false,

            backendConnection:
                actuatorState.executionBoundary
                    .backendConnection === false,

            propulsionCommandBlocked:
                actuatorState.simulatedThrusters
                    .propulsionCommandIssued === false,

            dpPhysicalCommandBlocked:
                actuatorState.simulatedDPController
                    .physicalCommandIssued === false
        };


        const passed =
            Object.values(checks)
                .every(Boolean);


        return {

            validator:
                "AUTONOMOUS ACTION VERIFICATION CORE",

            deterministic:
                true,

            result:
                passed ? "PASS" : "FAIL",

            checks,

            timestamp:
                timestamp()
        };
    }


    /*
    ------------------------------------------------------------
    MEMORY RECORD
    ------------------------------------------------------------
    */

    function buildMemoryRecord(
        actionPlan,
        allocation,
        actuatorState,
        verification
    ) {

        return {

            timestamp:
                timestamp(),

            authority:
                "CAPTAIN_AI_LENA",

            mode:
                "AUTONOMOUS_SIMULATION",

            actionPlan:
                clone(actionPlan),

            controlAllocation:
                clone(allocation),

            simulatedActuatorState:
                clone(actuatorState),

            verification:
                clone(verification),

            physicalExecution:
                false,

            backendConnection:
                false,

            automaticRecovery:
                false
        };
    }


    /*
    ------------------------------------------------------------
    AUDIT RECORD
    ------------------------------------------------------------
    */

    function buildAuditRecords(
        actionPlan,
        verification
    ) {

        const now = timestamp();

        return [

            {
                timestamp: now,
                event: "AUTONOMOUS_ACTION_PLAN_CREATED",
                authority: "CAPTAIN_AI_LENA",
                scenario: actionPlan.scenario
            },

            {
                timestamp: now,
                event: "SIMULATED_CONTROL_ALLOCATION",
                authority: "CAPTAIN_AI_LENA",
                physicalExecution: false
            },

            {
                timestamp: now,
                event: "SIMULATED_ACTUATOR_STATE_UPDATED",
                authority: "CAPTAIN_AI_LENA",
                physicalExecution: false
            },

            {
                timestamp: now,
                event: "AUTONOMOUS_ACTION_VERIFICATION",
                authority: "CAPTAIN_AI_LENA",
                result: verification.result
            }
        ];
    }


    /*
    ------------------------------------------------------------
    MAIN AUTONOMOUS ACTION
    ------------------------------------------------------------
    */

    function execute({
        decision,
        scenario,
        systemState,
        cascade
    }) {

        if (!SIMULATION_ONLY) {

            throw new Error(
                "SAFETY BOUNDARY VIOLATION: " +
                "Autonomous Action Engine must remain simulation-only."
            );
        }


        const actionPlan =
            buildActionPlan(
                decision,
                scenario,
                systemState,
                cascade
            );


        const allocation =
            calculateControlAllocation(
                systemState,
                actionPlan
            );


        const actuatorState =
            simulateActuatorState(
                allocation
            );


        const verification =
            verifyAction(
                actionPlan,
                allocation,
                actuatorState
            );


        const memory =
            buildMemoryRecord(
                actionPlan,
                allocation,
                actuatorState,
                verification
            );


        const audit =
            buildAuditRecords(
                actionPlan,
                verification
            );


        return {

            engine:
                "CAPTAIN_AI_LENA_AUTONOMOUS_ACTION_ENGINE",

            version:
                ENGINE_VERSION,

            authority:
                "CAPTAIN_AI_LENA",

            mode:
                "AUTONOMOUS_SIMULATION",

            status:
                verification.result === "PASS"
                    ? "SIMULATED_ACTION_COMPLETED"
                    : "SIMULATED_ACTION_BLOCKED",

            scenario,

            decision,

            actionPlan,

            controlAllocation:
                allocation,

            simulatedActuatorState:
                actuatorState,

            verification,

            memory,

            audit,

            executionGate:
                "AUTONOMOUS_SIMULATION_GATE",

            physicalExecution:
                PHYSICAL_EXECUTION,

            backendConnection:
                BACKEND_CONNECTION,

            automaticRecovery:
                false,

            message:
                verification.result === "PASS"
                    ? "Captain AI Lena autonomous action completed inside deterministic simulation. No physical UMV action executed."
                    : "Autonomous action blocked by simulation verification."
        };
    }


    /*
    ------------------------------------------------------------
    PUBLIC API
    ------------------------------------------------------------
    */

    return {

        version:
            ENGINE_VERSION,

        actions:
            ACTIONS,

        execute,

        buildActionPlan,

        calculateControlAllocation,

        simulateActuatorState,

        verifyAction
    };

})();


/*
============================================================
GLOBAL EXPORT
============================================================
*/

if (typeof window !== "undefined") {

    window.CaptainAILenaAutonomousActionEngine =
        CaptainAILenaAutonomousActionEngine;
}