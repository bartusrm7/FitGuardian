import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function Reg() {
	const { setAuthToken, userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword } =
		useLogRegContext();
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

	const userRegisterData = async () => {
		setError(true);
		let errors = { userName: "", userEmail: "", userPassword: "" };

		if (!userName) errors.userName = "Name field cannot be empty!";
		if (!userEmail || !validateEmail(userEmail)) errors.userEmail = "Invalid email!";
		if (!userPassword || !validatePassword(userPassword)) errors.userPassword = "Pass at leats 8 characters!";

		if (errors.userName || errors.userEmail || errors.userPassword) {
			setErrorMessage(errors);
			return;
		}

		try {
			const response = await fetch("http://localhost:5175/register", {
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
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("userName", data.user.userName);
			setUserName(data.user.userName);
			setAuthToken(data.accessToken);

			setUserEmail("");
			setUserPassword("");
			setErrorMessage({ userName: "", userEmail: "", userPassword: "" });
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
								<Tooltip title={<span>Enter an available user name</span>} arrow>
									<TextField
										label='Name'
										variant='standard'
										error={error && !!errorMessage.userName}
										helperText={error && errorMessage.userName}
										value={userName}
										onChange={e => {
											setUserName(e.target.value);
										}}
										sx={{
											color: "#000046",
											"&hover": { backgroundColor: "#000046" },
										}}
									/>
								</Tooltip>
							</div>
							<div className='reg__input-item-container'>
								<Tooltip title={<span>Enter a valid email address</span>} arrow>
									<TextField
										label='Email'
										variant='standard'
										error={error && !!errorMessage.userEmail}
										helperText={error && errorMessage.userEmail}
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
							<div className='reg__input-item-container'>
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
							id='reg1'
							className='reg__log-reg-accept-btn'
							onClick={userRegisterData}
							variant='outlined'
							sx={{ backgroundColor: "#60dfff", color: "#000046" }}>
							REGISTER
						</Button>
						<div className='reg__log-reg-switch-container'>
							<p>or</p>
							<Link to='/log'>
								<Button
									id='reg2'
									className='reg__log-reg-switch-btn'
									variant='outlined'
									sx={{ backgroundColor: "#60dfff", color: "#000046" }}>
									LOGIN
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
