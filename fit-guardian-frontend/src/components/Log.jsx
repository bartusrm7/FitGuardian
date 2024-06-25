import { Link } from "react-router-dom";

export default function Log() {
	const userLoginData = async () => {
		try {
			const response = await fetch("http://localhost:5174/register", {
				method: "POST",
				headers: {
					"Content-type": "Application/JSON",
				},
				body: JSON.stringify({
					userEmail: userEmail,
					userPassword: userPassword,
				}),
			});
			if (!response) {
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
		} catch (error) {}
	};

	return (
		<div>
			<div className='log'>
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
								<input type='email' placeholder='Email' />
							</div>
							<div className='log__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input type='password' placeholder='Password' />
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
