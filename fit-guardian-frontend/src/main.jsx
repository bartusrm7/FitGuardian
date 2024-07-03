import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/log-reg.scss";
import "./sass/log-reg-component.scss";
import "./sass/firstlog-onboarding.scss";
import "./sass/dashboard.scss";
import "./sass/menu.scss";
import "./sass/macronutrients.scss";
import "./sass/settings.scss";
import "./sass/statistics.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
