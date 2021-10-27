import { Card, Radio, Space, Button, Form } from 'antd';
import TextSpan from 'components/TextSpan';
import React, { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Errror';

import { useDispatch } from 'react-redux';
import { CreateTransactionSelector, GetCustomerTransactionSelector, GetGatewayPaymentsSelector } from 'redux/selectors';
import { convertNumberToMoney } from 'helpers';

import { createTransaction, getCustomerTransaction, getGatewayPaymentList } from 'redux/modules/payment-portal';
import { RequestCreateTransactionModel } from 'interfaces/models/requestCreateTransactionModel';
import { GetValidateAccessSelector } from 'redux/selectors/validate-access';


const PaymentPage: React.FC = () => {
  // Get the router object
  const dispatch = useDispatch();

  var requestTransaction: RequestCreateTransactionModel;

  // request params state
  const { data: queryParams } = GetValidateAccessSelector();
  const now = new Date();

  // customer transaction state
  const {
    loading: customerTransLoading,
    data: customerTransData,
    error: customerTransError
  } = GetCustomerTransactionSelector();

  // gateway list state
  const {
    data: gatewayListData,
    loading: gatewayLoading,
    error: gatewayListerror
  } = GetGatewayPaymentsSelector();

  const [gatewayCode, setGatewayCode] = useState('');

  // create transaction state
  const createTransResponse = CreateTransactionSelector();

  /// GET CUSTOMER TRANSACTION
  useEffect(() => {
    dispatch(getCustomerTransaction(queryParams.transactionId));
  }, [queryParams])

  /// GET GATEWAY PAYMENT LIST
  useEffect(() => {
    if (customerTransData) {
      dispatch(getGatewayPaymentList());
    }
  }, [customerTransData])

  /// ----------------------------------------------------

  if (customerTransLoading || gatewayLoading) {
    return <Loading />;
  }

  if (gatewayListerror || customerTransError) {
    return <ErrorComponent />;
  }

  requestTransaction = Object.assign(new RequestCreateTransactionModel(), customerTransData.data);

  // CREATE PAYMENT
  // Should show loading dialog when create payment
  if (createTransResponse.loading) {
    // return <Loading />;
  }

  // Should show error dialog when create payment has error
  if (createTransResponse.error) {
    // return <ErrorComponent />;
  }

  /// CATCH DIRECT URL FROM PAYMENT METHOD -> PUSH TO NEW URL
  if (createTransResponse.data?.data != null) {
    window.parent.location.href = createTransResponse.data.data.paymentData;
  }

  const onChange = (e: any) => {
    setGatewayCode(e.target.value);
  };

  /// Map gateway list to radio group
  const radioPayments = gatewayListData.data.map((aGateway: any) => {
    return <Radio key={aGateway.code} value={aGateway.code}>{aGateway.name}</Radio>
  });

  // SEND CREATE TRANSACTION REQUEST
  const onFinish = (values: any) => {
    if (requestTransaction != null) {
      requestTransaction.setAdditionalFields(gatewayCode);
      dispatch(createTransaction(requestTransaction.toJSON()));
    }
  };

  // Valid radio group
  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };


  // Render
  return (
    <div className="page-content">
      <Card title="Thông tin thanh toán" bordered={false} style={{ width: 300 }}>
        <TextSpan label="Khách hàng:" value={requestTransaction?.customerName} />
        <br />
        <TextSpan label="Mã hóa đơn:" value={requestTransaction?.orderInfo} />
        <br />
        <TextSpan label="Ngày hóa đơn:" value={now.toLocaleDateString()} />
        <br />
        <TextSpan label="Sản phẩm/Dịch vụ:" value={requestTransaction?.serviceName} />
        <br />
        <TextSpan
          label="Tổng tiền thanh toán:"
          value={convertNumberToMoney(
            requestTransaction?.amount!,
            requestTransaction?.locale!,
            requestTransaction?.currency!)} />
        <br />
      </Card>

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="gatewayPayment"ư
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn phương thức thanh toán!',
            },
          ]}
        >
          <Card title="Phương thức thanh toán" >

            <Radio.Group onChange={onChange} value={gatewayCode}>
              <Space direction="vertical">
                {radioPayments}
              </Space>
            </Radio.Group>

          </Card>
        </Form.Item>
        <Form.Item>
          <div className="center" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Button type="primary" shape="round" size="large" className="ant-btn-red">
              Hủy
            </Button>

            <Button type="primary" shape="round" size="large" htmlType="submit">
              Tiếp tục
            </Button>

          </div>
        </Form.Item>
      </Form>
    </div >
  );
};
export default PaymentPage;
