/* global localStorage */

import { isNil, propOr, defaultTo } from 'ramda';

import history from '../lib/history';
import fetch from '../lib/api/fake';
import { isSupervisor, isModerator } from '../services/user';

const setSession = (result) => {
  const serializedSession = JSON.stringify(result);
  localStorage.setItem('session', serializedSession);
};

const clearSession = () => {
  localStorage.removeItem('session');
};

const loginUser = ({ credentials, referrer }) =>
  fetch({ url: '/signin/user', method: 'post', data: { credentials } }).map((result) => {
    setSession(result);
    history.replace(referrer);
    return result;
  });

const loginAdmin = ({ credentials, referrer }) =>
  fetch({ url: '/signin/admin', method: 'post', data: { credentials } }).map((result) => {
    const { role } = result.user;
    let pathname = '/';

    if (isSupervisor(role)) {
      pathname = '/wahlleiter';
    } else if (isModerator(role)) {
      pathname = '/moderator';
    }

    setSession(result);
    history.push(pathname);
    return result;
  });

const logout = ({ referrer }) => {
  clearSession();
  history.replace(referrer);
};

const isAuthenticated = () => {
  const session = localStorage.getItem('session');
  return !isNil(session);
};

const getSession = () => {
  const serializedSession = localStorage.getItem('session');
  const session = JSON.parse(serializedSession);
  return defaultTo({}, session);
};

const getUser = () => {
  const session = getSession();
  return propOr({}, 'user', session);
};

const getRole = () => {
  const user = getUser();
  return propOr('', 'role', user);
};

export default {
  getUser,
  getRole,
  loginUser,
  loginAdmin,
  setSession,
  logout,
  isAuthenticated,
};

// const setSession = (result) => {
//   const expiresAt = JSON.stringify(result.expiresIn * 1000 + new Date().getTime());

//   localStorage.setItem('access_token', result.accessToken);
//   localStorage.setItem('id_token', result.idToken);
//   localStorage.setItem('expires_at', expiresAt);

//   // Navigate back to login or home route
//   // history.replace('/...');
// };

// if (result && result.accessToken && result.idToken) {
// setSession(result);
// }

// localStorage.removeItem('access_token');
// localStorage.removeItem('id_token');
// localStorage.removeItem('expires_at');
// Navigate back to login or home route
// history.replace('/...');

// const isAuthenticated = () => {
//   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//   return new Date().getTime() < expiresAt;
// };
