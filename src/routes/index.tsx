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
  {
    path: RouteBase.Return,
    name: 'Return Transaction',
    component: withErrorBoundary(ReturnTransactionPage),
    isPrivate: true,
  },
  { name: RouteBase.NotFound, component: withErrorBoundary(Page404) },
];
