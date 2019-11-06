const ShoppingListServices = {
  getAll(knex) {
    return knex
      .select('*')
      .from('shopping_list')
      .finally(() => db.destory);
  },
};

module.exports = ShoppingListServices;
