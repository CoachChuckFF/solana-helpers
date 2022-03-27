/// <reference types="bn.js" />
/// <reference types="@solana/spl-token" />
import { Program, Provider, BN, web3 } from "@project-serum/anchor";
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
export declare const getSolanaProvider: (wallet: any, isDevnet?: boolean) => Provider;
export declare const getProgram: (provider: Provider, programID: web3.PublicKey) => Promise<Program<any>>;
export declare const dateToSolanaDate: (date: Date) => BN;
export declare const getRent: (provider: Provider, size: number) => Promise<number>;
export declare const getSPLAccount: (provider: Provider, mint: web3.PublicKey, vault: web3.PublicKey) => Promise<import("@solana/spl-token").AccountInfo>;
export declare const getAssociatedTokenAddress: (mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => Promise<web3.PublicKey>;
export declare const getAssociatedTokenAddressAndShouldCreate: (provider: Provider, mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => Promise<{
    vault: web3.PublicKey;
    shouldCreate: boolean;
}>;
export declare const txSPL: (provider: Provider, mint: web3.PublicKey, to: web3.PublicKey, amount?: number) => Promise<import("@solana/spl-token").AccountInfo>;
export declare const createSPL: (provider: Provider, amount?: number) => Promise<import("@solana/spl-token").AccountInfo>;
