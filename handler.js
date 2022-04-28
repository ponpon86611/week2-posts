const headers = require('./headers');

const successHandleSuccess = (res, data, statusCode = 200) => {
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify({
    "status": "success",
    "data": data
  }))
  res.end();
}

const errorHandler = (res, message, statusCode = 400) => {
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify({
    "status": "false",
    message
  }))
  res.end();
}

module.exports = {
    successHandleSuccess,
    errorHandler
};