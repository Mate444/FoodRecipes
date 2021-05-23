import React from 'react';
import Recipe from '../Recipe/Recipe';
import style from './Recipes.module.css'
const Recipes = ({ recipes }) => {
    return (
    <div className={style.container}>
 <ul className={style.all}>
                {
                    recipes && recipes.map((recipe, index) => { 
                        return (
                            <div key={index} className={style.recipeCard}>
                            <Recipe 
                            key={recipe.id}
                            title={recipe.title.toLowerCase()}
                            image={recipe.image}
                            diets={recipe.diets}
                            id={recipe.id}
                            />
                            </div>
                        )
                    })
                }
            </ul>
            </div>
    )
}
export default Recipes;