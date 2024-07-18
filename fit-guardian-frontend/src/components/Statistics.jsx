import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import { useUserContext } from "./UserContext";
import { Circle } from "rc-progress";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { userTotalCalories, setUserTotalCalories, userTotalMacros, setUserTotalMacros } = useUserContext();
	const { setUserMeal, setAllMacros, currentDate, setCurrentDate } = useFoodContext();
	const [periodChoice, setPeriodChoice] = useState("");
	const [currentStatisticsDate, setCurrentStatisticsDate] = useState([]);
	const [allMacrosPercentageCompleted, setAllMacrosPercentageCompleted] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const handleCurrentStatisticsDate = () => {
		const newDate = new Date();
		const formattedDate = newDate.toISOString().split("T")[0];
		setCurrentStatisticsDate(formattedDate);
	};
	const handleChangeStatisticsDate = direction => {
		const newDate = new Date(currentStatisticsDate);
		newDate.setDate(newDate.getDate() + direction);
		const formattedDate = newDate.toISOString().split("T")[0];
		setCurrentStatisticsDate(formattedDate);
	};
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
		handleCurrentStatisticsDate();
	}, []);
	console.log(allMacrosPercentageCompleted);

	return (
		<div>
			<div className='statistics'>
				<div className='statistics__main-container'>
					<div className='statistics__container'>
						<div className='statistics__container-name'>
							<h3 className='statistics__label'>Statistics</h3>
							<span
								className='material-symbols-outlined arrows-left arrows'
								onClick={() => handleChangeStatisticsDate(-1)}>
								keyboard_double_arrow_left
							</span>
							<input
								className='statistics__date'
								type='date'
								value={currentStatisticsDate}
								onChange={e => setCurrentStatisticsDate(e.target.value)}
							/>
							<span
								className='material-symbols-outlined arrows-right arrows'
								onClick={() => handleChangeStatisticsDate(1)}>
								keyboard_double_arrow_right
							</span>
						</div>
						<div className='statistics__calories-container'>
							<div className='statistics__calendar-container'></div>

							<div className='statistics__main-view-container'>
								<div className='statistics__calories-container'>
									<div className='statistics__name'>{userTotalCalories}cal</div>
									<div className='statistics__circle'>
										<Circle
											strokeWidth={11}
											strokeColor={"#000046"}
											trailWidth={11}
											trailColor={"#60dfff"}
											gapDegree={30}></Circle>
										<div className='statistics__macro-name'>{allMacrosPercentageCompleted.calories.toFixed(1)}%</div>
									</div>
								</div>
								<div className='statistics__macros-container'>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__name'>{userTotalMacros.proteins}g</div>
										<div className='statistics__circle'>
											<Circle
												percent={allMacrosPercentageCompleted.proteins}
												strokeWidth={11}
												strokeColor={"#000046"}
												trailWidth={11}
												trailColor={"#60dfff"}
												gapDegree={30}></Circle>
											<div className='statistics__macro-name'>{allMacrosPercentageCompleted.proteins.toFixed(1)}%</div>
										</div>
									</div>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__name'>{userTotalMacros.carbs}g</div>
										<div className='statistics__circle'>
											<Circle
												percent={allMacrosPercentageCompleted.proteins}
												strokeWidth={11}
												strokeColor={"#000046"}
												trailWidth={11}
												trailColor={"#60dfff"}
												gapDegree={30}></Circle>
											<div className='statistics__macro-name'>{allMacrosPercentageCompleted.carbs.toFixed(1)}%</div>
										</div>
									</div>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__name'>{userTotalMacros.fats}g</div>
										<div className='statistics__circle'>
											<Circle
												percent={allMacrosPercentageCompleted.proteins}
												strokeWidth={11}
												strokeColor={"#000046"}
												trailWidth={11}
												trailColor={"#60dfff"}
												gapDegree={30}></Circle>
											<div className='statistics__macro-name'>{allMacrosPercentageCompleted.fats.toFixed(1)}%</div>
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
