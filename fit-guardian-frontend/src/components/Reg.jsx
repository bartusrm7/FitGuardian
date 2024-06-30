import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";
import { useUserContext } from "./UserContext";

export default function Reg() {
	const { userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword } = useLogRegContext();
	const navigate = useNavigate();

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
			if (!response.ok) {
				throw Error("Wrong data!");
			}
			if (!validateEmail(userEmail)) {
				console.log("Invalid email format!");
				return;
			}
			if (!validatePassword(userPassword)) {
				console.log("Password is to short!");
				return;
			}
			const data = await response.json();
			const saveUserData = { userName: userName, userEmail: userEmail, userPassword: userPassword };

			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("userData", JSON.stringify(saveUserData));
			localStorage.setItem("userName", userName);

			setUserName("");
			setUserEmail("");
			setUserPassword("");
			navigate("/firstlog-onboarding");
		} catch (error) {
			console.error("Error", error);
		}
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
