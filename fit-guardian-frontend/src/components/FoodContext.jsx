import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export default function FoodProvider({ children }) {
	const [userFood, setUserFood] = useState([]);
	const [inputFood, setInputFood] = useState("");
	const [inputFoodGrams, setInputFoodGrams] = useState("");
	return (
		<FoodContext.Provider value={(userFood, setUserFood, inputFood, setInputFood, inputFoodGrams, setInputFoodGrams)}>
			{children}
		</FoodContext.Provider>
	);
}

export const useFoodContext = useContext(FoodContext);
