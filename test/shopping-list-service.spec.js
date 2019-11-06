const ShoppingListServices = require('../src/shopping-list-services');
const knex = require('knex');

describe('ShoppingListServices does what it should', () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main',
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack',
    },
    {
      id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch',
    },
    {
      id: 4,
      name: 'Fourth test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast',
    },
  ];

  before = () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  };
  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('shopping_list has data', () => {
    // insert testItems into shopping_list
    beforeEach(() => db.into('shopping_list').insert(testItems));

    it(`getAll() resolves all from 'shopping_list'`, () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }));
      return ShoppingListServices.getAll(db).then(actual => {
        expect(actual).eql(expectedItems);
      });
    });
    it(`getById() resolves an article by id from 'shopping_list' table`, () => {
      const targetId = 3;
      return ShoppingListServices.getById(db, targetId).then(actual => {
        expect(actual.checked).eql(false) &&
          expect(actual.name).eql('Third test item!');
      });
    });
    it(`updateItem() updates an article by id in the 'shopping_list' table`, () => {
      const idToUpdate = 3;
      const newItemData = {
        name: '$1 Bob',
        price: '1.00',
        date_added: new Date(),
        checked: true,
      };
      return ShoppingListServices.updateItem(db, idToUpdate, newItemData).then(
        () => {
          return ShoppingListServices.getAll(db).then(actual => {
            expect(actual[3].name).eql(newItemData.name);
          });
        }
      );
    });
    it(`insertItem() inserts an article in to the 'shopping_list' table`, () => {
      const newItem = {
        id: 99,
        name: '$1 Bob',
        date_added: new Date(),
        price: '1.00',
        category: 'Snack',
      };
      ShoppingListServices.insertItem(db, newItem).then(() => {
        () => {
          return ShoppingListServices.getAll(db).then(actual => {
            expect(actual[99].name).eql('$1 Bob');
          });
        };
      });
    });
    it(`deleteItem() removes an article by id from 'shopping_list' table`, () => {
      const targetId = 3;
      const expectedItems = testItems
        .map(item => ({
          ...item,
          checked: false,
        }))
        .splice(2, 1);
      ShoppingListServices.deleteById(db, targetId).then(() => {
        () => {
          return ShoppingListServices.getAll(db).then(actual => {
            expect(actual).eql(expectedItems);
          });
        };
      });
    });
  });
  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListServices.getAll(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
  });
});
