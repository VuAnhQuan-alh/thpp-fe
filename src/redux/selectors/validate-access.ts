import { useSelector } from 'react-redux';

export const GetValidateAccessSelector = () => {
    const requestPrams = useSelector((state: any) => state.validAccessReducer.validateAccessData,);

    return requestPrams;
};