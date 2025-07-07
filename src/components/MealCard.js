//UI for the Meal-Card each meal card.
import React from 'react'
import '../styles/MealCard.css'
//Classnames from css : mealCard, mealCardImageWrapper, mealCardThumb, mealCardRating, mealCardStar, mealCardRatingValue,
//mealCardInfo, mealCardTitle, mealCardOutline --> divnames to refer

// - mealCard API name is --> meals -> strMeal, strMealThumb, idMeal.
// - onClick for the click handling on top of the card itself.
export default function MealCard({meals, onClick}){
    return(
        <div className="mealCard" onClick={()=> onClick(meals.idMeal)}>
            {/* Image-Wrapper */}
            <div className="mealCardImageWrapper">
                <img
                    className="mealCardThumb"
                    src={meals.strMealThumb}
                    alt="Unavailable"
                />
                <div className="mealCardRating">
                    {/* #Rating Star picture */}
                    <span className="mealCardStar">★</span>
                    <span className="mealCardRatingValue">4.0</span>
                </div>
            </div>
            {/* Meal Card Info : Title and Outline(Creator) */}
            <div className="mealCardInfo">
                <h3 className="mealCardTitle">{meals.strMeal}</h3>
                <p className="mealCardOutlin">By Chef Anushka</p>
            </div>
        </div>
    )
}



