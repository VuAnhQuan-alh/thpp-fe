export class ReturnTransactionModel {
    constructor() { }
    vnp_Amount: string | undefined;
    vnp_BankCode: string | undefined;

    vnp_BankTranNo: string | undefined;

    vnp_CardType: string | undefined;
    vnp_OrderInfo: string | undefined;
    vnp_PayDate: string | undefined;
    vnp_ResponseCode: string | undefined;
    vnp_TmnCode: string | undefined;
    vnp_TransactionNo: string | undefined;
    vnp_TransactionStatus: string | undefined;
    vnp_TxnRef: string | undefined;
    vnp_SecureHash: string | undefined;

    isSuccess(){
        return this.vnp_ResponseCode!=null && parseInt(this.vnp_ResponseCode) == 0;
    }

    toCallbackQueryParams(transactionId: string, description: string) {
        const params = {
            "vnp_ResponseCode": this.vnp_ResponseCode ?? '',
            "transactionId": transactionId,
            "description": description
        };

        return new URLSearchParams(params).toString();
    }
}