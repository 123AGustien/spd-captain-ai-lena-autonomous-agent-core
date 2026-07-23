export function getDecisionValidationSummary() {

  const report =
    runDecisionValidation();

  return {

    status:
      report.status,

    totalTests:
      report.totalTests,

    passed:
      report.passed,

    failed:
      report.failed,

    timestamp:
      report.timestamp

  };

}