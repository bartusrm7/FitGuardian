import { createContext, useContext, useState } from "react";

const LogRegContext = createContext();

export default function LogRegProvider({ children }) {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const [userAge, setUserAge] = useState("");
	const [userGenger, setUserGenger] = useState("");
	const [userHeight, setUserHeight] = useState("");
	const [userWeight, setUserWeight] = useState("");
	const [userGoal, setUserGoal] = useState("");
	const [userActivity, setUserActivity] = useState("");

	return (
		<LogRegContext.Provider
			value={{
				userName,
				setUserName,
				userEmail,
				setUserEmail,
				userPassword,
				setUserPassword,
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
			}}>
			{children}
		</LogRegContext.Provider>
	);
}

export const useLogRegContext = () => useContext(LogRegContext);
