import ReducerInterface from 'interfaces/reducerInterface';
import produce from 'immer';
import * as types from 'redux/types';

const customerTransactionState = {
    customerTransaction: {
        data: null,
        loading: true,
        error: null,
    }
}

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
        loading: false,
        error: null
    }
};

const detailTransactionState = {
    detailTransaction: {
        data: null,
        loading: false,
        error: null,
    },
};

const transactionErrorState = {
    transactionError: {
        data: null,
        loading: false,
        error: null,
    },
};


// get getway payment list 
export const getCustomerTransactionReducer = (state = customerTransactionState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.GET_CUSTOMER_TRANSACTION:
                draftState.customerTransaction.loading = true;
                draftState.customerTransaction.error = null;
                break;

            case types.GET_CUSTOMER_TRANSACTION_SUCCESS:
                draftState.customerTransaction.loading = false;
                draftState.customerTransaction.data = action.payload;
                break;

            case types.GET_CUSTOMER_TRANSACTION_FAILED:
                draftState.customerTransaction.loading = false;
                draftState.customerTransaction.error = action.payload;
                break;

            default:
                break;
        }
    });
};



// get getway payment list 
export const gatewayPaymentsReducer = (state = initialGatewayPaymentState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.REQUEST_LIST_GATEWAY:
                draftState.gatewayPayments.loading = true;
                draftState.gatewayPayments.error = null;
                break;

            case types.REQUEST_LIST_GATEWAY_SUCCESS:
                draftState.gatewayPayments.loading = false;
                draftState.gatewayPayments.data = action.payload;
                break;

            case types.REQUEST_LIST_GATEWAY_FAILED:
                draftState.gatewayPayments.loading = false;
                draftState.gatewayPayments.error = action.payload;
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
                draftState.createTransactionResponse.error = null;
                break;

            case types.CREATE_TRANSACTION_SUCCESS:
                draftState.createTransactionResponse.loading = false;
                draftState.createTransactionResponse.data = action.payload;
                break;

            case types.CREATE_TRANSACTION_FAILED:
                draftState.createTransactionResponse.loading = false;
                draftState.createTransactionResponse.error = action.payload;
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
                draftState.detailTransaction.error = null;
                break;

            case types.GET_DETAIL_TRANSACTION_SUCCESS:
                draftState.detailTransaction.loading = false;
                draftState.detailTransaction.data = action.payload;
                break;

            case types.GET_DETAIL_TRANSACTION_FAILED:
                draftState.detailTransaction.loading = false;
                draftState.detailTransaction.error = action.payload;
                break;

            default:
                break;
        }
    });
};


// get transaction error
export const getTransactionErrorReducer = (state = transactionErrorState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.GET_TRANSACTION_ERRROR:
                draftState.transactionError.loading = true;
                draftState.transactionError.error = null;
                break;

            case types.GET_TRANSACTION_ERRROR_SUCCESS:
                draftState.transactionError.loading = false;
                draftState.transactionError.data = action.payload;
                break;

            case types.GET_TRANSACTION_ERRROR_FAILED:
                draftState.transactionError.loading = false;
                draftState.transactionError.error = action.payload;
                break;

            default:
                break;
        }
    });
};