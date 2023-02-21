import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import './Base_config/Root_axios';
import axios from 'axios'
const root = ReactDOM.createRoot(document.getElementById('root'));

// axios.defaults.headers.common['Authorization'] ="Bearer "+sessionStorage.getItem("token") ?? ''

root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
