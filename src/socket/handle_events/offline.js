const socketEvent = require("../events");
const storage = require("../../utils/storage");

const offline = (io, socket) => {
  socket.on(
    "disconnect",
    (async () => {
      try {
        if (socket.role == "shop") {
          storage.listShopUserOnline = storage.listShopUserOnline.filter((item) => item.socket.user_id != socket.user_id);
        }
        console.log("store", storage);
      } catch (err) {
        console.log(err);
      }
    })
  );
};

module.exports = offline;
