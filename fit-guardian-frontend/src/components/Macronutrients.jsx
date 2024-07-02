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
		const updatedUserTotalCalories = localStorage.getItem("userCalories");
		const updatedUserTotalMacros = localStorage.getItem("userMacros");
		setUserTotalCalories(updatedUserTotalCalories);
		setUserTotalMacros(updatedUserTotalMacros);
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
							<div className='macronutrients__calories'>{`${userTotalCalories}kcal`}</div>
							<div className='macronutrients__macros-container'>
								<div className='macronutrients__macro-item proteins'>{`${userTotalMacros}g`}</div>
								<div className='macronutrients__macro-item carbs'>{`${userCarbs}g`}</div>
								<div className='macronutrients__macro-item fats'>{`${userFats}g`}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
