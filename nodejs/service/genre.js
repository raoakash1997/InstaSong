const db = require('../db/main');

const getSongsByGenre = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.songgenre natural join song where genre=?', [searchTerm])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsByGenre}