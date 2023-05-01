import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Song from "./components/Song";
import Genre from './components/Genre';
import Album from "./components/Album";
import Artist from "./components/Artist";
import Message from "./components/Message";
import { Input, Menu, Modal, Button, Dropdown } from 'semantic-ui-react'

import EventBus from "./common/EventBus";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("")
  const [notFoundOpen, SetNotFound] = useState(false)
  const [searchFor, setSearchFor] = useState("song")

  const options = [
    { key: 'song', text: 'Song', value: 'song' },
    { key: 'genre', text: 'Genre', value: 'genre' },
    { key: 'artist', text: 'Artist', value: 'artist' },
  ]

  const navigate = useNavigate()

  useEffect(() => {
    //apiCallToSearchSuggestions(searchTerm)
  }, [searchTerm])

  const handleSongSearch = async() => {
    try{
      console.log(searchTerm)
      console.log(searchFor)
      if(searchTerm === '') return
      if(searchFor === 'song') {
        const result = await AuthService.getSongByName(searchTerm)
      
        if(result.data.length===0) SetNotFound(true)
        else{
          navigate("/song", {
            state: {
              song: result.data[0]
            }
          })
        }
      }else if(searchFor === 'artist'){
        const result = await AuthService.getSongsByArtist(searchTerm)
      
        if(result.data.length===0) SetNotFound(true)
        else{
          navigate("/artist", {
            state: {
              songs: result.data,
              artist: searchTerm
            }
          })
        }
      }else if(searchFor === 'genre'){
        console.log('in here')
        const result = await AuthService.getSongsByGenre(searchTerm)
      
        if(result.data.length===0) SetNotFound(true)
        else{
          console.log(result)
          navigate("/genre", {
            state: {
              songs: result.data,
              type: searchTerm
            }
          })
        }
      }
    }catch(err){
      console.log('error', err.code)
    }
    
  }

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



  const handleDropChange = (e, {value}) => {
    setSearchFor(value)
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
      {currentUser ? (
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
        >
          <Link to={"/Message"} className="nav-link">
            {'Message'}
          </Link>
        </Menu.Item>
        <Menu.Item
          name='friends'
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
          <Input
            label={<Dropdown defaultValue='song' options={options} onChange={handleDropChange}/>}
            labelPosition='right'
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyPress={(e) => {
              console.log(e)
              if(e.charCode === 13) handleSongSearch()
            }}
          />          
          </Menu.Item>
          <Menu.Item
            name='logout'
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
            onClick={logOut}
          />
        </Menu.Menu>
      </Menu>
      ) : <Menu secondary color={'purple'} inverted>
                  <Menu.Item
          name='register'
          
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        >

          <Link to={"/register"} className="nav-link">
            {'Register'}
          </Link>
        </Menu.Item>
                <Menu.Item
          name='login'
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        >
          <Link to={"/login"} className="nav-link">
            {'Login'}
          </Link>
          </Menu.Item>
      </Menu>}
  

      <Modal
      centered={false}
      open={notFoundOpen}
      onClose={() => SetNotFound(false)}
      onOpen={() => SetNotFound(true)}
    >
      <Modal.Header>Search Results</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          No song found        
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => SetNotFound(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
      {/* <div className="container mt-3"> */}
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/song" element={<Song /> } />
          <Route path="/album" element={<Album /> } />
          <Route path="/genre" element={<Genre /> } />
          <Route path="/artist" element={<Artist /> } />
          <Route path="/message" element={<Message />}/>
        </Routes>
      {/* </div> */}

    </div>
  );
};

export default App;
