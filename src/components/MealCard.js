//UI for the Meal-Card each meal card.
import React from 'react'
import '../styles/MealCard'

export default function MealCard((mealCardAPI)){
    //TODO(1) : Call APIs appropriately in the HomeScreen page.
    //TODO(2) : Attatch all the css elements with the API elements



    //we should also get the API values for one card : "strMeal": "Baked salmon with fennel & tomatoes",
    //   "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    //   "idMeal": "52959"
    //strMeal, idMeal, strMealThumb = meal-api call values, for one call.
    
    // I want it to have clicking, I want it to have some of the dummy values. 
    // I want it to have props that are relevant to the API I am calling it from. 

    //What are the css elements I need to call?
    //a click function onClick on mealCard.

    return(
        <div className='meal-card' onClick={()=> onClick(mealCardAPI.idmeal)}>
            {/* Card -> ImageWrapper -> In it thumbnail, rating, creator, descriptions. */}
            <div className='meal-CardImageWrapper'>
                <img>
                className="mealCardThumb"
                src={mealCardAPI.}
                </img>
            </div>
            </div>
    )
}



