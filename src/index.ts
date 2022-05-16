import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout } from '@solana/spl-token';
import { Program, AnchorProvider, BN, web3 } from '@project-serum/anchor';
import * as meta from '@metaplex/js';
import { NodeWallet } from '@metaplex/js';

// --------- SOLANA TOOLS -----------------------------------------
export const ACCOUNT_DISCRIMINATOR_SIZE = 8;
export const SIZE_PUBKEY = 32;
export const SIZE_VEC = 8;
export const SIZE_U8 = 1;
export const SIZE_U16 = 2;
export const SIZE_U32 = 4;
export const SIZE_U64 = 8;
export const SIZE_U128 = 16;
export const SIZE_STRING = 64;

export const SPL_MINT_SPACE = 82;

export const SolanaDefaultCommitment = 'processed';
export const SolanaClusterDevnet = web3.clusterApiUrl('devnet');
export const SolanaClusterMainnet = web3.clusterApiUrl('mainnet-beta');
export const SolanaClusterLocalnet = 'http://localhost:8899';
export const SolanaConnectionDevnet = new web3.Connection(SolanaClusterDevnet, SolanaDefaultCommitment);
export const SolanaConnectionMainnet = new web3.Connection(SolanaClusterMainnet, SolanaDefaultCommitment);

export const TestStartString = '🚀 Starting test...';
export const TestEndString = '... to the moon! 🌑';

export enum SolanaCluster {
  localhost,
  devnet,
  mainnet,
}

export const clusterToConnection = (
  cluster: SolanaCluster = SolanaCluster.mainnet,
  commitmentOrConfig: web3.Commitment | web3.ConnectionConfig = SolanaDefaultCommitment,
) => {
  switch (cluster) {
    case SolanaCluster.localhost:
      return new web3.Connection(SolanaClusterLocalnet, commitmentOrConfig);
    case SolanaCluster.devnet:
      return new web3.Connection(SolanaClusterDevnet, commitmentOrConfig);
    case SolanaCluster.mainnet:
      return new web3.Connection(SolanaClusterDevnet, commitmentOrConfig);
    default:
      return SolanaConnectionDevnet;
  }
};

export const runInSandbox = async (code: any) => {
  try {
    await code();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

/**
 * pass in fullpath to keypair /Home/.config/solana/program/test.json
 */
export const initSolanaProviderFromLocalKeypair = (
  fullpath: string,
  cluster: SolanaCluster = SolanaCluster.mainnet,
  commitmentOrConfig: web3.Commitment | web3.ConnectionConfig = SolanaDefaultCommitment,
  opts: web3.ConfirmOptions = { commitment: SolanaDefaultCommitment },
) => {
  const secretArray = require(fullpath);
  const secret = new Uint8Array(secretArray);
  const payerKeypair = web3.Keypair.fromSecretKey(secret);
  return initSolanaProvider(new NodeWallet(payerKeypair), cluster, commitmentOrConfig, opts);
};

/**
 * For web-based wallets only
 */
export const connectWallet = (onlyIfTrusted?: boolean) => {
  return new Promise<web3.PublicKey>(async (resolve, reject) => {
    try {
      const { solana } = window as any;
      if (solana) {
        if (solana.isPhantom) {
          try {
            solana
              .connect({ onlyIfTrusted })
              .then((result: any) => {
                resolve(new web3.PublicKey(result.publicKey.toString()));
              })
              .catch((error: any) => {
                reject(`Error ${error}`);
              });
          } catch (error) {
            reject(`Error re-connecting to phantom. ${error}`);
          }
        }
      } else {
        reject('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * For web-based wallets only
 */
export const getSolanaWallet = () => {
  const { solana } = window as any;
  return solana;
};

/**
 * Creates a provider to pass into contract functions
 */
export const initSolanaProvider = (
  wallet: any = getSolanaWallet(),
  cluster: SolanaCluster = SolanaCluster.mainnet,
  commitmentOrConfig: web3.Commitment | web3.ConnectionConfig = SolanaDefaultCommitment,
  opts: web3.ConfirmOptions = { commitment: SolanaDefaultCommitment },
) => {
  return new AnchorProvider(clusterToConnection(cluster, commitmentOrConfig), wallet, opts);
};

/**
 * @deprecated The method should not be used, use initSolanaProvider instead
 */
export const getSolanaProvider = (wallet: any, isDevnet: boolean = true) => {
  return new AnchorProvider(isDevnet ? SolanaConnectionDevnet : SolanaConnectionMainnet, wallet, {
    commitment: SolanaDefaultCommitment,
  });
};

export const createTestProvider = async (
  masterProvider: AnchorProvider,
  cluster: SolanaCluster = SolanaCluster.localhost,
  lamportsToStart: number = web3.LAMPORTS_PER_SOL,
  testKeypair: web3.Keypair = web3.Keypair.generate(),
) => {
  if (cluster === SolanaCluster.mainnet) {
    throw new Error('Not for mainnet');
  }

  const provider = initSolanaProvider(new NodeWallet(testKeypair), cluster);

  switch (cluster) {
    case SolanaCluster.devnet:
      await masterProvider.connection.requestAirdrop(provider.wallet.publicKey, lamportsToStart);
      break;
    case SolanaCluster.localhost:
      await txSOL(masterProvider, provider.wallet.publicKey, lamportsToStart);
  }

  return provider;
};

export const getProgram = async (provider: AnchorProvider, programID: web3.PublicKey) => {
  const idl = await Program.fetchIdl(programID, provider);
  return new Program(idl as any, programID, provider);
};

export const dateToSolanaDate = (date: Date) => {
  return new BN(Math.floor(date.getTime() / 1000));
};

export const getRent = (provider: AnchorProvider, size: number) => {
  return provider.connection.getMinimumBalanceForRentExemption(size);
};

// --------- SPL TOOLS -----------------------------------------
export const burnSPL = async (
  provider: AnchorProvider,
  mint: web3.PublicKey,
  amount: BN,
  vault?: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  const ata = vault ?? (await getAssociatedTokenAddress(mint, provider.wallet.publicKey, allowOffCurve ?? false));
  const tx = new web3.Transaction();

  tx.add(Token.createBurnInstruction(TOKEN_PROGRAM_ID, mint, ata, provider.wallet.publicKey, [], amount));

  await provider.sendAndConfirm(tx);
};

export const closeSPLAccount = async (
  provider: AnchorProvider,
  mint: web3.PublicKey,
  vault?: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  const ata = vault ?? (await getAssociatedTokenAddress(mint, provider.wallet.publicKey, allowOffCurve ?? false));
  const tx = new web3.Transaction();

  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      ata,
      provider.wallet.publicKey,
      provider.wallet.publicKey,
      [],
    ),
  );

  return await provider.sendAndConfirm(tx);
};

export const burnFullToken = async (
  provider: AnchorProvider,
  mint: web3.PublicKey,
  vault?: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  const token = await getSPLAccount(provider, mint, vault, allowOffCurve);

  const tx = new web3.Transaction();
  if (!token.amount.eq(new BN(0))) {
    tx.add(
      Token.createBurnInstruction(
        TOKEN_PROGRAM_ID,
        token.mint,
        token.address,
        provider.wallet.publicKey,
        [],
        token.amount,
      ),
    );
  }

  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      token.address,
      provider.wallet.publicKey,
      provider.wallet.publicKey,
      [],
    ),
  );

  return await provider.sendAndConfirm(tx);
};

export const getSPLAccount = async (
  provider: AnchorProvider,
  mint: web3.PublicKey,
  vault?: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  const ata = vault ?? (await getAssociatedTokenAddress(mint, provider.wallet.publicKey, allowOffCurve ?? false));
  return new Token(provider.connection, mint, TOKEN_PROGRAM_ID, web3.Keypair.generate()).getAccountInfo(ata);
};

export const getAssociatedTokenAddress = async (
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  return Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, owner, allowOffCurve);
};
export const getAssociatedTokenAddressAndShouldCreate = async (
  provider: AnchorProvider,
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  allowOffCurve?: boolean,
) => {
  const vault = await getAssociatedTokenAddress(mint, owner, allowOffCurve);
  let shouldCreate = false;
  try {
    await getSPLAccount(provider, mint, vault);
  } catch (e) {
    shouldCreate = true;
  }

  return { vault, shouldCreate };
};

export const txSOL = async (
  provider: AnchorProvider,
  to: web3.PublicKey,
  amount: number = web3.LAMPORTS_PER_SOL / 100,
) => {
  const tx = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: provider.wallet.publicKey,
      toPubkey: to,
      lamports: amount,
    }),
  );

  await provider.sendAndConfirm(tx);

  return await provider.connection.getAccountInfo(to);
};

export const txSPL = async (provider: AnchorProvider, mint: web3.PublicKey, to: web3.PublicKey, amount: number = 1) => {
  const tx = new web3.Transaction();
  const owner = provider.wallet.publicKey;
  const ownerVault = await getAssociatedTokenAddress(mint, owner);
  const { vault, shouldCreate } = await getAssociatedTokenAddressAndShouldCreate(provider, mint, to);

  if (shouldCreate) {
    tx.add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        vault,
        to,
        owner,
      ),
    );
  }

  tx.add(Token.createTransferInstruction(TOKEN_PROGRAM_ID, ownerVault, vault, owner, [], amount));

  await provider.sendAndConfirm(tx);

  return await getSPLAccount(provider, mint, vault);
};

export const createSPL = async (
  provider: AnchorProvider,
  amount: number = 100000,
  decimals?: number,
  disableAfterMint?: boolean,
  newMintKeypair?: web3.Keypair,
) => {
  const mintKeypair = newMintKeypair ?? web3.Keypair.generate();
  const mint = mintKeypair.publicKey;
  const owner = provider.wallet.publicKey;
  const vault = await getAssociatedTokenAddress(mint, owner);

  const tx = new web3.Transaction();

  // Create the Account
  tx.add(
    web3.SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: mint,
      lamports: await Token.getMinBalanceRentForExemptMint(provider.connection),
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  // Create the Mint
  tx.add(Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint, decimals ?? 0, owner, owner));

  // Create Associated Account
  tx.add(
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      vault,
      owner,
      owner,
    ),
  );

  // Mint
  tx.add(Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint, vault, owner, [], amount));

  await provider.sendAndConfirm(tx, [mintKeypair]);

  // Disable
  if (disableAfterMint) {
    await disableSPLMint(provider, mint);
  }

  return await getSPLAccount(provider, mint, vault);
};

export const disableSPLMint = async (provider: AnchorProvider, mint: web3.PublicKey) => {
  const owner = provider.wallet.publicKey;
  const vault = await getAssociatedTokenAddress(mint, owner);

  const tx = new web3.Transaction();

  tx.add(Token.createSetAuthorityInstruction(TOKEN_PROGRAM_ID, mint, null, 'MintTokens', owner, []));

  await provider.sendAndConfirm(tx);
};

// --------- SFT HELPERS -----------------------------------------
// Phantom SFT Notes: https://docs.phantom.app/integrating/tokens/non-fungible-tokens
// Metaplex Notes: https://docs.metaplex.com/token-metadata/specification
// More metadata Notes: https://medium.com/metaplex/metaplex-metadata-standard-45af3d04b541
export enum MetaFileType {
  png = 'image/png',
  jpeg = 'image/jpeg',
  glb = 'application/octet-stream',
}
export enum MetaCatagoryType {
  image = 'image',
  vr = 'vr',
}
export interface MetaCollectionStruct {
  name: string; // Name of the immediate collection --- "V0",
  family: string; // Name of the encompassing collection --- "Sol-Treasure"
}
export interface MetaAttributeStruct {
  trait_type: string; // The type. --- "Color"
  value: string; // The value. --- "Blue"
}
export interface MetaPropertiesStruct {
  files: MetaFileStruct[];
  category: MetaCatagoryType | string;
  creators: MetaCreatorStruct[];
}
export interface MetaFileStruct {
  uri: string; // URL to file, make sure to have 'ext=png' or simular at the end --- "https://soltreasure.s3.amazonaws.com/desolates/Trees/tree_8.png?ext=png"
  type: MetaFileType | string; // Type of the file
}
export interface MetaCreatorStruct {
  address: string; // Public Key string --- "HAzgWmFC2TGw1Ry6C3h2i2eAnnbrD91wDremBSxXBgCB"
  share: number; // Percent share: 1-100, all combined creators need to total 100% --- "100"
}
export interface MetadataStruct {
  name: string; // Name of the SFT --- "Blue SFKey"
  symbol: string; // Short name of SFT (Needs to be the same across a collection) --- "ST"
  description: string; // Short discription of the SFT --- "Unlocks the blue lock"
  image: string; // Fallback image url to display, make sure to have 'ext=png' --- "https://soltreasure.s3.amazonaws.com/desolates/Trees/tree_8.png?ext=png"
  animation_url?: string; // URL for animation --- "https://soltreasure.s3.amazonaws.com/desolates/Treasure/sol_treasure.glb?ext=glb",
  external_url: string; // a nice url link for promotion/linking --- "https://sol-treasure.io"
  sellerFeeBasisPoints?: number; // 100 = 1% --- 0
  attributes: MetaAttributeStruct[];
  properties: MetaPropertiesStruct;
  collection: MetaCollectionStruct;
}

export interface SFTCollectionData {
  owner: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collectionMetadata: web3.PublicKey;
  collectionMasterEdition: web3.PublicKey;
}

export interface SFTData {
  vault: web3.PublicKey;
  owner: web3.PublicKey;
  mint: web3.PublicKey;
  metadata: web3.PublicKey;
  collectionData: SFTCollectionData;
}

export const jsonToMetadata = (metadata: string) => {
  return JSON.parse(metadata) as MetadataStruct;
};
export const metadataToJson = (metadata: MetadataStruct) => {
  return JSON.stringify(metadata);
};
export const objToMetadata = (metadata: any) => {
  return metadata as MetadataStruct;
};

export const TEST_SPL_URL: string = 'https://soltreasure.s3.amazonaws.com/desolates/Puzzle/puzzle_clue_1.json';
export const TEST_SPL_METADATA: MetadataStruct = {
  name: 'DESOLATEs Puzzle Clue 1',
  description: 'I like logic puzzles!',
  sellerFeeBasisPoints: 0,
  symbol: 'ST-S0',
  collection: {
    name: 'Supernova 0',
    family: 'Sol-Treasure',
  },
  image: 'https://soltreasure.s3.amazonaws.com/desolates/Puzzle/puzzle_clue_1.png?ext=png',
  attributes: [
    {
      trait_type: 'Clue',
      value:
        '1. Each RED nibble is equal to the number of trees if GREEN is 0x22 more than BLUE, else, each RED nibble is equal to the number of chests.',
    },
  ],
  external_url: 'https://twitter.com/CoachChuckFF',
  properties: {
    files: [
      {
        uri: 'https://soltreasure.s3.amazonaws.com/desolates/Puzzle/puzzle_clue_1.png?ext=png',
        type: 'image/png',
      },
    ],
    category: 'image',
    creators: [
      {
        address: 'HAzgWmFC2TGw1Ry6C3h2i2eAnnbrD91wDremBSxXBgCB',
        share: 10,
      },
    ],
  },
};

export const getMetadataMasterKey = async (mint: web3.PublicKey) => {
  return (await meta.programs.metadata.MetadataProgram.findMasterEditionAccount(mint))[0];
};

export const getMetadataKey = async (mint: web3.PublicKey) => {
  return (await meta.programs.metadata.MetadataProgram.findMetadataAccount(mint))[0];
};

export const getMetadataAccount = async (provider: AnchorProvider, mint: web3.PublicKey) => {
  return await meta.programs.metadata.MetadataData.deserialize(
    (
      await provider.connection.getAccountInfo(await getMetadataKey(mint))
    ).data,
  );
};

export const getMetadataMasterAccount = async (provider: AnchorProvider, mint: web3.PublicKey) => {
  return await meta.programs.metadata.EditionData.deserialize(
    (
      await provider.connection.getAccountInfo(await getMetadataMasterKey(mint))
    ).data,
  );
};

export const getCollectionData = async (provider: AnchorProvider, mint: web3.PublicKey) => {
  return {
    owner: provider.wallet.publicKey,
    collectionMint: mint,
    collectionMetadata: await getMetadataKey(mint),
    collectionMasterEdition: await getMetadataMasterKey(mint),
  } as SFTCollectionData;
};

export const getSFTData = async (provider: AnchorProvider, mint: web3.PublicKey, collectionMint?: web3.PublicKey) => {
  let metadataAccount = {} as any;
  if (!collectionMint) {
    metadataAccount = await getMetadataAccount(provider, mint);
  }

  const collection = collectionMint ?? new web3.PublicKey(metadataAccount.collection.key);
  return {
    owner: provider.wallet.publicKey,
    vault: await getAssociatedTokenAddress(mint, provider.wallet.publicKey),
    mint,
    metadata: await getMetadataKey(mint),
    collectionData: await getCollectionData(provider, collection),
  } as SFTData;
};

export const createSFTCollection = async (provider: AnchorProvider, symbol?: string, sellerFeeBasisPoints?: number) => {
  const owner = provider.wallet.publicKey;

  const collectionSPL = await createSPL(provider, 1);

  const data = new meta.programs.metadata.DataV2({
    symbol: symbol ?? '',
    name: 'Collection NFT',
    uri: '',
    sellerFeeBasisPoints: sellerFeeBasisPoints ?? 0,
    creators: [
      new meta.programs.metadata.Creator({
        address: owner.toString(),
        verified: true,
        share: 100,
      }),
    ],
    collection: null,
    uses: null,
  });

  const tx = new web3.Transaction();

  const collectionMetadataKey = await getMetadataKey(collectionSPL.mint);
  tx.add(
    ...new meta.programs.metadata.CreateMetadataV2(
      { feePayer: owner },
      {
        metadata: collectionMetadataKey,
        metadataData: data,
        updateAuthority: owner,
        mint: collectionSPL.mint,
        mintAuthority: owner,
      },
    ).instructions,
  );

  const masterEditionPubkey = await getMetadataMasterKey(collectionSPL.mint);
  tx.add(
    ...new meta.programs.metadata.CreateMasterEditionV3(
      { feePayer: owner },
      {
        edition: masterEditionPubkey,
        metadata: collectionMetadataKey,
        mint: collectionSPL.mint,
        mintAuthority: owner,
        updateAuthority: owner,
        maxSupply: new BN(0),
      },
    ).instructions,
  );

  await provider.sendAndConfirm(tx);

  return await getCollectionData(provider, collectionSPL.mint);
};

export const createSFT = async (
  provider: AnchorProvider,
  metadataURI: string,
  metadata: MetadataStruct | string,
  amount: BN,
  existingCollection?: SFTCollectionData,
) => {
  const owner = provider.wallet.publicKey;

  // Grab the Metadata structs
  let metadataStruct = {} as MetadataStruct;
  if ((metadata as MetadataStruct).name) {
    metadataStruct = objToMetadata(metadata);
  } else {
    metadataStruct = jsonToMetadata(metadata as string);
  }

  // Create the SPL
  const splToken = await createSPL(provider, amount.toNumber());

  // Get the Collection
  let collectionData = {} as SFTCollectionData;
  if (!existingCollection) {
    collectionData = await createSFTCollection(provider, metadataStruct.symbol, metadataStruct.sellerFeeBasisPoints);
  }
  const collectionMetadata = await getMetadataAccount(provider, collectionData.collectionMint);

  if (collectionMetadata.data.symbol !== metadataStruct.symbol) {
    throw new Error('Collection Symbol does not match...');
  }
  if (collectionMetadata.data.sellerFeeBasisPoints !== metadataStruct.sellerFeeBasisPoints ?? 0) {
    throw new Error('Collection seller points do not match...');
  }

  const collection = new meta.programs.metadata.Collection({
    key: collectionData.collectionMint.toString(),
    verified: false,
  });

  // Build the creators feild
  const creators = [] as meta.programs.metadata.Creator[];
  let shareTally = 0;
  let hasOwner = false;
  for (const creator of metadataStruct.properties.creators) {
    creators.push(
      new meta.programs.metadata.Creator({
        address: creator.address,
        share: creator.share,
        verified: false,
      }),
    );

    if (creator.address === owner.toString()) {
      hasOwner = true;
    }
    shareTally += creator.share;
  }

  if (!hasOwner) {
    creators.push(
      new meta.programs.metadata.Creator({
        address: owner.toString(),
        share: 100 - shareTally,
        verified: true,
      }),
    );
  }

  // Build the data
  const metadataData = await new meta.programs.metadata.DataV2({
    name: metadataStruct.name,
    symbol: metadataStruct.symbol,
    uri: metadataURI,
    sellerFeeBasisPoints: metadataStruct.sellerFeeBasisPoints ?? 0,
    creators,
    collection,
    uses: null,
  });

  // Build the metadata key
  const metadataKey = await getMetadataKey(splToken.mint);

  // Build the transaction
  const createMetaTx = new meta.programs.metadata.CreateMetadataV2(
    { feePayer: owner },
    {
      metadata: metadataKey,
      metadataData,
      updateAuthority: owner,
      mint: splToken.mint,
      mintAuthority: owner,
    },
  );

  await provider.sendAndConfirm(createMetaTx);

  // Verify Collection
  const verifyCollectionTx = new meta.programs.metadata.VerifyCollection(
    { feePayer: owner },
    {
      metadata: metadataKey,
      collectionAuthority: owner,
      collectionMint: collectionData.collectionMint,
      collectionMetadata: collectionData.collectionMetadata,
      collectionMasterEdition: collectionData.collectionMasterEdition,
    },
  );
  await provider.sendAndConfirm(verifyCollectionTx);

  const signMetadataTX = new meta.programs.metadata.SignMetadata(
    { feePayer: owner },
    {
      metadata: metadataKey,
      creator: owner,
    },
  );
  await provider.sendAndConfirm(signMetadataTX);

  await getMetadataAccount(provider, splToken.mint);

  return await getSFTData(provider, splToken.mint, collectionData.collectionMint);

  // console.log("--------- SAVE THE FOLLOWING --------------\n");
  // console.log(`SFT Mint:         ${SFTData.mint}`);
  // console.log(`SFT Vault:        ${SFTData.vault}`);
  // console.log(`Collection Mint:  ${SFTData.collectionData.collectionMint}`);
  // console.log("\n-------------------------------------------\n");
};

// export const uploadSFTAsset = async(

// ) => {
//     // meta.programs.metadata.
// }

export const updateSFT = async (
  provider: AnchorProvider,
  sftMint: web3.PublicKey,
  metadata: MetadataStruct | string,
  primarySaleHappened?: boolean,
  isMutable?: boolean,
  newMetadataURI?: string,
  newUpdateAuthority?: web3.PublicKey,
) => {
  const owner = await provider.wallet.publicKey;
  const sft = await getSFTData(provider, sftMint);
  const metadataAccount = await getMetadataAccount(provider, sftMint);

  // Grab the Metadata structs
  let metadataStruct = {} as MetadataStruct;
  if ((metadata as MetadataStruct).name) {
    metadataStruct = objToMetadata(metadata);
  } else {
    metadataStruct = jsonToMetadata(metadata as string);
  }

  const creators = [] as meta.programs.metadata.Creator[];
  let shareTally = 0;
  let hasOwner = false;
  for (const creator of metadataStruct.properties.creators) {
    creators.push(
      new meta.programs.metadata.Creator({
        address: creator.address,
        share: creator.share,
        verified: false,
      }),
    );

    if (creator.address === owner.toString()) {
      hasOwner = true;
    }
    shareTally += creator.share;
  }

  if (!hasOwner) {
    creators.push(
      new meta.programs.metadata.Creator({
        address: owner.toString(),
        share: 100 - shareTally,
        verified: true,
      }),
    );
  }

  const collection = new meta.programs.metadata.Collection({
    key: metadataAccount.collection.key,
    verified: false,
  });

  const metadataData = await new meta.programs.metadata.DataV2({
    name: metadataStruct.name,
    symbol: metadataStruct.symbol,
    uri: newMetadataURI ?? metadataAccount.data.uri,
    sellerFeeBasisPoints: metadataStruct.sellerFeeBasisPoints,
    creators,
    collection,
    uses: null,
  });

  const updateMetadataTx = new meta.programs.metadata.UpdateMetadataV2(
    {},
    {
      metadata: sft.metadata,
      updateAuthority: owner,
      metadataData,
      newUpdateAuthority,
      primarySaleHappened,
      isMutable,
    },
  );

  await provider.sendAndConfirm(updateMetadataTx);

  // Verify Collection
  const verifyCollectionTx = new meta.programs.metadata.VerifyCollection(
    { feePayer: owner },
    {
      metadata: sft.metadata,
      collectionAuthority: owner,
      collectionMint: sft.collectionData.collectionMint,
      collectionMetadata: sft.collectionData.collectionMetadata,
      collectionMasterEdition: sft.collectionData.collectionMasterEdition,
    },
  );
  await provider.sendAndConfirm(verifyCollectionTx);

  return await getSFTData(provider, sftMint);
};

// --------- MISC HELPERS -----------------------------------------
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};
