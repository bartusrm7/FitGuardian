import LogReg from "./LogReg";
import { useLogRegContext } from "./LogRegContext";

export default function ProtectedRoute({ children }) {
	const { authToken } = useLogRegContext();

	if (!authToken) {
		return <LogReg to='/' />;
	}
	return children;
}
