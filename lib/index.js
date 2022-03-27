"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSPL = exports.txSPL = exports.getAssociatedTokenAddressAndShouldCreate = exports.getAssociatedTokenAddress = exports.getSPLAccount = exports.getRent = exports.dateToSolanaDate = exports.getProgram = exports.getSolanaProvider = exports.SPL_MINT_SPACE = exports.SIZE_STRING = exports.SIZE_U128 = exports.SIZE_U64 = exports.SIZE_U32 = exports.SIZE_U16 = exports.SIZE_U8 = exports.SIZE_VEC = exports.SIZE_PUBKEY = exports.ACCOUNT_DISCRIMINATOR_SIZE = void 0;
var spl_token_1 = require("@solana/spl-token");
var anchor_1 = require("@project-serum/anchor");
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
var SolanaDefaultCommitment = "processed";
var SolanaClusterDevnet = anchor_1.web3.clusterApiUrl('devnet');
var SolanaClusterMainnet = anchor_1.web3.clusterApiUrl('mainnet-beta');
var SolanaConnectionDevnet = new anchor_1.web3.Connection(SolanaClusterDevnet, SolanaDefaultCommitment);
var SolanaConnectionMainnet = new anchor_1.web3.Connection(SolanaClusterMainnet, SolanaDefaultCommitment);
// Pass in window.solana for wallet
var getSolanaProvider = function (wallet, isDevnet) {
    if (isDevnet === void 0) { isDevnet = true; }
    return new anchor_1.Provider((isDevnet) ? SolanaConnectionDevnet : SolanaConnectionMainnet, wallet, { commitment: SolanaDefaultCommitment });
};
exports.getSolanaProvider = getSolanaProvider;
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
var getSPLAccount = function (provider, mint, vault) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new spl_token_1.Token(provider.connection, mint, spl_token_1.TOKEN_PROGRAM_ID, anchor_1.web3.Keypair.generate()).getAccountInfo(vault)];
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
                    return [4 /*yield*/, provider.send(tx)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault)];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.txSPL = txSPL;
var createSPL = function (provider, amount) {
    if (amount === void 0) { amount = 100000; }
    return __awaiter(void 0, void 0, void 0, function () {
        var mintKeypair, mint, tx, owner, vault, _a, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    mintKeypair = anchor_1.web3.Keypair.generate();
                    mint = mintKeypair.publicKey;
                    tx = new anchor_1.web3.Transaction();
                    owner = provider.wallet.publicKey;
                    return [4 /*yield*/, (0, exports.getAssociatedTokenAddress)(mint, owner)];
                case 1:
                    vault = _f.sent();
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
                                _e.space = exports.SPL_MINT_SPACE,
                                _e.programId = spl_token_1.TOKEN_PROGRAM_ID,
                                _e)])]);
                    // Create the Mint
                    tx.add(spl_token_1.Token.createInitMintInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, 0, owner, owner));
                    // Create Associated Account
                    tx.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, vault, owner, owner));
                    // Mint
                    tx.add(spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, vault, owner, [], amount));
                    return [4 /*yield*/, provider.send(tx, [mintKeypair])];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, (0, exports.getSPLAccount)(provider, mint, vault)];
                case 4: return [2 /*return*/, _f.sent()];
            }
        });
    });
};
exports.createSPL = createSPL;
