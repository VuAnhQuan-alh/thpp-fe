import httpService from './httpServices';
import { GET_GATEWAY_PAYMENT_URL, POST_A_TRANSACTION_URL, GET_DETAIL_TRANSACTION_URL } from 'constants/api';
import cookieServices from './cookieServices';
// const token = 'TRUEHOPE ConnectId=7e41c1015ef74c129e8e8ab20d75bf01,Timestamp=1634271531,Signature=784ad0dfae4638aeea956df46cf480b1112c1e7c6e7fc7b540550a3a52587661';

class PaymentPortalServices {
    getGatewayPayments() {
        httpService.attachTokenToHeader(cookieServices.getCookie('token'));
        return httpService.get(GET_GATEWAY_PAYMENT_URL);
    }

    createTransaction(payload: any) {
        httpService.attachTokenToHeader(cookieServices.getCookie('token'));
        return httpService.post(POST_A_TRANSACTION_URL, payload);
    }

    getDetailTransaction(txnRef: any) {
        httpService.attachTokenToHeader(cookieServices.getCookie('token'));
        return httpService.get(GET_DETAIL_TRANSACTION_URL + '/' + txnRef);
    }
}

export default new PaymentPortalServices();