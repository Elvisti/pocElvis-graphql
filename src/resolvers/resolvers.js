const PocBackendApi = require("../datasource/pocBackendApi");

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => {
      const response = await PocBackendApi.getUsers();
      if (response.isError) {
        throw response.message;
      }
      return response;
    }
  }
};

module.exports = { resolvers };