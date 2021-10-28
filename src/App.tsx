import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RouteBase } from 'routes/routeUrl';

import './styles/scss/styles.scss';

import ReturnTransactionPage from 'views/ReturnPayment';
import Page404 from 'views/Page404';
import PaymentPage from 'views/Payment';
import SplashPage from 'views/Splash';
import DefaultLayout from 'layout/DefaultLayout';

const App: React.FC = () => {
  // RENDER
  return (
    <Router>
      <Switch>
        <Route path={RouteBase.Splash} exact component={SplashPage} />
        <Route exact path={RouteBase.Payment} component={DefaultLayout} />
        <Route exact path={RouteBase.Return} component={ReturnTransactionPage} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
