import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function FirstLogOnboarding() {
	const {
		userCurrentEmail,
		setUserCurrentEmail,
		setUserTotalCalories,
		setUserProteins,
		setUserCarbs,
		setUserFats,
		setUserTotalMacros,
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
	} = useUserContext();
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
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
	const handleSetUserAge = birthDate => {
		const today = new Date();
		const birthDateObject = new Date(birthDate);
		let age = today.getFullYear() - birthDateObject.getFullYear();
		const monthDifference = today.getMonth() - birthDateObject.getMonth();

		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObject.getDate())) {
			age--;
		}
		return age;
	};
	const handleUserChoices = (name, value) => {
		let updatedValue = value;
		if (name === "age") {
			const age = handleSetUserAge(value);
			updatedValue = age;
		}
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
	const calculateCalories = (age, height, weight, gender, goal, activity) => {
		let basedAge = 1;
		if (age >= 40 && age <= 50) {
			basedAge = 0.9;
		} else if (age >= 51 && age <= 60) {
			basedAge = 0.8;
		} else if (age >= 61) {
			basedAge = 0.7;
		}

		let basedHeight = 0;
		if (height >= 170 && height <= 190) {
			basedHeight = 100;
		} else if (height >= 191 && height <= 220) {
			basedHeight = 200;
		} else if (height >= 211) {
			basedHeight = 300;
		}

		let basedWeight = 0;
		if (weight >= 75 && weight <= 90) {
			basedWeight = 200;
		} else if (weight >= 91 && weight <= 110) {
			basedWeight = 300;
		} else if (weight >= 111) {
			basedWeight = 400;
		}

		let baseCalories = 0;
		if (gender === "Male") {
			baseCalories = 2200;
		} else if (gender === "Female") {
			baseCalories = 1800;
		}

		let baseGoalAmount = 0;
		if (goal === "Lose weight") {
			baseGoalAmount = -300;
		} else if (goal === "Gain weight") {
			baseGoalAmount = 300;
		}

		let baseActivityAmount = 1;
		if (activity === "Light") {
			baseActivityAmount = 1.25;
		} else if (activity === "Moderate") {
			baseActivityAmount = 1.35;
		} else if (activity === "Active") {
			baseActivityAmount = 1.5;
		} else if (activity === "Very Active") {
			baseActivityAmount = 1.65;
		}
		return (baseCalories + basedHeight + basedWeight + baseGoalAmount) * baseActivityAmount * basedAge;
	};
	const setMacronutrientsFromTotalCalories = calories => {
		const proteinPercentage = 0.2;
		const carbPercentage = 0.5;
		const fatPercentage = 0.3;

		const proteins = (calories * proteinPercentage) / 4;
		const carbs = (calories * carbPercentage) / 4;
		const fats = (calories * fatPercentage) / 9;

		const totalMacros = {
			proteins: proteins.toFixed(0),
			carbs: carbs.toFixed(0),
			fats: fats.toFixed(0),
		};
		setUserTotalMacros(totalMacros);
		setUserProteins(proteins.toFixed(0));
		setUserCarbs(carbs.toFixed(0));
		setUserFats(fats.toFixed(0));
	};
	const getUserEmail = async () => {
		try {
			const response = await fetch("http://localhost:5174/user-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			localStorage.setItem("userEmail", data.userEmail);
			setUserCurrentEmail(data.userEmail);
		} catch (error) {
			console.error("Error fetching user email:", error.message);
		}
	};
	const saveUserChoices = async () => {
		const userData = {
			userEmail: userCurrentEmail,
			userAge: userAge,
			userGender: userGender,
			userHeight: userHeight,
			userWeight: userWeight,
			userGoal: userGoal,
			userActivity: userActivity,
		};
		const isDataCompleted = Object.values(userData).every(value => value !== "");
		if (isDataCompleted) {
			const userCalories = calculateCalories(userAge, userHeight, userWeight, userGender, userGoal, userActivity);

			try {
				const response = await fetch("http://localhost:5174/save-user-data", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();

				setUserTotalCalories(userCalories);
				setMacronutrientsFromTotalCalories(userCalories);
				navigate("/menu");
				console.log(object);
			} catch (error) {
				console.error("Error saving user data:", error.message);
			}
		}
	};
	useEffect(() => {
		getUserEmail();
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`firstlog-onboarding ${opacityClass}`}>
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
										min={140}
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
