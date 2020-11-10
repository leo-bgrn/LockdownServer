const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:3000");

ioClient.on("listUsers", (msg) => {
  console.info("listUsers : ", msg);
});

ioClient.on("round", (msg) => {
  console.info("round : ", msg);
});

ioClient.on("answers", (msg) => {
  console.info("answers : ", msg);
});

ioClient.on("validationTable", (msg) => {
  console.info("validationTable : ", msg);
});

ioClient.on("results", (msg) => {
  console.info("results : ", msg);
});

ioClient.on("restartGame", (msg) => {
  console.info("restartGame : ", msg);
});

setTimeout(function () {
  ioClient.emit("createGame", { pseudo: "Léo" });
}, 500);

setTimeout(function () {
  ioClient.emit("newUser", { pseudo: "Hédi" });
}, 5000);

setTimeout(function () {
  ioClient.emit("ready", { pseudo: "Hédi" });
  ioClient.emit("ready", { pseudo: "Léo" });
}, 6000);

setTimeout(function () {
  ioClient.emit("answered", { pseudo: "Léo", answer: "test" });
  ioClient.emit("answered", { pseudo: "Hédi", answer: "test2" });
}, 7000);

setTimeout(function () {
  ioClient.emit("rejectAnswer", { pseudo: "Hédi", userToValidate: "Léo" });
  ioClient.emit("rejectAnswer", { pseudo: "Léo", userToValidate: "Léo" });
}, 8000);

setTimeout(function () {
  ioClient.emit("ready", { pseudo: "Hédi" });
  ioClient.emit("ready", { pseudo: "Léo" });
}, 9000);

setTimeout(function () {
  ioClient.emit("answered", { pseudo: "Léo", answer: "test" });
  ioClient.emit("answered", { pseudo: "Hédi", answer: "test2" });
}, 10000);

setTimeout(function () {
  ioClient.emit("ready", { pseudo: "Hédi" });
  ioClient.emit("ready", { pseudo: "Léo" });
}, 11000);

setTimeout(function () {
  ioClient.emit("ready", { pseudo: "Hédi" });
  ioClient.emit("ready", { pseudo: "Léo" });
}, 12000);
