require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const searchName = queryInput => {
  dbResults = knexInstance
    .select('*')
    .from('shopping_list')
    .whereRaw(`LOWER(name) LIKE ?`, [`%${queryInput}%`])
    .then(result => {
      console.log(result);
    });
};
// searchName('facon');

const searchPaginated = pageNumber => {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  dbResults = knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
};
// searchPaginated(2);
