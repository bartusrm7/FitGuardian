import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import { useFoodContext } from "./FoodContext";
import { useUserContext } from "./UserContext";

export default function Menu() {
	const {
		userMeal,
		setUserMeal,
		currentDate,
		setCurrentDate,
		inputFood,
		setInputFood,
		inputFoodGrams,
		setInputFoodGrams,
	} = useFoodContext();
	const { userCurrentEmail, setUserCurrentEmail } = useUserContext();
	const [inputIsOpen, setInputIsOpen] = useState(false);
	const [activeMealId, setActiveMealId] = useState(null);
	const [opacityClass, setOpacityClass] = useState("hide-opacity");

	const handleCurrentDate = () => {
		const date = new Date();
		const formattedDate = date.toISOString().split("T")[0];
		localStorage.setItem("currentDate", formattedDate);
		setCurrentDate(formattedDate);
	};
	const handlaChangeDay = direction => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + direction);

		const formattedDate = newDate.toISOString().split("T")[0];
		localStorage.setItem("currentDate", formattedDate);
		setCurrentDate(formattedDate);
	};
	const handleCloseInputFoodContainer = () => {
		setInputIsOpen(false);
		setActiveMealId(null);
	};
	const handleOpenInputFoodContainer = mealId => {
		setInputIsOpen(!inputIsOpen);
		setActiveMealId(mealId);
	};
	const handleRemoveFoodItem = (mealId, foodIndex) => {
		const updatedMealsAfterRemovedItem = { ...userMeal };
		if (updatedMealsAfterRemovedItem[userCurrentEmail]) {
			updatedMealsAfterRemovedItem[userCurrentEmail] = updatedMealsAfterRemovedItem[userCurrentEmail].map(meal => {
				if (meal.id === mealId) {
					return {
						...meal,
						food: meal.food.filter((food, index) => index !== foodIndex),
					};
				}
				return meal;
			});
		}
		setUserMeal(updatedMealsAfterRemovedItem);
		localStorage.setItem("userMeals", JSON.stringify(updatedMealsAfterRemovedItem));
	};
	const getUserEmail = async () => {
		try {
			const response = await fetch("http://localhost:5174/user-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setUserCurrentEmail(data.userEmail);
		} catch (error) {
			console.error("Error fetching user email:", error.message);
		}
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
				userEmail: userCurrentEmail,
				foodID: activeMealId,
				foodName: inputFood,
				foodCalories: `${((data.items[0].calories / 100) * caloriesWeight).toFixed(0)}cal`,
				foodProteins: `${((data.items[0].protein_g / 100) * caloriesWeight).toFixed(0)}g`,
				foodCarbs: `${((data.items[0].carbohydrates_total_g / 100) * caloriesWeight).toFixed(0)}g`,
				foodFats: `${((data.items[0].fat_total_g / 100) * caloriesWeight).toFixed(0)}g`,
				foodDate: currentDate,
			};
			const responseBackend = await fetch("http://localhost:5174/add-meal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newFood),
			});
			console.log(newFood);
			if (!responseBackend.ok) {
				throw Error("Failed to add meal to backend!");
			}
			const result = await responseBackend.json();

			const updatedMeals = { ...userMeal };
			if (!updatedMeals[userCurrentEmail]) {
				updatedMeals[userCurrentEmail] = [];
			}

			const mealIndex = updatedMeals[userCurrentEmail].findIndex(
				meal => meal.id === activeMealId && meal.foodDate === currentDate
			);

			if (mealIndex !== -1) {
				updatedMeals[userCurrentEmail][mealIndex].food.push(newFood);
			} else {
				updatedMeals[userCurrentEmail].push({
					id: activeMealId,
					date: currentDate,
					name: `Meal ${activeMealId}`,
					food: [newFood],
				});
			}
			setUserMeal(updatedMeals);
			setInputFood("");
			setInputFoodGrams("");
			setInputIsOpen(false);
			setActiveMealId(null);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};
	const mealsForCurrentDate = [1, 2, 3, 4].map(id => {
		const existingMeal = (userMeal[userCurrentEmail] || []).find(meal => meal.id === id && meal.date === currentDate);
		return existingMeal || { id, date: currentDate, name: `Meal ${id}`, food: [] };
	});

	useEffect(() => {
		const updatedUserMeals = localStorage.getItem("userMeals");
		if (updatedUserMeals) {
			setUserMeal(JSON.parse(updatedUserMeals));
		}

		const savedDate = localStorage.getItem("currentDate");
		if (savedDate) {
			setCurrentDate(savedDate);
		} else {
			handleCurrentDate();
		}

		const updatedUserEmail = localStorage.getItem("currentUserData");
		if (updatedUserEmail) {
			const savedEmail = JSON.parse(updatedUserEmail);
			setUserCurrentEmail(savedEmail.userEmail);
		}
		getUserEmail();
	}, []);

	useEffect(() => {
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`menu ${opacityClass}`}>
				<div className='menu__main-container'>
					<div className='menu__container'>
						<div className='menu__container-name'>
							<h3 className='menu__label'>Menu</h3>
							<span className='material-symbols-outlined arrows-left arrows' onClick={() => handlaChangeDay(-1)}>
								keyboard_double_arrow_left
							</span>
							<input
								className='menu__date'
								type='date'
								value={currentDate}
								onChange={e => setCurrentDate(e.target.value)}
							/>
							<span className='material-symbols-outlined arrows-right arrows' onClick={() => handlaChangeDay(1)}>
								keyboard_double_arrow_right
							</span>
						</div>
						<div className='menu__add-food-container'>
							{mealsForCurrentDate.map(meal => (
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
						<div className={`menu__background-shadow ${inputIsOpen ? "open" : "close"}`}>
							<div className='menu__cancel-btn' onClick={handleCloseInputFoodContainer}>
								<span className='material-symbols-outlined'>close</span>
							</div>
							<div className='menu__input-container'>
								<input
									className='menu__input-food'
									type='text'
									placeholder='Enter your food...'
									value={inputFood}
									onChange={e => setInputFood(e.target.value)}
								/>
								<input
									className='menu__input-food grams'
									type='number'
									placeholder='Grams'
									value={inputFoodGrams}
									onChange={e => setInputFoodGrams(e.target.value)}
								/>
								<button className='menu__add-food-btn' onClick={handleAddFoodItem}>
									ADD FOOD
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Dashboard />
		</div>
	);
}
