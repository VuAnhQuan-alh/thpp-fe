import { useSelector } from 'react-redux';

export const GetGatewayPaymentsSelector = () => {
    const gatewayPayments = useSelector((state: any) => state.gatewayPaymentsReducer.gatewayPayments);

    return gatewayPayments;

};

export const CreateTransactionSelector = () => {
    const createTransactionResponse = useSelector((state: any) => state.createTransactionReducer.createTransactionResponse);

    return createTransactionResponse;

};

export const GetDetailTransactionSelector = () => {
    const detailTransaction = useSelector((state: any) => state.getDetailTransactionReducer.detailTransaction);

    return detailTransaction;

};

export const GetCustomerTransactionSelector = () => {
    const customerTransaction = useSelector((state: any) => state.getCustomerTransactionReducer.customerTransaction);

    return customerTransaction;

};

export const GetTransactionErrorSelector = () => {
    const transactionError = useSelector((state: any) => state.getTransactionErrorReducer.transactionError);

    return transactionError;

};

