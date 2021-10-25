import ReducerInterface from 'interfaces/reducerInterface';
import * as types from 'redux/types';
import { RequestFromCustomerModel } from 'interfaces/models/requestFromCustomer';
import cookieServices from 'services/cookieServices';
import produce from 'immer';

const validateAccessState = {
    validateAccessData: {
        data: null,
        error: '',
    }
};

export const validAccessReducer = (state = validateAccessState, action: ReducerInterface) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.CHECK_VALIDATE_ACCESS:
                let requestParams: RequestFromCustomerModel;
                let payload = action.payload;

                try {
                    requestParams = Object.assign(new RequestFromCustomerModel(), payload);
                } catch (e) {
                    draftState.validateAccessData.data = null;
                    draftState.validateAccessData.error = 'INVALID_ACCESS';
                    break;
                }

                if (!requestParams.checkValidFieldsFromCustomer()) {
                    draftState.validateAccessData.data = null;
                    draftState.validateAccessData.error = 'INVALID_ACCESS';
                    break;
                }

                cookieServices.setCookie('token', payload.token);

                draftState.validateAccessData.data = action.payload;
                draftState.validateAccessData.error = '';
                break;
            default:
                break;
        }
    });

};
