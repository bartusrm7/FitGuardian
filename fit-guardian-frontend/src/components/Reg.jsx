import { Link } from "react-router-dom";

export default function Reg() {
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
								<input type='text' placeholder='Account name' />
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>mail</span>
								<input type='email' placeholder='Email' />
							</div>
							<div className='reg__input-item-container'>
								<span className='material-symbols-outlined'>lock</span>
								<input type='password' placeholder='Password' />
							</div>
						</div>
						<button className='reg__log-reg-accept-btn'>REGISTER</button>
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
