import { useState } from "react";
import { useLogRegContext } from "./LogRegContext";
import { Link, useNavigate } from "react-router-dom";

export default function FirstLogOnboarding() {
	const {
		userAge,
		setUserAge,
		userGender,
		setUserGender,
		userHeight,
		setUserHeight,
		userWeight,
		setUserWeight,
		userGoal,
		setUserGoal,
		userActivity,
		setUserActivity,
	} = useLogRegContext();
	const navigate = useNavigate();

	const [userChoices, setUserChoices] = useState({
		age: userAge,
		gender: userGender,
		genderOptions: ["Male", "Female"],
		height: userHeight,
		weight: userWeight,
		goal: userGoal,
		goalOptions: ["Lose weight", "Maintain weight", "Gain weight"],
		activity: userActivity,
		activityOptions: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
	});

	const handleUserChoices = (name, value) => {
		setUserChoices(prevState => ({
			...prevState,
			[name]: value,
		}));
		const contextSetters = {
			age: setUserAge,
			gender: setUserGender,
			height: setUserHeight,
			weight: setUserWeight,
			goal: setUserGoal,
			activity: setUserActivity,
		};
		if (contextSetters[name]) {
			contextSetters[name](value);
		}
	};
	const saveUserChoices = () => {
		const userData = {
			age: userAge,
			gender: userGender,
			height: userHeight,
			weight: userWeight,
			goal: userGoal,
			activity: userActivity,
		};
		const isDataCompleted = Object.values(userData).every(value => value !== "");
		if (isDataCompleted) {
			localStorage.setItem("userChoices", JSON.stringify(userData));
			navigate("/menu");
		} else {
			alert('Some field is empty. Fill all fields to continue!')
		}
	};

	return (
		<div>
			<div className='firstlog-onboarding'>
				<div className='firstlog-onboarding__main-container'>
					<div className='firstlog-onboarding__container'>
						<div className='firstlog-onboarding__container-name'>
							<h3>Tell us something about you.</h3>
						</div>
						<div className='firstlog-onboarding__choices-container'>
							<div className='firstlog-onboarding__select-container'>
								<div className='firstlog-onboarding__items'>Age:</div>
								<div className='firstlog-onboarding__items'>Gender:</div>
								<div className='firstlog-onboarding__items'>Height:</div>
								<div className='firstlog-onboarding__items'>Weight:</div>
								<div className='firstlog-onboarding__items'>Goal:</div>
								<div className='firstlog-onboarding__items'>Activity:</div>
							</div>
							<div className='firstlog-onboarding__selected-container'>
								<input
									type='date'
									className='firstlog-onboarding__items'
									value={userChoices.age}
									onChange={e => handleUserChoices("age", e.target.value)}
								/>
								<select
									className='firstlog-onboarding__items'
									value={userChoices.gender}
									onChange={e => handleUserChoices("gender", e.target.value)}>
									<option value=''></option>
									{userChoices.genderOptions.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</select>
								<div className='choices'>
									<span>{userChoices.height}cm</span>
									<input
										type='range'
										className='firstlog-onboarding__items'
										min={100}
										max={250}
										value={userChoices.height}
										onChange={e => handleUserChoices("height", e.target.value)}
									/>
								</div>
								<div className='choices'>
									<span>{userChoices.weight}kg</span>
									<input
										type='range'
										className='firstlog-onboarding__items'
										min={40}
										max={150}
										value={userChoices.weight}
										onChange={e => handleUserChoices("weight", e.target.value)}
									/>
								</div>
								<select
									className='firstlog-onboarding__items'
									value={userChoices.goal}
									onChange={e => handleUserChoices("goal", e.target.value)}>
									<option value=''> </option>
									{userChoices.goalOptions.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</select>
								<select
									className='firstlog-onboarding__items'
									value={userChoices.activity}
									onChange={e => handleUserChoices("activity", e.target.value)}>
									<option value=''></option>
									{userChoices.activityOptions.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<button className='firstlog-onboarding__save-user-choices-btn' onClick={saveUserChoices}>
						ACCEPT
					</button>
				</div>
			</div>
		</div>
	);
}
