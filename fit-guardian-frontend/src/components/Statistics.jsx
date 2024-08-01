import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { setUserMeal, setAllMacros } = useFoodContext();
	const [periodChoice, setPeriodChoice] = useState("");
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
	const [allMacrosCompleted, setAllMacrosCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const [allMacrosAverageCompleted, setAllMacrosAverageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const filteredDaysInPeriodTimes = period => {
		const newDate = new Date();
		if (period === "week") {
			return 7;
		} else if (period === "month") {
			return new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
		} else if (period === "year") {
			return newDate.getFullYear() % 4 === 0 ? 366 : 365;
		}
	};
	const filteredMealsLastPeriodTimes = period => {
		const newDate = new Date();
		const lastWeek = new Date(newDate);
		const lastMonth = new Date(newDate);
		const lastYear = new Date(newDate);
		lastWeek.setDate(newDate.getDate() - 7);
		lastMonth.setMonth(newDate.getMonth() - 1);
		lastYear.setFullYear(newDate.getFullYear() - 1);

		const newAllMacrosCompleted = {
			totalCalories: 0,
			totalProteins: 0,
			totalCarbs: 0,
			totalFats: 0,
		};

		const getUserMeals = localStorage.getItem("userMeals");
		const getUpdatedUserMeals = getUserMeals ? JSON.parse(getUserMeals) : [];
		console.log(getUpdatedUserMeals);

		Object.values(getUpdatedUserMeals).forEach(mealsArray => {
			if (Array.isArray(mealsArray)) {
				mealsArray.forEach(meals => {
					meals.food.forEach(meal => {
						const mealDate = new Date(meal.date);
						if (period === "week" && mealDate >= lastWeek) {
							newAllMacrosCompleted.totalCalories += parseFloat(meal.foodCalories);
							newAllMacrosCompleted.totalProteins += parseFloat(meal.foodProteins);
							newAllMacrosCompleted.totalCarbs += parseFloat(meal.foodCarbs);
							newAllMacrosCompleted.totalFats += parseFloat(meal.foodFats);
						} else if (period === "month" && mealDate >= lastMonth) {
							newAllMacrosCompleted.totalCalories += parseFloat(meal.foodCalories);
							newAllMacrosCompleted.totalProteins += parseFloat(meal.foodProteins);
							newAllMacrosCompleted.totalCarbs += parseFloat(meal.foodCarbs);
							newAllMacrosCompleted.totalFats += parseFloat(meal.foodFats);
						} else if (period === "year" && mealDate >= lastYear) {
							newAllMacrosCompleted.totalCalories += parseFloat(meal.foodCalories);
							newAllMacrosCompleted.totalProteins += parseFloat(meal.foodProteins);
							newAllMacrosCompleted.totalCarbs += parseFloat(meal.foodCarbs);
							newAllMacrosCompleted.totalFats += parseFloat(meal.foodFats);
						}
					});
				});
			}
		});
		const dayInPeriod = filteredDaysInPeriodTimes(period);

		const allSaveMacrosCompleted = {
			calories: newAllMacrosCompleted.totalCalories,
			proteins: newAllMacrosCompleted.totalProteins,
			carbs: newAllMacrosCompleted.totalCarbs,
			fats: newAllMacrosCompleted.totalFats,
		};
		const allSaveMacrosAverageCompleted = {
			calories: (newAllMacrosCompleted.totalCalories / dayInPeriod).toFixed(2),
			proteins: (newAllMacrosCompleted.totalProteins / dayInPeriod).toFixed(2),
			carbs: (newAllMacrosCompleted.totalCarbs / dayInPeriod).toFixed(2),
			fats: (newAllMacrosCompleted.totalFats / dayInPeriod).toFixed(2),
		};
		setAllMacrosCompleted(allSaveMacrosCompleted);
		setAllMacrosAverageCompleted(allSaveMacrosAverageCompleted);

		localStorage.setItem("macrosStats", JSON.stringify(allSaveMacrosCompleted));
		localStorage.setItem("macrosAvgStats", JSON.stringify(allSaveMacrosAverageCompleted));
	};
	const handleToggleActiveBtn = period => {
		setPeriodChoice(period);
		localStorage.setItem("periodChoice", period);
	};

	useEffect(() => {
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
		const updatedAllMacrosStats = localStorage.getItem("macrosStats");
		if (updatedAllMacrosStats) {
			const allMacrosStats = JSON.parse(updatedAllMacrosStats);
			setAllMacrosCompleted(allMacrosStats);
		}
		const updatedAvgMacrosStats = localStorage.getItem("macrosAvgStats");
		if (updatedAvgMacrosStats) {
			const avgMacrosStats = JSON.parse(updatedAvgMacrosStats);
			setAllMacrosAverageCompleted(avgMacrosStats);
		}
		const updatedPeriodChoice = localStorage.getItem("periodChoice");
		if (updatedPeriodChoice) {
			setPeriodChoice(updatedPeriodChoice);
		}
		filteredMealsLastPeriodTimes(periodChoice);
	}, [periodChoice]);
	useEffect(() => {
		setOpacityClass("display-opacity");
	});

	return (
		<div>
			<div className={`statistics ${opacityClass}`}>
				<div className='statistics__main-container'>
					<div className='statistics__container'>
						<div className='statistics__container-name'>
							<h3 className='statistics__label'>Statistics</h3>
						</div>
						<div className='statistics__calendar-container'>
							<button
								className={`statistics__date ${periodChoice === "week" ? "active" : ""}`}
								onClick={() => handleToggleActiveBtn("week")}>
								Last Week
							</button>
							<button
								className={`statistics__date ${periodChoice === "month" ? "active" : ""}`}
								onClick={() => handleToggleActiveBtn("month")}>
								Last Month
							</button>
							<button
								className={`statistics__date ${periodChoice === "year" ? "active" : ""}`}
								onClick={() => handleToggleActiveBtn("year")}>
								Last Year
							</button>
						</div>
						<div className='statistics__calories-container'>
							<div className='statistics__main-view-container'>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All calories statistics: <span>{`${allMacrosCompleted.calories}cal`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All calories average statistics: <span>{`${allMacrosAverageCompleted.calories}cal`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All proteins statistics: <span>{`${allMacrosCompleted.proteins}g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All proteins average statistics: <span>{`${allMacrosAverageCompleted.proteins}g`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All carbs statistics: <span>{`${allMacrosCompleted.carbs}g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All carbs average statistics: <span>{`${allMacrosAverageCompleted.carbs}g`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All fats statistics: <span>{`${allMacrosCompleted.fats}g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All fats average statistics: <span>{`${allMacrosAverageCompleted.fats}g`}</span>
										</div>
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
