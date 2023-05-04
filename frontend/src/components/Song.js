import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import YouTube from 'react-youtube';
import {format} from 'date-fns'
import {Item, Rating,Comment} from 'semantic-ui-react'
import AuthService from '../services/auth.service';
import ReviewPanel from './ReviewPanel';

const Song = (props) => {
    const location = useLocation();
    const [rating, setRating] = useState(0)
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

    useEffect(() => {
        getSongRating()
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
    return(
        <div style={{padding: 32, display: 'flex', justifyContent: 'space-evenly'}}>
          <Item>
            <Item.Content>
              <Item.Header as='a' style={{fontFamily: 'poppins', fontSize: '2rem'}}>{title}</Item.Header>
              <Item.Meta>{new Date(releaseDate).toLocaleDateString('en-GB')}</Item.Meta>
              <Item.Description>
                <YouTube videoId={getVideoId(songURL)} />
              </Item.Description>
              <h4 style={{fontFamily: 'poppins', fontWeight: 'bold'}}>Rate this song</h4>
              <Rating maxRating={5} onRate={handleRatingChange} rating={rating}/>
            </Item.Content>
          
          </Item>
          <ReviewPanel songID={songID} />
        </div>
    )
}

export default Song