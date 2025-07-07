//Page component.
//We make the API calls from here and connect the MealCard.js with the API using this page. 
import React,{useState, useEffect} from "react";
import '../styles/MealCard.css'
//TODO(8) : improve the HomeScreen.css values
import '../styles/HomeScreen.css'
import MealCard from "../components/MealCard";
import {getAllCategories, getFoodByCategory} from '../network/api'

export default function HomeScreen() {
    // Define props and effects first - statehooks for category, active-tab and array of meals.
    
    //TODO(2) : Done
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState('All')
    const [meals,setMeals] = useState([])

    //TODO(3) : useEffects() to run once and get all the data running.
    useEffect(() =>{
    //     "meals": [
    // {
    //   "strCategory": "Beef"
    // },
    // data.meals = all the strCategory of the meals that are incoming. 

        getAllCategories().then(data =>{
            //data.meals is [{ strCategory:'Beef'},...]
            const CATEGORY_NAME = data.meals.map(m => m.strCategory)
            setCategories(['All',...CATEGORY_NAME])
        })
        .catch(err => console.error("CATEGORY LOAD FAILURE",err))
    },[])

    //TODO(4) : useEffect to show default as seaFood. 
    //TODO --> COMPLETE THIS COMPLETELY!!!
    useEffect(() =>{
        //take the All s
        const loader = selected === "All" ? () => getFoodByCategory("SeaFood") : getFoodByCategory(selected)
        loader.then(data => 
            setMeals(data.meals)
        )
        .catch(err => console.error("MEAL LOAD FAILURE"))
    },[selected])


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
                </header>
            </div>

            {/* div : SEARCH BAR */}
            <div className="home-screen-search">
                <input type="text" placeholder="Search your favorite food."/>
                <button>🎤︎︎</button>
            </div>
            {/* div : CATEGORY TABS */}
            <nav className="home-screen-tabs">
                {categories.map(category=>(
                    <button
                        key={category}
                        className={
                            category==selected ? 'home-screen-tab--active' : 'home-screen_tab'
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

    )
}