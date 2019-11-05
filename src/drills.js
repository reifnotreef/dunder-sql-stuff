require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const searchDb = queryInput => {
  dbResults = knexInstance
    .select('*')
    .from('shopping_list')
    .whereRaw(`LOWER(name) LIKE ?`, [`%${queryInput}%`])
    .then(result => {
      console.log(result);
    });
};
searchDb('facon');
