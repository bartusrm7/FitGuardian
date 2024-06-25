import { createContext, useContext, useState } from "react";

const LogRegContext = createContext();

export default function LogRegProvicer() {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	return;
}
