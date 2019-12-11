const db = require('../database/db-config');

// Attaching functions to exports object
module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function add(user) {
  // Resolves to an array containing primary key/id
  const [id] = await db('users').insert(user);

  return findById(id);
}

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first();
}
