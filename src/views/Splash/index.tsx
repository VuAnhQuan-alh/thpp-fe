import { useRouter } from 'hooks/useRoute';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteBase } from 'routes/routeUrl';

import { GetValidateAccessSelector } from '../../redux/selectors/validate-access';
import { Redirect } from 'react-router-dom';
import Loading from 'components/Loading';
import { checkValidateAccess } from 'redux/modules/validate-access';

const SplashPage = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const validAccess = GetValidateAccessSelector();

    const { data: requestParams, error } = validAccess;

    useEffect(() => {
        dispatch(checkValidateAccess(router.query));
    }, []);


    if (requestParams == null && !(error === '')) {
        return <Redirect to={RouteBase.NotFound} />;
    }

    if (requestParams != null) {
        return <Redirect to={RouteBase.Payment} />;
    }

    return (
        <div>
            <Loading />
        </div>
    );
};
export default SplashPage;