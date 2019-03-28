const { RESTDataSource } = require('apollo-datasource-rest');

class AuthorizationAPI extends RESTDataSource {

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }
}

module.exports = AuthorizationAPI
