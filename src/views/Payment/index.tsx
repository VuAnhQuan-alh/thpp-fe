
import { useDispatch } from 'react-redux';
import { Card, Radio, Space, Button, Form, Modal, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TextSpan from 'components/TextSpan';
import React, { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Errror';

import { CreateTransactionSelector, GetCustomerTransactionSelector, GetGatewayPaymentsSelector } from 'redux/selectors';
import { convertNumberStringToMoney, convertNumberToMoney, dateToStringDefault, toCallbackQueryParams } from 'helpers';
import { createTransaction, getCustomerTransaction, getGatewayPaymentList } from 'redux/modules/payment-portal';
import { RequestCreateTransactionModel } from 'interfaces/models/requestCreateTransactionModel';
import { GetValidateAccessSelector } from 'redux/selectors/validate-access';
import cookieServices, { CALLBACK_URL } from 'services/cookieServices';
import { ERROR_CUSTOMER_CANCEL, mapErrorCodeToMsg } from 'constants/errorCode';
import URL_LOGO from "../../styles/img/logo-truehope.png"

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
    // dispatch(getCustomerTransaction('608'));
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
        title: 'L???i',
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
      title: 'Th??ng b??o',
      content: 'B???n mu???n h???y giao d???ch n??y?',
      icon: <ExclamationCircleOutlined />,
      okText: '?????ng ??',
      okType: 'danger',
      cancelText: 'H???y b???',
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

  const dataDetail = requestTransaction?.dataDetail.dataView;

  const columns = [
    {
      title: 'S???n ph???m/D???ch v???',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'S??? l?????ng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '????n gi??',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Th??nh ti???n',
      dataIndex: 'amount',
      key: 'amount',
      align: "right"
    },
  ];

  // Render
  return (
    <div className="page-content" style={{ maxWidth: "992px", margin: "0px auto", padding: "0px 24px" }}>
      <Row style={{ background: "white", padding: "16px 18px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={URL_LOGO} alt="Logo True Hope" style={{ width: "100%", maxWidth: "230px" }} />
          <div style={{ width: "3px", height: "36px", background: "#38B2A4", margin: "0px 12px" }}>&nbsp;</div>
          <div style={{ color: "#38B2A4", fontWeight: "bold" }}>Thanh To??n</div>
        </div>
      </Row>
      <Card bordered={false}>
        <Row style={{ fontWeight: "bold", fontSize: "18px", color: "#38B2A4" }}>Th??ng tin h??a ????n</Row>
        <Row>
          <TextSpan style={{ width: "100%", maxWidth: "520px" }} label="Kh??ch h??ng:" value={requestTransaction?.customerName} />
          <TextSpan label="M?? h??a ????n:" value={requestTransaction?.orderInfo} />
        </Row>
        <Row>
          <TextSpan style={{ width: "100%", maxWidth: "520px" }} label="S???n ph???m/D???ch v???:" value={requestTransaction?.serviceName} />
          <TextSpan label="Ng??y h??a ????n:" value={dateToStringDefault(now)} />
        </Row>
      </Card>

      <Card bordered={false}>
        <Row style={{ fontWeight: "bold", fontSize: "18px", color: "#38B2A4" }}>Chi ti???t h??a ????n</Row>
        {dataDetail.services?.length != 0 ?
          // @ts-ignore
          <Table dataSource={dataDetail.services} columns={columns} pagination={false} /> : null}
        <TextSpan
          label="Th??nh ti???n:"
          style={{ display: "flex", justifyContent: "end", alignItem: "center", marginTop: "12px", marginRight: "16px" }}
          color="#38B2A4"
          ml="8px"
          value={convertNumberToMoney(
            requestTransaction.actualAmount(),
            requestTransaction?.locale!,
            requestTransaction?.currency!)}
        />
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
              message: 'Vui l??ng ch???n ph????ng th???c thanh to??n!',
            },
          ]}
        >
          <Card>
            <Row style={{ fontWeight: "bold", fontSize: "18px", color: "#38B2A4" }}>Ph????ng th???c thanh to??n</Row>
            <Radio.Group onChange={onChange} value={gatewayCode}>
              <Space direction="vertical">
                {radioPayments}
              </Space>
            </Radio.Group>

          </Card>
        </Form.Item>
        <Card bordered={false} style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
          {dataDetail.discountCode ? <TextSpan style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }} label="M?? gi???m gi??:" value={dataDetail.discountCode} /> : null}
          <TextSpan
            label="Th??nh ti???n:"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}
            value={convertNumberToMoney(
              requestTransaction.actualAmount(),
              requestTransaction?.locale!,
              requestTransaction?.currency!)} />
          <TextSpan
            label="Gi???m gi??:"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}
            value={convertNumberStringToMoney(
              dataDetail.discountAmount ?? '0',
              requestTransaction?.locale!,
              requestTransaction?.currency!)} />
          <TextSpan
            label="T???ng ti???n thanh to??n:"
            style={{ width: "100%", maxWidth: "320px", display: "flex", alignItems: "center" }}
            fS="23px"
            ml="15px"
            color="#38B2A4"
            value={convertNumberStringToMoney(
              requestTransaction?.amount!,
              requestTransaction?.locale!,
              requestTransaction?.currency!)} />
        </Card>
        <Form.Item>
          <div className="center" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Button style={{ background: "#38B2A4", fontWeight: "bold", color: "white", borderRadius: "4px", border: "none" }} size="large" className="ant-btn-red" onClick={cancelTransaction}>
              H???y
            </Button>

            <Button style={{ background: "#38B2A4", fontWeight: "bold", border: "none", color: "#1E4A9D" }} size="large" htmlType="submit">
              Ti???p t???c
            </Button>

          </div>
        </Form.Item>
      </Form>
    </div >
  );
};
export default PaymentPage;
