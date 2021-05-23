const initialState = {
    recipes: [],
    diets: [],
    recipeDetail: [],
    newRecipe: {},
    newDiets: [],
    filteredRecipes: [],
    filterType: "",
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            console.log(action.payload)
        return {
            ...state,
            recipes: action.payload,
            filteredRecipes: action.payload
        }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload.filter((d, i) => action.payload.indexOf(d) === i)
            } 
        case 'GET_RECIPE_DETAIL':
           // console.log(action.payload)
            return {
                ...state,
                recipeDetail: action.payload
            }
        case 'ADD_RECIPE':
            return {
                ...state,
                newRecipe: action.payload
            }
        
        case 'FILTER_RECIPES':
          //  console.log('reducers here')
          console.log(action.payload)
            return {
                ...state,
                filteredRecipes: action.payload.filteredRecipes,
                recipes: action.payload.recipes,
                filterType: action.payload.filterType
            }
        case 'SORT_RECIPES':
           // console.log(action.payload)
            return {
                ...state,
                filteredRecipes: action.payload.filteredRecipes,
                sortType: action.payload.sortType,
            }
        default:
             return state;
    }
}
export default rootReducer;