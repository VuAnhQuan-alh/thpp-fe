import * as types from 'redux/types';
import { DetailTransactionModel } from 'interfaces/models/detailTransactionModel';

// get payment portal
export const getGatewayPaymentList = () => ({
    type: types.REQUEST_LIST_GATEWAY
});

export const getGatewayPaymentListSuccess = (payload: any) => ({
    type: types.REQUEST_LIST_GATEWAY_SUCCESS,
    payload,
});

export const getGatewayPaymentListFailed = (payload: any) => ({
    type: types.REQUEST_LIST_GATEWAY_FAILED,
    payload: payload,
});


// create transaction

export const createTransaction = (payload: any) => ({
    type: types.CREATE_TRANSACTION,
    payload
});

export const createTransactionSuccess = (payload: any) => ({
    type: types.CREATE_TRANSACTION_SUCCESS,
    payload,
});

export const createTransactionFailed = (payload: any) => ({
    type: types.CREATE_TRANSACTION_FAILED,
    payload,
});


// get detail transaction
export const getDetailTransaction = (payload: any) => ({
    type: types.GET_DETAIL_TRANSACTION,
    payload
});

export const getDetailTransactionSuccess = (payload: DetailTransactionModel) => ({
    type: types.GET_DETAIL_TRANSACTION_SUCCESS,
    payload,
});

export const getDetailTransactionFailed = (payload: any) => ({
    type: types.GET_DETAIL_TRANSACTION_FAILED,
    payload,
});
