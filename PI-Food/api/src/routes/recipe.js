const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { Recipe, Diet } = require('../db');

//post a recipe to the db
const recipe = router.post('/recipe', async (req, res) => {
    
    const { diets, title, description, spoonacularScore, healthScore, instructions } = req.body;  
  
    try {
        console.log(diets.length)
            const id = uuidv4();
             const addRecipe = await Recipe.create({
                        id,
                        title,
                        instructions,
                        spoonacularScore,
                        healthScore,
                        description,
                })
            for (let index = 0; index < diets.length; index++) {
                const secureId = uuidv4();
                const dietBody = {dietName: diets[index]};
                const { dietName } = dietBody;
                const addDiet = await Diet.create({
                    id: secureId,
                    dietName
                })
                await addRecipe.addDiet(addDiet);
            }
                const recipes = await Recipe.findAll({
                    include: [Diet]
                });
                console.log('here are the recipes')
                recipes.forEach(recipe => console.log(recipe.toJSON()))
                return res.send('Recipe added to database');
              
              return res.status(404)
    }
    catch (err) {
       console.log(err)
    }
})

module.exports = recipe;