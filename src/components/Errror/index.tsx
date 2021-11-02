import React from 'react';
import 'antd/dist/antd.css';

const ErrorComponent = (props: any) => {
    const { message } = props;

    return (
        <div>
            Error: {message}
        </div>
    );
};

export default ErrorComponent;
