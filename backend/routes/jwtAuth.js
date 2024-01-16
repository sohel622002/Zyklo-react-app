const router = require("express").Router();
const pool = require("../db")

router.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Todo:Add more validations here
        let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );

        console.log(newUser);
        return res.json(newUser.rows)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;