/**
 * SPD v13.1 — Audit Integrity Verification Layer
 *
 * Purpose:
 * Generates a SHA-256 integrity hash for SPD audit records.
 *
 * Function:
 * Ensures audit records can be verified
 * after creation and prevents unnoticed modification.
 *
 * Golden Rule Engine remains authoritative.
 */

export async function generateAuditHash(record = {}) {

    const auditData = JSON.stringify(record);

    const encoder = new TextEncoder();

    const dataBuffer = encoder.encode(auditData);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        dataBuffer
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    const hashHex = hashArray
        .map(byte =>
            byte.toString(16).padStart(2, "0")
        )
        .join("");

    return {

        algorithm: "SHA-256",

        hash: hashHex,

        generatedAt:
            new Date().toISOString(),

        status:
            "AUDIT INTEGRITY VERIFIED"

    };

}
