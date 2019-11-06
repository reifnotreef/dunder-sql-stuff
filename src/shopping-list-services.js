const ShoppingListServices = {
  getAll(knex) {
    return knex.select('*').from('shopping_list');
  },
  getById(knex, id) {
    return knex
      .select('*')
      .where({ id })
      .from('shopping_list')
      .first();
  },
  updateItem(knex, id, data) {
    return knex('shopping_list')
      .where({ id })
      .update(data);
  },
  insertItem(knex, item) {
    return knex('shopping_list').insert(item);
  },
  deleteById(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .del();
  },
};

module.exports = ShoppingListServices;
