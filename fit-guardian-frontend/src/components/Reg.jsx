import { useState } from "react";
import { Link } from "react-router-dom";

export default function Reg() {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = password => {
		return password.length >= 8;
	};

	const userRegisterData = async () => {
		try {
			const response = await fetch("http://localhost:5174/register", {
				method: "POST",
				headers: {
					"Content-Type": "Application/JSON",
				},
				body: JSON.stringify({
					userName: userName,
					userEmail: userEmail,
					userPassword: userPassword,
				}),
			});
			if (!response) {
				throw Error("Wrong data!");
			}
		} catch (error) {}
	};

	return (
		<div>
			<div className='reg'>
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
									placeholder='Account name'
									value={userName}
									onChange={e => setUserName(e.target.value)}
								/>
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>mail</span>
								<input
									type='email'
									placeholder='Email'
									value={userEmail}
									onChange={e => setUserEmail(e.target.value)}
								/>
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input
									type='password'
									placeholder='Password'
									value={userPassword}
									onChange={e => setUserPassword(e.target.value)}
								/>
							</div>
						</div>
						<button className='reg__log-reg-accept-btn'>REGISTER</button>
						<div className='reg__log-reg-switch-container'>
							<p>Do you have already an account?</p>
							<Link to='/log'>
								<button className='reg__log-reg-switch-btn' onClick={userRegisterData}>
									LOGIN
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
