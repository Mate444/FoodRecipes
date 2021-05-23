import React, { useState, } from 'react';
import {useSelector} from 'react-redux';
import style from './Filter.module.css'
const Filter = ({ sortRecipes, handleClick, dispatch, filterRecipes, diets }) => {
    const filteredRecipes = useSelector(state => state.filteredRecipes)
    const recipes =useSelector(state => state.recipes)

    console.log(filteredRecipes);
  //  console.log(sortType);
    return (
      <div className={style.all}>
      <div className={style.sort}>
      <label className={style.labelSort}>Sort by</label>
         <select placeholder="Select" onChange={e => dispatch(sortRecipes(e.target.value, filteredRecipes))}>
           <option  value=""> Select sort </option>
           <option  value="alphaAsc"> A-Z </option>
           <option  value="alphaDesc"> Z-A </option>
           <option  value="scoreRating"> Rating </option>
         </select>
         </div>
        
    <div>
        <label className={style.filterTypeLabel} onClick={handleClick}>Filter by:</label>
    <select onChange={(e) => dispatch(filterRecipes(e.target.value, recipes, filteredRecipes))}>
        <option value="">All</option>
    {
        diets && diets.map((diet, index) => {
            return (
                    <option key={index} value={diet}>{diet}</option>
            )
        })
    }
    </select>
    </div>
    </div>
    )
}
export default Filter;