import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

export default function Settings() {
	const {
		setUserAllData,
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
	const [userOptions, setUserOptions] = useState({
		genderOptions: ["Male", "Female"],
		goalOptions: ["Lose weight", "Maintain weight", "Gain weight"],
		activityOptions: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
	});
	const [editedUserData, setEditedUserData] = useState(null);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
	};
	const handleToggleActiveBtn = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const setMacronutrientsFromTotalCalories = () => {
		const proteinPercentage = 0.2;
		const carbPercentage = 0.5;
		const fatPercentage = 0.3;

		const proteins = (proteinPercentage * userTotalCalories) / 4;
		const carbs = (carbPercentage * userTotalCalories) / 4;
		const fats = (fatPercentage * userTotalCalories) / 9;

		const totalMacros = {
			proteins: proteins.toFixed(0),
			carbs: carbs.toFixed(0),
			fats: fats.toFixed(0),
		};

		setUserTotalMacros(totalMacros);
		setUserProteins(proteins.toFixed(0));
		setUserCarbs(carbs.toFixed(0));
		setUserFats(fats.toFixed(0));

		localStorage.setItem("userMacros", JSON.stringify(userTotalMacros));
	};
	const setNewMacronutrientsFromTotalCalories = (age, height, weight, gender, goal, activity) => {
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

		const totalUserChoices =
			(baseCalories + basedHeight + basedWeight + baseGoalAmount) * baseActivityAmount * basedAge;
		setUserTotalCalories(totalUserChoices);
		setMacronutrientsFromTotalCalories();
	};
	const handleInputChange = (name, value) => {
		setEditedUserData(prevState => {
			const newUserChoices = {
				...prevState.newUserChoices,
				[name]: value,
			};
			const newUserData = {
				...prevState.newUserData,
				[name]: value,
			};

			setNewMacronutrientsFromTotalCalories(
				newUserChoices.age,
				newUserChoices.height,
				newUserChoices.weight,
				newUserChoices.gender,
				newUserChoices.goal,
				newUserChoices.activity
			);

			return {
				...prevState,
				userChoices: newUserChoices,
				userData: newUserData,
			};
		});
	};
	const handleSaveChanges = () => {
		if (editedUserData) {
			const { userData } = editedUserData;
			if (!validateEmail(userData.userEmail)) {
				console.log("Invalid email format!");
				return;
			}
			if (!validatePassword(userData.userPassword)) {
				console.log("Password is to short!");
				return;
			}
			setUserAllData(editedUserData);
			localStorage.setItem("userChoices", JSON.stringify(editedUserData.userChoices));
			localStorage.setItem("userData", JSON.stringify(editedUserData.userData));
			localStorage.setItem("userName", userData.userName);
			localStorage.setItem("userCalories", userTotalCalories);
		}
	};
	useEffect(() => {
		const userChoicesString = localStorage.getItem("userChoices");
		const userDataString = localStorage.getItem("userData");
		const userCaloriesString = localStorage.getItem("userCalories");
		const userMacrosString = localStorage.getItem("userMacros");

		if (userChoicesString && userDataString) {
			const userChoices = JSON.parse(userChoicesString);
			const userData = JSON.parse(userDataString);
			const userCalories = JSON.parse(userCaloriesString);
			const userMacros = JSON.parse(userMacrosString);

			const updatedUserChoices = {
				userChoices: userChoices,
				userData: userData,
				userCalories: userCalories,
				userMacros: userMacros,
			};
			setEditedUserData(updatedUserChoices);
			setUserTotalCalories(userCalories);
			if (userMacros) {
				setUserProteins(userMacros.proteins);
				setUserCarbs(userMacros.carbs);
				setUserFats(userMacros.fats);
			} else {
				setNewMacronutrientsFromTotalCalories(
					userChoices.age,
					userChoices.height,
					userChoices.weight,
					userChoices.gender,
					userChoices.goal,
					userChoices.activity
				);
			}
		}
	}, []);

	return (
		<div>
			<div className='settings'>
				<div className='settings__main-container'>
					<div className='settings__container'>
						<div className='settings__container-name'>
							<h3 className='settings__label'>Settings</h3>
						</div>
						<div className='settings__over-container'>
							<div className='settings__user-settings-container'>
								{editedUserData && (
									<>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>NAME:</div>
											<input
												type='text'
												className='settings__user-settings-data'
												value={editedUserData.userData.userName}
												onChange={e => handleInputChange("userName", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>EMAIL:</div>
											<div className='settings__user-settings-data'>{editedUserData.userData.userEmail}</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>PASSWORD:</div>
											<div className='settings__user-settings-data'>
												<button
													className={`toggle-password-btn ${isPasswordVisible ? "active" : ""}`}
													onClick={handleToggleActiveBtn}>
													SHOW
												</button>
												{isPasswordVisible
													? editedUserData.userData.userPassword
													: editedUserData.userData.userPassword.replace(/./g, "*")}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>BIRTHDAY DATE:</div>
											<div
												className='settings__user-settings-data'
												onChange={e => handleInputChange("age", e.target.value)}>
												{editedUserData.userChoices.age}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>GENDER:</div>
											<div
												className='settings__user-settings-data'
												onChange={e => handleInputChange("gender", e.target.value)}>
												{editedUserData.userChoices.gender}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>HEIGHT:</div>
											<div className='choices'>
												<span>{`${editedUserData.userChoices.height}cm`}</span>
												<input
													type='range'
													min={140}
													max={250}
													className='settings__user-settings-data'
													value={editedUserData.userChoices.height}
													onChange={e => handleInputChange("height", e.target.value)}
												/>
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>WEIGHT:</div>
											<div className='choices'>
												<span>{`${editedUserData.userChoices.weight}kg`}</span>
												<input
													type='range'
													min={40}
													max={150}
													className='settings__user-settings-data'
													value={editedUserData.userChoices.weight}
													onChange={e => handleInputChange("weight", e.target.value)}
												/>
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>GOAL:</div>
											<select
												className='settings__user-settings-data'
												value={editedUserData.userChoices.goal}
												onChange={e => handleInputChange("goal", e.target.value)}>
												<option value=''></option>
												{userOptions.goalOptions.map((option, index) => (
													<option key={index} value={option}>
														{option}
													</option>
												))}
											</select>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>ACTIVITY:</div>
											<select
												className='settings__user-settings-data'
												value={editedUserData.userChoices.activity}
												onChange={e => handleInputChange("activity", e.target.value)}>
												<option value=''></option>
												{userOptions.activityOptions.map((option, index) => (
													<option key={index} value={option}>
														{option}
													</option>
												))}
											</select>
										</div>
										<div className='settings__user-settings-item calories'>
											<div className='settings__user-settings-name'>CALORIES:</div>
											<div
												className='settings__user-settings-data'
												onChange={e => setUserTotalCalories(e.target.value)}>
												{`${userTotalCalories}cal`}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>MACROS:</div>
											<div className='settings__input-macro-container'>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}>
													<span>P:</span>
													{`${userProteins}g`}
												</div>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}>
													<span>C:</span>
													{`${userCarbs}g`}
												</div>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}>
													<span>F:</span>
													{`${userFats}g`}
												</div>
											</div>
										</div>
										<div className='settings__edited-data-btn-container'>
											<button className='settings__edited-data-btn' onClick={handleSaveChanges}>
												SAVE CHANGES
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
