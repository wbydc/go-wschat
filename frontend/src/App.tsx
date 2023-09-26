import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useStore } from "./store";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Page404 from "./pages/Page404";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
					<Footer />
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
