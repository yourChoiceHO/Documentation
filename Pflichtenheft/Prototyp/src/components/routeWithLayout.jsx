import React from 'react';
import LoadingRoute from './LoadingRoute';

const routeWithLayout = Layout => ({ component: Component, ...rest }) => (
  <LoadingRoute
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default routeWithLayout;
