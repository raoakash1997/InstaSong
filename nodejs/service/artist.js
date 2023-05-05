const db = require('../db/main');

const getSongsByArtist = async(searchTerm) => {
    try{
        const name = searchTerm.split(" ")

        const result = await db.getDBObject().query('select artistID,title,releaseDate,avg(stars) as avg_rating, songURL from music_db.artist natural join artistperformssong natural join song natural join ratesong where fname=? AND lname=? group by artistID,songID', [name[0], name[1]])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

//become the fan of this artist
const becomeFanOfArtist = async(username, artistID ) =>{
    try{
        const result = await db.getDBObject()
        .query('insert into userFanOfArtist(username, artistID) values (?,?)', [username, artistID])
        return result
    }catch(e){
        console.log(e)
        throw e
    }

}

//when know artistID, then get all the fan of this artist
const getFanOfArtist = async(artistID) =>{
    try{
        const result = await db.getDBObject()
        .query('select * from userFanOfArtist where artistID = ?', [artistID])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsByArtist, becomeFanOfArtist}