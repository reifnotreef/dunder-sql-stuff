require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

// 1. Get all items that contain text
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

// 2. Get all items paginated
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

// 3. Get all items added after date
const searchAfterDate = daysAgo => {
  dbResults = knexInstance
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .then(result => {
      console.log(result);
    });
};
// searchAfterDate(30);

// 4. Get the total cost for each category
// The function will query the shopping_list
// table using Knex methods and select the
// rows grouped by their category and showing
// the total price for each category.

const totalCost = () => {
  dbResults = knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
};
// totalCost();
