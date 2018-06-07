import MockAdapter from 'axios-mock-adapter';
import { equals } from 'ramda';

import client from './client';
import fetch from './fetch';
import { VOTER, SUPERVISOR, MODERATOR } from '../../constants/roles';

const mock = new MockAdapter(client, { delayResponse: 2000 });

const {
  REACT_APP_VOTER_USERNAME,
  REACT_APP_VOTER_PASSWORD,
  REACT_APP_SUPERVISOR_USERNAME,
  REACT_APP_SUPERVISOR_PASSWORD,
  REACT_APP_MODERATOR_USERNAME,
  REACT_APP_MODERATOR_PASSWORD,
} = process.env;

const elections = [
  {
    id: 0,
    type: 'Bundestagswahl',
    edited: true,
    state: 'Nicht aktiv',
    startTime: '2017-09-10T08:00:00.000',
    endTime: '2017-09-24T18:00:00.000',
  },
  {
    id: 1,
    type: 'Bundestagswahl',
    edited: true,
    state: 'Nicht aktiv',
    startTime: '2017-09-10T08:00:00.000',
    endTime: '2017-09-24T18:00:00.000',
  },
  {
    id: 2,
    type: 'Bundestagswahl',
    edited: true,
    state: 'Nicht aktiv',
    startTime: '2017-09-10T08:00:00.000',
    endTime: '2017-09-24T18:00:00.000',
  },
  {
    id: 3,
    type: 'Bundestagswahl',
    edited: true,
    state: 'Nicht aktiv',
    startTime: '2017-09-10T08:00:00.000',
    endTime: '2017-09-24T18:00:00.000',
  },
  /* {
    id: 4,
    type: 'Bundestagswahl',
    edited: true,
    state: 'Nicht aktiv',
    startTime: '2017-09-10T08:00:00.000',
    endTime: '2017-09-24T18:00:00.000',
  }, */
];

mock.onGet('/elections').reply(() =>
  Promise.resolve({
    then: (resolve) => {
      setTimeout(() => {
        // const threshold = 0.5;

        // const response =
        // Math.random() > threshold ? [200, elections, {}] : [500, { success: false }, {}];

        const response = [200, elections, {}];

        resolve(response);
      }, 500);
    },
  }));

mock.onPost('/signin/user').reply(config =>
  Promise.resolve({
    then: (resolve) => {
      setTimeout(() => {
        const { credentials } = JSON.parse(config.data);
        const { username, password } = credentials;

        const isValidUsername = equals(REACT_APP_VOTER_USERNAME);
        const isValidPassword = equals(REACT_APP_VOTER_PASSWORD);

        const response =
          isValidUsername(username) && isValidPassword(password)
            ? [
              200,
              {
                espiresIn: 100,
                idToken: 'ABC',
                accessToken: '123',
                user: { role: VOTER, name: '[Rolle] Waehler' },
              },
              {},
            ]
            : [403, { success: false, reason: 'Ungültiger Benutzername und/oder Passwort.' }, {}];

        resolve(response);
      }, 1000);
    },
  }));

mock.onPost('/signin/admin').reply(config =>
  Promise.resolve({
    then: (resolve) => {
      setTimeout(() => {
        const { credentials } = JSON.parse(config.data);
        const { username, password } = credentials;

        const isValidSupervisorUsername = equals(REACT_APP_SUPERVISOR_USERNAME);
        const isValidSupervisorPassword = equals(REACT_APP_SUPERVISOR_PASSWORD);
        const isValidModeratorUsername = equals(REACT_APP_MODERATOR_USERNAME);
        const isValidModeratorPassword = equals(REACT_APP_MODERATOR_PASSWORD);

        let response = [
          403,
          { success: false, reason: 'Ungültiger Benutzername und/oder Passwort.' },
          {},
        ];

        if (isValidSupervisorUsername(username) && isValidSupervisorPassword(password)) {
          response = [
            200,
            {
              espiresIn: 100,
              idToken: 'ABC',
              accessToken: '123',
              user: { role: SUPERVISOR, name: '[Rolle] Wahlleiter' },
            },
            {},
          ];
        } else if (isValidModeratorUsername(username) && isValidModeratorPassword(password)) {
          response = [
            200,
            {
              espiresIn: 100,
              idToken: 'ABC',
              accessToken: '123',
              user: { role: MODERATOR, name: '[Rolle] Moderator' },
            },
            {},
          ];
        }

        resolve(response);
      }, 1000);
    },
  }));

export default fetch;
