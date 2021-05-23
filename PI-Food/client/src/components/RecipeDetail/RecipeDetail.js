import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeDetail } from '../../actions/actions';
import {Link} from 'react-router-dom'
import style from './RecipeDetail.module.css';

const RecipeDetail = (props) => {
    const recipeId = props.match.params.id
    const recipeDetail = useSelector(state => state.recipeDetail);
    const dispatch = useDispatch();
    console.log(recipeDetail.dishTypes)
    useEffect(() => {
        const dispatchRecipeDetail = () => dispatch(getRecipeDetail(recipeId))
        dispatchRecipeDetail();
    }, [])
    const parser = new DOMParser()
    const instructionsParsedHtml = parser.parseFromString(recipeDetail.instructions, 'text/html')
    const summaryParsedHtml = parser.parseFromString(recipeDetail.summary, 'text/html')
    console.log(instructionsParsedHtml.getElementsByTagName('body').item(0));
    console.log(summaryParsedHtml.getElementsByTagName('body').item(0))
    return (
        <div className={style.background}>
           
            <Link to={`/home`}>
            <button className={style.homeButton}>Go back to Home Page</button>
            </Link>
            { 
            recipeDetail && 
                    <div className={style.all}>
                        <h1 className={style.title}>Recipe Detail</h1>
                        <h2 className={style.name}>{recipeDetail.title}</h2>
                        {recipeDetail.image &&  <img className={style.image} src={recipeDetail.image} /> }
                         {recipeDetail.description && <p>{recipeDetail.description}</p>}
                           {recipeDetail.summary && <div className={style.summary} dangerouslySetInnerHTML={{__html: summaryParsedHtml.getElementsByTagName('body').item(0).innerHTML}}/>}    
                           <h2 className={style.instHeader}>Instructions:</h2>
                                <div className={style.instructions} dangerouslySetInnerHTML={{ __html: instructionsParsedHtml.getElementsByTagName('body').item(0).innerHTML }} />
                          <h1 className={style.rating}>Rating: {recipeDetail.healthScore} points</h1>
                        <h2 className={style.diets}>Diets: {recipeDetail.diets}</h2>
                        <h4 className={style.diets}> Dishes: {recipeDetail.dishTypes}</h4>
            </div>
}
        </div>
    )
}
export default RecipeDetail;