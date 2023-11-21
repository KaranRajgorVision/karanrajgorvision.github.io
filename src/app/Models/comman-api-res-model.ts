export interface IAllApiResponce {
    isSuccess: boolean;
    errorMessage: string;
    timestamp: Date;
    responseIdentifier: string;
    payload: any;
}