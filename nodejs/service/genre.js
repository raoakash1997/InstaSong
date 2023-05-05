const db = require('../db/main');

const getSongsByGenre = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select title,releaseDate,avg(stars) as avg_rating, songURL from music_db.songgenre natural join song natural join ratesong where genre=? group by songID', [searchTerm])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsByGenre}