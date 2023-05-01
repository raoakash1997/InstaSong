const express = require("express");
const cors = require("cors");
const db = require("./db/main")
const AuthService = require('./service/auth');
const AuthMiddleWare = require('./middleware/auth');
const RecipeService = require('./service/recipe');
const errorHandler = require("./middleware/errorHandler");
const morgan = require('morgan');
const SongService = require('./service/song')
const GenreService = require('./service/genre')
const ArtistService = require('./service/artist')
const AlbumService = require('./service/album')
const UserService = require('./service/user')
require("dotenv").config();

const app = express();

app.use(morgan('common'));


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res, next) => {
  try {
    const {
      userName, password, firstName, lastName, email, profile
    } = req.body;
    const user = await AuthService.registerUser(userName, password, firstName, lastName, email, profile);
    res.json(user)
  } catch (e) {
    console.error('error here', e);
    next(e);
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const {
      userName, password
    } = req.body;
    const user = await AuthService.login(userName, password);
    res.json(user)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.post('/searchSong', async (req, res) => {
  try {
    const {
      searchTerm
    } = req.body;
    const song = await SongService.getSongByName(searchTerm);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(song)
  } catch (e) {
    console.error(e);
  }
})

app.post('/searchGenre', async (req, res) => {
  try {
    const {
      searchTerm
    } = req.body;
    const song = await GenreService.getSongsByGenre(searchTerm);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(song)
  } catch (e) {
    console.error(e);
  }
})
app.post('/searchArtist', async (req, res) => {
  try {
    const {
      searchTerm
    } = req.body;
    const song = await ArtistService.getSongsByArtist(searchTerm);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(song)
  } catch (e) {
    console.error(e);
  }
})

app.post('/searchAlbum', async (req, res) => {
  try {
    const {
      searchTerm
    } = req.body;
    const song = await AlbumService.getSongsbyAlbum(searchTerm);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(song)
  } catch (e) {
    console.error(e);
  }
})
app.post('/searchUser', async (req, res) => {
  try {
    const {
      searchTerm
    } = req.body;
    const user = await UserService.getUserbyUsername(searchTerm);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(user)
  } catch (e) {
    console.error(e);
  }
})
app.post('/followUser', async (req, res) => {
  try {
    const {
      user1,
      user2
    } = req.body;
    const user = await UserService.followUser(user1,user2);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(user)
  } catch (e) {
    // console.error(e);
    if(e.code === 'ER_DUP_ENTRY') res.status(409).send('already exists')
    else res.status(500).send("internal server error")
  }
})
app.post('/sendFriendReq', async (req, res) => {
  try {
    const {
      user1,
      user2
    } = req.body;
    const user = await UserService.sendFriendReq(user1,user2);
    // if(song.length === 0) res.status(404).send("song not found")
    res.send(user)
  } catch (e) { if(e.code === 'ER_DUP_ENTRY') res.status(409).send('already exists')
  else res.status(500).send("internal server error")

  }
})
app.use(AuthMiddleWare.loginAuth);

app.get('/user', async (req,res, next) => {
  try {
    if(!req.user) {
      throw new USER_NOT_FOUND();
    }
    res.json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.post('/recipe', async (req, res, next) => {
  try {
    const {
      title, numServings
    } = req.body;
    const postedBy = req.user.userName;
    const postedRecipe = await RecipeService.insertRecipe(title, numServings, postedBy);
    res.json(postedRecipe);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//Akash

app.use(errorHandler);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  db.initDBConnection()
  console.log(`Server is running on port ${PORT}.`);
});