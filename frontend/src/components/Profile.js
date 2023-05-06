import React, {useEffect,useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import {Feed, Icon, Rating} from 'semantic-ui-react'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const [feedData, setFeedData] = useState([])
  const [fanSongs, setFanSongs] = useState([])
  const navigate = useNavigate()

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

  const getSongsFromFan = async () => {
    try{
      const result = await AuthService.getSongsForFeed(currentUser.userName)
      setFanSongs(result.data)
      console.log(result.data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getFeedData()
    getSongsFromFan()
  }, [])

  if(!currentUser) {
    return <Navigate to="/login" replace={true} />
  }

  const navigateToSong =async( title) => {
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
    <div style={{padding: '32px 48px', margin: '32'}}>
      <div style={{display: 'flex'}}>
        <Feed style={{flex:3}}>
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
        <div style={{flex: 1, padding: 32, backgroundColor: 'white', border: '1px solid #e3e3e3', borderRadius: 10}}>
          <h3 style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>Songs from your favorite artists</h3>
          {fanSongs.map(item => (
            <div style={{marginTop: 16}}>
              <p onClick={() => navigateToSong(item.title) }style={{fontFamily: 'poppins', color: '#2980b9', cursor: 'pointer'}}>{item.title}</p>
              <p style={{marginTop: -10}}>{`Release Date ${new Date(item.releaseDate).toLocaleDateString('en-GB')}`}</p>
              <p style={{marginTop: -10}}>{`Average rating ${Number(item.avg_rating).toFixed(1)/5.0}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
