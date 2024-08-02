import { createContext, useContext, useEffect, useState } from "react";

const LogRegContext = createContext();

export default function LogRegProvider({ children }) {
	const [authToken, setAuthToken] = useState(localStorage.getItem("accessToken"));
	const [userID, setUserID] = useState("");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		setAuthToken(token);
	}, []);

	return (
		<LogRegContext.Provider
			value={{
				authToken,
				setAuthToken,
				userID,
				setUserID,
				userName,
				setUserName,
				userEmail,
				setUserEmail,
				userPassword,
				setUserPassword,
			}}>
			{children}
		</LogRegContext.Provider>
	);
}

export const useLogRegContext = () => useContext(LogRegContext);
