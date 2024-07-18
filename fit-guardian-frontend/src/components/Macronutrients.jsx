import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useFoodContext } from "./FoodContext";
import { Circle } from "rc-progress";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const { userTotalCalories, setUserTotalCalories, userTotalMacros, setUserTotalMacros } = useUserContext();
	const { userMeal, setUserMeal, setAllMacros, currentDate, setCurrentDate } = useFoodContext();
	const [allMacrosPercentageCompleted, setAllMacrosPercentageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const filteredMeals = userMeal.filter(meal => meal.date === currentDate);
	const handleAddMacrosToContainers = () => {
		const newAllMacros = {
			calories: 0,
			proteins: 0,
			carbs: 0,
			fats: 0,
		};
		filteredMeals.forEach(meals => {
			meals.food.forEach(meal => {
				newAllMacros.calories += parseFloat(meal.foodCalories);
				newAllMacros.proteins += parseFloat(meal.foodProteins);
				newAllMacros.carbs += parseFloat(meal.foodCarbs);
				newAllMacros.fats += parseFloat(meal.foodFats);
			});
		});
		const caloriesPercentage = (newAllMacros.calories / userTotalCalories) * 100;
		const proteinsPercentage = (newAllMacros.proteins / userTotalMacros.proteins) * 100;
		const carbsPercentage = (newAllMacros.carbs / userTotalMacros.carbs) * 100;
		const fatsPercentage = (newAllMacros.fats / userTotalMacros.fats) * 100;
		setAllMacrosPercentageCompleted({
			calories: isNaN(caloriesPercentage) ? 0 : caloriesPercentage,
			proteins: isNaN(proteinsPercentage) ? 0 : proteinsPercentage,
			carbs: isNaN(carbsPercentage) ? 0 : carbsPercentage,
			fats: isNaN(fatsPercentage) ? 0 : fatsPercentage,
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
	}, [currentDate]);
	useEffect(() => {
		const savedDate = localStorage.getItem("currentDate");
		if (savedDate) {
			setCurrentDate(savedDate);
		}
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
								<div className='macronutrients__macro-circle calories'>
									<Circle
										percent={allMacrosPercentageCompleted.calories}
										strokeWidth={11}
										strokeColor={"#000046"}
										trailWidth={11}
										trailColor={"#60dfff"}
										gapDegree={30}></Circle>
									<div className='percentage-circle-macro-name'>{`${allMacrosPercentageCompleted.calories.toFixed(
										1
									)}%`}</div>
								</div>
							</div>
							<div className='macronutrients__macros-container'>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.proteins}g`}</div>
									<div className='macronutrients__macro-circle item proteins'>
										<Circle
											percent={allMacrosPercentageCompleted.proteins}
											strokeWidth={11}
											strokeColor={"#000046"}
											trailWidth={11}
											trailColor={"#60dfff"}
											gapDegree={30}></Circle>
										<div className='percentage-circle-macro-name'>
											{`${allMacrosPercentageCompleted.proteins.toFixed(1)}%`}
										</div>
									</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.carbs}g`}</div>
									<div className='macronutrients__macro-circle item carbs'>
										<Circle
											percent={allMacrosPercentageCompleted.carbs}
											strokeWidth={11}
											strokeColor={"#000046"}
											trailWidth={11}
											trailColor={"#60dfff"}
											gapDegree={30}></Circle>
										<div className='percentage-circle-macro-name'>{`${allMacrosPercentageCompleted.carbs.toFixed(
											1
										)}%`}</div>
									</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.fats}g`}</div>
									<div className='macronutrients__macro-circle item fats'>
										<Circle
											percent={allMacrosPercentageCompleted.fats}
											strokeWidth={11}
											strokeColor={"#000046"}
											trailWidth={11}
											trailColor={"#60dfff"}
											gapDegree={30}></Circle>
										<div className='percentage-circle-macro-name'>{`${allMacrosPercentageCompleted.fats.toFixed(
											1
										)}%`}</div>
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
