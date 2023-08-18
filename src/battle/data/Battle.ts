import { around, logBefore, logAfter } from "./Battle.test";


export class Battle extends BaseData {

    /**
     * 难度系数修正
     */

    @around(logBefore, logAfter)
    public getKFixed(): number {
        ...
            return config.factor08;
    }


}