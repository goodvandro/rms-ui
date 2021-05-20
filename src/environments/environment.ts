export const app = {
  // host: '10.234.3.109:8081',
  // host: '192.168.0.164:8081',
  host: 'igf-api.herokuapp.com'
}

export const environment = {
  production: false,
  apiUrl: `http://${app.host}`,
  allowedDomains: [`${app.host}`],
  disallowedRoutes: [`http://${app.host}/oauth/token`],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='

  // apiUrl: 'https://igf-api.herokuapp.com',
  // basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  // allowedDomains: ['igf-api.herokuapp.com'],
  // disallowedRoutes: ['https://igf-api.herokuapp.com/oauth/token'],
};
