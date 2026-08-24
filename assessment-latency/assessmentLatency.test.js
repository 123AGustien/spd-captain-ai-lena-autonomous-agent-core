/**
 * SPD v13.1 — Assessment Latency Observer Tests
 *
 * PURPOSE:
 * Validate the measurement layer only.
 *
 * PROTECTION:
 * These tests must not modify:
 * - Golden Rule Engine
 * - Domain Rule Engines
 * - Domain thresholds
 * - Decision logic
 * - Action logic
 * - Cockpit screens
 */

import {
  startLatencyMeasurement,
  endLatencyMeasurement,
  recordLatency,
  getLatencyCatalogue,
  getLatencyStatistics,
  clearLatencyCatalogue
} from "./assessmentLatency.js";

describe("SPD v13.1 Assessment Latency Observer", () => {

  beforeEach(() => {
    clearLatencyCatalogue();
  });

  test("creates a latency measurement", () => {
    const measurement = startLatencyMeasurement({
      engine: "Golden Rule Engine",
      stage: "ASSESS",
      scenario: "TEST"
    });

    expect(measurement.measurementId).toBeDefined();
    expect(measurement.startTime).toBeDefined();
    expect(measurement.timestamp).toBeDefined();
  });

  test("records elapsed latency", () => {
    const measurement = startLatencyMeasurement({
      engine: "Golden Rule Engine",
      stage: "ASSESS"
    });

    const record = endLatencyMeasurement(measurement, {
      status: "PASS"
    });

    expect(record.elapsedMs).toBeGreaterThanOrEqual(0);
    expect(record.result.status).toBe("PASS");
  });

  test("preserves engine identity", () => {
    const measurement = startLatencyMeasurement({
      engine: "Golden Rule Engine",
      stage: "DECIDE"
    });

    const record = endLatencyMeasurement(measurement);

    expect(record.metadata.engine)
      .toBe("Golden Rule Engine");

    expect(record.metadata.stage)
      .toBe("DECIDE");
  });

  test("records domain engine measurements independently", () => {
    const measurement = startLatencyMeasurement({
      engine: "FIN Domain Rule Engine",
      domain: "FIN",
      ruleId: "FIN-001",
      stage: "DOMAIN_ASSESS"
    });

    const record = endLatencyMeasurement(measurement, {
      status: "PASS"
    });

    expect(record.metadata.engine)
      .toBe("FIN Domain Rule Engine");

    expect(record.metadata.domain)
      .toBe("FIN");

    expect(record.metadata.ruleId)
      .toBe("FIN-001");
  });

  test("does not combine engine authorities", () => {
    const goldenMeasurement = startLatencyMeasurement({
      engine: "Golden Rule Engine",
      stage: "ASSESS"
    });

    endLatencyMeasurement(goldenMeasurement);

    const domainMeasurement = startLatencyMeasurement({
      engine: "FIN Domain Rule Engine",
      domain: "FIN",
      ruleId: "FIN-001",
      stage: "DOMAIN_ASSESS"
    });

    endLatencyMeasurement(domainMeasurement);

    const catalogue = getLatencyCatalogue();

    expect(catalogue.length).toBe(2);

    expect(catalogue[0].metadata.engine)
      .toBe("Golden Rule Engine");

    expect(catalogue[1].metadata.engine)
      .toBe("FIN Domain Rule Engine");
  });

  test("supports direct catalogue records", () => {
    recordLatency({
      measurementId: "TEST-001",
      engine: "Golden Rule Engine",
      stage: "VERIFY",
      elapsedMs: 10.5,
      result: {
        status: "PASS"
      }
    });

    const catalogue = getLatencyCatalogue();

    expect(catalogue.length).toBe(1);
    expect(catalogue[0].elapsedMs).toBe(10.5);
  });

  test("calculates latency statistics", () => {
    recordLatency({
      measurementId: "TEST-001",
      elapsedMs: 10
    });

    recordLatency({
      measurementId: "TEST-002",
      elapsedMs: 20
    });

    recordLatency({
      measurementId: "TEST-003",
      elapsedMs: 30
    });

    const statistics = getLatencyStatistics();

    expect(statistics.count).toBe(3);
    expect(statistics.minimumMs).toBe(10);
    expect(statistics.maximumMs).toBe(30);
    expect(statistics.averageMs).toBe(20);
  });

  test("clears only the latency catalogue", () => {
    recordLatency({
      measurementId: "TEST-001",
      elapsedMs: 15
    });

    expect(getLatencyCatalogue().length).toBe(1);

    clearLatencyCatalogue();

    expect(getLatencyCatalogue().length).toBe(0);
  });

});