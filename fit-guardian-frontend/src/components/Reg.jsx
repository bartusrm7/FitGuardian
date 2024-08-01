import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useEffect, useState } from "react";

export default function Reg() {
	const { userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
	};

	const userRegisterData = async () => {
		setErrorMessage("");
		if (!userName || !userEmail || !userPassword) {
			setErrorMessage("Empty field!");
		}
		if (!validateEmail(userEmail)) {
			setErrorMessage("Empty field!");
			return;
		}
		if (!validatePassword(userPassword)) {
			setErrorMessage("Empty field!");
			return;
		}
		try {
			const response = await fetch("http://localhost:5174/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userName, userEmail, userPassword }),
			});
			if (!response.ok) {
				throw Error("Wrong data!");
			}
			const data = await response.json();
			// const newUserData = { userName, userEmail, userPassword };

			// const userDataJSON = localStorage.getItem("userData");
			// let userData = [];

			// if (userDataJSON) {
			// 	try {
			// 		userData = JSON.parse(userDataJSON);
			// 	} catch (error) {
			// 		console.error("Error parsing userData:", error);
			// 		userData = [];
			// 	}
			// }
			// userData.push(newUserData);

			// localStorage.setItem("userData", JSON.stringify(userData));
			// localStorage.setItem("currentUserData", JSON.stringify(newUserData));
			// localStorage.setItem("accessToken", data.accessToken);
			// localStorage.setItem("userName", userName);

			setUserName("");
			setUserEmail("");
			setUserPassword("");
			setErrorMessage("");
			navigate("/firstlog-onboarding");
		} catch (error) {
			console.error("Error", error);
		}
	};
	useEffect(() => {
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`reg ${opacityClass}`}>
				<div className='reg__main-container'>
					<div className='reg__container'>
						<Link to='/'>
							<button className='reg__cancel-btn'>
								<span className='material-symbols-outlined'>close</span>
							</button>
						</Link>
						<h3 className='reg__container-name'>REGISTER</h3>
						<div className='reg__input-container'>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>person</span>
								<input
									type='text'
									placeholder={errorMessage || "Account name"}
									value={userName}
									onChange={e => {
										setUserName(e.target.value);
										setErrorMessage("");
									}}
									style={{ borderColor: errorMessage ? "red" : "" }}
								/>
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>mail</span>
								<input
									type='email'
									placeholder={errorMessage || "Email"}
									value={userEmail}
									onChange={e => {
										setUserEmail(e.target.value);
										setErrorMessage("");
									}}
									style={{ borderColor: errorMessage ? "red" : "" }}
								/>
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input
									type='password'
									placeholder={errorMessage || "Password"}
									value={userPassword}
									onChange={e => {
										setUserPassword(e.target.value);
										setErrorMessage("");
									}}
									style={{ borderColor: errorMessage ? "red" : "" }}
								/>
							</div>
						</div>
						<button className='reg__log-reg-accept-btn' onClick={userRegisterData}>
							REGISTER
						</button>
						<div className='reg__log-reg-switch-container'>
							<p>Do you have already an account?</p>
							<Link to='/log'>
								<button className='reg__log-reg-switch-btn'>LOGIN</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
