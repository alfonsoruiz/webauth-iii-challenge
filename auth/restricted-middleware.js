const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username }) // Finds user by username key and value ********* username: username *********
      .first()
      .then(user => {
        // Verifies password guess//attempt is === hashed password returned from database after finding user by username in db
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error loggin in' });
      });
  } else {
    res.status(400).json({ message: 'Please provide valid credentials' });
  }
};
