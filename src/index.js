// import "./bootstrap-custom.css";
// import "./index.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
// import React from "react";
// import { createRoot } from "react-dom/client"; 
// import App from "./App";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { HashRouter as Router } from "react-router-dom";

// library.add(fas, far, fab);

// Get the container element for the root
// const container = document.getElementById("root");

// Create a root and render the App component into the root
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './Routes'; // Ensure the correct routes import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
