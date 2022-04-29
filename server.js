const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const headers = require('./headers');
const {successHandleSuccess, errorHandler }= require('./handler');
const Post = require('./model/post');
const postRouter = require('./routes/postRouter');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('資料庫連接成功...'))
  .catch( e => console.log('資料庫連接錯誤 :', e));

const requestListener = async (req, res) => {
  const url = req.url;
  if(url === '/posts') {
    postRouter(req, res, 'GPD');
  } else if(url.startsWith('/posts/')) {
    postRouter(req, res, 'DP');
  } else {
    errorHandler(res, '無此網站路由', 400);
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000);