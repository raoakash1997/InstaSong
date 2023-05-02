import axios from "axios";

const API_URL = "http://localhost:3000/";

const register = (userName, 
  password, 
  firstName, 
  lastName,
  email, 
  profile) => {
  return axios.post(API_URL + "signup", {
    userName, 
    password, 
    firstName, 
    lastName,
    email, 
    profile
  });
};

const login = (userName, password) => {
  return axios
    .post(API_URL + "login", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getSongByName = async(searchTerm) => {
  console.log(searchTerm)
  const result = await axios.post(API_URL + "searchSong", {
      searchTerm: searchTerm
    })
   return result
}

const getAlbumByName = async(searchTerm) => {
  console.log(searchTerm)
  const result = await axios.post(API_URL + "searchAlbum", {
      searchTerm: searchTerm
    })
   return result
}

const getSongsByGenre = async(searchTerm) => {
  console.log(searchTerm)
  const result = await axios.post(API_URL + "searchGenre", {
      searchTerm: searchTerm
    })
   return result
}

const getSongsByArtist = async(searchTerm) => {
  console.log(searchTerm)
  const result = await axios.post(API_URL + "searchArtist", {
      searchTerm: searchTerm
    })
   return result
}

const getUserbyUsername = async(searchTerm) => {
  console.log(searchTerm)
  const result = await axios.post(API_URL + "searchUser", {
      searchTerm: searchTerm
    })
   return result
}

const followUser = async(user1, user2) => {
  const result = await axios.post(API_URL + "followUser", {
    user1,
    user2
  })
  return result
}
const sendFriendRequest = async(user1, user2) => {
  const result = await axios.post(API_URL + "sendFriendReq", {
    user1,
    user2
  })
  return result
}
const rateSong = async(userName, songID, numstars) => {
  const result = await axios.post(API_URL + "rateSong", {
    userName,
    songID,
    numstars
  })
  return result
}

const getSongRatingByUser = async(userName, songID) => {
  const result = await axios.post(API_URL + "getRatingByUser", {
    userName,
    songID,
  })
  return result
}

const getReviewsForSong = async(songID) => {
  try{
    const result = await axios.post(API_URL + "getReviewForSong", {
      songID,
    })
    if(result) return result
  }catch(error){
    console.log(error)
  }
  
}

const writeReviewForSong = async(userName, songID, reviewText) => {
  try{
    const result = await axios.post(API_URL + "reviewSong", {
      userName,
      songID,
      reviewText
    })
    if(result) return result
  }catch(error){
    console.log(error)
  }
  
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getSongByName,
  getSongsByGenre,
  getAlbumByName,
  getSongsByArtist,
  getUserbyUsername,
  followUser,
  sendFriendRequest, 
  rateSong,
  getSongRatingByUser,
  getReviewsForSong,
  writeReviewForSong
};

export default AuthService;
