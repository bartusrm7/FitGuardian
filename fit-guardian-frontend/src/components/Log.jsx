import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useEffect, useState } from "react";

export default function Log() {
	const { setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
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

	const userLoginData = async () => {
		if (!userEmail) {
			setErrorMessage("Empty field!");
		}
		if (!validateEmail(userEmail)) {
			setErrorMessage("Empty field!");
			return;
		}
		if (!userPassword) {
			setErrorMessage("Empty field!");
		}
		if (!validatePassword(userPassword)) {
			setErrorMessage("Empty field!");
			return;
		}
		try {
			const response = await fetch("http://localhost:5174/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ userEmail, userPassword }),
			});
			const data = await response.json();

			if (!response.ok) {
				throw Error("Login failed!!");
			}
			if (!data.accessToken) {
				return;
			}
			const userName = localStorage.getItem("userName");
			const loggedUser = { userName, userEmail, userPassword };

			localStorage.setItem("currentUserData", JSON.stringify(loggedUser));
			localStorage.setItem("accessToken", data.accessToken);

			setUserEmail("");
			setUserPassword("");
			setUserName(userName);
			navigate("/menu");
		} catch (error) {
			console.error("Error", error);
		}
	};
	useEffect(() => {
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`log ${opacityClass}`}>
				<div className='log__main-container'>
					<div className='log__container'>
						<Link to='/'>
							<button className='log__cancel-btn'>
								<span className='material-symbols-outlined'>close</span>
							</button>
						</Link>
						<h3 className='log__container-name'>LOGIN</h3>
						<div className='log__input-container'>
							<div className='log__input-item-container'>
								<span className='material-symbols-outlined'>mail</span>
								<input
									className='email'
									type='email'
									placeholder={errorMessage || "Email"}
									value={userEmail}
									onChange={e => {
										setUserEmail(e.target.value);
										setErrorMessage();
									}}
									style={{ borderColor: errorMessage ? "red" : "" }}
								/>
							</div>
							<div className='log__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input
									className='password'
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
						<button className='log__log-reg-accept-btn' onClick={userLoginData}>
							LOGIN
						</button>
						<div className='log__log-reg-switch-container'>
							<p>Do you have not an account?</p>
							<Link to='/reg'>
								<button className='log__log-reg-switch-btn'>REGISTER</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
