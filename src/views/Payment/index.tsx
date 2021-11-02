
import { useDispatch } from 'react-redux';
import { Card, Radio, Space, Button, Form, Modal } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TextSpan from 'components/TextSpan';
import React, { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Errror';

import { CreateTransactionSelector, GetCustomerTransactionSelector, GetGatewayPaymentsSelector } from 'redux/selectors';
import { convertNumberToMoney, toCallbackQueryParams } from 'helpers';
import { createTransaction, getCustomerTransaction, getGatewayPaymentList } from 'redux/modules/payment-portal';
import { RequestCreateTransactionModel } from 'interfaces/models/requestCreateTransactionModel';
import { GetValidateAccessSelector } from 'redux/selectors/validate-access';
import cookieServices, { CALLBACK_URL } from 'services/cookieServices';
import { ERROR_CUSTOMER_CANCEL, mapErrorCodeToMsg } from 'constants/errorCode';

const { confirm } = Modal;


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
  const {
    data: createTrans,
    loading: createTransLoading,
    error: createTransError
  } = CreateTransactionSelector();


  /// ----------------------------------------------------
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

  useEffect(() => {
    // Should show error dialog when create payment has error
    if (createTransError) {
      Modal.error({
        title: 'Lỗi',
        content: createTransError,
      });
    }
  }, [createTransError])

  /// ----------------------------------------------------


  if (gatewayListerror) {
    return <ErrorComponent message={gatewayListerror} />;
  }

  if (customerTransError) {
    return <ErrorComponent message={customerTransError} />;
  }


  if (customerTransLoading || gatewayLoading) {
    return <Loading />;
  }

  // CREATE PAYMENT
  // Should show loading dialog when create payment
  if (createTransLoading) {
    // return <Loading />;
  }

  requestTransaction = Object.assign(new RequestCreateTransactionModel(), customerTransData.data);


  /// CATCH DIRECT URL FROM PAYMENT METHOD -> PUSH TO NEW URL
  if (createTrans?.data != null) {
    window.parent.location.href = createTrans.data.paymentData;
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
  const onFinishFailed = (errorInfo: any) => { };

  const cancelTransaction = () => {
    confirm({
      title: 'Thông báo',
      content: 'Bạn muốn hủy giao dịch này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk() {
        const callbackURL = cookieServices.getCookie(CALLBACK_URL);
        window.parent.location.href
          = `${callbackURL}?${toCallbackQueryParams(
            ERROR_CUSTOMER_CANCEL,
            requestTransaction.orderInfo,
            mapErrorCodeToMsg(ERROR_CUSTOMER_CANCEL),
          )}`;
      },
    });
  }


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
          name="gatewayPayment"
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
            <Button type="primary" shape="round" size="large" className="ant-btn-red" onClick={cancelTransaction}>
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
