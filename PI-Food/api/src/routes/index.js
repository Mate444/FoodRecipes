const { Router } = require('express');
const  Recipe = require('./recipe');
const  Types = require('./types');
const Recipes = require('./recipes');
const RecipeDetail = require('./recipeDetail');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(Recipe);

router.use(Types);

router.use(Recipes);

router.use(RecipeDetail);

module.exports = router;
