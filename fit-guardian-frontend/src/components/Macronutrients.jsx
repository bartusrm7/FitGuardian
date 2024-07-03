import { useEffect } from "react";
import { useUserContext } from "./UserContext";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const {
		userTotalCalories,
		setUserTotalCalories,
		userTotalMacros,
		setUserTotalMacros,
		userProteins,
		setUserProteins,
		userCarbs,
		setUserCarbs,
		userFats,
		setUserFats,
	} = useUserContext();
	useEffect(() => {
		const updatedUserTotalCaloriesString = localStorage.getItem("userCalories");
		const updatedUserTotalMacrosString = localStorage.getItem("userMacros");
		setUserTotalCalories(updatedUserTotalCaloriesString);

		if (updatedUserTotalMacrosString) {
			const userMacros = JSON.parse(updatedUserTotalMacrosString);
			setUserTotalMacros(userMacros);
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
								<div className='macronutrients__macro-box calories'>0%</div>
							</div>
							<div className='macronutrients__macros-container'>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.proteins}g`}</div>
									<div className='macronutrients__macro-box item proteins'>0%</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.carbs}g`}</div>
									<div className='macronutrients__macro-box item carbs'>0%</div>
								</div>
								<div className='macronutrients__macro-item'>
									<div className='macronutrients__macro-name'>{`${userTotalMacros.fats}g`}</div>
									<div className='macronutrients__macro-box item fats'>0%</div>
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
