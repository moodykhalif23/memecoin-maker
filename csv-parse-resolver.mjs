// Custom module resolver for csv modules

export function resolve(specifier, context, nextResolve) {
  // If the import is for csv-parse, redirect it to our shim
  if (specifier === 'csv-parse') {
    return {
      shortCircuit: true,
      url: new URL('./csv-parse-shim.js', import.meta.url).href,
    };
  }
  
  // If the import is for csv-stringify, redirect it to our shim
  if (specifier === 'csv-stringify') {
    return {
      shortCircuit: true,
      url: new URL('./csv-stringify-shim.js', import.meta.url).href,
    };
  }

  // For all other imports, continue with the default resolution process
  return nextResolve(specifier, context);
}
