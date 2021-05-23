const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Recipe } = require('../db');
const API_KEY = process.env.API_KEY;
/* 
what to ask to the api: data.title, data.dishtypes (array), data.image, data.spoonacularScore, data.healthScore, 
 */

const RecipeDetail = router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
  //  const recipeArr = [];
    if (!id) return res.status(404).send("Sorry, we couldn't find the recipe you are looking for");
    try {
        const recipeDetailResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information${API_KEY}`);
        const numberId = parseInt(id)
        if (numberId !== recipeDetailResponse.data.id) { 
            
            return res.status(404).send("The id you sent doesn't exists");
    }
        let { title, dishTypes, image, spoonacularScore, healthScore, diets, summary, instructions } = recipeDetailResponse.data;
        //recipeArr.push();
        dishTypes = dishTypes.join(' ')
        diishTypes = dishTypes.split(', ')
        
        res.send({
            title,
            dishTypes,
            image,
            summary,
            instructions,
            spoonacularScore,
            healthScore,
            diets
        });
    }
    catch (error) {
        const dbQuery = await Recipe.findOne({where:{id}})
            if(dbQuery !== null) return res.json(dbQuery)
        console.log('You may have introduced a wrong id!',error);
        res.sendStatus(500);
    }
})

module.exports = RecipeDetail;