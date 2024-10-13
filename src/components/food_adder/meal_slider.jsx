// src/components/MealSlider.js
import React, { useRef } from 'react';
import MealCard from './meal_card_add';
import { Tooltip } from 'react-tooltip';

const MealSlider = ({ meals, handleMealSelect, handleAddMeal }) => {
    const sliderRef = useRef(null);

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    return (
        <div className="meal-slider">
            <div className="meal-list-container" ref={sliderRef}>
                <div className="meal-list">
                    {meals.map((meal, index) => (
                        <MealCard
                            key={index}
                            image={meal.image}
                            nom={meal.nom}
                            prix={meal.prix}
                            onSelect={() => handleMealSelect(meal)}
                        />
                    ))}
                    <div>
                        <div
                            className="add-meal-card"
                            data-tooltip-id="add-meal-tooltip"
                            data-tooltip-content="Ajouter Un plat"
                            onClick={handleAddMeal}
                        >
                            <div className="circle-container">
                                <i className="fas fa-utensils"></i>
                            </div>
                        </div>
                        <Tooltip id="add-meal-tooltip" />
                    </div>
                </div>
            </div>
            <button className="slide-left" onClick={scrollLeft}>←</button>
            <button className="slide-right" onClick={scrollRight}>→</button>
        </div>
    );
};

export default MealSlider;
