import { useState } from "react";

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
							<div className='dashboard__menu-items'>Menu</div>
							<div className='dashboard__menu-items'>Recipes</div>
							<div className='dashboard__menu-items'>Statistics</div>
							<div className='dashboard__menu-items'>Settings</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
