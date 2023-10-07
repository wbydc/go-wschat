import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Page404 from "./pages/Page404";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./utils/RequireAuth";

function App() {
	return (
		<>
			<Router>
				<Header />
				<div className="container mx-auto mt-auto lg:w-2/3 p-5 text-justify lg:text-left gap-4">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
						<Route path="*" element={<RequireAuth><Page404 /></RequireAuth>} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</>
	);
}

export default App;
