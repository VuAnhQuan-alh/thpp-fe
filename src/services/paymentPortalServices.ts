import httpService from './httpServices';
import { GET_GATEWAY_PAYMENT_URL, POST_A_TRANSACTION_URL, GET_DETAIL_TRANSACTION_URL, GET_CUSTOMER_TRANSACTION_URL, GET_TRANSACTION_ERROR_URL } from 'constants/api';
import cookieServices from './cookieServices';

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
    
    getCustomerTransaction(transId: string) {
        httpService.attachTokenToHeader(cookieServices.getCookie('token'));
        return httpService.get(`${GET_CUSTOMER_TRANSACTION_URL}/${transId}`);
    }

    getTransactionError(payload: string) {
        httpService.attachTokenToHeader(cookieServices.getCookie('token'));
        return httpService.post(GET_TRANSACTION_ERROR_URL, payload);
    }

}

export default new PaymentPortalServices();