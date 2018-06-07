import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './lib/history';

import DefaultLayout from './layout/default';
import LoginLayout from './layout/login';

import WelcomePage from './scenes/welcome';
import NotFoundPage from './scenes/not-found';
import HelpPage from './scenes/help';
import ImprintPage from './scenes/imprint';
import TermsPage from './scenes/terms';

import HomePage from './scenes/home';

import UserLoginPage from './scenes/login/user';
import AdminLoginPage from './scenes/login/admin';

import withAuthorization from './components/authorization';

import { VOTER, SUPERVISOR, MODERATOR } from './constants/roles';

import routeWithLayout from './components/routeWithLayout';

const DefaultLayoutRoute = routeWithLayout(DefaultLayout);
const LoginLayoutRoute = routeWithLayout(LoginLayout);

const voterOnly = withAuthorization(VOTER);
const supervisorOnly = withAuthorization(SUPERVISOR);
const moderatorOnly = withAuthorization(MODERATOR);

const App = () => (
  <Router history={history}>
    <Switch>
      <DefaultLayoutRoute exact path="/" component={WelcomePage} />
      <DefaultLayoutRoute path="/hilfe" component={HelpPage} />
      <DefaultLayoutRoute path="/impressum" component={ImprintPage} />
      <DefaultLayoutRoute path="/bedingungen/:tab?" component={TermsPage} />

      <DefaultLayoutRoute path="/waehler/anmeldung" component={UserLoginPage} />
      <LoginLayoutRoute path="/mitarbeiter/anmeldung" component={AdminLoginPage} />

      <DefaultLayoutRoute path="/waehler" component={voterOnly(HomePage)} />
      <DefaultLayoutRoute path="/wahlleiter" component={supervisorOnly(HomePage)} />
      <DefaultLayoutRoute path="/moderator" component={moderatorOnly(HomePage)} />

      <DefaultLayoutRoute path="/*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
