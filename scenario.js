export function scenarioEngine(event) {

  if (!event) {
    return "NORMAL";
  }

  switch (event) {
    case "FX_SHOCK":
      return "FX SHOCK SCENARIO";

    case "ENERGY_SPIKE":
      return "ENERGY SPIKE SCENARIO";

    case "CYBER_EVENT":
      return "CYBER EVENT SCENARIO";

    case "INFRASTRUCTURE_STRESS":
      return "INFRASTRUCTURE STRESS SCENARIO";

    case "BIODIESEL_SHORTAGE":
      return "BIODIESEL SHORTAGE SCENARIO";

    case "NORMAL":
      return "NORMAL";

    default:
      return "UNKNOWN SCENARIO";
  }
}