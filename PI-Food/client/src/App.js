import React from 'react';
// import './App.css';
import { Route } from 'react-router';
import Home from './components/HomePage/Home';
import Landing from './components/LandingPage/Landing';
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import RecipeForm from './components/RecipeForm/RecipeForm';

//landing page
function App() {
  return (
    <>
        <Route exact path="/" component={Landing}/>
    <Route path="/home" component={Home}/>
    <Route  path='/recipe/:id' component={RecipeDetail}/>
    <Route  path='/create'component={RecipeForm}/>
    </>
  );
}

export default App;

















/*
uen dia Marti, tengo una duda sobre el enunciado, que pide paginar desde el front las primeras 100 recetas extraidas de la api, pero tengo que pedirlas a la api externa o al back? (edited) 

Martina Scomazzon  10:24 AM
Mate, vos del back te vas a traer las 100 + las de la db. Eso lo recibis en el front en un arreglo …. cof cof
10:24
y ahi vos lo que tenes que hacer, es trabajar con la segmentacion de ese arreglo para renderizar segun la pagina en la que se encuentre
10:24
me explico ?

Mateo Hernandez - FT11  10:38 AM
o sea que no tengo que hacer la llamada a la api externa desde el front, sino desde el back. y desde el back filtrar las primeras 100. Perfecto, y otra duda,  se puede usar axios en vez de fetch?

Martina Scomazzon  10:43 AM
Osea, vos cargas la pagina, le pedis a tu API la información de las 100 > lo devolves en un array > el array lo recibe el front > el front va mostrando segun la pgina en la que esta.
Sisi, se puede usar axios
10:44
la api externa la llamas desde tu bacck
10:44
porque vos desde tu front, vas a pedirle a tu back
*/