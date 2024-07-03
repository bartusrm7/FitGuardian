import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export default function FoodProvider({ children }) {
	const [userMeal, setUserMeal] = useState([
		{ name: "Meal 1", food: [] },
		{ name: "Meal 2", food: [] },
		{ name: "Meal 3", food: [] },
		{ name: "Meal 4", food: [] },
	]);
	const [inputFood, setInputFood] = useState("");
	const [inputFoodGrams, setInputFoodGrams] = useState("");

	return (
		<FoodContext.Provider value={{ userMeal, setUserMeal, inputFood, setInputFood, inputFoodGrams, setInputFoodGrams }}>
			{children}
		</FoodContext.Provider>
	);
}
export const useFoodContext = () => useContext(FoodContext);
