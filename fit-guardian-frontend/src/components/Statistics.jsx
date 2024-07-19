import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import { useUserContext } from "./UserContext";
import { Circle } from "rc-progress";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { userTotalCalories, setUserTotalCalories, userTotalMacros, setUserTotalMacros } = useUserContext();
	const { userMeals, setUserMeal, setAllMacros } = useFoodContext();
	const [periodChoice, setPeriodChoice] = useState("");
	const [allMacrosPercentageCompleted, setAllMacrosPercentageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const getDateFromPeriodChoiceDate = () => {
		const date = new Date();
		if (periodChoice === "week") {
			date.setDate(date.getDate() - 7);
		} else if (periodChoice === "month") {
			date.setMonth(date.getMonth() - 1);
		} else if (periodChoice === "year") {
			date.setFullYear(date.getFullYear() - 1);
		}
		return date;
	};
	const filteredMealsLastPeriodTimes = () => {
		const newDate = new Date();
		const lastWeek = new Date(newDate);
		const lastMonth = new Date(newDate);
		const lastYear = new Date(newDate);
		lastWeek.setDate(newDate.getDate() - 7);
		lastMonth.setMonth(newDate.getMonth() - 1);
		lastYear.setFullYear(newDate.getFullYear() - 1);

		const newAllMacrosPercentageCompleted = {
			totalCalories: 0,
			totalProteins: 0,
			totalCarbs: 0,
			totalFats: 0,
		};

		const getUserMeals = localStorage.getItem("userMeals");
		const getUpdatedUserMeals = JSON.parse(getUserMeals);

		getUpdatedUserMeals.forEach(meals => {
			meals.food.forEach(meal => {
				const totalCalories = parseFloat(meal.foodCalories);
				const totalProteins = parseFloat(meal.foodProteins);
				const totalCarbs = parseFloat(meal.foodCarbs);
				const totalFats = parseFloat(meal.foodFats);
			});
		});
		setAllMacrosPercentageCompleted({
			calories: totalCalories,
			proteins: totalProteins,
			carbs: totalCarbs,
			fats: totalFats,
		});
	};

	// USTAWIĆ ABY PO KLIKNIĘCIU W NASZ BUTTON MOŻNA BYŁO WYŚWIETLIĆ ODPOWIEDNIO TO CO CHCEMY (WEEK,MONTH,YEAR)
	
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
		getDateFromPeriodChoiceDate();
		filteredMealsLastPeriodTimes();
	}, []);

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
											All calories statistics: <span>{`123cal`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All calories average statistics: <span>{`123cal`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All proteins statistics: <span>{`123g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All proteins average statistics: <span>{`123g`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All carbs statistics: <span>{`123g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All carbs average statistics: <span>{`123g`}</span>
										</div>
									</div>
								</div>
								<div className='statistics__macros-progress'>
									<div className='statistics__item'>
										<div className='statistics__all-macro-name'>
											All fats statistics: <span>{`123g`}</span>
										</div>
										<div className='statistics__average-macro-name'>
											All fats average statistics: <span>123</span>
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
