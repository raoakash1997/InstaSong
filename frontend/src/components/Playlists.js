import {useEffect, useState} from 'react'
import AuthService from '../services/auth.service'
import { Button, Modal, Form, Card, Grid } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const Playlists = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = useState(false)
    const [playlistName, setName] = useState('')
    const [playlists, setPlaylists] = useState([])
    const navigate = useNavigate()

    const getPlayLists = async() => {
        try{
            const result = await AuthService.getPlaylistsByUser(user.userName)
            setPlaylists(result.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getPlayLists()
    }, [])

    const createPlaylist = async() => {
        try{
            const result = await AuthService.createPlaylist(user.userName, playlistName)
            if(result){
                console.log(result.data)
                await getPlayLists()
            }
        }catch(error){
            console.log(error)
        }finally{
            setOpen(false)
        }
    }

    const openNameModal = () => {
        setOpen(true)
    }

    const navigateToPlaylist = (pname) => {
        navigate("/playlist", {
            state: {
              playlist: pname
            }
        })
    }

    return(
        <div style={{margin: 32}}> 
            <Modal
                centered={false}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setName("")
                }}
                >
                <Modal.Header>Create Playlist</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Field>
                    <label>Playlist Name</label>
                    <input placeholder='Enter playlist name' value={playlistName} onChange = {(e) => setName(e.target.value)}/>
                    </Form.Field>
                    <Button type='submit' primary onClick={createPlaylist}>Submit</Button>
                </Form>
                </Modal.Content>
                </Modal>
            <Button onClick={openNameModal} primary>Create Playlist</Button>
            <div style={{marginTop: 32}}>
            <Grid relaxed columns={4}>

            {playlists && playlists.map(item => {
                return(
                    <Grid.Column>
                        <Card
                            header={item.pname}
                            meta={`Created on ${new Date(item.createdDate).toLocaleDateString('en-GB')}`}
                            description={`Number of songs ${item.numsongs}`}
                            onClick={() => navigateToPlaylist(item.pname)}
                            style={{cursor: 'pointer'}}
                        />
                    </Grid.Column>
                )
            })}
            </Grid>
            </div>
        </div>
    )
}

export default Playlists