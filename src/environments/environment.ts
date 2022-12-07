export const app = {
  developmentHost: '192.168.0.164:8081',
  stagingHost: 'igf-api.onrender.com',
};

export const environment = {
  production: true,
  apiUrl: `https://${app.stagingHost}`,
  allowedDomains: [`${app.stagingHost}`],
  disallowedRoutes: [`https://${app.stagingHost}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
};
