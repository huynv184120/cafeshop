const socketEvent = require("../events");
const { UserModel } = require("../../models");
const { UnauthorizedError } = require("../commons/error");
const { verifyCredentials } = require("../utils/jwtHelper");
const {storage} = require('../../utils/storage');
const online = (io, socket) => {
  socket.on(
    socketEvent.online,
    asyncHandler(async (req) => {
      try {
        const bearerToken = req.headers.token;
        if (!bearerToken) throw new UnauthorizedError();
        const accessToken = bearerToken.split()[1];
        const credentials = verifyCredentials(accessToken);
        socket.user_id = credentials.id;
        if(credentials.role == 'shop'){
          storage.listShopUserOnline.push(socket);
        }
        socket.join(credentials.id);
        console.log(socket.user_id + " online");
      } catch (err) {
          
      }
    })
  );
};

module.exports = online;
