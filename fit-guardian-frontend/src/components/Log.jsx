import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function Log() {
	const { setAuthToken, setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
	const [errorMessage, setErrorMessage] = useState({ userName: "", userEmail: "", userPassword: "" });
	const [error, setError] = useState(false);
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
	const navigate = useNavigate();

	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
	};

	const userLoginData = async () => {
		setError(true);
		let errors = { userName: "", userEmail: "", userPassword: "" };

		if (!userEmail || !validateEmail(userEmail)) errors.userEmail = "Invalid email!";
		if (!userPassword || !validatePassword(userPassword)) errors.userPassword = "Pass at leats 8 characters!";

		if (errors.userEmail || errors.userPassword) {
			setErrorMessage(errors);
			return;
		}
		try {
			const response = await fetch("http://localhost:5175/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ userEmail, userPassword }),
			});
			if (!response.ok) {
				throw Error("Login failed!!");
			}
			const data = await response.json();
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("userName", data.user.userName);
			setUserName(data.user.userName);
			setAuthToken(data.accessToken);

			setUserEmail("");
			setUserPassword("");
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
								<Tooltip title={<span>Enter a valid email address</span>} arrow>
									<TextField
										label='Email'
										variant='standard'
										error={error && !!errorMessage.userEmail}
										helperText={error && errorMessage.userEmail}
										type='email'
										value={userEmail}
										onChange={e => {
											setUserEmail(e.target.value);
										}}
										sx={{
											color: "#000046",
											"&hover": { backgroundColor: "#000046" },
										}}
									/>
								</Tooltip>
							</div>
							<div className='log__input-item-container'>
								<Tooltip title={<span>Password must be at least 8 characters long</span>} arrow>
									<TextField
										label='Password'
										variant='standard'
										error={error && !!errorMessage.userPassword}
										helperText={error && errorMessage.userPassword}
										type='password'
										value={userPassword}
										onChange={e => {
											setUserPassword(e.target.value);
										}}
										sx={{
											color: "#000046",
											"&hover": { backgroundColor: "#000046" },
										}}
									/>
								</Tooltip>
							</div>
						</div>
						<Button
							id='log1'
							className='log__log-reg-accept-btn'
							variant='outlined'
							onClick={userLoginData}
							sx={{ backgroundColor: "#60dfff", color: "#000046" }}>
							LOGIN
						</Button>
						<div className='log__log-reg-switch-container'>
							<p>or</p>
							<Link to='/reg'>
								<Button
									id='log2'
									className='log__log-reg-switch-btn'
									variant='outlined'
									sx={{ backgroundColor: "#60dfff", color: "#000046" }}>
									REGISTER
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
