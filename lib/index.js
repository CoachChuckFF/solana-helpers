"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadataAccount = exports.getMetadataKey = exports.getMetadataMasterKey = exports.TEST_SPL_METADATA = exports.TEST_SPL_URL = exports.objToMetadata = exports.metadataToJson = exports.jsonToMetadata = exports.MetaCatagoryType = exports.MetaFileType = exports.disableSPLMint = exports.createSPL = exports.txSPL = exports.txSOL = exports.getAssociatedTokenAddressAndShouldCreate = exports.getAssociatedTokenAddress = exports.getSPLAccount = exports.burnFullToken = exports.closeSPLAccount = exports.burnSPL = exports.getRent = exports.dateToSolanaDate = exports.getProgram = exports.createTestProvider = exports.getSolanaProvider = exports.initSolanaProvider = exports.getSolanaWallet = exports.connectWallet = exports.initSolanaProviderFromLocalKeypair = exports.runInSandbox = exports.clusterToConnection = exports.SolanaCluster = exports.TestEndString = exports.TestStartString = exports.SolanaConnectionMainnet = exports.SolanaConnectionDevnet = exports.SolanaClusterLocalnet = exports.SolanaClusterMainnet = exports.SolanaClusterDevnet = exports.SolanaDefaultCommitment = exports.SPL_MINT_SPACE = exports.SIZE_STRING = exports.SIZE_U128 = exports.SIZE_U64 = exports.SIZE_U32 = exports.SIZE_U16 = exports.SIZE_U8 = exports.SIZE_VEC = exports.SIZE_PUBKEY = exports.ACCOUNT_DISCRIMINATOR_SIZE = void 0;
exports.sleep = exports.updateSFT = exports.createSFT = exports.createSFTCollection = exports.getSFTData = exports.getCollectionData = exports.getMetadataMasterAccount = void 0;
var spl_token_1 = require("@solana/spl-token");
var anchor_1 = require("@project-serum/anchor");
var meta = __importStar(require("@metaplex/js"));
var nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
// --------- SOLANA TOOLS -----------------------------------------
exports.ACCOUNT_DISCRIMINATOR_SIZE = 8;
exports.SIZE_PUBKEY = 32;
exports.SIZE_VEC = 8;
exports.SIZE_U8 = 1;
exports.SIZE_U16 = 2;
exports.SIZE_U32 = 4;
exports.SIZE_U64 = 8;
exports.SIZE_U128 = 16;
exports.SIZE_STRING = 64;
exports.SPL_MINT_SPACE = 82;
exports.SolanaDefaultCommitment = 'processed';
exports.SolanaClusterDevnet = anchor_1.web3.clusterApiUrl('devnet');
exports.SolanaClusterMainnet = anchor_1.web3.clusterApiUrl('mainnet-beta');
exports.SolanaClusterLocalnet = 'http://localhost:8899';
exports.SolanaConnectionDevnet = new anchor_1.web3.Connection(exports.SolanaClusterDevnet, exports.SolanaDefaultCommitment);
exports.SolanaConnectionMainnet = new anchor_1.web3.Connection(exports.SolanaClusterMainnet, exports.SolanaDefaultCommitment);
exports.TestStartString = '???? Starting test...';
exports.TestEndString = '... to the moon! ????';
var SolanaCluster;
(function (SolanaCluster) {
    SolanaCluster[SolanaCluster["localhost"] = 0] = "localhost";
    SolanaCluster[SolanaCluster["devnet"] = 1] = "devnet";
    SolanaCluster[SolanaCluster["mainnet"] = 2] = "mainnet";
})(SolanaCluster = exports.SolanaCluster || (exports.SolanaCluster = {}));
var clusterToConnection = function (cluster, commitmentOrConfig) {
    if (cluster === void 0) { cluster = SolanaCluster.mainnet; }
    if (commitmentOrConfig === void 0) { commitmentOrConfig = exports.SolanaDefaultCommitment; }
    switch (cluster) {
        case SolanaCluster.localhost:
            return new anchor_1.web3.Connection(exports.SolanaClusterLocalnet, commitmentOrConfig);
        case SolanaCluster.devnet:
            return new anchor_1.web3.Connection(exports.SolanaClusterDevnet, commitmentOrConfig);
        case SolanaCluster.mainnet:
            return new anchor_1.web3.Connection(exports.SolanaClusterDevnet, commitmentOrConfig);
        default:
            return exports.SolanaConnectionDevnet;
    }
};
exports.clusterToConnection = clusterToConnection;
var runInSandbox = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, code()];
            case 1:
                _a.sent();
                process.exit(0);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.runInSandbox = runInSandbox;
/**
 * pass in fullpath to keypair /Home/.config/solana/program/test.json
 */
var initSolanaProviderFromLocalKeypair = function (fullpath, cluster, commitmentOrConfig, opts) {
    if (cluster === void 0) { cluster = SolanaCluster.mainnet; }
    if (commitmentOrConfig === void 0) { commitmentOrConfig = exports.SolanaDefaultCommitment; }
    if (opts === void 0) { opts = { commitment: exports.SolanaDefaultCommitment }; }
    var secretArray = require(fullpath);
    var secret = new Uint8Array(secretArray);
    var payerKeypair = anchor_1.web3.Keypair.fromSecretKey(secret);
    return (0, exports.initSolanaProvider)(new nodewallet_1.default(payerKeypair), cluster, commitmentOrConfig, opts);
};
exports.initSolanaProviderFromLocalKeypair = initSolanaProviderFromLocalKeypair;
/**
 * For web-based wallets only
 */
var connectWallet = function (onlyIfTrusted) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var solana;
        return __generator(this, function (_a) {
            try {
                solana = window.solana;
                if (solana) {
                    if (solana.isPhantom) {
                        try {
                            solana
                                .connect({ onlyIfTrusted: onlyIfTrusted })
                                .then(function (result) {
                                resolve(new anchor_1.web3.PublicKey(result.publicKey.toString()));
                            })
                                .catch(function (error) {
                                reject("Error ".concat(error));
                            });
                        }
                        catch (error) {
                            reject("Error re-connecting to phantom. ".concat(error));
                        }
                    }
                }
                else {
                    reject('Solana object not found! Get a Phantom Wallet ????');
                }
            }
            catch (error) {
                reject(error);
            }
            return [2 /*return*/];
        });
    }); });
};
exports.connectWallet = connectWallet;
/**
 * For web-based wallets only
 */
var getSolanaWallet = function () {
    var solana = window.solana;
    return solana;
};
exports.getSolanaWallet = getSolanaWallet;
/**
 * Creates a provider to pass into contract functions
 */
var initSolanaProvider = function (wallet, cluster, commitmentOrConfig, opts) {
    if (wallet === void 0) { wallet = (0, exports.getSolanaWallet)(); }
    if (cluster === void 0) { cluster = SolanaCluster.mainnet; }
    if (commitmentOrConfig === void 0) { commitmentOrConfig = exports.SolanaDefaultCommitment; }
    if (opts === void 0) { opts = { commitment: exports.SolanaDefaultCommitment }; }
    return new anchor_1.AnchorProvider((0, exports.clusterToConnection)(cluster, commitmentOrConfig), wallet, opts);
};
exports.initSolanaProvider = initSolanaProvider;
/**
 * @deprecated The method should not be used, use initSolanaProvider instead
 */
var getSolanaProvider = function (wallet, isDevnet) {
    if (isDevnet === void 0) { isDevnet = true; }
    return new anchor_1.AnchorProvider(isDevnet ? exports.SolanaConnectionDevnet : exports.SolanaConnectionMainnet, wallet, {
        commitment: exports.SolanaDefaultCommitment,
    });
};
exports.getSolanaProvider = getSolanaProvider;
var createTestProvider = function (masterProvider, cluster, lamportsToStart, testKeypair) {
    if (cluster === void 0) { cluster = SolanaCluster.localhost; }
    if (lamportsToStart === void 0) { lamportsToStart = anchor_1.web3.LAMPORTS_PER_SOL; }
    if (testKeypair === void 0) { testKeypair = anchor_1.web3.Keypair.generate(); }
    return __awaiter(void 0, void 0, void 0, function () {
        var provider, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (cluster === SolanaCluster.mainnet) {
                        throw new Error('Not for mainnet');
                    }
                    provider = (0, exports.initSolanaProvider)(new nodewallet_1.default(testKeypair), cluster);
                    _a = cluster;
                    switch (_a) {
                        case SolanaCluster.devnet: return [3 /*break*/, 1];
                        case SolanaCluster.localhost: return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, masterProvider.connection.requestAirdrop(provider.wallet.publicKey, lamportsToStart)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, exports.txSOL)(masterProvider, provider.wallet.publicKey, lamportsToStart)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, provider];
            }
        });
    });
};
exports.createTestProvider = createTestProvider;
var getProgram = function (provider, programID) { return __awaiter(void 0, void 0, void 0, function () {
    var idl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, anchor_1.Program.fetchIdl(programID, provider)];
            case 1:
                idl = _a.sent();
                return [2 /*return*/, new anchor_1.Program(idl, programID, provider)];
        }
    });
}); };
exports.getProgram = getProgram;
var dateToSolanaDate = function (date) {
    return new anchor_1.BN(Math.floor(date.getTime() / 1000));
};
exports.dateToSolanaDate = dateToSolanaDate;
var getRent = function (provider, size) {
    return provider.connection.getMinimumBalanceForRentExemption(size);
};
exports.getRent = getRent;
// --------- SPL TOOLS -----------------------------------------
var burnSPL = function (provider, mint, amount, vault, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    var ata, _a, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(vault !== null && vault !== void 0)) return [3 /*break*/, 1];
                _a = vault;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, provider.wallet.publicKey, allowOffCurve !== null && allowOffCurve !== void 0 ? allowOffCurve : false)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                ata = _a;
                tx = new anchor_1.web3.Transaction();
                tx.add(spl_token_1.Token.createBurnInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, ata, provider.wallet.publicKey, [], amount));
                return [4 /*yield*/, provider.sendAndConfirm(tx)];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.burnSPL = burnSPL;
var closeSPLAccount = function (provider, mint, vault, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    var ata, _a, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(vault !== null && vault !== void 0)) return [3 /*break*/, 1];
                _a = vault;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, provider.wallet.publicKey, allowOffCurve !== null && allowOffCurve !== void 0 ? allowOffCurve : false)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                ata = _a;
                tx = new anchor_1.web3.Transaction();
                tx.add(spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, ata, provider.wallet.publicKey, provider.wallet.publicKey, []));
                return [4 /*yield*/, provider.sendAndConfirm(tx)];
            case 4: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.closeSPLAccount = closeSPLAccount;
var burnFullToken = function (provider, mint, vault, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    var token, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault, allowOffCurve)];
            case 1:
                token = _a.sent();
                tx = new anchor_1.web3.Transaction();
                if (!token.amount.eq(new anchor_1.BN(0))) {
                    tx.add(spl_token_1.Token.createBurnInstruction(spl_token_1.TOKEN_PROGRAM_ID, token.mint, token.address, provider.wallet.publicKey, [], token.amount));
                }
                tx.add(spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, token.address, provider.wallet.publicKey, provider.wallet.publicKey, []));
                return [4 /*yield*/, provider.sendAndConfirm(tx)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.burnFullToken = burnFullToken;
var getSPLAccount = function (provider, mint, vault, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    var ata, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(vault !== null && vault !== void 0)) return [3 /*break*/, 1];
                _a = vault;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, provider.wallet.publicKey, allowOffCurve !== null && allowOffCurve !== void 0 ? allowOffCurve : false)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                ata = _a;
                return [2 /*return*/, new spl_token_1.Token(provider.connection, mint, spl_token_1.TOKEN_PROGRAM_ID, anchor_1.web3.Keypair.generate()).getAccountInfo(ata)];
        }
    });
}); };
exports.getSPLAccount = getSPLAccount;
var getAssociatedTokenAddress = function (mint, owner, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, owner, allowOffCurve)];
    });
}); };
exports.getAssociatedTokenAddress = getAssociatedTokenAddress;
var getAssociatedTokenAddressAndShouldCreate = function (provider, mint, owner, allowOffCurve) { return __awaiter(void 0, void 0, void 0, function () {
    var vault, shouldCreate, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, owner, allowOffCurve)];
            case 1:
                vault = _a.sent();
                shouldCreate = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                shouldCreate = true;
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, { vault: vault, shouldCreate: shouldCreate }];
        }
    });
}); };
exports.getAssociatedTokenAddressAndShouldCreate = getAssociatedTokenAddressAndShouldCreate;
var txSOL = function (provider, to, amount) {
    if (amount === void 0) { amount = anchor_1.web3.LAMPORTS_PER_SOL / 100; }
    return __awaiter(void 0, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tx = new anchor_1.web3.Transaction().add(anchor_1.web3.SystemProgram.transfer({
                        fromPubkey: provider.wallet.publicKey,
                        toPubkey: to,
                        lamports: amount,
                    }));
                    return [4 /*yield*/, provider.sendAndConfirm(tx)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, provider.connection.getAccountInfo(to)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.txSOL = txSOL;
var txSPL = function (provider, mint, to, amount) {
    if (amount === void 0) { amount = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var tx, owner, ownerVault, _a, vault, shouldCreate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tx = new anchor_1.web3.Transaction();
                    owner = provider.wallet.publicKey;
                    return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, owner)];
                case 1:
                    ownerVault = _b.sent();
                    return [4 /*yield*/, (0, exports.getAssociatedTokenAddressAndShouldCreate)(provider, mint, to)];
                case 2:
                    _a = _b.sent(), vault = _a.vault, shouldCreate = _a.shouldCreate;
                    if (shouldCreate) {
                        tx.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, vault, to, owner));
                    }
                    tx.add(spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, ownerVault, vault, owner, [], amount));
                    return [4 /*yield*/, provider.sendAndConfirm(tx)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault)];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.txSPL = txSPL;
var createSPL = function (provider, amount, decimals, disableAfterMint, newMintKeypair) {
    if (amount === void 0) { amount = 100000; }
    return __awaiter(void 0, void 0, void 0, function () {
        var mintKeypair, mint, owner, vault, tx, _a, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    mintKeypair = newMintKeypair !== null && newMintKeypair !== void 0 ? newMintKeypair : anchor_1.web3.Keypair.generate();
                    mint = mintKeypair.publicKey;
                    owner = provider.wallet.publicKey;
                    return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, owner)];
                case 1:
                    vault = _f.sent();
                    tx = new anchor_1.web3.Transaction();
                    // Create the Account
                    _b = (_a = tx).add;
                    _d = (_c = anchor_1.web3.SystemProgram).createAccount;
                    _e = {
                        fromPubkey: owner,
                        newAccountPubkey: mint
                    };
                    return [4 /*yield*/, spl_token_1.Token.getMinBalanceRentForExemptMint(provider.connection)];
                case 2:
                    // Create the Account
                    _b.apply(_a, [_d.apply(_c, [(_e.lamports = _f.sent(),
                                _e.space = spl_token_1.MintLayout.span,
                                _e.programId = spl_token_1.TOKEN_PROGRAM_ID,
                                _e)])]);
                    // Create the Mint
                    tx.add(spl_token_1.Token.createInitMintInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, decimals !== null && decimals !== void 0 ? decimals : 0, owner, owner));
                    // Create Associated Account
                    tx.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, vault, owner, owner));
                    // Mint
                    tx.add(spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, vault, owner, [], amount));
                    return [4 /*yield*/, provider.sendAndConfirm(tx, [mintKeypair])];
                case 3:
                    _f.sent();
                    if (!disableAfterMint) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, exports.disableSPLMint)(provider, mint)];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5: return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault)];
                case 6: return [2 /*return*/, _f.sent()];
            }
        });
    });
};
exports.createSPL = createSPL;
var disableSPLMint = function (provider, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, vault, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                owner = provider.wallet.publicKey;
                return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, owner)];
            case 1:
                vault = _a.sent();
                tx = new anchor_1.web3.Transaction();
                tx.add(spl_token_1.Token.createSetAuthorityInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, null, 'MintTokens', owner, []));
                return [4 /*yield*/, provider.sendAndConfirm(tx)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.disableSPLMint = disableSPLMint;
// --------- SFT HELPERS -----------------------------------------
// Phantom SFT Notes: https://docs.phantom.app/integrating/tokens/non-fungible-tokens
// Metaplex Notes: https://docs.metaplex.com/token-metadata/specification
// More metadata Notes: https://medium.com/metaplex/metaplex-metadata-standard-45af3d04b541
var MetaFileType;
(function (MetaFileType) {
    MetaFileType["png"] = "image/png";
    MetaFileType["jpeg"] = "image/jpeg";
    MetaFileType["glb"] = "application/octet-stream";
})(MetaFileType = exports.MetaFileType || (exports.MetaFileType = {}));
var MetaCatagoryType;
(function (MetaCatagoryType) {
    MetaCatagoryType["image"] = "image";
    MetaCatagoryType["vr"] = "vr";
})(MetaCatagoryType = exports.MetaCatagoryType || (exports.MetaCatagoryType = {}));
var jsonToMetadata = function (metadata) {
    return JSON.parse(metadata);
};
exports.jsonToMetadata = jsonToMetadata;
var metadataToJson = function (metadata) {
    return JSON.stringify(metadata);
};
exports.metadataToJson = metadataToJson;
var objToMetadata = function (metadata) {
    return metadata;
};
exports.objToMetadata = objToMetadata;
exports.TEST_SPL_URL = 'https://soltreasure.s3.amazonaws.com/desolates/Puzzle/puzzle_clue_1.json';
exports.TEST_SPL_METADATA = {
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
            value: '1. Each RED nibble is equal to the number of trees if GREEN is 0x22 more than BLUE, else, each RED nibble is equal to the number of chests.',
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
var getMetadataMasterKey = function (mint) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, meta.programs.metadata.MetadataProgram.findMasterEditionAccount(mint)];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
exports.getMetadataMasterKey = getMetadataMasterKey;
var getMetadataKey = function (mint) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, meta.programs.metadata.MetadataProgram.findMetadataAccount(mint)];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
exports.getMetadataKey = getMetadataKey;
var getMetadataAccount = function (provider, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = (_a = meta.programs.metadata.MetadataData).deserialize;
                _d = (_c = provider.connection).getAccountInfo;
                return [4 /*yield*/, (0, exports.getMetadataKey)(mint)];
            case 1: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_e.sent()).data])];
            case 3: return [2 /*return*/, _e.sent()];
        }
    });
}); };
exports.getMetadataAccount = getMetadataAccount;
var getMetadataMasterAccount = function (provider, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = (_a = meta.programs.metadata.EditionData).deserialize;
                _d = (_c = provider.connection).getAccountInfo;
                return [4 /*yield*/, (0, exports.getMetadataMasterKey)(mint)];
            case 1: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_e.sent()).data])];
            case 3: return [2 /*return*/, _e.sent()];
        }
    });
}); };
exports.getMetadataMasterAccount = getMetadataMasterAccount;
var getCollectionData = function (provider, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    owner: provider.wallet.publicKey,
                    collectionMint: mint
                };
                return [4 /*yield*/, (0, exports.getMetadataKey)(mint)];
            case 1:
                _a.collectionMetadata = _b.sent();
                return [4 /*yield*/, (0, exports.getMetadataMasterKey)(mint)];
            case 2: return [2 /*return*/, (_a.collectionMasterEdition = _b.sent(),
                    _a)];
        }
    });
}); };
exports.getCollectionData = getCollectionData;
var getSFTData = function (provider, mint, collectionMint) { return __awaiter(void 0, void 0, void 0, function () {
    var metadataAccount, collection;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                metadataAccount = {};
                if (!!collectionMint) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.getMetadataAccount)(provider, mint)];
            case 1:
                metadataAccount = _b.sent();
                _b.label = 2;
            case 2:
                collection = collectionMint !== null && collectionMint !== void 0 ? collectionMint : new anchor_1.web3.PublicKey(metadataAccount.collection.key);
                _a = {
                    owner: provider.wallet.publicKey
                };
                return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, provider.wallet.publicKey)];
            case 3:
                _a.vault = _b.sent(),
                    _a.mint = mint;
                return [4 /*yield*/, (0, exports.getMetadataKey)(mint)];
            case 4:
                _a.metadata = _b.sent();
                return [4 /*yield*/, (0, exports.getCollectionData)(provider, collection)];
            case 5: return [2 /*return*/, (_a.collectionData = _b.sent(),
                    _a)];
        }
    });
}); };
exports.getSFTData = getSFTData;
var createSFTCollection = function (provider, symbol, sellerFeeBasisPoints) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, collectionSPL, data, tx, collectionMetadataKey, masterEditionPubkey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                owner = provider.wallet.publicKey;
                return [4 /*yield*/, (0, exports.createSPL)(provider, 1)];
            case 1:
                collectionSPL = _a.sent();
                data = new meta.programs.metadata.DataV2({
                    symbol: symbol !== null && symbol !== void 0 ? symbol : '',
                    name: 'Collection NFT',
                    uri: '',
                    sellerFeeBasisPoints: sellerFeeBasisPoints !== null && sellerFeeBasisPoints !== void 0 ? sellerFeeBasisPoints : 0,
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
                tx = new anchor_1.web3.Transaction();
                return [4 /*yield*/, (0, exports.getMetadataKey)(collectionSPL.mint)];
            case 2:
                collectionMetadataKey = _a.sent();
                tx.add.apply(tx, new meta.programs.metadata.CreateMetadataV2({ feePayer: owner }, {
                    metadata: collectionMetadataKey,
                    metadataData: data,
                    updateAuthority: owner,
                    mint: collectionSPL.mint,
                    mintAuthority: owner,
                }).instructions);
                return [4 /*yield*/, (0, exports.getMetadataMasterKey)(collectionSPL.mint)];
            case 3:
                masterEditionPubkey = _a.sent();
                tx.add.apply(tx, new meta.programs.metadata.CreateMasterEditionV3({ feePayer: owner }, {
                    edition: masterEditionPubkey,
                    metadata: collectionMetadataKey,
                    mint: collectionSPL.mint,
                    mintAuthority: owner,
                    updateAuthority: owner,
                    maxSupply: new anchor_1.BN(0),
                }).instructions);
                return [4 /*yield*/, provider.sendAndConfirm(tx)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, exports.getCollectionData)(provider, collectionSPL.mint)];
            case 5: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createSFTCollection = createSFTCollection;
var createSFT = function (provider, metadataURI, metadata, amount, existingCollection) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, metadataStruct, splToken, collectionData, collectionMetadata, collection, creators, shareTally, hasOwner, _i, _a, creator, metadataData, metadataKey, createMetaTx, verifyCollectionTx, signMetadataTX;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                owner = provider.wallet.publicKey;
                metadataStruct = {};
                if (metadata.name) {
                    metadataStruct = (0, exports.objToMetadata)(metadata);
                }
                else {
                    metadataStruct = (0, exports.jsonToMetadata)(metadata);
                }
                return [4 /*yield*/, (0, exports.createSPL)(provider, amount.toNumber())];
            case 1:
                splToken = _d.sent();
                collectionData = {};
                if (!!existingCollection) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.createSFTCollection)(provider, metadataStruct.symbol, metadataStruct.sellerFeeBasisPoints)];
            case 2:
                collectionData = _d.sent();
                _d.label = 3;
            case 3: return [4 /*yield*/, (0, exports.getMetadataAccount)(provider, collectionData.collectionMint)];
            case 4:
                collectionMetadata = _d.sent();
                if (collectionMetadata.data.symbol !== metadataStruct.symbol) {
                    throw new Error('Collection Symbol does not match...');
                }
                if ((_b = collectionMetadata.data.sellerFeeBasisPoints !== metadataStruct.sellerFeeBasisPoints) !== null && _b !== void 0 ? _b : 0) {
                    throw new Error('Collection seller points do not match...');
                }
                collection = new meta.programs.metadata.Collection({
                    key: collectionData.collectionMint.toString(),
                    verified: false,
                });
                creators = [];
                shareTally = 0;
                hasOwner = false;
                for (_i = 0, _a = metadataStruct.properties.creators; _i < _a.length; _i++) {
                    creator = _a[_i];
                    creators.push(new meta.programs.metadata.Creator({
                        address: creator.address,
                        share: creator.share,
                        verified: false,
                    }));
                    if (creator.address === owner.toString()) {
                        hasOwner = true;
                    }
                    shareTally += creator.share;
                }
                if (!hasOwner) {
                    creators.push(new meta.programs.metadata.Creator({
                        address: owner.toString(),
                        share: 100 - shareTally,
                        verified: true,
                    }));
                }
                return [4 /*yield*/, new meta.programs.metadata.DataV2({
                        name: metadataStruct.name,
                        symbol: metadataStruct.symbol,
                        uri: metadataURI,
                        sellerFeeBasisPoints: (_c = metadataStruct.sellerFeeBasisPoints) !== null && _c !== void 0 ? _c : 0,
                        creators: creators,
                        collection: collection,
                        uses: null,
                    })];
            case 5:
                metadataData = _d.sent();
                return [4 /*yield*/, (0, exports.getMetadataKey)(splToken.mint)];
            case 6:
                metadataKey = _d.sent();
                createMetaTx = new meta.programs.metadata.CreateMetadataV2({ feePayer: owner }, {
                    metadata: metadataKey,
                    metadataData: metadataData,
                    updateAuthority: owner,
                    mint: splToken.mint,
                    mintAuthority: owner,
                });
                return [4 /*yield*/, provider.sendAndConfirm(createMetaTx)];
            case 7:
                _d.sent();
                verifyCollectionTx = new meta.programs.metadata.VerifyCollection({ feePayer: owner }, {
                    metadata: metadataKey,
                    collectionAuthority: owner,
                    collectionMint: collectionData.collectionMint,
                    collectionMetadata: collectionData.collectionMetadata,
                    collectionMasterEdition: collectionData.collectionMasterEdition,
                });
                return [4 /*yield*/, provider.sendAndConfirm(verifyCollectionTx)];
            case 8:
                _d.sent();
                signMetadataTX = new meta.programs.metadata.SignMetadata({ feePayer: owner }, {
                    metadata: metadataKey,
                    creator: owner,
                });
                return [4 /*yield*/, provider.sendAndConfirm(signMetadataTX)];
            case 9:
                _d.sent();
                return [4 /*yield*/, (0, exports.getMetadataAccount)(provider, splToken.mint)];
            case 10:
                _d.sent();
                return [4 /*yield*/, (0, exports.getSFTData)(provider, splToken.mint, collectionData.collectionMint)];
            case 11: return [2 /*return*/, _d.sent()];
        }
    });
}); };
exports.createSFT = createSFT;
// export const uploadSFTAsset = async(
// ) => {
//     // meta.programs.metadata.
// }
var updateSFT = function (provider, sftMint, metadata, primarySaleHappened, isMutable, newMetadataURI, newUpdateAuthority) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, sft, metadataAccount, metadataStruct, creators, shareTally, hasOwner, _i, _a, creator, collection, metadataData, updateMetadataTx, verifyCollectionTx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, provider.wallet.publicKey];
            case 1:
                owner = _b.sent();
                return [4 /*yield*/, (0, exports.getSFTData)(provider, sftMint)];
            case 2:
                sft = _b.sent();
                return [4 /*yield*/, (0, exports.getMetadataAccount)(provider, sftMint)];
            case 3:
                metadataAccount = _b.sent();
                metadataStruct = {};
                if (metadata.name) {
                    metadataStruct = (0, exports.objToMetadata)(metadata);
                }
                else {
                    metadataStruct = (0, exports.jsonToMetadata)(metadata);
                }
                creators = [];
                shareTally = 0;
                hasOwner = false;
                for (_i = 0, _a = metadataStruct.properties.creators; _i < _a.length; _i++) {
                    creator = _a[_i];
                    creators.push(new meta.programs.metadata.Creator({
                        address: creator.address,
                        share: creator.share,
                        verified: false,
                    }));
                    if (creator.address === owner.toString()) {
                        hasOwner = true;
                    }
                    shareTally += creator.share;
                }
                if (!hasOwner) {
                    creators.push(new meta.programs.metadata.Creator({
                        address: owner.toString(),
                        share: 100 - shareTally,
                        verified: true,
                    }));
                }
                collection = new meta.programs.metadata.Collection({
                    key: metadataAccount.collection.key,
                    verified: false,
                });
                return [4 /*yield*/, new meta.programs.metadata.DataV2({
                        name: metadataStruct.name,
                        symbol: metadataStruct.symbol,
                        uri: newMetadataURI !== null && newMetadataURI !== void 0 ? newMetadataURI : metadataAccount.data.uri,
                        sellerFeeBasisPoints: metadataStruct.sellerFeeBasisPoints,
                        creators: creators,
                        collection: collection,
                        uses: null,
                    })];
            case 4:
                metadataData = _b.sent();
                updateMetadataTx = new meta.programs.metadata.UpdateMetadataV2({}, {
                    metadata: sft.metadata,
                    updateAuthority: owner,
                    metadataData: metadataData,
                    newUpdateAuthority: newUpdateAuthority,
                    primarySaleHappened: primarySaleHappened,
                    isMutable: isMutable,
                });
                return [4 /*yield*/, provider.sendAndConfirm(updateMetadataTx)];
            case 5:
                _b.sent();
                verifyCollectionTx = new meta.programs.metadata.VerifyCollection({ feePayer: owner }, {
                    metadata: sft.metadata,
                    collectionAuthority: owner,
                    collectionMint: sft.collectionData.collectionMint,
                    collectionMetadata: sft.collectionData.collectionMetadata,
                    collectionMasterEdition: sft.collectionData.collectionMasterEdition,
                });
                return [4 /*yield*/, provider.sendAndConfirm(verifyCollectionTx)];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, exports.getSFTData)(provider, sftMint)];
            case 7: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.updateSFT = updateSFT;
// --------- MISC HELPERS -----------------------------------------
var sleep = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, ms);
    });
};
exports.sleep = sleep;
