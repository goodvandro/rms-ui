export const app = {
  developmentHost: '192.168.0.141:8080',
  stagingHost: 'igf-api.onrender.com',
  version: '2.0',
};

export const environment = {
  production: false,
  apiUrl: `http://${app.developmentHost}`,
  allowedDomains: [`${app.developmentHost}`],
  disallowedRoutes: [`http://${app.developmentHost}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  appVersion: app.version,
};
