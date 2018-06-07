import { matchRoutes } from 'react-router-config';

const routes = [
  {
    routes: [
      { path: '/', exact: true, component: () => 'WelcomePage' },
      { path: '/hilfe', component: () => 'HelpPage' },
      { path: '/impressum', component: () => 'ImprintPage' },
      { path: '/datenschutzerklärung', component: () => 'PrivacyPolicyPage' },
      {
        path: '/waehler',
        component: () => 'UserLoginPage',
        routes: [{ path: '/waehler/wahl', routes: [{ path: '/waehler/wahl/:id' }] }],
      },
      {
        path: '/wahlleiter',
        component: () => 'AdminLoginPage',
        routes: [
          {
            path: '/wahlleiter/wahl',
            routes: [
              {
                path: '/wahlleiter/wahl/:id',
                routes: [
                  { path: '/wahlleiter/wahl/:id/bearbeiten' },
                  { path: '/wahlleiter/wahl/:id/löschen' },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/moderator',
        component: () => 'AdminLoginPage',
        routes: [
          {
            path: '/moderator/wahl',
            routes: [
              {
                path: '/moderator/wahl/:id',
                routes: [
                  { path: '/moderator/wahl/:id/auswerten' },
                  { path: '/moderator/wahl/:id/bearbeiten' },
                  { path: '/moderator/wahl/:id/löschen' },
                ],
              },
            ],
          },
        ],
      },
      { path: '/waehler/anmeldung', component: () => 'HomePage' },
      { path: '/wahlleiter/anmeldung', component: () => 'HomePage' },
      { path: '/moderator/anmeldung', component: () => 'HomePage' },
      { path: '/*', component: () => 'NotFoundPage' },
    ],
  },
];

const getPaths = pathname => matchRoutes(routes, pathname);

export default getPaths;
