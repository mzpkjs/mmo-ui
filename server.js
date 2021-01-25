const path = require('path');
const express = require("express")


const server = express()

server.use("/", express.static("./distribution"))
server.use("/public", express.static("./public"))

server.get("/", (request, response) => {
    response.sendFile("index.html", { root: path.join(__dirname, "./distribution") });
})

server.listen(process.env.npm_package_config_port)
