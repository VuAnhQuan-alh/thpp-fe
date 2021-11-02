import ErrorComponent from 'components/Errror';
import { mapStatusCodeAPIToMsg } from 'constants/errorCode';
import React from 'react';

const ErrorPage = (props: any) => {
    const { errorCode } = props;
    const message = mapStatusCodeAPIToMsg(errorCode);

    return <ErrorComponent message={message} />;
};

export default ErrorPage;
