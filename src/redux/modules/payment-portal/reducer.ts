import ReducerInterface from 'interfaces/reducerInterface';
import produce from 'immer';
import * as types from 'redux/types';

const initialGatewayPaymentState = {
    gatewayPayments: {
        data: null,
        loading: true,
        error: null,
    },
};

const createTransactionState = {
    createTransactionResponse: {
        data: null,
        loading: true,
        error: null
    }
};

const detailTransactionState = {
    detailTransaction: {
        data: [],
        loading: true,
        error: null,
    },
};


// get getway payment list 
export const gatewayPaymentsReducer = (state = initialGatewayPaymentState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.REQUEST_LIST_GATEWAY:
                draftState.gatewayPayments.loading = true;
                break;

            case types.REQUEST_LIST_GATEWAY_SUCCESS:
                draftState.gatewayPayments.loading = false;
                draftState.gatewayPayments.data = action.payload;
                break;

            case types.REQUEST_LIST_GATEWAY_FAILED:
                draftState.gatewayPayments.loading = false;
                draftState.gatewayPayments.error = action.error;
                break;

            default:
                break;
        }
    });
};


// create transaction
export const createTransactionReducer = (state = createTransactionState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.CREATE_TRANSACTION:
                draftState.createTransactionResponse.loading = true;
                break;

            case types.CREATE_TRANSACTION_SUCCESS:
                draftState.createTransactionResponse.loading = false;
                draftState.createTransactionResponse.data = action.payload;
                break;

            case types.CREATE_TRANSACTION_FAILED:
                draftState.createTransactionResponse.loading = false;
                draftState.createTransactionResponse.error = action.error;
                break;

            default:
                break;
        }
    });
};


// get detail transaction
export const getDetailTransactionReducer = (state = detailTransactionState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.GET_DETAIL_TRANSACTION:
                draftState.detailTransaction.loading = true;
                break;

            case types.GET_DETAIL_TRANSACTION_SUCCESS:
                draftState.detailTransaction.loading = false;
                draftState.detailTransaction.data = action.payload;
                break;

            case types.GET_DETAIL_TRANSACTION_FAILED:
                draftState.detailTransaction.loading = false;
                draftState.detailTransaction.error = action.error;
                break;

            default:
                break;
        }
    });
};