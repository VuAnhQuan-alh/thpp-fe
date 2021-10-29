export class DetailTransactionModel{
    constructor(){}
    amount: BigInteger | undefined;
    code: string| undefined;

    currencyCode: string| undefined;

    gatewayCode:  string| undefined;
    locale:string| undefined;
    message: string| undefined;
    orderInfo: string| undefined;
    payDate: string| undefined;
    qrData: string| undefined;
    statusSys: string| undefined;
    transactionNo: string| undefined;
    txnRef:string| undefined;
}