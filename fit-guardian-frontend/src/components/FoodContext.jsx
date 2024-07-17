import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export default function FoodProvider({ children }) {
	const [userMeal, setUserMeal] = useState([
		{ id: 1, date: "", name: "Meal 1", food: [] },
		{ id: 2, date: "", name: "Meal 2", food: [] },
		{ id: 3, date: "", name: "Meal 3", food: [] },
		{ id: 4, date: "", name: "Meal 4", food: [] },
	]);
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
