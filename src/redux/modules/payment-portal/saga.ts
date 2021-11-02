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
    getDetailTransactionFailed,
    getCustomerTransactionSuccess,
    getTransactionErrorSuccess,
    getTransactionErrorFailed,
    getCustomerTransactionFailed,
} from './actions';
import { ResponseGenerator } from 'interfaces';
import { DetailTransactionModel } from 'interfaces/models/detailTransactionModel';
import { mapErrorCodeStringToMsg, mapStatusCodeAPIToMsg, SUCCESS } from 'constants/errorCode';

/// get customer transaction
function* getCustomerTransactionServiceSaga(action: any) {
    try {
        const response: ResponseGenerator
            = yield call(() => paymentPortalServices.getCustomerTransaction(action.payload));
        switch (response.data.code) {
            case SUCCESS:
                yield put(getCustomerTransactionSuccess(response.data));
                break;
            default:
                yield put(getCustomerTransactionFailed(mapErrorCodeStringToMsg(response.data.message)));
        }
    } catch (error) {
        var status = (error as any).response.status;
        if (status) {
            yield put(getCustomerTransactionFailed(mapStatusCodeAPIToMsg(status)));
            return;
        }

        yield put(getCustomerTransactionFailed(error));
    }
}

export function* getCustomerTransactionSaga() {
    yield takeLatest(types.GET_CUSTOMER_TRANSACTION, getCustomerTransactionServiceSaga);
}


/// get gateway payment list 
function* getGatewayPaymentListSaga(action: Action) {
    try {
        const response: ResponseGenerator = yield call(paymentPortalServices.getGatewayPayments);

        switch (response.data.code) {
            case SUCCESS:
                yield put(getGatewayPaymentListSuccess(response.data));
                break;
            default:
                yield put(getGatewayPaymentListFailed(mapErrorCodeStringToMsg(response.data.message)));
        }
    } catch (error) {
        var status = (error as any).response.status;
        if (status) {
            yield put(getGatewayPaymentListFailed(mapStatusCodeAPIToMsg(status)));
            return;
        }
        yield put(getGatewayPaymentListFailed(error));
    }
}

export function* gatewayPaymentsSaga() {
    yield takeLatest(types.REQUEST_LIST_GATEWAY, getGatewayPaymentListSaga);
}

/// create transaction
function* createTransactionServiceSaga(action: any) {
    try {
        const response: ResponseGenerator = yield call(() => paymentPortalServices.createTransaction(action.payload));
        switch (response.data.code) {
            case SUCCESS:
                yield put(createTransactionSuccess(response.data));
                break;
            default:
                yield put(createTransactionFailed(mapErrorCodeStringToMsg(response.data.message)));
        }

    } catch (error) {
        var status = (error as any).response.status;
        if (status) {
            yield put(createTransactionFailed(mapStatusCodeAPIToMsg(status)));
            return;
        }
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
        switch (response.data.code) {
            case SUCCESS:
                yield put(getDetailTransactionSuccess(Object.assign(new DetailTransactionModel(), response.data?.data)));
                break;
            default:
                yield put(getDetailTransactionFailed(mapErrorCodeStringToMsg(response.data.message)));
        }

    } catch (error) {
        var status = (error as any).response.status;
        if (status) {
            yield put(getDetailTransactionFailed(mapStatusCodeAPIToMsg(status)));
            return;
        }
        yield put(getDetailTransactionFailed(error));
    }
}

export function* getDetailTransactionSaga() {
    yield takeLatest(types.GET_DETAIL_TRANSACTION, getDetailTransactionServiceSaga);
}



/// GET TRANSACTION ERROR 
function* getTransactionError(action: any) {
    try {
        const response: ResponseGenerator = yield call(() => paymentPortalServices.getTransactionError(action.payload));
        switch (response.data.code) {
            case SUCCESS:
                yield put(getTransactionErrorSuccess(response.data?.data));
                break;
            default:
                yield put(getTransactionErrorFailed(mapErrorCodeStringToMsg(response.data.message)));
        }

    } catch (error) {
        var status = (error as any).response.status;
        if (status) {
            yield put(getTransactionErrorFailed(mapStatusCodeAPIToMsg(status)));
            return;
        }
        yield put(getTransactionErrorFailed(error));
    }
}

export function* getTransactionErrorSaga() {
    yield takeLatest(types.GET_TRANSACTION_ERRROR, getTransactionError);
}
