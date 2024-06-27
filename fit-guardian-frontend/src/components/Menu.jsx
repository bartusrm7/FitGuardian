import Dashboard from "./Dashboard";

export default function Menu() {
	return (
		<div>
			<div className='menu'>
				<div className='menu__main-container'>
					<div className='menu__container'>
						<div className='menu__container-name'>
							<h3 className='menu__label'>Menu</h3>
						</div>
						<div className='menu__middle-container'>
							<div className='menu__input-container'>
								<input className='menu__input-food' type='text' />
								<button className='menu__add-food-btn'>ADD FOOD</button>
							</div>
							<div className='menu__food-main-container small-view'>
								<div className='menu__food-main-type'>N</div>
								<div className='menu__food-main-type'>C</div>
								<div className='menu__food-main-type'>P</div>
								<div className='menu__food-main-type'>C</div>
								<div className='menu__food-main-type'>F</div>
							</div>
							<div className='menu__food-main-container big-view'>
								<div className='menu__food-main-type'>Name</div>
								<div className='menu__food-main-type'>Calories</div>
								<div className='menu__food-main-type'>Proteins</div>
								<div className='menu__food-main-type'>Carbs</div>
								<div className='menu__food-main-type'>Fats</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dashboard />
		</div>
	);
}
{
}
