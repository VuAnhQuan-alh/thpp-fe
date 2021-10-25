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
    const createTransactionResponse = useSelector((state: any) => state.getDetailTransactionReducer.detailTransaction);

    return createTransactionResponse;

};

