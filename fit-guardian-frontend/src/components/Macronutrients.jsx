import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useFoodContext } from "./FoodContext";
import { Circle } from "rc-progress";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const {
		userCurrentEmail,
		setUserCurrentEmail,
		userTotalCalories,
		setUserTotalCalories,
		userTotalMacros,
		setUserTotalMacros,
		userProteins,
		userCarbs,
		userFats,
	} = useUserContext();
	const { setAllMacros, currentDate, setCurrentDate } = useFoodContext();
	const [allMacrosPercentageCompleted, setAllMacrosPercentageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
	const [userMeals, setUserMeals] = useState([]);

	const getUserEmail = async () => {
		try {
			const response = await fetch("http://localhost:5175/user-data", {
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
			localStorage.setItem("userEmail", data.userEmail);
			setUserCurrentEmail(data.userEmail);
		} catch (error) {
			console.error("Error fetching user email:", error.message);
		}
	};

	const getMealsFromBackend = async () => {
		try {
			const response = await fetch("http://localhost:5175/food-info", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userEmail: userCurrentEmail }),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setUserMeals(data.meals);
		} catch (error) {
			console.error("Error fetching user email:", error.message);
		}
	};
	const handleAddMacrosToContainers = async () => {
		try {
			const response = await fetch("http://localhost:5175/user-macros", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: userCurrentEmail,
					userTotalCalories: userTotalCalories,
					userProteins: userProteins,
					userCarbs: userCarbs,
					userFats: userFats,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Error:${response.status}`);
			}
			const data = await response.json();
			setUserTotalCalories(data.macros.userCalories);
			setUserTotalMacros({
				proteins: data.macros.userProteins,
				carbs: data.macros.userCarbs,
				fats: data.macros.userFats,
			});
		} catch (error) {
			console.error("Error fetching user macros:", error.message);
		}
		const newAllMacros = {
			calories: 0,
			proteins: 0,
			carbs: 0,
			fats: 0,
		};
		const filteredMeals = userMeals.filter(meal => meal.foodDate === currentDate);

		filteredMeals.forEach(meal => {
			newAllMacros.calories += parseFloat(meal.foodCalories);
			newAllMacros.proteins += parseFloat(meal.foodProteins);
			newAllMacros.carbs += parseFloat(meal.foodCarbs);
			newAllMacros.fats += parseFloat(meal.foodFats);
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
		setAllMacros(newAllMacros);
	};

	useEffect(() => {
		getUserEmail();
		const savedDate = localStorage.getItem("currentDate");
		setCurrentDate(savedDate);
	}, []);

	useEffect(() => {
		if (userCurrentEmail && currentDate) {
			getMealsFromBackend();
		}
	}, [userCurrentEmail, currentDate, userTotalCalories]);

	useEffect(() => {
		handleAddMacrosToContainers(userMeals);
		setOpacityClass("display-opacity");
	}, [userMeals]);

	return (
		<div>
			<div className={`macronutrients ${opacityClass}`}>
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
										percent={Math.min(allMacrosPercentageCompleted.calories, 100)}
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
											percent={Math.min(allMacrosPercentageCompleted.proteins, 100)}
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
											percent={Math.min(allMacrosPercentageCompleted.carbs, 100)}
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
											percent={Math.min(allMacrosPercentageCompleted.fats, 100)}
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
