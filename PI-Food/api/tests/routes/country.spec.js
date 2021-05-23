/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
//const route = require('../../src/routes/recipes')
const session = require('supertest-session');
const { v4: uuidv4 } = require('uuid');
const app = require('../../src/app');
const { Recipe, conn } = require('../../src/db.js');

const id = uuidv4()
const agent = session(app);
const recipe = {
  title: 'chicken',
  id,
  description: 'chicken with salade',
};

xdescribe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe(`GET /recipes`, () => {
    it('it should get 200', () =>
      agent.get(`/recipes?name=${recipe.title}`).expect(200)
    );
    it("send() should send an array", () => {
      agent.get(`/recipes?name=${recipe.title}`)
      .then((res) => {
        expect(res.body).to.be.eql(Array)
      })
    })
    it('send() should not send an empty array', () => {
      agent.get(`/recipes?name=${recipe.title}`)
      .then((res) => {
        expect(res.body).to.have(length > 0)
      })
    })
    it('it should return an error if there is one', (done) => {
      Recipe.create({})
      .then(() => done(new Error('You must return an error')))
      .catch(() => done());
    })
    it('the request should have query parameters', () => {
      agent.get(`/recipes`).expect(404)
    })
    it ('send() should send title, image, and diets', () => {
      agent.get(`/recipes?name=${recipe.title}`)
      .then(res => {
        expect(res.body[0]).to.haveOwnProperty(title)
        expect(res.body[0]).to.haveOwnProperty(image)
        expect(res.body[0]).to.haveOwnProperty(diet)
      })
    })
  });
});
