exports.seed = function(knex) {
  
  return knex('users').del()
    .then(function () {
     
      return knex('users').insert([
        {
          username: "bob1",
          password: "bob1234"
        },
      ]);
    });
};
