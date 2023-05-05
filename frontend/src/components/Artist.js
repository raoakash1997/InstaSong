import { useEffect,useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';
import {Card,Message,Rating} from 'semantic-ui-react'
import AuthService from '../services/auth.service';

const Artist = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const [ratingThresh, setThresh]  = useState(0)
    const [filterSongs, setFilteredSongs] = useState([])

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
        setFilteredSongs(location.state.songs)
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
        setFilteredSongs(albums)
    }
 
    // handle Fan click button 
    
    //console.log('check here')
    let artistID = location.state.songs[0].artistID
    const handleFanClick = async() => {
    try{
        //let artistID = location.state.songs[0].artistID
        console.log(artistID)
        const user = JSON.parse(localStorage.getItem("user"))
        const result = await AuthService.handleFanClickService(user.userName,artistID )
         //if(result.data.length===0) return 
        console.log(result)
        setToastMessage(`Congratulation, You become fan of ${artistID}`)
        }catch(error){
            setError(error.response.data)
        } 
    }

    return(
        <div style={{padding: 32, display: 'flex', flexDirection: 'column'}}>
            {toastMessage!== "" && <Message
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
            <div style={{display: 'flex'}}>
                <p style={{fontFamily: 'poppins', marginRight: 16}}>Filter by Average Rating</p>
            <Rating rating={ratingThresh} maxRating={5} onRate={handleThreshChange} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <h1>{location.state.artist}</h1>
                <button onClick={handleFanClick}>Become a Fan</button>
            </div>
            {/*<h1>{location.state.artist}</h1>*/}
             {
                filterSongs.map((song, idx) => (
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

export default Artist