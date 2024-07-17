import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export default function FoodProvider({ children }) {
	const [userMeal, setUserMeal] = useState([]);
	const [currentDate, setCurrentDate] = useState("");
	const [allMacros, setAllMacros] = useState({
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const [inputFood, setInputFood] = useState("");
	const [inputFoodGrams, setInputFoodGrams] = useState("");

	return (
		<FoodContext.Provider
			value={{
				userMeal,
				setUserMeal,
				currentDate,
				setCurrentDate,
				allMacros,
				setAllMacros,
				inputFood,
				setInputFood,
				inputFoodGrams,
				setInputFoodGrams,
			}}>
			{children}
		</FoodContext.Provider>
	);
}
export const useFoodContext = () => useContext(FoodContext);
