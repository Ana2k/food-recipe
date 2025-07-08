//Expose API function calls here. 
//Reminder : Remove the / part before you add the const BASE. 
const BASE = "https://www.themealdb.com/api/json/v1/1"


export async function getAllCategories(){
    const URL_ALLCATEGORIES = `/list.php?c=list`
    const res = await fetch(`${BASE}${URL_ALLCATEGORIES}`)
    return res.json()
}

export async function getAllAreas(){
    const URL_ALLAREAS = `/list.php?a=list`
    const res = await fetch(`${BASE}${URL_ALLAREAS}`)
    return res.json()
}

export async function getMealsByCategory(category){
    const URL_FOODCATEGORY = `${BASE}/filter.php?c=${encodeURIComponent(category)}`
    const res = await fetch(`${URL_FOODCATEGORY}`)
    return res.json()
}

// Search Call function by Search Names.
export async function getMealsByName(query_name){
    const URL_FOODNAME = `${BASE}/search.php?s=${encodeURIComponent(query_name)}`
    const res = await fetch(`${URL_FOODNAME}`)
    return res.json()
}


export async function getMealsByAreaFilter(query_area){
    const URL_AREANAME = `${BASE}/filter.php?a=${encodeURIComponent(query_area)}`
    const res = await fetch(`${URL_AREANAME}`)
    return res.json()
}

export async function getMealsByIngredientsFilter(query_ingredients){
    const URL_INAME = `${BASE}/filter.php?i=${encodeURIComponent(query_ingredients)}`
    const res = await fetch(`${URL_INAME}`)
    return res.json()   
}


