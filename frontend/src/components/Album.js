import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';
import {Card, Rating} from 'semantic-ui-react'

const Album = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const [ratingThresh, setThresh]  = useState(0)
    const [filterAlbums, setFilteredAlbums] = useState([])
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
        setFilteredAlbums(location.state.songs)
    }, [])

    const navigateToSong = idx => {
        navigate("/song", {
            state: {
              song: location.state.songs[idx]
            }
        })
    }

    const handleThreshChange = (e, { rating }) => {
        setThresh(rating)
        let albums = location.state.songs.filter(item => item.avg_rating >= rating)
        setFilteredAlbums(albums)
    }

    return(
        <div style={{padding: 32, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
                <p style={{fontFamily: 'poppins', marginRight: 16}}>Filter by Average Rating</p>
                <Rating rating={ratingThresh} maxRating={5} onRate={handleThreshChange} />
            </div>
            <h1>{location.state.albumName}</h1>
             {
                filterAlbums.map((song, idx) => (
                    <Card onClick={() => navigateToSong(idx)} style={{cursor: 'pointer'}}>
                        <Card.Content>
                            <Card.Header>{song.title}</Card.Header>
                            <Card.Meta>{new Date(song.releaseDate).toLocaleDateString('en-GB')}</Card.Meta>
                            <Card.Content>
                                <p style={{fontFamily: 'poppins'}}>{`${Number(song.avg_rating).toFixed(1)} / 5.0`}</p>
                            </Card.Content>
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