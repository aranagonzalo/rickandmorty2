const { Favorite } = require("../DB_connection");

module.exports = async (req, res) => {
    const { name, origin, status, image, species, gender } = req.body;
    if ([name, origin, status, image, species, gender].every(Boolean)) {
        try {
            const fav = await Favorite.create({
                name,
                origin,
                status,
                image,
                species,
                gender,
            });
            const favs = await Favorite.findAll();
            return res.status(200).json(favs);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    } else {
        return res.status(401).send("Faltan datos");
    }
};
