/**
 * SPD v13.1 — Assessment Latency Observer Tests
 *
 * FILE:
 * assessment-latency/assessmentLatencyObserver.test.js
 *
 * PURPOSE:
 * Validate the measurement-only Assessment Latency Observer
 * and integration layer.
 *
 * PROTECTION:
 * These tests must not modify:
 *
 * - Golden Rule Engine
 * - Domain Rule Engines
 * - Domain thresholds
 * - Risk classification
 * - Resilience calculations
 * - Decision logic
 * - Action logic
 * - Human Decision Authority
 * - Existing cockpit
 *
 * TEST MODE:
 * MEASUREMENT ONLY
 *
 * AUTHORITATIVE LATENCY STAGES:
 *
 * INPUT
 * OBSERVE
 * VERIFY
 * ASSESS
 * DECIDE
 * ACT
 * UPDATE
 * SELF_TEST
 * FAULT_IDENTIFICATION
 * CORRECTIVE_ACTION_ASSESSMENT
 * RE_TEST
 * END_TO_END
 */


/* =========================================================
   IMPORTS
========================================================= */

import {
    startLatency,
    endLatency,
    recordLatency,
    getLatencyMeasurement,
    getCompletedMeasurements,
    getMeasurementCount,
    clearLatencyMeasurements,
    resetLatencySequence,
    getLatencyStages,
    isSupportedLatencyStage,
    getLatencyIntegrationStatus,
    validateLatencyIntegration
} from "./assessmentLatencyIntegration.js";


import {
    observeStart,
    observeEnd,
    observeExecution,
    getObservation,
    getActiveObservations,
    getAssessmentLatencyObserverStatus,
    verifyAssessmentLatencyObserver,
    resetAssessmentLatencyObserverSequence
} from "./AssessmentLatencyObserver.js";


/* =========================================================
   TEST SETUP
========================================================= */

beforeEach(() => {

    /*
     * Clear ONLY the latency measurement store.
     *
     * This must never clear or modify SPD engine state.
     */

    clearLatencyMeasurements();

    resetLatencySequence();

    resetAssessmentLatencyObserverSequence();

});


/* =========================================================
   CATALOGUE / STAGE VALIDATION
========================================================= */

describe(
    "SPD v13.1 Assessment Latency Catalogue",
    () => {

        test(
            "contains the authoritative latency stages",
            () => {

                const stages =
                    getLatencyStages();


                expect(
                    stages
                ).toEqual([

                    "INPUT",
                    "OBSERVE",
                    "VERIFY",
                    "ASSESS",
                    "DECIDE",
                    "ACT",
                    "UPDATE",
                    "SELF_TEST",
                    "FAULT_IDENTIFICATION",
                    "CORRECTIVE_ACTION_ASSESSMENT",
                    "RE_TEST",
                    "END_TO_END"

                ]);

            }
        );


        test(
            "accepts every authoritative latency stage",
            () => {

                const stages =
                    getLatencyStages();


                stages.forEach(
                    stage => {

                        expect(
                            isSupportedLatencyStage(
                                stage
                            )
                        ).toBe(true);

                    }
                );

            }
        );


        test(
            "rejects an undefined latency stage",
            () => {

                expect(
                    isSupportedLatencyStage(
                        "DOMAIN_ASSESS"
                    )
                ).toBe(false);

            }
        );

    }
);


/* =========================================================
   BASIC MEASUREMENT TESTS
========================================================= */

describe(
    "Assessment Latency Integration",
    () => {

        test(
            "starts a latency measurement",
            () => {

                const result =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "TEST"
                        }
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.key
                ).toBeDefined();


                expect(
                    result.stage
                ).toBe("ASSESS");

            }
        );


        test(
            "records elapsed latency",
            () => {

                const started =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "TEST"
                        }
                    );


                const ended =
                    endLatency(
                        started.key
                    );


                expect(
                    ended.success
                ).toBe(true);


                expect(
                    ended.durationMs
                ).toBeGreaterThanOrEqual(0);


                expect(
                    ended.stage
                ).toBe("ASSESS");

            }
        );


        test(
            "retrieves a completed measurement",
            () => {

                const started =
                    startLatency(
                        "VERIFY"
                    );


                endLatency(
                    started.key
                );


                const result =
                    getLatencyMeasurement(
                        started.key
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.measurement
                ).toBeDefined();


                expect(
                    result.measurement.completed
                ).toBe(true);

            }
        );


        test(
            "records a completed latency audit record",
            () => {

                const started =
                    startLatency(
                        "DECIDE",
                        {
                            engine:
                                "Golden Rule Engine"
                        }
                    );


                endLatency(
                    started.key
                );


                const result =
                    recordLatency(
                        started.key
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.record
                ).toBeDefined();


                expect(
                    result.record.stage
                ).toBe("DECIDE");


                expect(
                    result.record.measurementPolicy
                ).toBe("MEASUREMENT_ONLY");

            }
        );

    }
);


/* =========================================================
   ENGINE SEPARATION
========================================================= */

describe(
    "Engine Separation",
    () => {

        test(
            "preserves Golden Rule Engine identity",
            () => {

                const started =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "TEST"
                        }
                    );


                endLatency(
                    started.key
                );


                const result =
                    recordLatency(
                        started.key
                    );


                expect(
                    result.record.context.engine
                ).toBe(
                    "Golden Rule Engine"
                );

            }
        );


        test(
            "records domain measurements independently",
            () => {

                const started =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "FIN Domain Rule Engine",

                            domain:
                                "FIN",

                            ruleId:
                                "FIN-001",

                            scenario:
                                "FIN_TEST"
                        }
                    );


                endLatency(
                    started.key
                );


                const result =
                    recordLatency(
                        started.key
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.record.context.engine
                ).toBe(
                    "FIN Domain Rule Engine"
                );


                expect(
                    result.record.context.domain
                ).toBe("FIN");


                expect(
                    result.record.context.ruleId
                ).toBe("FIN-001");

            }
        );


        test(
            "does not combine Golden Rule and domain measurements",
            () => {

                const golden =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "Golden Rule Engine"
                        }
                    );


                endLatency(
                    golden.key
                );


                const domain =
                    startLatency(
                        "ASSESS",
                        {
                            engine:
                                "FIN Domain Rule Engine",

                            domain:
                                "FIN",

                            ruleId:
                                "FIN-001"
                        }
                    );


                endLatency(
                    domain.key
                );


                const measurements =
                    getCompletedMeasurements();


                expect(
                    measurements.length
                ).toBe(2);


                expect(
                    measurements[0].context.engine
                ).toBe(
                    "Golden Rule Engine"
                );


                expect(
                    measurements[1].context.engine
                ).toBe(
                    "FIN Domain Rule Engine"
                );

            }
        );

    }
);


/* =========================================================
   OBSERVER TESTS
========================================================= */

describe(
    "AssessmentLatencyObserver",
    () => {

        test(
            "creates an observation handle",
            () => {

                const result =
                    observeStart(
                        "OBSERVE",
                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "OBSERVER_TEST"
                        }
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.observationId
                ).toBeDefined();


                expect(
                    result.key
                ).toBeDefined();


                expect(
                    result.stage
                ).toBe("OBSERVE");


                expect(
                    result.measurementOnly
                ).toBe(true);

            }
        );


        test(
            "ends an observation and records latency",
            () => {

                const started =
                    observeStart(
                        "ASSESS",
                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "OBSERVER_TEST"
                        }
                    );


                const ended =
                    observeEnd(
                        started.observationId
                    );


                expect(
                    ended.success
                ).toBe(true);


                expect(
                    ended.durationMs
                ).toBeGreaterThanOrEqual(0);


                expect(
                    ended.record.success
                ).toBe(true);

            }
        );


        test(
            "removes completed observation from active store",
            () => {

                const started =
                    observeStart(
                        "VERIFY"
                    );


                expect(
                    getActiveObservations().length
                ).toBe(1);


                observeEnd(
                    started.observationId
                );


                expect(
                    getActiveObservations().length
                ).toBe(0);

            }
        );


        test(
            "retrieves an active observation without modification",
            () => {

                const started =
                    observeStart(
                        "ASSESS"
                    );


                const result =
                    getObservation(
                        started.observationId
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.observation.stage
                ).toBe("ASSESS");


                expect(
                    result.observation.key
                ).toBe(
                    started.key
                );

            }
        );


        test(
            "rejects an unsupported observation stage",
            () => {

                const result =
                    observeStart(
                        "DOMAIN_ASSESS"
                    );


                expect(
                    result.success
                ).toBe(false);


                expect(
                    result.error
                ).toBe(
                    "UNSUPPORTED_LATENCY_STAGE"
                );

            }
        );

    }
);


/* =========================================================
   EXECUTION BOUNDARY TEST
========================================================= */

describe(
    "Passive Execution Observation",
    () => {

        test(
            "observes execution without changing its result",
            () => {

                const result =
                    observeExecution(
                        "ASSESS",

                        () => {

                            return {

                                status:
                                    "PASS",

                                decision:
                                    "TEST_ONLY"

                            };

                        },

                        {
                            engine:
                                "Golden Rule Engine",

                            scenario:
                                "EXECUTION_TEST"
                        }
                    );


                expect(
                    result.success
                ).toBe(true);


                expect(
                    result.result.status
                ).toBe("PASS");


                expect(
                    result.result.decision
                ).toBe("TEST_ONLY");


                expect(
                    result.observation.success
                ).toBe(true);


                expect(
                    result.observation.durationMs
                ).toBeGreaterThanOrEqual(0);

            }
        );


        test(
            "propagates execution errors without swallowing them",
            () => {

                expect(
                    () => {

                        observeExecution(
                            "ASSESS",

                            () => {

                                throw new Error(
                                    "TEST_EXECUTION_ERROR"
                                );

                            }
                        );

                    }
                ).toThrow(
                    "TEST_EXECUTION_ERROR"
                );


                /*
                 * The observer must not leave an active
                 * measurement handle behind.
                 */

                expect(
                    getActiveObservations().length
                ).toBe(0);

            }
        );

    }
);


/* =========================================================
   MEASUREMENT STORE TESTS
========================================================= */

describe(
    "Measurement Store",
    () => {

        test(
            "tracks completed measurement count",
            () => {

                expect(
                    getMeasurementCount()
                ).toBe(0);


                const first =
                    startLatency(
                        "INPUT"
                    );


                endLatency(
                    first.key
                );


                const second =
                    startLatency(
                        "UPDATE"
                    );


                endLatency(
                    second.key
                );


                expect(
                    getMeasurementCount()
                ).toBe(2);

            }
        );


        test(
            "clears only latency measurements",
            () => {

                const started =
                    startLatency(
                        "ASSESS"
                    );


                endLatency(
                    started.key
                );


                expect(
                    getMeasurementCount()
                ).toBe(1);


                const result =
                    clearLatencyMeasurements();


                expect(
                    result.success
                ).toBe(true);


                expect(
                    getMeasurementCount()
                ).toBe(0);

            }
        );

    }
);


/* =========================================================
   INTEGRITY VALIDATION
========================================================= */

describe(
    "Latency Integration Integrity",
    () => {

        test(
            "latency integration validates successfully",
            () => {

                const result =
                    validateLatencyIntegration();


                expect(
                    result.status
                ).toBe("PASS");


                expect(
                    result.catalogueValid
                ).toBe(true);


                expect(
                    result.stagesValid
                ).toBe(true);


                expect(
                    result.stagesMatch
                ).toBe(true);


                expect(
                    result.measurementOnly
                ).toBe(true);

            }
        );


        test(
            "integration status protects engine authority",
            () => {

                const status =
                    getLatencyIntegrationStatus();


                expect(
                    status.measurementOnly
                ).toBe(true);


                expect(
                    status.goldenRuleEngine
                ).toBe("UNCHANGED");


                expect(
                    status.domainRuleEngines
                ).toBe("UNCHANGED");


                expect(
                    status.cockpit
                ).toBe("UNCHANGED");


                expect(
                    status.decisionLogic
                ).toBe("UNCHANGED");


                expect(
                    status.riskThresholds
                ).toBe("UNCHANGED");


                expect(
                    status.scenarioRules
                ).toBe("UNCHANGED");


                expect(
                    status.actionRules
                ).toBe("UNCHANGED");

            }
        );


        test(
            "observer verification passes",
            () => {

                const result =
                    verifyAssessmentLatencyObserver();


                expect(
                    result.status
                ).toBe("PASS");


                expect(
                    result.measurementOnly
                ).toBe(true);


                expect(
                    result.readOnly
                ).toBe(true);


                expect(
                    result.architectureProtection
                        .goldenRuleEngine
                ).toBe("UNCHANGED");


                expect(
                    result.architectureProtection
                        .domainRuleEngines
                ).toBe("UNCHANGED");


                expect(
                    result.architectureProtection
                        .decisions
                ).toBe("UNCHANGED");


                expect(
                    result.architectureProtection
                        .actions
                ).toBe("UNCHANGED");


                expect(
                    result.architectureProtection
                        .humanDecisionAuthority
                ).toBe("UNCHANGED");

            }
        );

    }
);


/* =========================================================
   FINAL PROTECTION TEST
========================================================= */

describe(
    "Architecture Protection",
    () => {

        test(
            "observer remains measurement-only",
            () => {

                const status =
                    getAssessmentLatencyObserverStatus();


                expect(
                    status.status
                ).toBe("ACTIVE");


                expect(
                    status.mode
                ).toBe(
                    "PASSIVE_MEASUREMENT_ONLY"
                );


                expect(
                    status.measurementOnly
                ).toBe(true);


                expect(
                    status.readOnly
                ).toBe(true);


                expect(
                    status.architectureProtection
                        .goldenRuleEngine
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .domainRuleEngines
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .domainThresholds
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .riskClassification
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .resilienceCalculations
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .decisions
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .actions
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .humanDecisionAuthority
                ).toBe("UNCHANGED");


                expect(
                    status.architectureProtection
                        .cockpit
                ).toBe("UNCHANGED");

            }
        );

    }
);