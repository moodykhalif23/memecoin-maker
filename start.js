// This is a wrapper to handle the CSV parse issue
import { register } from 'node:module';

// Register a custom module loader that will intercept csv-parse imports
register('./csv-parse-resolver.mjs', import.meta.url);

// Now import the main file
import './index.js';
