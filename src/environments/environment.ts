export const app = {
  apiURL: '10.234.8.4:8080',
  version: '2.1',
};

export const environment = {
  production: false,
  apiUrl: `http://${app.apiURL}`,
  allowedDomains: [`${app.apiURL}`],
  disallowedRoutes: [`http://${app.apiURL}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  appVersion: app.version,
};
