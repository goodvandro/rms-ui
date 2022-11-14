export const app = {
  // developmentHost: '197.159.166.11:8081',
  developmentHost: '192.168.0.117:8081',
  testingHost: 'igf-api.herokuapp.com',
  stagingHost: 'webapp.b-software.st:8080',
};

export const environment = {
  production: false,
  apiUrl: `http://${app.developmentHost}`,
  allowedDomains: [`${app.developmentHost}`],
  disallowedRoutes: [`http://${app.developmentHost}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',

  // apiUrl: 'https://igf-api.herokuapp.com',
  // basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  // allowedDomains: ['igf-api.herokuapp.com'],
  // disallowedRoutes: ['https://igf-api.herokuapp.com/oauth/token'],
};
