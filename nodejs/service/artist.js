const db = require('../db/main');

const getSongsByArtist = async(searchTerm) => {
    try{
        const name = searchTerm.split(" ")

        const result = await db.getDBObject().query('select * from music_db.artist natural join artistperformssong natural join song where fname=? AND lname=?', [name[0], name[1]])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsByArtist}