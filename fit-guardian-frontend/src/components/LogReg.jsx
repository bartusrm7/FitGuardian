import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LogReg() {
	const [opacityClass, setOpacityClass] = useState("hide-opacity");
	
	useEffect(() => {
		setOpacityClass("display-opacity");
	}, []);

	return (
		<div>
			<div className={`log-reg ${opacityClass}`}>
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
