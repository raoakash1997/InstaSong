INSERT INTO song (songID, title, releaseDate, songURL) VALUES
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
ALTER TABLE artist MODIFY artistBio VARCHAR (200);
INSERT INTO artist (artistID, fname, lname, artistBio, artistURL) VALUES
('A0001', 'Ed', 'Sheeran', 'Edward Christopher Sheeran is an English singer, songwriter, and record producer.', 'https://www.edsheeran.com/'),
('A0002', 'Mark', 'Ronson', 'Mark Daniel Ronson is a British-American musician, DJ, songwriter, and record producer.', 'https://www.markronson.co.uk/'),
('A0003', 'Wiz', 'Khalifa', 'Cameron Jibril Thomaz, known professionally as Wiz Khalifa, is an American rapper, singer, songwriter, and actor.', 'https://wizkhalifa.com/'),
('A0004', 'Luis', 'Fonsi', 'Luis Alfonso Rodríguez López-Cepero, better known by his stage name Luis Fonsi, is a Puerto Rican singer, songwriter, and actor.', 'https://www.luisfonsi.com/'),
('A0005', 'Justin', 'Bieber', 'Justin Drew Bieber is a Canadian singer, songwriter, and actor.', 'https://www.justinbiebermusic.com/'),
('A0006', 'The', 'Chainsmokers', 'The Chainsmokers is an American electronic DJ and production duo consisting of Alexander "Alex" Pall and Andrew "Drew" Taggart.', 'https://www.thechainsmokers.com/'),
('A0007', 'Katy', 'Perry', 'Katheryn Elizabeth Hudson, known professionally as Katy Perry, is an American singer, songwriter, and television judge.', 'https://www.katyperry.com/'),
('A0008', 'Twenty One', 'Pilots', 'Twenty One Pilots is an American musical duo from Columbus, Ohio, consisting of lead vocalist Tyler Joseph and drummer Josh Dun.', 'https://www.twentyonepilots.com/'),
('A0010', 'Camila', 'Cabello', 'Karla Camila Cabello Estrabao is a Cuban-American singer, songwriter, and actress.', 'https://www.camilacabello.com/'),
('A0011', 'Billie', 'Eilish', 'Billie Eilish Pirate Baird O\'Connell is an American singer, songwriter, and actress.', 'https://www.billieeilish.com/'),
('A0012', 'The', 'Weeknd', 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and actor.', 'https://www.theweeknd.com/'),
('A0013', 'Lil Nas', 'X', 'Montero Lamar Hill, known professionally as Lil Nas X, is an American rapper, singer, and songwriter.', 'https://www.lilnasx.com/'),
('A0014', 'Adele', 'Adkins', 'Adele Laurie Blue Adkins is an English singer and songwriter.', 'https://www.adele.com/'),
('A0015', 'Meghan', 'Trainor', 'Meghan Elizabeth Trainor is an American singer, songwriter, and record producer.', 'https://www.meghantrainor.com/');
INSERT INTO artistPerformsSong (artistID, songID) VALUES
('A0001', 'S0001'),
('A0002', 'S0002'),
('A0003', 'S0003'),
('A0004', 'S0004'),
('A0005', 'S0005'),
('A0006', 'S0006'),
('A0007', 'S0007'),
('A0008', 'S0008'),
('A0011', 'S0011'),
('A0010', 'S0010');
INSERT INTO album (albumID) VALUES
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
INSERT INTO songInAlbum (albumID, songID) VALUES
('AL001', 'S0001'),
('AL001', 'S0002'),
('AL002', 'S0003'),
('AL002', 'S0004'),
('AL002', 'S0005');
INSERT INTO songGenre (songID, genre) VALUES
('S0001', 'Pop'),
('S0001', 'Dance'),
('S0002', 'Pop'),
('S0003', 'Rock'),
('S0003', 'Alt'),
('S0004', 'Rap'),
('S0005', 'Country'),
('S0005', 'Folk');

