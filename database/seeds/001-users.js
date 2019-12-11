exports.seed = function(knex) {
  return (
    knex('users')
      // Deletes ALL existing entries
      .truncate() // Resets all primary keys upon addition or deletion from db
      .then(function() {
        return knex('users').insert([
          { username: 'user1', password: 'password', department: 'admin' },
          { username: 'user2', password: 'password', department: 'students' },
        ]);
      })
  );
};
