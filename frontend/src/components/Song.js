import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import YouTube from 'react-youtube';

const Song = (props) => {
    const location = useLocation();
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
    const {title, songURL, releaseDate} = location.state.song
    useEffect(() => {
        console.log(songURL)
    }, [])
    return(
        <div>
            <h1>{title}</h1>
            <h4>{releaseDate}</h4>
            <YouTube videoId={getVideoId(songURL)} />
        </div>
    )
}

export default Song