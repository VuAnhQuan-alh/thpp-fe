import { Card, Radio, Space, Button, Form } from 'antd';
import TextSpan from 'components/TextSpan';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Errror';

import { useDispatch } from 'react-redux';
import { CreateTransactionSelector, GetGatewayPaymentsSelector } from 'redux/selectors';
import { convertNumberToMoney } from 'helpers';

import { createTransaction, getGatewayPaymentList } from 'redux/modules/payment-portal';
import { useRouter } from 'hooks/useRoute';
import { RequestCreateTransactionModel } from 'interfaces/models/requestCreateTransactionModel';
import { GetValidateAccessSelector } from 'redux/selectors/validate-access';
import cookieServices from 'services/cookieServices';
import { RequestFromCustomerModel } from 'interfaces/models/requestFromCustomer';
import { checkValidateAccess } from 'redux/modules/validate-access';


const PaymentPage: React.FC = () => {
  // Get the router object
  const router = useRouter();
  const dispatch = useDispatch();

  // request params state
  const { data: requestParams } = GetValidateAccessSelector();
  const now = new Date();

  console.log('a', JSON.stringify(requestParams));

  // gateway list state
  const { data: gatewayListData, loading: gatewayLoading, error: gatewayListerror } = GetGatewayPaymentsSelector();

  const [value, setValue] = useState('');

  // create transaction state
  const createTransResponse = CreateTransactionSelector();

  useLayoutEffect(() => {
    dispatch(getGatewayPaymentList());
  }, [])

  /// ----------------------------------------------------

  // CREATE PAYMENT
  // Should show loading dialog when create payment
  if (createTransResponse.loading) {
    // return <Loading />;
  }

  // Should show error dialog when create payment has error
  if (createTransResponse.error) {
    // return <ErrorComponent />;
  }


  // ----------------------------------
  // GET GATEWAY LIST

  // Waiting gateway list
  if (gatewayLoading) {
    return <Loading />;
  }

  // Get gateway list error
  if (gatewayListerror) {
    return <ErrorComponent />;
  }


  /// CATCH DIRECT URL FROM PAYMENT METHOD -> PUSH TO NEW URL
  // console.log('Url: ', createTransResponse);
  if (createTransResponse.data?.data != null) {
    window.parent.location.href = createTransResponse.data.data.paymentData;
  }

  // return (
  //   <div>
  //     DATA
  //   </div>
  // );

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  /// Map gateway list to radio group
  const radioPayments = gatewayListData.data.map((aGateway: any) => {
    return <Radio key={aGateway.code} value={aGateway.code}>{aGateway.name}</Radio>
  });

  // SEND CREATE TRANSACTION REQUEST
  const onFinish = (values: any) => {
    if (requestParams != null) {
      requestParams.setAdditionalFields(value);
      dispatch(createTransaction(requestParams.toJSON()));
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
        <TextSpan label="Khách hàng:" value={requestParams?.customerName} />
        <br />
        <TextSpan label="Mã hóa đơn:" value={requestParams?.orderInfo} />
        <br />
        <TextSpan label="Ngày hóa đơn:" value={now.toLocaleDateString()} />
        <br />
        <TextSpan label="Sản phẩm/Dịch vụ:" value={requestParams?.serviceName} />
        <br />
        <TextSpan label="Tổng tiền thanh toán:" value={convertNumberToMoney(requestParams?.amount!, requestParams?.locale!, requestParams?.currency!)} />
        <br />
      </Card>

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="gatewayPayment"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn phương thức thanh toán!',
            },
          ]}
        >
          <Card title="Phương thức thanh toán" >

            <Radio.Group onChange={onChange} value={value}>
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
