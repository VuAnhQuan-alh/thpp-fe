import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';

const Header: React.FC = (props) => {
  return (
    <PageHeader
      className="header"
      onBack={() => null}
      backIcon={false}
      title="True Hope"
      subTitle="Cổng thanh toán True Hope"
    />
  );
};

export default Header;
