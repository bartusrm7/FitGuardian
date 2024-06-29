import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useLogRegContext } from "./LogRegContext";

export default function Settings() {
	const [allUserChoices, setAllUserChoices] = useState({});

	const uploadUserChoices = () => {};
	useEffect(() => {
		const userChoicesString = localStorage.getItem("userSettingChoices");
		const userDataString = localStorage.getItem("userData");
		console.log(userChoicesString);
		console.log(userDataString);
		if (userChoicesString && userDataString) {
			const userChoices = JSON.parse(userChoicesString);
			const userData = JSON.parse(userDataString);

			const updatedUserChoices = {
				userChoices: userChoices,
				userData: userData,
			};
			setAllUserChoices(updatedUserChoices);
			console.log(allUserChoices);
			console.log(updatedUserChoices);
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
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.age}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.gender}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.goal}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.height}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.weight}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.activity}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.age}</div>
							</div>
							<div className='settings__user-settings-item'>
								<div className='settings__user-settings-name'></div>
								<div className='settings__user-settings-data'>{allUserChoices.userChoices.age}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
