-- This is quesiton 1
SELECT * 
FROM user 
WHERE username = 'bobsmith';

-- This is question 2
SELECT user1 FROM friend WHERE user2="johndoe"
UNION 
SELECT user2 FROM friend WHERE user1="johndoe";

-- This is question 3
(
    SELECT f.follower AS username, 'Follower' AS relationship
    FROM follows f
    JOIN user u ON f.follower = u.username
    WHERE f.follows = 'ericli'
)
UNION ALL
(
    SELECT f.follows AS username, 'Following' AS relationship
    FROM follows f
    JOIN user u ON f.follows = u.username
    WHERE f.follower = 'ericli'
)
ORDER BY relationship, username;

-- This is question 4
SELECT * FROM friend WHERE (user1="timchen" or user2="timchen") AND requestSentBy != "timchen" AND acceptStatus="Pending";

-- This is question 5
-- notified of reiviews of song 
SELECT
    U.username, RS.songID, RS.reviewText, RS.reviewDate
FROM
    user AS U
JOIN
    reviewSong AS RS
ON
    U.username = RS.username
WHERE
    (U.username IN (SELECT user2 FROM friend WHERE user1 = 'johndoe' AND acceptStatus = 'Accepted')
    OR U.username IN (SELECT follows FROM follows WHERE follower = 'johndoe'))
    AND RS.reviewDate > (SELECT lastlogin FROM user WHERE username = 'johndoe')
ORDER BY
    RS.reviewDate DESC;
--notified of reviews of album
SELECT
    U.username, RA.albumID, RA.reviewText, RA.reviewDate
FROM user AS U JOIN reviewAlbum AS RA ON U.username = RA.username
WHERE
    (U.username IN (SELECT user2 FROM friend WHERE user1 = 'exampleUser' AND acceptStatus = 'Accepted')
    OR U.username IN (SELECT follows FROM follows WHERE follower = 'exampleUser'))
    AND RA.reviewDate > (SELECT lastlogin FROM user WHERE username = 'exampleUser')
ORDER BY
    RA.reviewDate DESC;

-- This is question 6
SELECT artist.fname, artist.lname FROM artist 
JOIN artistperformssong USING (artistID)
JOIN songgenre USING (songID)
WHERE genre = "Jazz";

-- This is question 7
INSERT INTO rateSong (username, songID, stars, ratingDate)
VALUES ('johndoe', 'S0013', 4, '2023-04-12');

-- This is question 8
SELECT song.songID, song.title, AVG(rateSong.stars) AS avg_rating
FROM song
JOIN songGenre ON song.songID = songGenre.songID
JOIN rateSong ON song.songID = rateSong.songID
WHERE songGenre.genre = 'Pop'
GROUP BY song.songID
ORDER BY avg_rating DESC;