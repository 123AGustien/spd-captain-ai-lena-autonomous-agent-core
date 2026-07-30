/**
 * ============================================================
 * SPD V13.1 — SCENARIO ENGINE
 * ============================================================
 *
 * Captain AI Lena Autonomous Agent Core
 *
 * Deterministic scenario interpretation layer.
 *
 * DATA → SCENARIO → DOMAIN RESPONSE
 *
 * The Scenario Engine identifies the active scenario.
 * It does not override the Golden Rule Engine.
 *
 * Flow:
 *
 * Cockpit
 *    ↓
 * Scenario Engine
 *    ↓
 * Domain Integration Layer
 *    ↓
 * Domain Rule Engine
 *    ↓
 * Golden Rule Engine
 *    ↓
 * Captain AI Lena Decision Core
 *    ↓
 * Memory Core
 *    ↓
 * Audit Record
 *
 * Supported Domains:
 *
 * FIN — Financial Resilience
 * BHR — Business & Human Rights
 * DC  — Data Centre
 * CYB — Cyber
 * INF — Infrastructure
 * ENG — Energy
 *
 * Golden Rule:
 *
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * Deterministic.
 * No randomness.
 * No machine learning.
 *
 * ============================================================
 */


/**
 * ============================================================
 * SCENARIO DEFINITIONS
 * ============================================================
 */

export const scenarios = {


    NORMAL: {

        type: "NORMAL",

        domain: "SC",

        name:
            "NORMAL OPERATIONS",

        description:
            "No active system stress scenario.",

        impact:
            "System operating within normal parameters."

    },


/* ============================================================
   FINANCIAL RESILIENCE SCENARIOS
   ============================================================
 */


    FX_SHOCK: {

        type:
            "FX_SHOCK",

        domain:
            "FIN",

        name:
            "FOREIGN EXCHANGE SHOCK",

        description:
            "Rapid deterioration in foreign exchange stability.",

        impact:
            "Economic pressure may propagate into connected systems."

    },


    FIN_STRESS: {

        type:
            "FIN_STRESS",

        domain:
            "FIN",

        name:
            "FINANCIAL STRESS",

        description:
            "General financial system pressure.",

        impact:
            "Financial resilience assessment required."

    },


    BANKING_STRESS: {

        type:
            "BANKING_STRESS",

        domain:
            "FIN",

        name:
            "BANKING STRESS",

        description:
            "Banking system stability stress scenario.",

        impact:
            "Liquidity and financial stability monitoring required."

    },


    LIQUIDITY_CRISIS: {

        type:
            "LIQUIDITY_CRISIS",

        domain:
            "FIN",

        name:
            "LIQUIDITY CRISIS",

        description:
            "Liquidity availability under severe pressure.",

        impact:
            "Capital preservation and resilience actions required."

    },


    CREDIT_STRESS: {

        type:
            "CREDIT_STRESS",

        domain:
            "FIN",

        name:
            "CREDIT STRESS",

        description:
            "Credit market deterioration scenario.",

        impact:
            "Credit exposure assessment required."

    },


    SOVEREIGN_DEBT: {

        type:
            "SOVEREIGN_DEBT",

        domain:
            "FIN",

        name:
            "SOVEREIGN DEBT STRESS",

        description:
            "Sovereign financial stability pressure.",

        impact:
            "Macro financial resilience assessment required."

    },


/* ============================================================
   ENERGY / INFRA / CYBER
   ============================================================
 */


    ENERGY_CRISIS: {

        type:
            "ENERGY_CRISIS",

        domain:
            "ENG",

        name:
            "ENERGY CRISIS",

        description:
            "Energy reserves under significant pressure.",

        impact:
            "System load reduction and energy preservation required."

    },


    CYBER_ATTACK: {

        type:
            "CYBER_ATTACK",

        domain:
            "CYB",

        name:
            "CYBER ATTACK",

        description:
            "Cybersecurity attack simulation.",

        impact:
            "System integrity protection required."

    },


    INFRA_FAILURE: {

        type:
            "INFRA_FAILURE",

        domain:
            "INF",

        name:
            "INFRASTRUCTURE FAILURE",

        description:
            "Critical infrastructure stress.",

        impact:
            "Recovery and stabilization measures required."

    },


/* ============================================================
   BUSINESS & HUMAN RIGHTS SCENARIOS
   ============================================================
 */


    HUMAN_RIGHTS_DUE_DILIGENCE: {

        type:
            "HUMAN_RIGHTS_DUE_DILIGENCE",

        domain:
            "BHR",

        name:
            "HUMAN RIGHTS DUE DILIGENCE",

        description:
            "Assessment of human rights risks within operations and supply chains.",

        impact:
            "Human rights exposure assessment required."

    },


    FORCED_LABOUR: {

        type:
            "FORCED_LABOUR",

        domain:
            "BHR",

        name:
            "FORCED LABOUR RISK",

        description:
            "Assessment of forced labour exposure.",

        impact:
            "Immediate human rights risk evaluation required."

    },


    CHILD_LABOUR: {

        type:
            "CHILD_LABOUR",

        domain:
            "BHR",

        name:
            "CHILD LABOUR RISK",

        description:
            "Assessment of child labour exposure.",

        impact:
            "Human rights protection measures required."

    },


    DISCRIMINATION: {

        type:
            "DISCRIMINATION",

        domain:
            "BHR",

        name:
            "DISCRIMINATION RISK",

        description:
            "Assessment of workplace discrimination risk.",

        impact:
            "Equality and compliance assessment required."

    },


    OCCUPATIONAL_HEALTH_AND_SAFETY: {

        type:
            "OCCUPATIONAL_HEALTH_AND_SAFETY",

        domain:
            "BHR",

        name:
            "OCCUPATIONAL HEALTH & SAFETY",

        description:
            "Assessment of workplace safety conditions.",

        impact:
            "Worker protection assessment required."

    },


    MODERN_SLAVERY: {

        type:
            "MODERN_SLAVERY",

        domain:
            "BHR",

        name:
            "MODERN SLAVERY RISK",

        description:
            "Assessment of modern slavery exposure.",

        impact:
            "Human rights mitigation required."

    },


    COMMUNITY_IMPACT: {

        type:
            "COMMUNITY_IMPACT",

        domain:
            "BHR",

        name:
            "COMMUNITY IMPACT",

        description:
            "Assessment of operational impact on communities.",

        impact:
            "Community engagement and mitigation required."

    },


    INDIGENOUS_RIGHTS: {

        type:
            "INDIGENOUS_RIGHTS",

        domain:
            "BHR",

        name:
            "INDIGENOUS RIGHTS",

        description:
            "Assessment of indigenous rights impact.",

        impact:
            "Rights protection assessment required."

    },


    SUPPLY_CHAIN_RISK: {

        type:
            "SUPPLY_CHAIN_RISK",

        domain:
            "BHR",

        name:
            "SUPPLY CHAIN HUMAN RIGHTS RISK",

        description:
            "Assessment of supplier human rights exposure.",

        impact:
            "Supply chain due diligence required."

    },


    GRIEVANCE_MECHANISM: {

        type:
            "GRIEVANCE_MECHANISM",

        domain:
            "BHR",

        name:
            "GRIEVANCE MECHANISM",

        description:
            "Assessment of complaint and remediation systems.",

        impact:
            "Remediation capability assessment required."

    }

};



/**
 * ============================================================
 * MAIN SCENARIO ENGINE
 * ============================================================
 */

export function scenarioEngine(
    event = "NORMAL"
) {

    const normalizedEvent =
        String(event)
        .trim()
        .toUpperCase();


    return (

        scenarios[normalizedEvent]
        ??
        scenarios.NORMAL

    );

}



/**
 * ============================================================
 * SCENARIO RESPONSE
 * ============================================================
 */

export function getScenarioResponse(
    scenario
) {


    const type =
        typeof scenario === "string"
        ?
        scenario
        :
        scenario?.type;



    switch(type) {


        case "FX_SHOCK":
        case "FIN_STRESS":
        case "BANKING_STRESS":
        case "LIQUIDITY_CRISIS":
        case "CREDIT_STRESS":
        case "SOVEREIGN_DEBT":

            return "FINANCIAL RESILIENCE MODE ACTIVE";



        case "HUMAN_RIGHTS_DUE_DILIGENCE":
        case "FORCED_LABOUR":
        case "CHILD_LABOUR":
        case "DISCRIMINATION":
        case "OCCUPATIONAL_HEALTH_AND_SAFETY":
        case "MODERN_SLAVERY":
        case "COMMUNITY_IMPACT":
        case "INDIGENOUS_RIGHTS":
        case "SUPPLY_CHAIN_RISK":
        case "GRIEVANCE_MECHANISM":

            return "BHR HUMAN RIGHTS ASSESSMENT ACTIVE";



        case "ENERGY_CRISIS":

            return "ENERGY RESERVE MODE ACTIVE";



        case "CYBER_ATTACK":

            return "CYBER DEFENSE MODE ACTIVE";



        case "INFRA_FAILURE":

            return "INFRASTRUCTURE RECOVERY MODE ACTIVE";



        default:

            return "NO SCENARIO RESPONSE REQUIRED";

    }

}



/**
 * ============================================================
 * SAFE SCENARIO SNAPSHOT
 * ============================================================
 */

export function safeScenarioSnapshot(
    state = {}
) {

    return {

        fx:
            Number(state.fx ?? 0),

        energy:
            Number(state.energy ?? 50),

        cyb:
            Number(state.cyb ?? 50),

        inf:
            Number(state.inf ?? 0),

        dc:
            Number(state.dc ?? 0),

        event:
            state.event ??
            "NORMAL"

    };

}



/**
 * ============================================================
 * SCENARIO INFORMATION PACKET
 * ============================================================
 */

export function buildScenarioPacket(
    state = {}
) {


    const snapshot =
        safeScenarioSnapshot(state);


    const scenario =
        scenarioEngine(
            snapshot.event
        );


    return {

        scenario,

        response:
            getScenarioResponse(
                scenario
            ),

        systemSnapshot:
            snapshot,

        status:
            "SCENARIO EVALUATED"

    };

}