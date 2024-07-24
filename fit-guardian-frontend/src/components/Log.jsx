import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useState } from "react";

export default function Log() {
	const { setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
	const [opacityClass, setOpacityClass] = useState("display-opacity");
	const navigate = useNavigate();

	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
	};

	const userLoginData = async () => {
		if (!validateEmail(userEmail)) {
			console.log("Invalid email format!");
			return;
		}
		if (!validatePassword(userPassword)) {
			console.log("Password is to short!");
			return;
		}
		try {
			const response = await fetch("http://localhost:5174/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					userEmail: userEmail,
					userPassword: userPassword,
				}),
			});
			if (!response) {
				throw Error("Login failed!!");
			}
			const data = await response.json();
			if (!data.accessToken) {
				return;
			}
			localStorage.setItem("accessToken", data.accessToken);
			const userName = localStorage.getItem("userName");

			setUserEmail("");
			setUserPassword("");
			setUserName(userName);
			setOpacityClass("hide-opacity");
			setTimeout(() => {
				navigate("/menu");
			}, 300);
		} catch (error) {
			console.error("Error", error);
		}
	};

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
									type='email'
									placeholder='Email'
									value={userEmail}
									onChange={e => setUserEmail(e.target.value)}
								/>
							</div>
							<div className='log__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input
									type='password'
									placeholder='Password'
									value={userPassword}
									onChange={e => setUserPassword(e.target.value)}
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
