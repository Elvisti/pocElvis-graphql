const { get, put, post, del } = require('../utils/httpMethods');
const { USERS } = require('../../constants/config');

const PocBackendApi = {
  getUsers() {
    return get(USERS.GET)
  }
}

module.exports = PocBackendApi;