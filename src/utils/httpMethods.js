const request = require('request-promise');
const moment = require('moment');
const uuid = require('uuid');

const HTTP = { GET: 'GET', PUT: 'PUT', POST: 'POST', DELETE: 'DELETE' };
const LOGGER = (uri, method) => console.log(`${moment().format('YYYY-MM-DD H:mm:ss')} /${method} : ${uri}`);

function handleError(err) {
  return { uuid: null, statusCode: err.statusCode, message: getErrorMessage(err), isError: true };
}

function getErrorMessage(e) {
  if (e.statusCode) {
    return e.error.message
  }

  return e.message;
}

function handleSuccess() {
  return { uuid: uuid(), statusCode: 200, message: 'Ok', isError: false };
}

/////////////////////////////////////////////////////////////////
/////////////////         Http Requests        //////////////////
/////////////////////////////////////////////////////////////////

async function get(uri, body) {
  LOGGER(uri, HTTP.GET);
  return await request({ uri, method: HTTP.GET, json: true, body })
    .then(response => response)
    .catch(handleError);
}

async function put(uri, body) {
  LOGGER(uri, HTTP.PUT);
  return await request({ uri, method: HTTP.PUT, json: true, body })
    .then(response => response)
    .catch(handleError);
}

async function post(uri, body) {
  LOGGER(uri, HTTP.POST);
  return await request({ uri, method: HTTP.POST, json: true, body })
    .then(response => response)
    .catch(handleError);
}

async function del(uri) {
  LOGGER(uri, HTTP.DELETE);
  return await request({ uri, method: HTTP.DELETE, json: true })
    .then(handleSuccess)
    .catch(handleError);
}

module.exports = {
  get,
  post,
  put,
  del,
}
