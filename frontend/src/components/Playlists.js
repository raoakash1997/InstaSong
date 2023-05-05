import {useEffect, useState} from 'react'
import AuthService from '../services/auth.service'
import { Button, Modal, Form, Card } from 'semantic-ui-react'

const Playlists = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = useState(false)
    const [playlistName, setName] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [openPlaylists, setOpenPlaylists] = useState([])

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

    const togglePlaylist = pname => {
        if(openPlaylists.find(el => el === pname)){
            console.log('in here', openPlaylists)
            let tmp = [...openPlaylists]
            tmp = tmp.filter(item => item !== pname)
            console.log(tmp)
            setOpenPlaylists(tmp)
            return
        }
        setOpenPlaylists([...openPlaylists, pname])
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
            {playlists && playlists.map(item => {
                return(
                    <Card
                        
                    >
                       <Card.Header>{item.pname}</Card.Header>
                       <Card.Meta>{`Created on ${new Date(item.createdDate).toLocaleDateString('en-GB')}`}</Card.Meta>
                       <Card.Description>{`Number of songs ${item.numsongs}`}</Card.Description>
                       <div onClick={() => togglePlaylist(item.pname)}>
                            Songs in playlist
                       </div>
                       {openPlaylists.find(element => element === item.pname) && 
                       <div>
                            <ul>
                                <li>song 1</li>
                            </ul>
                       </div>
                       }
                    </Card>
                )
            })}
            </div>
        </div>
    )
}

export default Playlists