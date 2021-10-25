import React, { useEffect } from 'react';
import { queryParamsToJsonObject } from 'helpers';
import { ReturnTransactionModel } from 'interfaces/models/returnTransactionModel';

import { Result, Button } from 'antd';

import { useDispatch } from 'react-redux';
import { GetDetailTransactionSelector } from 'redux/selectors';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Errror';
import { getDetailTransaction } from 'redux/modules/payment-portal';
import TextSpan from 'components/TextSpan';
import { useRouter } from 'hooks/useRoute';
import { RequestCreateTransactionModel } from 'interfaces/models/requestCreateTransactionModel';


const ReturnTransactionPage = (props: any) => {
    const router = useRouter();
    let clientWithType = Object.assign(new ReturnTransactionModel(), router.query)

    const dispatch = useDispatch();
    const detailTransaction = GetDetailTransactionSelector();


    useEffect(() => {
        // if (clientWithType.vnp_ResponseCode == '00') {
        dispatch(getDetailTransaction(clientWithType.vnp_TxnRef));
        // }
    }, []);


    if (detailTransaction.loading) {
        return <Loading />;
    }

    if (detailTransaction.error) {
        return <ErrorComponent />;
    }


    return (
        <div>
            <Result
                status={clientWithType.vnp_ResponseCode == '00' ? "success" : "error"}
                title={detailTransaction.data.message}
                extra={[
                    <Button type="primary" key="console">
                        Trở về
                    </Button>,
                ]}
            >
                <div style={{ alignContent: "center", justifyItems: "center", textAlign: "center" }}>
                    <TextSpan label="Mã đơn hàng:" value={detailTransaction.data.orderInfo} />
                    <br />
                    <TextSpan label="Mã giao dịch:" value={detailTransaction.data.transactionNo} />
                    <br />
                    <TextSpan label="Ngày giao dịch:" value={detailTransaction.data.payDate} />
                    <br />
                    <TextSpan label="Phương thức giao dịch:" value={detailTransaction.data.gatewayCode} />
                    <br />
                    <TextSpan label="Tổng tiền thanh toán:" value={detailTransaction.data.amount} />
                    <br />
                </div>
            </Result>
        </div>
    );
}

export default ReturnTransactionPage;