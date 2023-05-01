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
module.exports = {getUserbyUsername,followUser,sendFriendReq}