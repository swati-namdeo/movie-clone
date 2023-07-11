import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <>
        <Header />
        <App />
        <Footer />
      </>
    </HashRouter>
  </React.StrictMode>
);
