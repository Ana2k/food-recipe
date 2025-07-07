//UI for the Meal-Card each meal card.
import React from 'react'
import '../styles/MealCard.css'
//Classnames from css : mealCard, mealCardImageWrapper, mealCardThumb, mealCardRating, mealCardStar, mealCardRatingValue,
//mealCardInfo, mealCardTitle, mealCardOutline --> divnames to refer

// - mealCard API name is --> meal -> strMeal, strMealThumb, idMeal.
// - onClick for the click handling on top of the card itself.
export default function MealCard({meal, onClick}){
    return(
        <div className="mealCard" onClick={()=> onClick(meal.idMeal)}>
            {/* Image-Wrapper */}
            <div className="mealCardImageWrapper">
                <img
                    className="mealCardThumb"
                    src={meal.strMealThumb}
                    alt={meal.strMeal || "Unavailable"}
                />
                <div className="mealCardRating">
                    {/* #Rating Star picture */}
                    <span className="mealCardStar">★</span>
                    <span className="mealCardRatingValue">4.0</span>
                </div>
            </div>
            {/* Meal Card Info : Title and Outline(Creator) */}
            <div className="mealCardInfo">
                <h3 className="mealCardTitle">{meal.strMeal}</h3>
                <p className="mealCardOutlin">By Chef Anushka</p>
            </div>
        </div>
    )
}



