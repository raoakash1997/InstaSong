-- This is question 2
SELECT user1 FROM friend WHERE user2="johndoe"
UNION 
SELECT user2 FROM friend WHERE user1="johndoe";

-- This is question 4
SELECT * FROM friend WHERE (user1="timchen" or user2="timchen") AND requestSentBy != "timchen" AND acceptStatus="Pending";

-- This is question 6
SELECT artist.fname, artist.lname FROM artist 
JOIN artistperformssong USING (artistID)
JOIN songgenre USING (songID)
WHERE genre = "Jazz";

-- This is question 8
SELECT song.songID, song.title, AVG(rateSong.stars) AS avg_rating
FROM song
JOIN songGenre ON song.songID = songGenre.songID
JOIN rateSong ON song.songID = rateSong.songID
WHERE songGenre.genre = 'Pop'
GROUP BY song.songID
ORDER BY avg_rating DESC;