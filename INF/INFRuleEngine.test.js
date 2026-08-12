/**

* SPD v13.1 — INF Rule Engine Validation
* 
* Tests INF-001 through INF-010.
* 
* Purpose:
* Verify:
* - INF domain registration
* - Rule registration
* - Scenario mapping
* - Unknown scenario rejection
* - Deterministic evaluation
* - Risk classification
* - Cascade generation
* - Human authorization
* - Autonomous execution disabled
* - Audit output
* - Repeatability
    */

const INFRuleEngine = require("./INFRuleEngine");

let passed = 0;
let failed = 0;

function assert(condition, message) {
if (condition) {
console.log("PASS:", message);
passed++;
} else {
console.error("FAIL:", message);
failed++;
}
}

/* -------------------------------------------------------

* TEST 1 — DOMAIN REGISTRATION
* ----------------------------------------------------- */

console.log("\nTEST 1 — INF DOMAIN STATUS");

const status = INFRuleEngine.getStatus();

assert(
status.id === "INF",
"INF domain registered"
);

assert(
status.status === "ACTIVE",
"INF domain ACTIVE"
);

assert(
status.engineRegistered === true,
"INF engine registered"
);

assert(
status.ruleCount === 10,
"Ten INF rules registered"
);

/* -------------------------------------------------------

* TEST 2 — RULE MAPPING
* ----------------------------------------------------- */

console.log("\nTEST 2 — RULE MAPPING");

const expectedMappings = {

REGIONAL_NETWORK_OUTAGE: "INF-001",

DNS_FAILURE: "INF-002",

ISP_CONGESTION: "INF-003",

POWER_GRID_INSTABILITY: "INF-004",

DCI_FAILURE: "INF-005",

CLOUD_REGION_OUTAGE: "INF-006",

LOAD_BALANCER_FAILURE: "INF-007",

TLS_PKI_FAILURE: "INF-008",

EDGE_NODE_FAILURE: "INF-009",

MULTI_LAYER_COLLAPSE: "INF-010"

};

Object.entries(expectedMappings).forEach(
([scenario, expectedRule]) => {

const result =
  INFRuleEngine.resolveRule(scenario);

assert(
  result.success === true,
  `${scenario} resolves successfully`
);

assert(
  result.ruleId === expectedRule,
  `${scenario} maps to ${expectedRule}`
);

}
);

/* -------------------------------------------------------

* TEST 3 — UNKNOWN SCENARIO REJECTION
* ----------------------------------------------------- */

console.log("\nTEST 3 — UNKNOWN SCENARIO");

const unknown =
INFRuleEngine.resolveRule(
"UNKNOWN_INF_SCENARIO"
);

assert(
unknown.success === false,
"Unknown INF scenario rejected"
);

assert(
unknown.error ===
"INF_SCENARIO_NOT_REGISTERED",
"Correct rejection code returned"
);

/* -------------------------------------------------------

* TEST 4 — INF-001 NETWORK OUTAGE
* ----------------------------------------------------- */

console.log("\nTEST 4 — INF-001 NETWORK OUTAGE");

const networkResult =
INFRuleEngine.evaluate(
"REGIONAL_NETWORK_OUTAGE",
{
network: 85,
dns: 60,
intensity: 90
}
);

assert(
networkResult.success === true,
"INF-001 evaluation successful"
);

assert(
networkResult.rule.id === "INF-001",
"INF-001 selected"
);

assert(
networkResult.domain === "INF",
"INF domain confirmed"
);

assert(
typeof networkResult.assessment.resilienceScore ===
"number",
"Network resilience score generated"
);

assert(
Array.isArray(
networkResult.cascade.cascade
),
"Network cascade generated"
);

/* -------------------------------------------------------

* TEST 5 — INF-002 DNS FAILURE
* ----------------------------------------------------- */

console.log("\nTEST 5 — INF-002 DNS FAILURE");

const dnsResult =
INFRuleEngine.evaluate(
"DNS_FAILURE",
{
dns: 85,
network: 60,
intensity: 80
}
);

assert(
dnsResult.success === true,
"INF-002 evaluation successful"
);

assert(
dnsResult.rule.id === "INF-002",
"INF-002 selected"
);

assert(
dnsResult.scenario === "DNS_FAILURE",
"DNS scenario confirmed"
);

/* -------------------------------------------------------

* TEST 6 — INF-003 ISP CONGESTION
* ----------------------------------------------------- */

console.log("\nTEST 6 — INF-003 ISP CONGESTION");

const ispResult =
INFRuleEngine.evaluate(
"ISP_CONGESTION",
{
network: 80,
intensity: 85
}
);

assert(
ispResult.success === true,
"INF-003 evaluation successful"
);

assert(
ispResult.rule.id === "INF-003",
"INF-003 selected"
);

assert(
ispResult.decision.executionAuthority ===
"HUMAN_OPERATOR",
"ISP execution authority is human"
);

/* -------------------------------------------------------

* TEST 7 — INF-004 POWER GRID
* ----------------------------------------------------- */

console.log("\nTEST 7 — INF-004 POWER GRID");

const powerResult =
INFRuleEngine.evaluate(
"POWER_GRID_INSTABILITY",
{
power: 90,
intensity: 90
}
);

assert(
powerResult.success === true,
"INF-004 evaluation successful"
);

assert(
powerResult.rule.id === "INF-004",
"INF-004 selected"
);

/* -------------------------------------------------------

* TEST 8 — INF-005 DCI FAILURE
* ----------------------------------------------------- */

console.log("\nTEST 8 — INF-005 DCI FAILURE");

const dciResult =
INFRuleEngine.evaluate(
"DCI_FAILURE",
{
dci: 85,
network: 70,
intensity: 90
}
);

assert(
dciResult.success === true,
"INF-005 evaluation successful"
);

assert(
dciResult.rule.id === "INF-005",
"INF-005 selected"
);

/* -------------------------------------------------------

* TEST 9 — INF-006 CLOUD REGION
* ----------------------------------------------------- */

console.log("\nTEST 9 — INF-006 CLOUD REGION");

const cloudResult =
INFRuleEngine.evaluate(
"CLOUD_REGION_OUTAGE",
{
cloud: 90,
dci: 70,
intensity: 95
}
);

assert(
cloudResult.success === true,
"INF-006 evaluation successful"
);

assert(
cloudResult.rule.id === "INF-006",
"INF-006 selected"
);

/* -------------------------------------------------------

* TEST 10 — INF-007 LOAD BALANCER
* ----------------------------------------------------- */

console.log("\nTEST 10 — INF-007 LOAD BALANCER");

const loadBalancerResult =
INFRuleEngine.evaluate(
"LOAD_BALANCER_FAILURE",
{
loadBalancer: 90,
network: 65,
intensity: 90
}
);

assert(
loadBalancerResult.success === true,
"INF-007 evaluation successful"
);

assert(
loadBalancerResult.rule.id === "INF-007",
"INF-007 selected"
);

/* -------------------------------------------------------

* TEST 11 — INF-008 TLS / PKI
* ----------------------------------------------------- */

console.log("\nTEST 11 — INF-008 TLS / PKI");

const tlsResult =
INFRuleEngine.evaluate(
"TLS_PKI_FAILURE",
{
tls: 90,
network: 60,
intensity: 90
}
);

assert(
tlsResult.success === true,
"INF-008 evaluation successful"
);

assert(
tlsResult.rule.id === "INF-008",
"INF-008 selected"
);

/* -------------------------------------------------------

* TEST 12 — INF-009 EDGE NODE
* ----------------------------------------------------- */

console.log("\nTEST 12 — INF-009 EDGE NODE");

const edgeResult =
INFRuleEngine.evaluate(
"EDGE_NODE_FAILURE",
{
edge: 85,
network: 60,
intensity: 85
}
);

assert(
edgeResult.success === true,
"INF-009 evaluation successful"
);

assert(
edgeResult.rule.id === "INF-009",
"INF-009 selected"
);

/* -------------------------------------------------------

* TEST 13 — INF-010 MULTI-LAYER COLLAPSE
* ----------------------------------------------------- */

console.log(
"\nTEST 13 — INF-010 MULTI-LAYER COLLAPSE"
);

const collapseResult =
INFRuleEngine.evaluate(
"MULTI_LAYER_COLLAPSE",
{
network: 100,
dns: 100,
power: 100,
cloud: 100,
loadBalancer: 100,
tls: 100,
edge: 100,
dci: 100,
system: 100,
intensity: 100
}
);

assert(
collapseResult.success === true,
"INF-010 evaluation successful"
);

assert(
collapseResult.rule.id === "INF-010",
"INF-010 selected"
);

assert(
collapseResult.assessment.risk === "RED",
"Multi-layer collapse produces RED"
);

/* -------------------------------------------------------

* TEST 14 — RISK CLASSIFICATION
* ----------------------------------------------------- */

console.log("\nTEST 14 — RISK CLASSIFICATION");

const green =
INFRuleEngine.evaluate(
"REGIONAL_NETWORK_OUTAGE",
{
network: 0,
intensity: 0
}
);

assert(
green.assessment.risk === "GREEN",
"Low stress produces GREEN"
);

const red =
INFRuleEngine.evaluate(
"MULTI_LAYER_COLLAPSE",
{
network: 100,
dns: 100,
power: 100,
cloud: 100,
loadBalancer: 100,
tls: 100,
edge: 100,
dci: 100,
system: 100,
intensity: 100
}
);

assert(
red.assessment.risk === "RED",
"Extreme stress produces RED"
);

/* -------------------------------------------------------

* TEST 15 — HUMAN EXECUTION GATE
* ----------------------------------------------------- */

console.log("\nTEST 15 — HUMAN EXECUTION GATE");

const gate =
INFRuleEngine.evaluate(
"MULTI_LAYER_COLLAPSE",
{
network: 90,
power: 90,
cloud: 90,
intensity: 100
}
);

assert(
gate.decision.executionAuthority ===
"HUMAN_OPERATOR",
"Execution authority remains HUMAN_OPERATOR"
);

assert(
gate.decision.executionStatus ===
"HUMAN_AUTHORIZATION_REQUIRED",
"Human authorization required before execution"
);

assert(
gate.governance.autonomousExecution === false,
"Autonomous execution disabled"
);

assert(
gate.governance.humanAuthorizationRequired === true,
"Human authorization requirement confirmed"
);

/* -------------------------------------------------------

* TEST 16 — AUDIT OUTPUT
* ----------------------------------------------------- */

console.log("\nTEST 16 — AUDIT OUTPUT");

assert(
gate.audit.engine === "INFRuleEngine",
"Audit identifies INFRuleEngine"
);

assert(
gate.audit.domain === "INF",
"Audit identifies INF domain"
);

assert(
typeof gate.audit.timestamp === "string",
"Audit timestamp generated"
);

assert(
gate.audit.ruleId === "INF-010",
"Audit records INF-010"
);

/* -------------------------------------------------------

* TEST 17 — DETERMINISTIC REPEATABILITY
* ----------------------------------------------------- */

console.log(
"\nTEST 17 — DETERMINISTIC REPEATABILITY"
);

const testInput = {
network: 65,
dns: 45,
power: 55,
cloud: 30,
loadBalancer: 35,
tls: 40,
edge: 25,
dci: 50,
intensity: 70
};

const runA =
INFRuleEngine.evaluate(
"REGIONAL_NETWORK_OUTAGE",
testInput
);

const runB =
INFRuleEngine.evaluate(
"REGIONAL_NETWORK_OUTAGE",
testInput
);

assert(
runA.assessment.stress ===
runB.assessment.stress,
"Repeated stress calculation is deterministic"
);

assert(
runA.assessment.resilienceScore ===
runB.assessment.resilienceScore,
"Repeated resilience calculation is deterministic"
);

assert(
runA.assessment.risk ===
runB.assessment.risk,
"Repeated risk classification is deterministic"
);

/* -------------------------------------------------------

* FINAL RESULT
* ----------------------------------------------------- */

console.log(
"\n======================================"
);

console.log(
"SPD v13.1 INF RULE ENGINE VALIDATION"
);

console.log(
"======================================"
);

console.log(
"TOTAL PASSED:",
passed
);

console.log(
"TOTAL FAILED:",
failed
);

if (failed === 0) {

console.log(
"VALIDATION STATUS: PASS"
);

console.log(
"INF-001 → INF-010 READY FOR DOMAIN INTEGRATION"
);

} else {

console.error(
"VALIDATION STATUS: FAIL"
);

console.error(
"DOMAIN INTEGRATION MUST NOT PROCEED"
);

process.exitCode = 1;
}