import { captainAILena } from "./captainAILena.js";

export function runEngine(state) {
  const result = captainAILena(state);

  return {
    timestamp: new Date().toISOString(),
    input: state,
    output: result,
    status: "EXECUTED"
  };
}
