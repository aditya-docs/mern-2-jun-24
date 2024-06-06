const http = require("http");
const currenciesData = require("./currencies.json");
const PORT = 8082;

// const server = http.createServer((req, res) => {
//   //   const serverDate = new Date().toLocaleDateString();
//   //   const serverTime = new Date().toLocaleTimeString();
//   //   res.writeHead(200, { "Content-Type": "text/html" });
//   //   res.write(`<h1 style="color: red">${serverDate} ${serverTime}</h1>`);
//   const serverInfo = {
//     serverName: "Crio Server",
//     version: "1.0.0",
//     currentDate: new Date().toDateString(),
//     currentTime: new Date().toTimeString(),
//   };
//   if (req.url === "/status") {
//     // res
//     //   .writeHead(200, { "Content-Type": "application/json" })
//     //   .end(JSON.stringify(serverInfo));
//     res
//       .writeHead(200, { "Content-Type": "application/json" })
//       .write(JSON.stringify(serverInfo));
//     res.end();
//   } else {
//     res
//       .writeHead(200, { "Content-Type": "text/html" })
//       .end(`<h1>Hello from server</h1>`);
//   }
// });

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res
        .writeHead(200, { "Content-Type": "text/html" })
        .end(`<h1>Currency Database</h1>`);
      break;
    case "/currencies":
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(currenciesData.data));
      break;
    default:
      res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
