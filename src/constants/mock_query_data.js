const mockQueryUserSent = {
    "windowType": "0",
    "chanelType": 1,
    "ipAddress": "12.123.12.2.2",
    "token": "TRUEHOPE ConnectId=7e41c1015ef74c129e8e8ab20d75bf01,Timestamp=1634634229,Signature=44bbc946fdf21e3cc3456df5aff3bb766bceef4e4a34ef24245ef2cb6a258aba",
    "customerName": "Nguyen Van A",
    "phone": "1231312",
    "orderInfo": "212379",
    "amount": "3780000",
    "currency": "VND",
    "locale": "vi",
    "serviceCode": "KTQ",
    "serviceName": "Khám tổng quát",
    "hospitalType": 1,
    "hospitalName": "Bệnh viện True Hope",
    "dataDetail": {}
}

// 
// expDate
// ipAddress
// description
// gatewayCode
// return , again, cancel

const mockTransactionData = {
    "windowType": "0",
    "windowColor": "#ef5459",
    "orderInfo": "212369",
    "amount": "111111",
    "expDate": "1633460717",
    "description": "than khong ban",
    "gatewayCode": "VNPAY",
    "ipAddress": "12.123.12.2.2",
    "returnUrl": "http://localhost:3001/transaction/return",
    "againLink": "http://localhost:3001/transaction/return",
    "cancelUrl": "http://localhost:3001/transaction/return",
    "hospitalType": 1,
    "hospitalName": "Bệnh viện True Hope",
    "chanelType": 1,
    "customerName": "Nguyen Van A",
    "phone": "1231312",
    "serviceCode": "KTQ",
    "serviceName": "Khám tổng quát",
    "dataDetail": {}
};

const mockQueryUserSentString = new URLSearchParams(mockQueryUserSent).toString();

export { mockQueryUserSentString, mockTransactionData, mockQueryUserSent };