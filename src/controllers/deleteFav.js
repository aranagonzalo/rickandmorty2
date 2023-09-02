const { Favorite } = require("../DB_connection");

module.exports = async (req, res) => {
    const { id } = req.params;
    try {
        await Favorite.destroy({ where: { id } });
        const favs = await Favorite.findAll();
        return res.status(200).json(favs);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
