import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from './routeUrl';

const PaymentPage = lazy(() => import('views/Payment'));
const ReturnTransactionPage = lazy(() => import('views/ReturnPayment'));
const Page404 = lazy(() => import('views/Page404'));

export default [
  {
    path: RouteBase.Payment,
    exact: true,
    name: 'Payment',
    component: withErrorBoundary(PaymentPage),
    isPrivate: true,
  },
];
