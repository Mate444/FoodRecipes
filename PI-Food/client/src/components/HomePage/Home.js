import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterRecipes, sortRecipes} from '../../actions/actions';
import { Link } from 'react-router-dom';
import Recipes from '../Recipes/Recipes';
import Paginate from '../Paginate/Paginate';
import Filter from '../Filter/Filter';
import style from './Home.module.css';

const Home = () => {
    //
    const [recipeName, setRecipeName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);

    let diets = useSelector(state => state.diets);
    let filteredRecipes = useSelector(state => state.filteredRecipes);
    
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getDiets())
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipes(recipeName));
    }
    const paginate = (pagenumber) => setCurrentPage(pagenumber); 
   
    const indexOfLastRecipes = currentPage * recipesPerPage; // 1 * 9 = 9 =last Index;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage; //9 - 9 = 0 =first Index
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes); //firstRecipe = i(0). lastRecipe = i(9)
    return (
        <div className={style.all}>
            <div className={style.searchBar}>
            <form className={style.form} onSubmit={e => handleOnSubmit(e)} >
            <label className={style.label}>
                Search Recipes
                <input className={style.recipeInput} type="text" id="title" onChange={e => setRecipeName(e.target.value)} value={recipeName} placeholder="Search for a recipe" required />
                <button className={style.recipeSearchButton}>                   
                                    🔎
                </button>
            </label>
            </form>
            </div>
            <h1>H</h1>
            <h1 className={style.title}>Home Page</h1>
            <div className={style.ui}>
                <div>
                    <Link to={'/create'}>
                    <button className={style.routerTrigger}> Create your Recipe </button>
                    </Link>
                </div>
               <Filter
               sortRecipes={sortRecipes}
               handleClick={handleClick}
               dispatch={dispatch}
               filterRecipes={filterRecipes}
               diets={diets}
               filteredRecipes={filteredRecipes}
               />
    </div>
           <Recipes 
           recipes={currentRecipes}
           diets={diets}
           /> 
         { <Paginate 
           recipesPerPage={recipesPerPage}
           totalRecipes={filteredRecipes.length}
           paginate={paginate}
         />}
        </div>
    )
}
export default Home