# FIN Domain Rule Registry

## Purpose

The FIN Domain Rule Registry connects the SPD v13.1 Sextant Resilience Cockpit Pro to the Financial Resilience Rule Library.

It allows Captain AI Lena to:

1. Select the FIN domain.
2. Select a specific FIN rule.
3. Load the rule-specific scenario.
4. Apply the rule-specific assessment logic.
5. Generate the appropriate decision and recommended action.
6. Pass the result through the SPD Golden Rule Engine.
7. Record the FIN Rule ID in the audit trail.

## FIN Domain

```js
const FIN_DOMAIN = {
  id: "FIN",
  name: "Financial Resilience",
  description:
    "Financial system stress, liquidity, foreign exchange, banking stability, and financial contagion resilience.",
  status: "ACTIVE"
};