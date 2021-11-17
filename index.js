const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    "Access-Control-Allow-Origin": "*",
  },
});
const port = process.env.PORT || 5000;

const massageList = [{ message: "Hi! How can i help you?", user: "System" }];

io.on("connection", (socket) => {
  io.emit("connection", massageList);

  socket.on("message:create", (data) => {
    const newMsgObject = {
      user: data.user,
      message: data.message,
    };
    massageList.push(newMsgObject);
    console.log(JSON.stringify(massageList));
    io.emit("message:new", newMsgObject);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
