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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getSongByName,
  getSongsByGenre,
  getAlbumByName,
  getSongsByArtist
};

export default AuthService;
