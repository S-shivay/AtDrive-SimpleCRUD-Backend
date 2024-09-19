const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connection = require('../db/mysql'); 

app.use(express.json());
router.post('/register', (req, res, next) => {
    const saltRounds = 10;
    const { username, password } = req.body;
    try {
        connection.query('SELECT * FROM Users WHERE username = ?', [username], async (err, results) => {
            if (err) return next(err);
            if (results.length > 0) {
                return res.status(400).send('User already exists');
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            console.log('Salt:', salt);
            const hashedPassword = bcrypt.hashSync(password, salt);
            connection.query(
                'INSERT INTO Users (username, password) VALUES (?, ?)',
                [username, hashedPassword],
                (err, results) => {
                    if (err) return next(err);
                    const token = jwt.sign({ id: results.insertId }, process.env.TOKEN_SECRET);
                    res.json({
                        username,
                        token
                    });
                }
            );
        });
    } catch (e) {
        next(e);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        connection.query('SELECT * FROM Users WHERE username = ?', [username], async (err, results) => {
            if (err) return res.status(500).send('Server error');
            if (results.length === 0) {
                return res.status(400).send('Username or password is incorrect');
            }
            const user = results[0];
            const validPass = bcrypt.compareSync(password, user.password);
            if (!validPass) {
                return res.status(400).send('Username or password is incorrect');
            }
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
            res.json({
                username: user.username,
                token
            });
        });
    } catch (e) {
        res.status(500).send('Server error');
    }
});

module.exports = router;