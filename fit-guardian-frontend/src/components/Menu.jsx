import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import { useFoodContext } from "./FoodContext";

export default function Menu() {
	const { userMeal, setUserMeal, inputFood, setInputFood, inputFoodGrams, setInputFoodGrams } = useFoodContext();
	const [inputIsOpen, setInputIsOpen] = useState(false);
	const [activeMealId, setActiveMealId] = useState(null);

	const handleCloseInputFoodContainer = () => {
		setInputIsOpen(false);
		setActiveMealId(null);
	};
	const handleOpenInputFoodContainer = mealId => {
		setInputIsOpen(!inputIsOpen);
		setActiveMealId(mealId);
	};
	const handleRemoveFoodItem = (mealId, foodIndex) => {
		const updatedMealsAfterRemovedItem = userMeal.map(meal => {
			if (meal.id === mealId) {
				return {
					...meal,
					food: meal.food.filter((food, index) => index !== foodIndex),
				};
			}
			return meal;
		});
		localStorage.setItem("userMeal", JSON.stringify(updatedMealsAfterRemovedItem));
		setUserMeal(updatedMealsAfterRemovedItem);
	};
	const handleAddFoodItem = async () => {
		try {
			const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${inputFood}`, {
				method: "GET",
				headers: {
					"X-Api-Key": "mlvXoPbZRa8k/+ScMmOVRg==dh7Jd2IWTMotpu0B",
					"Content-type": "application/json",
				},
			});
			if (!response.ok) {
				throw Error("Wrong data!");
			}
			const data = await response.json();
			const caloriesWeight = parseFloat(inputFoodGrams);
			const newFood = {
				foodName: inputFood,
				foodCalories: `${((data.items[0].calories / 100) * caloriesWeight).toFixed(0)}kcal`,
				foodProteins: `${((data.items[0].protein_g / 100) * caloriesWeight).toFixed(0)}g`,
				foodCarbs: `${((data.items[0].carbohydrates_total_g / 100) * caloriesWeight).toFixed(0)}g`,
				foodFats: `${((data.items[0].fat_total_g / 100) * caloriesWeight).toFixed(0)}g`,
			};
			const mealIndex = userMeal.findIndex(meal => meal.id === activeMealId);

			if (mealIndex !== -1) {
				const updatedMeals = [...userMeal];
				updatedMeals[mealIndex].food.push(newFood);
				setUserMeal(updatedMeals);
				localStorage.setItem("userMeal", JSON.stringify(updatedMeals));
			}

			setInputFood("");
			setInputFoodGrams("");
			setInputIsOpen(false);
			setActiveMealId(null);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};
	useEffect(() => {
		const storedMeals = localStorage.getItem("userMeal");
		if (storedMeals) {
			setUserMeal(JSON.parse(storedMeals));
		}
	}, []);

	return (
		<div>
			<div className='menu'>
				<div className='menu__main-container'>
					<div className='menu__container'>
						<div className='menu__container-name'>
							<h3 className='menu__label'>Menu</h3>
						</div>

						<div className='menu__add-food-container'>
							{userMeal.map(meal => (
								<div key={meal.id} className='menu__meal-item-container'>
									<div className='menu__meal-item'>
										<div className='menu__meal-item-name'>{meal.name}</div>
										<button className='menu__meal-add-btn' onClick={() => handleOpenInputFoodContainer(meal.id)}>
											<span className='material-symbols-outlined'>add</span>
										</button>
									</div>
									<div className='menu__added-food-container'>
										{meal.food.map((food, index) => (
											<div key={index} className='menu__added-food-item'>
												<p className='name'>{food.foodName}</p>
												<div className='menu__macros-items-container'>
													<div className='menu__amounts-container'>
														<p>{food.foodCalories}</p>
														<p>{food.foodProteins}</p>
														<p>{food.foodCarbs}</p>
														<p>{food.foodFats}</p>
													</div>
													<button className='menu__remove-food-btn'>
														<span
															className='material-symbols-outlined'
															onClick={() => handleRemoveFoodItem(meal.id, index)}>
															delete
														</span>
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
						<div className={`menu__background-shadow ${inputIsOpen ? "open" : ""}`}>
							<div className='menu__cancel-btn' onClick={handleCloseInputFoodContainer}>
								<span className='material-symbols-outlined'>close</span>
							</div>
							<div className='menu__input-container'>
								<input
									className='menu__input-food'
									type='text'
									value={inputFood}
									onChange={e => setInputFood(e.target.value)}
								/>
								<input
									className='menu__input-food grams'
									type='number'
									value={inputFoodGrams}
									onChange={e => setInputFoodGrams(e.target.value)}
								/>
								<button className='menu__add-food-btn' onClick={handleAddFoodItem}>
									ADD FOOD
								</button>
							</div>
						</div>
						{/* <div className='menu__middle-container'>
							<div className='menu__food-main-container small-view'>
								<div className='menu__food-main-type'>C</div>
								<div className='menu__food-main-type'>P</div>
								<div className='menu__food-main-type'>C</div>
								<div className='menu__food-main-type'>F</div>
							</div>
							<div className='menu__food-main-container big-view'>
								<div className='menu__food-main-type'>Calories</div>
								<div className='menu__food-main-type'>Proteins</div>
								<div className='menu__food-main-type'>Carbs</div>
								<div className='menu__food-main-type'>Fats</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>

			<Dashboard />
		</div>
	);
}
{
}
