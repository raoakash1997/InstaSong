const db = require('../db/main');

const getSongByName = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.song where title=?', [searchTerm])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

const rateSong = async(user, songID, numstars) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.ratesong where username=? and songID=?', [user, songID])
        if(result.length == 0)
        {
            const result = await db.getDBObject()
            .query('insert into music_db.ratesong(username, songID, stars, ratingDate) values (?,?,?,?)', [user, songID, numstars,new Date()])
        }
        else 
        {
            const result = await db.getDBObject()
            .query('update music_db.ratesong set stars = ?, ratingDate = ? where username=? AND songID=?', [numstars, new Date(), user,songID])
        }
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

const getRatingByUser = async(user, songID) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.ratesong where username=? and songID=?', [user, songID])
        if(result.length==0) return []
        else return [{rating: result[0].stars}]
    }catch(error){
        console.log(error)
    }
}
const getReviewsForSong = async( songID) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.reviewsong where songID=?', [songID])
        console.log(result)
        if(result.length==0) return []
        else return result
    }catch(error){
        console.log(error)
    }
}

const reviewSong = async(user, songID, reviewText) => {
    try{
        console.log('coming here')
        const result = await db.getDBObject()
        .query('select * from music_db.reviewsong where username=? and songID=?', [user, songID])
        console.log('check', result)
        if(result.length === 0)
        {
            const result = await db.getDBObject()
            .query('insert into music_db.reviewsong(username, songID, reviewText, reviewDate) values (?,?,?,?)', [user, songID, reviewText,new Date()])
        }
        else 
        {
            const result = await db.getDBObject()
            .query('update  music_db.reviewsong set reviewText = ?, reviewDate = ? where username=? AND songID=?', [reviewText, new Date(), user,songID])
        }
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}
module.exports = {getSongByName, rateSong, reviewSong, getRatingByUser, getReviewsForSong}