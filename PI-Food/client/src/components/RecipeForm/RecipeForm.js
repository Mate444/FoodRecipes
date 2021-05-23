import React, { useState } from 'react';
import { addRecipe } from '../../actions/actions';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import style from './RecipeForm.module.css'
import Form from '../Form/Form';

export const RecipeForm = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        spoonacularScore: '',
        healthScore: '',
        instructions: '',
        diets: ''
    })
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        }) 
      }

      const handleOnSubmit = (e) => {
          e.preventDefault()
          if(input.diets.length < 4) return alert('add a diet to your recipe')
          input.diets = input.diets.split(',')
          dispatch(addRecipe(input))
          return alert('Your recipe was succesfully created!')
      }
    return (
        <div className={style.all}>
            <h1 className={style.h1}>Recipe form</h1>
            <div>
                    <Link to={'/home'}>
                    <button className={style.exitButton}> Go to Home Page </button>
                    </Link>
                </div>
            <form onSubmit={handleOnSubmit}>
                <div className={style.column}>
                    <Form handleInputChange={handleInputChange}/>
                </div>
                
            </form>
            
        </div>
    )
}
export default RecipeForm;
/*<div className={style.formBackground}></div>*/