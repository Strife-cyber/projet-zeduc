import React, { useState, useEffect } from 'react';
import usePlat from '../../utilities/employer/plat';
import MealCard from './meal_card_add';
import MealSlider from './meal_slider';
import Modal from './modal';
import AddNewMealModal from './new_meal_modal';
import { Tooltip } from 'react-tooltip';
import './food_adder.css';
import useMenuEmployer from '../../utilities/employer/menu_employer';
import ToastComponent from '../toast/toast';

const FoodAdderComponent = () => {
    const { fetchPlat, insererPlat } = usePlat();
    const { insererMenu, delMenu, getMenu } = useMenuEmployer();
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [availableMeals, setAvailableMeals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingMeal, setIsAddingMeal] = useState(false);
    const [newMeal, setNewMeal] = useState({ nom: '', prix: '', image: null });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Fetch available meals from backend when modal is opened
    useEffect(() => {
        if (isModalOpen) {
            const fetchMeals = async () => {
                const meals = await fetchPlat();
                setAvailableMeals(meals);
            };
            fetchMeals();
        }
    }, [isModalOpen]);

    // Fetch data for selected meals only on component mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMenu(); // Fetch the menu data
            if (Array.isArray(data)) {
                setSelectedMeals(data); // Set selected meals directly
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures it runs only once

    const handleMealSelect = async (meal) => {
        const response = await insererMenu(meal.id_plat);
        if (response.message === 'true') {
            setSelectedMeals(prevSelectedMeals => [...prevSelectedMeals, meal]);
            setIsModalOpen(false);
            setToastMessage("Plat ajouté avec succès");
        } else {
            setToastMessage("Erreur lors de l'ajout du plat");
        }
        setShowToast(true);
    };

    const handleAddMeal = () => {
        setNewMeal({ nom: '', prix: '', image: null }); // Reset the new meal form
        setIsAddingMeal(true);
        setIsModalOpen(false);
    };

    const handleSaveNewMeal = async () => {
        const response = await insererPlat(newMeal.image, newMeal.nom, newMeal.prix);
        if (response.message) {
            setIsAddingMeal(false);
            setNewMeal({ nom: '', prix: '', image: null });
            setIsModalOpen(true); // Reopen the modal to show the updated list
            setToastMessage("Nouveau plat ajouté avec succès");
        } else {
            setToastMessage("Erreur lors de l'ajout du plat");
        }
        setShowToast(true);
    };

    const handleMealDelete = async (idPlat) => {
        const response = await delMenu(idPlat);
        if (response.message) {
            setSelectedMeals(prevSelectedMeals =>
                prevSelectedMeals.filter(meal => meal.id_plat !== idPlat)
            );
            setToastMessage("Plat supprimé avec succès");
        } else {
            setToastMessage("Erreur lors de la suppression du plat");
        }
        setShowToast(true);
    };

    return (
        <div>
            <h1 className='text-center' style={{ margin: '0', padding: '50px 0 100px 0', fontSize: '50px', fontFamily: 'pacifico' }}>
                Menu Du Jour
            </h1>
            <div className="food-adder-component">
                {/* Display selected meals */}
                {selectedMeals.map((meal, index) => (
                    <MealCard key={index} nom={meal.nom} image={meal.image} prix={meal.prix} onDelete={() => handleMealDelete(meal.id_plat)} activate={true} />
                ))}

                {/* Button to add new meal */}
                <div>
                    <div
                        className="add-meal-card"
                        data-tooltip-id="add-meal-tooltip"
                        data-tooltip-content="Ajouter Un plat"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="circle-container">
                            <i className="fas fa-utensils"></i>
                        </div>
                    </div>
                    <Tooltip id="add-meal-tooltip" />
                </div>

                {/* Modal to select a meal */}
                <Modal isOpen={isModalOpen} title="Choisissez un plat" onClose={() => setIsModalOpen(false)}>
                    <MealSlider meals={availableMeals} handleMealSelect={handleMealSelect} handleAddMeal={handleAddMeal} />
                </Modal>

                {/* Toast message */}
                {showToast && <ToastComponent message={toastMessage} activate={showToast} />}

                {/* Modal to add a new meal */}
                <AddNewMealModal
                    isAddingMeal={isAddingMeal}
                    newMeal={newMeal}
                    setNewMeal={setNewMeal}
                    handleSaveNewMeal={handleSaveNewMeal}
                    onClose={() => setIsAddingMeal(false)}
                />
            </div>
        </div>
    );
};

export default FoodAdderComponent;
