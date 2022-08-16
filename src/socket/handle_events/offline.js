const socketEvent = require("../events");
const storage = require("../../utils/storage");
const userService = require("../../services/user.service");

const offline = (io, socket) => {
  socket.on(
    "disconnect",
    (async () => {
      try {
        if (socket.role == "shop") {
          userService.employeeOffline(socket["user_id"]);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};

module.exports = offline;
