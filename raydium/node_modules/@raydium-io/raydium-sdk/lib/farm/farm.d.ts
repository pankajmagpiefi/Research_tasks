import { FarmStateLayout, FarmLedgerLayout, FarmState, FarmLedger } from './layout.js';
import { FarmVersion } from './type.js';
import { PublicKey, Connection, TransactionInstruction, Signer } from '@solana/web3.js';
import bn_js__default from 'bn.js';
import { TokenAccount, Base } from '../base/base.js';
import { PublicKeyish } from '../common/pubkey.js';
import { GetMultipleAccountsInfoConfig } from '../common/web3.js';
import { BigNumberish } from '../entity/bignumber.js';
import { SplAccount } from '../spl/layout.js';
import '../marshmallow/index.js';
import '../marshmallow/buffer-layout.js';
import '../common/json-file.js';
import '../type-b5eab5c3.js';
import '@solana/spl-token';

declare type FarmPoolKeys = {
    readonly id: PublicKey;
    readonly lpMint: PublicKey;
    readonly version: number;
    readonly programId: PublicKey;
    readonly authority: PublicKey;
    readonly lpVault: PublicKey;
    readonly upcoming: boolean;
    readonly rewardInfos: ({
        readonly rewardMint: PublicKey;
        readonly rewardVault: PublicKey;
    } | {
        readonly rewardMint: PublicKey;
        readonly rewardVault: PublicKey;
        readonly rewardOpenTime: number;
        readonly rewardEndTime: number;
        readonly rewardPerSecond: number;
    })[];
};
/**
 * Full user keys that build transaction need
 */
interface FarmUserKeys {
    ledger: PublicKey;
    auxiliaryLedgers?: PublicKey[];
    lpTokenAccount: PublicKey;
    rewardTokenAccounts: PublicKey[];
    owner: PublicKey;
}
interface FarmRewardInfo {
    rewardMint: PublicKey;
    rewardPerSecond: BigNumberish;
    rewardOpenTime: BigNumberish;
    rewardEndTime: BigNumberish;
}
interface FarmDepositInstructionParams {
    poolKeys: FarmPoolKeys;
    userKeys: FarmUserKeys;
    amount: BigNumberish;
}
declare type FarmWithdrawInstructionParams = FarmDepositInstructionParams;
interface FarmCreateAssociatedLedgerAccountInstructionParams {
    poolKeys: FarmPoolKeys;
    userKeys: {
        ledger: PublicKey;
        owner: PublicKey;
    };
}
interface FarmCreateInstructionParamsV6 {
    version: 6;
    programId: PublicKey;
    lpMint: PublicKey;
    rewardInfos: {
        rewardMint: PublicKey;
        rewardPerSecond: BigNumberish;
        rewardOpenTime: BigNumberish;
        rewardEndTime: BigNumberish;
    }[];
    lockInfo: {
        lockMint: PublicKey;
        lockVault: PublicKey;
    };
}
declare type FarmCreateInstructionParams = FarmCreateInstructionParamsV6;
interface FarmRestartInstructionParamsV6 {
    connection: Connection;
    poolKeys: FarmPoolKeys;
    userKeys: {
        tokenAccounts: TokenAccount[];
        owner: PublicKey;
        payer?: PublicKey;
    };
    newRewardInfo: FarmRewardInfo;
}
declare type FarmRestartInstructionParams = FarmRestartInstructionParamsV6;
interface FarmCreatorWithdrawRewardInstructionParamsV6 {
    connection: Connection;
    poolKeys: FarmPoolKeys;
    userKeys: {
        tokenAccounts: TokenAccount[];
        owner: PublicKey;
        payer?: PublicKey;
    };
    withdrawMint: PublicKey;
}
declare type FarmCreatorWithdrawRewardInstructionParams = FarmCreatorWithdrawRewardInstructionParamsV6;
interface FarmCreatorAddRewardTokenInstructionParamsV6 {
    connection: Connection;
    poolKeys: FarmPoolKeys;
    userKeys: {
        tokenAccounts: TokenAccount[];
        owner: PublicKey;
        payer?: PublicKey;
    };
    newRewardInfo: FarmRewardInfo;
}
declare type FarmCreatorAddRewardTokenInstructionParams = FarmCreatorAddRewardTokenInstructionParamsV6;
interface makeCreateFarmInstructionParamsV6 {
    connection: Connection;
    userKeys: {
        tokenAccounts: TokenAccount[];
        owner: PublicKey;
        payer?: PublicKey;
    };
    poolInfo: FarmCreateInstructionParams;
}
declare type makeCreateFarmInstructionParams = makeCreateFarmInstructionParamsV6;
interface FarmFetchMultipleInfoParams {
    connection: Connection;
    pools: FarmPoolKeys[];
    owner?: PublicKey;
    config?: GetMultipleAccountsInfoConfig;
}
declare class Farm extends Base {
    static getProgramId(version: number): PublicKey;
    static getVersion(programId: PublicKeyish): FarmVersion;
    static getStateLayout(version: number): FarmStateLayout;
    static getLedgerLayout(version: number): FarmLedgerLayout;
    static getLayouts(version: number): {
        state: FarmStateLayout;
        ledger: FarmLedgerLayout;
    };
    static getAssociatedAuthority({ programId, poolId }: {
        programId: PublicKey;
        poolId: PublicKey;
    }): Promise<{
        publicKey: PublicKey;
        nonce: number;
    }>;
    static getAssociatedLedgerAccount({ programId, poolId, owner, }: {
        programId: PublicKey;
        poolId: PublicKey;
        owner: PublicKey;
    }): Promise<PublicKey>;
    static getAssociatedLedgerPoolAccount({ programId, poolId, mint, type, }: {
        programId: PublicKey;
        poolId: PublicKey;
        mint: PublicKey;
        type: "lpVault" | "rewardVault";
    }): Promise<PublicKey>;
    static makeDepositInstruction(params: FarmDepositInstructionParams): TransactionInstruction;
    static makeDepositInstructionV3({ poolKeys, userKeys, amount }: FarmDepositInstructionParams): TransactionInstruction;
    static makeDepositInstructionV5({ poolKeys, userKeys, amount }: FarmDepositInstructionParams): TransactionInstruction;
    static makeDepositInstructionV6({ poolKeys, userKeys, amount }: FarmDepositInstructionParams): TransactionInstruction;
    static makeWithdrawInstruction(params: FarmWithdrawInstructionParams): TransactionInstruction;
    static makeWithdrawInstructionV3({ poolKeys, userKeys, amount }: FarmWithdrawInstructionParams): TransactionInstruction;
    static makeWithdrawInstructionV5({ poolKeys, userKeys, amount }: FarmWithdrawInstructionParams): TransactionInstruction;
    static makeWithdrawInstructionV6({ poolKeys, userKeys, amount }: FarmWithdrawInstructionParams): TransactionInstruction;
    static makeCreateAssociatedLedgerAccountInstruction(params: FarmCreateAssociatedLedgerAccountInstructionParams): TransactionInstruction;
    static makeCreateAssociatedLedgerAccountInstructionV3({ poolKeys, userKeys, }: FarmCreateAssociatedLedgerAccountInstructionParams): TransactionInstruction;
    static makeCreateAssociatedLedgerAccountInstructionV5({ poolKeys, userKeys, }: FarmCreateAssociatedLedgerAccountInstructionParams): TransactionInstruction;
    static makeCreateFarmInstruction({ connection, userKeys, poolInfo }: makeCreateFarmInstructionParams): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeCreateFarmInstructionV6({ connection, userKeys, poolInfo }: makeCreateFarmInstructionParamsV6): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeRestartFarmInstruction(params: FarmRestartInstructionParams): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeRestartFarmInstructionV6({ connection, poolKeys, userKeys, newRewardInfo, }: FarmRestartInstructionParamsV6): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeCreatorWithdrawFarmRewardInstruction(params: FarmCreatorWithdrawRewardInstructionParams): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeCreatorWithdrawFarmRewardInstructionV6({ connection, poolKeys, userKeys, withdrawMint, }: FarmCreatorWithdrawRewardInstructionParamsV6): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeFarmCreatorAddRewardTokenInstruction(params: FarmCreatorAddRewardTokenInstructionParams): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static makeFarmCreatorAddRewardTokenInstructionV6({ connection, poolKeys, userKeys, newRewardInfo, }: FarmCreatorAddRewardTokenInstructionParamsV6): Promise<{
        newAccounts: Signer[];
        instructions: TransactionInstruction[];
    }>;
    static fetchMultipleInfo({ connection, pools, owner, config }: FarmFetchMultipleInfoParams): Promise<{
        [id: string]: {
            state: FarmState;
            lpVault: SplAccount;
            ledger?: FarmLedger | undefined;
            wrapped?: {
                pendingRewards: bn_js__default[];
            } | undefined;
        };
    }>;
    static fetchMultipleInfoAndUpdate({ connection, pools, owner, config }: FarmFetchMultipleInfoParams): Promise<{
        [id: string]: {
            state: FarmState;
            lpVault: SplAccount;
            ledger?: FarmLedger | undefined;
            wrapped?: {
                pendingRewards: bn_js__default[];
            } | undefined;
        };
    }>;
    static updatePoolInfo(poolInfo: FarmState, lpVault: SplAccount, slot: number, chainTime: number): FarmState;
}

export { Farm, FarmCreateAssociatedLedgerAccountInstructionParams, FarmCreateInstructionParams, FarmCreateInstructionParamsV6, FarmCreatorAddRewardTokenInstructionParams, FarmCreatorAddRewardTokenInstructionParamsV6, FarmCreatorWithdrawRewardInstructionParams, FarmCreatorWithdrawRewardInstructionParamsV6, FarmDepositInstructionParams, FarmFetchMultipleInfoParams, FarmPoolKeys, FarmRestartInstructionParams, FarmRestartInstructionParamsV6, FarmRewardInfo, FarmUserKeys, FarmWithdrawInstructionParams, makeCreateFarmInstructionParams, makeCreateFarmInstructionParamsV6 };
