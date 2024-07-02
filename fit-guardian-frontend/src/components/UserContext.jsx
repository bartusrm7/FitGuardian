import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
	const [userAllData, setUserAllData] = useState("");

	const [userTotalCalories, setUserTotalCalories] = useState("");
	const [userTotalMacros, setUserTotalMacros] = useState("");
	const [userProteins, setUserProteins] = useState("");
	const [userCarbs, setUserCarbs] = useState("");
	const [userFats, setUserFats] = useState("");

	const [userAge, setUserAge] = useState("");
	const [userGender, setUserGender] = useState("");
	const [userHeight, setUserHeight] = useState("");
	const [userWeight, setUserWeight] = useState("");
	const [userGoal, setUserGoal] = useState("");
	const [userActivity, setUserActivity] = useState("");

	return (
		<UserContext.Provider
			value={{
				userAllData,
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
			}}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
