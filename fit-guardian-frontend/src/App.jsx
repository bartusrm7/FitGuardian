import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogReg from "./components/LogReg";
import Log from "./components/Log";
import Reg from "./components/Reg";
import FirstLogOnboarding from "./components/FirstLogOnboarding";
import Dashboard from "./components/Dashboard";
import LogRegProvider from "./components/LogRegContext";
import UserProvider from "./components/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./components/Menu";
import Macronutrients from "./components/Macronutrients";
import Recipes from "./components/Recipes";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";

export default function App() {
	return (
		<Router>
			<LogRegProvider>
				<UserProvider>
					<Routes>
						<Route path='/' element={<LogReg />} />
						<Route path='/log' element={<Log />} />
						<Route path='/reg' element={<Reg />} />
						<Route
							path='/firstlog-onboarding'
							element={
								<ProtectedRoute>
									<FirstLogOnboarding />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/dashboard'
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/menu'
							element={
								<ProtectedRoute>
									<Menu />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/macronutrients'
							element={
								<ProtectedRoute>
									<Macronutrients />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/recipes'
							element={
								<ProtectedRoute>
									<Recipes />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/statistics'
							element={
								<ProtectedRoute>
									<Statistics />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/settings'
							element={
								<ProtectedRoute>
									<Settings />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</UserProvider>
			</LogRegProvider>
		</Router>
	);
}
