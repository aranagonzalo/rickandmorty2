const URL = "https://rickandmortyapi.com/api/character/";
const axios = require("axios");

const getCharById = async (req, res) => {
    try {
        const data = await axios(`${URL}${req.params.id}`);
        if (data) {
            const { id, status, name, species, origin, image, gender } =
                data.data;
            res.status(200).json({
                id,
                status,
                name,
                species,
                origin,
                image,
                gender,
            });
        } else {
            res.status(404).send("Not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = getCharById;
