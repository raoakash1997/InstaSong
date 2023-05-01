import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

import {Card} from 'semantic-ui-react'
import {Button, Message} from 'semantic-ui-react'
import AuthService from '../services/auth.service';


const SearchUser = (props) => {
    const location = useLocation();
    console.log(location.state)
    const {username, fname, lname,nickname} = location.state.user[0]
    const [toastMessage, setToastMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if(toastMessage !== ""){
            setTimeout(() => {
                setToastMessage("")
            },2000)
        }
        
    }, [setToastMessage])

    useEffect(() => {
        if(error !== ""){
            setTimeout(() => {
                setError("")
            },2000)
        }
        
    }, [error])

    const handleFollow = async() => {
        try{
        const user = JSON.parse(localStorage.getItem("user"))
        const result = await AuthService.followUser(user.userName, username)
        // if(result.data.length===0) return 
        setToastMessage(`Now following ${username}`)
        }catch(error){
            setError(error.response.data)
        }
        
    }

    const sendFriendRequest = async() => {
        try{
        const user = JSON.parse(localStorage.getItem("user"))
        const result = await AuthService.sendFriendRequest(user.userName, username)
        // if(result.data.length===0) return 
        setToastMessage(`Sent friend Request to ${username}`)
        }catch(error){
            setError(error.response.data)
        }
        
    }

    return(
        <div>
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
             <Card>
                <Card.Content>
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{nickname}</Card.Meta>
                    <Card.Description>
                    {`Hi this is ${fname} ${lname}`}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='pink' onClick={handleFollow}>
                        Follow
                    </Button>
                    <Button basic color='pink' onClick={sendFriendRequest}>
                        Friend
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default SearchUser