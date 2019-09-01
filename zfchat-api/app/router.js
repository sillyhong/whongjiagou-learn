'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //io 你可以把它当成 require('socket.io')
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  //当服务器收到客户端的addMessage事件之后，会交给addMessage方法来处理
  //向服务器发射一个新的消息，并且让服务器广播给所有的客户端
  io.route('addMessage', io.controller.room.addMessage);
  //获取所有的历史消息
  io.route('getAllMessages', io.controller.room.getAllMessages);
  //注册或者登录
  router.post('/login', controller.user.login);
  //验证用户身份
  router.post('/validate', controller.user.validate);
  //创建新的房间
  router.post('/createRoom', controller.rooms.createRoom);
  //返回所有的房间列表
  router.get('/getAllRooms', controller.rooms.getAllRooms);
};
