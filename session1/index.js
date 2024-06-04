const http = require("http");

const server = http.createServer(() => {
  console.log("request received");
});

server.listen(8082, () => {
  console.log("server is listening now...");
});
