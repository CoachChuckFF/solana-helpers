import { NodeWallet } from '@metaplex/js';
import * as anchor from '@project-serum/anchor';
import * as helpers from '../index';

const main = async () => {
  console.log('🚀 Starting test...');

  const provider = helpers.initSolanaProviderFromLocalKeypair('/Users/drkrueger/.config/solana/programs/pez.json');

  console.log(await provider.connection.getAccountInfo(provider.wallet.publicKey));

  console.log('... to the moon! 🌑');
};

main();
