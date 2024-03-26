export type UserInformation = {
    UserID: string;
    CreateBingoNum: number;
    FinishedBingoNum: number;
};

export type BingoSquareInformation = {
    storeName?: string
    src?: string
}

export type StoreEvaluationProps = {
    taste?: number
    atmosphere?: number
    costPerformance?: number
}

export type BingoSquareModalProps = {
    src?: string
    storeName: string
} & StoreEvaluationProps;