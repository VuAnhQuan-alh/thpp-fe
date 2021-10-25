import { Action } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from 'redux/types';
import paymentPortalServices from 'services/paymentPortalServices';
import {
    getGatewayPaymentListSuccess,
    getGatewayPaymentListFailed,
    createTransactionSuccess,
    createTransactionFailed,
    getDetailTransactionSuccess,
    getDetailTransactionFailed
} from './actions';
import { ResponseGenerator } from 'interfaces';
import { DetailTransactionModel } from 'interfaces/models/detailTransactionModel';

/// get gateway payment list 
function* getGatewayPaymentListSaga(action: Action) {
    try {
        const response: ResponseGenerator = yield call(paymentPortalServices.getGatewayPayments);
        console.log(response);
        yield put(getGatewayPaymentListSuccess(response.data));
    } catch (error) {
        yield put({ type: types.GET_DETAIL_TRANSACTION_FAILED, error });
    }
}

export function* gatewayPaymentsSaga() {
    yield takeLatest(types.REQUEST_LIST_GATEWAY, getGatewayPaymentListSaga);
}

/// create transaction
function* createTransactionServiceSaga(action: any) {
    try {
        const response: ResponseGenerator = yield call(() => paymentPortalServices.createTransaction(action.payload));
        console.log(response);
        yield put(createTransactionSuccess(response.data));
    } catch (error) {
        console.log(error);
        yield put(createTransactionFailed(error));
    }
}

export function* createTransactionSaga() {
    yield takeLatest(types.CREATE_TRANSACTION, createTransactionServiceSaga);
}

/// GET DETAIL TRANSACTION 
/// create transaction
function* getDetailTransactionServiceSaga(action: any) {
    try {
        const response: ResponseGenerator = yield call(() => paymentPortalServices.getDetailTransaction(action.payload));
        console.log(response);
        switch (response.data.code) {
            case '0':
                yield put(getDetailTransactionSuccess(Object.assign(new DetailTransactionModel(), response.data?.data)));
                break;
            default:
                yield put(getDetailTransactionFailed(response.data.message));
        }

    } catch (error) {
        console.log(error);
        yield put(getDetailTransactionFailed(error));
    }
}

export function* getDetailTransactionSaga() {
    yield takeLatest(types.GET_DETAIL_TRANSACTION, getDetailTransactionServiceSaga);
}
