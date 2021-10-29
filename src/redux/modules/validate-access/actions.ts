import * as types from 'redux/types';

export const checkValidateAccess = (payload: any) => ({
    type: types.CHECK_VALIDATE_ACCESS,
    payload: payload
});
