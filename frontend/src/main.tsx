import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";

import App from "./App.tsx"
import { store } from "./store";
import AuthProvider from "./providers/AuthProvider";

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
