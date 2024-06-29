import { createContext, useContext } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
	const [userTotalCalories, setUserTotalCalories] = useState("");
	const [userAge, setUserAge] = useState("");
	const [userGender, setUserGender] = useState("");
	const [userHeight, setUserHeight] = useState("");
	const [userWeight, setUserWeight] = useState("");
	const [userGoal, setUserGoal] = useState("");
	const [userActivity, setUserActivity] = useState("");

	return (
		<UserContext.Provider
			value={{
				userTotalCalories,
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
			}}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
