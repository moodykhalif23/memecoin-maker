import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import fs from 'fs';

const fundWallet = async () => {
  try {
    // Read the keypair
    const walletFile = fs.readFileSync('./keypair.json');
    const secretKey = new Uint8Array(JSON.parse(walletFile));
    
    // Create connection to devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // Create public key from secret key
    const { Keypair } = await import('@solana/web3.js');
    const keypair = Keypair.fromSecretKey(secretKey);
    
    console.log(`Wallet address: ${keypair.publicKey.toString()}`);
    
    // Check current balance
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    
    if (balance > 0) {
      console.log('✅ Wallet already has SOL!');
      return;
    }
    
    // Request airdrop
    console.log('Requesting 2 SOL airdrop from devnet...');
    const signature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    
    await connection.confirmTransaction(signature, 'confirmed');
    
    // Check new balance
    const newBalance = await connection.getBalance(keypair.publicKey);
    console.log(`✅ Airdrop successful! New balance: ${newBalance / LAMPORTS_PER_SOL} SOL`);
    
  } catch (error) {
    console.error('❌ Error funding wallet:', error);
  }
};

fundWallet(); 