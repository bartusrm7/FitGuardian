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
	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
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
		console.log(totalMacros);

		setUserProteins(proteins.toFixed(0));
		setUserCarbs(carbs.toFixed(0));
		setUserFats(fats.toFixed(0));
	};
	const handleInputChange = (name, value) => {
		setEditedUserData(prevState => ({
			...prevState,
			userChoices: {
				...prevState.userChoices,
				[name]: value,
			},
			userData: {
				...prevState.userData,
				[name]: value,
			},
		}));
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
			localStorage.setItem("userMacros", JSON.stringify(userTotalMacros));
		}
	};

	useEffect(() => {
		const userChoicesString = localStorage.getItem("userChoices");
		const userDataString = localStorage.getItem("userData");
		const userCaloriesString = localStorage.getItem("userCalories");
		const userMacrosString = localStorage.getItem("userMacros");
		console.log(userMacrosString);

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
			setMacronutrientsFromTotalCalories(userMacrosString);
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
						<div className='settings__main-container-with-data'>
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
											<input
												type='email'
												className='settings__user-settings-data'
												value={editedUserData.userData.userEmail}
												onChange={e => handleInputChange("userEmail", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>PASSWORD:</div>
											<input
												type='password'
												className='settings__user-settings-data'
												value={editedUserData.userData.userPassword}
												onChange={e => handleInputChange("userPassword", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>BIRTHDAY DATE:</div>
											<input
												type='date'
												className='settings__user-settings-data'
												value={editedUserData.userChoices.age}
												onChange={e => handleInputChange("age", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>GENDER:</div>
											<select
												className='settings__user-settings-data'
												value={editedUserData.userChoices.gender}
												onChange={e => handleInputChange("gender", e.target.value)}>
												<option value=''></option>
												{userOptions.genderOptions.map((option, index) => (
													<option key={index} value={option}>
														{option}
													</option>
												))}
											</select>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>HEIGHT:</div>
											<div className='choices'>
												<span>{`${editedUserData.userChoices.height}cm`}</span>
												<input
													type='range'
													min={100}
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
											<input
												type='text'
												className='settings__user-settings-data'
												value={`${userTotalCalories}kcal`}
												onChange={e => setUserTotalCalories(e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>MACROS:</div>
											<div className='settings__input-macro-container'>
												<input
													type='text'
													className='settings__user-settings-data'
													placeholder='P%'
													value={`${userProteins}g`}
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}
												/>
												<input
													type='text'
													className='settings__user-settings-data'
													placeholder='C%'
													value={`${userCarbs}g`}
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}
												/>
												<input
													type='text'
													className='settings__user-settings-data'
													placeholder='F%'
													value={`${userFats}g`}
													onChange={e => setMacronutrientsFromTotalCalories(e.target.value)}
												/>
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
