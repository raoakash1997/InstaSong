const db = require('../db/main');

// get the acceptStatus in table friend 
const getFriendStatus = async (user) => {
  try {
    //select user2(sent friend request to user1)
    //then get all the information from 
    const friendStatus = await db.getDBObject().query(
      `SELECT friend.user2, friend.acceptStatus, user.nickname
       FROM music_db.friend
       INNER JOIN music_db.user ON friend.user2=user.username
       WHERE friend.user1=?`,
      [user]
    );
    return friendStatus;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getFriendStatus };
