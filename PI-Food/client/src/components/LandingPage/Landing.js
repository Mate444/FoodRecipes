import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
    return (
        <div className={style.container}>   
        <div className={style.divH1}>
            <h1 className={style.h1}>Food Recipes</h1>
        </div>
        <div className={style.divButton}>
      <Link to="/home">
          <button className={style.button}> Home </button>
          </Link>
          </div>
          <footer className={style.footer}>Henry</footer>
    </div>
    )
}
export default Landing;