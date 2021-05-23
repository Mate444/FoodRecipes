const express = require('express');
const router = express.Router();
const { Diet } = require('../db');
//const Sequelize = require('sequelize');

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

//gets all diet types.
const dietTypes = router.get('/types', async (req, res) => {
    const recipesArr = [];
    const dietsArr = [];

      try {
          const dbQuery = await Diet.findAll()
          if(dbQuery.length > 9) {
             return res.json(dbQuery)
          }
        const recipeResponses = await axios.get(`https://api.spoonacular.com/recipes/complexSearch${API_KEY}&addRecipeInformation=true&diet=ketogenic`);
            recipeResponses.data.results.forEach(recipe => recipesArr.push(recipe));
            recipesArr.forEach(recipe => {
                recipe.vegan = 'vegan';
                recipe.vegetarian = 'vegetarian';
                recipe.glutenFree = 'gluten free';
                dietsArr.push(recipe.vegan, recipe.glutenFree, recipe.vegetarian, recipe.diets);
            })
           for (let i = 0; i < dietsArr.length; i++) {
               const id = uuidv4();
               //dietsArr has nested arrays inside
               if (Array.isArray(dietsArr[i])) {
                dietsArr[i].forEach(diets => dietsArr.push(diets));
               } 
               const dietBody = {dietName: dietsArr[i]};
               const { dietName } = dietBody;
                   await Diet.findOrCreate({
                       where: {dietName},
                       defaults: {dietName, id}
                   })
           }
           return Diet.findAll()
           .then(diet => res.json(diet))
           .catch(err => console.log(err))
           } catch (error) {
                console.log(error);
       }
 })
   


module.exports = dietTypes;

//glutenFree, ovo-vegetarian, vegan, vege


//Diet.findAll()
//.then(async diet => {
   // if ()
//     try {
//         const recipeResponses = await axios.get(`https://api.spoonacular.com/recipes/complexSearch${API_KEY}&addRecipeInformation=true&diet=ketogenic`);
//         recipeResponses.data.results.forEach(recipe => recipesArr.push(recipe));
//         dietsArr.push('vegan', 'ovo-vegetarian', 'lacto-vegetarian', 'ketogenic', 'paleo', 'primal', 'gluten free', 'pescetarian')
//         for (let i = 0; i < dietsArr.length; i++) {
//             const id = uuidv4();
//             const dietName =  dietsArr[i];
//             const dietBody = {dietName, id};
//             await Diet.create(dietBody);
//         }
//         return Diet.findAll()
//          .then(diet => res.json(diet))
//          .catch(err => console.log(err))
//     } catch (error) {
//         console.log(error);
//     }
// })