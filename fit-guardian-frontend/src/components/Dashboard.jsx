import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogRegContext } from "./LogRegContext";

export default function Dashboard() {
	const [hamburger, setHamgurger] = useState(false);
	const [error, setError] = useState(false);
	const { userName, setUserName } = useLogRegContext();
	const navigate = useNavigate();

	const handleHamburger = () => setHamgurger(!hamburger);
	const handleCloseMenu = () => setHamgurger(hamburger);
	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("userName");
		setUserName("");
		navigate("/");
	};

	// useEffect(() => {
	// 	const fetchUserName = () => {
	// 		const response = fetch("/user-name", {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	// 			},
	// 		});
	// 		if (!response.ok) {
	// 			setError(`Fetch error!`);
	// 			return;
	// 		}
	// 		const data = response.json();
	// 		localStorage.setItem("userName", data.user.userName);
	// 		setUserName(data.user.userName);
	// 	};
	// 	fetchUserName();
	// }, []);

	useEffect(() => {
		const getName = localStorage.getItem("userName");
		setUserName(getName);
	}, []);

	return (
		<div>
			<div className='dashboard'>
				<div className='dashboard__main-container'>
					<div className='dashboard__container'>
						<div className='dashboard__container-name'>
							<h3 className='dashboard__label'>FitGuardian</h3>
							{hamburger ? (
								<span className='material-symbols-outlined hamburger' onClick={handleHamburger}>
									close
								</span>
							) : (
								<span className='material-symbols-outlined hamburger' onClick={handleHamburger}>
									menu
								</span>
							)}
						</div>
						<div className={`dashboard__container-menu ${hamburger ? "" : "opened-menu"}`}>
							<h3 className='dashboard__label'>FitGuardian</h3>
							<div className='dashboard__account-name'>
								<span className='material-symbols-outlined'>person</span>
								{userName}
							</div>
							<div className='dashboard__menu-item'>
								<Link to='/menu' onClick={handleCloseMenu}>
									<span className='material-symbols-outlined'>restaurant</span>Menu
								</Link>
							</div>
							<div className='dashboard__menu-item'>
								<Link to='/macronutrients' onClick={handleCloseMenu}>
									<span className='material-symbols-outlined'>grocery</span>Macronutrients
								</Link>
							</div>
							<div className='dashboard__menu-item'>
								<Link to='/statistics' onClick={handleCloseMenu}>
									<span className='material-symbols-outlined'>monitoring</span>Statistics
								</Link>
							</div>
							<div className='dashboard__menu-item'>
								<Link to='/settings' onClick={handleCloseMenu}>
									<span className='material-symbols-outlined'>settings</span>Settings
								</Link>
							</div>
							<div className='dashboard__menu-item' onClick={handleLogout}>
								<span className='material-symbols-outlined'>logout</span>Log Out
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
