const express = require("express");
const router = express.Router();

const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const deleteFav = require("../controllers/deleteFav");
const postFav = require("../controllers/postFav");
const postUser = require("../controllers/postUser");

router.get("/rickandmorty/character/:id", (req, res) => {
    getCharById(req, res);
});

router.get("/rickandmorty/login", (req, res) => {
    login(req, res);
});

router.post("/rickandmorty/login", (req, res) => {
    postUser(req, res);
});

router.post("/rickandmorty/fav", (req, res) => {
    postFav(req, res);
});

router.delete("/rickandmorty/fav/:id", (req, res) => {
    deleteFav(req, res);
});

module.exports = router;
