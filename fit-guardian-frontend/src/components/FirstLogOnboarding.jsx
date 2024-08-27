import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
	const navigate = useNavigate();
	const [opacityClass, setOpacityClass] = useState("hide-opacity");

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
		const context = {
			age: setUserAge,
			gender: setUserGender,
			height: setUserHeight,
			weight: setUserWeight,
			goal: setUserGoal,
			activity: setUserActivity,
		};
		if (context[name]) {
			context[name](value);
		}
	};
	const calculateCalories = (age, height, weight, gender, goal, activity) => {
		let basedAge = 1;
		if (age >= 40 && age <= 50) basedAge = 0.9;
		else if (age >= 51 && age <= 60) basedAge = 0.8;
		else if (age >= 61) basedAge = 0.7;

		let basedHeight = 0;
		if (height >= 170 && height <= 190) basedHeight = 100;
		else if (height >= 191 && height <= 220) basedHeight = 200;
		else if (height >= 211) basedHeight = 300;

		let basedWeight = 0;
		if (weight >= 75 && weight <= 90) basedWeight = 200;
		else if (weight >= 91 && weight <= 110) basedWeight = 300;
		else if (weight >= 111) basedWeight = 400;

		let baseCalories = 0;
		if (gender === "Male") baseCalories = 2200;
		else if (gender === "Female") baseCalories = 1800;

		let baseGoalAmount = 0;
		if (goal === "Lose weight") baseGoalAmount = -300;
		else if (goal === "Gain weight") baseGoalAmount = 300;

		let baseActivityAmount = 1;
		if (activity === "Light") baseActivityAmount = 1.25;
		else if (activity === "Moderate") baseActivityAmount = 1.35;
		else if (activity === "Active") baseActivityAmount = 1.5;
		else if (activity === "Very Active") baseActivityAmount = 1.65;

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
		return totalMacros;
	};
	const getUserEmail = async () => {
		try {
			const response = await fetch("http://localhost:5175/user-data", {
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
		const userCalories = calculateCalories(userAge, userHeight, userWeight, userGender, userGoal, userActivity);
		const userMacros = setMacronutrientsFromTotalCalories(userCalories);
		try {
			const response = await fetch("http://localhost:5175/save-user-data-after-firstlog", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: userCurrentEmail,
					userAge,
					userGender,
					userHeight,
					userWeight,
					userGoal,
					userActivity,
					userCalories,
					userProteins: userMacros.proteins,
					userCarbs: userMacros.carbs,
					userFats: userMacros.fats,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			setUserTotalCalories(userCalories);
			navigate("/menu");
		} catch (error) {
			console.error("Error saving user data:", error.message);
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
									id='age-select'
									className='firstlog-onboarding__items'
									value={userChoices.age}
									onChange={e => handleUserChoices("age", e.target.value)}
									style={{ backgroundColor: "#caf0f8" }}
								/>
								<Select
									labelId='gender-select-label'
									id='gender-select'
									value={userChoices.gender}
									onChange={e => handleUserChoices("gender", e.target.value)}
									displayEmpty
									renderValue={userChoices.gender !== "" ? undefined : () => <em>Select Gender</em>}
									sx={{
										height: "25px",
										backgroundColor: "#caf0f8",
										"@media (min-width: 768px)": { height: "35px" },
									}}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{userChoices.genderOptions.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
								<Slider
									step={1}
									marks
									min={140}
									max={250}
									id='height-select'
									valueLabelDisplay='auto'
									value={userChoices.height}
									onChange={e => handleUserChoices("height", e.target.value)}
									sx={{
										height: "10px",
									}}
								/>
								<Slider
									step={1}
									marks
									min={40}
									max={150}
									id='weight-select'
									valueLabelDisplay='auto'
									value={userChoices.weight}
									onChange={e => handleUserChoices("weight", e.target.value)}
									sx={{
										height: "10px",
									}}
								/>
								<Select
									labelId='goal-select-label'
									id='goal-select'
									value={userChoices.goal}
									onChange={e => handleUserChoices("goal", e.target.value)}
									displayEmpty
									renderValue={userChoices.goal !== "" ? undefined : () => <em>Select Goal</em>}
									sx={{
										height: "25px",
										backgroundColor: "#caf0f8",
										"@media (min-width: 768px)": { height: "35px" },
									}}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{userChoices.goalOptions.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
								<Select
									labelId='activity-select-label'
									id='activity-select'
									value={userChoices.activity}
									onChange={e => handleUserChoices("activity", e.target.value)}
									displayEmpty
									renderValue={userChoices.activity !== "" ? undefined : () => <em>Select Activity</em>}
									sx={{
										height: "25px",
										backgroundColor: "#caf0f8",
										"@media (min-width: 768px)": { height: "35px" },
									}}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{userChoices.activityOptions.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
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
