import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingScreen from './components/landingScreen';
import Login from './components/loginpage';
import AddPage from './components/Register';
import Home from './Home';
import UserProfile from './components/userProfile';
import AdminLogin from './components/adminLogin';
import AdminPage from './components/adminPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={LandingScreen}/>
          <Route path="/Login" Component={Login}/>
          <Route path='/Register' Component={AddPage}/>
          <Route path="/home" Component={Home} />
          <Route path="/UserProfile" Component={UserProfile} />
          <Route path="/adminLogin" Component={AdminLogin}/>
          <Route path="/adminPage" Component={AdminPage}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

