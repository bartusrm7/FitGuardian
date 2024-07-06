import { useEffect } from "react";
import { useUserContext } from "./UserContext";
import { useFoodContext } from "./FoodContext";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const { userTotalCalories, setUserTotalCalories, userTotalMacros, setUserTotalMacros } = useUserContext();
	const { userMeal, setUserMeal, allMacros, setAllMacros } = useFoodContext();

	const handleAddMacrosPercentageToContainers = () => {
		userMeal.map(meals =>
			meals.food.map(meal => {
				allMacros.calories.push(parseFloat(meal.foodCalories));
				allMacros.proteins.push(parseFloat(meal.foodProteins));
				allMacros.carbs.push(parseFloat(meal.foodCarbs));
				allMacros.fats.push(parseFloat(meal.foodFats));

				for (let i = 0; i < allMacros.carbs.lenght; i++) {
					for (let j = i + 1; j < allMacros.carbs.lenght; j++) {}
				}
				console.log(allMacros.carbs);
			})
		);
	};
	handleAddMacrosPercentageToContainers();

	useEffect(() => {
		const updatedUserTotalCaloriesString = localStorage.getItem("userCalories");
		const updatedUserTotalMacrosString = localStorage.getItem("userMacros");
		setUserTotalCalories(updatedUserTotalCaloriesString);

		if (updatedUserTotalMacrosString) {
			const userMacros = JSON.parse(updatedUserTotalMacrosString);
			setUserTotalMacros(userMacros);
		}

		const updatedUserMealsString = localStorage.getItem("userMeals");
		if (updatedUserMealsString) {
			const userMeals = JSON.parse(updatedUserMealsString);
			setUserMeal(userMeals);
		}
	}, []);

	return (
		<div>
			<div className='macronutrients'>
				<div className='macronutrients__main-container'>
					<div className='macronutrients__container'>
						<div className='macronutrients__container-name'>
							<h3 className='macronutrients__label'>Macronutrients</h3>
						</div>
						<div className='macronutrients__macros-calories-container'>
							<div className='macronutrients__macro-item'>
								<div className='macronutrients__macro-name'>{`${userTotalCalories}kcal`}</div>
								<div className='macronutrients__macro-box calories'>{allMacros.calories}</div>
							</div>
							<div className='macronutrients__macros-container'>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.proteins}g`}</div>
									<div className='macronutrients__macro-box item proteins'>{allMacros.proteins}</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.carbs}g`}</div>
									<div className='macronutrients__macro-box item carbs'>{allMacros.carbs}</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.fats}g`}</div>
									<div className='macronutrients__macro-box item fats'>{allMacros.fats}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
