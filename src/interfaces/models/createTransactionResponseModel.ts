export interface CreateTransactionResponseModel{
    error: string;
    message: string;
    status: string;
    code: string;
    data: DataCreateTransaction
}

export interface DataCreateTransaction{
    type: string;
    method: string;
    paymentData: string;
}