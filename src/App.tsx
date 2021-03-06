import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RouteBase } from 'routes/routeUrl';

import './styles/scss/styles.scss';

import ReturnTransactionPage from 'views/ReturnPayment';
import Page404 from 'views/Page404';
import SplashPage from 'views/Splash';
import DefaultLayout from 'layout/DefaultLayout';

const App: React.FC = () => {
  // RENDER
  return (
    <Router>
      <Switch>
        <Route exact path={RouteBase.Payment} component={DefaultLayout} />
        <Route path={RouteBase.Return} component={ReturnTransactionPage} />
        <Route path={RouteBase.Splash} exact component={SplashPage} />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
