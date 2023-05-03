const db = require('../db/main');

const getUserbyUsername = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.user where username=?', [searchTerm])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}
const followUser = async(user1,user2) => {
    try{
        console.log(Date.now())
       
        const result = await db.getDBObject()
        .query('insert into follows(follower,follows,createdAt) values (?,?,?)', [user1,user2,new Date()])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}
const sendFriendReq = async(user1,user2) => {
    try{    
        console.log(Date.now())
        const result = await db.getDBObject()
        .query('insert into friend(user1,user2,acceptStatus,requestSentBy, createdAt) values (?,?,?,?,?)', [user1,user2,"Pending",user1,new Date()])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}
const getSongsfromfanartist = async(username) => {
    try{    
        console.log(Date.now())
        const result = await db.getDBObject()
        .query('select title,releaseDate,avg(stars) as average rating from userfanofartist natural join artist natural join artistperformssong natural join song', [user1,user2,"Pending",user1,new Date()])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}
const getFeedData = async(userName) => {
    try{
        const ratings = await db.getDBObject()
        .query(`select username,title,stars,ratingDate as createdDate, \"rating\" as type from ratesong natural join song where username in 
        (select follows as username from follows where follower = ?
        union 
        SELECT user1 as username FROM friend WHERE user2=? AND acceptStatus="Accepted"
        UNION 
        SELECT user2 as username FROM friend WHERE user1=? AND acceptStatus="Accepted" );`, [userName,userName,userName])
        const reviews = await db.getDBObject()
        .query(`select username,title,reviewText,reviewDate as createdDate, \"review\" as type from reviewsong natural join song where username in 
        (select follows as username from follows natural join song where follower = ?
        union 
        SELECT user1 as username FROM friend WHERE user2=? AND acceptStatus="Accepted"
        UNION 
        SELECT user2 as username FROM friend WHERE user1=? AND acceptStatus="Accepted" );`, [userName,userName,userName])
        const follows = await db.getDBObject()
        .query(`select follower as username, createdAt as createdDate, \"follows\" as type from follows where follows = ?;`,[userName])
        const friends = await db.getDBObject()
        .query(`select user2 as username, updatedAt as createdDate, \"friends\" as type from friend where requestSentBy=? AND acceptStatus = "Accepted";`, [userName])
        return ({reviews, ratings,follows,friends}) 
    }catch(e){
        console.log(e)
        throw(e)
    }
}

module.exports = {getUserbyUsername,followUser,sendFriendReq, getFeedData}