import { useEffect, useState } from "react";
import { useFoodContext } from "./FoodContext";
import Dashboard from "./Dashboard";

export default function Statistics() {
	const { userMeal, setUserMeal, allMacros, setAllMacros } = useFoodContext();

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
								<input type='date' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
