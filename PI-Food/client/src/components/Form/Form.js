import React from 'react';
import style from './Form.module.css';

const Form = ({handleInputChange}) => {
    return (
        <div className={style.all}>
          <ul className={style.ulForm}>
            <li>
                <label >Recipe title: </label>
             <input placeholder="Title" type="text" name="title" onChange={handleInputChange} required/>
            </li>
            <li>
            <label>Recipe rating:</label>
               <input placeholder="Rating" type="number" name="spoonacularScore" onChange={handleInputChange} required/>
            </li>
            <li>
            <label >Health rating:</label>
              <input placeholder="Health Rating" type="number" name="healthScore" onChange={handleInputChange} required/>
            </li>
            <li>
            <label >Recipe description:</label>
              <textarea placeholder="Description" name="description" onChange={handleInputChange} cols="30" rows="5" required/>
            </li>
            <li>
            <label >Recipe instructions:</label>
            <textarea placeholder="Instructions" name="instructions" onChange={handleInputChange} required/>
            </li>
            <li> <label >Add a diet:</label>
             <input placeholder="Diets" type="text" name="diets" onChange={handleInputChange} required/>
             </li>
             <li>
             <button className={style.formSubmit} type="submit">Create new recipe</button>
             </li>
            </ul>
        </div>
    )
}
export default Form;