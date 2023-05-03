import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Button, Card, Message} from 'semantic-ui-react'
import AuthService from '../services/auth.service';

//Message page
//1. friend request 
//2. notification by been followed 
//3. friends' review or rating information 
//4. followings' reiview or rating informaiton 

const MessagePage =()=>{


    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [pendReq, setPendReq] = useState([]);
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

    // deal with approve button
    const handleApprove = async(username) => {
        try{
        const result = await AuthService.handleApproveRequest(currentUser.userName, username)
         //if(result.data.length===0) return 
        setToastMessage(`You have approved ${username}'s request`)
        PendReqByUser()
        }catch(error){
            setError(error.response.data)
        } 
    }

    // deal with decline button 
    const handleDecline = async(username) => {
        try{
        const result = await AuthService.handleDeclineRequest(currentUser.userName, username)
        //if(result.data.length===0) return 
        setToastMessage(`You have declined ${username}'s request`)
        PendReqByUser()
        }catch(error){
            setError(error.response.data)
        }
        
    }
    //write another function to call the function in authservice.js and use that in useEffect
    //make the cards using the map function like in Artist.js

    const PendReqByUser = async() =>{
        try{
            const result = await AuthService.getPendReqByUser(currentUser.userName)
            console.log(result.data)
            setPendReq(result.data)
            
        }catch(error){
            setError(error.response.data)
        }
    }
    useEffect(()=>{
        PendReqByUser()
        console.log(pendReq)
    },[])
    
    return(
        <div>
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
            {pendReq.map(item =>{
                return(
                <Card>
                    <Card.Content>
                        <Card.Header>{item.user1}</Card.Header>
                        <Card.Meta>{item.nickname}</Card.Meta>
                        <Card.Description>
                        {`${item.fname} ${item.lname} wants to add you as friend`}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='green' onClick={() => handleApprove(item.user1)} >
                            Approve
                        </Button>
                        <Button basic color='red' onClick={() => handleDecline(item.user1)}>
                            Decline
                        </Button>
                        </div>
                    </Card.Content>
                </Card>)
                            
            })    
            }
        </div>
    )          
}

export default MessagePage;