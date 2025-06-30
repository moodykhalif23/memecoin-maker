# Solana Memecoin Maker

This project allows you to create and mint a new SPL (token) on the Solana blockchain, complete with an image and metadata uploaded to Arweave.

---

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project and create your memecoin.

### Step 1: Installation

Clone the repository and install the required dependencies.

```bash
git clone https://github.com/moodykhalif23/memecoin-maker.git
cd memecoin-maker
yarn install
```

### Step 2: Create a Wallet

You need a Solana wallet to pay for transactions. This command creates a `keypair.json` file in your project directory, which will act as your wallet.

**Important:** This file contains your private key. Keep it secure and do not commit it to version control. The `.gitignore` file is already configured to ignore it.

```bash
yarn keygen
```

### Step 3: Fund Your Wallet

The wallet needs to be funded with SOL to pay for the fees on the Solana mainnet.

1.  **Get your wallet address:** The `yarn keygen` command will print your public wallet address.
2.  **Send SOL:** Transfer a small amount of SOL (e.g., **0.05 SOL**) to this address from an exchange or another wallet.

### Step 4: Verify Your Wallet

Before creating the coin, verify that your wallet is funded and active on the mainnet.

```bash
yarn verify
```

This command will display your wallet's address and its current SOL balance.

### Step 5: Customize Your Coin

1.  **Image:** Replace the `image.jpg` file in the project directory with your own image.
2.  **Metadata:** Open `index.js` and edit the `coinName`, `coinSymbol`, and other metadata fields to match your project.

### Step 6: Create the Memecoin

Once your wallet is funded and your assets are customized, run the creation script. This single command handles everything: uploading the image, uploading the metadata, and minting the token.

```bash
yarn start
```

If successful, the script will print the transaction signature and links to view your new token on the Solana explorer.

Congratulations! You've created your own memecoin on Solana.
