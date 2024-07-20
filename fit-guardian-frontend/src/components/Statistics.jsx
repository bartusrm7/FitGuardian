import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { setUserMeal, setAllMacros } = useFoodContext();
	const [periodChoice, setPeriodChoice] = useState("");
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
	const [isActive, setIsActive] = useState(false);
	const handleActiveChoicePeriodBtn = () => {
		if (isActive) {
			// DOKOŃCZYĆ I ZROBIĆ ACTIVE BTN!!!
		}
	};
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
		const getUpdatedUserMeals = JSON.parse(getUserMeals);

		getUpdatedUserMeals.forEach(meals => {
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
		const dayInPeriod = filteredDaysInPeriodTimes(period);

		setAllMacrosCompleted({
			calories: newAllMacrosCompleted.totalCalories,
			proteins: newAllMacrosCompleted.totalProteins,
			carbs: newAllMacrosCompleted.totalCarbs,
			fats: newAllMacrosCompleted.totalFats,
		});
		setAllMacrosAverageCompleted({
			calories: (newAllMacrosCompleted.totalCalories / dayInPeriod).toFixed(2),
			proteins: (newAllMacrosCompleted.totalProteins / dayInPeriod).toFixed(2),
			carbs: (newAllMacrosCompleted.totalCarbs / dayInPeriod).toFixed(2),
			fats: (newAllMacrosCompleted.totalFats / dayInPeriod).toFixed(2),
		});
		localStorage.setItem("macrosALLandAVGstats", newAllMacrosCompleted);
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
		if (periodChoice) {
			filteredMealsLastPeriodTimes(periodChoice);
		}
		// const updatedAll
	}, [periodChoice]);

	return (
		<div>
			<div className='statistics'>
				<div className='statistics__main-container'>
					<div className='statistics__container'>
						<div className='statistics__container-name'>
							<h3 className='statistics__label'>Statistics</h3>
						</div>
						<div className='statistics__calendar-container'>
							<button className='statistics__date' onClick={() => setPeriodChoice("week")}>
								Last Week
							</button>
							<button className='statistics__date' onClick={() => setPeriodChoice("month")}>
								Last Month
							</button>
							<button className='statistics__date' onClick={() => setPeriodChoice("year")}>
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
