//Page component.
//We make the API calls from here and connect the MealCard.js with the API using this page. 
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/MealCard.css'
import '../styles/HomeScreen.css'
import MealCard from "../components/MealCard";
import avatar from '../assets/dummy-avatar.png'
import {getAllCategories, getMealsByCategory} from '../network/api'
import * as api from '../network/api.js'
import { VoiceButton } from '../voiceassistant/voiceService.js'

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
    const [selectedCategories, setSelectedCategories] = useState([])

    //1_useEffects() to run once and get all the data running.
    //data.meals is [{ strCategory:'Beef'},...]
    useEffect(() =>{
        getAllCategories().then(data =>{
            const CATEGORY_NAME = data.meals.map(k => k.strCategory)
            setCategories(['All',...CATEGORY_NAME])
        })
        .catch(err => console.error("CATEGORY LOAD FAILURE",err));
    },[]);

    //2_useEffect to show default as Pasta or All. 
    useEffect(() =>{
        if ((selected === "All" && selectedCategories.length === 0) || (selectedCategories.includes('All'))) {
            // Fetch all meals from all categories and flatten
            getAllCategories().then(async data => {
                const categories = data.meals.map(k => k.strCategory);
                const allMealsArrays = await Promise.all(
                    categories.map(cat => getMealsByCategory(cat).then(res => res.meals || []))
                );
                // Flatten and deduplicate by idMeal
                const allMeals = Object.values(
                    allMealsArrays.flat().reduce((map, meal) => {
                        if(meal && meal.idMeal) map[meal.idMeal] = meal;
                        return map;
                    }, {})
                );
                setMeals(allMeals);
            }).catch(err => console.error("ALL MEALS LOAD FAILURE",err));
        } else if (selectedCategories.length > 0) {
            // Fetch meals for all selected categories and merge
            Promise.all(
                selectedCategories.map(cat => getMealsByCategory(cat).then(res => res.meals || []))
            ).then(allMealsArrays => {
                const allMeals = Object.values(
                    allMealsArrays.flat().reduce((map, meal) => {
                        if(meal && meal.idMeal) map[meal.idMeal] = meal;
                        return map;
                    }, {})
                );
                setMeals(allMeals);
            }).catch(err => console.error("MULTI CATEGORY LOAD FAILURE",err));
        } else {
            getMealsByCategory(selected)
                .then(data => setMeals(data.meals))
                .catch(err => console.error("MEAL LOAD FAILURE",err));
        }
    },[selected, selectedCategories]);


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
                {/* <button 
                    onClick = {() => {
                            const term = searchInputRef.current.value.trim()
                            if(term){
                                navigate('/search',{state : {query : term}})
                            }
                        }   
                    }
                >🎤︎︎</button> */}
                <VoiceButton
                    onResult={term =>{
                        if(term){
                            navigate('/search',{state: {query : term}})
                        }
                    }}
                />
            </div>
            <div className="home-screen-dropdown">
                <select
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                    style={{ width: '100%', height: 40, borderRadius: 10, fontSize: '1rem', padding: '0 12px', border: '1.5px solid #e0e0e0', fontFamily: 'Poppins, sans-serif', color: '#222', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {/* div : CATEGORY TABS with a nav tab. */}
            <nav className="home-screen-tabs">
                {categories.map(category=>(
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