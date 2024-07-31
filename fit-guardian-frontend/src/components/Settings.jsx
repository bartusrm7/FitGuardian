import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

export default function Settings() {
	const {
		setUserAllData,
		userTotalCalories,
		setUserTotalCalories,
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
	const [opacityClass, setOpacityClass] = useState("hide-opacity");

	const handleToggleActiveBtn = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const setMacronutrientsFromTotalCalories = totalCalories => {
		const proteinPercentage = 0.2;
		const carbPercentage = 0.5;
		const fatPercentage = 0.3;

		const proteins = (proteinPercentage * totalCalories) / 4;
		const carbs = (carbPercentage * totalCalories) / 4;
		const fats = (fatPercentage * totalCalories) / 9;

		const totalMacros = {
			proteins: proteins.toFixed(0),
			carbs: carbs.toFixed(0),
			fats: fats.toFixed(0),
		};

		setUserTotalMacros(totalMacros);
		setUserProteins(proteins.toFixed(0));
		setUserCarbs(carbs.toFixed(0));
		setUserFats(fats.toFixed(0));

		localStorage.setItem("userMacros", JSON.stringify(totalMacros));
		localStorage.setItem("userCurrentMacros", JSON.stringify(totalMacros));
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
		setMacronutrientsFromTotalCalories(totalUserChoices);
	};
	const handleInputChange = (name, value) => {
		setEditedUserData(prevState => {
			const newUserChoices = {
				...prevState.userChoices,
				[name]: value,
			};
			const newUserData = {
				...prevState.userCurrentData,
				[name]: value,
			};
			localStorage.setItem("userData", JSON.stringify(newUserData));
			localStorage.setItem("currentUserData", JSON.stringify(newUserData));
			setTimeout(() => {
				setNewMacronutrientsFromTotalCalories(
					newUserChoices.age,
					newUserChoices.height,
					newUserChoices.weight,
					newUserChoices.gender,
					newUserChoices.goal,
					newUserChoices.activity
				);
			}, 0);
			return {
				...prevState,
				userChoices: newUserChoices,
				userCurrentData: newUserData,
			};
		});
	};
	const handleSaveChanges = () => {
		if (editedUserData) {
			setUserAllData(editedUserData);
			localStorage.setItem("userName", JSON.stringify(editedUserData.userCurrentData.userName));
			localStorage.setItem("userChoices", JSON.stringify(editedUserData.userChoices));
			localStorage.setItem("userCurrentChoices", JSON.stringify(editedUserData.userChoices));
			localStorage.setItem("userCalories", userTotalCalories);
			localStorage.setItem("userCurrentCalories", userTotalCalories);
		}
	};

	useEffect(() => {
		const userCurrentChoicesString = localStorage.getItem("userCurrentChoices");
		const userCurrentDataString = localStorage.getItem("currentUserData");
		const userCurrentCaloriesString = localStorage.getItem("userCurrentCalories");
		const userCurrentMacrosString = localStorage.getItem("userCurrentMacros");
		if (userCurrentChoicesString && userCurrentDataString) {
			const userChoices = JSON.parse(userCurrentChoicesString);
			const userCurrentData = JSON.parse(userCurrentDataString);
			const userCurrentCalories = JSON.parse(userCurrentCaloriesString);
			const userCurrentMacros = JSON.parse(userCurrentMacrosString);

			const updatedUserChoices = {
				userChoices: userChoices,
				userCurrentData: userCurrentData,
				userCurrentCalories: userCurrentCalories,
				userCurrentMacros: userCurrentMacros,
			};
			setEditedUserData(updatedUserChoices);
			setUserTotalCalories(userCurrentCalories);
			if (userCurrentMacros) {
				setUserProteins(userCurrentMacros.proteins);
				setUserCarbs(userCurrentMacros.carbs);
				setUserFats(userCurrentMacros.fats);
			} else {
				setNewMacronutrientsFromTotalCalories(updatedUserChoices);
			}
		}
	}, []);

	useEffect(() => {
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`settings ${opacityClass}`}>
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
												value={editedUserData.userCurrentData.userName}
												onChange={e => handleInputChange("userName", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>EMAIL:</div>
											<div className='settings__user-settings-data'>{editedUserData.userCurrentData.userEmail}</div>
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
													? editedUserData.userCurrentData.userPassword
													: editedUserData.userCurrentData.userPassword.replace(/./g, "*")}
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
