import React from 'react';
import style from './Paginate.module.css'

const Paginate = ({ recipesPerPage, totalRecipes, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(totalRecipes / recipesPerPage + 1); i++) {
        pageNumbers.push(i); //push each index, in this case where about 100 hundred recipes will be loaded, 11 pages will be made
    }
    return (
        <div className={style.pagination}>
           <nav className={style.nav}>
               <ul className={style.ul}>
                   {pageNumbers.map(number => {
                       return (
                           <li key={number} className={style.nums}>
                               <a className={style.a} onClick={() => paginate(number)} href="/home#" className="page-link" >
                               {number}
                               </a>
                           </li>
                       )
                   })}
               </ul>
           </nav>
        </div>
    )
}
export default Paginate;