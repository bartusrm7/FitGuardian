import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useFoodContext } from "./FoodContext";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const { userTotalCalories, setUserTotalCalories, userTotalMacros, setUserTotalMacros } = useUserContext();
	const { userMeal, setUserMeal, allMacros, setAllMacros } = useFoodContext();
	const [allMacrosPercentageCompleted, setAllMacrosPercentageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const [isWidth, setIsWidth] = useState(true);
	const resizeWindow = () => {
		if (window.innerWidth <= 368) {
			setIsWidth(false);
		} else if (window.innerWidth >= 568) {
			setIsWidth(true);
		} else if (window.innerWidth >= 768) {
			setIsWidth(false);
		} else if (window.innerWidth >= 568) {
			setIsWidth(true);
		}
	};
	const handleAddMacrosToContainers = () => {
		const newAllMacros = {
			calories: 0,
			proteins: 0,
			carbs: 0,
			fats: 0,
		};
		userMeal.forEach(meals => {
			meals.food.forEach(meal => {
				newAllMacros.calories += parseFloat(meal.foodCalories);
				newAllMacros.proteins += parseFloat(meal.foodProteins);
				newAllMacros.carbs += parseFloat(meal.foodCarbs);
				newAllMacros.fats += parseFloat(meal.foodFats);
			});
		});
		setAllMacrosPercentageCompleted({
			calories: (newAllMacros.calories / userTotalCalories) * 100,
			proteins: (newAllMacros.proteins / userTotalMacros.proteins) * 100,
			carbs: (newAllMacros.carbs / userTotalMacros.carbs) * 100,
			fats: (newAllMacros.fats / userTotalMacros.fats) * 100,
		});
		localStorage.setItem("allMacros", JSON.stringify(newAllMacros));
		setAllMacros(newAllMacros);
	};
	useEffect(() => {
		const updatedUserTotalCaloriesString = localStorage.getItem("userCalories");
		if (updatedUserTotalCaloriesString) {
			const userCalories = JSON.parse(updatedUserTotalCaloriesString);
			setUserTotalCalories(userCalories);
		}
		const updatedUserTotalMacrosString = localStorage.getItem("userMacros");
		if (updatedUserTotalMacrosString) {
			const userMacros = JSON.parse(updatedUserTotalMacrosString);
			setUserTotalMacros(userMacros);
		}
		const updatedUserMealsString = localStorage.getItem("userMeals");
		if (updatedUserMealsString) {
			const userMeals = JSON.parse(updatedUserMealsString);
			setUserMeal(userMeals);
		}
		const updatedUserAllMacrosString = localStorage.getItem("allMacros");
		if (updatedUserAllMacrosString) {
			const userAllMacros = JSON.parse(updatedUserAllMacrosString);
			setAllMacros(userAllMacros);
		}
	}, []);
	useEffect(() => {
		handleAddMacrosToContainers();
	}, [userMeal]);

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
								<div className='macronutrients__macro-name'>{`${userTotalCalories}cal`}</div>
								<div className='macronutrients__macro-box calories'>
									<div
										className='background-percentage-color-cal'
										style={{
											width: `${allMacrosPercentageCompleted.calories}%`,
										}}></div>
									{`${allMacros.calories}cal`}
								</div>
							</div>
							<div className='macronutrients__macros-container'>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.proteins}g`}</div>
									<div className='macronutrients__macro-box item proteins'>
										<div
											className='background-percentage-color-macro'
											style={{
												width: `${allMacrosPercentageCompleted.proteins}%`,
											}}></div>
										{`${allMacros.proteins}g`}
									</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.carbs}g`}</div>
									<div className='macronutrients__macro-box item carbs'>
										<div
											className='background-percentage-color-macro'
											style={{
												width: `${allMacrosPercentageCompleted.carbs}%`,
											}}></div>
										{`${allMacros.carbs}g`}
									</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.fats}g`}</div>
									<div className='macronutrients__macro-box item fats'>
										<div
											className='background-percentage-color-macro'
											style={{
												width: `${allMacrosPercentageCompleted.fats}%`,
											}}></div>
										{`${allMacros.fats}g`}
									</div>
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
