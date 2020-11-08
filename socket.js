function socketBehavior(socket) {
  console.log("Connected !")
  socket.on("next", (data) => {
    console.log(data);
    socket.emit("question", { question: "my question" });
  });
}

module.exports = {
  socketBehavior,
};
