import { JsonFileMetaData } from '../common/json-file.js';
import { f as LpTokenInfo, S as SplTokenInfo } from '../type-b5eab5c3.js';

declare type FarmVersion = 3 | 4 | 5 | 6;
interface FarmPoolBaseInfo {
    readonly id: string;
    readonly lp: LpTokenInfo | SplTokenInfo;
    readonly version: number;
}
interface FarmPoolJsonInfoV1 {
    readonly id: string;
    readonly lpMint: string;
    readonly rewardMints: string[];
    readonly version: number;
    readonly programId: string;
    readonly authority: string;
    readonly lpVault: string;
    readonly rewardVaults: string[];
}
interface rewardInfoV3V4V5 {
    readonly rewardMint: string;
    readonly rewardVault: string;
}
interface rewardInfoV6 {
    readonly rewardMint: string;
    readonly rewardVault: string;
    readonly openTime: number;
    readonly endTime: number;
    readonly perSecond: number;
}
interface FarmPoolJsonInfoV3V4V5 {
    readonly id: string;
    readonly lpMint: string;
    readonly version: 3 | 4 | 5;
    readonly programId: string;
    readonly authority: string;
    readonly lpVault: string;
    readonly upcoming: boolean;
    readonly rewardInfos: rewardInfoV3V4V5[];
}
interface FarmPoolJsonInfoV6 {
    readonly id: string;
    readonly lpMint: string;
    readonly version: 6;
    readonly programId: string;
    readonly authority: string;
    readonly lpVault: string;
    readonly rewardPeriodMax: number;
    readonly rewardPeriodMin: number;
    readonly rewardPeriodExtend: number;
    readonly creator: string;
    readonly upcoming: boolean;
    readonly rewardInfos: rewardInfoV6[];
}
declare type FarmPoolJsonInfo = FarmPoolJsonInfoV3V4V5 | FarmPoolJsonInfoV6;
interface FarmPoolsJsonFile extends JsonFileMetaData {
    readonly official: FarmPoolJsonInfoV1[];
}

export { FarmPoolBaseInfo, FarmPoolJsonInfo, FarmPoolJsonInfoV1, FarmPoolJsonInfoV3V4V5, FarmPoolJsonInfoV6, FarmPoolsJsonFile, FarmVersion };
