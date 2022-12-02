export const app = {
  // developmentHost: '197.159.166.11:8081',
  developmentHost: '192.168.0.164:8081',
  testingHost: 'igf-api.herokuapp.com',
  stagingHost: '52.204.190.168:8083',
};

export const environment = {
  // production: true,
  // apiUrl: 'https://igf-api.herokuapp.com',
  // basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  // allowedDomains: ['igf-api.herokuapp.com'],
  // disallowedRoutes: ['https://igf-api.herokuapp.com/oauth/token'],

  production: true,
  apiUrl: `http://${app.stagingHost}`,
  allowedDomains: [`${app.stagingHost}`],
  disallowedRoutes: [`http://${app.stagingHost}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
};
