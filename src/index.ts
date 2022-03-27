import {Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {Program, Provider, BN, web3} from "@project-serum/anchor";
import {} from "@metaplex/js";

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

const SolanaDefaultCommitment = "processed";
const SolanaClusterDevnet = web3.clusterApiUrl('devnet');
const SolanaClusterMainnet = web3.clusterApiUrl('mainnet-beta');
const SolanaConnectionDevnet = new web3.Connection(SolanaClusterDevnet, SolanaDefaultCommitment);
const SolanaConnectionMainnet = new web3.Connection(SolanaClusterMainnet, SolanaDefaultCommitment);

// Pass in window.solana for wallet
export const getSolanaProvider = (wallet: any, isDevnet: boolean = true) => {
    return new Provider(
        (isDevnet) ? SolanaConnectionDevnet : SolanaConnectionMainnet, 
        wallet, 
        { commitment: SolanaDefaultCommitment },
    );
}

export const getProgram = async (provider: Provider, programID: web3.PublicKey,) => {
    const idl = await Program.fetchIdl(programID, provider);
    return new Program(idl as any, programID, provider);
}

export const dateToSolanaDate = (date: Date) => {
    return new BN(Math.floor(date.getTime() / 1000));
}

export const getRent = (provider: Provider, size: number) => {
    return provider.connection.getMinimumBalanceForRentExemption(size);
}


// --------- SPL TOOLS -----------------------------------------
export const getSPLAccount = async (provider: Provider, mint: web3.PublicKey, vault: web3.PublicKey) => {
    return new Token(provider.connection, mint, TOKEN_PROGRAM_ID, web3.Keypair.generate()).getAccountInfo(vault);
}

export const getAssociatedTokenAddress = async (mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => {
    return Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        owner,
        allowOffCurve
    );
}
export const getAssociatedTokenAddressAndShouldCreate = async (provider: Provider, mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurve?: boolean) => {
    const vault = await getAssociatedTokenAddress( mint, owner, allowOffCurve );
    let shouldCreate = false;
    try {
        await getSPLAccount(provider, mint, vault);
    } catch (e) {
        shouldCreate = true;
    }

    return {vault, shouldCreate};
}

export const txSPL = async (provider: Provider,  mint: web3.PublicKey, to: web3.PublicKey, amount: number = 1) => {
    const tx = new web3.Transaction();
    const owner = provider.wallet.publicKey;
    const ownerVault = await getAssociatedTokenAddress( mint, owner );
    const { vault, shouldCreate } = await getAssociatedTokenAddressAndShouldCreate( provider, mint, to );

    if(shouldCreate){
        tx.add(
            Token.createAssociatedTokenAccountInstruction(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                vault,
                to,
                owner
            )
        );
    }

    tx.add(
        Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            ownerVault,
            vault,
            owner,
            [],
            amount,
        )
    );

    await provider.send(tx);
  
    return await getSPLAccount(provider, mint, vault);
}

export const createSPL = async (provider: Provider, amount: number = 100000) => {
    const mintKeypair = web3.Keypair.generate();
    const mint = mintKeypair.publicKey;
    const tx = new web3.Transaction();
    const owner = provider.wallet.publicKey;
    const vault = await getAssociatedTokenAddress( mint, owner );
  
    // Create the Account
    tx.add(
      web3.SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: mint,
        lamports: await Token.getMinBalanceRentForExemptMint(provider.connection),
        space: SPL_MINT_SPACE,
        programId: TOKEN_PROGRAM_ID
      })
    );
  
    // Create the Mint
    tx.add(
        Token.createInitMintInstruction(
            TOKEN_PROGRAM_ID,
            mint,
            0,
            owner,
            owner
        )
    );
  
    // Create Associated Account
    tx.add(
        Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            vault,
            owner,
            owner
        )
    );
  
    // Mint
    tx.add(
        Token.createMintToInstruction(
            TOKEN_PROGRAM_ID,
            mint,
            vault,
            owner,
            [],
            amount
        )
    );
  
    await provider.send(tx, [mintKeypair]);

    
  
    return await getSPLAccount(provider, mint, vault);
}
