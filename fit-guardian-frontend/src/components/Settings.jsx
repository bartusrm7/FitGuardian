import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { useLogRegContext } from "./LogRegContext";
import { useUserContext } from "./UserContext";

export default function Settings() {
	const { userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
	const {
		userAllData,
		setUserAllData,
		setUserTotalCalories,
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
	const [userOptions, setUserOptions] = useState({
		genderOptions: ["Male", "Female"],
		goalOptions: ["Lose weight", "Maintain weight", "Gain weight"],
		activityOptions: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
	});
	const [editedUserData, setEditedUserData] = useState(null);

	const handleInputChange = (name, value) => {
		setEditedUserData(prevState => ({
			...prevState,
			userChoices: {
				[name]: value,
			},
			userData: {
				[name]: value,
			},
		}));
	};

	const handleSaveChanges = () => {
		if (editedUserData) {
			setUserAllData(editedUserData);
			localStorage.setItem("userSettingChoices", JSON.stringify(editedUserData.userChoices));
			localStorage.setItem("userData", JSON.stringify(editedUserData.userData));
		}
	};

	useEffect(() => {
		const userChoicesString = localStorage.getItem("userSettingChoices");
		const userDataString = localStorage.getItem("userData");

		if (userChoicesString && userDataString) {
			const userChoices = JSON.parse(userChoicesString);
			const userData = JSON.parse(userDataString);

			const updatedUserChoices = {
				userChoices: userChoices,
				userData: userData,
			};
			setEditedUserData(updatedUserChoices);
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
						<div className='settings__user-settings-container'>
							{editedUserData && (
								<>
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
										<input
											type='range'
											className='settings__user-settings-data'
											value={editedUserData.userChoices.height}
											onChange={e => handleInputChange("height", e.target.value)}
										/>
									</div>
									<div className='settings__user-settings-item'>
										<div className='settings__user-settings-name'>WEIGHT:</div>
										<input
											type='range'
											className='settings__user-settings-data'
											value={editedUserData.userChoices.weight}
											onChange={e => handleInputChange("weight", e.target.value)}
										/>
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
								</>
							)}
						</div>
						<button className='settings__edited-data-btn' onClick={handleSaveChanges}>
							SAVE CHANGES
						</button>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
