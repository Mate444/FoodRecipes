import axios from 'axios'
const GET_RECIPES = "GET_RECIPES";
const GET_DIETS = "GET_DIETS";
const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
const ADD_RECIPE = 'ADD_RECIPE';
const FILTER_RECIPES = 'FILTER_RECIPES';
const SORT_RECIPES = 'SORT_RECIPES';

export const getRecipes = (name) => (
    async (dispatch) => {
     const request = await axios.get(`http://localhost:3001/recipes?name=${name}`)
       dispatch({
           type: GET_RECIPES,
           payload: request.data,
       })
    }
)
export const getDiets = () => (
    async (dispatch) => {
        const request = await axios.get('http://localhost:3001/types');
        console.log(request.data)
        const fixedDiets = [];
        request.data.forEach(diets => fixedDiets.push(diets.dietName))
        dispatch({
            type: GET_DIETS,
            payload: fixedDiets
        })
    }   
)
export const getRecipeDetail = (id) => (
    async (dispatch) => {
        console.log(id);
        const request = await axios.get(`http://localhost:3001/recipes/${id}`);
        console.log(request.data)
        const recipeInfo = request.data
        dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipeInfo
        })
    }
)
export const addRecipe = (recipe) => (
    async (dispatch) => {
        console.log(recipe)
        await axios.post(`http://localhost:3001/recipe`, recipe)
        dispatch({
            type: ADD_RECIPE,
            payload: {
                title: recipe.title,
                description: recipe.description,
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                diets: recipe.diets
            }
      })
    }
)
export const filterRecipes = (filterType, recipes, filteredRecipes) => (
         (dispatch) => {
             filteredRecipes = [...recipes]
             console.log(recipes)
             console.log(filteredRecipes)
            filteredRecipes.forEach(recipe => {
                if (typeof recipe.diets[0] === 'object') { //statement to set the diference between db recipes and api recipes
                 for (let i = 0; i < recipe.diets.length; i++){
                if(typeof recipe.diets[i] === 'object'){
                  recipe.diets[i] = recipe.diets[i].dietName;
                }
            }
              }
            })
            
        dispatch({
            type: FILTER_RECIPES,
            payload: {
                filterType,
                filteredRecipes: filterType === "" ? recipes : filteredRecipes.filter(r => r.diets.indexOf(filterType) >= 0),
                recipes,
            }
        })
    })
export const sortRecipes = (sortType, filteredRecipes) => ( 
       (dispatch) => {
           console.log(sortType)
           console.log(filteredRecipes)
       const recipesArr = filteredRecipes.slice()
       console.log(recipesArr)
            if(sortType === 'alphaAsc') recipesArr.sort((a, b) => (a.title > b.title) ? 1 : -1)
            if(sortType === 'alphaDesc') recipesArr.sort((a, b) => (a.title > b.title) ? -1 : 1)
            if(sortType === 'scoreRating') recipesArr.sort((a, b) => (a.spoonacularScore < b.spoonacularScore) ? 1 : -1)
            console.log(recipesArr)
            if (sortType === ''){
                return recipesArr
        }
           dispatch({
               type: SORT_RECIPES,
               payload:{
                   sortType,
                   filteredRecipes: recipesArr,
               }
           })
       }
)