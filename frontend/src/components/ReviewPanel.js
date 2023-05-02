import { Comment, Header, Button, Form } from "semantic-ui-react"
import {useEffect, useState} from 'react'
import AuthService from "../services/auth.service"
import { add } from "date-fns"

const ReviewPanel = ({songID}) => {

    const [reviews, setReviews] = useState([])
    const [userReview, setUserReview] = useState("")

    const getReviews = async() => {
        try{
            const result = await AuthService.getReviewsForSong(songID)
            console.log(result.data)
            if(result.data.length !== 0)
                setReviews(result.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getReviews()
    }, [songID])

    const handleReviewChange = event => {
        setUserReview(event.target.value)
    }

    const addReview = async() => {
        try{
            const user = JSON.parse(localStorage.getItem("user"))
            const result = await AuthService.writeReviewForSong(user.userName, songID, userReview)
            await getReviews()
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div style={{backgroundColor: 'white', padding: 32, borderRadius: 5, boxShadow:` 23px 23px 46px #afafaf,
        -23px -23px 46px #ffffff`, minWidth: '30vw', display: 'flex', flexDirection: "column", alignItems: 'space-between', height: '70vh'}}>
            <div style={{flex: 5, overflow: 'scroll', maxHeight: '75%'}}>
            <Comment.Group>
                <Header as='h3' dividing>
                Reviews
                </Header>

                {reviews.map(review => {
                    return (<Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>{review.username}</Comment.Author>
                            <Comment.Metadata>
                            <div>{new Date(review.reviewDate).toLocaleDateString('en-GB')}</div>
                            </Comment.Metadata>
                            <Comment.Text>{review.reviewText}</Comment.Text>
                            
                        </Comment.Content>
                    </Comment>)
                }
                )}
                
            </Comment.Group>
            </div>
            <Form reply style={{flex: 1, marginTop: 16}}>
                <Form.Input placeholder={'write a review...'} value={userReview} onChange={handleReviewChange}/>
                    <Button content='Add Review' labelPosition='left' icon='edit' primary onClick={addReview} disabled={userReview.length === 0}/>
            </Form>
        </div>
    )
}

export default ReviewPanel