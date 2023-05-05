import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import YouTube from 'react-youtube';
import {format} from 'date-fns'
import {Item, Rating,Comment, Button, Modal,Message} from 'semantic-ui-react'
import AuthService from '../services/auth.service';
import ReviewPanel from './ReviewPanel';

const Song = (props) => {
    const location = useLocation();
    const [rating, setRating] = useState(0)
    const [openModal, setOpen] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [toastMessage, setToastMessage] = useState("")
    const [error, setError] = useState("")
    useEffect(() => {
      if(toastMessage !== ""){
          setTimeout(() => {
              setToastMessage("")
          },2000)
      }
      
  }, [toastMessage])

  useEffect(() => {
      if(error !== ""){
          setTimeout(() => {
              setError("")
          },2000)
      }
      
  }, [error])
    const getVideoId = (url) => {
        // Extract the video ID from the URL using a regular expression
        const match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
        
        // If a match is found, return the video ID
        if (match) {
          return match[1];
        } else {
          // If no match is found, return null
          return null;
        }
      }
    const {songID, title, songURL, releaseDate} = location.state.song
    
      const getSongRating = async() => {
        try{
          const user = JSON.parse(localStorage.getItem("user"))
          const result = await AuthService.getSongRatingByUser(user.userName, songID)
          if(result.data?.length !== 0) {
            setRating(result.data[0].rating)
          }
        }catch(error){
          console.log(error)
        }
      }

      const getPlayLists = async() => {
        try{
          const user = JSON.parse(localStorage.getItem("user"))
          const result = await AuthService.getPlaylistsByUser(user.userName)
          setPlaylists(result.data)
          console.log(result.data)
        }catch(error){
          console.log(error)
        }
      }
    

    useEffect(() => {
        getSongRating()
        getPlayLists()
    }, [location.state.song])

    const handleRatingChange = async(e, { rating }) => {
      try{
        const user = JSON.parse(localStorage.getItem("user"))
        const result = await AuthService.rateSong(user.userName, songID, rating )
        if(result){
          setRating(rating)
        }
      }catch(error){
        console.log(error)
      }
    }

    const openPlaylistModal = () => {
      setOpen(true)
    }

    const addSongToPlaylist = async(pname) => {
      try{
        const user = JSON.parse(localStorage.getItem("user"))
        const result = await AuthService.addSongToPlaylist(user.userName, pname, songID)
        if(result)
        { 
          setOpen(false)
          setToastMessage(`song added to playlist ${pname}`)

        }
      }catch(error){
        setOpen(false)
        setError(error.response.data)
      }
    }

    return(
      <>
      {toastMessage!= "" && <Message
                positive
                style={{width: '50%', position: 'fixed', transform: `translate(50%)`, top: '90vh', backgroundColor: '#2ecc71', opacity: 0.7}}
                header='Success'
                content={toastMessage}
            />}
            {error !== "" && <Message
                positive
                style={{width: '50%', position: 'fixed', transform: `translate(50%)`, top: '90vh', backgroundColor: '#e74c3c', opacity: 0.7}}
                header='Error'
                content={error}
            />}
        <div style={{padding: 32, display: 'flex', justifyContent: 'space-evenly'}}>
            
        <Modal
            centered={false}
            open={openModal}
            onClose={() => setOpen(false)}
          >
            <Modal.Header>Choose Playlists</Modal.Header>
            <Modal.Content style={{overflow: 'scroll'}}>
              <div style={{height: '20vh', overflow: 'scroll'}}>
              {playlists.map(item => {
                return(
                  <div style={{padding: '8px 16px', borderBottom: '1px solid #e5e5e5', cursor: 'pointer'}} onClick={() => addSongToPlaylist(item.pname)}>
                    <p>{item.pname}</p>
                  </div>
                )
              })}
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Modal.Actions>
          </Modal>

          <Item>
            <Item.Content>
              <Item.Header as='a' style={{fontFamily: 'poppins', fontSize: '2rem'}}>{title}</Item.Header>
              <Item.Meta>{new Date(releaseDate).toLocaleDateString('en-GB')}</Item.Meta>
              <Item.Description>
                <YouTube videoId={getVideoId(songURL)} />
              </Item.Description>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h4 style={{fontFamily: 'poppins', fontWeight: 'bold'}}>Rate this song</h4>
                  <Rating maxRating={5} onRate={handleRatingChange} rating={rating}/>
                </div>
                <Button content='Add to Playlist' icon='plus' labelPosition='right' primary onClick={openPlaylistModal} />
              </div>
            </Item.Content>
          
          </Item>
          <ReviewPanel songID={songID} />
        </div>
        </>
    )
}

export default Song