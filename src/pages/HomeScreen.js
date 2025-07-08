//Page component.
//We make the API calls from here and connect the MealCard.js with the API using this page. 
import React,{useState, useEffect} from "react";
import '../styles/MealCard.css'
import '../styles/HomeScreen.css'
import MealCard from "../components/MealCard";
import avatar from '../assets/dummy-avatar.png'
import {getAllCategories, getFoodByCategory} from '../network/api'

export default function HomeScreen() {

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
            //All - is the default tab
            setCategories(['All',...CATEGORY_NAME])
        })
        .catch(err => console.error("CATEGORY LOAD FAILURE",err));
    },[]);

    //2_useEffect to show default as Pasta or All. 
    useEffect(() =>{
        const loader = selected === "All" 
        ? () => getFoodByCategory("Pasta") 
        : () => getFoodByCategory(selected)

        // You did not put the () => in the second selected. 
        //What this did was created a promise of a function and not fulfill it for line : loader().then
        // In next line so it becomes a constant API not a function - type error thus. 
        loader().then(data => setMeals(data.meals))
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
                <input type="text" placeholder="Search your favorite food."/>
                <button>🎤︎︎</button>
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