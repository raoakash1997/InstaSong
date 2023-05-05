const db = require('../db/main');

const createPlaylist = async(username, playlist_name) =>{
    try{
        
        const result = await db.getDBObject()
        .query(`insert into playlist(username, pname,createdDate) values (?,?,?)`,[username,playlist_name,new Date()])
        return result
    }catch(error)
    {
        console.log(error)
        throw(error)
    }
}
const addSongToPlaylist = async(username,songID, playlist_name) =>{
    try{
        const result = await db.getDBObject()
        .query(`insert into songinplaylist(username, songID, pname) values (?,?,?)`,[username, songID,playlist_name])
        return result
    }catch(error)
    {
        console.log(error)
        throw(error)
    }
}
const getAllPlaylistsForUser = async(username) =>{
    try{
        const result = await db.getDBObject()
        .query(`SELECT playlist.pname,count(songID) as numsongs, createdDate from playlist left outer join songinplaylist on playlist.pname=songinplaylist.pname AND playlist.username=songinplaylist.username WHERE playlist.username=? GROUP by playlist.pname`,[username])
        return result
    }catch(error)
    {
        console.log(error)
        throw(error)
    }
}
const getAllSongsInPlaylist = async(username,pname) =>{
    try{
        const result = await db.getDBObject()
        .query(`select title,releaseDate,avg(stars) as avg_rating from songsinplaylist natural join song where username=? and pname=? group by songID`,[username,pname])
        return result
    }catch(error)
    {
        console.log(error)
        throw(error)
    }
}
module.exports = {createPlaylist,addSongToPlaylist,getAllPlaylistsForUser,getAllSongsInPlaylist}