const db = require('../db/main');

const getSongByName = async(searchTerm) => {
    try{
        console.log('check1', searchTerm)
        const result = await db.getDBObject()
        .query('select * from music_db.song where title=?', [searchTerm])
        console.log('check2', result)
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongByName}