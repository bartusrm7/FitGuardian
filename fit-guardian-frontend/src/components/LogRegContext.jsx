import { createContext, useContext, useState } from "react";

const LogRegContext = createContext();

export default function LogRegProvider({ children }) {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	return (
		<LogRegContext.Provider value={{ userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword }}>
			{children}
		</LogRegContext.Provider>
	);
}

export const useLogRegContext = () => useContext(LogRegContext);
