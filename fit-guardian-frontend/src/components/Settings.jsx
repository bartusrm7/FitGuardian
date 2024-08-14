import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

export default function Settings() {
	const {
		userCurrentEmail,
		setUserCurrentEmail,
		setUserTotalCalories,
		setUserTotalMacros,
		setUserProteins,
		setUserCarbs,
		setUserFats,
	} = useUserContext();
	const userOptions = {
		genderOptions: ["Male", "Female"],
		goalOptions: ["Lose weight", "Maintain weight", "Gain weight"],
		activityOptions: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
	};
	const [editedUserData, setEditedUserData] = useState({
		userName: "",
		userEmail: "",
		userPassword: "",
		userAge: 0,
		userGender: "",
		userHeight: 0,
		userWeight: 0,
		userGoal: "",
		userActivity: "",
		userCalories: 0,
		userProteins: 0,
		userCarbs: 0,
		userFats: 0,
	});
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

		setEditedUserData(prevState => ({
			...prevState,
			userCalories: totalCalories,
			userProteins: totalMacros.proteins,
			userCarbs: totalMacros.carbs,
			userFats: totalMacros.fats,
		}));
	};
	const setNewMacronutrientsFromTotalCalories = (age, height, weight, gender, goal, activity) => {
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

		const totalUserChoices =
			(baseCalories + basedHeight + basedWeight + baseGoalAmount) * baseActivityAmount * basedAge;
		setUserTotalCalories(totalUserChoices);
		setMacronutrientsFromTotalCalories(totalUserChoices);
	};

	const handleInputChange = (name, value) => {
		setEditedUserData(prevState => {
			const updatedUserData = {
				...prevState,
				[name]: value,
			};
			setTimeout(() => {
				setNewMacronutrientsFromTotalCalories(
					updatedUserData.userAge,
					updatedUserData.userHeight,
					updatedUserData.userWeight,
					updatedUserData.userGender,
					updatedUserData.userGoal,
					updatedUserData.userActivity
				);
			}, 0);
			return updatedUserData;
		});
	};

	const handleSaveChanges = async () => {
		if (!userCurrentEmail) return;
		try {
			const response = await fetch("http://localhost:5174/save-user-data", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					userEmail: editedUserData.userEmail,
					userName: editedUserData.userName,
					userPassword: editedUserData.userPassword,
					userAge: editedUserData.userAge,
					userGender: editedUserData.userGender,
					userHeight: editedUserData.userHeight,
					userWeight: editedUserData.userWeight,
					userGoal: editedUserData.userGoal,
					userActivity: editedUserData.userActivity,
					userCalories: editedUserData.userCalories,
					userProteins: editedUserData.userProteins,
					userCarbs: editedUserData.userCarbs,
					userFats: editedUserData.userFats,
				}),
			});
			if (!response.ok) {
				throw Error("Save data is not working!");
			}
			const data = await response.json();
			console.log(data);

			setEditedUserData(data);
			localStorage.setItem("userName", data.userName);
		} catch (error) {
			console.error("Error fetching user data:", error.message);
		}
	};
	// ZROBIĆ README KTÓRE JUŻ MOMY ZAPISANE W CHACIE GPT!!!
	useEffect(() => {
		const getUserDataAndMacrosFromBackend = async () => {
			if (!userCurrentEmail) return;
			try {
				const response = await fetch("http://localhost:5174/pass-user-data", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({ userEmail: userCurrentEmail }),
				});
				if (!response.ok) {
					throw Error("Login failed!");
				}
				const data = await response.json();
				setEditedUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error.message);
			}
		};
		getUserDataAndMacrosFromBackend();
	}, [userCurrentEmail]);

	useEffect(() => {
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
				setUserCurrentEmail(data.userEmail);
			} catch (error) {
				console.error("Error fetching user email:", error.message);
			}
		};
		getUserEmail();
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
												value={editedUserData.userName}
												onChange={e => handleInputChange("userName", e.target.value)}
											/>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>EMAIL:</div>
											<div className='settings__user-settings-data'>{editedUserData.userEmail}</div>
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
													? editedUserData.userPassword
													: editedUserData.userPassword.replace(/./g, "*")}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>BIRTHDAY DATE:</div>
											<div
												className='settings__user-settings-data'
												value={editedUserData.userAge}
												onChange={e => handleInputChange("userAge", e.target.value)}>
												{editedUserData.userAge}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>GENDER:</div>
											<div
												className='settings__user-settings-data'
												value={editedUserData.userGender}
												onChange={e => handleInputChange("userGender", e.target.value)}>
												{editedUserData.userGender}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>HEIGHT:</div>
											<div className='choices'>
												<span>{`${editedUserData.userHeight}cm`}</span>
												<input
													type='range'
													min={140}
													max={250}
													className='settings__user-settings-data'
													value={editedUserData.userHeight}
													onChange={e => handleInputChange("userHeight", e.target.value)}
												/>
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>WEIGHT:</div>
											<div className='choices'>
												<span>{`${editedUserData.userWeight}kg`}</span>
												<input
													type='range'
													min={40}
													max={150}
													className='settings__user-settings-data'
													value={editedUserData.userWeight}
													onChange={e => handleInputChange("userWeight", e.target.value)}
												/>
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>GOAL:</div>
											<select
												className='settings__user-settings-data'
												value={editedUserData.userGoal}
												onChange={e => handleInputChange("userGoal", e.target.value)}>
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
												value={editedUserData.userActivity}
												onChange={e => handleInputChange("userActivity", e.target.value)}>
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
												onChange={e => setUserTotalCalories("userCalories", e.target.value)}>
												{`${editedUserData.userCalories}cal`}
											</div>
										</div>
										<div className='settings__user-settings-item'>
											<div className='settings__user-settings-name'>MACROS:</div>
											<div className='settings__input-macro-container'>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories("userProteins", e.target.value)}>
													<span>P:</span>
													{`${editedUserData.userProteins}g`}
												</div>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories("userCarbs", e.target.value)}>
													<span>C:</span>
													{`${editedUserData.userCarbs}g`}
												</div>
												<div
													className='settings__user-settings-data'
													onChange={e => setMacronutrientsFromTotalCalories("userFats", e.target.value)}>
													<span>F:</span>
													{`${editedUserData.userFats}g`}
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
