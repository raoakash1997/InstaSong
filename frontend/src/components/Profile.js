import React, {useEffect,useState} from "react";
import { Navigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import {Feed, Icon, Rating} from 'semantic-ui-react'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const [feedData, setFeedData] = useState([])

  const getFeedData = async () => {
    try{
      const result = await AuthService.getFeedData(currentUser.userName)
      console.log(result.data)
      let feed = [...result.data.reviews, ...result.data.ratings,...result.data.friends,...result.data.follows]
      feed = feed.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate))
      setFeedData(feed)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getFeedData()
  }, [])

  if(!currentUser) {
    return <Navigate to="/login" replace={true} />
  }


  return (
    <div style={{padding: '32px 48px', margin: '32'}}>
      <Feed>

      {feedData.map(item => {
        return(
          <Feed.Event>
            <Feed.Label>
              <Icon name="user circle" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{item.username}</Feed.User> {(item.type === 'rating' || item.type === 'review') && `added a ${item.type} for ${item.title}`} {item.type ==='friend' && `accepted your friend request`}{item.type === 'follows' && `is following you!`}
                <Feed.Date>{new Date(item.createdDate).toLocaleDateString('en-GB')}</Feed.Date>
              </Feed.Summary>
              {item.type === 'rating' && <Rating maxRating={5}  rating={item.stars}/>}

              {item.type === 'review' && <Feed.Extra text>
                {item.reviewText}
              </Feed.Extra>}
            </Feed.Content>
          </Feed.Event>
        )
      })}
        
      </Feed>
    </div>
  );
};

export default Profile;
