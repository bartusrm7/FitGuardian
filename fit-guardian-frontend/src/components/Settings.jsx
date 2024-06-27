import Dashboard from "./Dashboard";

export default function Settings() {
	return (
		<div>
			<div className='settings'>
				<div className='settings__main-container'>
					<div className='settings__container'>
						<div className='settings__container-name'>
							<h3 className='settings__label'>Settings</h3>
						</div>
						<div className='settings__calories-container'></div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
