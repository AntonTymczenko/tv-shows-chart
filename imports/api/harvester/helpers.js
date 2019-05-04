export const worstResult = results =>
  results.reduce((acc, r) => r.status > acc.status ? r : acc, results[0])
