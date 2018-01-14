import React from 'react';
import { withRouter, Redirect } from 'react-router';

import { equals } from 'ramda';
import Authentication from '../services/authentication';

const withAuthorization = allowedRole => ComposedComponent =>
  withRouter((props) => {
    const role = Authentication.getRole();
    const isAllowedRole = equals(allowedRole);

    if (Authentication.isAuthenticated() && isAllowedRole(role)) {
      return <ComposedComponent role={allowedRole} {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: `${props.match.url}/anmeldung`,
          state: { referrer: props.location.pathname },
        }}
      />
    );
  });

export default withAuthorization;
