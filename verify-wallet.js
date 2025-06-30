import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import fs from 'fs';

const verifyWallet = async () => {
  try {
    console.log('🔍 Verifying wallet...');

    // Read the secret key from the file
    const walletData = JSON.parse(fs.readFileSync('./keypair.json', 'utf-8'));
    const secretKey = new Uint8Array(walletData);

    // Derive the keypair from the secret key using @solana/web3.js
    const keypair = Keypair.fromSecretKey(secretKey);
    const publicKey = keypair.publicKey;

    console.log(`✅ Wallet Address (Public Key): ${publicKey.toBase58()}`);

    // Connect to Solana Mainnet
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    console.log('📡 Connected to Solana Mainnet.');

    // Fetch the balance
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(`\n--- Wallet Status ---`);
    console.log(`💰 Balance: ${balanceInSol} SOL`);

    if (balanceInSol > 0) {
      console.log(`✅ Wallet is active and funded.`);
    } else {
      console.log(`❌ Wallet has a zero balance. Please fund it before proceeding.`);
    }
    console.log(`---------------------`);

  } catch (error) {
    console.error('❌ Error verifying wallet:', error.message);
  }
};

verifyWallet(); 