const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Recipe, Diet } = require('../db');

const API_KEY = process.env.API_KEY;

const Recipes = router.get('/recipes', async (req, res) => {
    if (!req.query.name) {
        return res.status(404).send("Sorry, we couldn't find the recipe you are looking for");
    }
    const recipesArr = [];
        try {
            const recipeResponses = await axios.get(`https://api.spoonacular.com/recipes/complexSearch${API_KEY}&addRecipeInformation=true&query=${req.query.name}&number=230`);
            recipeResponses.data.results.forEach(recipe => recipesArr.push(recipe))
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }  
         
        Recipe.findAll({
            include: [Diet]
        })
    .then(recipes => {
        recipes.forEach(recipe => {
            recipesArr.push(recipe)
        })
        if (recipesArr.length === 0) return res.status(404).send("Sorry, we couldn't find the recipe you are looking for");
       return res.send(recipesArr);
    })
        .catch(err => err);
});


module.exports = Recipes;