import {
  createFungible,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  AuthorityType,
  createTokenIfMissing,
  findAssociatedTokenPda,
  getSplAssociatedTokenProgramId,
  mintTokensTo,
  setAuthority,
  setComputeUnitPrice,
} from '@metaplex-foundation/mpl-toolbox'
import {
  generateSigner,
  percentAmount,
  keypairIdentity,
  transactionBuilder,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'

const coinName = "sonko coin";
const coinSymbol = "scn";

// Upload 'image.jpg' to Arweave.
const uploadImage = async () => {
  const umi = loadUmi();

  console.log("Uploading image to Arweave");
  const imageFile = fs.readFileSync("./image.jpg");
  console.log("Upload price", await umi.uploader.getUploadPrice([imageFile]));
  const imageUris = await umi.uploader.upload([imageFile]);
  console.log(imageUris);
  return imageUris[0];
};

// Upload metadata to Arweave.
const uploadMetadata = async (imageUri) => {
  const umi = loadUmi();

  const metadata = {
    name: coinName,
    symbol: coinSymbol,
    description: "The ultimate memecoin for the sonko community! Join the revolution and ride the wave to the moon! 🚀",
    image: imageUri,
    "twitter": "https://x.com/LYNGrind",
  };
  console.log("Uploading metadata to Arweave");
  const uri = await umi.uploader.uploadJson(metadata).catch((err) => {
    throw new Error(err);
  });
  console.log(uri);
  return uri;
};

const mintToken = async (imageUri, metadataUri) => {
  const umi = loadUmi();

  // Mint the token.
  let numDecimals = 6;
  const totalSupply = 1000000 * Math.pow(10, numDecimals);

  const mintSigner = generateSigner(umi);
  const createFungibleIx = createFungible(umi, {
    mint: mintSigner,
    name: coinName,
    symbol: coinSymbol,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: numDecimals,
    isMutable: 0,
  });

  // This instruction will create a new Token Account if required, if one is found then it skips.
  const createTokenIx = createTokenIfMissing(umi, {
    mint: mintSigner.publicKey,
    owner: umi.identity.publicKey,
    ataProgram: getSplAssociatedTokenProgramId(umi),
  });

  // The final instruction (if required) is to mint the tokens to the token account in the previous ix.
  const mintTokensIx = mintTokensTo(umi, {
    mint: mintSigner.publicKey,
    token: findAssociatedTokenPda(umi, {
      mint: mintSigner.publicKey,
      owner: umi.identity.publicKey,
    }),
    amount: BigInt(totalSupply),
  });

  // The last step is to send the ix's off in a transaction to the chain.
  console.log("Sending transaction")
  const tx = await
    transactionBuilder()
      .add(setComputeUnitPrice(umi, { microLamports: 1000000 }))
      .add(createFungibleIx)
      .add(createTokenIx)
      .add(mintTokensIx)
      .add(setAuthority(umi, {
        owned: mintSigner.publicKey,
        owner: umi.identity.publicKey,
        authorityType: AuthorityType.MintTokens,
        newAuthority: null
      }))
      .add(setAuthority(umi, {
        owned: mintSigner.publicKey,
        owner: umi.identity.publicKey,
        authorityType: AuthorityType.FreezeAccount,
        newAuthority: null
      }))
      .sendAndConfirm(umi);

  const signature = base58.deserialize(tx.signature)[0];
  console.log('\nTransaction Complete')
  console.log('View Transaction on Solana Explorer')
  console.log(`https://solscan.io/tx/${signature}`)
  console.log('View Token on Solana Explorer')
  console.log(`https://solscan.io/token/${mintSigner.publicKey}`)
};

const loadUmi = () => {
  const umi = createUmi('https://api.mainnet-beta.solana.com')
    .use(mplTokenMetadata())
    .use(irysUploader())

  const walletFile = fs.readFileSync('./keypair.json')
  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(
    JSON.parse(walletFile)));
  umi.use(keypairIdentity(keypair));
  console.log("Using wallet", umi.identity.publicKey);
  return umi;
};

// Step 4: (optional) Deploy liquidity to Meteora.ag. (costs .25 SOL / $50-100 depending on range)
// Step 5: (optional) Update token info on sites like https://marketplace.dexscreener.com/product/token-info. (costs $300)

// Main execution function
const main = async () => {
  try {
    console.log('🚀 Starting Sonko Coin Creation Process...\n');
    
    // Step 1: Upload image (costs 0.00001 SOL / $0.01)
    console.log('📸 Step 1: Uploading image to Arweave...');
    const imageUri = await uploadImage();
    console.log('✅ Image uploaded successfully!\n');
    
    // Step 2: Upload metadata (costs 0.00001 SOL / $0.01)
    console.log('📝 Step 2: Uploading metadata to Arweave...');
    const metadataUri = await uploadMetadata(imageUri);
    console.log('✅ Metadata uploaded successfully!\n');
    
    // Step 3: Mint token (costs 0.02 SOL / $5)
    console.log('🪙 Step 3: Minting Sonko Coin...');
    await mintToken(imageUri, metadataUri);
    console.log('✅ Sonko Coin minted successfully!\n');
    
    console.log('🎉 CONGRATULATIONS! Your Sonko Coin has been created successfully!');
    console.log('📊 Next steps:');
    console.log('   - Add liquidity to DEX (like Raydium, Orca)');
    console.log('   - List on token aggregators');
    console.log('   - Market your coin on social media');
    
  } catch (error) {
    console.error('❌ Error during memecoin creation:', error);
  }
};

// Run the main function
main();
