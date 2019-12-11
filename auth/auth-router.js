const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/register', (req, res) => {
  const user = req.body;

  /*
    - bcrypt hashSync method is processed sychronously so nothing else will run until hashSync has 
    finished processing and takes in password from req.body and hashes it
  */
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash; // sets the password on req.body to hashed password

  Users.add(user)
    .then(user => {
      const token = generateToken(user);

      res.status(200).json({ user: user, token: token });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error adding user to databse' });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username }) // Finds user by username key and value ********* username: username *********
    .first()
    .then(user => {
      // Verifies password guess//attempt is === hashed password returned from database after finding user by username in db
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Hello ${user.username} you have successfully loged in`,
          token,
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error loggin in' });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
