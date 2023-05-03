const db = require('../db/main');

const getSongsByArtist = async(searchTerm) => {
    try{
        const name = searchTerm.split(" ")

        const result = await db.getDBObject().query('select title,releaseDate,avg(stars) as avg_rating from music_db.artist natural join artistperformssong natural join song natural join ratesong where fname=? AND lname=? group by songID', [name[0], name[1]])
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports = {getSongsByArtist}