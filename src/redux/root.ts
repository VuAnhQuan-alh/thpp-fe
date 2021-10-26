import { getCustomerTransactionReducer } from './modules/payment-portal/reducer';
import { combineReducers } from 'redux';
import { all, spawn, call } from 'redux-saga/effects';

import {
  gatewayPaymentsSaga,
  createTransactionSaga,
  getDetailTransactionSaga,
  gatewayPaymentsReducer,
  createTransactionReducer,
  getDetailTransactionReducer,
  getCustomerTransactionSaga
} from './modules/payment-portal';

import { validAccessReducer } from './modules/validate-access';

export function* rootSagas() {
  const sagas = [
    gatewayPaymentsSaga,
    createTransactionSaga,
    getDetailTransactionSaga,
    getCustomerTransactionSaga
  ];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}

export const rootReducers = combineReducers({
  validAccessReducer,
  gatewayPaymentsReducer,
  createTransactionReducer,
  getDetailTransactionReducer,
  getCustomerTransactionReducer
});
