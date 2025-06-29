// This file provides a compatibility layer for @irys/sdk which expects a default export from csv-stringify
import * as csvStringify from 'csv-stringify';

// Export the stringify function as default
export default csvStringify.stringify;

// Also export all named exports from csv-stringify
export * from 'csv-stringify';
