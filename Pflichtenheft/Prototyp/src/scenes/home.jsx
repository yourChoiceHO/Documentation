import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router';

import LoadingRoute from '../components/LoadingRoute';
import ElectionPage from '../scenes/election';
import ElectionNewPage from '../scenes/election/new';

const HomePage = ({ match }) =>
  (match.isExact ? (
    <Redirect to={`${match.url}/wahl`} />
  ) : (
    <Switch>
      <LoadingRoute path="/wahlleiter/wahl/neu" component={ElectionNewPage} />
      <LoadingRoute path="/moderator/wahl/neu" component={ElectionNewPage} />

      <LoadingRoute path="/waehler/wahl" component={ElectionPage} />
      <LoadingRoute path="/wahlleiter/wahl" component={ElectionPage} />
      <LoadingRoute path="/moderator/wahl" component={ElectionPage} />
    </Switch>
  ));

HomePage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    url: PropTypes.string,
  }).isRequired,
};

export default HomePage;
