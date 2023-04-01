--song
INSERT INTO `song` (`songID`, `title`, `releaseDate`, `songURL`) VALUES
('S0001', 'Shape of You', '2017-01-06', 'https://www.youtube.com/watch?v=JGwWNGJdvx8'),
('S0002', 'Uptown Funk', '2014-11-10', 'https://www.youtube.com/watch?v=OPf0YbXqDm0'),
('S0003', 'See You Again', '2015-03-10', 'https://www.youtube.com/watch?v=RgKAFK5djSk'),
('S0004', 'Despacito', '2017-01-13', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'),
('S0005', 'Sorry', '2015-10-22', 'https://www.youtube.com/watch?v=fRh_vgS2dFE'),
('S0006', 'Closer', '2016-07-29', 'https://www.youtube.com/watch?v=PT2_F-1esPk'),
('S0007', 'Roar', '2013-08-12', 'https://www.youtube.com/watch?v=CevxZvSJLk8'),
('S0008', 'Stressed Out', '2015-11-27', 'https://www.youtube.com/watch?v=pXRviuL6vMY'),
('S0009', 'Counting Stars', '2013-06-14', 'https://www.youtube.com/watch?v=hT_nvWreIhg'),
('S0010', 'Havana', '2017-08-03', 'https://www.youtube.com/watch?v=HCjNJDNzw8Y'),
('S0011', 'Bad Guy', '2019-03-29', 'https://www.youtube.com/watch?v=DyDfgMOUjCI'),
('S0012', 'Blinding Lights', '2019-11-29', 'https://www.youtube.com/watch?v=4NRXx6U8ABQ'),
('S0013', 'Old Town Road', '2018-12-03', 'https://www.youtube.com/watch?v=7ysFgElQtjI'),
('S0014', 'Hello', '2015-10-23', 'https://www.youtube.com/watch?v=YQHsXMglC9A'),
('S0015', 'All About That Bass', '2014-06-30', 'https://www.youtube.com/watch?v=7PCkvCPvDXk');

--artist
ALTER TABLE `artist` MODIFY `artistBio` VARCHAR (200);
INSERT INTO `artist` (`artistID`, `fname`, `lname`, `artistBio`, `artistURL`) VALUES
('A0001', 'Ed', 'Sheeran', 'Edward Christopher Sheeran is an English singer, songwriter, and record producer.', 'https://www.edsheeran.com/'),
('A0002', 'Mark', 'Ronson', 'Mark Daniel Ronson is a British-American musician, DJ, songwriter, and record producer.', 'https://www.markronson.co.uk/'),
('A0003', 'Wiz', 'Khalifa', 'Cameron Jibril Thomaz, known professionally as Wiz Khalifa, is an American rapper, singer, songwriter, and actor.', 'https://wizkhalifa.com/'),
('A0004', 'Luis', 'Fonsi', 'Luis Alfonso Rodríguez López-Cepero, better known by his stage name Luis Fonsi, is a Puerto Rican singer, songwriter, and actor.', 'https://www.luisfonsi.com/'),
('A0005', 'Justin', 'Bieber', 'Justin Drew Bieber is a Canadian singer, songwriter, and actor.', 'https://www.justinbiebermusic.com/'),
('A0006', 'The', 'Chainsmokers', 'The Chainsmokers is an American electronic DJ and production duo consisting of Alexander "Alex" Pall and Andrew "Drew" Taggart.', 'https://www.thechainsmokers.com/'),
('A0007', 'Katy', 'Perry', 'Katheryn Elizabeth Hudson, known professionally as Katy Perry, is an American singer, songwriter, and television judge.', 'https://www.katyperry.com/'),
('A0008', 'Twenty One', 'Pilots', 'Twenty One Pilots is an American musical duo from Columbus, Ohio, consisting of lead vocalist Tyler Joseph and drummer Josh Dun.', 'https://www.twentyonepilots.com/'),
('A0010', 'Camila', 'Cabello', 'Karla Camila Cabello Estrabao is a Cuban-American singer, songwriter, and actress.', 'https://www.camilacabello.com/'),
('A0011', 'Billie', 'Eilish', 'Billie Eilish Pirate Baird O\ Connell is an American singer, songwriter, and actress.', 'https://www.billieeilish.com/'),
('A0012', 'The', 'Weeknd', 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and actor.', 'https://www.theweeknd.com/'),
('A0013', 'Lil Nas', 'X', 'Montero Lamar Hill, known professionally as Lil Nas X, is an American rapper, singer, and songwriter.', 'https://www.lilnasx.com/'),
('A0014', 'Adele', 'Adkins', 'Adele Laurie Blue Adkins is an English singer and songwriter.', 'https://www.adele.com/'),
('A0015', 'Meghan', 'Trainor', 'Meghan Elizabeth Trainor is an American singer, songwriter, and record producer.', 'https://www.meghantrainor.com/');

--artistPerformsSong
INSERT INTO `artistPerformsSong` (`artistID`, `songID`) VALUES
('A0001', 'S0001'),
('A0002', 'S0002'),
('A0003', 'S0003'),
('A0004', 'S0004'),
('A0005', 'S0005'),
('A0006', 'S0006'),
('A0007', 'S0007'),
('A0008', 'S0008'),
('A0009', 'S0009'),
('A0010', 'S0010'),
('A0011', 'S0011'),
('A0012', 'S0012');
('A0013', 'S0013');
('A0014', 'S0014');
('A0015', 'S0015');

--album
INSERT INTO `album` (`albumID`) VALUES
('AL001'),
('AL002'),
('AL003'),
('AL004'),
('AL005'),
('AL006'),
('AL007'),
('AL008'),
('AL009'),
('AL010');

--rateAlbum
INSERT INTO `rateAlbum` (`username`,`albumID`,`starts`) VALUES
('johndoe', 'AL001', 4),
('sarahlee', 'AL002', 5),
('mikebrown', 'AL003', 3),
('katewill', 'AL004', 4),
('petejones', 'AL005', 2),
('lisawang', 'AL006', 5),
('timchen', 'AL007', 3),
('kellynguyen', 'AL008', 1),
('bobsmith', 'AL009', 4),
('jessicakim', 'AL010', 5),
('johngarcia', 'AL001', 3),
('sallyng', 'AL002', 4),
('annaliu', 'AL003', 2),
('ericli', 'AL004', 5),
('lisali', 'AL005', 1),
('kevinyu', 'AL006', 3),
('rachelchoi', 'AL007', 4),
('jennytran', 'AL008', 5),
('chrisbrown', 'AL009', 2),
('davidlee', 'AL010', 4),
('johndoe', 'AL002', 5),
('sarahlee', 'AL003', 4),
('mikebrown', 'AL004', 3),
('katewill', 'AL005', 2),
('petejones', 'AL006', 1),

--reviewAlbum
INSERT INTO `reviewAlbum` (`username`,`albumID`,`reviewText`, `reviewDate`) VALUES
('johndoe', 'AL001', 'Review for AL001', '2022-03-20'),
('sarahlee', 'AL002', 'Review for AL002', '2022-03-21'),
('mikebrown', 'AL003', 'Review for AL003', '2022-03-22'),
('katewill', 'AL004', 'Review for AL004', '2022-03-23'),
('petejones', 'AL005', 'Review for AL005', '2022-03-24'),
('lisawang', 'AL006', 'Review for AL006', '2022-03-25'),
('timchen', 'AL007', 'Review for AL007', '2022-03-26'),
('kellynguyen', 'AL008', 'Review for AL008', '2022-03-27'),
('bobsmith', 'AL009', 'Review for AL009', '2022-03-28'),
('jessicakim', 'AL010', 'Review for AL010', '2022-03-29');

--rateSong
INSERT INTO `rateSong` (`username`,`songID`,`stars`, `ratingDate`) VALUES
('johndoe', 'S0001', 4, '2022-03-20'),
('sarahlee', 'S0002', 3, '2022-03-21'),
('mikebrown', 'S0003', 5, '2022-03-22'),
('katewill', 'S0004', 4, '2022-03-23'),
('petejones', 'S0005', 2, '2022-03-24'),
('lisawang', 'S0006', 3, '2022-03-25'),
('timchen', 'S0007', 5, '2022-03-26'),
('kellynguyen', 'S0008', 1, '2022-03-27'),
('bobsmith', 'S0009', 4, '2022-03-28'),
('jessicakim', 'S0010', 2, '2022-03-29'),
('davidlee', 'S0011', 5, '2022-03-20'),
('jennytran', 'S0012', 3, '2022-03-21'),
('johngarcia', 'S0013', 4, '2022-03-22'),
('sallyng', 'S0014', 1, '2022-03-23'),
('chrisbrown', 'S0015', 5, '2022-03-24'),
('annaliu', 'S0001', 2, '2022-03-25'),
('ericli', 'S0002', 4, '2022-03-26'),
('lisali', 'S0003', 3, '2022-03-27'),
('kevinyu', 'S0004', 5, '2022-03-28'),
('rachelchoi', 'S0005', 2, '2022-03-29'),
('johndoe', 'S0010', 3, '2022-03-20'),
('sarahlee', 'S0011', 4, '2022-03-21'),
('mikebrown', 'S0012', 5, '2022-03-22'),
('katewill', 'S0013', 2, '2022-03-23'),
('petejones', 'S0014', 1, '2022-03-24');

--reviewSong
INSERT INTO `reviewSong` (`username`,`songID`,`reviewText`, `reviewDate`) VALUES
('johndoe', 'S0001', 'review for S0001', '2022-03-20'),
('sarahlee', 'S0002', 'review for S0002', '2022-03-21'),
('mikebrown', 'S0003', 'review for S0003', '2022-03-22'),
('katewill', 'S0004', 'review for S0004', '2022-03-23'),
('petejones', 'S0005', 'review for S0005', '2022-03-24'),
('lisawang', 'S0006', 'review for S0006', '2022-03-25'),
('timchen', 'S0007', 'review for S0007', '2022-03-26'),
('kellynguyen', 'S0008', 'review for S0008', '2022-03-27'),
('bobsmith', 'S0009', 'review for S0009', '2022-03-28'),
('jessicakim', 'S0010', 'review for S0010', '2022-03-29');

--userFanOfArtist
INSERT INTO `userFanOfArtist` (`username`,`artistID`) VALUES
('johndoe', 'A0001'),
('sarahlee', 'A0002'),
('mikebrown', 'A0003'),
('katewill', 'A0004'),
('petejones', 'A0005'),
('lisawang', 'A0006'),
('timchen', 'A0007'),
('kellynguyen', 'A0008'),
('bobsmith', 'A0009'),
('jessicakim', 'A0010'),
('davidlee', 'A0003'),
('jennytran', 'A0005'),
('johngarcia', 'A0013'),
('sallyng', 'A0014'),
('chrisbrown', 'A0015');

--songInAlbum
INSERT INTO `songInAlbum` (`albumID`, `songID`) VALUES
('AL001', 'S0001'),
('AL001', 'S0002'),
('AL002', 'S0003'),
('AL002', 'S0004'),
('AL002', 'S0005');

--songGenre
INSERT INTO `songGenre` (`songID`, `genre`) VALUES
('S0001', 'Pop'),
('S0001', 'Dance'),
('S0002', 'Pop'),
('S0003', 'Rock'),
('S0003', 'Alt'),
('S0004', 'Rap'),
('S0005', 'Country'),
('S0005', 'Folk');


-- user
INSERT INTO `user` (`username`, `pwd`, `fname`, `lname`, `lastlogin`, `nickname`) VALUES
('johndoe', 'password123', 'John', 'Doe', NULL, 'Johnny'),
('sarahlee', 'ilovecoffee', 'Sarah', 'Lee', '2022-03-15', 'Sarebear'),
('mikebrown', 'sportsfan1', 'Mike', 'Brown', '2022-03-28', 'Brownie'),
('katewill', NULL, 'Kate', 'Williams', '2022-03-25', 'KatieW'),
('petejones', NULL, 'Peter', 'Jones', '2022-03-29', 'PJ'),
('lisawang', 'happygirl', 'Lisa', 'Wang', '2022-03-29', 'LiLi'),
('timchen', 'codeguru', 'Tim', 'Chen', '2022-03-27', NULL),
('kellynguyen', 'sunshine1', 'Kelly', 'Nguyen', NULL, 'Kels'),
('bobsmith', 'password123', 'Bob', 'Smith', '2022-03-25', 'Smitty'),
('jessicakim', NULL, 'Jessica', 'Kim', '2022-03-28', 'Jess'),
('davidlee', 'soccerfan', 'David', 'Lee', '2022-03-27', 'Dlee'),
('jennytran', 'happyfeet', 'Jenny', 'Tran', NULL, 'JT'),
('johngarcia', 'musiclover', 'John', 'Garcia', '2022-03-29', 'JG'),
('sallyng', NULL, 'Sally', 'Ng', '2022-03-29', 'Sal'),
('chrisbrown', 'basketball', 'Chris', 'Brown', '2022-03-26', 'CB'),
('annaliu', 'bookworm', 'Anna', 'Liu', NULL, 'Al'),
('ericli', 'techguy', 'Eric', 'Li', '2022-03-28', 'ELi'),
('lisali', 'doglover', 'Lisa', 'Li', '2022-03-29', 'Lulu'),
('kevinyu', 'gamerboy', 'Kevin', 'Yu', '2022-03-27', 'KY'),
('rachelchoi', NULL, 'Rachel', 'Choi', NULL, 'Rach')

-- friend
INSERT INTO `friend` (`user1`, `user2`, `acceptStatus`, `requestSentBy`, `createdAt`, `updatedAt`) VALUES
('johndoe', 'sarahlee', 'Accepted', 'johndoe', '2022-03-18 10:20:30', '2022-03-20 12:30:40'),
('sarahlee', 'mikebrown', 'Accepted', 'mikebrown', '2022-03-17 11:45:23', '2022-03-19 15:20:10'),
('mikebrown', 'katewill', 'Accepted', 'mikebrown', '2022-03-20 14:50:30', '2022-03-21 16:40:20'),
('katewill', 'petejones', 'Not accepted', 'katewill', '2022-03-22 08:10:25', '2022-03-23 09:15:30'),
('petejones', 'lisawang', 'Accepted', 'lisawang', '2022-03-24 12:20:30', '2022-03-25 14:30:40'),
('lisawang', 'timchen', 'Pending', 'lisawang', '2022-03-26 10:15:20', NULL),
('kellynguyen', 'bobsmith', 'Pending', 'kellynguyen', '2022-03-18 11:20:30', NULL),
('bobsmith', 'jessicakim', 'Not accepted', 'jessicakim', '2022-03-21 13:20:30', '2022-03-22 15:30:40'),
('jessicakim', 'davidlee', 'Accepted', 'davidlee', '2022-03-25 10:20:30', '2022-03-26 12:30:40'),
('davidlee', 'jennytran', 'Pending', 'jennytran', '2022-03-23 11:20:30', NULL),
('johngarcia', 'sallyng', 'Accepted', 'sallyng', '2022-03-28 14:20:30', '2022-03-29 16:30:40'),
('sallyng', 'chrisbrown', 'Pending', 'sallyng', '2022-03-21 11:20:30', NULL),
('annaliu', 'ericli', 'Accepted', 'ericli', '2022-03-19 09:20:30', '2022-03-20 11:30:40'),
('ericli', 'lisali', 'Not accepted', 'lisali', '2022-03-23 13:20:30', '2022-03-24 15:30:40'),
('lisali', 'kevinyu', 'Accepted', 'kevinyu', '2022-03-25 14:20:30', '2022-03-26 16:30:40'),
('kevinyu', 'rachelchoi', 'Pending', 'kevinyu', '2022-03-27 12:20:30', NULL),
('johndoe', 'lisawang', 'Accepted', 'johndoe', '2022-03-21 09:20:30', '2022-03-22 11:30:40'),
('sarahlee', 'jennytran', 'Pending', 'jennytran', '2022-03-25 14:20:30', NULL),
('bobsmith', 'annaliu', 'Accepted', 'bobsmith', '2022-03-23 16:20:30', '2022-03-24 18:30:40'),
('jessicakim', 'johngarcia', 'Not accepted', 'johngarcia', '2022-03-27 11:20:30', '2022-03-28 13:30:40');

--follows
INSERT INTO `follows` (`follower`, `follows`, `cratedAt`) VALUES
('johndoe', 'sarahlee', '2022-03-19 10:20:30'),
('sarahlee', 'mikebrown', '2022-03-20 11:45:23'),
('mikebrown', 'katewill', '2022-03-22 14:50:30'),
('katewill', 'petejones', '2022-03-24 08:10:25'),
('petejones', 'lisawang', '2022-03-26 12:20:30'),
('lisawang', 'timchen', '2022-03-28 10:15:20'),
('kellynguyen', 'bobsmith', '2022-03-19 11:20:30'),
('bobsmith', 'jessicakim', '2022-03-23 13:20:30'),
('jessicakim', 'davidlee', '2022-03-26 10:20:30'),
('davidlee', 'jennytran', '2022-03-28 11:20:30'),
('johngarcia', 'sallyng', '2022-03-29 14:20:30'),
('sallyng', 'chrisbrown', '2022-03-21 11:20:30'),
('annaliu', 'ericli', '2022-03-20 09:20:30'),
('ericli', 'lisali', '2022-03-24 13:20:30'),
('lisali', 'kevinyu', '2022-03-26 14:20:30'),
('kevinyu', 'rachelchoi', '2022-03-28 12:20:30'),
('jennytran', 'johndoe', '2022-03-23 16:20:30'),
('timchen', 'sarahlee', '2022-03-25 14:20:30'),
('chrisbrown', 'johngarcia', '2022-03-27 16:20:30'),
('rachelchoi', 'kellynguyen', '2022-03-29 18:20:30');
