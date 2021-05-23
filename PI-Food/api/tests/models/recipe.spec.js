const { Recipe, Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({})
          .then(() => done("It requires a valid title"))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({ title: "Milanesa a la napolitana" })
          .then(() => done("it should have a title"))
          .catch(() => done());
      });
      it('title should be a string', () => {
        Recipe.create({title: 23, description:'potato chips', id: 1})
        .then(() => done('it should not have been created'))
        .catch(() => done());
      });
      it("it should not be created without id", (done) => {
        Recipe.create({ title: "Matambre con queso" })
          .then(() => done("it shouldn't have been created"))
          .catch(() => done());
        });
      it('id should be unique', (done) => {
        Recipe.create({id: 1})
          .then(() => Recipe.create({id: 1})
          .then(() => done('it should not have been created'))
          .catch(() => done()))
          .catch(() => done())
      });
      it("it should not be created without description", (done) => {
        Recipe.create({ title: "Matambre con queso" })
          .then(() => done("it should have a description"))
          .catch(() => done());
      });
      it('description should be a string', () => {
        Recipe.create({title: 'potatos', description:13213, id: 1})
        .then(() => done('it should not have been created'))
        .catch(() => done());
      });
    });
  });
});
describe("Diet Model", () => {
  before(() =>
    conn
      .authenticate()
      .catch((err) => console.error("unable to connect to db", err))
  );
  describe("Validators", () => {
    beforeEach(() => Diet.sync({ force: true }));
  });
  it('it should not be created without diet name', (done) => {
    Diet.create({})
    .then(() => done('it should not have been created'))
    .catch(() => done());
  })
  it('it should not be created without id', (done) => {
    Diet.create({dietName: 'gluten free'})
    .then(() => done('it should not have been created'))
    .catch(() => done());
  })
  it('id should be unique', (done) => {
    Diet.create({id: 1})
    .then(() => Diet.create({id: 1})
    .then(() => done('it should not have been created'))
    .catch(() => done()))
    .catch(() => done())
  })
  it('diet name should be unique', (done) => {
    Diet.create({dietName: 'gluten free'})
    .then(() => Diet.create({dietName: 'gluten free'})
    .then(() => done('it should not have been created'))
    .catch(() => done()))
    .catch(() => done())
  })
  it('diet name should be a string', (done) => {
    Diet.create({dietName: 23})
    .then(() => done('it should not have been created'))
    .catch(() => done());
  });
});
