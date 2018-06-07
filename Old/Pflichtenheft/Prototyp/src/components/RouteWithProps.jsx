import React from 'react';
import PropTypes from 'prop-types';

import LoadingRoute from './LoadingRoute';

const RouteWithProps = ({ component: Component, props, ...rest }) => (
  <LoadingRoute {...rest} render={routeProps => <Component {...props} {...routeProps} />} />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
};

export default RouteWithProps;
