/**
 * SPD v13.1 — Domain Integration Layer
 * -------------------------------------
 * Gateway between cockpit/scenario controls,
 * authoritative domain rule engines, and
 * Captain AI Lena / Golden Rule Engine.
 *
 * Architecture:
 * COCKPIT
 *   ↓
 * DOMAIN INTEGRATION
 *   ↓
 * DOMAIN RULE ENGINE
 *   ↓
 * GOLDEN RULE ENGINE
 *   ↓
 * DECISION / ACTION / AUDIT
 */

const DOMAIN_REGISTRY = {
    FIN: {
        id: "FIN",
        name: "Financial Resilience",
        status: "ACTIVE",
        engine: "./domains/FIN/finRuleEngine.js"
    },

    BHR: {
        id: "BHR",
        name: "Business & Human Rights Resilience",
        status: "ACTIVE",
        engine: "./domains/BHR/bhrRuleEngine.js"
    },

    FX: {
        id: "FX",
        name: "Foreign Exchange",
        status: "PLANNED"
    },

    DC: {
        id: "DC",
        name: "Data Centre",
        status: "PLANNED"
    },

    CYB: {
        id: "CYB",
        name: "Cyber",
        status: "PLANNED"
    },

    INF: {
        id: "INF",
        name: "Infrastructure",
        status: "PLANNED"
    },

    ENG: {
        id: "ENG",
        name: "Energy",
        status: "PLANNED"
    },

    OPS: {
        id: "OPS",
        name: "Operations",
        status: "PLANNED"
    }
};

const DOMAIN_ENGINES = {};

function registerDomainEngine(domainId, engine) {
    if (!domainId || !engine) {
        throw new Error("DOMAIN_ENGINE_REGISTRATION_INVALID");
    }

    DOMAIN_ENGINES[domainId] = engine;

    return {
        domain: domainId,
        registered: true
    };
}

function getDomainStatus(domainId) {
    const domain = DOMAIN_REGISTRY[domainId];

    if (!domain) {
        return {
            domain: domainId,
            status: "UNKNOWN"
        };
    }

    return {
        ...domain,
        engineRegistered: Boolean(DOMAIN_ENGINES[domainId])
    };
}

function verifyDomainInput(domainId, state = {}) {
    const domain = DOMAIN_REGISTRY[domainId];

    if (!domain) {
        return {
            valid: false,
            reason: "UNKNOWN_DOMAIN"
        };
    }

    if (!state || typeof state !== "object") {
        return {
            valid: false,
            reason: "INVALID_STATE"
        };
    }

    return {
        valid: true,
        domain: domainId,
        verifiedState: { ...state }
    };
}

function executeDomainRule(domainId, state, context = {}) {
    const verification = verifyDomainInput(domainId, state);

    if (!verification.valid) {
        return {
            success: false,
            error: verification.reason
        };
    }

    const engine = DOMAIN_ENGINES[domainId];

    if (!engine || typeof engine.evaluate !== "function") {
        return {
            success: false,
            error: "DOMAIN_ENGINE_NOT_REGISTERED",
            domain: domainId
        };
    }

    return engine.evaluate(
        verification.verifiedState,
        context
    );
}

function listDomains() {
    return Object.values(DOMAIN_REGISTRY).map(domain => ({
        id: domain.id,
        name: domain.name,
        status: domain.status,
        engineRegistered: Boolean(DOMAIN_ENGINES[domain.id])
    }));
}

export {
    DOMAIN_REGISTRY,
    DOMAIN_ENGINES,
    registerDomainEngine,
    getDomainStatus,
    verifyDomainInput,
    executeDomainRule,
    listDomains
};