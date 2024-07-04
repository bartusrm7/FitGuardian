import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export default function FoodProvider({ children }) {
	const [userMeal, setUserMeal] = useState([
		{ id: 1, name: "Meal 1", food: [] },
		{ id: 2, name: "Meal 2", food: [] },
		{ id: 3, name: "Meal 3", food: [] },
		{ id: 4, name: "Meal 4", food: [] },
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
