import React, { useEffect } from 'react';
import { ReturnTransactionModel } from 'interfaces/models/returnTransactionModel';

import { Result, Button } from 'antd';

import { useDispatch } from 'react-redux';
import { GetDetailTransactionSelector, GetTransactionErrorSelector } from 'redux/selectors';
import Loading from 'components/Loading';
import { getDetailTransaction, getTransactionError } from 'redux/modules/payment-portal';
import TextSpan from 'components/TextSpan';
import { useRouter } from 'hooks/useRoute';
import cookieServices, { CALLBACK_URL } from 'services/cookieServices';
import { DetailTransactionModel } from 'interfaces/models/detailTransactionModel';
import { toCallbackQueryParams } from 'helpers';


const ReturnTransactionPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let clientWithType = Object.assign(new ReturnTransactionModel(), router.query)

    const { data: transaction, error: transError, loading: transLoading } = GetDetailTransactionSelector();
    const { data: transErrorData, error: transErrorFailed, loading: transErrorLoading } = GetTransactionErrorSelector();

    // get detail transaction
    useEffect(() => {
        dispatch(getDetailTransaction(clientWithType.vnp_TxnRef));
    }, []);

    // map error message
    useEffect(() => {
        if (transaction && !clientWithType.isSuccess()) {
            dispatch(getTransactionError({
                errorCode: clientWithType.vnp_ResponseCode,
                gateway: transaction.gatewayCode
            }));
        }

    }, [transaction]);

    if (transLoading || transErrorLoading) {
        return <Loading />;
    }

    const detailTransaction = Object.assign(new DetailTransactionModel(), transaction);

    const getDescription = (): string => {
        return clientWithType.isSuccess() ? 'Giao dịch thành công'
            : transErrorData?.description ?? 'Đã xảy ra lỗi';
    }

    // navigator portal web to customer view by callback URL
    const doneClicked = () => {
        const callbackURL = cookieServices.getCookie(CALLBACK_URL);
        window.parent.location.href
            = `${callbackURL}?${toCallbackQueryParams(
                clientWithType.vnp_ResponseCode!,
                detailTransaction.orderInfo,
                getDescription(),
            )}`;
    }

    return (
        <div>
            <Result
                status={clientWithType.isSuccess() ? "success" : "error"}
                title={getDescription()}
                extra={[
                    <Button type="primary" key="console" onClick={doneClicked} >
                        Hoàn thành
                    </Button>,
                ]}
            >
                {/* <div style={{ alignContent: "center", justifyItems: "center", textAlign: "center" }}>
                    <TextSpan label="Mã đơn hàng:" value={detailTransaction.orderInfo} />
                    <br />
                    <TextSpan label="Mã giao dịch:" value={detailTransaction.transactionNo} />
                    <br />
                    <TextSpan label="Ngày giao dịch:" value={detailTransaction.payDate} />
                    <br />
                    <TextSpan label="Phương thức giao dịch:" value={detailTransaction.gatewayCode} />
                    <br />
                    <TextSpan label="Tổng tiền thanh toán:" value={detailTransaction.amount} />
                    <br />
                </div> */}
            </Result>
        </div>
    );
}

export default ReturnTransactionPage;