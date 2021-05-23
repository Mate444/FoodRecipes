import React from 'react';
import { Link } from 'react-router-dom';
import style from './Recipe.module.css';
//Renders each result from the api
const Recipe = ({ title, image, diets, id}) => {
    for (let i = 0; i < diets.length; i++){
        if (typeof diets[i] === 'object'){
            diets[i] = diets[i].dietName
        }
    }
    return (
        <div className={style.allRecipes}>
            <Link className={style.Link} to={`/recipe/${id}`}>
            <h2 className={style.title}>{title}</h2>
            <img className={style.img} src={image} alt=""/>
            </Link>
            <h3 className={style.diets}>diets: {diets.join(', ')} </h3>
           
        </div>
    )
}
export default Recipe