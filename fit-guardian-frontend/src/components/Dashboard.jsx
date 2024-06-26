import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const [hamburger, setHamgurger] = useState(false);

	const handleHamburger = () => setHamgurger(!hamburger);

	return (
		<div>
			<div className='dashboard'>
				<div className='dashboard__main-container'>
					<div className='dashboard__container'>
						<div className='dashboard__container-name'>
							<h3 className='dashboard__label'>FitGuardian</h3>
							{hamburger ? (
								<span className='material-symbols-outlined hamburger' onClick={handleHamburger}>
									menu
								</span>
							) : (
								<span className='material-symbols-outlined hamburger' onClick={handleHamburger}>
									close
								</span>
							)}
						</div>
						<div className={`dashboard__container-menu ${hamburger ? "opened-menu" : ""}`}>
							<h3 className='dashboard__label'>FitGuardian</h3>
							<div className='dashboard__account-name'>Account</div>
							<div className='dashboard__menu-item'>
								<Link to='/menu'>Menu</Link>
							</div>
							<div className='dashboard__menu-item'>Recipes</div>
							<div className='dashboard__menu-item'>Statistics</div>
							<div className='dashboard__menu-item'>Settings</div>
						</div>
					</div>
					<div className='dashboard__container-to-items'></div>
				</div>
			</div>
		</div>
	);
}
