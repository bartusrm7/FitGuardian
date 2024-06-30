import Dashboard from "./Dashboard";

export default function Recipes() {
	return (
		<div>
			<div className='recipes'>
				<div className='recipes__main-container'>
					<div className='recipes__container'>
						<div className='recipes__container-name'>
							<h3 className='recipes__label'>Recipes</h3>
						</div>
						<div className='recipes__middle-container'>
							<div className='recipes__input-container'>
								<input className='recipes__input-recipes' type='text' />
								<button className='recipes__find-recipes-btn'>FIND RECIPES</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
