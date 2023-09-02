const { User } = require("../DB_connection");

module.exports = async (req, res) => {
    const { email, password } = req.query;
    if (!email || !password) res.status(400).send("Faltan datos");

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        } else {
            if (user.password !== password) {
                return res.status(403).json("Contraseña incorrecta");
            } else {
                res.status(202).json({ access: true });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
