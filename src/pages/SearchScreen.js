import React, {useState, useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import MealCard from '../components/MealCard.js'
import * as api from '../network/api.js'
import '../styles/SearchScreen.css'
import { VoiceButton } from '../voiceassistant/voiceService.js'

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
        const ql = query.trim().toLowerCase()
        if(!ql){
            setResults([])
            return;
        }

        // create API calls for searchByName , searchByAreaFilter , searchByCategoryFilter 
        const searchName = api
        .getMealsByName(query)
        .then(data => data.meals || [])

        const searchIngredientsFilter = api
        .getMealsByIngredientsFilter(query)
        .then(d => d.meals || [])
        .then(list => Promise.all(
            list.map(m =>
            api.getMealById(m.idMeal).then(r => r.meals[0])
            )
        ))
        .then(fulls => fulls.filter(Boolean));

        // Enhance search Category :D
        const isCategory = categories.some(category => 
            category.toLowerCase() === query.toLowerCase());
        let searchCategoryFilter; 
        if(isCategory){
            searchCategoryFilter = api.getMealsByCategory(query).then(async data => {
                //return null if no data on meals.
                if(!data.meals)
                {
                    return [];
                }  
                // constants always end in semi-colon - dont forget them!
                const detailsPromise = data.meals.map(m =>
                    api.getMealsByName(m.strMeal)
                    .then(res => res.meals ? res.meals[0] : null)
                );
                const details = await Promise.all(detailsPromise);
                return details.filter(Boolean);
            })
        } else{
            searchCategoryFilter = Promise.resolve([]);
        }

        //Enhance searchArea - including fuzzy matching for isArea etc.
        const isArea = areas.some(a => 
            a.toLowerCase() === query.toLowerCase());
        let searchAreaFilter; 
        if(isArea){
            searchAreaFilter = api.getMealsByAreaFilter(query).then(async data => {
                //return null if no data on meals.
                if(!data.meals)
                {
                    return [];
                }  
                //dont forget the semi-colons!!
                const detailsPromise = data.meals.map(m =>
                    api.getMealsByName(m.strMeal)
                    .then(res => res.meals ? res.meals[0] : null)
                );
                const details = await Promise.all(detailsPromise);
                return details.filter(Boolean);
            })
        } else{
            searchAreaFilter = Promise.resolve([]);
        }

        // Remove area endpoint from search logic
        // Only use endpoints that return full meal details

        // Run all the API calls in parallel
        Promise.all([searchName, searchCategoryFilter, searchAreaFilter, searchIngredientsFilter])
        .then(arrays => {
            // De-duplications
            const dedup = Object.values(
                arrays.flat().reduce((map, meals) => {
                    if (meals && meals.idMeal) {
                        map[meals.idMeal] = meals;
                    }
                    return map;
                },{})
            )

            // Update the filter to rely on strInstructions+others as well..
            const ql = query.toLowerCase();

            
            const filtered = dedup.filter(m => {
                // Check name, area, category, instructions
                if ((m.strMeal && m.strMeal.toLowerCase().includes(ql)) ||
                    (m.strCategory || "").toLowerCase().includes(ql) ||
                    (m.strArea || "").toLowerCase().includes(ql) ||
                    (m.strInstructions || "").toLowerCase().includes(ql) )
                    {
                    return true;
                    }

                // Check tags
                // match any tag substring without splittin
                if (m.strTags && 
                    m.strTags.toLowerCase().split(',')) 
                    {
                    
                        return true;
                    }


                // Check all ingredients
                for (let i = 1; i <= 20; i++) {
                    const ingredient = m[`strIngredient${i}`];
                    if (ingredient && ingredient.toLowerCase().includes(ql)) 
                        {
                        return true;
                        }
                }

                return false;
            });

            setResults(filtered);
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
                {/* Updated this VoiceButton! */}
                <VoiceButton
                    onResult={term =>{
                        setQuery(term);
                    }}
                />
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