const db = require('../db/main');

const getSongsbyAlbum = async(searchTerm) => {
    try{
        const result = await db.getDBObject()
        .query('select * from music_db.album natural join songinalbum natural join song where albumname=?', [searchTerm])
        console.log('check2', result)
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsbyAlbum}