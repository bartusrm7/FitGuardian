import { useLogRegContext } from "./LogRegContext";

export default function FirstLogOnboarding() {
	const {
		userAge,
		setUserAge,
		userGenger,
		setUserGenger,
		userHeight,
		setUserHeight,
		userWeight,
		setUserWeight,
		userGoal,
		setUserGoal,
		userActivity,
		setUserActivity,
	} = useLogRegContext();

	return (
		<div>
			<div className='firstlog-onboarding'>
				<div className='firstlog-onboarding__main-container'>
					<div className='firstlog-onboarding__container'>
						<div className='firstlog-onboarding__select-container'>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
						</div>
						<div className='firstlog-onboarding__selected-container'>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
							<div className='firstlog-onboarding__items'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
