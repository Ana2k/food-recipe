//Expose API function calls here. 
//Reminder : Remove the / part before you add the const BASE. 
const BASE = "https://www.themealdb.com/api/json/v1/1"


export async function getAllCategories(){
    const ALLCATEGORIES = "/list.php?c=list"
    const res = await fetch(`${BASE}/${ALLCATEGORIES}`)
    return res.json()
}

export async function getFoodByCategory(){
    // TODO() -> Update category to dynamically take c = values. using strCategory.
    const FOODCATEGORY = "/filter.php?c=Seafood"
    const res = await fetch(`${BASE}/${FOODCATEGORY}`)
    return res.json()
}
