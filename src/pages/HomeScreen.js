//Page component.
//We make the API calls from here and connect the MealCard.js with the API using this page. 
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/MealCard.css'
import '../styles/HomeScreen.css'
import MealCard from "../components/MealCard";
import avatar from '../assets/dummy-avatar.png'
import {getAllCategories, getMealsByCategory} from '../network/api'

export default function HomeScreen() {
    const navigate = useNavigate()
    const searchInputRef = useRef()
    //stateHooks
    //categories : for all the category names : "All","Seafood",...
    //selected : for which tab is currently active
    //meals : list of meals to render in the grid.
    const [categories, setCategories] = useState([])
   
    const [selected, setSelected] = useState('All')
    
    const [meals,setMeals] = useState([])

    //1_useEffects() to run once and get all the data running.
    //data.meals is [{ strCategory:'Beef'},...]
    useEffect(() =>{
        getAllCategories().then(data =>{
            const CATEGORY_NAME = data.meals.map(k => k.strCategory)
            setCategories(CATEGORY_NAME)
            // Set first real category as default
            if (CATEGORY_NAME.length > 0) {
                setSelected(CATEGORY_NAME[0]);
            }
        })
        .catch(err => console.error("CATEGORY LOAD FAILURE",err));
    },[]);

    //2_useEffect to show default as Pasta or All. 
    useEffect(() =>{
        if (!selected) return;
        getMealsByCategory(selected)
            .then(data => setMeals(data.meals))
            .catch(err => console.error("MEAL LOAD FAILURE",err));
    },[selected]);


    return(
        // TODO(5)
        <div className="home-screen">
            {/* div : HEADER */}
            {/* optional div but lets go. */}
            <div> 
                <header className="home-screen-header">

                    <div>
                        <h1>
                            Hello Jay!
                        </h1>
                        <p>
                            What are we having Today?
                        </p>
                    </div>

                    <img className="home-screen-avatar"
                        src={avatar}
                        alt="Avatar"
                    />
                </header>
            </div>

            {/* div : SEARCH BAR */}
            <div className="home-screen-search">
                <input 
                    type="text" 
                    placeholder="Search your favorite food."
                    ref={searchInputRef}
                    onKeyDown={e => {
                        if(e.key === "Enter" || e.key ==="Space"){
                            const term = e.target.value.trim()
                            if(term){
                                navigate('/search',{state: {query : term}})
                            }
                        }
                    }}

                />
                <button 
                    onClick = {() => {
                            const term = searchInputRef.current.value.trim()
                            if(term){
                                navigate('/search',{state : {query : term}})
                            }
                        }   
                    }
                >🎤︎︎</button>
            </div>
            {/* div : CATEGORY TABS with a nav tab. */}
            <nav className="home-screen-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={
                            category === selected ? 'home-screen-tab--active' : 'home-screen-tab'
                        }
                        onClick={() => setSelected(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>
            {/* div : {Meal Card menu - items from MealCard.js} */}
            <div className="home-screen-grid">
                {meals.map(meal =>(
                    <MealCard
                        key={meal.idMeal}
                        meal={meal}
                        onClick={id => console.log('go to details',id)}
                    />
                ))}
            </div>
        </div>
    );
}