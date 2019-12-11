const express = require('express');

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();

// Restricted middlware runs before access to the endpoint
router.get('/', restricted, (req, res) => {
  console.log('users endpoint');
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json({ error: 'Error retrieving users from database' });
    });
});

module.exports = router;
