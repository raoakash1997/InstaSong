import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service"
import {Grid, Card} from 'semantic-ui-react'

const Playlist = () => {
    const [songs, setSongs] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    const getSongs = async() => {
        try{    
            const user = JSON.parse(localStorage.getItem("user"))
            const result = await AuthService.getSongsInPlaylist(user.userName, location.state.playlist)
            console.log(result)
            setSongs(result.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getSongs()
    }, [location.state.playlist])

    const navigateToSong = async(title) => {
        try{
            const result = await AuthService.getSongByName(title)
            navigate("/song", {
                state: {
                    song: result.data[0]
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Grid relaxed columns={4} style={{padding: 32}}>

        {songs && songs.map(item => {
            return(
                <Grid.Column>
                    <Card
                        header={item.title}
                        meta={`Release Date ${new Date(item.releaseDate).toLocaleDateString('en-GB')}`}
                        description={`${Number(item.avg_rating).toFixed(1)} / 5.0`}
                        onClick={() => navigateToSong(item.title)}
                        style={{cursor: 'pointer'}}
                    />
                </Grid.Column>
            )
        })}
        </Grid>
    )
}

export default Playlist