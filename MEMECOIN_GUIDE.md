# Sonko Coin Memecoin Creation Guide

Welcome to the Sonko Coin memecoin creation guide! This document will walk you through the entire process, from setup to minting your token on Solana.

---

## Prerequisites

- Node.js and Yarn installed
- Some SOL in your wallet (for fees)
- Your image file (`image.jpg`) in the project directory

---

## Step 1: Upload Your Image to Arweave

- The script uploads `image.jpg` to Arweave using the Irys uploader.
- This step costs a small amount of SOL.
- The script will print the Arweave URL for your image.

**What happens in code:**
```js
const imageUri = await uploadImage();
```

---

## Step 2: Upload Metadata to Arweave

- The script creates a metadata JSON with your coin's name, symbol, description, image, and Twitter.
- It uploads this JSON to Arweave.
- The script will print the Arweave URL for your metadata.

**What happens in code:**
```js
const metadataUri = await uploadMetadata(imageUri);
```

---

## Step 3: Mint Your Memecoin on Solana

- The script mints your token using the uploaded metadata.
- It sets the supply, decimals, and disables mint/freeze authorities for safety.
- The script will print the Solana transaction and token addresses.

**What happens in code:**
```js
await mintToken(imageUri, metadataUri);
```

---

## Step 4: Next Steps (Optional)

- Add liquidity to a DEX (Raydium, Orca, etc.)
- List your token on aggregators (DexScreener, CoinGecko, etc.)
- Market your coin!

---

## To Run the Full Process

```sh
yarn start
```

---

## Troubleshooting

- If you encounter any missing dependency errors, install the required package and re-run the script.
- Make sure your wallet has enough SOL to cover all transaction fees.

---

Good luck, and may your memecoin moon! 🚀 