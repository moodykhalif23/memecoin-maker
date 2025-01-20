// Run this to create keypair.json
// yarn keygen

import { Keypair } from '@solana/web3.js';
import base58 from "bs58";
import * as fs from 'fs';

// Fill with your private key & public key
const PRIVATE_KEY = "<your private key>";
const PUBLIC_KEY = "<your wallet address>";
const secret = base58.decode(PRIVATE_KEY);

const pair = Keypair.fromSecretKey(secret);

if (pair.publicKey.toString() == PUBLIC_KEY) {
  fs.writeFileSync(
    'keypair.json',
    JSON.stringify(Array.from(secret))
  );
}
