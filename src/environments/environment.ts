export const environment = {
  production: false,
  apiUrl: 'http://192.168.0.164:8081',
  allowedDomains: ['192.168.0.164:8081'],
  disallowedRoutes: ['http://192.168.0.164:8081/oauth/token'],
  basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='

  // apiUrl: 'https://igf-api.herokuapp.com',
  // basicAuthorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  // allowedDomains: ['igf-api.herokuapp.com'],
  // disallowedRoutes: ['https://igf-api.herokuapp.com/oauth/token'],
};
