const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`user connceted ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user ID : ${socket.id} Room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message',data)
  });

  socket.on("disconnect", () => {
    console.log("user Disconnect", socket.id);
  });
});
