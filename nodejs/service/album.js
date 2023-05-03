const db = require('../db/main');

const getSongsbyAlbum = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select title,releaseDate,avg(stars) as avg_rating from music_db.album natural join songinalbum natural join song natural join ratesong where albumname=? group by songID', [searchTerm])
        console.log('check2', result)
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsbyAlbum}