import { useSelector } from 'react-redux';

export const GetValidateAccessSelector = () => {
    const requestPrams = useSelector((state: any) => state.validAccessReducer.validateAccessData,);

    console.log('GetValidateAccessSelector ', JSON.stringify(requestPrams));
    return requestPrams;
};