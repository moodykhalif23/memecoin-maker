// This file provides a compatibility layer for @irys/sdk which expects a default export from csv-parse
import * as csvParse from 'csv-parse';

// Export the parse function as default
export default csvParse.parse;

// Also export all named exports from csv-parse
export * from 'csv-parse';
