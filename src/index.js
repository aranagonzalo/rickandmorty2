const express = require("express");
const server = express();
const PORT = 3001;
const router = require("./routes/index");
const { conn } = require("./DB_connection");

server.use(express.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

server.use("/", router);

conn.sync({ force: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log("Server raised in port: " + PORT);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

module.exports = express;
