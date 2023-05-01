import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';
import {Card} from 'semantic-ui-react'

const Album = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    // const getVideoId = (url) => {
    //     // Extract the video ID from the URL using a regular expression
    //     const match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
        
    //     // If a match is found, return the video ID
    //     if (match) {
    //       return match[1];
    //     } else {
    //       // If no match is found, return null
    //       return null;
    //     }
    //   }
    // const {title, songURL, releaseDate} = location.state.song
    useEffect(() => {
        console.log(location.state.songs)
    }, [])

    const navigateToSong = idx => {
        navigate("/song", {
            state: {
              song: location.state.songs[idx]
            }
        })
    }

    return(
        <div style={{padding: 32, display: 'flex', flexDirection: 'column'}}>
            <h1>{location.state.albumName}</h1>
             {
                location.state.songs.map((song, idx) => (
                    <Card onClick={() => navigateToSong(idx)} style={{cursor: 'pointer'}}>
                        <Card.Content>
                            <Card.Header>{song.title}</Card.Header>
                            <Card.Meta>{song.releaseDate}</Card.Meta>
                            {/* <Card.Description>
                                Matthew is a pianist living in Nashville.
                            </Card.Description> */}
                        </Card.Content>
                    </Card>
                ))
             
             }
        </div>
    )
}

export default Album