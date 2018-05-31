export const enforcePromiseDelay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));
