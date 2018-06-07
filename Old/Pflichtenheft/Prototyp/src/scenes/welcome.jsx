import React from 'react';
import { Redirect } from 'react-router-dom';

import Authentication from '../services/authentication';
import { isSupervisor, isModerator } from '../services/user';

const WelcomePage = () => {
  const role = Authentication.getRole();

  if (isSupervisor(role)) {
    return <Redirect to="/wahlleiter" />;
  } else if (isModerator(role)) {
    return <Redirect to="/moderator" />;
  }

  return <Redirect to="/waehler" />;
};

export default WelcomePage;
