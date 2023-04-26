import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { Input, Menu } from 'semantic-ui-react'

import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    //apiCallToSearchSuggestions(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }
  return (
    <div>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          FatEar
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
         
            <input type="text" placeholder="Search...." style={{padding: '0 16px', borderRadius: 5}}/>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav> */}
      <Menu secondary color={'purple'} inverted>
        <Menu.Item
          name='home'
          // active={activeItem === 'home'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          // active={activeItem === 'messages'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' value={searchTerm} onChange={handleSearchTermChange}/>
          </Menu.Item>
          <Menu.Item
            name='logout'
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
