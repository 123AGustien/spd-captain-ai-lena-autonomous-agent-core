import { state } from "../state.js";

export function UPDATE(input) {
  state.lastInput = input;
  state.cycleCount += 1;

  console.log("🧠 STATE UPDATE:", state);
}