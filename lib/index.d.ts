/// <reference types="bn.js" />
/// <reference types="node" />
/// <reference types="@metaplex/js/node_modules/@solana/spl-token" />
import { Program, AnchorProvider, BN, web3 } from '@project-serum/anchor';
export declare const ACCOUNT_DISCRIMINATOR_SIZE = 8;
export declare const SIZE_PUBKEY = 32;
export declare const SIZE_VEC = 8;
export declare const SIZE_U8 = 1;
export declare const SIZE_U16 = 2;
export declare const SIZE_U32 = 4;
export declare const SIZE_U64 = 8;
export declare const SIZE_U128 = 16;
export declare const SIZE_STRING = 64;
export declare const SPL_MINT_SPACE = 82;
export declare const SolanaDefaultCommitment = "processed";
export declare const SolanaClusterDevnet: string;
export declare const SolanaClusterMainnet: string;
export declare const SolanaClusterLocalnet = "http://localhost:8899";
export declare const SolanaConnectionDevnet: web3.Connection;
export declare const SolanaConnectionMainnet: web3.Connection;
export declare const TestStartString = "\uD83D\uDE80 Starting test...";
export declare const TestEndString = "... to the moon! \uD83C\uDF11";
export declare enum SolanaCluster {
    localhost = 0,
    devnet = 1,
    mainnet = 2
}
export declare const clusterToConnection: (cluster?: SolanaCluster, commitmentOrConfig?: web3.Commitment | web3.ConnectionConfig) => web3.Connection;
export declare const runInSandbox: (code: any) => Promise<never>;
/**
 * pass in fullpath to keypair /Home/.config/solana/program/test.json
 */
export declare const initSolanaProviderFromLocalKeypair: (fullpath: string, cluster?: SolanaCluster, commitmentOrConfig?: web3.Commitment | web3.ConnectionConfig, opts?: web3.ConfirmOptions) => AnchorProvider;
/**
 * For web-based wallets only
 */
export declare const connectWallet: (onlyIfTrusted?: boolean) => Promise<web3.PublicKey>;
/**
 * For web-based wallets only
 */
export declare const getSolanaWallet: () => any;
/**
 * Creates a provider to pass into contract functions
 */
export declare const initSolanaProvider: (wallet?: any, cluster?: SolanaCluster, commitmentOrConfig?: web3.Commitment | web3.ConnectionConfig, opts?: web3.ConfirmOptions) => AnchorProvider;
/**
 * @deprecated The method should not be used, use initSolanaProvider instead
 */
export declare const getSolanaProvider: (wallet: any, isDevnet?: boolean) => AnchorProvider;
export declare const createTestProvider: (masterProvider: AnchorProvider, cluster?: SolanaCluster, lamportsToStart?: number, testKeypair?: web3.Keypair) => Promise<AnchorProvider>;
export declare const getProgram: (provider: AnchorProvider, programID: web3.PublicKey) => Promise<Program<any>>;
export declare const dateToSolanaDate: (date: Date) => BN;
export declare const getRent: (provider: AnchorProvider, size: number) => Promise<number>;
export declare const burnSPL: (provider: AnchorProvider, mint: web3.PublicKey, amount: BN, vault?: web3.PublicKey, allowOffCurve?: boolean) => Promise<void>;
export declare const closeSPLAccount: (provider: AnchorProvider, mint: web3.PublicKey, vault?: web3.PublicKey, allowOffCurve?: boolean) => Promise<string>;
export declare const burnFullToken: (provider: AnchorProvider, mint: web3.PublicKey, vault?: web3.PublicKey, allowOffCurve?: boolean) => Promise<string>;
export declare const getSPLAccount: (provider: AnchorProvider, mint: web3.PublicKey, vault?: web3.PublicKey, allowOffCurve?: boolean) => Promise<import("@solana/spl-token").AccountInfo>;
export declare const getAssociatedTokenAddress: (mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => Promise<web3.PublicKey>;
export declare const getAssociatedTokenAddressAndShouldCreate: (provider: AnchorProvider, mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => Promise<{
    vault: web3.PublicKey;
    shouldCreate: boolean;
}>;
export declare const txSOL: (provider: AnchorProvider, to: web3.PublicKey, amount?: number) => Promise<web3.AccountInfo<Buffer>>;
export declare const txSPL: (provider: AnchorProvider, mint: web3.PublicKey, to: web3.PublicKey, amount?: number) => Promise<import("@solana/spl-token").AccountInfo>;
export declare const createSPL: (provider: AnchorProvider, amount?: number, decimals?: number, disableAfterMint?: boolean, newMintKeypair?: web3.Keypair) => Promise<import("@solana/spl-token").AccountInfo>;
export declare const disableSPLMint: (provider: AnchorProvider, mint: web3.PublicKey) => Promise<void>;
export declare enum MetaFileType {
    png = "image/png",
    jpeg = "image/jpeg",
    glb = "application/octet-stream"
}
export declare enum MetaCatagoryType {
    image = "image",
    vr = "vr"
}
export interface MetaCollectionStruct {
    name: string;
    family: string;
}
export interface MetaAttributeStruct {
    trait_type: string;
    value: string;
}
export interface MetaPropertiesStruct {
    files: MetaFileStruct[];
    category: MetaCatagoryType | string;
    creators: MetaCreatorStruct[];
}
export interface MetaFileStruct {
    uri: string;
    type: MetaFileType | string;
}
export interface MetaCreatorStruct {
    address: string;
    share: number;
}
export interface MetadataStruct {
    name: string;
    symbol: string;
    description: string;
    image: string;
    animation_url?: string;
    external_url: string;
    sellerFeeBasisPoints?: number;
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
export declare const jsonToMetadata: (metadata: string) => MetadataStruct;
export declare const metadataToJson: (metadata: MetadataStruct) => string;
export declare const objToMetadata: (metadata: any) => MetadataStruct;
export declare const TEST_SPL_URL: string;
export declare const TEST_SPL_METADATA: MetadataStruct;
export declare const getMetadataMasterKey: (mint: web3.PublicKey) => Promise<web3.PublicKey>;
export declare const getMetadataKey: (mint: web3.PublicKey) => Promise<web3.PublicKey>;
export declare const getMetadataAccount: (provider: AnchorProvider, mint: web3.PublicKey) => Promise<any>;
export declare const getMetadataMasterAccount: (provider: AnchorProvider, mint: web3.PublicKey) => Promise<any>;
export declare const getCollectionData: (provider: AnchorProvider, mint: web3.PublicKey) => Promise<SFTCollectionData>;
export declare const getSFTData: (provider: AnchorProvider, mint: web3.PublicKey, collectionMint?: web3.PublicKey) => Promise<SFTData>;
export declare const createSFTCollection: (provider: AnchorProvider, symbol?: string, sellerFeeBasisPoints?: number) => Promise<SFTCollectionData>;
export declare const createSFT: (provider: AnchorProvider, metadataURI: string, metadata: MetadataStruct | string, amount: BN, existingCollection?: SFTCollectionData) => Promise<SFTData>;
export declare const updateSFT: (provider: AnchorProvider, sftMint: web3.PublicKey, metadata: MetadataStruct | string, primarySaleHappened?: boolean, isMutable?: boolean, newMetadataURI?: string, newUpdateAuthority?: web3.PublicKey) => Promise<SFTData>;
export declare const sleep: (ms: number) => Promise<unknown>;
