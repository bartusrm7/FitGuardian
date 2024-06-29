import { useEffect, useState } from "react";
import { useLogRegContext } from "./LogRegContext";
import Dashboard from "./Dashboard";

export default function Macronutrients() {
	const { userTotalCalories, setUserTotalCalories } = useLogRegContext();
	useEffect(() => {
		const updatedUserTotalCalories = localStorage.getItem("userCalories");
		setUserTotalCalories(updatedUserTotalCalories);
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
								<div className='macronutrients__macro-item proteins'></div>
								<div className='macronutrients__macro-item carbs'></div>
								<div className='macronutrients__macro-item fats'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
