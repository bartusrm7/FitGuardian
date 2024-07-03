import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export default function Menu() {
	const [inputIsOpen, setInputIsOpen] = useState(false);

	const handleCloseInputFoodContainer = () => {
		setInputIsOpen(false);
	};
	const handleOpenInputFoodContainer = () => {
		setInputIsOpen(!inputIsOpen);
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

			if (inputFood === "") {
				return;
			}
			const caloriesWeight = parseFloat(inputFoodGrams);
			const newFood = {
				foodName: inputFood,
				foodCalories: (data.items[0].calories / 100) * caloriesWeight,
				foodProteins: (data.items[0].protein_g / 100) * caloriesWeight,
				foodCarbs: (data.items[0].carbohydrates_total_g / 100) * caloriesWeight,
				foodFats: (data.items[0].fat_total_g / 100) * caloriesWeight,
			};
			setUserFood(prevState => [...prevState, newFood]);
			setInputFood("");
			setInputFoodGrams("");
			setInputIsOpen(false);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	return (
		<div>
			<div className='menu'>
				<div className='menu__main-container'>
					<div className='menu__container'>
						<div className='menu__container-name'>
							<h3 className='menu__label'>Menu</h3>
						</div>

						<div className='menu__add-food-container'>
							{["Meal 1", "Meal 2", "Meal 3", "Meal 4"].map((meal, index) => (
								<div key={index} className='menu__meal-item-container'>
									<div className='menu__meal-item'>
										<div className='menu__meal-item-name'>{meal}</div>
										<button className='menu__meal-add-btn' onClick={handleOpenInputFoodContainer}>
											<span className='material-symbols-outlined'>add</span>
										</button>
									</div>
									<div className='menu__added-food-container'></div>
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
