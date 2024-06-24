import { Link } from "react-router-dom";

export default function LogReg() {
	return (
		<div>
			<div className='log-reg'>
				<div className='log-reg__main-container'>
					<Link to='/log'>
						<div className='log-reg__container'>LOGIN</div>
					</Link>
					<Link to='/reg'>
					
						<div className='log-reg__container'>REGISTER</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
