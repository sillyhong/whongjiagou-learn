'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527308864224_7452';

  // add your config here
  config.middleware = [];
  //配置socket.io 配置命名空间 ，配置的是/
  //connectionMiddleware 连接中间件，就是说当客户端连接上来的时候执行此中间件
  config.io = {
    namespace: {
      "/": {
        connectionMiddleware: ['connect']
      }
    }
  }
  //配置mongoose的项目 配置它的连接方式
  config.mongoose = {
    client: {
      url: 'mongodb://localhost/zfchat'
    }
  }
  config.security = {
    domainWhiteList: ['http://localhost:8000'],
    csrf: false
  }
  exports.cors = {
    origin: 'http://localhost:8000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.jwt = {
    secret: 'zfpx'
  }
  return config;
};
