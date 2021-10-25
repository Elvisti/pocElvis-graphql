const GRAPHQL_PORT = 8083;
const BACKEND_PORT = 8080;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

const USERS = {
  GET: `${BACKEND_URL}/user`
}

module.exports = {
  GRAPHQL_PORT,
  BACKEND_PORT,
  BACKEND_URL,
  USERS,
}