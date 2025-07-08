import React, {useState, useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import MealCard from '../components/MealCard.js'
import * as api from '../network/api.js'
import '../styles/SearchScreen.css'

export default function SearchScreen(){
    // DECLARATIONS 
    // get the location, then grab the state.query from HomeScreen.

    //ERRORS : massive initial errors on state and location usage

    const location = useLocation();
    // Location takes the location from home -> if you type in the searchbox - it works 
    // but from HomeScreen the initial query is not set correctly
    // useLocation () --> gets you {pathname, search, hash, state, key};
    const initialQuery = location.state?.query || '';
    const navigate = useNavigate();

    //stateHooks -> query, results
    // query was not a string and gave a ton of errors!
    const [query, setQuery] = useState(initialQuery)
    //Remember to use a blank array here!!
    const [results, setResults] = useState([])
    const [categories, setCategories] = useState([])
    const [areas, setAreas] = useState([])

    // STATE HOOKS : UseEffects - assign all categories and all areas. 
    useEffect(() => {

        api.getAllCategories()
        .then(data => setCategories(data.meals.map(m => m.strCategory)))
        .catch(console.error)

        api.getAllAreas()
        .then(data => setAreas(data.meals.map(m => m.strArea)))
        .catch(console.error)

    },[])

    // Manually clear the results if there is a change in the query words. 
    // Keep a track of the API Calls being made inside Use-Effect for each of By Name, By Categories etc. 
    //This is the main-search logic with parallel threading and 4 API calls in total. 
    //This is made to a= ; i= ; in the categories and so on...
    useEffect(() => {
        if(!categories.length || !areas.length){
            // we have not yet loaded lookups so bail out and return.
            return
        }
        if(query.trim()==="") {
            setResults([])
            return;
        }

        // create API calls for searchByName , searchByAreaFilter , searchByCategoryFilter 
        const searchName = api.getMealsByName(query).then(data => data.meals || [])
        const searchIngredientsFilter = api.getMealsByIngredientsFilter(query).then(data => data.meals || [])

        const searchCategoryFilter = categories.includes(query) ? api.getMealsByCategory(query).then(data => data.meals || [])
        : Promise.resolve([])
        const searchAreaFilter = areas.includes(query) ? api.getMealsByAreaFilter(query).then(data => data.meals || [])
        : Promise.resolve([])

        //Run all the API calls parallely
        Promise.all([searchName, searchCategoryFilter, searchAreaFilter, searchIngredientsFilter])
        .then(arrays => {
            // De-duplications
            const dedup = Object.values(
                arrays.flat().reduce((map, meals) => {
                    map[meals.idMeal] = meals
                    return map
                },{})
            )

            // Update the filter to rely on strInstructions+others as well..
            const filtered = dedup.filter(m => 
                m.strInstructions?.toLowerCase().includes(query.toLowerCase()) ||
                m.strCategory?.toLowerCase().includes(query.toLowerCase()) ||
                m.strMeal?.toLowerCase().includes(query.toLowerCase()) ||
                m.strArea?.toLowerCase().includes(query.toLowerCase()) ||
                m.strTags?.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered.length?filtered : dedup)
            // const filtered = dedup.filter(m => m.strInstructions?.toLowerCase().includes(query.toLowerCase()))
            // setResults(filtered.length?filtered : dedup)
        })

        .catch(err => {
            console.error("SEARCH ERROR",err)
            setResults([])
        })
    },[query,categories,areas])
    //UI elements hook=up
    return (
        // HEADER+BackARROW
        <div className = "search-screen">
            <header className='search-screen-header'>
                <button className="search-back-button" onClick={() => navigate(-1)}>
                    ←
                </button>
                <h1>Search Recipes.</h1>
            </header>

            <div className="search-screen-search">
                <input 
                    type="text"
                    placeholder="Type to Search..."
                    value={query}
                    onChange={(inp => setQuery(inp.target.value))}
                />
                <button>🎤︎︎</button>
            </div>

            <div className='search-screen-results'>
                {results.length} result{results.length !== 1 && 's'}
            </div>
            <div className='search-screen-grid'>
                {results.map(meals =>(
                    <MealCard
                        key={meals.idMeal}
                        meal = {meals}
                        onClick = {id => console.log('detail',id)}
                    />
                ))}
            </div>
        </div>
    )
}