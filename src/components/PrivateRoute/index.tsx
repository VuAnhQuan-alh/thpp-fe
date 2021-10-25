import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GetValidateAccessSelector } from 'redux/selectors';
import { RouteBase } from 'routes/routeUrl';

const PrivateRoute = (props: any) => {
  const validate = GetValidateAccessSelector();
  const { error, data: requestParams } = validate;

  // Render
  if (error) {
    return <Redirect to={RouteBase.NotFound} />;
  }

  if (requestParams) {
    return <Route {...props} />;
  }

  return <Redirect to={RouteBase.Splash} />;
};

export default PrivateRoute;
