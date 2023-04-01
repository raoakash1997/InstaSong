--1. Show the profile of a particular user, given the user name.
SELECT * 
FROM user 
WHERE username = 'bobsmith';

--2. List all friends of a user.

--3. For a given user, list all her followers, and all users she follows herself.
(
    SELECT f.follower AS username, u.fname, u.lname, 'Follower' AS relationship
    FROM follows f
    JOIN user u ON f.follower = u.username
    WHERE f.follows = 'ericli'
)
UNION ALL
(
    SELECT f.follows AS username, u.fname, u.lname, 'Following' AS relationship
    FROM follows f
    JOIN user u ON f.follows = u.username
    WHERE f.follower = 'ericli'
)
ORDER BY relationship, username;

--4. For a given user, list all friendship requests that have been made to that user but have not been answered yet.


--5. For a given user, list all new content that this user should be notified of, that is, reviews by friends or people she follows that were created after her last visit to the site.


--6. List all artists who play Jazz, i.e. play some song for which the genres include Jazz


--7. Insert a new rating given by a user for a song.


--8. List all songs of a particular genre (e.g., Jazz) in the database, sorted in descending order by average rating.