import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogReg from "./components/LogReg";
import Log from "./components/Log";
import Reg from "./components/Reg";
import Dashboard from "./components/Dashboard";
import LogRegProvider from "./components/LogRegContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	return (
		<Router>
			<LogRegProvider>
				<Routes>
					<Route path='/' element={<LogReg />} />
					<Route path='/log' element={<Log />} />
					<Route path='/reg' element={<Reg />} />
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</LogRegProvider>
		</Router>
	);
}
