import { useState } from "react";
import Dashboard from "./Dashboard";

export default function Menu() {
	const [userFood, setUserFood] = useState({});
	const [inputIsOpen, setInputIsOpen] = useState(false);

	const handleCloseInputFoodContainer = () => {
		setInputIsOpen(false);
	};
	const handleOpenInputFoodContainer = () => {
		setInputIsOpen(!inputIsOpen);
	};
	const handleAddFoodItem = async food => {
		try {
			const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${food}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ food: food }),
			});
			if (!response.ok) {
				throw Error("Wrong data!");
			}
			const data = response.json();
			console.log(data);
		} catch (error) {}
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
										<button className='menu__meal-add-btn' onClick={handleAddFoodItem}>
											<span className='material-symbols-outlined' onClick={handleOpenInputFoodContainer}>
												add
											</span>
										</button>
									</div>
								</div>
							))}
						</div>
						<div className={`menu__background-shadow ${inputIsOpen ? "open" : ""}`}>
							<div className='menu__cancel-btn' onClick={handleCloseInputFoodContainer}>
								<span className='material-symbols-outlined'>close</span>
							</div>
							<div className='menu__input-container'>
								<input className='menu__input-food' type='text' />
								<button className='menu__add-food-btn'>ADD FOOD</button>
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
