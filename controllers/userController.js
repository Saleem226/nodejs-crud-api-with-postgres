const pool = require('../db/pool')

class UserController {

    static async find(req, res) {
        try {
            const { rows } = await pool.query(`SELECT * from users`)
            res.send(rows)

        } catch (error) {
            res.status(404).send("Resource not found")
        }

    }

    static async findOne(req, res) {

        try {
            const { id } = req.params
            const { rows } = await pool.query(`SELECT * from users WHERE id=$1`, [id])
            if (rows[0]) {
                res.send(rows[0])
            } else {
                res.send("User not found")
            }
        } catch (error) {
            res.status(404).send("Unable to Access")
        }
    }

    static async insert(req, res) {
        try {
            const { name, username, email, bio } = req.body
            const alreadyUser = await pool.query(`SELECT * from users WHERE username=$1 OR email=$2`, [username, email])
            if (!alreadyUser.rows.length == 0) {
                res.send("User already exists with the same username or email")
            } else {
                const { rows } = await pool.query(`INSERT INTO users(name,username,email,bio) VALUES($1,$2,$3,$4) RETURNING *`, [name, username, email, bio])
                res.send(rows[0])
            }
        } catch (error) {
            res.status(404).send("Unable to add user")
        }
    }

    static async update(req, res) {
        try {

            const { id } = req.params
            const { name, username, email, bio } = req.body
            const { rows } = await pool.query(`UPDATE users SET name=$1,username=$2,email=$3,bio=$4 WHERE id=$5 RETURNING *`, [name, username, email, bio, id])
            res.send(rows[0])

        } catch (error) {

            res.status(404).send("Unable to Update User")
        }

    }

    static async delete(req, res) {
        try {

            const { id } = req.params
            const { rows } = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *;`, [id])
            console.log(rows[0])
            if (rows[0]) {
                res.send(` User Deleted ${rows}`)

            } else {
                res.send("User not found with this id")
            }

        } catch (error) {
            res.status(404).send("Unable to DELETE")
        }
    }

}



module.exports = UserController