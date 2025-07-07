//Expose API function calls here. 
//Reminder : Remove the / part before you add the const BASE. 
const BASE = "https://www.themealdb.com/api/json/v1/1"


export async function getAllCategories(){
    const URL_ALLCATEGORIES = `/list.php?c=list`
    const res = await fetch(`${BASE}${URL_ALLCATEGORIES}`)
    return res.json()
}


export async function getFoodByCategory(category){

    const URL_FOODCATEGORY = `/filter.php?c=${encodeURIComponent(category)}`
    const res = await fetch(`${BASE}${URL_FOODCATEGORY}`)
    return res.json()
}
