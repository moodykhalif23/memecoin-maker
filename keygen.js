// Run this to create keypair.json
// yarn keygen

import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

// Generate a new keypair
const keypair = Keypair.generate();

console.log('Generated new wallet:');
console.log('Public Key:', keypair.publicKey.toString());
console.log('Private Key:', Buffer.from(keypair.secretKey).toString('base64'));

// Save the keypair to file
fs.writeFileSync(
  'keypair.json',
  JSON.stringify(Array.from(keypair.secretKey))
);

console.log('\nWallet saved to keypair.json');
console.log('IMPORTANT: Keep your private key safe and never share it!');
console.log('You will need to fund this wallet with SOL before creating your memecoin.');
