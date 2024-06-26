import LogReg from "./LogReg";

const isAuthenticated = () => {
	return localStorage.getItem("accessToken");
};

export default function ProtectedRoute({ children }) {
	if (!isAuthenticated()) {
		return <LogReg to='/' />;
	}
	return children;
}
