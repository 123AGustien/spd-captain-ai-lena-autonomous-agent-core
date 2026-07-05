export function OBSERVE(input) {
  return {
    FX: input.includes("FX") ? 1 : 0,
    ENERGY: input.includes("ENERGY") ? 1 : 0,
    CYB: input.includes("CYB") ? 1 : 0,
    INF: input.includes("INF") ? 1 : 0
  };
}