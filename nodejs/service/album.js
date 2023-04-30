const db = require('../db/main');

const getAlbumByName = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.album where title=?', [searchTerm])
        console.log('check2', result)
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getAlbumByName}