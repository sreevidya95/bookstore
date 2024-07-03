import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserLogin from './userlogin';
import AdminLogin from './adminlogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/adminLogin/:cp" element={<AdminLogin/>}/>
    </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
