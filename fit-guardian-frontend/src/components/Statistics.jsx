import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import { Circle } from "rc-progress";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { userMeal, setUserMeal, allMacros, setAllMacros } = useFoodContext();
	const [periodChoice, setPeriodChoice] = useState("");

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
	}, []);

	return (
		<div>
			<div className='statistics'>
				<div className='statistics__main-container'>
					<div className='statistics__container'>
						<div className='statistics__container-name'>
							<h3 className='statistics__label'>Statistics</h3>
						</div>
						<div className='statistics__calories-container'>
							<div className='statistics__calendar-container'>
								<button className='statistics__period-chosing-btn'>Last week</button>
								<button className='statistics__period-chosing-btn'>Last month</button>
								<button className='statistics__period-chosing-btn'>Last year</button>
							</div>

							<div className='statistics__main-view-container'>
								<div className='statistics__calories-container'>
									<div className='statistics__circle' style={{ height: 150, width: 150 }}>
										<Circle percent={100} strokeWidth={10} />
									</div>
								</div>
								<div className='statistics__macros-container'>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__circle' style={{ height: 100, width: 100 }}>
											<Circle percent={100} strokeWidth={7} />
										</div>
									</div>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__circle' style={{ height: 100, width: 100 }}>
											<Circle percent={100} strokeWidth={7} />
										</div>
									</div>
									<div className='statistics__macros-circle-progress'>
										<div className='statistics__circle' style={{ height: 100, width: 100 }}>
											<Circle percent={100} strokeWidth={7} />
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
