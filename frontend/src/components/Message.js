import React from 'react'
import { Button, Card} from 'semantic-ui-react'

//Message page
//1. friend request 
//2. notification by been followed 
//3. friends' review or rating information 
//4. followings' reiview or rating informaiton 

const Message = () => {

    const {user2, nickname, acceptStatus} = location.state.friend

    if (acceptStatus === 'Pending') {

        return(
            <Card>
                <Card.Content>
                    <Card.Header> {user2} </Card.Header>
                    <Card.Meta>New User</Card.Meta>
                    <Card.Description> {nickname} wants to add you as friend
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                    Approve
                    </Button>
                    <Button basic color='red'>
                    Decline
                    </Button>
                </div>
                </Card.Content>
            </Card>
        )
    }
    return null; 


    

}
export default Message